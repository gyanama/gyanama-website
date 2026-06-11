import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  ArticleSchema,
  BreadcrumbSchema,
  OrganizationSchema,
} from '@/components/seo/JsonLd';
import { Markdown } from '@/components/blog/Markdown';
import { BlogContent } from '@/components/blog/BlogContent';
import { Button } from '@/components/ui/button';
import { usePostBySlug } from '@/hooks/queries/usePosts';

function formatDate(value: string | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = usePostBySlug(slug);

  // Not found: query settled with no post (or errored). Marker lets the
  // prerender script detect a 404 and skip writing a stale HTML file.
  if (!isLoading && (isError || !post)) {
    return (
      <PageLayout>
        <SEOHead title="Post not found" noindex />
        <section className="section-padding" data-blog-404>
          <div className="container-narrow text-center py-20">
            <h1 className="text-headline mb-4">Post not found</h1>
            <p className="text-subtitle mb-8">
              This post may have been moved or unpublished.
            </p>
            <Link to="/blog">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4" /> Back to blog
              </Button>
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {post && (
        <>
          <SEOHead
            title={post.meta_title || post.title}
            description={post.meta_description || post.excerpt || undefined}
            canonical={`/blog/${post.slug}`}
            ogImage={post.cover_image_url || undefined}
            ogType="article"
          />
          <OrganizationSchema />
          <ArticleSchema
            title={post.title}
            description={post.meta_description || post.excerpt || post.title}
            slug={post.slug}
            coverImage={post.cover_image_url}
            datePublished={post.published_at}
            dateModified={post.updated_at}
            author={post.author}
          />
          <BreadcrumbSchema pageName={post.title} pagePath={`/blog/${post.slug}`} />
        </>
      )}

      <section className="section-padding">
        <div className="container-narrow">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>

          {isLoading && (
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-64 w-full bg-muted rounded-2xl animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>
          )}

          {post && (
            <motion.article
              data-post={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                  {post.category && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  )}
                  {post.published_at && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      {formatDate(post.published_at)}
                      {post.author ? ` · ${post.author}` : ''}
                      {post.read_time ? ` · ${post.read_time}` : ''}
                    </span>
                  )}
                </div>
                <h1 className="text-headline mb-4">{post.title}</h1>
                {post.excerpt && <p className="text-subtitle">{post.excerpt}</p>}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full rounded-2xl mb-10 object-cover"
                />
              )}

              {/* Block-based content (new) with a fallback to legacy markdown */}
              {Array.isArray(post.content) && post.content.length > 0 ? (
                <BlogContent blocks={post.content} />
              ) : post.content_markdown ? (
                <Markdown content={post.content_markdown} />
              ) : null}
            </motion.article>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
