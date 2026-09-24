-- Frequency Rush custom word lists (Sept 24, 2026; FrequencyRush_Fluency_Expansion_v1.md step 3).
-- Teachers type or upload words with definitions on the Word Lists page; the site
-- makes the wrong spellings. Run BEFORE pushing the Word Lists code. Safe to re-run.

CREATE TABLE IF NOT EXISTS frequency_rush_custom_lists (
  standard          TEXT PRIMARY KEY,               -- FR.C.<teacher8>.<id>, same code as the cases row
  teacher_id        UUID NOT NULL,
  title             TEXT NOT NULL,
  grade             INT  NOT NULL CHECK (grade BETWEEN 3 AND 5),
  subject           TEXT NOT NULL DEFAULT 'ELAR',
  words             JSONB NOT NULL,                  -- [{ word, definition, misspellings: [..3] }]
  include_meaning   BOOLEAN NOT NULL DEFAULT TRUE,
  include_spelling  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS frequency_rush_custom_lists_teacher_idx
  ON frequency_rush_custom_lists (teacher_id);

-- Only the server (service role) reads and writes this table. With RLS on and
-- no policies, the browser key can't read other teachers' lists.
ALTER TABLE frequency_rush_custom_lists ENABLE ROW LEVEL SECURITY;

SELECT count(*) AS word_list_table_ready
FROM information_schema.tables WHERE table_name = 'frequency_rush_custom_lists';
