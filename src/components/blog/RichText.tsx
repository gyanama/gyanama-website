import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

// Allow link target/rel on top of the secure default schema.
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
  },
};

/**
 * Renders a single string of *inline* Markdown — bold (`**`), italic (`*`),
 * links (`[text](url)`), and inline code — without wrapping it in its own
 * <p>. Safe to drop inside <p>, <li>, <blockquote>, headings, etc. External
 * links open in a new tab; internal links (e.g. /blog/other-post) navigate
 * in-place, which is ideal for SEO interlinking.
 */
export function RichText({ value }: { value: string }) {
  if (!value) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeSanitize, schema]]}
      components={{
        // Unwrap the paragraph so this renders as inline content.
        p: ({ children }) => <>{children}</>,
        a: ({ href, children }) => {
          const external = !!href && /^https?:\/\//i.test(href);
          return (
            <a
              href={href}
              className="text-primary font-medium underline underline-offset-2 hover:opacity-80"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {value}
    </ReactMarkdown>
  );
}
