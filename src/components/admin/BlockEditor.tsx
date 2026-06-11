import { useState } from 'react';
import { toast } from 'sonner';
import {
  Type,
  Heading,
  Image as ImageIcon,
  List as ListIcon,
  Quote,
  Columns2,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Loader2,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { uploadImage } from '@/hooks/queries/usePosts';
import type { ContentBlock, BlockType, SplitSectionValue } from '@/lib/blog-types';
import { makeBlock } from '@/lib/blog-types';

const BLOCK_BUTTONS: { type: BlockType; label: string; icon: typeof Type }[] = [
  { type: 'paragraph', label: 'Paragraph', icon: Type },
  { type: 'heading', label: 'Heading', icon: Heading },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'list', label: 'List', icon: ListIcon },
  { type: 'quote', label: 'Quote', icon: Quote },
  { type: 'split_section', label: 'Split Section', icon: Columns2 },
];

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const addBlock = (type: BlockType) => onChange([...blocks, makeBlock(type)]);

  const updateBlock = (index: number, patch: Partial<ContentBlock>) => {
    const next = [...blocks];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const removeBlock = (index: number) => {
    const next = [...blocks];
    next.splice(index, 1);
    onChange(next);
  };

  const moveBlock = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const handleImage = async (index: number, file: File | undefined, forSplit = false) => {
    if (!file) return;
    setUploadingIndex(index);
    try {
      const url = await uploadImage(file, forSplit ? 'sections' : 'content');
      if (forSplit) updateBlock(index, { image: url });
      else updateBlock(index, { value: url });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Image upload failed');
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add-block toolbar */}
      <div className="flex flex-wrap gap-2">
        {BLOCK_BUTTONS.map((b) => (
          <button
            key={b.type}
            type="button"
            onClick={() => addBlock(b.type)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-sm font-medium hover:bg-muted transition-colors"
          >
            <b.icon className="w-4 h-4" /> {b.label}
          </button>
        ))}
      </div>

      {blocks.length === 0 && (
        <div className="text-center text-muted-foreground py-10 border border-dashed rounded-xl text-sm">
          Add content blocks above to build your post.
        </div>
      )}

      {blocks.map((block, index) => (
        <div key={index} className="rounded-xl border border-border bg-muted/30 p-4">
          {/* Block header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {block.type.replace('_', ' ')}
            </span>
            <div className="flex items-center gap-1">
              <IconBtn title="Move up" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                <ArrowUp className="w-4 h-4" />
              </IconBtn>
              <IconBtn
                title="Move down"
                onClick={() => moveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
              >
                <ArrowDown className="w-4 h-4" />
              </IconBtn>
              <IconBtn title="Delete" onClick={() => removeBlock(index)} danger>
                <Trash2 className="w-4 h-4" />
              </IconBtn>
            </div>
          </div>

          {/* Paragraph */}
          {block.type === 'paragraph' && (
            <Textarea
              rows={3}
              value={block.value as string}
              onChange={(e) => updateBlock(index, { value: e.target.value })}
              placeholder="Enter paragraph text…"
            />
          )}

          {/* Heading */}
          {block.type === 'heading' && (
            <Input
              className="text-lg font-semibold"
              value={block.value as string}
              onChange={(e) => updateBlock(index, { value: e.target.value })}
              placeholder="Enter heading text…"
            />
          )}

          {/* Quote */}
          {block.type === 'quote' && (
            <Textarea
              rows={2}
              className="italic"
              value={block.value as string}
              onChange={(e) => updateBlock(index, { value: e.target.value })}
              placeholder="Enter quote…"
            />
          )}

          {/* Image */}
          {block.type === 'image' && (
            <div className="space-y-3">
              <ImageUpload
                url={block.value as string}
                uploading={uploadingIndex === index}
                onPick={(f) => handleImage(index, f)}
                onClear={() => updateBlock(index, { value: '' })}
              />
              <Input
                value={block.imageCaption ?? ''}
                onChange={(e) => updateBlock(index, { imageCaption: e.target.value })}
                placeholder="Image caption (optional)"
              />
            </div>
          )}

          {/* List */}
          {block.type === 'list' && (
            <ListEditor
              items={block.value as string[]}
              onChange={(items) => updateBlock(index, { value: items })}
            />
          )}

          {/* Split section */}
          {block.type === 'split_section' && (
            <SplitEditor
              block={block}
              uploading={uploadingIndex === index}
              onImage={(f) => handleImage(index, f, true)}
              onClearImage={() => updateBlock(index, { image: '' })}
              onLayout={(layout) => updateBlock(index, { layout })}
              onValue={(value) => updateBlock(index, { value })}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed ${
        danger ? 'text-muted-foreground hover:text-destructive' : 'text-muted-foreground'
      }`}
    >
      {children}
    </button>
  );
}

function ImageUpload({
  url,
  uploading,
  onPick,
  onClear,
}: {
  url: string;
  uploading: boolean;
  onPick: (file: File | undefined) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {url && <img src={url} alt="" className="h-20 w-32 object-cover rounded-lg border" />}
      <label className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-border cursor-pointer hover:bg-muted bg-white">
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        {url ? 'Replace' : 'Upload image'}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
      </label>
      {url && (
        <button type="button" onClick={onClear} className="text-sm text-muted-foreground hover:text-destructive">
          Remove
        </button>
      )}
    </div>
  );
}

function ListEditor({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  const set = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">•</span>
          <Input value={item} onChange={(e) => set(i, e.target.value)} placeholder={`List item ${i + 1}`} />
          {items.length > 1 && (
            <button type="button" onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="inline-flex items-center gap-1 text-sm text-primary font-medium"
      >
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  );
}

function SplitEditor({
  block,
  uploading,
  onImage,
  onClearImage,
  onLayout,
  onValue,
}: {
  block: ContentBlock;
  uploading: boolean;
  onImage: (file: File | undefined) => void;
  onClearImage: () => void;
  onLayout: (layout: 'left' | 'right') => void;
  onValue: (value: SplitSectionValue) => void;
}) {
  const v = block.value as SplitSectionValue;
  const patch = (p: Partial<SplitSectionValue>) => onValue({ ...v, ...p });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <span className="text-xs font-semibold text-muted-foreground">SECTION IMAGE</span>
        <ImageUpload url={block.image ?? ''} uploading={uploading} onPick={onImage} onClear={onClearImage} />
        <div>
          <span className="text-xs font-semibold text-muted-foreground">LAYOUT</span>
          <Select value={block.layout ?? 'left'} onValueChange={(val) => onLayout(val as 'left' | 'right')}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Image on left</SelectItem>
              <SelectItem value="right">Image on right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          className="font-semibold"
          value={v.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="Section title"
        />
        <Textarea
          rows={3}
          value={v.description}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder="Section description"
        />
        <Input
          value={v.subTitle}
          onChange={(e) => patch({ subTitle: e.target.value })}
          placeholder="Sub-title for list"
        />
        <ListEditor items={v.list} onChange={(list) => patch({ list })} />
        <Input
          className="italic"
          value={v.footer}
          onChange={(e) => patch({ footer: e.target.value })}
          placeholder="Section footer text"
        />
      </div>
    </div>
  );
}
