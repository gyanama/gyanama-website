/**
 * Build-time prerendering script using Playwright.
 * Renders each route of the SPA and saves static HTML to dist/.
 * This makes all pages crawlable by search engines without SSR.
 *
 * Usage: node scripts/prerender.mjs
 * Runs automatically as part of: npm run build:seo
 */

import { chromium } from 'playwright';
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

async function prerender() {
  const PORT = 4173;
  console.log(`[prerender] Starting local server on port ${PORT}...`);
  const server = await startServer(PORT);

  console.log('[prerender] Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`[prerender] Rendering ${route}...`);

    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for the main content to appear (PageLayout renders <main>)
      await page.waitForSelector('main', { timeout: 15000 });

      // Small extra wait to ensure react-helmet-async has updated <head>
      await page.waitForTimeout(500);

      // Get the fully rendered HTML
      const html = await page.content();

      // Determine output path
      if (route === '/') {
        writeFileSync(join(DIST_DIR, 'index.html'), html, 'utf-8');
      } else {
        const dir = join(DIST_DIR, route.slice(1));
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, 'index.html'), html, 'utf-8');
      }

      console.log(`[prerender]   OK: ${route}`);
    } catch (err) {
      console.error(`[prerender]   FAIL: ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log('[prerender] Done! All routes prerendered.');
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
