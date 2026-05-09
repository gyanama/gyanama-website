/**
 * Build-time prerendering script using Playwright.
 * Renders each route of the SPA and saves static HTML to dist/.
 * This makes all pages crawlable by search engines without SSR.
 *
 * Usage: node scripts/prerender.mjs
 * Runs automatically as part of: npm run build:seo
 */

import { chromium } from 'playwright-core';
import sparticuzChromium from '@sparticuz/chromium';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

const ROUTES = [
  '/',
  '/ai-systems',
  '/features',
  '/use-cases',
  '/about',
  '/contact-us',
  '/book-demo',
  '/privacy-policy',
  '/terms-of-service',
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // SPA fallback: if file doesn't exist, serve index.html
      if (!existsSync(filePath)) {
        // Check if it's a directory with index.html
        const indexPath = join(filePath, 'index.html');
        if (existsSync(indexPath)) {
          filePath = indexPath;
        } else {
          filePath = join(DIST_DIR, 'index.html');
        }
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => resolve(server));
  });
}

// Build launch options once. On serverless we use @sparticuz/chromium's
// bundled binary + libs; locally we use system Chrome.
async function buildLaunchOptions() {
  const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
  if (!isServerless) return { headless: true, channel: 'chrome' };

  // Vercel's build sandbox is happier without the zygote/multi-process model.
  const extraArgs = ['--single-process', '--no-zygote'];
  return {
    args: [...sparticuzChromium.args, ...extraArgs],
    executablePath: await sparticuzChromium.executablePath(),
    headless: true,
  };
}

async function renderRoute(launchOptions, port, route) {
  // Launch a dedicated browser per route. Slower but resilient — a crash on
  // one route can't take down subsequent renders, which @sparticuz/chromium
  // is prone to in tight memory environments.
  const browser = await chromium.launch(launchOptions);
  try {
    const page = await browser.newPage();
    try {
      const url = `http://localhost:${port}${route}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForSelector('main', { timeout: 15000 });
      await page.waitForTimeout(1500);

      const html = await page.content();

      if (route === '/') {
        writeFileSync(join(DIST_DIR, 'index.html'), html, 'utf-8');
      } else {
        const dir = join(DIST_DIR, route.slice(1));
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, 'index.html'), html, 'utf-8');
      }
    } finally {
      await page.close().catch(() => {});
    }
  } finally {
    await browser.close().catch(() => {});
  }
}

async function prerender() {
  const PORT = 4173;
  console.log(`[prerender] Starting local server on port ${PORT}...`);
  const server = await startServer(PORT);

  console.log('[prerender] Preparing browser launch options...');
  const launchOptions = await buildLaunchOptions();

  let failures = 0;
  for (const route of ROUTES) {
    console.log(`[prerender] Rendering ${route}...`);
    try {
      await renderRoute(launchOptions, PORT, route);
      console.log(`[prerender]   OK: ${route}`);
    } catch (err) {
      failures++;
      console.error(`[prerender]   FAIL: ${route} — ${err.message}`);
    }
  }

  server.close();
  console.log(`[prerender] Done. ${ROUTES.length - failures}/${ROUTES.length} routes rendered.`);
  if (failures > 0) process.exit(1);
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
