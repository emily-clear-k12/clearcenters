-- Sept 30, 2026: ClearCode (word-reading practice program). Design: claude/ClearCode_Design_v1.md.
-- One progress row per student, plus this week's class words on the class.
-- Safe to run more than once.

CREATE TABLE IF NOT EXISTS clearcode_progress (
  student_id   UUID PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
  class_id     UUID,
  status       TEXT NOT NULL DEFAULT 'scan',      -- scan | scanned | on | off
  scan         JSONB NOT NULL DEFAULT '{}'::jsonb, -- { pending, tested, result, history }
  current_ruin TEXT,
  ruins        JSONB NOT NULL DEFAULT '{}'::jsonb, -- per ruin: chambers, vault tries, passed
  log          JSONB NOT NULL DEFAULT '[]'::jsonb, -- one entry per session
  pass_mark    INT NOT NULL DEFAULT 80,
  chamber      JSONB,                              -- resume point
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Same as relay_station_progress: no policies, so only the server (admin key) reads and writes it.
ALTER TABLE clearcode_progress ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS clearcode_progress_class_idx ON clearcode_progress (class_id);

ALTER TABLE classes ADD COLUMN IF NOT EXISTS clearcode_settings JSONB NOT NULL DEFAULT '{}'::jsonb;

SELECT
  (SELECT count(*) FROM information_schema.tables WHERE table_name = 'clearcode_progress') AS progress_table,
  (SELECT count(*) FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'clearcode_settings') AS class_settings_column;
