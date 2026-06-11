/**
 * Verifies the Supabase setup before deploying.
 * Run with:  node --env-file=.env scripts/check-supabase.mjs
 *
 * Uses the Supabase REST/Storage APIs directly via fetch (no supabase-js), so it
 * runs on any Node version. Checks: env vars, every table/view exists (migration
 * ran), an admin is registered, the storage bucket exists, and the publishable
 * key can read published posts under RLS.
 */
const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

let failures = 0;
const ok = (m) => console.log(`  \x1b[32mOK\x1b[0m   ${m}`);
const warn = (m) => console.log(`  \x1b[33mWARN\x1b[0m ${m}`);
const bad = (m) => {
  failures++;
  console.log(`  \x1b[31mFAIL\x1b[0m ${m}`);
};

console.log('\n[check] Environment variables');
url ? ok(`SUPABASE_URL = ${url}`) : bad('SUPABASE_URL / VITE_SUPABASE_URL missing');
serviceKey ? ok('SUPABASE_SERVICE_ROLE_KEY present') : bad('SUPABASE_SERVICE_ROLE_KEY missing');
anonKey ? ok('VITE_SUPABASE_ANON_KEY present') : bad('VITE_SUPABASE_ANON_KEY missing');
process.env.VERCEL_DEPLOY_HOOK_URL
  ? ok('VERCEL_DEPLOY_HOOK_URL present')
  : warn('VERCEL_DEPLOY_HOOK_URL empty (publish-rebuild no-ops until set)');

if (!url || !serviceKey || !anonKey) {
  console.log('\n[check] Missing required env — fix .env and rerun.\n');
  process.exit(1);
}

const rest = (key, path) =>
  fetch(`${url}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });

console.log('\n[check] Tables & views (service key)');
for (const table of [
  'posts',
  'admins',
  'analytics_sessions',
  'analytics_pageviews',
  'analytics_daily_views',
  'analytics_top_paths',
  'analytics_session_summary',
  'analytics_device_breakdown',
]) {
  try {
    const res = await rest(serviceKey, `${table}?select=*&limit=1`);
    if (res.ok) ok(table);
    else {
      const body = await res.json().catch(() => ({}));
      bad(`${table} — ${res.status} ${body.message || ''}`);
    }
  } catch (e) {
    bad(`${table} — ${e.message}`);
  }
}

console.log('\n[check] Admin allowlist');
try {
  const res = await rest(serviceKey, 'admins?select=email');
  const data = await res.json();
  if (!res.ok) bad(`could not read admins — ${data.message || res.status}`);
  else if (!Array.isArray(data) || data.length === 0)
    bad('no admins registered — run the insert in BLOG_ADMIN_SETUP.md step 2');
  else ok(`${data.length} admin(s): ${data.map((a) => a.email).join(', ')}`);
} catch (e) {
  bad(e.message);
}

console.log('\n[check] Storage bucket "blog-images"');
try {
  const res = await fetch(`${url}/storage/v1/bucket/blog-images`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) ok(`bucket exists (public: ${data.public})`);
  else bad(`bucket missing — create "blog-images" (public) in Storage. (${data.message || res.status})`);
} catch (e) {
  bad(e.message);
}

console.log('\n[check] Publishable (anon) key under RLS');
try {
  const res = await rest(anonKey, 'posts?select=id&status=eq.published&limit=1');
  if (res.ok) ok('anon can read published posts (RLS policy working)');
  else {
    const body = await res.json().catch(() => ({}));
    bad(`anon read failed — ${res.status} ${body.message || ''}`);
  }
} catch (e) {
  bad(e.message);
}

console.log(
  failures === 0
    ? '\n\x1b[32m[check] All good — ready to deploy.\x1b[0m\n'
    : `\n\x1b[31m[check] ${failures} problem(s) found — see above.\x1b[0m\n`,
);
process.exit(failures === 0 ? 0 : 1);
