import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// First-party analytics ingest. Writes go through the service-role key so the
// analytics tables can stay completely closed to the public anon key (RLS).
// Handles two event types: 'pageview' and 'heartbeat'.

const ipTimestamps = new Map<string, number[]>();
const RATE_LIMIT_MAX = 120; // generous: heartbeats every 15s + pageviews
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipTimestamps.get(ip) || []).filter((t) => t > now - RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  ipTimestamps.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd) && fwd.length) return fwd[0];
  return req.socket?.remoteAddress || 'unknown';
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DEVICES = new Set(['mobile', 'tablet', 'desktop']);
const MAX_DURATION = 3600; // cap a single session at 1h to avoid bogus values

function clean(value: unknown, maxLen = 512): string | null {
  if (typeof value !== 'string') return null;
  const v = value.replace(/[\r\n]/g, ' ').trim().slice(0, maxLen);
  return v || null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Too many requests' });

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return res.status(503).json({ error: 'Analytics not configured' });

  let body: Record<string, unknown>;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body as Record<string, unknown>);
    if (!body) throw new Error('empty');
  } catch {
    return res.status(400).json({ error: 'Invalid body' });
  }

  const type = body.type;
  const sessionId = clean(body.session_id, 40);
  const path = clean(body.path, 512);
  if (!sessionId || !UUID_RE.test(sessionId)) return res.status(400).json({ error: 'Bad session_id' });
  if (!path || !path.startsWith('/')) return res.status(400).json({ error: 'Bad path' });

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  try {
    if (type === 'pageview') {
      const device = clean(body.device, 10);
      const referrer = clean(body.referrer, 512);
      const country = clean(req.headers['x-vercel-ip-country'] as string, 4);

      const { data: existing } = await supabase
        .from('analytics_sessions')
        .select('session_id, started_at, pageview_count')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (!existing) {
        await supabase.from('analytics_sessions').insert({
          session_id: sessionId,
          first_path: path,
          last_path: path,
          referrer,
          device: device && DEVICES.has(device) ? device : null,
          country,
          pageview_count: 1,
          is_bounce: true,
        });
      } else {
        await supabase
          .from('analytics_sessions')
          .update({
            last_path: path,
            last_seen_at: new Date().toISOString(),
            pageview_count: (existing.pageview_count ?? 1) + 1,
            is_bounce: false,
          })
          .eq('session_id', sessionId);
      }

      await supabase.from('analytics_pageviews').insert({ session_id: sessionId, path });
      return res.status(200).json({ ok: true });
    }

    if (type === 'heartbeat') {
      const { data: session } = await supabase
        .from('analytics_sessions')
        .select('started_at, pageview_count')
        .eq('session_id', sessionId)
        .maybeSingle();
      if (!session) return res.status(200).json({ ok: true }); // nothing to update yet

      const now = Date.now();
      const started = new Date(session.started_at).getTime();
      const duration = Math.min(MAX_DURATION, Math.max(0, Math.round((now - started) / 1000)));
      const isBounce = (session.pageview_count ?? 1) <= 1 && duration < 10;

      await supabase
        .from('analytics_sessions')
        .update({
          last_seen_at: new Date(now).toISOString(),
          last_path: path,
          duration_seconds: duration,
          is_bounce: isBounce,
        })
        .eq('session_id', sessionId);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Unknown event type' });
  } catch {
    // best-effort: never surface analytics errors
    return res.status(200).json({ ok: false });
  }
}
