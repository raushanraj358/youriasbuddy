-- YourIASBuddy cloud profiles. Run once in Supabase → SQL Editor → New query → Run.
-- Each signed-in user gets one row holding their whole study data (tasks, sessions, notes, quizzes…).
-- Row-level security ensures a user can only ever read or write their own row.

create table if not exists public.user_data (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  rev        bigint      not null default 1,   -- bumped on every save; used to detect edits from another device
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

-- Table access for the website's API. Newer Supabase projects don't grant this automatically.
-- Signed-in users may touch only their own row (policies below); guests get no access at all.
grant select, insert, update, delete on public.user_data to authenticated;
revoke all on public.user_data from anon;

drop policy if exists "user_data select own" on public.user_data;
drop policy if exists "user_data insert own" on public.user_data;
drop policy if exists "user_data update own" on public.user_data;
drop policy if exists "user_data delete own" on public.user_data;

create policy "user_data select own" on public.user_data for select using ((select auth.uid()) = user_id);
create policy "user_data insert own" on public.user_data for insert with check ((select auth.uid()) = user_id);
create policy "user_data update own" on public.user_data for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "user_data delete own" on public.user_data for delete using ((select auth.uid()) = user_id);

-- Daily free-AI allowance, counted by the "ai" Edge Function (per signed-in user, or per IP for guests).
-- No RLS policies on purpose: only the Edge Function (service role) can read or change it.
create table if not exists public.ai_usage (
  key text not null,
  day date not null,
  n   int  not null default 0,
  primary key (key, day)
);
alter table public.ai_usage enable row level security;

create or replace function public.bump_ai_usage(p_key text)
returns int
language sql
security definer
set search_path = public
as $$
  -- Housekeeping: now and then, drop counters older than a week (they are only needed for today's limit).
  delete from public.ai_usage where random() < 0.02 and day < current_date - 7;
  insert into public.ai_usage as u (key, day, n)
  values (p_key, (now() at time zone 'Asia/Kolkata')::date, 1)
  on conflict (key, day) do update set n = u.n + 1
  returning u.n;
$$;
revoke all on function public.bump_ai_usage(text) from public, anon, authenticated;
grant execute on function public.bump_ai_usage(text) to service_role;

-- Daily current-affairs digest (one row per IST day), written by the "ai" Edge Function and shown to everyone.
create table if not exists public.daily_news (
  day         date primary key,
  status      text not null default 'generating',  -- generating | ready | failed
  data        jsonb,
  sources     jsonb,
  search_html text,
  error       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.daily_news enable row level security;
revoke all on public.daily_news from anon, authenticated;
grant all on public.daily_news to service_role;
