-- Sept 22, 2026 — Relay Station Wave 2: Daily Transmission, custom-text modes + Your Turn prompts.
-- Run BEFORE pushing the Wave 2 code. Safe to re-run.

ALTER TABLE relay_station_progress
  ADD COLUMN IF NOT EXISTS daily JSONB;

ALTER TABLE relay_station_custom_texts
  ADD COLUMN IF NOT EXISTS mode TEXT DEFAULT 'choice';
ALTER TABLE relay_station_custom_texts
  ADD COLUMN IF NOT EXISTS compose_prompt TEXT;

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('RS.3.DAILY', 'Relay Station: Daily Transmission', 'relay_station', 3, 'ELAR'),
  ('RS.4.DAILY', 'Relay Station: Daily Transmission', 'relay_station', 4, 'ELAR'),
  ('RS.5.DAILY', 'Relay Station: Daily Transmission', 'relay_station', 5, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can warm up my keyboarding skills every day with accuracy and steady speed.',
  lesson_summary  = 'A short new transmission every school day, the same for the whole class. Students build weekday streaks (weekends never break a streak) and earn crystals. Assign once; it stays on the mission list.'
WHERE standard IN ('RS.3.DAILY', 'RS.4.DAILY', 'RS.5.DAILY');

SELECT
  (SELECT count(*) FROM information_schema.columns WHERE table_name = 'relay_station_progress' AND column_name = 'daily') AS daily_column,
  (SELECT count(*) FROM information_schema.columns WHERE table_name = 'relay_station_custom_texts' AND column_name IN ('mode', 'compose_prompt')) AS custom_text_columns,
  (SELECT count(*) FROM cases WHERE standard ~ '^RS\.[345]\.DAILY$') AS daily_cases;
