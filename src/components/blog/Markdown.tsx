import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { cn } from '@/lib/utils';

// Allow a few extra safe attributes (e.g. image titles) on top of the secure
// default schema. rehype-sanitize strips scripts/event handlers/unsafe URLs.
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    img: [...(defaultSchema.attributes?.img ?? []), 'loading', 'title'],
    a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
  },
};

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Renders trusted-but-sanitized Markdown to styled HTML using the Tailwind
 * `prose` typography classes. Shared by the public blog post page and the
 * admin editor's live preview so they always match.
 */
export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={cn('prose prose-slate max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, schema]]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          img: ({ node, ...props }) => (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img {...props} loading="lazy" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
