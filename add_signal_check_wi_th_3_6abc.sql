-- Signal Check companions: Weigh-In + Thread for Matter first wave (3.6A/B/C).
-- Mirrors add_mission_map_migration.sql row shape:
--   cases(standard, title, engine, grade, subject)
-- Optional enrichment columns (learning_target / lesson_summary / misconception_note)
-- exist in some live DBs and are left NULL here - assign UI tolerates nulls.
-- Engine must be fact_check_desk so activity/page.js routes to SignalCheckClient.
-- Safe to re-run (ON CONFLICT updates title/engine/grade/subject).

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.6A-SC-WI', 'Magnet Stick-Off', 'fact_check_desk', 3, 'Science'),
  ('3.6A-SC-TH', 'Thread: Every Metal?', 'fact_check_desk', 3, 'Science'),
  ('3.6B-SC-WI', 'Sugar Showdown', 'fact_check_desk', 3, 'Science'),
  ('3.6B-SC-TH', 'Thread: Sugar Is Liquid?', 'fact_check_desk', 3, 'Science'),
  ('3.6C-SC-WI', 'Wet Can Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.6C-SC-TH', 'Thread: Leaky Can?', 'fact_check_desk', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  engine = EXCLUDED.engine,
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- NOTE: 3.6E-SC companions skipped - classic 3.6E-SC is not clean
-- (mismatched shadow tagline vs magnet body; incomplete evidence schema).

-- After running: assign any of the standards above from Teacher -> Assign -> Signal Check.
