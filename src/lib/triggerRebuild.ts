import { supabase } from '@/lib/supabase';

/**
 * Asks the server to fire the Vercel Deploy Hook so the site rebuilds and the
 * Playwright prerender picks up newly published posts. Authorized with the
 * caller's Supabase JWT (verified server-side as an admin). Best-effort: a
 * failure here doesn't block the publish itself.
 */
export async function triggerRebuild(): Promise<{ ok: boolean; error?: string }> {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return { ok: false, error: 'Not authenticated' };

    const res = await fetch('/api/trigger-rebuild', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error || `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Request failed' };
  }
}
