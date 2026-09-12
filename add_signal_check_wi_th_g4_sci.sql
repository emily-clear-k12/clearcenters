-- Signal Check companions: Weigh-In + Thread for Grade 4 Science classics.
-- ALL 4-*-SC classics (non-SS). Skip G3 / G5 / SS.
-- Mirrors add_signal_check_wi_th_g3_sci_batch2.sql row shape:
--   cases(standard, title, engine, grade, subject)
-- Engine must be fact_check_desk so activity/page.js routes to SignalCheckClient.
-- Safe to re-run (ON CONFLICT updates title/engine/grade/subject).

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('4.6B-SC-WI', 'Oil Mix Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.6B-SC-TH', 'Thread: One New Liquid?', 'fact_check_desk', 4, 'Science'),
  ('4.6C-SC-WI', 'Volume Vanish Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.6C-SC-TH', 'Thread: Something Spilled?', 'fact_check_desk', 4, 'Science'),
  ('4.7-SC-WI', 'Cart Roll Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.7-SC-TH', 'Thread: Moved by Itself?', 'fact_check_desk', 4, 'Science'),
  ('4.7B-SC-WI', 'Bank Rocks Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.7B-SC-TH', 'Thread: Brand-New Rocks?', 'fact_check_desk', 4, 'Science'),
  ('4.8A-SC-WI', 'Bell Jump Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.8A-SC-TH', 'Thread: Energy Skips?', 'fact_check_desk', 4, 'Science'),
  ('4.8B-SC-WI', 'Towel Cold Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.8B-SC-TH', 'Thread: Towel Makes Cold?', 'fact_check_desk', 4, 'Science'),
  ('4.8C-SC-WI', 'First Bulb Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.8C-SC-TH', 'Thread: Power Used Up?', 'fact_check_desk', 4, 'Science'),
  ('4.9A-SC-WI', 'Sunset Cold Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.9A-SC-TH', 'Thread: Cold Causes Sunset?', 'fact_check_desk', 4, 'Science'),
  ('4.9B-SC-WI', 'Moon Size Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.9B-SC-TH', 'Thread: Moon Shrinks?', 'fact_check_desk', 4, 'Science'),
  ('4.10A-SC-WI', 'Puddle Gone Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.10A-SC-TH', 'Thread: Water Gone Forever?', 'fact_check_desk', 4, 'Science'),
  ('4.10B-SC-WI', 'Sediment Move Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.10B-SC-TH', 'Thread: New Rocks Appear?', 'fact_check_desk', 4, 'Science'),
  ('4.11A-SC-WI', 'Turbine Every Day?', 'fact_check_desk', 4, 'Science'),
  ('4.11A-SC-TH', 'Thread: Power Every Day?', 'fact_check_desk', 4, 'Science'),
  ('4.11B-SC-WI', 'One Battery Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.11B-SC-TH', 'Thread: Just One Battery?', 'fact_check_desk', 4, 'Science'),
  ('4.11C-SC-WI', 'Rock Water Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.11C-SC-TH', 'Thread: Solid Rock Only?', 'fact_check_desk', 4, 'Science'),
  ('4.12A-SC-WI', 'Plant Soil Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.12A-SC-TH', 'Thread: Plants Eat Dirt?', 'fact_check_desk', 4, 'Science'),
  ('4.12B-SC-WI', 'Decomposer Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.12B-SC-TH', 'Thread: Just Tidying?', 'fact_check_desk', 4, 'Science'),
  ('4.12C-SC-WI', 'Hilltop Shell Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.12C-SC-TH', 'Thread: Dropped Shell?', 'fact_check_desk', 4, 'Science'),
  ('4.13A-SC-WI', 'Waxy Leaf Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.13A-SC-TH', 'Thread: Wax Does Nothing?', 'fact_check_desk', 4, 'Science'),
  ('4.13B-SC-WI', 'Scar Trait Weigh-In', 'fact_check_desk', 4, 'Science'),
  ('4.13B-SC-TH', 'Thread: Same Scar?', 'fact_check_desk', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  engine = EXCLUDED.engine,
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- After running: assign any of the standards above from Teacher -> Assign -> Signal Check.
