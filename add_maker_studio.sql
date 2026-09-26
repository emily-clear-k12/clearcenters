-- Maker Studio Wave 0. Run this in Supabase SQL editor before assigning
-- MS.QUICK-WRITE (Quick Maker · Write).
-- Case codes end in -MS or use the MS.* Quick Maker seed below.
-- Teacher reviews artifacts (NOT AI-graded).

-- 1) Submission payload for Maker Studio pieces
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS maker_studio_data JSONB;

-- 2) Per-assignment Maker config (prompt, modes, finish N, journal toggle)
ALTER TABLE assignments
  ADD COLUMN IF NOT EXISTS maker_studio_config JSONB;

-- 3) Seed Quick Maker (Write). Replaces the old desert exhibit seed.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MS.QUICK-WRITE', 'Maker Studio: Quick Maker (Write)', 'maker_studio', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can write a clear answer to my teacher''s prompt in my own words.',
  lesson_summary = 'Students open Maker Studio, read the prompt, finish Write, then submit when the finish count is met. Teacher reviews the piece — not AI-graded. About 10–15 minutes.',
  misconception_note = 'Wave 0 ships Write only. The other 14 mode buttons show on the student grid but stay quietly disabled.'
WHERE standard = 'MS.QUICK-WRITE';

-- Optional: retire the old exhibit-style seed so it does not appear as Maker.
-- Safe if the row was never created. Leaves Exhibit Hall's own -EX cases alone.
UPDATE cases
SET engine = 'retired_maker_exhibit'
WHERE standard = 'SCI.3.13A-MS'
  AND engine = 'maker_studio';

-- Verify:
-- SELECT standard, title, engine, grade, subject FROM cases
-- WHERE engine = 'maker_studio' OR standard IN ('MS.QUICK-WRITE', 'SCI.3.13A-MS');
--
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'assignments' AND column_name = 'maker_studio_config';
