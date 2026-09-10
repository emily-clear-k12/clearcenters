-- Briefings pilot — Option A parallel tables (NOT cases / Challenge Library).
-- Paste into Supabase SQL Editor and Run. Safe to re-run (IF NOT EXISTS / ON CONFLICT).
--
-- Product rules (locked 2026-09-10):
--   - Separate Briefings shelf from My Missions / Challenge Library
--   - Seed pilot only: SS-3-2A-BR Why Communities Form
--   - related_challenge_ids stays empty (no auto-unlock Challenges)
--
-- After this migration, teachers assign via /teacher/assign/briefing
-- (writes briefing_assignments + briefing_assignment_students). Students
-- open Briefings from Home → My Briefings → /briefings, never My Missions.

CREATE TABLE IF NOT EXISTS briefings (
  id text PRIMARY KEY,
  title text NOT NULL,
  tagline text,
  subject text NOT NULL DEFAULT 'social_studies',
  grade int NOT NULL,
  teks text,
  minutes int,
  related_challenge_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  engine text NOT NULL DEFAULT 'briefing',
  published boolean NOT NULL DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS briefing_assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id uuid REFERENCES classes(id),
  briefing_id text REFERENCES briefings(id),
  due_date date,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS briefing_assignment_students (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id uuid REFERENCES briefing_assignments(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS briefing_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id uuid REFERENCES briefing_assignments(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  phase_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'in_progress',
  cleared_at timestamp,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE (assignment_id, student_id)
);

-- Teacher RLS (students go through server admin routes, same as submissions).
ALTER TABLE briefing_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE briefing_assignment_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE briefing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE briefings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Teachers can view briefings catalog"
  ON briefings FOR SELECT
  USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Teachers can view briefing assignments for their classes"
  ON briefing_assignments FOR SELECT
  USING (
    class_id IN (
      SELECT c.id FROM classes c WHERE c.teacher_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Teachers can insert briefing assignments for their classes"
  ON briefing_assignments FOR INSERT
  WITH CHECK (
    class_id IN (
      SELECT c.id FROM classes c WHERE c.teacher_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Teachers can delete briefing assignments for their classes"
  ON briefing_assignments FOR DELETE
  USING (
    class_id IN (
      SELECT c.id FROM classes c WHERE c.teacher_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Teachers can view briefing targeting for their classes"
  ON briefing_assignment_students FOR SELECT
  USING (
    assignment_id IN (
      SELECT ba.id FROM briefing_assignments ba
      JOIN classes c ON c.id = ba.class_id
      WHERE c.teacher_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Teachers can target students on briefing assignments"
  ON briefing_assignment_students FOR INSERT
  WITH CHECK (
    assignment_id IN (
      SELECT ba.id FROM briefing_assignments ba
      JOIN classes c ON c.id = ba.class_id
      WHERE c.teacher_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Teachers can view briefing submissions for their classes"
  ON briefing_submissions FOR SELECT
  USING (
    assignment_id IN (
      SELECT ba.id FROM briefing_assignments ba
      JOIN classes c ON c.id = ba.class_id
      WHERE c.teacher_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Teachers can update briefing submissions for their classes"
  ON briefing_submissions FOR UPDATE
  USING (
    assignment_id IN (
      SELECT ba.id FROM briefing_assignments ba
      JOIN classes c ON c.id = ba.class_id
      WHERE c.teacher_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

INSERT INTO briefings (
  id, title, tagline, subject, grade, teks, minutes,
  related_challenge_ids, engine, published
)
VALUES (
  'SS-3-2A-BR',
  'Why Communities Form',
  'HQ needs to know: why do people live together in the first place?',
  'social_studies',
  3,
  '3.2A',
  40,
  '[]'::jsonb,
  'briefing',
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  subject = EXCLUDED.subject,
  grade = EXCLUDED.grade,
  teks = EXCLUDED.teks,
  minutes = EXCLUDED.minutes,
  related_challenge_ids = EXCLUDED.related_challenge_ids,
  engine = EXCLUDED.engine,
  published = EXCLUDED.published;

-- Assign via /teacher/assign/briefing after this migration lands.
