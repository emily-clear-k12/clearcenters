-- Classification Lab v1 - schema bits + pilot case seed (3.6B-CL)
-- Paste into Supabase SQL Editor and Run. Do NOT skip the ALTER lines -
-- Assign pacing + submission JSON need these columns.
-- Apostrophes in text are doubled for SQL safety.

-- 1) Assignment pacing (Steady vs Timed Belt). Teacher Assign writes
--    pacing_mode = 'steady' | 'timed'. Without this column, assign insert
--    that includes pacing_mode will fail.
ALTER TABLE assignments
  ADD COLUMN IF NOT EXISTS pacing_mode text;

-- 2) Engine-specific submission payload (parallel to mission_map_data /
--    simulation_lab_data pattern).
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS classification_lab_data JSONB;

-- 3) Pilot case row - engine must be classification_lab so activity/page.js
--    routes to ClassificationLabClient.
INSERT INTO cases (
  standard,
  title,
  grade,
  subject,
  engine,
  learning_target,
  lesson_summary,
  misconception_note
) VALUES (
  '3.6B-CL',
  'Solid, Liquid, or Gas?',
  3,
  'Science',
  'classification_lab',
  'Describe and classify matter as solid, liquid, or gas using shape and how it fills a container.',
  'Students sort a stream of everyday items into Solid, Liquid, and Gas bins using a clear rule, justify one Flag item (dry ice chunk with fog) in writing, then classify a Mystery Sample (sealed bag of air) after quick Yes/No checks.',
  'Students often call dry ice + fog a gas because of the fog, or call sand/play-dough a liquid because they can be poured or squished. Push the rule: solids keep their own shape; liquids pour and take the container''s shape; gases spread out and fill the whole container. Fog around dry ice is separate from the solid chunk.'
)
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject,
  engine = EXCLUDED.engine,
  learning_target = EXCLUDED.learning_target,
  lesson_summary = EXCLUDED.lesson_summary,
  misconception_note = EXCLUDED.misconception_note;
