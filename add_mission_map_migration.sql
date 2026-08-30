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
INSERT INTO cases (standard, engine)
VALUES ('3.1-MM', 'mission_map')
ON CONFLICT (standard) DO UPDATE SET engine = EXCLUDED.engine;

-- To actually test this end to end, an `assignments` row also needs
-- `case_standard = '3.1-MM'` pointed at a real class — that's a normal
-- teacher-side assignment action, not part of this migration.
