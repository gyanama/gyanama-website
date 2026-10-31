import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
  },
};

export function RichText({ value }: { value: string }) {
  if (!value) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeSanitize, schema]]}
      components={{
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
