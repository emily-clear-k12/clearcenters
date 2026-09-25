-- Simulation Lab batch 2 (Sept 25 2026): 10 new cases in the animated design.
-- 6 Science + 3 Social Studies + 1 Math (the first Math case in Simulation Lab).
-- Run ONCE in the Supabase SQL Editor BEFORE merging the sl-more-cases PR
-- (ClearCenters_STATE.md §9 rule 16). Safe to run again: every statement is
-- idempotent.
--
-- This REPLACES add_simulation_lab_fill.sql (Sept 11, branch sl-case-fill, never
-- merged). Two of its codes were re-coded after a TEKS check, and one title changed:
--   SS.3.6C-SL  ->  SS.3.6A-SL   (3.6C is cost/profit; the case is supply & demand -> price)
--   SS.4.6B-SL  ->  SS.4.7A-SL   (4.6B is comparing Texas regions; the case is how geography
--                                  influences settlement)
--   4.9A-SL "Morning Shadow Track" -> "Seasons Shadow Track" (4.9A is seasons; daily
--                                  shadows are 5.9, already live)
-- If the old fill SQL was ever run, step 2 removes the two stale rows (only when no
-- assignment points at them).

BEGIN;

-- 1. Case rows (engine decides which center opens; subject drives the Assign filters)
INSERT INTO cases (standard, title, engine, grade, subject)
VALUES
  ('3.7B-SL',     'Motion Path Test',         'simulation_lab', 3, 'Science'),
  ('3.8A-SL',     'Rubber Band Launch',       'simulation_lab', 3, 'Science'),
  ('4.8B-SL',     'Insulation Wrap Test',     'simulation_lab', 4, 'Science'),
  ('4.9A-SL',     'Seasons Shadow Track',     'simulation_lab', 4, 'Science'),
  ('5.6C-SL',     'Particle Dissolve Race',   'simulation_lab', 5, 'Science'),
  ('5.7A-SL',     'Tug Balance Test',         'simulation_lab', 5, 'Science'),
  ('SS.3.6A-SL',  'Market Price Test',        'simulation_lab', 3, 'Social Studies'),
  ('SS.4.7A-SL',  'Settlement Distance Test', 'simulation_lab', 4, 'Social Studies'),
  ('SS.5.11B-SL', 'Supply & Price Test',      'simulation_lab', 5, 'Social Studies'),
  ('MA.5.8C-SL',  'Stacking Cups',            'simulation_lab', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  engine  = EXCLUDED.engine,
  title   = EXCLUDED.title,
  grade   = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- 2. Stale codes from the never-merged Sept 11 fill pack (no-op if absent or assigned)
DELETE FROM cases c
WHERE c.standard IN ('SS.3.6C-SL', 'SS.4.6B-SL')
  AND c.engine = 'simulation_lab'
  AND NOT EXISTS (SELECT 1 FROM assignments a WHERE a.case_standard = c.standard);

-- 3. Teacher-facing learning targets and lesson summaries (Assign page case details)
UPDATE cases SET
  learning_target = 'I can explain how a stronger push changes how far an object moves.',
  lesson_summary  = 'Students set a push machine from 1 to 9 and find each step slides the crate 2 more tiles; on carpet (more friction) every push goes half as far. About 20 minutes.'
WHERE standard = '3.7B-SL';

UPDATE cases SET
  learning_target = 'I can explain how stored energy in a stretched rubber band becomes the mechanical energy of a moving pod.',
  lesson_summary  = 'Students stretch a rubber band 2 to 18 cm and find a farther stretch sends the pod farther; a heavier pod flies a shorter way with the same stretch. About 20 minutes.'
WHERE standard = '3.8A-SL';

UPDATE cases SET
  learning_target = 'I can explain how insulators slow down the flow of heat.',
  lesson_summary  = 'Students wrap a hot mug in 0 to 8 insulation layers and find each layer keeps it hot about 4 minutes longer; a breezy room cools every mug sooner. About 20 minutes.'
WHERE standard = '4.8B-SL';

UPDATE cases SET
  learning_target = 'I can use noon shadows to explain how the Sun''s path changes with the seasons.',
  lesson_summary  = 'Students measure a flagpole''s noon shadow from December to June and find it gets shorter as the summer Sun climbs higher; a taller pole shows the same pattern with longer shadows. About 20 minutes.'
WHERE standard = '4.9A-SL';

UPDATE cases SET
  learning_target = 'I can compare salt before and after it dissolves and show that matter is conserved in a solution.',
  lesson_summary  = 'Students grind salt from big chunks to powder and find finer salt dissolves faster while the scale never changes; colder water slows every grind level. About 20 minutes.'
WHERE standard = '5.6C-SL';

UPDATE cases SET
  learning_target = 'I can explain how balanced and unbalanced forces change an object''s motion.',
  lesson_summary  = 'Students set how much harder one winch pulls; equal pulls hold the cart still and each extra newton rolls it 3 m farther; a heavier cart rolls a shorter way. About 20 minutes.'
WHERE standard = '5.7A-SL';

UPDATE cases SET
  learning_target = 'I can explain how price affects how many people want to buy something (demand).',
  lesson_summary  = 'Students set a fruit-cup price from 50 to 250 cents and count buyers in an hour; each higher price brings fewer buyers, and rain lowers demand at every price. About 20 minutes.'
WHERE standard = 'SS.3.6A-SL';

UPDATE cases SET
  learning_target = 'I can explain how geographic factors like water and land influenced where people settled in Texas.',
  lesson_summary  = 'Students place a town site 1 to 9 miles from a river and find fewer families settle farther from water; rocky land farther out makes the drop steeper. About 20 minutes.'
WHERE standard = 'SS.4.7A-SL';

UPDATE cases SET
  learning_target = 'I can explain how the supply of a product affects its price.',
  lesson_summary  = 'Students choose how many strawberry crates reach the market and find more supply lowers the price; festival-week demand raises the price for every supply. About 20 minutes.'
WHERE standard = 'SS.5.11B-SL';

UPDATE cases SET
  learning_target = 'I can use an input-output table to find a pattern and graph its number pairs.',
  lesson_summary  = 'Students stack 1 to 10 cups, record (cups, height) pairs, and find each cup adds 2 cm (rule: height = 2 x cups + 6); taller cups change the step to 3 cm. About 20 minutes.'
WHERE standard = 'MA.5.8C-SL';

COMMIT;

-- Check (should return 10 rows, all engine = simulation_lab):
-- SELECT standard, title, engine, grade, subject FROM cases
-- WHERE standard IN ('3.7B-SL','3.8A-SL','4.8B-SL','4.9A-SL','5.6C-SL','5.7A-SL',
--                    'SS.3.6A-SL','SS.4.7A-SL','SS.5.11B-SL','MA.5.8C-SL') ORDER BY standard;
