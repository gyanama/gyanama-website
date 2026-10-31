import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { getPostBySlug, getPublishedSlugs } from '@/lib/blog';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { BlogContent } from '@/components/blog/BlogContent';
import { Markdown } from '@/components/blog/Markdown';
import { formatDate } from '@/components/blog/PostCard';
import { CtaBand } from '@/components/site/CtaBand';

const NONE = '__none__';

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.length ? slugs.map((s) => ({ slug: s.slug })) : [{ slug: NONE }];
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = slug === NONE ? null : await getPostBySlug(slug);
  if (!post) return { title: 'Post not found', robots: { index: false, follow: false } };
  return pageMetadata({
    path: `/blog/${post.slug}`,
    title: (post.meta_title || post.title).trim(),
    description: (post.meta_description || post.excerpt || post.title).trim(),
    ogImage: post.cover_image_url || undefined,
    type: 'article',
  });
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const post = slug === NONE ? null : await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.meta_description || post.excerpt || post.title}
        slug={post.slug}
        coverImage={post.cover_image_url}
        datePublished={post.published_at}
        dateModified={post.updated_at}
        author={post.author}
      />
      <BreadcrumbSchema items={[{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 pb-16 pt-12 md:px-8 md:pt-16">
        <Link href="/blog" className="font-inter text-[14px] font-medium text-ink/60 hover:text-indigo">
          All posts
        </Link>
        <header className="mb-8 mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-inter text-[13px] text-ink/60">
            {post.category && <span className="rounded-full bg-peri-wash px-3 py-1 font-semibold text-indigo">{post.category}</span>}
            {post.published_at && (
              <span>
                {formatDate(post.published_at, 'long')}
                {post.author ? ` · ${post.author}` : ''}
                {post.read_time ? ` · ${post.read_time}` : ''}
              </span>
            )}
          </div>
          <h1 className="font-fraunces text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.8rem]">{post.title}</h1>
          {post.excerpt && <p className="mt-4 font-inter text-[16px] leading-relaxed text-ink/65 md:text-lg">{post.excerpt}</p>}
          {post.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="rounded-full bg-paper px-3 py-1 font-inter text-xs font-medium text-ink/70">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        {post.cover_image_url && (
          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image src={post.cover_image_url} alt={post.title} fill priority sizes="(min-width: 768px) 720px, 92vw" className="object-cover" />
          </div>
        )}
        <div data-post={post.slug}>
          {Array.isArray(post.content) && post.content.length > 0 ? <BlogContent blocks={post.content} /> : post.content_markdown ? <Markdown content={post.content_markdown} /> : null}
        </div>
      </article>
      <CtaBand />
    </>
  );
}
