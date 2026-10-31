import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_ROUTES } from '../src/lib/routes.ts';

const SITE_URL = 'https://gyanama.com';
const TITLE_SUFFIX = ' | GYANAMA';
const DASH_EXEMPT = new Set(['/privacy-policy', '/terms-of-service']);
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const APP_DIR = join(ROOT, '.next', 'server', 'app');

if (!existsSync(APP_DIR)) {
  console.error(`[seo-guard] ${relative(ROOT, APP_DIR)} not found. Run a production build first.`);
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const htmlIndex = new Map();
for (const file of walk(APP_DIR)) {
  const key = relative(APP_DIR, file)
    .split(sep)
    .filter((part) => !/^\(.+\)$/.test(part))
    .join('/');
  if (!htmlIndex.has(key)) htmlIndex.set(key, file);
}

function htmlFor(path) {
  const key = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  const direct = join(APP_DIR, ...key.split('/'));
  if (existsSync(direct)) return direct;
  return htmlIndex.get(key) ?? htmlIndex.get(`${path.slice(1)}/index.html`) ?? null;
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…' };

function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

const squash = (text) => decode(text).replace(/\s+/g, ' ').trim();

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) out[m[1].toLowerCase()] = decode(m[3] ?? m[4] ?? '');
  return out;
}

function visibleText(html) {
  const bodyStart = html.search(/<body[\s>]/i);
  const body = bodyStart >= 0 ? html.slice(bodyStart) : html;
  return squash(
    body
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<template\b[\s\S]*?<\/template>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  );
}

function jsonLdBlocks(html) {
  const blocks = [];
  for (const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      blocks.push({ __invalid: true });
    }
  }
  return blocks;
}

function flattenLd(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => flattenLd(n, out));
  else if (node && typeof node === 'object') {
    out.push(node);
    if (Array.isArray(node['@graph'])) flattenLd(node['@graph'], out);
  }
  return out;
}

function check(path) {
  const file = htmlFor(path);
  if (!file) return { path, file: null, errors: ['no prerendered HTML found'] };
  const html = readFileSync(file, 'utf-8');
  const headEnd = html.search(/<\/head>/i);
  const head = headEnd >= 0 ? html.slice(0, headEnd) : html;
  const errors = [];

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) errors.push(`expected 1 <h1>, found ${h1Count}`);

  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? squash(titleMatch[1]) : '';
  if (!title) errors.push('missing <title>');
  else if (!title.endsWith(TITLE_SUFFIX)) errors.push(`title does not end with "${TITLE_SUFFIX}": "${title}"`);

  const metaTags = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const description = metaTags.find((a) => a.name === 'description')?.content?.trim() ?? '';
  if (!description) errors.push('missing meta description');

  const linkTags = [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const canonical = linkTags.find((a) => (a.rel ?? '').split(/\s+/).includes('canonical'))?.href ?? '';
  const expected = `${SITE_URL}${path}`;
  const canonicalOk = path === '/' ? canonical === SITE_URL || canonical === `${SITE_URL}/` : canonical === expected;
  if (!canonicalOk) errors.push(`canonical is "${canonical || '(none)'}", expected "${expected}"`);

  const ld = jsonLdBlocks(html);
  if (ld.length === 0) errors.push('no application/ld+json');
  if (ld.some((b) => b.__invalid)) errors.push('invalid JSON-LD block');

  const text = visibleText(html);
  if (!DASH_EXEMPT.has(path)) {
    const dash = [text, title, description].join(' ').match(/.{0,40}[—–].{0,40}/);
    if (dash) errors.push(`em or en dash: "${dash[0]}"`);
  }

  const faqNodes = flattenLd(ld).filter((n) => n['@type'] === 'FAQPage' || (Array.isArray(n['@type']) && n['@type'].includes('FAQPage')));
  const questions = faqNodes.flatMap((n) => (Array.isArray(n.mainEntity) ? n.mainEntity : [n.mainEntity])).filter(Boolean);
  const missing = questions.map((q) => squash(String(q.name ?? ''))).filter((q) => q && !text.includes(q));
  for (const q of missing) errors.push(`FAQ question not visible: "${q}"`);

  return { path, file: relative(ROOT, file), h1Count, title, ldCount: ld.length, faqCount: questions.length, errors };
}

const results = STATIC_ROUTES.map((r) => check(r.path));

const rows = results.map((r) => ({
  path: r.path,
  h1: r.h1Count ?? '-',
  ld: r.ldCount ?? '-',
  faq: r.faqCount ?? '-',
  title: r.title ? String(r.title.length) : '-',
  status: r.errors.length ? 'FAIL' : 'ok',
}));
const cols = Object.keys(rows[0]);
const widths = cols.map((c) => Math.max(c.length, ...rows.map((row) => String(row[c]).length)));
const line = (vals) => vals.map((v, i) => String(v).padEnd(widths[i])).join('  ');
console.log(line(cols));
console.log(line(widths.map((w) => '-'.repeat(w))));
for (const row of rows) console.log(line(cols.map((c) => row[c])));

const failed = results.filter((r) => r.errors.length);
if (failed.length) {
  console.log('');
  for (const r of failed) {
    console.log(`${r.path}${r.file ? ` (${r.file})` : ''}`);
    for (const e of r.errors) console.log(`  - ${e}`);
  }
  console.log(`\n[seo-guard] ${failed.length} of ${results.length} routes failed.`);
  process.exit(1);
}
console.log(`\n[seo-guard] all ${results.length} routes passed.`);
