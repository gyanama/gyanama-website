import Image from 'next/image';
import Link from 'next/link';
import type { PostSummary } from '@/lib/blog-types';

export function formatDate(value: string | null, month: 'short' | 'long' = 'short'): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', { year: 'numeric', month, day: 'numeric' });
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink/[0.07] transition hover:shadow-[0_30px_60px_-40px_rgba(39,24,126,0.5)]">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-peri-wash">
        {post.cover_image_url && <Image src={post.cover_image_url} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />}
      </div>
      <div className="flex flex-1 flex-col p-6 font-inter">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px] text-ink/55">
          {post.category && <span className="rounded-full bg-peri-wash px-2.5 py-0.5 font-semibold text-indigo">{post.category}</span>}
          {post.published_at && (
            <span>
              {formatDate(post.published_at)}
              {post.read_time ? ` · ${post.read_time}` : ''}
            </span>
          )}
        </div>
        <h2 className="font-fraunces text-[1.3rem] font-medium leading-snug text-ink">{post.title}</h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-[14.5px] leading-relaxed text-ink/65">{post.excerpt}</p>}
        <span className="mt-auto pt-4 text-[14px] font-semibold text-indigo">Read the post</span>
      </div>
    </Link>
  );
}
