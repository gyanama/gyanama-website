# GYANAMA Website

Marketing website for **GYANAMA**, the school app with AI calls to parents.
**Live:** [gyanama.com](https://gyanama.com)

## Tech stack
- **Next.js 16** (App Router, Cache Components) + **React 19** + **TypeScript 6**
- **Tailwind CSS 4** with the design tokens in `src/app/globals.css`
- CSS animations only (`src/app/globals.css`), with no animation or 3D library in the bundle
- **Supabase** for the blog, admin login and first-party analytics
- **Cal.com** embed for demo bookings
- **Vitest** for content, SEO and route tests
- Node **26**

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Environment variables
See [`.env.example`](.env.example).

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client and server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client | Supabase anon key (RLS guards access) |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Analytics ingestion and the admin check on blog publish |
| `INDEXNOW_KEY` | build and server | IndexNow key for Bing. Empty turns IndexNow off |
| `INDEXNOW_SUBMIT_ALL` | build | `true` for one production deploy to submit every URL |

## Project structure

```
src/
├── app/
│   ├── (site)/            Public pages, one folder per URL
│   ├── adminpanel/        Blog admin (noindex)
│   ├── api/               track and revalidate route handlers
│   └── sitemap.ts
├── components/
│   ├── site/              Nav, footer, home sections, shared UI
│   ├── landing/           Template for feature, role and platform pages
│   ├── seo/               JSON-LD schemas
│   ├── admin/ analytics/ blog/ legal/ scheduling/ ui/
├── content/               Page copy (home, voice and src/content/pages/*)
└── lib/                   Site data, routes, metadata helper, blog cache, server helpers
public/
├── app/                   Real app screens
├── photos/                School photos
├── llms.txt, llms-full.txt, robots.txt
scripts/
├── indexnow.mjs           Writes the key file and submits URLs after a production build
└── seo-guard.mjs          Checks every built page's title, description, h1, canonical and FAQ schema
```

## Adding a page
1. Write its content in `src/content/pages/` using the `LandingContent` type.
2. Add `src/app/(site)/<slug>/page.tsx` that renders `LandingPage` with `pageMetadata`.
3. Add the path to `STATIC_ROUTES` in `src/lib/routes.ts` and a label in `src/lib/pages.ts`.
4. Link it from `src/lib/nav.ts` if it belongs in the menu, and add a line to `public/llms.txt`.
5. Run `npm test`. The content guard fails on dashes, banned words, claims the product does not
   support, and titles or descriptions outside the length limits.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | IndexNow key file, production build, IndexNow submit |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Vitest |
| `npm run seo:guard` | Check the built HTML of every route (run after a build) |

## Blog
Posts live in Supabase. Publishing in `/adminpanel` refreshes the blog cache through
`/api/revalidate`, so posts go live without a redeploy. Setup: [`docs/BLOG_ADMIN_SETUP.md`](docs/BLOG_ADMIN_SETUP.md).

## Deploying
Vercel builds `main` with the Next.js preset set in `vercel.json`, which also holds the
`www` redirect, security headers and the `/adminpanel` noindex header.

## License
All rights reserved. Copyright GYANAMA.
