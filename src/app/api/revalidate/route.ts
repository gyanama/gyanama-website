import { revalidateTag } from 'next/cache';
import { readJson } from '@/lib/server/request';
import { adminUserId, serviceClient } from '@/lib/server/supabase-admin';
import { submitIndexNow } from '@/lib/server/indexnow';
import { SITE_URL } from '@/lib/site';

export async function POST(req: Request) {
  const supabase = serviceClient();
  if (!supabase) return Response.json({ error: 'Supabase not configured' }, { status: 503 });

  const admin = await adminUserId(req, supabase);
  if ('error' in admin) return Response.json({ error: admin.error }, { status: admin.status });

  const body = await readJson<{ slug?: string }>(req);
  revalidateTag('posts', 'max');

  const slug = typeof body?.slug === 'string' && /^[a-z0-9-]{1,120}$/.test(body.slug) ? body.slug : null;
  const urls = [`${SITE_URL}/blog`, `${SITE_URL}/sitemap.xml`, ...(slug ? [`${SITE_URL}/blog/${slug}`] : [])];
  await submitIndexNow(urls);

  return Response.json({ ok: true });
}
