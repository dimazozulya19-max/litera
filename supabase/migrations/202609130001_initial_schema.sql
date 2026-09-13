create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  display_name text,
  avatar_url text,
  bio text not null default '',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_length check (char_length(username) between 3 and 30),
  constraint profiles_display_name_length check (
    display_name is null or char_length(display_name) <= 80
  ),
  constraint profiles_bio_length check (char_length(bio) <= 500)
);

create unique index profiles_username_lower_idx
  on public.profiles (lower(username));

create table public.works (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  type text not null,
  title text not null,
  original_title text,
  description text,
  cover_url text,
  original_language text,
  release_year smallint,
  publication_status text not null default 'unknown',
  progress_unit text not null default 'percent',
  total_units numeric(10, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint works_type_check check (
    type in (
      'book',
      'manga',
      'light_novel',
      'web_novel',
      'comic',
      'graphic_novel',
      'short_story',
      'other'
    )
  ),
  constraint works_publication_status_check check (
    publication_status in (
      'announced',
      'ongoing',
      'completed',
      'hiatus',
      'cancelled',
      'unknown'
    )
  ),
  constraint works_progress_unit_check check (
    progress_unit in ('page', 'chapter', 'volume', 'percent', 'item')
  ),
  constraint works_total_units_check check (
    total_units is null or total_units >= 0
  )
);

create index works_title_lower_idx on public.works (lower(title));
create index works_type_idx on public.works (type);

create table public.work_external_ids (
  work_id uuid not null references public.works (id) on delete cascade,
  source text not null,
  external_id text not null,
  created_at timestamptz not null default now(),
  primary key (work_id, source),
  constraint work_external_ids_source_id_unique unique (source, external_id)
);

create table public.library_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  work_id uuid not null references public.works (id) on delete cascade,
  status text not null default 'planned',
  is_favorite boolean not null default false,
  current_progress numeric(10, 2) not null default 0,
  started_at date,
  finished_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint library_entries_user_work_unique unique (user_id, work_id),
  constraint library_entries_status_check check (
    status in ('planned', 'reading', 'completed', 'on_hold', 'dropped', 'rereading')
  ),
  constraint library_entries_progress_check check (current_progress >= 0),
  constraint library_entries_dates_check check (
    finished_at is null or started_at is null or finished_at >= started_at
  )
);

create index library_entries_user_id_idx
  on public.library_entries (user_id);
create index library_entries_work_id_idx
  on public.library_entries (work_id);
create index library_entries_user_status_idx
  on public.library_entries (user_id, status);

create table public.progress_events (
  id uuid primary key default gen_random_uuid(),
  library_entry_id uuid not null references public.library_entries (id) on delete cascade,
  progress numeric(10, 2) not null,
  created_at timestamptz not null default now(),
  constraint progress_events_progress_check check (progress >= 0)
);

create index progress_events_library_entry_created_idx
  on public.progress_events (library_entry_id, created_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger works_set_updated_at
before update on public.works
for each row execute function public.set_updated_at();

create trigger library_entries_set_updated_at
before update on public.library_entries
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.works enable row level security;
alter table public.work_external_ids enable row level security;
alter table public.library_entries enable row level security;
alter table public.progress_events enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.works from anon, authenticated;
revoke all on table public.work_external_ids from anon, authenticated;
revoke all on table public.library_entries from anon, authenticated;
revoke all on table public.progress_events from anon, authenticated;

grant select on table public.profiles to anon;
grant select, insert, update on table public.profiles to authenticated;
grant select on table public.works to anon, authenticated;
grant select on table public.work_external_ids to anon, authenticated;
grant select, insert, update, delete on table public.library_entries to authenticated;
grant select, insert, delete on table public.progress_events to authenticated;

create policy "Public profiles are readable by anyone"
on public.profiles
for select
to anon
using (is_public);

create policy "Authenticated users can read public or own profiles"
on public.profiles
for select
to authenticated
using (is_public or (select auth.uid()) = id);

create policy "Users can create their own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Works are publicly readable"
on public.works
for select
to anon, authenticated
using (true);

create policy "External work IDs are publicly readable"
on public.work_external_ids
for select
to anon, authenticated
using (true);

create policy "Users can read their own library entries"
on public.library_entries
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own library entries"
on public.library_entries
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own library entries"
on public.library_entries
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own library entries"
on public.library_entries
for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can read their own progress events"
on public.progress_events
for select
to authenticated
using (
  exists (
    select 1
    from public.library_entries
    where library_entries.id = progress_events.library_entry_id
      and library_entries.user_id = (select auth.uid())
  )
);

create policy "Users can create their own progress events"
on public.progress_events
for insert
to authenticated
with check (
  exists (
    select 1
    from public.library_entries
    where library_entries.id = progress_events.library_entry_id
      and library_entries.user_id = (select auth.uid())
  )
);

create policy "Users can delete their own progress events"
on public.progress_events
for delete
to authenticated
using (
  exists (
    select 1
    from public.library_entries
    where library_entries.id = progress_events.library_entry_id
      and library_entries.user_id = (select auth.uid())
  )
);
