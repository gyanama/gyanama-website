-- ============================================================================
-- Gyanama: richer block-based blog content.
-- Adds a structured `content` (array of blocks), plus `category` and `read_time`.
-- Run this in the Supabase SQL editor after 0001_init.sql.
-- ============================================================================

alter table public.posts
  add column if not exists content jsonb not null default '[]'::jsonb,
  add column if not exists category text,
  add column if not exists read_time text;

-- content_markdown is no longer required (blocks supersede it; kept for legacy).
alter table public.posts alter column content_markdown drop not null;
alter table public.posts alter column content_markdown set default '';
