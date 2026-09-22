-- Sept 22, 2026 — Relay Station (typing center), v2 with the Foundations Track.
-- Run the whole thing once in the Supabase SQL editor. Safe to re-run.
-- Lessons ship in code at lib/cases/relay-station/index.js.

-- 1) Reading results (best run + last run) on the normal submissions row.
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS relay_station_data JSONB;

-- 2) Foundations Track progress: ONE row per student (not per assignment),
--    so a student's level carries over if the track is re-assigned.
CREATE TABLE IF NOT EXISTS relay_station_progress (
  student_id    UUID PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
  current_level INT NOT NULL DEFAULT 1,
  level_results JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed_at  TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ DEFAULT now()
);
-- Locked down: students and teachers reach it only through server routes.
ALTER TABLE relay_station_progress ENABLE ROW LEVEL SECURITY;

-- 3) Clean up the v1 single key lessons (replaced by the track). Only
--    removes ones that were never assigned.
DELETE FROM cases c
WHERE c.standard ~ '^RS\.[345]\.K0[1-5]$'
  AND NOT EXISTS (SELECT 1 FROM assignments a WHERE a.case_standard = c.standard);

-- 4) The lessons, so they show up in the Challenge Library.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('RS.3.TRACK', 'Relay Station: Typing Foundations Track', 'relay_station', 3, 'ELAR'),
  ('RS.4.TRACK', 'Relay Station: Typing Foundations Track', 'relay_station', 4, 'ELAR'),
  ('RS.5.TRACK', 'Relay Station: Typing Foundations Track', 'relay_station', 5, 'ELAR'),
  ('RS.3.S01', 'Relay Station: Science Words - Properties of Matter',       'relay_station', 3, 'Science'),
  ('RS.3.P01', 'Relay Station: Paragraph - How Scientists Describe Matter', 'relay_station', 3, 'Science'),
  ('RS.3.C01', 'Relay Station: Conversation - Ready for Landing',           'relay_station', 3, 'ELAR'),
  ('RS.3.L01', 'Relay Station: Friendly Letter - Thank You for the Telescope', 'relay_station', 3, 'ELAR'),
  ('RS.4.C01', 'Relay Station: Dialogue - The Broken Rover',                'relay_station', 4, 'ELAR'),
  ('RS.4.L01', 'Relay Station: Letter - Requesting Information',            'relay_station', 4, 'ELAR'),
  ('RS.5.C01', 'Relay Station: Dialogue - Signal Lost',                     'relay_station', 5, 'ELAR'),
  ('RS.5.L01', 'Relay Station: Letter - Requesting Information',            'relay_station', 5, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

-- 5) Check it worked: should show 11 lessons and 1 progress table.
SELECT
  (SELECT count(*) FROM cases WHERE engine = 'relay_station' AND standard !~ '^RS\.[345]\.K0') AS relay_station_lessons,
  (SELECT count(*) FROM information_schema.tables WHERE table_name = 'relay_station_progress') AS progress_table;
