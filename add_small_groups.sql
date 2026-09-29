-- Small groups — Sept 29, 2026.
-- A teacher saves a group from the gradebook, plans it, meets with it,
-- jots notes at the table, and follows up until everyone gets it.
-- The site reads and writes these through /api/teacher/groups (admin key,
-- checked against the signed-in teacher), so RLS is on with no policies:
-- the browser's anon key can't touch them directly.
-- Safe to run more than once.

create table if not exists small_groups (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null,
  class_id uuid not null references classes(id) on delete cascade,
  name text not null,
  subject text,
  standard_code text,
  standard_key text,
  student_ids uuid[] not null default '{}',
  done_ids uuid[] not null default '{}',
  start_levels jsonb not null default '{}'::jsonb,
  plan jsonb,
  plan_at timestamptz,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists small_groups_class_idx on small_groups (class_id);
create index if not exists small_groups_teacher_idx on small_groups (teacher_id);

create table if not exists small_group_notes (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references small_groups(id) on delete cascade,
  teacher_id uuid not null,
  student_id uuid not null,
  check_result text,
  note text,
  met_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists small_group_notes_group_idx on small_group_notes (group_id);
create index if not exists small_group_notes_student_idx on small_group_notes (student_id);

alter table small_groups enable row level security;
alter table small_group_notes enable row level security;
