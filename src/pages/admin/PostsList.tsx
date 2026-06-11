import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import {
  useAdminPosts,
  useDeletePost,
  useTogglePublish,
} from '@/hooks/queries/usePosts';
import { triggerRebuild } from '@/lib/triggerRebuild';
import type { PostSummary } from '@/lib/blog-types';

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'text-xs font-medium px-2.5 py-1 rounded-full',
        status === 'published'
          ? 'bg-green-100 text-green-700'
          : 'bg-muted text-muted-foreground',
      )}
    >
      {status}
    </span>
  );
}

export default function PostsList() {
  const { data: posts, isLoading, isError } = useAdminPosts();
  const togglePublish = useTogglePublish();
  const deletePost = useDeletePost();
  const [toDelete, setToDelete] = useState<PostSummary | null>(null);

  const handleToggle = async (post: PostSummary) => {
    const publish = post.status !== 'published';
    try {
      await togglePublish.mutateAsync({ id: post.id, publish });
      if (publish) {
        toast.success('Published — site will rebuild in ~1–2 min', {
          description: 'The post becomes a static, SEO-indexed page after the rebuild.',
        });
        triggerRebuild().then((r) => {
          if (!r.ok) toast.error(`Couldn't trigger rebuild: ${r.error}`);
        });
      } else {
        toast.success('Moved to draft');
        triggerRebuild();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    const wasPublished = toDelete.status === 'published';
    try {
      await deletePost.mutateAsync(toDelete.id);
      toast.success('Post deleted');
      if (wasPublished) triggerRebuild();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link to="/adminpanel/posts/new">
          <Button variant="hero">
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading posts…
        </div>
      )}

      {isError && (
        <p className="text-destructive py-12 text-center">
          Failed to load posts. Check your Supabase configuration.
        </p>
      )}

      {!isLoading && !isError && posts && posts.length === 0 && (
        <div className="text-center text-muted-foreground py-16 border border-dashed rounded-2xl">
          No posts yet. Create your first one.
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-28">Status</TableHead>
                <TableHead className="w-36">Updated</TableHead>
                <TableHead className="w-44 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt=""
                          className="w-12 h-9 rounded object-cover border border-border shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-9 rounded gradient-primary shrink-0" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="truncate">{post.title}</span>
                        <span className="text-xs text-muted-foreground truncate">
                          /{post.slug}
                          {post.category ? ` · ${post.category}` : ''}
                          {post.read_time ? ` · ${post.read_time}` : ''}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={post.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(post.updated_at).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {post.status === 'published' && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-foreground"
                          title="View live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={togglePublish.isPending}
                        onClick={() => handleToggle(post)}
                      >
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Link
                        to={`/adminpanel/posts/${post.id}/edit`}
                        className="p-2 text-muted-foreground hover:text-foreground"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setToDelete(post)}
                        className="p-2 text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              "{toDelete?.title}" will be permanently removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
