-- Sept 22, 2026 — Relay Station v4: custom texts, placement check, new readings.
-- Safe to run more than once. Run AFTER add_relay_station_migration.sql.

-- 1) Placement Check result on each student's track progress.
ALTER TABLE relay_station_progress
  ADD COLUMN IF NOT EXISTS placement JSONB;

-- 2) Teacher custom texts. Each one also gets a row in `cases` (engine
--    relay_station, code RS.C.<teacher>.<id>) so it can be assigned.
CREATE TABLE IF NOT EXISTS relay_station_custom_texts (
  standard   TEXT PRIMARY KEY REFERENCES cases(standard) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  grade      INT NOT NULL,
  subject    TEXT NOT NULL DEFAULT 'ELAR',
  kind       TEXT NOT NULL DEFAULT 'paragraph',
  intro      TEXT,
  text       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE relay_station_custom_texts ENABLE ROW LEVEL SECURITY;

-- 3) Five new grade-level readings.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('RS.3.P02', 'Relay Station: Paragraph - Earn, Spend, Save, Donate',           'relay_station', 3, 'Social Studies'),
  ('RS.4.P01', 'Relay Station: Paragraph - The Sun Powers the Water Cycle',      'relay_station', 4, 'Science'),
  ('RS.4.P02', 'Relay Station: Paragraph - The Four Regions of Texas',           'relay_station', 4, 'Social Studies'),
  ('RS.5.P01', 'Relay Station: Paragraph - Day, Night, and Shadows',             'relay_station', 5, 'Science'),
  ('RS.5.P02', 'Relay Station: Paragraph - No Taxation Without Representation',  'relay_station', 5, 'Social Studies')
ON CONFLICT (standard) DO NOTHING;

-- 4) Teacher-facing description for the Foundations Track (shows in the
--    Challenge Library side panel).
UPDATE cases SET
  learning_target = 'I can use proper touch keyboarding with correct hand and body position, building accuracy first and then speed.',
  lesson_summary  = '20 levels from home row to capitals, punctuation, numbers, and layout. Students move up automatically (90% accuracy for levels 1-10, 95% for 11-15, 100% for 16-20). New students can take a one-time Placement Check to skip ahead.'
WHERE standard IN ('RS.3.TRACK', 'RS.4.TRACK', 'RS.5.TRACK');

-- 5) Check: should show 16 lessons, 1 custom-text table, 1 placement column.
SELECT
  (SELECT count(*) FROM cases WHERE engine = 'relay_station' AND standard !~ '^RS\.C\.') AS relay_station_lessons,
  (SELECT count(*) FROM information_schema.tables WHERE table_name = 'relay_station_custom_texts') AS custom_text_table,
  (SELECT count(*) FROM information_schema.columns WHERE table_name = 'relay_station_progress' AND column_name = 'placement') AS placement_column;
