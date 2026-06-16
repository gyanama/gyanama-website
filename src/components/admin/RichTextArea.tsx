import { useRef } from 'react';
import { Bold, Italic, Link as LinkIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface RichTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}

/**
 * A textarea with a small Markdown formatting toolbar (Bold, Italic, Link).
 * The buttons wrap the current text selection, so authors can structure copy
 * and add links without knowing Markdown. Output is a Markdown string that the
 * public site renders via <RichText/>.
 */
export function RichTextArea({ value, onChange, rows = 3, placeholder, className }: RichTextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const surround = (before: string, after: string = before, placeholderText = 'text') => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholderText;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = start + before.length + selected.length;
    });
  };

  const insertLink = () => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || 'link text';
    const urlInput = window.prompt(
      'Link URL — use a full https:// URL for external links, or /blog/other-post for internal links:',
      'https://',
    );
    if (!urlInput) return;
    const url = urlInput.trim();
    const md = `[${selected}](${url})`;
    const next = value.slice(0, start) + md + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const caret = start + md.length;
      el.selectionStart = el.selectionEnd = caret;
    });
  };

  const Btn = ({
    onClick,
    title,
    children,
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex items-center gap-0.5 mb-1.5">
        <Btn title="Bold (**)" onClick={() => surround('**')}>
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn title="Italic (*)" onClick={() => surround('*')}>
          <Italic className="w-4 h-4" />
        </Btn>
        <Btn title="Insert link" onClick={insertLink}>
          <LinkIcon className="w-4 h-4" />
        </Btn>
        <span className="ml-2 text-[11px] text-muted-foreground">
          Select text, then click a button. Supports **bold**, *italic*, [links](url).
        </span>
      </div>
      <Textarea
        ref={ref}
        rows={rows}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
