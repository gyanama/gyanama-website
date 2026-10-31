import { cacheLife, cacheTag } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { POST_LIST_COLUMNS, type Post, type PostSummary } from '@/lib/blog-types';

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getAllPublishedPosts(): Promise<PostSummary[]> {
  'use cache';
  cacheLife('days');
  cacheTag('posts');
  const supabase = publicClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from('posts').select(POST_LIST_COLUMNS).eq('status', 'published').order('published_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as PostSummary[];
}

export async function getPublishedSlugs(): Promise<{ slug: string; updated_at: string | null; published_at: string | null }[]> {
  'use cache';
  cacheLife('days');
  cacheTag('posts');
  const supabase = publicClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from('posts').select('slug, updated_at, published_at').eq('status', 'published').order('published_at', { ascending: false });
  if (error) return [];
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  'use cache';
  cacheLife('days');
  cacheTag('posts');
  const supabase = publicClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error) return null;
  return (data as Post) ?? null;
}
