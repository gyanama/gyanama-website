import type { ContentBlock, SplitSectionValue } from '@/lib/blog-types';
import { RichText } from './RichText';

/**
 * Renders block-based post content (paragraph / heading / image / list / quote /
 * split_section) to styled HTML for the public blog. Mirrors the block model in
 * the admin BlockEditor.
 */
export function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-foreground/80 leading-relaxed">
          <RichText value={block.value as string} />
        </p>
      );

    case 'heading': {
      const text = block.value as string;
      // Use padding-top (not margin) for extra separation so it stacks with the
      // container's space-y rhythm instead of conflicting with it. Sizes/weights
      // form a clear H2 > H3 > H4 ladder.
      if (block.level === 'h4') {
        // Smallest: uppercase label style so it never competes with H2/H3.
        return (
          <h4 className="text-sm md:text-base font-semibold uppercase tracking-wide pt-3 text-muted-foreground">
            {text}
          </h4>
        );
      }
      if (block.level === 'h3') {
        // Subheading: clearly smaller than H2, with a colored accent bar so it
        // reads as belonging under the heading above it.
        return (
          <h3 className="flex items-center gap-2.5 text-lg md:text-xl font-semibold tracking-tight pt-5 text-foreground">
            <span className="inline-block w-1 h-5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            {text}
          </h3>
        );
      }
      return (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight pt-8 border-t border-border/50 text-foreground">
          {text}
        </h2>
      );
    }

    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary/40 pl-5 py-1 italic text-lg text-foreground/75">
          <RichText value={block.value as string} />
        </blockquote>
      );

    case 'list':
      return (
        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          {(block.value as string[]).filter(Boolean).map((item, i) => (
            <li key={i}>
              <RichText value={item} />
            </li>
          ))}
        </ul>
      );

    case 'image': {
      const url = block.value as string;
      if (!url) return null;
      return (
        <figure className="my-2">
          <img src={url} alt={block.imageCaption || ''} loading="lazy" className="w-full rounded-2xl" />
          {block.imageCaption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {block.imageCaption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'split_section': {
      const v = block.value as SplitSectionValue;
      const imageOnRight = block.layout === 'right';
      const image = block.image ? (
        <div className="flex-1">
          <img src={block.image} alt={v.title || ''} loading="lazy" className="w-full rounded-2xl object-cover" />
        </div>
      ) : null;
      const text = (
        <div className="flex-1 space-y-3">
          {v.title && (
            <h3 className="text-xl md:text-2xl font-semibold">
              <RichText value={v.title} />
            </h3>
          )}
          {v.description && (
            <p className="text-foreground/80 leading-relaxed">
              <RichText value={v.description} />
            </p>
          )}
          {v.subTitle && (
            <p className="font-semibold">
              <RichText value={v.subTitle} />
            </p>
          )}
          {v.list?.filter(Boolean).length > 0 && (
            <ul className="list-disc pl-6 space-y-1.5 text-foreground/80">
              {v.list.filter(Boolean).map((li, i) => (
                <li key={i}>
                  <RichText value={li} />
                </li>
              ))}
            </ul>
          )}
          {v.footer && (
            <p className="text-sm italic text-muted-foreground">
              <RichText value={v.footer} />
            </p>
          )}
        </div>
      );
      return (
        <div
          className={`glass-card rounded-2xl p-6 my-2 flex flex-col gap-6 ${
            image ? 'md:flex-row md:items-center' : ''
          }`}
        >
          {imageOnRight ? (
            <>
              {text}
              {image}
            </>
          ) : (
            <>
              {image}
              {text}
            </>
          )}
        </div>
      );
    }

    default:
      return null;
  }
}
