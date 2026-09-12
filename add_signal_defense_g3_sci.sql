-- Signal Defense (Signal Ops) cases: Grade 3 Science question banks.
-- Registers all 22 authored banks under lib/cases/signal-defense/*-SD.public.js
-- so they appear in Teacher -> Assign -> Signal Ops when grade=3, subject=Science.
-- Mirrors add_signal_check_wi_th_*.sql / add_mission_map_*.sql row shape:
--   cases(standard, title, engine, grade, subject)
-- Engine must be signal_defense so Assign matchesChallenge() and
-- activity/page.js route to SignalDefenseClient.
-- Safe to re-run (ON CONFLICT updates title/engine/grade/subject).

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.6A-SD', 'Signal Defense: Physical Properties of Matter', 'signal_defense', 3, 'Science'),
  ('3.6B-SD', 'Signal Defense: States of Matter', 'signal_defense', 3, 'Science'),
  ('3.6C-SD', 'Signal Defense: Changes of State', 'signal_defense', 3, 'Science'),
  ('3.6D-SD', 'Signal Defense: Matter & Material Properties', 'signal_defense', 3, 'Science'),
  ('3.7A-SD', 'Signal Defense: Types of Forces', 'signal_defense', 3, 'Science'),
  ('3.7B-SD', 'Signal Defense: Forces and Motion', 'signal_defense', 3, 'Science'),
  ('3.8A-SD', 'Signal Defense: Forms of Energy', 'signal_defense', 3, 'Science'),
  ('3.8B-SD', 'Signal Defense: Mechanical Energy', 'signal_defense', 3, 'Science'),
  ('3.9A-SD', 'Signal Defense: Earth''s Rotation (Day & Night)', 'signal_defense', 3, 'Science'),
  ('3.9B-SD', 'Signal Defense: The Solar System', 'signal_defense', 3, 'Science'),
  ('3.10A-SD', 'Signal Defense: Weather Tools & Measurement', 'signal_defense', 3, 'Science'),
  ('3.10B-SD', 'Signal Defense: Soil Composition', 'signal_defense', 3, 'Science'),
  ('3.10C-SD', 'Signal Defense: Changes to Earth''s Surface', 'signal_defense', 3, 'Science'),
  ('3.11A-SD', 'Signal Defense: Natural Resources', 'signal_defense', 3, 'Science'),
  ('3.11B-SD', 'Signal Defense: Conserving Natural Resources', 'signal_defense', 3, 'Science'),
  ('3.11C-SD', 'Signal Defense: Reduce, Reuse, Recycle', 'signal_defense', 3, 'Science'),
  ('3.12A-SD', 'Signal Defense: Animal Behaviors & Adaptation', 'signal_defense', 3, 'Science'),
  ('3.12B-SD', 'Signal Defense: Food Chains & Energy Flow', 'signal_defense', 3, 'Science'),
  ('3.12C-SD', 'Signal Defense: Environmental Changes', 'signal_defense', 3, 'Science'),
  ('3.12D-SD', 'Signal Defense: Fossils as Evidence', 'signal_defense', 3, 'Science'),
  ('3.13A-SD', 'Signal Defense: External Structures & Survival', 'signal_defense', 3, 'Science'),
  ('3.13B-SD', 'Signal Defense: Life Cycles', 'signal_defense', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  engine = EXCLUDED.engine,
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- After running in Supabase SQL Editor:
-- Teacher -> Assign -> Signal Ops -> 3rd Grade -> Science
-- should list all 22 cases above. Assign UI defaults to 5th grade, so
-- switch to 3rd Grade or the list will look empty.