import { writeFileSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { STATIC_ROUTES } from '../src/lib/routes.ts';

const SITE_URL = 'https://gyanama.com';
const KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;
const PUBLIC_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');
const mode = process.argv[2];
const key = process.env.INDEXNOW_KEY;

if (!key || !KEY_PATTERN.test(key)) {
  console.log('[indexnow] INDEXNOW_KEY not set or invalid, skipping.');
  process.exit(0);
}

if (mode === 'key') {
  for (const f of readdirSync(PUBLIC_DIR)) {
    if (/^[A-Za-z0-9-]{8,128}\.txt$/.test(f) && f !== 'llms.txt' && f !== 'robots.txt' && f !== 'llms-full.txt') rmSync(join(PUBLIC_DIR, f));
  }
  writeFileSync(join(PUBLIC_DIR, `${key}.txt`), key, 'utf-8');
  console.log(`[indexnow] Wrote public/${key}.txt`);
  process.exit(0);
}

if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
  console.log(`[indexnow] ${process.env.VERCEL_ENV} build, skipping submission.`);
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
let urlList = [];
if (process.env.INDEXNOW_SUBMIT_ALL === 'true') {
  urlList = STATIC_ROUTES.map((r) => `${SITE_URL}${r.path === '/' ? '/' : r.path}`);
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (url && anon) {
  const supabase = createClient(url, anon, { auth: { persistSession: false } });
  const { data } = await supabase.from('posts').select('slug, updated_at, published_at').eq('status', 'published');
  const posts = data ?? [];
  if (process.env.INDEXNOW_SUBMIT_ALL === 'true') {
    urlList.push(...posts.map((p) => `${SITE_URL}/blog/${p.slug}`));
  } else {
    const changed = posts.filter((p) => (p.updated_at || p.published_at || '').slice(0, 10) === today);
    if (changed.length) urlList.push(`${SITE_URL}/blog`, ...changed.map((p) => `${SITE_URL}/blog/${p.slug}`));
  }
}
if (urlList.length === 0) {
  console.log('[indexnow] Nothing to submit.');
  process.exit(0);
}
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE_URL).host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList }),
  });
  console.log(`[indexnow] Submitted ${urlList.length} URL(s): ${res.status}`);
} catch (err) {
  console.warn(`[indexnow] Submission failed: ${err.message}`);
}
