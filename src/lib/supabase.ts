import { createClient } from '@supabase/supabase-js';

// Public client (anon key). Safe to ship in the browser bundle: all access is
// gated by Row Level Security in Supabase. Analytics tables are closed to anon;
// only published posts are readable without an authenticated admin session.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // Helpful nudge during local dev; the blog/admin features need these set.
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. ' +
      'Blog and admin features will be unavailable until they are configured.',
  );
}

// Falls back to harmless placeholder values so importing this module never throws
// when env is missing (e.g. during prerender of non-blog routes). Calls will fail
// gracefully and the UI handles empty/error states.
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'public-anon-key-placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
