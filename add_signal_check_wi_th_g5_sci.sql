-- Signal Check companions: Weigh-In + Thread for Grade 5 Science classics.
-- ALL 5-*-SC classics (non-SS). Skip G3 / G4 / SS.
-- Mirrors add_signal_check_wi_th_g4_sci.sql row shape:
--   cases(standard, title, engine, grade, subject)
-- Engine must be fact_check_desk so activity/page.js routes to SignalCheckClient.
-- Safe to re-run (ON CONFLICT updates title/engine/grade/subject).

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('5.6A-SC-WI', 'Magnet Bin Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.6A-SC-TH', 'Thread: Every Metal?', 'fact_check_desk', 5, 'Science'),
  ('5.6B-SC-WI', 'Mix Pile Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.6B-SC-TH', 'Thread: Brand-New Stuff?', 'fact_check_desk', 5, 'Science'),
  ('5.6C-SC-WI', 'Salt Mass Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.6C-SC-TH', 'Thread: Salt Vanished?', 'fact_check_desk', 5, 'Science'),
  ('5.6D-SC-WI', 'Balloon Air Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.6D-SC-TH', 'Thread: Nothing Inside?', 'fact_check_desk', 5, 'Science'),
  ('5.7A-SC-WI', 'Tug Rope Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.7A-SC-TH', 'Thread: Rope Must Move?', 'fact_check_desk', 5, 'Science'),
  ('5.8A-SC-WI', 'Flashlight Energy Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.8A-SC-TH', 'Thread: Brand-New Light?', 'fact_check_desk', 5, 'Science'),
  ('5.8B-SC-WI', 'Switch Loop Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.8B-SC-TH', 'Thread: Switch Useless?', 'fact_check_desk', 5, 'Science'),
  ('5.8C-SC-WI', 'Straw Bend Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.8C-SC-TH', 'Thread: Straw Bent?', 'fact_check_desk', 5, 'Science'),
  ('5.9-SC-WI', 'Shadow Path Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.9-SC-TH', 'Thread: Random Shadow?', 'fact_check_desk', 5, 'Science'),
  ('5.10A-SC-WI', 'Coast Fog Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.10A-SC-TH', 'Thread: Random Fog?', 'fact_check_desk', 5, 'Science'),
  ('5.10B-SC-WI', 'Mud Rock Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.10B-SC-TH', 'Thread: Rock in a Day?', 'fact_check_desk', 5, 'Science'),
  ('5.10C-SC-WI', 'Canyon Carve Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.10C-SC-TH', 'Thread: Overnight Canyon?', 'fact_check_desk', 5, 'Science'),
  ('5.10D-SC-WI', 'Sit Trait Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.10D-SC-TH', 'Thread: Born Knowing Sit?', 'fact_check_desk', 5, 'Science'),
  ('5.11-SC-WI', 'Faucet Save Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.11-SC-TH', 'Thread: Pointless Shutoff?', 'fact_check_desk', 5, 'Science'),
  ('5.12A-SC-WI', 'Tank Factors Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.12A-SC-TH', 'Thread: Skip Temp & Light?', 'fact_check_desk', 5, 'Science'),
  ('5.12B-SC-WI', 'Feeder Ripple Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.12B-SC-TH', 'Thread: Just the Birds?', 'fact_check_desk', 5, 'Science'),
  ('5.12C-SC-WI', 'Pave Lot Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.12C-SC-TH', 'Thread: Pave = No Impact?', 'fact_check_desk', 5, 'Science'),
  ('5.13A-SC-WI', 'Pond Winter Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.13A-SC-TH', 'Thread: One Winter Plan?', 'fact_check_desk', 5, 'Science'),
  ('5.13B-SC-WI', 'Sit Shake Weigh-In', 'fact_check_desk', 5, 'Science'),
  ('5.13B-SC-TH', 'Thread: Born to Sit?', 'fact_check_desk', 5, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  engine = EXCLUDED.engine,
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- After running: assign any of the standards above from Teacher -> Assign -> Signal Check.
