-- CI2.0 SANDBOX DATABASE — FILE 1 of 3: structure + small content tables
-- Run this ONLY in the clearcenters-sandbox project's SQL Editor, never in the live project.
-- Contains no teachers, students or student work.

begin;
-- CI2.0 sandbox: copy of the live ClearCenters database STRUCTURE (no student data)

-- part 1
create table if not exists public.assignment_students (
  id uuid default gen_random_uuid() not null,
  assignment_id uuid,
  student_id uuid,
  created_at timestamp without time zone default now()
);
create table if not exists public.assignments (
  id uuid default gen_random_uuid() not null,
  class_id uuid,
  case_standard text,
  due_date date,
  created_at timestamp without time zone default now(),
  distress_call boolean default false,
  distress_call_target integer,
  distress_call_deadline timestamp without time zone,
  distress_call_reward_points integer default 0,
  distress_call_reward_given boolean default false,
  pacing_mode text,
  game_skin text default 'asteroid_run'::text not null
);
create table if not exists public.badge_tiers (
  id uuid default gen_random_uuid() not null,
  tier_key text not null,
  label text not null,
  threshold integer default 0 not null,
  image_path text not null,
  sort_order integer not null,
  created_at timestamp with time zone default now() not null
);
create table if not exists public.briefing_assignment_students (
  id uuid default gen_random_uuid() not null,
  assignment_id uuid,
  student_id uuid,
  created_at timestamp without time zone default now()
);
create table if not exists public.briefing_assignments (
  id uuid default gen_random_uuid() not null,
  class_id uuid,
  briefing_id text,
  due_date date,
  created_at timestamp without time zone default now()
);
create table if not exists public.briefing_submissions (
  id uuid default gen_random_uuid() not null,
  assignment_id uuid,
  student_id uuid,
  phase_state jsonb default '{}'::jsonb not null,
  scores jsonb default '{}'::jsonb not null,
  status text default 'in_progress'::text not null,
  cleared_at timestamp without time zone,
  created_at timestamp without time zone default now(),
  updated_at timestamp without time zone default now()
);
create table if not exists public.briefings (
  id text not null,
  title text not null,
  tagline text,
  subject text default 'social_studies'::text not null,
  grade integer not null,
  teks text,
  minutes integer,
  related_challenge_ids jsonb default '[]'::jsonb not null,
  engine text default 'briefing'::text not null,
  published boolean default true not null,
  created_at timestamp without time zone default now()
);
create table if not exists public.cases (
  standard text not null,
  title text not null,
  engine text default 'group_chat'::text,
  grade integer,
  subject text default 'Science'::text,
  learning_target text,
  lesson_summary text,
  misconception_note text,
  unit text
);
create table if not exists public.classes (
  id uuid default gen_random_uuid() not null,
  teacher_id uuid,
  name text not null,
  class_code text not null,
  created_at timestamp without time zone default now(),
  grade integer,
  subject text default 'Science'::text,
  planet_key text
);
create table if not exists public.crystal_points_history (
  id bigint generated always as identity not null,
  student_id uuid not null,
  amount integer not null,
  new_total integer not null,
  created_at timestamp with time zone default now() not null
);
create table if not exists public.frequency_rush_attempts (
  id uuid default gen_random_uuid() not null,
  session_id uuid,
  word_id uuid,
  correct boolean not null,
  response_time_ms integer,
  points_earned integer default 0,
  streak_at_answer integer default 0,
  answered_at timestamp without time zone default now()
);
create table if not exists public.frequency_rush_classifications (
  id text not null,
  grade integer not null,
  subject text not null,
  unit text not null,
  prompt text not null,
  title text,
  categories jsonb not null,
  items jsonb not null,
  explanation text,
  created_at timestamp with time zone default now()
);
create table if not exists public.frequency_rush_odd_one_out (
  id uuid default gen_random_uuid() not null,
  grade integer not null,
  subject text default 'Science'::text not null,
  unit text not null,
  word_ids uuid[] not null,
  odd_word_id uuid not null,
  created_at timestamp without time zone default now()
);
create table if not exists public.frequency_rush_odd_signal_out (
  id uuid default gen_random_uuid() not null,
  grade integer not null,
  subject text default 'science'::text not null,
  unit text not null,
  seq integer not null,
  words text[] not null,
  odd_word text not null,
  explanation text,
  created_at timestamp without time zone default now()
);
create table if not exists public.frequency_rush_sessions (
  id uuid default gen_random_uuid() not null,
  assignment_id uuid,
  student_id uuid,
  mode text default 'individual'::text not null,
  format text default 'lock_signal'::text not null,
  length_type text default 'rounds'::text not null,
  length_value integer not null,
  score integer default 0,
  best_streak integer default 0,
  count_toward_wall boolean default true,
  started_at timestamp without time zone default now(),
  ended_at timestamp without time zone,
  word_order uuid[],
  game_mode text,
  ended_reason text
);
create table if not exists public.frequency_rush_words (
  id uuid default gen_random_uuid() not null,
  grade integer not null,
  subject text default 'Science'::text not null,
  unit text not null,
  word text not null,
  definition text not null,
  sentences jsonb default '[]'::jsonb not null,
  teks text,
  new_to_grade boolean default true,
  staar_connection boolean default false,
  cognate text,
  created_at timestamp without time zone default now()
);
create table if not exists public.hint_requests (
  id uuid default gen_random_uuid() not null,
  assignment_id uuid,
  student_id uuid,
  case_standard text,
  created_at timestamp without time zone default now()
);
create table if not exists public.planets (
  id bigint generated always as identity not null,
  planet_key text not null,
  name text not null,
  description text not null,
  threshold integer not null,
  image_path text not null,
  theme_color text not null,
  sort_order integer default 0 not null
);
create table if not exists public.sam_shoutouts (
  id uuid default gen_random_uuid() not null,
  student_id uuid,
  class_id uuid,
  teacher_id uuid,
  message text not null,
  seen_at timestamp without time zone,
  created_at timestamp without time zone default now()
);
create table if not exists public.shop_items (
  id text not null,
  name text not null,
  slot_key text not null,
  price integer not null,
  image_url text not null,
  sort_order integer default 0
);
create table if not exists public.signal_ops_events (
  id uuid default gen_random_uuid() not null,
  session_id uuid not null,
  student_id uuid not null,
  event_id text not null,
  event_type text not null,
  target text,
  created_at timestamp with time zone default now() not null
);
create table if not exists public.signal_ops_participants (
  id uuid default gen_random_uuid() not null,
  session_id uuid not null,
  student_id uuid not null,
  display_name text not null,
  callsign text,
  correct_count integer default 0 not null,
  joined_at timestamp with time zone default now() not null,
  last_seen_at timestamp with time zone default now() not null,
  vote_choice text,
  contribution_count integer default 0 not null
);
create table if not exists public.signal_ops_sessions (
  id uuid default gen_random_uuid() not null,
  assignment_id uuid not null,
  class_id uuid not null,
  teacher_id uuid not null,
  status text default 'lobby'::text not null,
  salvage integer default 0 not null,
  power integer default 100 not null,
  base_health integer default 100 not null,
  total_correct integer default 0 not null,
  created_at timestamp with time zone default now() not null,
  started_at timestamp with time zone,
  ended_at timestamp with time zone,
  wave_index integer default 0 not null,
  next_vote_threshold integer default 48 not null,
  upgrades jsonb default '{}'::jsonb not null,
  vote jsonb,
  meters_ticked_at timestamp with time zone,
  wave_started_at timestamp with time zone,
  last_upgrade_id text,
  outcome text default 'ongoing'::text not null,
  duration_seconds integer default 480 not null,
  mission_ends_at timestamp with time zone,
  shield integer default 70 not null,
  last_attack_at timestamp with time zone,
  last_event jsonb,
  state_version bigint default 0 not null,
  lane_north integer default 70 not null,
  lane_shield integer default 70 not null,
  lane_core integer default 70 not null,
  updated_at timestamp with time zone default now() not null
);
create table if not exists public.student_inventory (
  id uuid default gen_random_uuid() not null,
  student_id uuid,
  item_id text,
  purchased_at timestamp without time zone default now(),
  equipped boolean default true
);
create table if not exists public.student_planet_discoveries (
  id uuid default gen_random_uuid() not null,
  student_id uuid not null,
  planet_key text not null,
  discovery_key text not null,
  discovered_at timestamp with time zone default now() not null
);
create table if not exists public.student_planet_games (
  id uuid default gen_random_uuid() not null,
  student_id uuid not null,
  planet_key text not null,
  game_key text not null,
  played boolean default false not null,
  cleared boolean default false not null,
  best_score integer default 0 not null,
  updated_at timestamp with time zone default now() not null,
  unlocked_at timestamp with time zone
);
create table if not exists public.student_planet_visits (
  id bigint generated always as identity not null,
  student_id uuid not null,
  planet_key text not null,
  visited_at timestamp with time zone default now() not null,
  story_read_at timestamp with time zone
);
create table if not exists public.students (
  id uuid default gen_random_uuid() not null,
  class_id uuid,
  first_name text not null,
  pin text not null,
  crystal_points integer default 0,
  streak_days integer default 0,
  created_at timestamp without time zone default now(),
  last_active_date date,
  last_progress_check_at timestamp with time zone,
  home_background text,
  teacher_unlocked_sam_skins text[] default '{}'::text[],
  equipped_world_trail text,
  equipped_sam_skin text default 'classic'::text,
  sam_nickname text,
  outpost_resources integer default 0 not null,
  active boolean default true not null,
  share_token text
);
create table if not exists public.submissions (
  id uuid default gen_random_uuid() not null,
  assignment_id uuid,
  student_id uuid,
  attempt1 text,
  attempt2 text,
  organizer jsonb,
  sources jsonb,
  checklist jsonb,
  self_confidence text,
  ai_score integer,
  ai_rationale text,
  teacher_grade integer,
  teacher_feedback text,
  released boolean default false,
  submitted_at timestamp without time zone default now(),
  revision_requested boolean default false not null,
  revision_requested_at timestamp with time zone,
  released_at timestamp with time zone,
  newsroom_data jsonb,
  signal_data jsonb,
  mission_map_data jsonb,
  simulation_lab_data jsonb,
  frequency_rush_data jsonb,
  classification_lab_data jsonb,
  signal_defense_data jsonb
);
create table if not exists public.teacher_messages (
  id uuid default gen_random_uuid() not null,
  batch_id uuid not null,
  teacher_id uuid not null,
  class_id uuid not null,
  student_id uuid not null,
  is_broadcast boolean default false not null,
  body text not null,
  created_at timestamp without time zone default now(),
  read_at timestamp without time zone
);
create table if not exists public.teachers (
  id uuid not null,
  name text,
  school text,
  created_at timestamp without time zone default now(),
  equipped_sam_skin text default 'cosmic'::text not null
);

-- part 2
alter table public.assignment_students add constraint assignment_students_pkey PRIMARY KEY (id);
alter table public.assignments add constraint assignments_pkey PRIMARY KEY (id);
alter table public.badge_tiers add constraint badge_tiers_pkey PRIMARY KEY (id);
alter table public.briefing_assignment_students add constraint briefing_assignment_students_pkey PRIMARY KEY (id);
alter table public.briefing_assignments add constraint briefing_assignments_pkey PRIMARY KEY (id);
alter table public.briefing_submissions add constraint briefing_submissions_pkey PRIMARY KEY (id);
alter table public.briefings add constraint briefings_pkey PRIMARY KEY (id);
alter table public.cases add constraint cases_pkey PRIMARY KEY (standard);
alter table public.classes add constraint classes_pkey PRIMARY KEY (id);
alter table public.crystal_points_history add constraint crystal_points_history_pkey PRIMARY KEY (id);
alter table public.frequency_rush_attempts add constraint frequency_rush_attempts_pkey PRIMARY KEY (id);
alter table public.frequency_rush_classifications add constraint frequency_rush_classifications_pkey PRIMARY KEY (id);
alter table public.frequency_rush_odd_one_out add constraint frequency_rush_odd_one_out_pkey PRIMARY KEY (id);
alter table public.frequency_rush_odd_signal_out add constraint frequency_rush_odd_signal_out_pkey PRIMARY KEY (id);
alter table public.frequency_rush_sessions add constraint frequency_rush_sessions_pkey PRIMARY KEY (id);
alter table public.frequency_rush_words add constraint frequency_rush_words_pkey PRIMARY KEY (id);
alter table public.hint_requests add constraint hint_requests_pkey PRIMARY KEY (id);
alter table public.planets add constraint planets_pkey PRIMARY KEY (id);
alter table public.sam_shoutouts add constraint sam_shoutouts_pkey PRIMARY KEY (id);
alter table public.shop_items add constraint shop_items_pkey PRIMARY KEY (id);
alter table public.signal_ops_events add constraint signal_ops_events_pkey PRIMARY KEY (id);
alter table public.signal_ops_participants add constraint signal_ops_participants_pkey PRIMARY KEY (id);
alter table public.signal_ops_sessions add constraint signal_ops_sessions_pkey PRIMARY KEY (id);
alter table public.student_inventory add constraint student_inventory_pkey PRIMARY KEY (id);
alter table public.student_planet_discoveries add constraint student_planet_discoveries_pkey PRIMARY KEY (id);
alter table public.student_planet_games add constraint student_planet_games_pkey PRIMARY KEY (id);
alter table public.student_planet_visits add constraint student_planet_visits_pkey PRIMARY KEY (id);
alter table public.students add constraint students_pkey PRIMARY KEY (id);
alter table public.submissions add constraint submissions_pkey PRIMARY KEY (id);
alter table public.teacher_messages add constraint teacher_messages_pkey PRIMARY KEY (id);
alter table public.teachers add constraint teachers_pkey PRIMARY KEY (id);
alter table public.badge_tiers add constraint badge_tiers_tier_key_key UNIQUE (tier_key);
alter table public.briefing_submissions add constraint briefing_submissions_assignment_id_student_id_key UNIQUE (assignment_id, student_id);
alter table public.classes add constraint classes_class_code_key UNIQUE (class_code);
alter table public.frequency_rush_odd_signal_out add constraint frequency_rush_odd_signal_out_grade_subject_unit_seq_key UNIQUE (grade, subject, unit, seq);
alter table public.planets add constraint planets_planet_key_key UNIQUE (planet_key);
alter table public.signal_ops_events add constraint signal_ops_events_unique_event UNIQUE (session_id, student_id, event_id);
alter table public.signal_ops_participants add constraint signal_ops_participants_session_id_student_id_key UNIQUE (session_id, student_id);
alter table public.student_inventory add constraint student_inventory_student_id_item_id_key UNIQUE (student_id, item_id);
alter table public.student_planet_discoveries add constraint student_planet_discoveries_student_id_planet_key_discovery__key UNIQUE (student_id, planet_key, discovery_key);
alter table public.student_planet_games add constraint student_planet_games_student_id_planet_key_game_key_key UNIQUE (student_id, planet_key, game_key);
alter table public.student_planet_visits add constraint student_planet_visits_student_id_planet_key_key UNIQUE (student_id, planet_key);
alter table public.signal_ops_events add constraint signal_ops_events_type_check CHECK ((event_type = ANY (ARRAY['correct'::text, 'power_move'::text, 'crystal_surge'::text])));
alter table public.signal_ops_participants add constraint signal_ops_participants_correct_count_check CHECK ((correct_count >= 0));
alter table public.signal_ops_sessions add constraint signal_ops_lane_north_check CHECK (((lane_north >= 0) AND (lane_north <= 100)));
alter table public.signal_ops_sessions add constraint signal_ops_lane_core_check CHECK (((lane_core >= 0) AND (lane_core <= 100)));
alter table public.signal_ops_sessions add constraint signal_ops_sessions_total_correct_check CHECK ((total_correct >= 0));
alter table public.signal_ops_sessions add constraint signal_ops_sessions_base_health_check CHECK (((base_health >= 0) AND (base_health <= 100)));
alter table public.signal_ops_sessions add constraint signal_ops_sessions_outcome_check CHECK ((outcome = ANY (ARRAY['ongoing'::text, 'victory'::text, 'regroup'::text])));
alter table public.signal_ops_sessions add constraint signal_ops_sessions_power_check CHECK (((power >= 0) AND (power <= 100)));
alter table public.signal_ops_sessions add constraint signal_ops_sessions_salvage_check CHECK ((salvage >= 0));
alter table public.signal_ops_sessions add constraint signal_ops_sessions_status_check CHECK ((status = ANY (ARRAY['lobby'::text, 'live'::text, 'ended'::text])));
alter table public.signal_ops_sessions add constraint signal_ops_duration_seconds_check CHECK (((duration_seconds >= 300) AND (duration_seconds <= 1200)));
alter table public.signal_ops_sessions add constraint signal_ops_shield_check CHECK (((shield >= 0) AND (shield <= 100)));
alter table public.signal_ops_sessions add constraint signal_ops_lane_shield_check CHECK (((lane_shield >= 0) AND (lane_shield <= 100)));
alter table public.assignment_students add constraint assignment_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.assignment_students add constraint assignment_students_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE;
alter table public.assignments add constraint assignments_case_standard_fkey FOREIGN KEY (case_standard) REFERENCES cases(standard);
alter table public.assignments add constraint assignments_class_id_fkey FOREIGN KEY (class_id) REFERENCES classes(id);
alter table public.briefing_assignment_students add constraint briefing_assignment_students_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES briefing_assignments(id) ON DELETE CASCADE;
alter table public.briefing_assignment_students add constraint briefing_assignment_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.briefing_assignments add constraint briefing_assignments_class_id_fkey FOREIGN KEY (class_id) REFERENCES classes(id);
alter table public.briefing_assignments add constraint briefing_assignments_briefing_id_fkey FOREIGN KEY (briefing_id) REFERENCES briefings(id);
alter table public.briefing_submissions add constraint briefing_submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES briefing_assignments(id) ON DELETE CASCADE;
alter table public.briefing_submissions add constraint briefing_submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.classes add constraint classes_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES teachers(id);
alter table public.crystal_points_history add constraint crystal_points_history_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.frequency_rush_attempts add constraint frequency_rush_attempts_word_id_fkey FOREIGN KEY (word_id) REFERENCES frequency_rush_words(id);
alter table public.frequency_rush_attempts add constraint frequency_rush_attempts_session_id_fkey FOREIGN KEY (session_id) REFERENCES frequency_rush_sessions(id) ON DELETE CASCADE;
alter table public.frequency_rush_odd_one_out add constraint frequency_rush_odd_one_out_odd_word_id_fkey FOREIGN KEY (odd_word_id) REFERENCES frequency_rush_words(id);
alter table public.frequency_rush_sessions add constraint frequency_rush_sessions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES assignments(id);
alter table public.frequency_rush_sessions add constraint frequency_rush_sessions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id);
alter table public.hint_requests add constraint hint_requests_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE;
alter table public.hint_requests add constraint hint_requests_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.sam_shoutouts add constraint sam_shoutouts_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES teachers(id);
alter table public.sam_shoutouts add constraint sam_shoutouts_class_id_fkey FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE;
alter table public.sam_shoutouts add constraint sam_shoutouts_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.signal_ops_events add constraint signal_ops_events_session_id_fkey FOREIGN KEY (session_id) REFERENCES signal_ops_sessions(id) ON DELETE CASCADE;
alter table public.signal_ops_events add constraint signal_ops_events_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.signal_ops_participants add constraint signal_ops_participants_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.signal_ops_participants add constraint signal_ops_participants_session_id_fkey FOREIGN KEY (session_id) REFERENCES signal_ops_sessions(id) ON DELETE CASCADE;
alter table public.signal_ops_sessions add constraint signal_ops_sessions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE;
alter table public.signal_ops_sessions add constraint signal_ops_sessions_class_id_fkey FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE;
alter table public.student_inventory add constraint student_inventory_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id);
alter table public.student_inventory add constraint student_inventory_item_id_fkey FOREIGN KEY (item_id) REFERENCES shop_items(id);
alter table public.student_planet_discoveries add constraint student_planet_discoveries_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.student_planet_games add constraint student_planet_games_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.student_planet_visits add constraint student_planet_visits_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.student_planet_visits add constraint student_planet_visits_planet_key_fkey FOREIGN KEY (planet_key) REFERENCES planets(planet_key) ON DELETE CASCADE;
alter table public.students add constraint students_class_id_fkey FOREIGN KEY (class_id) REFERENCES classes(id);
alter table public.submissions add constraint submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id);
alter table public.submissions add constraint submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES assignments(id);
alter table public.teacher_messages add constraint teacher_messages_class_id_fkey FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE;
alter table public.teacher_messages add constraint teacher_messages_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
alter table public.teacher_messages add constraint teacher_messages_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES teachers(id);
alter table public.teachers add constraint teachers_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);

-- part 3
CREATE INDEX teacher_messages_teacher_idx ON public.teacher_messages USING btree (teacher_id, created_at DESC);
CREATE UNIQUE INDEX frequency_rush_words_grade_subject_word_key ON public.frequency_rush_words USING btree (grade, subject, lower(word));
CREATE INDEX signal_ops_sessions_assignment_idx ON public.signal_ops_sessions USING btree (assignment_id);
CREATE INDEX teacher_messages_student_idx ON public.teacher_messages USING btree (student_id, created_at DESC);
CREATE INDEX signal_ops_sessions_class_idx ON public.signal_ops_sessions USING btree (class_id);
CREATE INDEX frequency_rush_classifications_lookup ON public.frequency_rush_classifications USING btree (grade, subject, unit);
CREATE INDEX crystal_points_history_student_id_created_at_idx ON public.crystal_points_history USING btree (student_id, created_at);
CREATE UNIQUE INDEX signal_ops_sessions_one_open_per_assignment ON public.signal_ops_sessions USING btree (assignment_id) WHERE (status = ANY (ARRAY['lobby'::text, 'live'::text]));
CREATE INDEX signal_ops_events_session_created_idx ON public.signal_ops_events USING btree (session_id, created_at DESC);
CREATE INDEX signal_ops_participants_session_idx ON public.signal_ops_participants USING btree (session_id);

-- part 4
alter table public.assignment_students enable row level security;
alter table public.teachers enable row level security;
alter table public.shop_items enable row level security;
alter table public.student_inventory enable row level security;
alter table public.badge_tiers enable row level security;
alter table public.crystal_points_history enable row level security;
alter table public.classes enable row level security;
alter table public.submissions enable row level security;
alter table public.students enable row level security;
alter table public.planets enable row level security;
alter table public.student_planet_discoveries enable row level security;
alter table public.student_planet_visits enable row level security;
alter table public.student_planet_games enable row level security;
alter table public.hint_requests enable row level security;
alter table public.sam_shoutouts enable row level security;
alter table public.assignments enable row level security;
alter table public.cases enable row level security;
alter table public.frequency_rush_words enable row level security;
alter table public.frequency_rush_odd_one_out enable row level security;
alter table public.frequency_rush_attempts enable row level security;
alter table public.frequency_rush_sessions enable row level security;
alter table public.frequency_rush_odd_signal_out enable row level security;
alter table public.briefing_assignments enable row level security;
alter table public.briefing_assignment_students enable row level security;
alter table public.briefing_submissions enable row level security;
alter table public.briefings enable row level security;
alter table public.frequency_rush_classifications enable row level security;
alter table public.signal_ops_participants enable row level security;
alter table public.teacher_messages enable row level security;
alter table public.signal_ops_events enable row level security;
alter table public.signal_ops_sessions enable row level security;

-- part 5
create policy "Teachers can view students in their classes" on public.students as PERMISSIVE for SELECT to public using ((class_id IN ( SELECT classes.id
   FROM classes
  WHERE (classes.teacher_id = auth.uid()))));
create policy "Teachers can add students to their classes" on public.students as PERMISSIVE for INSERT to public with check ((class_id IN ( SELECT classes.id
   FROM classes
  WHERE (classes.teacher_id = auth.uid()))));
create policy "Teachers can view assignments for their classes" on public.assignments as PERMISSIVE for SELECT to public using ((class_id IN ( SELECT classes.id
   FROM classes
  WHERE (classes.teacher_id = auth.uid()))));
create policy "Teachers can create assignments for their classes" on public.assignments as PERMISSIVE for INSERT to public with check ((class_id IN ( SELECT classes.id
   FROM classes
  WHERE (classes.teacher_id = auth.uid()))));
create policy "Anyone can view the case library" on public.cases as PERMISSIVE for SELECT to public using (true);
create policy "Teachers can update their own classes" on public.classes as PERMISSIVE for UPDATE to public using ((teacher_id = auth.uid())) with check ((teacher_id = auth.uid()));
create policy "Teachers can view submissions for their classes" on public.submissions as PERMISSIVE for SELECT to public using ((assignment_id IN ( SELECT a.id
   FROM (assignments a
     JOIN classes c ON ((c.id = a.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can grade submissions for their classes" on public.submissions as PERMISSIVE for UPDATE to public using ((assignment_id IN ( SELECT a.id
   FROM (assignments a
     JOIN classes c ON ((c.id = a.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can view targeting for their own assignments" on public.assignment_students as PERMISSIVE for SELECT to public using ((assignment_id IN ( SELECT a.id
   FROM (assignments a
     JOIN classes c ON ((c.id = a.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can target students on their own assignments" on public.assignment_students as PERMISSIVE for INSERT to public with check ((assignment_id IN ( SELECT a.id
   FROM (assignments a
     JOIN classes c ON ((c.id = a.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can view their own classes" on public.classes as PERMISSIVE for SELECT to public using ((teacher_id = auth.uid()));
create policy "Teachers can create their own classes" on public.classes as PERMISSIVE for INSERT to public with check ((teacher_id = auth.uid()));
create policy "Teachers can delete their own classes" on public.classes as PERMISSIVE for DELETE to public using ((teacher_id = auth.uid()));
create policy "Teachers can view badge tiers" on public.badge_tiers as PERMISSIVE for SELECT to authenticated using (true);
create policy "Teachers can update badge tiers" on public.badge_tiers as PERMISSIVE for UPDATE to authenticated using (true);
create policy "Teachers can delete submissions for their classes" on public.submissions as PERMISSIVE for DELETE to public using ((assignment_id IN ( SELECT a.id
   FROM (assignments a
     JOIN classes c ON ((c.id = a.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can view hint requests for their classes" on public.hint_requests as PERMISSIVE for SELECT to public using ((assignment_id IN ( SELECT a.id
   FROM (assignments a
     JOIN classes c ON ((c.id = a.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can view their own shoutouts" on public.sam_shoutouts as PERMISSIVE for SELECT to public using ((teacher_id = auth.uid()));
create policy "Teachers can view briefings catalog" on public.briefings as PERMISSIVE for SELECT to public using ((auth.uid() IS NOT NULL));
create policy "Teachers can view briefing assignments for their classes" on public.briefing_assignments as PERMISSIVE for SELECT to public using ((class_id IN ( SELECT c.id
   FROM classes c
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can insert briefing assignments for their classes" on public.briefing_assignments as PERMISSIVE for INSERT to public with check ((class_id IN ( SELECT c.id
   FROM classes c
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can delete briefing assignments for their classes" on public.briefing_assignments as PERMISSIVE for DELETE to public using ((class_id IN ( SELECT c.id
   FROM classes c
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can view briefing targeting for their classes" on public.briefing_assignment_students as PERMISSIVE for SELECT to public using ((assignment_id IN ( SELECT ba.id
   FROM (briefing_assignments ba
     JOIN classes c ON ((c.id = ba.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can target students on briefing assignments" on public.briefing_assignment_students as PERMISSIVE for INSERT to public with check ((assignment_id IN ( SELECT ba.id
   FROM (briefing_assignments ba
     JOIN classes c ON ((c.id = ba.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can view briefing submissions for their classes" on public.briefing_submissions as PERMISSIVE for SELECT to public using ((assignment_id IN ( SELECT ba.id
   FROM (briefing_assignments ba
     JOIN classes c ON ((c.id = ba.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can update briefing submissions for their classes" on public.briefing_submissions as PERMISSIVE for UPDATE to public using ((assignment_id IN ( SELECT ba.id
   FROM (briefing_assignments ba
     JOIN classes c ON ((c.id = ba.class_id)))
  WHERE (c.teacher_id = auth.uid()))));
create policy "Teachers can view their own messages" on public.teacher_messages as PERMISSIVE for SELECT to public using ((teacher_id = auth.uid()));
create policy "Teachers can view their own row" on public.teachers as PERMISSIVE for SELECT to public using ((id = auth.uid()));
create policy "Teachers can update their own row" on public.teachers as PERMISSIVE for UPDATE to public using ((id = auth.uid())) with check ((id = auth.uid()));

-- part 6
CREATE OR REPLACE FUNCTION public.increment_crystal_points(p_student_id uuid, p_amount integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  new_total int;
BEGIN
  UPDATE students
  SET crystal_points = crystal_points + p_amount
  WHERE id = p_student_id
  RETURNING crystal_points INTO new_total;
  RETURN new_total;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.bump_daily_streak(p_student_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  prev_date date;
  new_streak int;
BEGIN
  SELECT last_active_date INTO prev_date FROM students WHERE id = p_student_id;

  IF prev_date = CURRENT_DATE THEN
    SELECT streak_days INTO new_streak FROM students WHERE id = p_student_id;
  ELSIF prev_date = CURRENT_DATE - 1 THEN
    UPDATE students SET streak_days = streak_days + 1, last_active_date = CURRENT_DATE
    WHERE id = p_student_id
    RETURNING streak_days INTO new_streak;
  ELSE
    UPDATE students SET streak_days = 1, last_active_date = CURRENT_DATE
    WHERE id = p_student_id
    RETURNING streak_days INTO new_streak;
  END IF;

  RETURN new_streak;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.log_crystal_points_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  if new.crystal_points is distinct from old.crystal_points then
    insert into public.crystal_points_history (student_id, amount, new_total)
    values (new.id, new.crystal_points - old.crystal_points, new.crystal_points);
  end if;
  return new;
end;
$function$
;
CREATE OR REPLACE FUNCTION public.purchase_item(p_student_id uuid, p_item_id text)
 RETURNS TABLE(success boolean, message text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_price int;
  v_slot text;
  v_points int;
  v_already_owned boolean;
BEGIN
  SELECT price, slot_key INTO v_price, v_slot FROM shop_items WHERE id = p_item_id;
  IF v_price IS NULL THEN
    RETURN QUERY SELECT false, 'Item not found';
    RETURN;
  END IF;

  SELECT EXISTS(SELECT 1 FROM student_inventory WHERE student_id = p_student_id AND item_id = p_item_id) INTO v_already_owned;
  IF v_already_owned THEN
    RETURN QUERY SELECT false, 'Already owned';
    RETURN;
  END IF;

  SELECT crystal_points INTO v_points FROM students WHERE id = p_student_id FOR UPDATE;
  IF v_points < v_price THEN
    RETURN QUERY SELECT false, 'Not enough points';
    RETURN;
  END IF;

  UPDATE students SET crystal_points = crystal_points - v_price WHERE id = p_student_id;
  UPDATE student_inventory SET equipped = false
    WHERE student_id = p_student_id AND item_id IN (SELECT id FROM shop_items WHERE slot_key = v_slot);
  INSERT INTO student_inventory (student_id, item_id, equipped) VALUES (p_student_id, p_item_id, true);

  RETURN QUERY SELECT true, 'Purchased';
END;
$function$
;
CREATE OR REPLACE FUNCTION public.equip_item(p_student_id uuid, p_item_id text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_slot text;
BEGIN
  SELECT slot_key INTO v_slot FROM shop_items WHERE id = p_item_id;
  UPDATE student_inventory SET equipped = false
    WHERE student_id = p_student_id AND item_id IN (SELECT id FROM shop_items WHERE slot_key = v_slot);
  UPDATE student_inventory SET equipped = true
    WHERE student_id = p_student_id AND item_id = p_item_id;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.send_sam_shoutout(p_teacher_id uuid, p_class_id uuid, p_student_id uuid, p_message text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into sam_shoutouts (student_id, teacher_id, class_id, message)
  values (p_student_id, p_teacher_id, p_class_id, p_message);
end;
$function$
;
CREATE OR REPLACE FUNCTION public.grant_sam_skin(p_student_id uuid, p_skin_key text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update students
  set teacher_unlocked_sam_skins = array_append(coalesce(teacher_unlocked_sam_skins, '{}'), p_skin_key)
  where id = p_student_id
    and not (p_skin_key = any(coalesce(teacher_unlocked_sam_skins, '{}')));
end;
$function$
;
CREATE OR REPLACE FUNCTION public.increment_outpost_resources(p_student_id uuid, p_amount integer)
 RETURNS void
 LANGUAGE sql
AS $function$
  update students
  set outpost_resources = coalesce(outpost_resources, 0) + p_amount
  where id = p_student_id;
$function$
;
CREATE OR REPLACE FUNCTION public.signal_ops_advance_session(p_session_id uuid)
 RETURNS signal_ops_sessions
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s public.signal_ops_sessions%rowtype;
  now_ts timestamptz := clock_timestamp();
  elapsed_seconds numeric;
  wave_length numeric;
  next_wave integer;
  drain_steps integer := 0;
  attack_steps integer := 0;
  damage integer;
  total_damage integer := 0;
  i integer;
begin
  select * into s from public.signal_ops_sessions where id = p_session_id for update;
  if not found then raise exception 'session_not_found'; end if;

  if s.status <> 'live' or coalesce(s.outcome, 'ongoing') <> 'ongoing' then
    return s;
  end if;

  if s.started_at is null then
    s.started_at := now_ts;
  end if;
  if s.mission_ends_at is null then
    s.mission_ends_at := s.started_at + make_interval(secs => s.duration_seconds);
  end if;

  if now_ts >= s.mission_ends_at then
    update public.signal_ops_sessions
       set status = 'ended', outcome = 'victory', ended_at = now_ts,
           mission_ends_at = s.mission_ends_at,
           state_version = state_version + 1,
           last_event = jsonb_build_object('id', gen_random_uuid()::text, 'type', 'victory', 'at', now_ts),
           updated_at = now_ts
     where id = p_session_id returning * into s;
    return s;
  end if;

  elapsed_seconds := greatest(0, extract(epoch from (now_ts - s.started_at)));
  wave_length := greatest(1, s.duration_seconds / 4.0);
  next_wave := least(4, greatest(1, floor(elapsed_seconds / wave_length)::integer + 1));

  if s.meters_ticked_at is null then
    s.meters_ticked_at := now_ts;
  else
    drain_steps := least(8, floor(extract(epoch from (now_ts - s.meters_ticked_at)) / 8.0)::integer);
    if drain_steps > 0 then
      s.power := greatest(0, s.power - drain_steps);
      s.meters_ticked_at := s.meters_ticked_at + make_interval(secs => drain_steps * 8);
    end if;
  end if;

  if s.last_attack_at is null then
    s.last_attack_at := now_ts;
  else
    attack_steps := least(3, floor(extract(epoch from (now_ts - s.last_attack_at)) / 12.0)::integer);
  end if;

  if attack_steps > 0 then
    for i in 1..attack_steps loop
      damage := case next_wave when 1 then 1 when 2 then 2 when 3 then 3 else 4 end;
      if s.lane_north < 35 then damage := damage + 1; end if;
      if s.lane_shield < 35 then damage := damage + 1; end if;
      if s.lane_core < 35 or s.power < 20 then damage := damage + 1; end if;

      if s.shield >= 55 then
        damage := greatest(0, damage - 2);
      elsif s.shield >= 25 then
        damage := greatest(0, damage - 1);
      end if;

      total_damage := total_damage + damage;
      s.base_health := greatest(0, s.base_health - damage);
      s.shield := greatest(0, s.shield - (3 + next_wave));
      s.lane_north := greatest(0, s.lane_north - (1 + next_wave));
      s.lane_shield := greatest(0, s.lane_shield - (1 + next_wave));
      s.lane_core := greatest(0, s.lane_core - next_wave);
      s.power := greatest(0, s.power - 1);
      exit when s.base_health <= 0;
    end loop;
    s.last_attack_at := now_ts;
  end if;

  if s.base_health <= 0 then
    update public.signal_ops_sessions
       set base_health = 0,
           shield = s.shield,
           power = s.power,
           lane_north = s.lane_north,
           lane_shield = s.lane_shield,
           lane_core = s.lane_core,
           wave_index = next_wave,
           meters_ticked_at = s.meters_ticked_at,
           last_attack_at = s.last_attack_at,
           status = 'ended',
           outcome = 'regroup',
           ended_at = now_ts,
           state_version = state_version + 1,
           last_event = jsonb_build_object('id', gen_random_uuid()::text, 'type', 'regroup', 'damage', total_damage, 'at', now_ts),
           updated_at = now_ts
     where id = p_session_id returning * into s;
    return s;
  end if;

  update public.signal_ops_sessions
     set power = s.power,
         shield = s.shield,
         lane_north = s.lane_north,
         lane_shield = s.lane_shield,
         lane_core = s.lane_core,
         wave_index = next_wave,
         mission_ends_at = s.mission_ends_at,
         meters_ticked_at = s.meters_ticked_at,
         last_attack_at = s.last_attack_at,
         state_version = state_version + case when drain_steps > 0 or attack_steps > 0 or wave_index <> next_wave then 1 else 0 end,
         last_event = case when attack_steps > 0 then jsonb_build_object('id', gen_random_uuid()::text, 'type', 'fleet_attack', 'damage', total_damage, 'wave', next_wave, 'at', now_ts) else last_event end,
         updated_at = case when drain_steps > 0 or attack_steps > 0 or wave_index <> next_wave then now_ts else updated_at end
   where id = p_session_id returning * into s;

  return s;
end;
$function$
;
CREATE OR REPLACE FUNCTION public.signal_ops_submit_event(p_session_id uuid, p_student_id uuid, p_event_id text, p_event_type text, p_target text DEFAULT NULL::text)
 RETURNS signal_ops_sessions
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s public.signal_ops_sessions%rowtype;
  inserted_count integer := 0;
begin
  if p_event_id is null or length(trim(p_event_id)) < 8 then
    raise exception 'invalid_event_id';
  end if;

  if not exists (
    select 1 from public.signal_ops_participants
    where session_id = p_session_id and student_id = p_student_id
  ) then
    raise exception 'student_not_in_session';
  end if;

  select * into s from public.signal_ops_sessions where id = p_session_id for update;
  if not found then raise exception 'session_not_found'; end if;
  if s.status <> 'live' or coalesce(s.outcome, 'ongoing') <> 'ongoing' then
    return s;
  end if;

  insert into public.signal_ops_events(session_id, student_id, event_id, event_type, target)
  values (p_session_id, p_student_id, p_event_id, p_event_type, p_target)
  on conflict (session_id, student_id, event_id) do nothing;
  get diagnostics inserted_count = row_count;

  if inserted_count = 0 then
    return s;
  end if;

  if p_event_type = 'correct' then
    update public.signal_ops_participants
       set correct_count = correct_count + 1,
           contribution_count = contribution_count + 1,
           last_seen_at = now()
     where session_id = p_session_id and student_id = p_student_id;

    update public.signal_ops_sessions
       set salvage = salvage + 2,
           power = least(100, power + 4),
           lane_core = least(100, lane_core + 1),
           total_correct = total_correct + 1,
           state_version = state_version + 1,
           last_event = jsonb_build_object(
             'id', p_event_id, 'type', 'class_signal', 'studentId', p_student_id, 'at', now()
           )
     where id = p_session_id
     returning * into s;

  elsif p_event_type = 'power_move' then
    if p_target = 'gate' then
      update public.signal_ops_sessions
         set lane_north = least(100, lane_north + 25),
             power = least(100, power + 4),
             state_version = state_version + 1,
             last_event = jsonb_build_object('id', p_event_id, 'type', 'power_move', 'target', 'gate', 'studentId', p_student_id, 'at', now())
       where id = p_session_id returning * into s;
    elsif p_target = 'shield' then
      update public.signal_ops_sessions
         set lane_shield = least(100, lane_shield + 25),
             shield = least(100, shield + 20),
             state_version = state_version + 1,
             last_event = jsonb_build_object('id', p_event_id, 'type', 'power_move', 'target', 'shield', 'studentId', p_student_id, 'at', now())
       where id = p_session_id returning * into s;
    elsif p_target = 'core' then
      update public.signal_ops_sessions
         set lane_core = least(100, lane_core + 25),
             power = least(100, power + 15),
             state_version = state_version + 1,
             last_event = jsonb_build_object('id', p_event_id, 'type', 'power_move', 'target', 'core', 'studentId', p_student_id, 'at', now())
       where id = p_session_id returning * into s;
    else
      raise exception 'invalid_power_move_target';
    end if;

    update public.signal_ops_participants
       set last_seen_at = now()
     where session_id = p_session_id and student_id = p_student_id;

  elsif p_event_type = 'crystal_surge' then
    update public.signal_ops_sessions
       set lane_north = least(100, lane_north + 10),
           lane_shield = least(100, lane_shield + 10),
           lane_core = least(100, lane_core + 12),
           shield = least(100, shield + 10),
           power = least(100, power + 15),
           base_health = least(100, base_health + 3),
           salvage = salvage + 2,
           state_version = state_version + 1,
           last_event = jsonb_build_object('id', p_event_id, 'type', 'crystal_surge', 'studentId', p_student_id, 'at', now())
     where id = p_session_id returning * into s;

    update public.signal_ops_participants
       set last_seen_at = now()
     where session_id = p_session_id and student_id = p_student_id;
  else
    raise exception 'invalid_signal_defense_event';
  end if;

  return s;
end;
$function$
;

-- part 7
CREATE TRIGGER trg_log_crystal_points_change AFTER UPDATE OF crystal_points ON public.students FOR EACH ROW EXECUTE FUNCTION log_crystal_points_change();

-- content
insert into public.planets overriding system value select * from json_populate_recordset(null::public.planets, '[{"id":1,"planet_key":"glow_garden","name":"Lumara","description":"A bright and beautiful planet full of glowing plants and surprises.","threshold":50,"image_path":"/planets/glow_garden.jpg","theme_color":"#22C55E","sort_order":1}, 
 {"id":2,"planet_key":"frost_ring","name":"Frostveil","description":"A frozen world with shimmering ice, snow creatures, and hidden caves.","threshold":80,"image_path":"/planets/frost_ring.jpg","theme_color":"#3B82F6","sort_order":2}, 
 {"id":4,"planet_key":"jungle_moon","name":"Solara","description":"A wild moon covered in giant trees, secret paths, and friendly creatures.","threshold":150,"image_path":"/planets/jungle_moon.jpg","theme_color":"#15803D","sort_order":4}, 
 {"id":5,"planet_key":"cloud_reef","name":"Cloudreach","description":"A peaceful world among the clouds with floating islands and sky creatures.","threshold":200,"image_path":"/planets/cloud_reef.jpg","theme_color":"#06B6D4","sort_order":5}, 
 {"id":6,"planet_key":"lavacore","name":"Cindara","description":"A fiery planet deep inside a glowing core. Only the bravest explorers go here!","threshold":120,"image_path":"/planets/lavacore.jpg","theme_color":"#DC2626","sort_order":6}, 
 {"id":3,"planet_key":"robot_relay_city","name":"Mechara","description":"A high-tech planet where robots build, race, and create awesome inventions.","threshold":250,"image_path":"/planets/robot_relay_city.jpg","theme_color":"#F97316","sort_order":3}]') on conflict do nothing;
insert into public.frequency_rush_odd_signal_out select * from json_populate_recordset(null::public.frequency_rush_odd_signal_out, E'[{"id":"31c9e275-d785-4236-8e66-bb930fc1e54b","grade":3,"subject":"science","unit":"1","seq":1,"words":["Solid","Liquid","Gas"],"odd_word":"Condensation","explanation":"the first three are states of matter; Condensation is a process that changes matter between states, not a state itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"6ad0793f-2356-4e71-9d2b-157cf95b3720","grade":3,"subject":"science","unit":"1","seq":2,"words":["Evaporation","Water vapor","Gas"],"odd_word":"Mass","explanation":"the first three all relate to matter becoming/being a gas; Mass is a measurable property unrelated to states or state-changes.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"f211bade-9a3a-48c7-bf73-9d1a31090a76","grade":3,"subject":"science","unit":"1","seq":3,"words":["Celsius","Fahrenheit","Temperature"],"odd_word":"Magnetism","explanation":"the first three are all about measuring heat; Magnetism is an unrelated force.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"89eacb72-f44e-4041-8d00-3efab50d23b6","grade":3,"subject":"science","unit":"1","seq":4,"words":["Float","Sink","Mass"],"odd_word":"Ingredient","explanation":"the first three are physical-properties-of-matter concepts; Ingredient belongs to the Materials Science subcluster instead.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"cf1c6d87-bea8-4167-be26-bffac819bf2a","grade":3,"subject":"science","unit":"1","seq":5,"words":["Combine","Mixture","Ingredient"],"odd_word":"Solid","explanation":"the first three relate to combining materials into mixtures; Solid is a state of matter, an unrelated concept.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"bc514ce7-3ebd-42ca-b998-368eb72881ba","grade":3,"subject":"science","unit":"2","seq":1,"words":["Push","Pull","Force"],"odd_word":"Friction","explanation":"Push, Pull, and Force are all about applying motion; Friction is a force that resists motion instead.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"232943cc-d827-40ad-a21a-afa9e564738c","grade":3,"subject":"science","unit":"2","seq":2,"words":["Attract","Repel","Magnetism"],"odd_word":"Gravity","explanation":"the first three specifically involve magnets; Gravity is a different force that doesn''t need magnets at all.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"e051760c-5340-40da-b3b2-33df03b822c7","grade":3,"subject":"science","unit":"2","seq":3,"words":["Motion","Position","Speed"],"odd_word":"Distance","explanation":"the first three describe how or where something moves; Distance just measures the space between two points, not the movement itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"540c3dfb-53d6-4d4e-a7f2-8effd5b308ab","grade":3,"subject":"science","unit":"3","seq":1,"words":["Light energy","Sound energy","Thermal energy"],"odd_word":"Mechanical energy","explanation":"the first three are energy you can sense directly (see, hear, feel warmth); Mechanical energy is about motion or position instead.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ab971793-1efb-4bf5-96c4-9d3df4732149","grade":3,"subject":"science","unit":"3","seq":2,"words":["Energy","Mechanical energy","Speed"],"odd_word":"Position","explanation":"the first three all relate to something moving or having the ability to move; Position just describes where something is, not its motion or energy.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"e9aea252-9807-4ea7-b2be-1e8576cc8614","grade":3,"subject":"science","unit":"4","seq":1,"words":["Inner planets","Outer planets","Planet"],"odd_word":"Orbit","explanation":"the first three all describe planets themselves; Orbit describes the path a planet follows, not the planet.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"f4775c38-0a91-4414-a980-91491a547394","grade":3,"subject":"science","unit":"4","seq":2,"words":["Sun","Moon","Solar system"],"odd_word":"Model","explanation":"the first three are real objects/systems in space; Model is a tool used to represent them, not a space object itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"3f6c5e9a-d10d-4589-bd65-734a236530a9","grade":3,"subject":"science","unit":"5","seq":1,"words":["Rain gauge","Wind vane","Thermometer"],"odd_word":"Cloud cover","explanation":"the first three are all tools used to measure weather; Cloud cover is something being described, not a measuring tool.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"df81f4d5-f2f9-44c1-a6ad-bb582d42874f","grade":3,"subject":"science","unit":"5","seq":2,"words":["Weathering","Decomposition","Mechanical (weathering)"],"odd_word":"Soil formation","explanation":"the first three are all ways something gets broken down; Soil formation is the larger process that results from them, not a breaking-down process itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"1f90a1d8-f34e-4994-b8a6-5019e03c7181","grade":3,"subject":"science","unit":"5","seq":3,"words":["Earthquake","Volcano","Landslide"],"odd_word":"Weather","explanation":"the first three are sudden, rapid changes to Earth''s surface; Weather describes ongoing atmospheric conditions, a very different kind of process.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"7d36457f-b4e6-4bbc-b774-6fe257331a5c","grade":3,"subject":"science","unit":"5","seq":4,"words":["Degrees Celsius","Degrees Fahrenheit","Temperature"],"odd_word":"Precipitation","explanation":"the first three are all about measuring how hot or cold something is; Precipitation is about water falling from the sky, unrelated to temperature itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"0c0dfc2a-a2d4-427a-8640-0bbb9da5fcf0","grade":3,"subject":"science","unit":"6","seq":1,"words":["Reduce","Reuse","Recycle"],"odd_word":"Replenish","explanation":"the first three are the classic \\"3 Rs\\" a person actively does with waste; Replenish is about restoring a resource in nature, a different kind of action.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"f315a500-f510-411a-9043-dda56dc1dcbf","grade":3,"subject":"science","unit":"6","seq":2,"words":["Natural resource","Product","Conserve"],"odd_word":"Replenish","explanation":"Natural resource, Product, and Conserve all describe the resource-to-goods chain and protecting it; Replenish is specifically about refilling a used-up resource, a narrower idea than conserving in general.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"1bcdc52f-4e28-4fe6-a17f-6f0e72e0fcbb","grade":3,"subject":"science","unit":"7","seq":1,"words":["Hibernate","Migrate","Dormancy"],"odd_word":"Behavior","explanation":"the first three are specific survival strategies tied to weather/season; Behavior is the general category name for any action, not a specific strategy.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"8d54ba0a-4262-4879-8f6c-e1eb9aee41cb","grade":3,"subject":"science","unit":"7","seq":2,"words":["Producer","Consumer","Decomposer"],"odd_word":"Population","explanation":"the first three describe an organism''s role in a food chain; Population describes a group of the same organism, not a feeding role.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"677c6b33-03fa-4ad7-9f93-88f50bf0c104","grade":3,"subject":"science","unit":"7","seq":3,"words":["Drought","Flood","Environmental change"],"odd_word":"Ecosystem","explanation":"the first three are specific events/changes that happen to a place; Ecosystem is the ongoing system itself, not a single change event.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"58353f4a-0cbd-4573-9cab-e00eaf3f6ed2","grade":3,"subject":"science","unit":"7","seq":4,"words":["Fossil","Paleontologist","Evidence"],"odd_word":"Thrive","explanation":"the first three are all connected to studying life from the past; Thrive is about an organism doing well right now, unrelated to fossils.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"f5b676bf-dc04-47c6-9de2-842cb5d3f062","grade":3,"subject":"science","unit":"8","seq":1,"words":["Egg","Larva","Pupa"],"odd_word":"Nymph","explanation":"the first three are stages of complete metamorphosis; Nymph belongs to incomplete metamorphosis, a different kind of life cycle entirely.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"0aa3f783-5742-4d5d-a07c-775d2d58bc86","grade":3,"subject":"science","unit":"8","seq":2,"words":["Structure","Function","Protection"],"odd_word":"Survive","explanation":"the first three describe a body part and its job; Survive is the outcome/goal, not a body part or its purpose.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"d002a605-dc06-4042-a02e-573e8cc7085c","grade":3,"subject":"science","unit":"8","seq":3,"words":["Germinate","Seedling","Plant life cycle"],"odd_word":"Metamorphosis","explanation":"the first three all describe plant growth; Metamorphosis specifically describes animal body-form changes.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"2120e368-d05c-4c40-bbf3-1ac8bbacc7ca","grade":3,"subject":"science","unit":"9","seq":1,"words":["Observation","Data","Evidence"],"odd_word":"Question","explanation":"the first three are all things gathered or produced during an investigation; Question is what starts an investigation, not something collected from it.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"caacbe82-d37d-40d5-ac6c-4e33663250bb","grade":3,"subject":"science","unit":"9","seq":2,"words":["Criteria","Prototype","Investigation"],"odd_word":"Conclusion","explanation":"the first three happen during the design/testing process; Conclusion is the statement made afterward, once the process is done.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"68c97ca0-0bfe-46f3-8d22-6801aadbfeb8","grade":3,"subject":"science","unit":"9","seq":3,"words":["Pattern","Cause and effect","System"],"odd_word":"Scale","explanation":"the first three describe relationships or interactions between parts; Scale is about relative size/comparison, not about how parts relate to each other.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"5681b159-9096-486c-9c14-de42e7c31a44","grade":4,"subject":"science","unit":"1","seq":1,"words":["Solid","Liquid","Mixture"],"odd_word":"Buoyancy","explanation":"the first three describe forms or combinations of matter; Buoyancy is a force, not a form of matter.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"bae1b681-d0ca-46b9-b2ec-0145c15ed270","grade":4,"subject":"science","unit":"1","seq":2,"words":["Classified","Conserved","Dissolve"],"odd_word":"Component","explanation":"the first three describe actions/processes done to matter; Component is a part/object, not an action.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"72ac3343-f289-4509-807e-11356dd9f483","grade":4,"subject":"science","unit":"1","seq":3,"words":["Mass","Matter","Substance"],"odd_word":"Solution","explanation":"the first three are general terms for \\"stuff\\" and how much of it exists; Solution is a specific, more complex kind of mixture.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"93f4c5f1-2d3d-4de3-ac69-5482cc9fc11a","grade":4,"subject":"science","unit":"2","seq":1,"words":["Force","Friction","Gravity"],"odd_word":"Position","explanation":"the first three are all forces that can act on objects; Position just describes location, not a force.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"4a447aee-70e5-434a-add4-07baf40b16de","grade":4,"subject":"science","unit":"2","seq":2,"words":["Contact","Distance","Position"],"odd_word":"Motion","explanation":"the first three describe a static relationship (touching, spacing, location); Motion specifically describes change over time.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"63556197-1cee-49bc-b375-e5fee7217dc5","grade":4,"subject":"science","unit":"3","seq":1,"words":["Conductor","Insulator","Switch"],"odd_word":"Battery","explanation":"the first three are all parts that control whether/how electricity moves; Battery is the energy source that powers the circuit, not a control part.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"c72d2cc2-3fdd-4678-854f-8e64df84a647","grade":4,"subject":"science","unit":"3","seq":2,"words":["Circuit","Closed circuit","Open circuit"],"odd_word":"Path","explanation":"the first three specifically describe electrical circuits and their states; Path is a general term for any route, not specific to circuits.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"fae30656-5044-4057-aae9-6c2ce0f2fa93","grade":4,"subject":"science","unit":"3","seq":3,"words":["Light energy","Thermal energy","Electrical energy"],"odd_word":"Vibration","explanation":"the first three are types of energy; Vibration is a kind of motion, not a type of energy itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"35f66cde-efc9-4537-b013-88e79e41d3b4","grade":4,"subject":"science","unit":"4","seq":1,"words":["Earth","Moon","Orbit"],"odd_word":"Lunar","explanation":"the first three are real objects/paths in space; Lunar is a describing word meaning \\"related to the Moon,\\" not an object itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"19f28db9-2244-4d4c-8667-6e2c8641b819","grade":4,"subject":"science","unit":"4","seq":2,"words":["Cycle","Sequence","Pattern"],"odd_word":"Revolve","explanation":"the first three describe how events are organized over time; Revolve describes a specific physical motion, not a way of organizing events.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"a64d5c0e-5cdf-4d22-96bb-516ecf00258d","grade":4,"subject":"science","unit":"5","seq":1,"words":["Evaporation","Condensation","Runoff"],"odd_word":"Weathering","explanation":"the first three are all steps of the water cycle; Weathering is about breaking down rock, unrelated to water moving through the cycle.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"b7e22352-9595-4fac-a812-ffe80942b166","grade":4,"subject":"science","unit":"5","seq":2,"words":["Delta","Glacier","Sand dune"],"odd_word":"Sediment","explanation":"the first three are landforms shaped by moving material; Sediment is the material itself, not a landform.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"679923b8-a32b-4ba6-8559-73063a0f12b6","grade":4,"subject":"science","unit":"5","seq":3,"words":["Erosion","Deposition","Slow change"],"odd_word":"Sun","explanation":"the first three all describe gradual surface-changing processes; Sun is an object providing energy, not a process of change.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"a1d88b87-fb73-4c0d-939f-f59a9a8436fb","grade":4,"subject":"science","unit":"5","seq":4,"words":["Weather","Climate","Atmosphere"],"odd_word":"Landform","explanation":"the first three describe conditions of the air/sky; Landform is a solid surface feature, unrelated to weather or air.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"66b5c62d-364d-4bd0-a1f5-bfc10f0bcd6d","grade":4,"subject":"science","unit":"6","seq":1,"words":["Renewable resource","Nonrenewable resource","Natural resource"],"odd_word":"Disposal","explanation":"the first three all describe kinds of resources; Disposal is about getting rid of waste, not a type of resource.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"18a34141-2c9e-41f9-b6df-d122c01c6e40","grade":4,"subject":"science","unit":"6","seq":2,"words":["Density","Porosity","Permeability"],"odd_word":"Water content","explanation":"the first three describe how matter/space is packed and how fluid can flow through it; Water content is a simpler measurement of how much water is present.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ad4bf446-d376-4ef7-bac8-77d372ab227b","grade":4,"subject":"science","unit":"6","seq":3,"words":["Abundance","Deplete","Replenish"],"odd_word":"Conservation","explanation":"the first three describe amounts of a resource going up, down, or being refilled; Conservation is the deliberate practice of protecting resources, not a change in amount.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ba316e53-5b4a-41d9-8904-8ceb08b62626","grade":4,"subject":"science","unit":"7","seq":1,"words":["Carnivore","Herbivore","Omnivore"],"odd_word":"Predator","explanation":"the first three describe diet type; Predator describes a hunting role, a different category than diet.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"bd22e4e9-c3ae-4544-826d-3b0d1d7aed0e","grade":4,"subject":"science","unit":"7","seq":2,"words":["Producer","Consumer","Decomposer"],"odd_word":"Ecosystem","explanation":"the first three describe an organism''s role in the flow of energy; Ecosystem is the whole system they exist within, not a role.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"c2a767e4-4eac-44ac-aa32-5b592d8d9661","grade":4,"subject":"science","unit":"7","seq":3,"words":["Abiotic","Biotic","Environment"],"odd_word":"Fossil","explanation":"the first three describe living/nonliving parts of a place; Fossil is evidence left behind from the past, not a category of environment.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ffc93092-ef62-4a10-ba18-1714469fe4e1","grade":4,"subject":"science","unit":"8","seq":1,"words":["Structure","Function","Adaptation"],"odd_word":"Interaction","explanation":"the first three all relate to a body part and what it does for survival; Interaction is about two things affecting each other, not a body part.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"0edbfcd8-cf37-4b94-9454-3a907d6c1439","grade":4,"subject":"science","unit":"8","seq":2,"words":["Inherited trait","Acquired physical trait","Parent"],"odd_word":"Defense","explanation":"the first three all relate to how traits pass from parents to offspring; Defense is a survival feature, unrelated to where a trait came from.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"0bf01ce0-d7f4-42b3-804a-40d799ad46b0","grade":4,"subject":"science","unit":"9","seq":1,"words":["Data","Evidence","Observation"],"odd_word":"Calculation","explanation":"the first three are all information gathered or produced during an investigation; Calculation is a math process used on numbers, not information gathered directly.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"754d68f9-9686-4a6f-b1a8-b2df791b0719","grade":4,"subject":"science","unit":"9","seq":2,"words":["Scale","Proportion","Quantity"],"odd_word":"Correlation","explanation":"the first three are all about size, amount, or comparison of measurements; Correlation is about a pattern between two changing things, not a size or amount itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"74371b16-39aa-4bed-9146-cdb1388a9d44","grade":4,"subject":"science","unit":"9","seq":3,"words":["Structure and function","Stability and change","Cause and effect"],"odd_word":"Prototype","explanation":"the first three are broad scientific crosscutting concepts; Prototype is a specific engineering-design object, not a crosscutting idea.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"d74370b2-1c71-46df-8dda-b93b9416d640","grade":5,"subject":"science","unit":"1","seq":1,"words":["Solute","Solvent","Solution"],"odd_word":"Filter","explanation":"the first three all describe parts of a dissolving mixture; Filter is a tool for physically separating a mixture, not a role within a solution.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"a5a769b4-71f8-4d0e-8e24-e06ca9d866e0","grade":5,"subject":"science","unit":"1","seq":2,"words":["Conduct","Insulate","Conductivity"],"odd_word":"Dissolve","explanation":"the first three are all about how energy moves (or doesn''t) through a material; Dissolve is about matter mixing, unrelated to energy transfer.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"e6890c7f-4829-4853-b16b-9013f98a84b9","grade":5,"subject":"science","unit":"1","seq":3,"words":["Solid","Liquid","Gas"],"odd_word":"Volume","explanation":"the first three are states of matter; Volume is a measurement of space, not a state of matter itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"8491c022-9e68-4067-b4de-7ced55b82cae","grade":5,"subject":"science","unit":"1","seq":4,"words":["Evaporation","Condensation","Heating"],"odd_word":"Insoluble","explanation":"the first three describe changes involving thermal energy and states of matter; Insoluble describes whether something dissolves, unrelated to heat.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ed871cb2-a09e-4593-99a1-cd5190ede3a4","grade":5,"subject":"science","unit":"2","seq":1,"words":["Independent variable","Dependent variable","Controlled variable"],"odd_word":"Constant","explanation":"the first three are the specific vocabulary for the three variable roles in an experiment; Constant describes a factor that doesn''t change, closely related to but not identical to a Controlled variable.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"d1071341-ade9-4e8d-831e-6dac599b9887","grade":5,"subject":"science","unit":"2","seq":2,"words":["Hypothesis","Conclusion","Trial"],"odd_word":"Pattern","explanation":"the first three are all specific steps/parts of running an experiment; Pattern is something you might notice in the results, not a step in the process.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ed4052d6-4670-42f8-a996-e6253cdb4ed7","grade":5,"subject":"science","unit":"2","seq":3,"words":["Push","Pull","Attract"],"odd_word":"Friction","explanation":"the first three are all forces that move objects toward or away from something; Friction resists motion instead of causing it.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"24af0657-b173-4a93-8fa7-19d91c34c70b","grade":5,"subject":"science","unit":"3","seq":1,"words":["Conductor","Insulator","Load"],"odd_word":"Fuse","explanation":"the first three are components defined by how they handle electrical energy flow; Fuse is specifically a safety device, a narrower and different kind of component.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"7daf45b3-8392-40a3-aa9f-98d3b4de43c7","grade":5,"subject":"science","unit":"3","seq":2,"words":["Reflection","Refraction","Absorption"],"odd_word":"Transmit","explanation":"the first three describe what happens when light hits a surface (bounces, bends, or gets taken in); Transmit describes light passing all the way through, a different outcome from the other three.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"4cfb1e68-9cc9-40cd-8614-86963eccec29","grade":5,"subject":"science","unit":"3","seq":3,"words":["Transparent","Translucent","Opaque"],"odd_word":"Medium","explanation":"the first three describe how much light passes through a material; Medium is the general term for any substance light travels through, not a specific light-blocking category.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"42f49c50-db6f-468d-b01d-f2c4bf438b1d","grade":5,"subject":"science","unit":"3","seq":4,"words":["Chemical energy","Mechanical energy","Thermal energy"],"odd_word":"Conversion of energy","explanation":"the first three are types of energy; Conversion of energy is a process that happens between energy types, not a type of energy itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"8e468e13-ccc5-4ad9-a319-39788bd8ffc9","grade":5,"subject":"science","unit":"4","seq":1,"words":["Rotation","Axis","Day/night cycle"],"odd_word":"Orbit","explanation":"the first three are all connected to Earth spinning in place; Orbit is about traveling around another object, a different kind of motion.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"7491b7d5-7fc2-45f6-a658-2b1144c009be","grade":5,"subject":"science","unit":"4","seq":2,"words":["Rise","Set","Horizon"],"odd_word":"Equator","explanation":"the first three all describe how the Sun appears to move relative to the sky''s edge; Equator is a fixed line around Earth itself, unrelated to the Sun''s apparent movement.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"d5bab7b3-8377-4ea3-a4cd-5932a6772e4d","grade":5,"subject":"science","unit":"4","seq":3,"words":["Inner planet","Outer planet","Planet"],"odd_word":"Model","explanation":"the first three are all real categories of planets; Model is a representational tool, not a category of space object.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"4d7f833a-3b4a-43a8-bcc0-351c0e112326","grade":5,"subject":"science","unit":"5","seq":1,"words":["Canyon","Mesa","Valley"],"odd_word":"Delta","explanation":"the first three are landforms shaped mainly by erosion cutting into or exposing rock; Delta is built up from deposited sediment instead of carved away.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"3443bcdc-c04e-49e3-8df3-7809a7a0affb","grade":5,"subject":"science","unit":"5","seq":2,"words":["Cementation","Compaction","Solidification"],"odd_word":"Weathering","explanation":"the first three are all ways rock can FORM; Weathering is a way rock breaks DOWN, the opposite kind of process.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"8b95bd00-bf51-42c6-a07f-eb88d06ff18d","grade":5,"subject":"science","unit":"5","seq":3,"words":["U-shaped valley","V-shaped valley","Canyon"],"odd_word":"Mesa","explanation":"the first three are all valley-type landforms carved by moving water or ice; Mesa is a raised, flat-topped landform, not a valley at all.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"d10e824b-e705-4bfb-b99a-4b841db4e25d","grade":5,"subject":"science","unit":"5","seq":4,"words":["Earthquake","Volcano","Landslide"],"odd_word":"Ocean currents","explanation":"the first three are all sudden or rapid Earth-surface hazards; Ocean currents are a continuous, ongoing water movement, not a sudden event.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"a028cade-03e2-4e8f-8d38-7ae20f411a42","grade":5,"subject":"science","unit":"6","seq":1,"words":["Coal","Oil","Natural gas"],"odd_word":"Organic matter","explanation":"the first three are all specific fossil fuels; Organic matter is the raw living/once-living material fossil fuels form from, not a fuel itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"69b08fab-0651-487d-a84b-37669074cbf0","grade":5,"subject":"science","unit":"6","seq":2,"words":["Decay","Decomposition","Formation"],"odd_word":"Fossil fuel","explanation":"the first three are all processes; Fossil fuel is the resulting product, not a process.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"1cc77b96-e7b7-44a8-815a-15811fd67607","grade":5,"subject":"science","unit":"6","seq":3,"words":["Renewable resource","Nonrenewable resource","Natural resource"],"odd_word":"Disposal","explanation":"the first three describe kinds of resources; Disposal is about getting rid of waste, not a type of resource.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"1e858673-c3ad-4a45-ab35-30a611a65639","grade":5,"subject":"science","unit":"7","seq":1,"words":["Producer","Consumer","Decomposer"],"odd_word":"Population","explanation":"the first three describe an organism''s role in the flow of energy; Population describes a group of the same organism, not a feeding role.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"d90d9bcd-40de-4465-b5c3-ba9c1e5487ff","grade":5,"subject":"science","unit":"7","seq":2,"words":["Abiotic","Biotic","Living"],"odd_word":"Interaction","explanation":"the first three all describe whether something is (or was) alive; Interaction is about things affecting each other, not a living/nonliving category.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"54d5a559-bb6c-46b2-bb6d-bd45760afbf5","grade":5,"subject":"science","unit":"7","seq":3,"words":["Food chain","Food web","Flow of energy"],"odd_word":"Cycling of matter","explanation":"the first three all describe how ENERGY moves through an ecosystem; Cycling of matter is specifically about MATTER being reused, a related but different concept.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"5d69c646-9e54-44b9-a00e-37d95c4b5ce6","grade":5,"subject":"science","unit":"7","seq":4,"words":["Fossil","Paleontologist","Evidence"],"odd_word":"Human activities","explanation":"the first three are all connected to studying life from the past; Human activities describes present-day actions affecting ecosystems, unrelated to fossils.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"05ee1604-734b-4401-8f73-5463acd4b33c","grade":5,"subject":"science","unit":"8","seq":1,"words":["Structure","Function","Structural adaptation"],"odd_word":"Instinct","explanation":"the first three are all about physical body parts and their purpose; Instinct is a behavior, not a body structure.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ffe35fab-ea30-445a-9868-1326a31da54d","grade":5,"subject":"science","unit":"8","seq":2,"words":["Instinct","Learned behavior","Behavioral traits"],"odd_word":"Offspring","explanation":"the first three all describe ways an organism acts; Offspring describes a relationship (young produced by parents), not a behavior.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"f985f012-4101-4138-8ed7-7096a2d324a5","grade":5,"subject":"science","unit":"9","seq":1,"words":["Data","Evidence","Observation"],"odd_word":"Calculation","explanation":"the first three are all information gathered or produced during an investigation; Calculation is a math process used on numbers, not information gathered directly.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"1ec08654-e5ec-4959-a842-d507277f1cbc","grade":5,"subject":"science","unit":"9","seq":2,"words":["Scale","Proportion","Quantity"],"odd_word":"Correlation","explanation":"the first three are all about size, amount, or comparison of measurements; Correlation is about a pattern between two changing things, not a size or amount itself.","created_at":"2026-09-09T18:14:37.452277"}, 
 {"id":"ba24a286-d4a8-4184-9b7c-8712fb1bb482","grade":5,"subject":"science","unit":"9","seq":3,"words":["Structure and function","Stability and change","Cause and effect"],"odd_word":"Prototype","explanation":"the first three are broad scientific crosscutting concepts; Prototype is a specific engineering-design object, not a crosscutting idea.","created_at":"2026-09-09T18:14:37.452277"}]') on conflict do nothing;
insert into public.briefings select * from json_populate_recordset(null::public.briefings, '[{"id":"SS-3-2A-BR","title":"Why Communities Form","tagline":"HQ needs to know: why do people live together in the first place?","subject":"social_studies","grade":3,"teks":"3.2A","minutes":40,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-10T18:26:56.294901"}, 
 {"id":"SS-3-2B-BR","title":"How Communities Meet Needs","tagline":"Maple Crossing and Cloudreach both take care of people — they just do it differently.","subject":"social_studies","grade":3,"teks":"3.2B","minutes":30,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-11T14:33:48.022652"}, 
 {"id":"SCI-3-6B-BR","title":"Solid, Liquid, or Gas?","tagline":"Matter can be a solid, a liquid, or a gas. The clue is what happens to its shape.","subject":"science","grade":3,"teks":"3.6B","minutes":25,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-12T17:28:20.798187"}, 
 {"id":"SS-4-3A-V3-BR","title":"Three Doors Closing","tagline":"Nobody woke up wanting a war. Each thing they tried made the next thing worse.","subject":"social_studies","grade":4,"teks":"4.3A","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:19:11.790183"}, 
 {"id":"SS-5-5A-V3-BR","title":"One Machine, Three Changes","tagline":"Nobody voted to move half the country into cities. The factories did it anyway.","subject":"social_studies","grade":5,"teks":"5.5A","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:19:11.790183"}, 
 {"id":"SS-3-2B-V3-BR","title":"Two Towns, Five Needs","tagline":"Three hundred people on one side of the river. Two thousand on the other.","subject":"social_studies","grade":3,"teks":"3.2B","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-3-1B-V3-BR","title":"Three Ways to Build a Town","tagline":"One drew a city that wasn''t there. One found out exactly where it was. One got thirty neighbours to sign a paper.","subject":"social_studies","grade":3,"teks":"3.1B","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-3-7C-V3-BR","title":"The Wrong Desk","tagline":"Four months to fix a pothole, because the letter went to the wrong building.","subject":"social_studies","grade":3,"teks":"3.7C","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-4-6B-V3-BR","title":"Fifty-Five Inches and Nine","tagline":"Same state, same jobs to do. One corner does them with rain. The other carries every drop.","subject":"social_studies","grade":4,"teks":"4.6B","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-4-2E-V3-BR","title":"The Year He Waited","tagline":"One man spent a year in a waiting room. Another decided his colony would be Mexican. Both were right, and both paid.","subject":"social_studies","grade":4,"teks":"4.2E","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-4-6A-V3-BR","title":"The Wrong Call","tagline":"Three plans that were fine everywhere except where somebody used them.","subject":"social_studies","grade":4,"teks":"4.6A","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-5-13A-V3-BR","title":"Who Sends Who Home","tagline":"Two systems of government, in one colony, in one room, for a hundred and fifty years.","subject":"social_studies","grade":5,"teks":"5.13A","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-5-2B-V3-BR","title":"Three Ways to Start a Country","tagline":"One defended the soldiers everybody hated. One threw the cargo in the sea. One wrote a sentence that outran him.","subject":"social_studies","grade":5,"teks":"5.2B","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}, 
 {"id":"SS-5-20A-V3-BR","title":"When It Was Made","tagline":"A poem about 1775, written in 1860. Read it as an eyewitness and you learn the wrong century.","subject":"social_studies","grade":5,"teks":"5.20A","minutes":20,"related_challenge_ids":[],"engine":"briefing","published":true,"created_at":"2026-09-16T03:36:14.777895"}]') on conflict do nothing;
insert into public.shop_items select * from json_populate_recordset(null::public.shop_items, '[{"id":"beanbag_purple","name":"Purple Beanbag","slot_key":"seating","price":15,"image_url":"/gear/items/beanbag_purple.png","sort_order":0}, 
 {"id":"cushion_teal","name":"Teal Cushion","slot_key":"seating","price":20,"image_url":"/gear/items/cushion_teal.png","sort_order":0}, 
 {"id":"hammock_gold","name":"Gold Hammock Chair","slot_key":"seating","price":60,"image_url":"/gear/items/hammock_gold.png","sort_order":0}, 
 {"id":"rug_stripe","name":"Striped Rug","slot_key":"rug","price":15,"image_url":"/gear/items/rug_stripe.png","sort_order":0}, 
 {"id":"rug_round","name":"Round Sunburst Rug","slot_key":"rug","price":25,"image_url":"/gear/items/rug_round.png","sort_order":0}, 
 {"id":"poster_stars","name":"Star Poster","slot_key":"wall","price":10,"image_url":"/gear/items/poster_stars.png","sort_order":0}, 
 {"id":"string_lights","name":"String Lights","slot_key":"wall","price":30,"image_url":"/gear/items/string_lights.png","sort_order":0}, 
 {"id":"bulletin_board","name":"Bulletin Board","slot_key":"wall","price":40,"image_url":"/gear/items/bulletin_board.png","sort_order":0}, 
 {"id":"potted_plant","name":"Potted Plant","slot_key":"window","price":15,"image_url":"/gear/items/potted_plant.png","sort_order":0}, 
 {"id":"fairy_curtain","name":"Fairy Light Curtain","slot_key":"window","price":35,"image_url":"/gear/items/fairy_curtain.png","sort_order":0}, 
 {"id":"crystal_cat","name":"Crystal Cat","slot_key":"pet","price":50,"image_url":"/gear/items/crystal_cat.png","sort_order":0}, 
 {"id":"tiny_dragon","name":"Tiny Dragon","slot_key":"pet","price":90,"image_url":"/gear/items/tiny_dragon.png","sort_order":0}, 
 {"id":"mushroom_chair","name":"Mushroom Armchair","slot_key":"seating","price":60,"image_url":"/gear/items/mushroom_chair.png","sort_order":0}, 
 {"id":"purple_loveseat","name":"Velvet Loveseat","slot_key":"seating","price":65,"image_url":"/gear/items/purple_loveseat.png","sort_order":0}, 
 {"id":"oval_rug","name":"Starlight Rug","slot_key":"rug","price":45,"image_url":"/gear/items/oval_rug.png","sort_order":0}, 
 {"id":"crystal_bookshelf","name":"Crystal Bookshelf","slot_key":"wall","price":70,"image_url":"/gear/items/crystal_bookshelf.png","sort_order":0}, 
 {"id":"treasure_bookshelf","name":"Treasure Bookshelf","slot_key":"wall","price":75,"image_url":"/gear/items/treasure_bookshelf.png","sort_order":0}, 
 {"id":"floating_shelf","name":"Floating Shelf","slot_key":"wall","price":40,"image_url":"/gear/items/floating_shelf.png","sort_order":0}, 
 {"id":"vine_chandelier","name":"Vine Chandelier","slot_key":"lighting","price":90,"image_url":"/gear/items/vine_chandelier.png","sort_order":0}, 
 {"id":"cozy_fireplace","name":"Cozy Fireplace","slot_key":"fireplace","price":100,"image_url":"/gear/items/cozy_fireplace.png","sort_order":0}, 
 {"id":"arcade_beanbag","name":"Neon Beanbag","slot_key":"arcade_seating","price":55,"image_url":"/gear/items/arcade_beanbag.png","sort_order":0}, 
 {"id":"arcade_couch","name":"Pixel Pillow Couch","slot_key":"arcade_seating","price":70,"image_url":"/gear/items/arcade_couch.png","sort_order":0}, 
 {"id":"arcade_rug","name":"Retro Grid Rug","slot_key":"arcade_rug","price":45,"image_url":"/gear/items/arcade_rug.png","sort_order":0}, 
 {"id":"arcade_wall_shelf","name":"Game Shelf","slot_key":"arcade_wall","price":60,"image_url":"/gear/items/arcade_wall_shelf.png","sort_order":0}, 
 {"id":"arcade_chandelier","name":"Arcade Chandelier","slot_key":"arcade_lighting","price":90,"image_url":"/gear/items/arcade_chandelier.png","sort_order":0}, 
 {"id":"arcade_entertainment_center","name":"Entertainment Center","slot_key":"arcade_centerpiece","price":110,"image_url":"/gear/items/arcade_entertainment_center.png","sort_order":0}, 
 {"id":"arcade_claw_machine","name":"Claw Machine","slot_key":"arcade_extra","price":100,"image_url":"/gear/items/arcade_claw_machine.png","sort_order":0}, 
 {"id":"arcade_cabinet","name":"Arcade Cabinet","slot_key":"arcade_extra","price":100,"image_url":"/gear/items/arcade_cabinet.png","sort_order":0}]') on conflict do nothing;
insert into public.badge_tiers select * from json_populate_recordset(null::public.badge_tiers, '[{"id":"6940e7b0-744c-4c62-8a24-b240c217d9f6","tier_key":"explorer","label":"Explorer","threshold":0,"image_path":"/badges/explorer.png","sort_order":1,"created_at":"2026-08-24T18:44:36.402503+00:00"}, 
 {"id":"af210712-b37b-467b-bea4-f0010202d52f","tier_key":"discoverer","label":"Discoverer","threshold":50,"image_path":"/badges/discoverer.png","sort_order":2,"created_at":"2026-08-24T18:44:36.402503+00:00"}, 
 {"id":"a4d26a74-1e54-4c28-944d-aa42efaa1820","tier_key":"pathfinder","label":"Pathfinder","threshold":150,"image_path":"/badges/pathfinder.png","sort_order":3,"created_at":"2026-08-24T18:44:36.402503+00:00"}, 
 {"id":"6c8edb52-c429-4f05-a043-90980e58df20","tier_key":"trailblazer","label":"Trailblazer","threshold":300,"image_path":"/badges/trailblazer.png","sort_order":4,"created_at":"2026-08-24T18:44:36.402503+00:00"}, 
 {"id":"4267df61-7212-4367-b263-2fe29c21dd3f","tier_key":"luminary","label":"Luminary","threshold":500,"image_path":"/badges/luminary.png","sort_order":5,"created_at":"2026-08-24T18:44:36.402503+00:00"}]') on conflict do nothing;
insert into public.frequency_rush_classifications select * from json_populate_recordset(null::public.frequency_rush_classifications, '[{"id":"test-1","grade":3,"subject":"Science","unit":"6B","prompt":"Sort each item into the correct state of matter.","title":null,"categories":[{"id": "solid", "label": "Solid"}, {"id": "liquid", "label": "Liquid"}, {"id": "gas", "label": "Gas"}],"items":[{"id": "i1", "text": "Ice cube", "categoryId": "solid"}, {"id": "i2", "text": "Juice", "categoryId": "liquid"}, {"id": "i3", "text": "Steam", "categoryId": "gas"}, {"id": "i4", "text": "Rock", "categoryId": "solid"}],"explanation":null,"created_at":"2026-09-12T15:09:45.807383+00:00"}]') on conflict do nothing;
select setval(pg_get_serial_sequence('public.planets','id'), (select coalesce(max(id),1) from public.planets));
commit;
