import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Upload, Save, Send, ArrowLeft, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BlockEditor } from '@/components/admin/BlockEditor';
import {
  useAdminPost,
  useCreatePost,
  useUpdatePost,
  uploadCoverImage,
} from '@/hooks/queries/usePosts';
import { triggerRebuild } from '@/lib/triggerRebuild';
import {
  slugify,
  estimateReadTime,
  BLOG_CATEGORIES,
  type PostInput,
  type ContentBlock,
} from '@/lib/blog-types';

const EMPTY: PostInput = {
  slug: '',
  title: '',
  excerpt: '',
  content: [],
  cover_image_url: null,
  status: 'draft',
  author: 'GYANAMA Team',
  category: BLOG_CATEGORIES[0],
  read_time: '',
  meta_title: '',
  meta_description: '',
  tags: [],
};

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, isLoading } = useAdminPost(id);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  // Auto-saved draft for NEW posts so nothing is lost on navigation/tab switches.
  const DRAFT_KEY = 'gy_post_draft_new';
  const readDraft = () => {
    if (id) return null;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const [form, setForm] = useState<PostInput>(() => readDraft()?.form ?? EMPTY);
  const [tagsText, setTagsText] = useState<string>(() => readDraft()?.tagsText ?? '');
  const [hadDraft, setHadDraft] = useState<boolean>(() => !id && !!readDraft());
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const wasPublished = existing?.status === 'published';

  // Persist the working draft (new posts only) on every change.
  useEffect(() => {
    if (id) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, tagsText }));
    } catch {
      /* storage full / unavailable — ignore */
    }
  }, [id, form, tagsText]);

  const discardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setForm(EMPTY);
    setTagsText('');
    setHadDraft(false);
  };

  useEffect(() => {
    if (existing) {
      setForm({
        slug: existing.slug,
        title: existing.title,
        excerpt: existing.excerpt ?? '',
        content: Array.isArray(existing.content) ? existing.content : [],
        cover_image_url: existing.cover_image_url,
        status: existing.status,
        author: existing.author ?? 'GYANAMA Team',
        category: existing.category ?? BLOG_CATEGORIES[0],
        read_time: existing.read_time ?? '',
        meta_title: existing.meta_title ?? '',
        meta_description: existing.meta_description ?? '',
        tags: existing.tags ?? [],
      });
      setTagsText((existing.tags ?? []).join(', '));
      setSlugTouched(true);
    }
  }, [existing]);

  const update = (patch: Partial<PostInput>) => setForm((f) => ({ ...f, ...patch }));

  const onTitleChange = (title: string) => {
    update({ title });
    if (!slugTouched) update({ slug: slugify(title) });
  };

  const handleCover = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCoverImage(file);
      update({ cover_image_url: url });
      toast.success('Cover image uploaded');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const save = async (publish: boolean) => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error('Title and slug are required');
      return;
    }
    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload: PostInput = {
      ...form,
      tags,
      excerpt: form.excerpt || null,
      cover_image_url: form.cover_image_url || null,
      author: form.author || null,
      category: form.category || null,
      read_time: form.read_time || estimateReadTime(form.content),
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      status: publish ? 'published' : 'draft',
    };

    try {
      if (isEdit && id) {
        await updatePost.mutateAsync({ id, input: payload, wasPublished });
      } else {
        await createPost.mutateAsync(payload);
      }
      localStorage.removeItem(DRAFT_KEY); // saved successfully — drop the draft
      if (publish) {
        toast.success('Published. Site will rebuild in ~1-2 min');
        triggerRebuild().then((r) => {
          if (!r.ok) toast.error(`Couldn't trigger rebuild: ${r.error}`);
        });
      } else {
        toast.success('Saved as draft');
      }
      navigate('/adminpanel/posts');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    }
  };

  const saving = createPost.isPending || updatePost.isPending;

  if (isEdit && isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate('/adminpanel/posts')}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to posts
      </button>
      <h1 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit Post' : 'New Post'}</h1>

      {hadDraft && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm">
          <span className="text-foreground/80">Restored your unsaved draft.</span>
          <button
            type="button"
            onClick={discardDraft}
            className="font-medium text-primary hover:underline shrink-0"
          >
            Start fresh
          </button>
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="How AI is changing school attendance"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update({ slug: slugify(e.target.value) });
            }}
            placeholder="ai-school-attendance"
          />
          <p className="text-xs text-muted-foreground">URL: /blog/{form.slug || '…'}</p>
        </div>

        {/* Meta row: author / category / read time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={form.author ?? ''}
              onChange={(e) => update({ author: e.target.value })}
              placeholder="GYANAMA Team"
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={form.category ?? ''} onValueChange={(v) => update({ category: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {BLOG_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="read_time">Read time</Label>
            <div className="flex gap-2">
              <Input
                id="read_time"
                value={form.read_time ?? ''}
                onChange={(e) => update({ read_time: e.target.value })}
                placeholder="auto"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                title="Auto-estimate from content"
                onClick={() => update({ read_time: estimateReadTime(form.content) })}
              >
                <Wand2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            rows={2}
            value={form.excerpt ?? ''}
            onChange={(e) => update({ excerpt: e.target.value })}
            placeholder="One or two sentences shown on the blog listing and in search results."
          />
        </div>

        {/* Featured image */}
        <div className="space-y-2">
          <Label>Featured image</Label>
          <div className="flex items-center gap-4">
            {form.cover_image_url && (
              <img
                src={form.cover_image_url}
                alt="cover"
                className="w-28 h-16 object-cover rounded-lg border border-border"
              />
            )}
            <label className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border cursor-pointer hover:bg-muted bg-white">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {form.cover_image_url ? 'Replace' : 'Upload'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleCover(e.target.files?.[0])}
              />
            </label>
            {form.cover_image_url && (
              <button
                onClick={() => update({ cover_image_url: null })}
                className="text-sm text-muted-foreground hover:text-destructive"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Block-based content */}
        <div className="space-y-2">
          <Label>Content</Label>
          <BlockEditor
            blocks={form.content}
            onChange={(content: ContentBlock[]) => update({ content })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="attendance, ai, schools"
          />
        </div>

        <details className="border border-border rounded-lg p-4">
          <summary className="cursor-pointer text-sm font-medium">SEO overrides (optional)</summary>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta title</Label>
              <Input
                id="meta_title"
                value={form.meta_title ?? ''}
                onChange={(e) => update({ meta_title: e.target.value })}
                placeholder="Defaults to the post title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta description</Label>
              <Textarea
                id="meta_description"
                rows={2}
                value={form.meta_description ?? ''}
                onChange={(e) => update({ meta_description: e.target.value })}
                placeholder="Defaults to the excerpt"
              />
            </div>
          </div>
        </details>

        <div className="flex items-center gap-3 pt-2 sticky bottom-0 bg-background/80 backdrop-blur py-3">
          <Button variant="outline" onClick={() => save(false)} disabled={saving || uploading}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save draft
          </Button>
          <Button variant="hero" onClick={() => save(true)} disabled={saving || uploading}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
