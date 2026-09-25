-- Maker Studio Wave-1. Run this in Supabase SQL editor before assigning
-- SCI.3.13A-MS (Built for the Desert).
-- Case codes end in -MS. Exhibit Hall already uses -EX.

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS maker_studio_data JSONB;

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.3.13A-MS', 'Maker Studio: Built for the Desert', 'maker_studio', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can choose body-part evidence that proves how animals survive in the desert, and leave out a myth or a wrong place.',
  lesson_summary = 'Students pick a hall, curate 4 pieces from a storage room of 9, reject one on purpose, write placards and a plaque. About 20 minutes.',
  misconception_note = 'Camels store water in their humps (false - humps store fat).'
WHERE standard = 'SCI.3.13A-MS';

-- Verify the row is present (run in Supabase SQL editor):
-- SELECT standard, title, engine, grade, subject FROM cases WHERE engine = 'maker_studio' OR standard = 'SCI.3.13A-MS';
