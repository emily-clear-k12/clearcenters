-- Mission Map — small, required schema addition.
-- Mirrors exactly what Signal Check needed: one new nullable JSONB column
-- on `submissions` to hold Mission Map's own structured data, parallel to
-- Signal Check's `signal_data` column. Nothing else about `submissions`
-- changes — `attempt2`, `checklist`, `ai_score`, `ai_rationale`,
-- `submitted_at`, `revision_requested` are all already shared columns every
-- engine writes to.

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS mission_map_data JSONB;

-- Seed the one case authored so far ("Rescue the Pollination Path") so the
-- app actually routes it to Mission Map's engine instead of falling back to
-- Group Chat. Without a matching row here, `page.js`'s lookup on `cases`
-- finds nothing and defaults `engine` to "group_chat".
--
-- title, grade, and subject are included because `cases.title` is NOT NULL
-- in the real schema (caught by checking supabase_schema.sql directly
-- before handing this off, rather than assuming the earlier draft of this
-- file — which only set standard/engine — would have run cleanly).
INSERT INTO cases (standard, title, engine, grade, subject)
VALUES ('3.1-MM', 'Rescue the Pollination Path', 'mission_map', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  engine = EXCLUDED.engine,
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- To actually test this end to end, an `assignments` row also needs
-- `case_standard = '3.1-MM'` pointed at a real class — that's a normal
-- teacher-side assignment action, not part of this migration.
