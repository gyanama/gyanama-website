import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getAllPublishedPosts } from '@/lib/blog';
import { BlogListingSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { PostCard } from '@/components/blog/PostCard';
import { CtaBand } from '@/components/site/CtaBand';
import { Kicker, WRAP } from '@/components/site/ui';

export const metadata: Metadata = pageMetadata({
  path: '/blog',
  title: 'Gyanama Blog: Running Smarter Schools',
  description: 'Guides for running an Indian school: attendance, fee follow-up, parent communication, and moving off paper registers and spreadsheets.',
});

export default async function BlogPage() {
  const posts = await getAllPublishedPosts();
  return (
    <>
      <BlogListingSchema />
      <BreadcrumbSchema items={[{ name: 'Blog', path: '/blog' }]} />
      <section className="bg-[linear-gradient(180deg,#F4F4FC_0%,#FFFFFF_100%)] pb-10 pt-14 md:pb-14 md:pt-20">
        <div className={WRAP}>
          <Kicker>Blog</Kicker>
          <h1 className="mt-4 max-w-3xl font-fraunces text-[2.1rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink md:text-[3.4rem]">The Gyanama blog</h1>
          <p className="mt-4 max-w-2xl font-inter text-[15px] leading-relaxed text-ink/65 md:text-lg">Guides for running an Indian school: attendance, fee follow-up, parent communication, and moving off registers and spreadsheets.</p>
        </div>
      </section>
      <section className="pb-16 md:pb-24">
        <div className={WRAP}>
          {posts.length === 0 ? (
            <p className="py-16 text-center font-inter text-ink/60">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
