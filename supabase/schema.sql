-- ================================================================
-- IDIAS — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- ─── Tables ──────────────────────────────────────────────────

create table if not exists public.profiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  username         text unique,
  bio              text,
  avatar_color     text default 'var(--pink)',
  shipped_count    int  default 0,
  cooking_count    int  default 0,
  dropped_count    int  default 0,
  streak_days      int  default 0,
  reactions_given  int  default 0,
  reactions_received int default 0,
  created_at       timestamptz default now()
);

create table if not exists public.ideas (
  id          uuid primary key default gen_random_uuid(),
  author_id   uuid references public.profiles(id) on delete cascade not null,
  title       text not null,
  body        text not null,
  tags        text[] default '{}',
  variant     text  default 'manifesto',
  status      text  default 'cooking' check (status in ('half-baked','cooking','shipped','cursed')),
  reply_count int   default 0,
  created_at  timestamptz default now()
);

create table if not exists public.reactions (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid references public.ideas(id) on delete cascade not null,
  user_id    uuid references public.profiles(id) on delete cascade not null,
  kind       text not null check (kind in ('weird','build','more','huh','bad')),
  created_at timestamptz default now(),
  unique(idea_id, user_id, kind)
);

create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  idea_id     uuid references public.ideas(id) on delete cascade not null,
  author_id   uuid references public.profiles(id) on delete cascade not null,
  body        text not null,
  stamp_kind  text check (stamp_kind in ('weird','build','more','huh','bad')),
  parent_id   uuid references public.comments(id) on delete cascade,
  pinned      boolean default false,
  reply_count int     default 0,
  created_at  timestamptz default now()
);

create table if not exists public.remixes (
  id               uuid primary key default gen_random_uuid(),
  original_idea_id uuid references public.ideas(id) on delete cascade not null,
  remix_idea_id    uuid references public.ideas(id) on delete cascade not null,
  created_at       timestamptz default now(),
  unique(original_idea_id, remix_idea_id)
);

create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.profiles(id) on delete cascade not null,
  actor_id   uuid references public.profiles(id) on delete set null,
  kind       text not null check (kind in ('reaction','remix','reply','follow','milestone','prompt')),
  idea_id    uuid references public.ideas(id) on delete set null,
  comment_id uuid references public.comments(id) on delete set null,
  data       jsonb default '{}',
  read       boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.push_subscriptions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.profiles(id) on delete cascade not null,
  endpoint   text not null unique,
  p256dh     text not null,
  auth_key   text not null,
  created_at timestamptz default now()
);

create table if not exists public.follows (
  follower_id  uuid references public.profiles(id) on delete cascade not null,
  following_id uuid references public.profiles(id) on delete cascade not null,
  created_at   timestamptz default now(),
  primary key(follower_id, following_id)
);

-- ─── Auto-create profile on sign-up ─────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Update reply_count on comment insert ────────────────────

create or replace function public.increment_reply_count()
returns trigger as $$
begin
  update public.ideas set reply_count = reply_count + 1 where id = new.idea_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_comment_inserted on public.comments;
create trigger on_comment_inserted
  after insert on public.comments
  for each row execute function public.increment_reply_count();

-- ─── Auto-notify on reaction ─────────────────────────────────

create or replace function public.notify_on_reaction()
returns trigger as $$
declare
  idea_author uuid;
begin
  select author_id into idea_author from public.ideas where id = new.idea_id;
  if idea_author is not null and idea_author <> new.user_id then
    insert into public.notifications (user_id, actor_id, kind, idea_id, data)
    values (idea_author, new.user_id, 'reaction', new.idea_id, jsonb_build_object('stamp_kind', new.kind));
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_reaction_inserted on public.reactions;
create trigger on_reaction_inserted
  after insert on public.reactions
  for each row execute function public.notify_on_reaction();

-- ─── Auto-notify on comment ──────────────────────────────────

create or replace function public.notify_on_comment()
returns trigger as $$
declare
  idea_author uuid;
  comment_body_snippet text;
begin
  select author_id into idea_author from public.ideas where id = new.idea_id;
  comment_body_snippet := left(new.body, 80);
  if idea_author is not null and idea_author <> new.author_id then
    insert into public.notifications (user_id, actor_id, kind, idea_id, comment_id, data)
    values (idea_author, new.author_id, 'reply', new.idea_id, new.id, jsonb_build_object('note', comment_body_snippet));
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_comment_inserted_notify on public.comments;
create trigger on_comment_inserted_notify
  after insert on public.comments
  for each row execute function public.notify_on_comment();

-- ─── Row Level Security ───────────────────────────────────────

alter table public.profiles          enable row level security;
alter table public.ideas             enable row level security;
alter table public.reactions         enable row level security;
alter table public.comments          enable row level security;
alter table public.remixes           enable row level security;
alter table public.notifications     enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.follows           enable row level security;

-- profiles
create policy "profiles_select"  on public.profiles for select using (true);
create policy "profiles_insert"  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update"  on public.profiles for update using (auth.uid() = id);

-- ideas
create policy "ideas_select"  on public.ideas for select using (true);
create policy "ideas_insert"  on public.ideas for insert with check (auth.uid() = author_id);
create policy "ideas_update"  on public.ideas for update using (auth.uid() = author_id);
create policy "ideas_delete"  on public.ideas for delete using (auth.uid() = author_id);

-- reactions
create policy "reactions_select" on public.reactions for select using (true);
create policy "reactions_insert" on public.reactions for insert with check (auth.uid() = user_id);
create policy "reactions_delete" on public.reactions for delete using (auth.uid() = user_id);

-- comments
create policy "comments_select" on public.comments for select using (true);
create policy "comments_insert" on public.comments for insert with check (auth.uid() = author_id);
create policy "comments_delete" on public.comments for delete using (auth.uid() = author_id);

-- remixes
create policy "remixes_select" on public.remixes for select using (true);
create policy "remixes_insert" on public.remixes for insert with check (true);

-- notifications (private)
create policy "notifs_select" on public.notifications for select using (auth.uid() = user_id);
create policy "notifs_update" on public.notifications for update using (auth.uid() = user_id);

-- push subscriptions (private)
create policy "push_all" on public.push_subscriptions for all using (auth.uid() = user_id);

-- follows
create policy "follows_select" on public.follows for select using (true);
create policy "follows_insert" on public.follows for insert with check (auth.uid() = follower_id);
create policy "follows_delete" on public.follows for delete using (auth.uid() = follower_id);

-- ─── Realtime (run in SQL Editor) ────────────────────────────
-- Enable realtime for these tables in:
-- Supabase Dashboard → Database → Replication → 0 tables selected → toggle on:
--   ideas, reactions, notifications, comments

-- ─── Google OAuth ─────────────────────────────────────────────
-- Enable in: Supabase Dashboard → Authentication → Providers → Google
-- You need a Google OAuth app: console.cloud.google.com → APIs & Services → Credentials
-- Authorised redirect URI: https://<your-project>.supabase.co/auth/v1/callback
