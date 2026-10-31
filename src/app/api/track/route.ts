import { clientIp, memoryRateLimiter, readJson } from '@/lib/server/request';
import { serviceClient } from '@/lib/server/supabase-admin';

const limiter = memoryRateLimiter(120, 60 * 1000);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DEVICES = new Set(['mobile', 'tablet', 'desktop']);
const MAX_DURATION = 3600;

function clean(value: unknown, maxLen = 512): string | null {
  if (typeof value !== 'string') return null;
  const v = value.replace(/[\r\n]/g, ' ').trim().slice(0, maxLen);
  return v || null;
}

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (limiter.limited(ip)) return Response.json({ error: 'Too many requests' }, { status: 429 });
  limiter.record(ip);

  const supabase = serviceClient();
  if (!supabase) return Response.json({ error: 'Analytics not configured' }, { status: 503 });

  const body = await readJson<Record<string, unknown>>(req);
  if (!body) return Response.json({ error: 'Invalid body' }, { status: 400 });

  const sessionId = clean(body.session_id, 40);
  const path = clean(body.path, 512);
  if (!sessionId || !UUID_RE.test(sessionId)) return Response.json({ error: 'Bad session_id' }, { status: 400 });
  if (!path || !path.startsWith('/')) return Response.json({ error: 'Bad path' }, { status: 400 });

  try {
    if (body.type === 'pageview') {
      const device = clean(body.device, 10);
      const referrer = clean(body.referrer, 512);
      const country = clean(req.headers.get('x-vercel-ip-country'), 4);
      const { data: existing } = await supabase.from('analytics_sessions').select('session_id, started_at, pageview_count').eq('session_id', sessionId).maybeSingle();
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
          .update({ last_path: path, last_seen_at: new Date().toISOString(), pageview_count: (existing.pageview_count ?? 1) + 1, is_bounce: false })
          .eq('session_id', sessionId);
      }
      await supabase.from('analytics_pageviews').insert({ session_id: sessionId, path });
      return Response.json({ ok: true });
    }

    if (body.type === 'heartbeat') {
      const { data: session } = await supabase.from('analytics_sessions').select('started_at, pageview_count').eq('session_id', sessionId).maybeSingle();
      if (!session) return Response.json({ ok: true });
      const now = Date.now();
      const duration = Math.min(MAX_DURATION, Math.max(0, Math.round((now - new Date(session.started_at).getTime()) / 1000)));
      const isBounce = (session.pageview_count ?? 1) <= 1 && duration < 10;
      await supabase
        .from('analytics_sessions')
        .update({ last_seen_at: new Date(now).toISOString(), last_path: path, duration_seconds: duration, is_bounce: isBounce })
        .eq('session_id', sessionId);
      return Response.json({ ok: true });
    }

    return Response.json({ error: 'Unknown event type' }, { status: 400 });
  } catch {
    return Response.json({ ok: false });
  }
}
