import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Fires the Vercel Deploy Hook so the Playwright prerender re-runs and turns
// newly published posts into static HTML. Only authenticated admins may call
// it. A short cooldown collapses bursts (e.g. publishing several posts quickly)
// into a single rebuild. NOTE: the prerender only READS posts, so a rebuild
// never produces a publish event — no infinite loop.

let lastTriggeredAt = 0;
const COOLDOWN_MS = 60 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!url || !serviceKey) return res.status(503).json({ error: 'Supabase not configured' });
  if (!hookUrl) return res.status(503).json({ error: 'Deploy hook not configured' });

  // Verify the caller is a logged-in admin via their Supabase JWT.
  const auth = req.headers.authorization;
  const token = typeof auth === 'string' && auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData.user) return res.status(401).json({ error: 'Invalid token' });

  const { data: adminRow } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .maybeSingle();
  if (!adminRow) return res.status(403).json({ error: 'Not an admin' });

  // Cooldown — collapse rapid publishes into one rebuild.
  const now = Date.now();
  if (now - lastTriggeredAt < COOLDOWN_MS) {
    return res.status(200).json({ ok: true, skipped: true, reason: 'cooldown' });
  }

  try {
    const hookRes = await fetch(hookUrl, { method: 'POST' });
    if (!hookRes.ok) throw new Error(`Deploy hook responded ${hookRes.status}`);
    lastTriggeredAt = now;
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ error: e instanceof Error ? e.message : 'Hook failed' });
  }
}
