-- Sept 24, 2026 — Frequency Rush Daily Warm-up (step 6,
-- FrequencyRush_Fluency_Expansion_v1.md §11.10e).
--
-- Only 3 case rows. No new tables or columns: a warm-up answer saves where
-- it came from in frequency_rush_attempts.item_key ("dm|<case>|<key>"), and
-- the streak is worked out from the student's finished warm-up runs.
-- Needs add_frequency_rush_skills.sql first (item_key), which has run.
--
-- The warm-up mixes every subject, so the assign page shows it under EVERY
-- subject tile as the topic "Daily Warm-up". subject is set to 'ELAR' only
-- because the column needs a value.

INSERT INTO cases (standard, title, engine, grade, subject, unit, learning_target, lesson_summary) VALUES
  ('FR.3.DAILY', 'Frequency Rush: Daily Warm-up', 'frequency_rush', 3, 'ELAR', 'daily',
   'I can review what I''ve practiced so I remember it.',
   'Assign once. Every day each student gets 8 questions picked just for them from all their Frequency Rush missions: the ones they missed first, then their lowest scores. Answers count on the Star Chart. +1 crystal a day, +3 every 5 days in a row.'),
  ('FR.4.DAILY', 'Frequency Rush: Daily Warm-up', 'frequency_rush', 4, 'ELAR', 'daily',
   'I can review what I''ve practiced so I remember it.',
   'Assign once. Every day each student gets 8 questions picked just for them from all their Frequency Rush missions: the ones they missed first, then their lowest scores. Answers count on the Star Chart. +1 crystal a day, +3 every 5 days in a row.'),
  ('FR.5.DAILY', 'Frequency Rush: Daily Warm-up', 'frequency_rush', 5, 'ELAR', 'daily',
   'I can review what I''ve practiced so I remember it.',
   'Assign once. Every day each student gets 8 questions picked just for them from all their Frequency Rush missions: the ones they missed first, then their lowest scores. Answers count on the Star Chart. +1 crystal a day, +3 every 5 days in a row.')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject,
  unit = EXCLUDED.unit,
  learning_target = EXCLUDED.learning_target,
  lesson_summary = EXCLUDED.lesson_summary;
