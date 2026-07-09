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
import { createClient } from '@supabase/supabase-js';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const CANONICAL_DOMAIN = 'https://gyanama.com';

// Static routes with sitemap metadata. Blog posts are appended dynamically.
// NOTE: /adminpanel is intentionally absent — it must never be prerendered or
// listed in the sitemap.
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/ai-systems', changefreq: 'monthly', priority: '0.8' },
  { path: '/features', changefreq: 'monthly', priority: '0.8' },
  { path: '/use-cases', changefreq: 'monthly', priority: '0.7' },
  { path: '/vs-school-management-software', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/book-demo', changefreq: 'monthly', priority: '0.9' },
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

const ROUTES = STATIC_ROUTES.map((r) => r.path);

// Fetch published blog slugs (service role, server-side). Returns [] and warns
// loudly on any problem so a Supabase blip never breaks an otherwise-fine deploy.
async function fetchBlogPosts() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('[prerender] SUPABASE_URL/SERVICE_ROLE_KEY not set — skipping blog posts.');
    return [];
  }
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from('posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error) throw error;
    console.log(`[prerender] Found ${data?.length ?? 0} published post(s).`);
    return data ?? [];
  } catch (err) {
    console.warn(`[prerender] Could not fetch blog posts (${err.message}). Continuing without them.`);
    return [];
  }
}

function generateSitemap(blogPosts) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const r of STATIC_ROUTES) {
    urls.push(
      `  <url>\n    <loc>${CANONICAL_DOMAIN}${r.path === '/' ? '/' : r.path}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority}</priority>\n  </url>`,
    );
  }
  for (const post of blogPosts) {
    const lastmod = (post.updated_at || post.published_at || '').slice(0, 10) || today;
    urls.push(
      `  <url>\n    <loc>${CANONICAL_DOMAIN}/blog/${post.slug}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n` +
        `    <priority>0.7</priority>\n  </url>`,
    );
  }
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') +
    '\n</urlset>\n';
  writeFileSync(join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log(`[prerender] Wrote sitemap.xml (${STATIC_ROUTES.length} static + ${blogPosts.length} posts).`);
}

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
  // Blog posts load content asynchronously from Supabase. Wait for the rendered
  // <article> (or the not-found marker) instead of just <main>. We avoid
  // 'networkidle' here because PageLayout's autoplay intro video can keep the
  // network busy and never settle — the selector is the reliable signal.
  const isBlogPost = route.startsWith('/blog/');
  const readySelector = isBlogPost ? 'article[data-post], [data-blog-404]' : 'main';
  // Give blog posts a touch longer for the data fetch + markdown render.
  const settleMs = isBlogPost ? 2500 : 1500;

  // Launch a dedicated browser per route. Slower but resilient — a crash on
  // one route can't take down subsequent renders, which @sparticuz/chromium
  // is prone to in tight memory environments.
  const browser = await chromium.launch(launchOptions);
  try {
    const page = await browser.newPage();
    try {
      const url = `http://localhost:${port}${route}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForSelector(readySelector, { timeout: 15000 });
      await page.waitForTimeout(settleMs);

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

  // Discover published blog posts and add them to the render list.
  const blogPosts = await fetchBlogPosts();
  const allRoutes = [...ROUTES, ...blogPosts.map((p) => `/blog/${p.slug}`)];

  let failures = 0;
  for (const route of allRoutes) {
    console.log(`[prerender] Rendering ${route}...`);
    try {
      await renderRoute(launchOptions, PORT, route);
      console.log(`[prerender]   OK: ${route}`);
    } catch (err) {
      failures++;
      console.error(`[prerender]   FAIL: ${route} — ${err.message}`);
    }
  }

  // Always (re)generate the sitemap from the current route + post set.
  generateSitemap(blogPosts);

  server.close();
  console.log(`[prerender] Done. ${allRoutes.length - failures}/${allRoutes.length} routes rendered.`);
  if (failures > 0) process.exit(1);
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
