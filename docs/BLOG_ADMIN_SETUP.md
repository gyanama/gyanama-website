# Blog + Admin Panel + Analytics — Setup Guide

This feature adds a public blog (`/blog`), an admin panel (`/adminpanel`) for writing
Markdown posts, and first-party analytics (page views + session time) shown in the
admin panel. Backend is **Supabase**; new posts become static HTML via the existing
Playwright prerender, triggered by a **Vercel Deploy Hook** on publish.

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

## 4. Create the Vercel Deploy Hook
- Vercel → Project → **Settings → Git → Deploy Hooks** → create one (e.g. name
  "blog-publish", branch `main`). Copy the URL — it's `VERCEL_DEPLOY_HOOK_URL`.

## 5. Set environment variables
Add these in **Vercel → Settings → Environment Variables** (Production **and**
Preview), and in your local `.env` for dev. See [`.env.example`](../.env.example).

| Variable | Where | Value |
|---|---|---|
| `VITE_SUPABASE_URL` | client | `https://<ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | client | anon public key |
| `SUPABASE_URL` | server | same project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server | **service_role** secret (never `VITE_`) |
| `VERCEL_DEPLOY_HOOK_URL` | server | the deploy hook URL from step 4 |

> The `service_role` key bypasses RLS — keep it server-only. It's used by
> `api/track.ts`, `api/trigger-rebuild.ts`, and `scripts/prerender.mjs`.

## 6. Redeploy
Trigger a deploy so the env vars take effect and the prerender can read posts.

---

## How it works
- **Blog**: `/blog` lists published posts; `/blog/:slug` renders one. Markdown is
  rendered with `react-markdown` + sanitized. Posts are fetched via the anon key
  (RLS exposes only `published` posts).
- **Admin** (`/adminpanel`): Supabase email/password login → posts table, Markdown
  editor with live preview + cover upload, and the analytics dashboard. Every admin
  page is `noindex` and `/adminpanel` is disallowed in `robots.txt` and never
  prerendered/sitemapped.
- **Publish → SEO**: publishing stamps `published_at` and POSTs `/api/trigger-rebuild`,
  which fires the deploy hook. The build re-runs `scripts/prerender.mjs`, which reads
  published slugs from Supabase, prerenders `/blog/<slug>` to static HTML, and
  regenerates `dist/sitemap.xml`. New posts go live as static pages in ~1–2 min.
- **Analytics**: `AnalyticsTracker` (public site only) sends page views + heartbeats to
  `api/track.ts` (service role; analytics tables are closed to anon). The dashboard
  reads aggregate views and charts them. Admin browsing and prerender are excluded.

## Verify end-to-end
1. `npm run dev`, go to `/adminpanel`, log in, create + **Publish** a post.
2. Visit `/blog` and `/blog/<slug>` — the post shows.
3. `npm run build:seo` (with env set) → confirm `dist/blog/<slug>/index.html` exists and
   `dist/sitemap.xml` contains the post but **not** `/adminpanel`.
4. View-source `/adminpanel` → `noindex, nofollow`. `robots.txt` → `Disallow: /adminpanel`.
5. Browse public pages → rows appear in `analytics_sessions` / `analytics_pageviews` and
   the dashboard charts populate. Browsing `/adminpanel` adds **no** rows.

## Local dev note
Vercel serverless functions in `api/` don't run under plain `vite dev`. To exercise
`/api/track` and `/api/trigger-rebuild` locally, use `vercel dev` instead. Without them,
the blog and admin still work; only analytics ingestion and the publish-rebuild call are
inert locally.
