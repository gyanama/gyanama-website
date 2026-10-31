# Blog + Admin Panel + Analytics — Setup Guide

This feature adds a public blog (`/blog`), an admin panel (`/adminpanel`) for writing
Markdown posts, and first-party analytics (page views + session time) shown in the
admin panel. Backend is **Supabase**. Posts are cached static pages in Next.js; publishing
refreshes the cache through `/api/revalidate`, with no redeploy.

The code is done. The steps below are the one-time manual setup you must do.

---

## 1. Create the Supabase project
1. Go to https://supabase.com → New project. Note the **Project URL** and keys
   (Settings → API): `anon` public key and `service_role` secret key.
2. **Auth → Providers → Email**: enable it. **Auth → Sign In / Providers**: turn OFF
   "Allow new users to sign up" (only invited admins should exist).
3. **Auth → Users → Add user → Create new user**: create your admin
   (`gyanamatech@gmail.com`) with a password. (Or "Invite" and set a password.)

## 2. Run the database migration
1. Open **SQL Editor** in Supabase and run the contents of
   [`supabase/migrations/0001_init.sql`](../supabase/migrations/0001_init.sql).
2. Register your admin (so RLS lets you manage posts and read analytics):
   ```sql
   insert into admins (user_id, email)
   select id, email from auth.users where email = 'gyanamatech@gmail.com';
   ```

## 3. Create the Storage bucket (for cover images)
- **Storage → New bucket** → name `blog-images`, **Public bucket = ON**.
  (Write access is already restricted to admins by the policies in the migration.)

## 4. Set environment variables
Add these in **Vercel → Settings → Environment Variables** (Production **and**
Preview), and in your local `.env` for dev. See [`.env.example`](../.env.example).

| Variable | Where | Value |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client and server | `https://<ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | server | **service_role** secret (never `NEXT_PUBLIC_`) |

> The `service_role` key bypasses RLS. Keep it server-only. It's used by
> `src/app/api/track/route.ts` and `src/app/api/revalidate/route.ts`.

## 5. Redeploy
Trigger a deploy so the env vars take effect.

---

## How it works
- **Blog**: `/blog` lists published posts; `/blog/:slug` renders one. Markdown is
  rendered with `react-markdown` + sanitized. Posts are fetched via the anon key
  (RLS exposes only `published` posts).
- **Admin** (`/adminpanel`): Supabase email/password login → posts table, Markdown
  editor with live preview + cover upload, and the analytics dashboard. Every admin
  page is `noindex` and `/adminpanel` is disallowed in `robots.txt` and never
  prerendered/sitemapped.
- **Publish → SEO**: publishing stamps `published_at` and POSTs `/api/revalidate` with the
  admin's session token. The route checks the `admins` table, refreshes the `posts` cache
  tag (blog list, post page and `sitemap.xml`) and submits the URL to IndexNow. The post
  is live within seconds, with no redeploy.
- **Analytics**: `AnalyticsTracker` (public site only) sends page views + heartbeats to
  `/api/track` (service role; analytics tables are closed to anon). The dashboard
  reads aggregate views and charts them. Admin browsing and prerender are excluded.

## Verify end-to-end
1. `npm run dev`, go to `/adminpanel`, log in, create + **Publish** a post.
2. Visit `/blog` and `/blog/<slug>` — the post shows.
3. `npm run build && npm start` (with env set) → `/sitemap.xml` contains the post but
   **not** `/adminpanel`.
4. View-source `/adminpanel` → `noindex, nofollow`. `robots.txt` → `Disallow: /adminpanel`.
5. Browse public pages → rows appear in `analytics_sessions` / `analytics_pageviews` and
   the dashboard charts populate. Browsing `/adminpanel` adds **no** rows.

## Local dev note
`npm run dev` runs the pages and the API routes together, so analytics ingestion and the
publish refresh work locally when the env vars are set.
