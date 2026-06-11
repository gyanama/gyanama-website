// Shared types for blog posts (mirrors the `posts` table in Supabase).

export type PostStatus = 'draft' | 'published';

// ---------------------------------------------------------------------------
// Block-based content model (a post body is an ordered array of blocks)
// ---------------------------------------------------------------------------
export type BlockType =
  | 'paragraph'
  | 'heading'
  | 'image'
  | 'list'
  | 'quote'
  | 'split_section';

export interface SplitSectionValue {
  title: string;
  description: string;
  subTitle: string;
  list: string[];
  footer: string;
}

export interface ContentBlock {
  type: BlockType;
  // paragraph/heading/quote → string; list → string[]; image → image url string;
  // split_section → SplitSectionValue
  value: string | string[] | SplitSectionValue;
  imageCaption?: string; // image blocks
  image?: string; // split_section image url
  layout?: 'left' | 'right'; // split_section layout
}

export const BLOG_CATEGORIES = [
  'Product Updates',
  'School Management',
  'AI in Education',
  'Guides & Tips',
  'Case Studies',
  'Announcements',
] as const;

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: ContentBlock[];
  content_markdown: string | null; // legacy; superseded by `content`
  cover_image_url: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: string | null;
  category: string | null;
  read_time: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[];
}

// Fields the admin editor can write. id/timestamps are server-managed.
export type PostInput = Pick<
  Post,
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'content'
  | 'cover_image_url'
  | 'status'
  | 'author'
  | 'category'
  | 'read_time'
  | 'meta_title'
  | 'meta_description'
  | 'tags'
>;

// Lightweight shape used by listing cards (avoids pulling the full content blocks).
export type PostSummary = Omit<Post, 'content' | 'content_markdown'>;

export const POST_LIST_COLUMNS =
  'id,slug,title,excerpt,cover_image_url,status,published_at,created_at,updated_at,author,category,read_time,meta_title,meta_description,tags';

/** Convert a title into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // strip punctuation
    .replace(/[\s_-]+/g, '-') // collapse whitespace/underscores to a hyphen
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

/** A fresh block of the given type with sensible empty defaults. */
export function makeBlock(type: BlockType): ContentBlock {
  switch (type) {
    case 'list':
      return { type, value: [''] };
    case 'image':
      return { type, value: '', imageCaption: '' };
    case 'split_section':
      return {
        type,
        layout: 'left',
        image: '',
        value: { title: '', description: '', subTitle: '', list: [''], footer: '' },
      };
    default:
      return { type, value: '' };
  }
}

/** Estimate read time from blocks (~200 wpm), e.g. "4 min read". */
export function estimateReadTime(blocks: ContentBlock[]): string {
  const text = blocks
    .map((b) => {
      if (typeof b.value === 'string') return b.value;
      if (Array.isArray(b.value)) return b.value.join(' ');
      const v = b.value as SplitSectionValue;
      return [v.title, v.description, v.subTitle, v.footer, ...(v.list || [])].join(' ');
    })
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
