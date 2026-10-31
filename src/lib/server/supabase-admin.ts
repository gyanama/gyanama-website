import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function serviceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function adminUserId(req: Request, supabase: SupabaseClient): Promise<{ id: string } | { status: number; error: string }> {
  const auth = req.headers.get('authorization');
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return { status: 401, error: 'Missing token' };
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return { status: 401, error: 'Invalid token' };
  const { data: row } = await supabase.from('admins').select('user_id').eq('user_id', data.user.id).maybeSingle();
  if (!row) return { status: 403, error: 'Not an admin' };
  return { id: data.user.id };
}
