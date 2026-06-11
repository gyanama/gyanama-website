-- ============================================================================
-- Gyanama: Blog + Admin + Analytics schema
-- Run this in the Supabase SQL editor (or via the Supabase CLI).
-- After running, add your admin's auth user id to the `admins` table:
--   insert into admins (user_id, email)
--   select id, email from auth.users where email = 'gyanamatech@gmail.com';
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------------------
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ----------------------------------------------------------------------------
-- Admin allowlist + helper
-- ----------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- SECURITY DEFINER so it can read `admins` regardless of the caller's RLS.
-- STABLE: result doesn't change within a statement. search_path pinned for safety.
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.user_id = uid);
$$;

-- ----------------------------------------------------------------------------
-- Posts
-- ----------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_markdown text not null default '',
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author text,
  meta_title text,
  meta_description text,
  tags text[] not null default '{}'
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- Analytics
-- ----------------------------------------------------------------------------
create table if not exists public.analytics_sessions (
  session_id uuid primary key,
  first_path text,
  last_path text,
  referrer text,
  device text check (device in ('mobile', 'tablet', 'desktop')),
  country text,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  duration_seconds integer not null default 0,
  pageview_count integer not null default 1,
  is_bounce boolean not null default true
);

create index if not exists analytics_sessions_started_at_idx
  on public.analytics_sessions (started_at desc);

create table if not exists public.analytics_pageviews (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  path text not null,
  created_at timestamptz not null default now()
);

create index if not exists analytics_pageviews_created_at_idx
  on public.analytics_pageviews (created_at desc);
create index if not exists analytics_pageviews_path_idx
  on public.analytics_pageviews (path);

-- ----------------------------------------------------------------------------
-- Dashboard aggregate views (admins read these; RLS on base tables still applies,
-- so these views are created with security_invoker so admin SELECT policies hold)
-- ----------------------------------------------------------------------------
create or replace view public.analytics_daily_views
with (security_invoker = true) as
  select
    date_trunc('day', created_at)::date as day,
    count(*)::bigint as views
  from public.analytics_pageviews
  group by 1
  order by 1;

create or replace view public.analytics_top_paths
with (security_invoker = true) as
  select
    path,
    count(*)::bigint as views
  from public.analytics_pageviews
  group by 1
  order by 2 desc;

create or replace view public.analytics_session_summary
with (security_invoker = true) as
  select
    count(*)::bigint as sessions,
    coalesce(avg(duration_seconds), 0)::numeric(10, 1) as avg_duration_seconds,
    coalesce(
      avg(case when is_bounce then 1 else 0 end) * 100, 0
    )::numeric(10, 1) as bounce_rate_pct
  from public.analytics_sessions;

create or replace view public.analytics_device_breakdown
with (security_invoker = true) as
  select
    coalesce(device, 'unknown') as device,
    count(*)::bigint as sessions
  from public.analytics_sessions
  group by 1
  order by 2 desc;

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.admins enable row level security;
alter table public.posts enable row level security;
alter table public.analytics_sessions enable row level security;
alter table public.analytics_pageviews enable row level security;

-- admins: a user can read their own admin row (used by the client to check isAdmin)
drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

-- posts: everyone (anon + authenticated) may read PUBLISHED posts
drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts" on public.posts
  for select to anon, authenticated
  using (status = 'published');

-- posts: admins may read everything (incl. drafts)
drop policy if exists "admins read all posts" on public.posts;
create policy "admins read all posts" on public.posts
  for select to authenticated
  using (public.is_admin(auth.uid()));

-- posts: admins may insert/update/delete
drop policy if exists "admins write posts" on public.posts;
create policy "admins write posts" on public.posts
  for all to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- analytics: CLOSED to anon. Writes happen via the service role (api/track.ts),
-- which bypasses RLS. Admins may SELECT for the dashboard.
drop policy if exists "admins read sessions" on public.analytics_sessions;
create policy "admins read sessions" on public.analytics_sessions
  for select to authenticated
  using (public.is_admin(auth.uid()));

drop policy if exists "admins read pageviews" on public.analytics_pageviews;
create policy "admins read pageviews" on public.analytics_pageviews
  for select to authenticated
  using (public.is_admin(auth.uid()));

-- ============================================================================
-- Storage: blog-images bucket (create the bucket in the dashboard as PUBLIC,
-- or uncomment the insert below). Policies: public read, admin write.
-- ============================================================================
-- insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true)
--   on conflict (id) do nothing;

drop policy if exists "public read blog images" on storage.objects;
create policy "public read blog images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "admins write blog images" on storage.objects;
create policy "admins write blog images" on storage.objects
  for all to authenticated
  using (bucket_id = 'blog-images' and public.is_admin(auth.uid()))
  with check (bucket_id = 'blog-images' and public.is_admin(auth.uid()));
