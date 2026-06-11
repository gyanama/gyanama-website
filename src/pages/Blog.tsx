import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CalendarDays } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  BlogListingSchema,
  BreadcrumbSchema,
  OrganizationSchema,
} from '@/components/seo/JsonLd';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { usePublishedPosts, POSTS_PAGE_SIZE } from '@/hooks/queries/usePosts';
import type { PostSummary } from '@/lib/blog-types';

function formatDate(value: string | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function PostCard({ post }: { post: PostSummary }) {
  return (
    <GlassCard hover className="overflow-hidden flex flex-col">
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[16/9] object-cover"
          />
        ) : (
          <div className="w-full aspect-[16/9] gradient-primary" />
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {post.category && (
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {post.category}
              </span>
            )}
            {post.published_at && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="w-3.5 h-3.5" />
                {formatDate(post.published_at)}
                {post.read_time ? ` · ${post.read_time}` : ''}
              </span>
            )}
          </div>
          <h2 className="text-xl font-semibold leading-snug mb-2">{post.title}</h2>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
              {post.excerpt}
            </p>
          )}
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Read more
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </GlassCard>
  );
}

export default function Blog() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePublishedPosts(page);

  const posts = data?.posts ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PAGE_SIZE));

  return (
    <PageLayout>
      <SEOHead ogType="website" />
      <OrganizationSchema />
      <BlogListingSchema />
      <BreadcrumbSchema pageName="Blog" pagePath="/blog" />

      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-display mb-6">
              The GYANAMA <span className="text-gradient-primary">Blog</span>
            </h1>
            <p className="text-subtitle">
              Insights, guides, and updates on AI-powered school management for modern
              Indian schools.
            </p>
          </motion.div>

          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card rounded-3xl h-80 animate-pulse" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center text-muted-foreground py-20">
              We couldn't load posts right now. Please try again later.
            </p>
          )}

          {!isLoading && !isError && posts.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              No posts yet — check back soon.
            </p>
          )}

          {posts.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
