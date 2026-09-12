-- Signal Check companions: Weigh-In + Thread for Grade 3 Science batch 2.
-- Remaining classics after Matter 3.6A/B/C (already shipped).
-- SKIP: 3.6E (messy classic). DO NOT include FR/SS cases.
-- Mirrors add_signal_check_wi_th_3_6abc.sql row shape:
--   cases(standard, title, engine, grade, subject)
-- Engine must be fact_check_desk so activity/page.js routes to SignalCheckClient.
-- Safe to re-run (ON CONFLICT updates title/engine/grade/subject).

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.10A-SC-WI', 'Forecast Fight', 'fact_check_desk', 3, 'Science'),
  ('3.10A-SC-TH', 'Thread: Just Guessing?', 'fact_check_desk', 3, 'Science'),
  ('3.10B-SC-WI', 'Dirt Debate', 'fact_check_desk', 3, 'Science'),
  ('3.10B-SC-TH', 'Thread: Just Dirt?', 'fact_check_desk', 3, 'Science'),
  ('3.10C-SC-WI', 'Bank Change Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.10C-SC-TH', 'Thread: Overnight Change?', 'fact_check_desk', 3, 'Science'),
  ('3.11B-SC-WI', 'Water Tank Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.11B-SC-TH', 'Thread: Unlimited Water?', 'fact_check_desk', 3, 'Science'),
  ('3.12A-SC-WI', 'Winter Vanish Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.12A-SC-TH', 'Thread: Die Till Spring?', 'fact_check_desk', 3, 'Science'),
  ('3.12B-SC-WI', 'Frog Drop Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.12B-SC-TH', 'Thread: Pond Stays Same?', 'fact_check_desk', 3, 'Science'),
  ('3.12C-SC-WI', 'Flood Pond Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.12C-SC-TH', 'Thread: Pond Ruined?', 'fact_check_desk', 3, 'Science'),
  ('3.12D-SC-WI', 'Rock Shape Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.12D-SC-TH', 'Thread: Someone Carved It?', 'fact_check_desk', 3, 'Science'),
  ('3.13A-SC-WI', 'Claw Clash', 'fact_check_desk', 3, 'Science'),
  ('3.13A-SC-TH', 'Thread: Worse Legs?', 'fact_check_desk', 3, 'Science'),
  ('3.13B-SC-WI', 'Bug Twin Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.13B-SC-TH', 'Thread: Two Different Bugs?', 'fact_check_desk', 3, 'Science'),
  ('3.7A-SC-WI', 'Filter Fall Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.7A-SC-TH', 'Thread: Gravity Skips Light?', 'fact_check_desk', 3, 'Science'),
  ('3.7B-SC-WI', 'Hard Hit Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.7B-SC-TH', 'Thread: Hit Harder Wins?', 'fact_check_desk', 3, 'Science'),
  ('3.8A-SC-WI', 'Plug-Only Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.8A-SC-TH', 'Thread: Needs a Plug?', 'fact_check_desk', 3, 'Science'),
  ('3.8B-SC-WI', 'Heavy Ball Weigh-In', 'fact_check_desk', 3, 'Science'),
  ('3.8B-SC-TH', 'Thread: Need a Heavy Ball?', 'fact_check_desk', 3, 'Science'),
  ('3.9B-SC-WI', 'Biggest Closest?', 'fact_check_desk', 3, 'Science'),
  ('3.9B-SC-TH', 'Thread: Biggest Goes First?', 'fact_check_desk', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  engine = EXCLUDED.engine,
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- After running: assign any of the standards above from Teacher -> Assign -> Signal Check.
