import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import {
  Post,
  PostInput,
  PostSummary,
  POST_LIST_COLUMNS,
} from '@/lib/blog-types';

export const POSTS_PAGE_SIZE = 9;

// ----------------------------------------------------------------------------
// Public queries (anon — RLS returns only published posts)
// ----------------------------------------------------------------------------

export interface PublishedPostsResult {
  posts: PostSummary[];
  total: number;
}

export function usePublishedPosts(page: number) {
  return useQuery({
    queryKey: ['posts', 'published', page],
    queryFn: async (): Promise<PublishedPostsResult> => {
      const from = (page - 1) * POSTS_PAGE_SIZE;
      const to = from + POSTS_PAGE_SIZE - 1;
      const { data, error, count } = await supabase
        .from('posts')
        .select(POST_LIST_COLUMNS, { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(from, to);
      if (error) throw error;
      return { posts: (data ?? []) as PostSummary[], total: count ?? 0 };
    },
  });
}

export function usePostBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['posts', 'slug', slug],
    enabled: Boolean(slug),
    queryFn: async (): Promise<Post | null> => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug!)
        .eq('status', 'published')
        .maybeSingle();
      if (error) throw error;
      return (data as Post) ?? null;
    },
  });
}

// ----------------------------------------------------------------------------
// Admin queries/mutations (require an authenticated admin session; RLS enforced)
// ----------------------------------------------------------------------------

export function useAdminPosts() {
  return useQuery({
    queryKey: ['admin', 'posts'],
    queryFn: async (): Promise<PostSummary[]> => {
      const { data, error } = await supabase
        .from('posts')
        .select(POST_LIST_COLUMNS)
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as PostSummary[];
    },
  });
}

export function useAdminPost(id: string | undefined) {
  return useQuery({
    queryKey: ['admin', 'posts', id],
    enabled: Boolean(id),
    queryFn: async (): Promise<Post | null> => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id!)
        .maybeSingle();
      if (error) throw error;
      return (data as Post) ?? null;
    },
  });
}

function withPublishTimestamp(input: PostInput): PostInput & { published_at?: string | null } {
  // Stamp published_at when publishing; clear it when reverting to draft.
  if (input.status === 'published') {
    return { ...input, published_at: new Date().toISOString() };
  }
  return { ...input, published_at: null };
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: PostInput): Promise<Post> => {
      const { data, error } = await supabase
        .from('posts')
        .insert(withPublishTimestamp(input))
        .select('*')
        .single();
      if (error) throw error;
      return data as Post;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'posts'] });
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
      wasPublished,
    }: {
      id: string;
      input: PostInput;
      wasPublished: boolean;
    }): Promise<Post> => {
      // Only (re)stamp published_at on the draft->published transition so edits
      // to an already-published post keep their original publish date.
      const patch: PostInput & { published_at?: string | null } = { ...input };
      if (input.status === 'published' && !wasPublished) {
        patch.published_at = new Date().toISOString();
      } else if (input.status === 'draft') {
        patch.published_at = null;
      }
      const { data, error } = await supabase
        .from('posts')
        .update(patch)
        .eq('id', id)
        .select('*')
        .single();
      if (error) throw error;
      return data as Post;
    },
    onSuccess: (post) => {
      qc.invalidateQueries({ queryKey: ['admin', 'posts'] });
      qc.invalidateQueries({ queryKey: ['posts'] });
      qc.invalidateQueries({ queryKey: ['admin', 'posts', post.id] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'posts'] });
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useTogglePublish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      publish,
    }: {
      id: string;
      publish: boolean;
    }): Promise<Post> => {
      const { data, error } = await supabase
        .from('posts')
        .update({
          status: publish ? 'published' : 'draft',
          published_at: publish ? new Date().toISOString() : null,
        })
        .eq('id', id)
        .select('*')
        .single();
      if (error) throw error;
      return data as Post;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'posts'] });
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// Upload an image to the public `blog-images` bucket; returns its public URL.
// `folder` separates cover images from inline content/section images.
export async function uploadImage(file: File, folder = 'covers'): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
  return data.publicUrl;
}

export const uploadCoverImage = (file: File) => uploadImage(file, 'covers');
