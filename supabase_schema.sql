-- ClearCenters HQ — initial database schema
-- Paste this whole file into Supabase's SQL Editor and click "Run".
-- Safe to run once on a fresh project.

create extension if not exists "pgcrypto";

-- One row per teacher, linked to their real Supabase Auth account.
create table teachers (
  id uuid references auth.users primary key,
  name text,
  school text,
  created_at timestamp default now()
);

-- One row per class a teacher creates.
create table classes (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references teachers(id),
  name text not null,
  class_code text unique not null,
  created_at timestamp default now()
);

-- One row per student. PIN is stored as plain text for pilot simplicity —
-- flag this for hashing before any wider rollout beyond the pilot.
create table students (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references classes(id),
  first_name text not null,
  pin text not null,
  crystal_points int default 0,
  streak_days int default 0,
  created_at timestamp default now()
);

-- One row per real case. The actual case CONTENT (evidence, cast, script)
-- ships as JSON files inside the app's code, not here — this table just
-- lets assignments reference a case by its standard.
create table cases (
  standard text primary key,
  title text not null,
  engine text default 'group_chat'
);

-- One row per case a teacher assigns to a class.
create table assignments (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references classes(id),
  case_standard text references cases(standard),
  due_date date,
  created_at timestamp default now()
);

-- One row per student submission for an assignment.
create table submissions (
  id uuid default gen_random_uuid() primary key,
  assignment_id uuid references assignments(id),
  student_id uuid references students(id),
  attempt1 text,
  attempt2 text,
  organizer jsonb,
  sources jsonb,
  checklist jsonb,
  self_confidence text,
  ai_score int,
  ai_rationale text,
  teacher_grade int,
  teacher_feedback text,
  released boolean default false,
  submitted_at timestamp default now()
);

-- Seed the 19 real Grade 5 Science Group Chat cases.
insert into cases (standard, title) values
  ('5.6A', 'The Metal Detector Meltdown'),
  ('5.6B', 'The Trail Mix Bar'),
  ('5.6C', 'The Snow Cone Stand Mystery'),
  ('5.6D', 'The Flat Soccer Ball Claim'),
  ('5.7A', 'The Dog Walk Standoff'),
  ('5.7B', 'The Paper Airplane Contest'),
  ('5.8A', 'The Self-Powered Sneakers'),
  ('5.8B', 'The Holiday Light String Mystery'),
  ('5.8C', 'The Vanishing Trick'),
  ('5.9', 'The Tournament-Day Shadow'),
  ('5.10A', 'The Marine Fog Mystery'),
  ('5.10B', 'The Viral Rock Video'),
  ('5.10C', 'The Campfire Legend'),
  ('5.11A', 'The Campaign Against Recycling'),
  ('5.12A', 'The Backyard Bird Feeder'),
  ('5.12B', 'The Bee Disappearance Mystery'),
  ('5.12C', 'The Parking Lot Town Hall'),
  ('5.13A', 'The Desert Survival Reality Show'),
  ('5.13B', 'The Pet Talent Scout');
