-- Expedition Station: fractions wave 1 (Sept 26, 2026).
-- Adds The Tide Pools (3.3F), The Lava Lock (4.3C), The Robot Rebuild (5.3H),
-- and The Canopy Supply Drop (5.3I). Run once before assigning them.
-- Same pattern as add_expedition_station.sql and add_glow_garden_harvest.sql.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.3F-XP', 'Expedition Station: The Tide Pools', 'expedition_station', 3, 'Math'),
  ('MA.4.3C-XP', 'Expedition Station: The Lava Lock', 'expedition_station', 4, 'Math'),
  ('MA.5.3H-XP', 'Expedition Station: The Robot Rebuild', 'expedition_station', 5, 'Math'),
  ('MA.5.3I-XP', 'Expedition Station: The Canopy Supply Drop', 'expedition_station', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can find fractions that are equal, using pictures and number lines. I can compare fractions that have the same top or bottom number.',
  lesson_summary = 'Act 1 station visit on Cloudreach: four fraction cards in any order, then Challenge 1 (the dry spell). About 15–20 minutes. Main standard 3.3F; also practices 3.3G and 3.3H.',
  misconception_note = 'Watch for students who change only the bottom number to make an equivalent fraction, or who think 1/8 is more than 1/4 because 8 is bigger.'
WHERE standard = 'MA.3.3F-XP';

UPDATE cases SET
  learning_target = 'I can tell if two fractions are equal by using a number line or by multiplying the top and bottom by the same number. I can compare fractions with different tops and bottoms.',
  lesson_summary = 'Act 1 station visit on Cindara: four fraction cards in any order, then Challenge 1 (the lava rises). About 15–20 minutes. Main standard 4.3C; also practices 4.3D and 4.3G.',
  misconception_note = 'Watch for students who add the same number to the top and bottom to make an equivalent fraction, or who change only the bottom number.'
WHERE standard = 'MA.4.3C-XP';

UPDATE cases SET
  learning_target = 'I can add and subtract fractions with different bottom numbers by making equal-size pieces first. I can estimate to check if my answer makes sense.',
  lesson_summary = 'Act 1 station visit on Mechara: four fraction cards in any order, then Challenge 1 (the power surge). About 15–20 minutes. Main standard 5.3H; also practices 5.3K and 5.3A.',
  misconception_note = 'Watch for students who add or subtract the tops and the bottoms (1/2 + 1/3 = 2/5), or who rename only one fraction.'
WHERE standard = 'MA.5.3H-XP';

UPDATE cases SET
  learning_target = 'I can multiply a whole number by a fraction using pictures and area models. I can divide a unit fraction by a whole number, and a whole number by a unit fraction.',
  lesson_summary = 'Act 1 station visit on Solara: four fraction cards in any order, then Challenge 1 (the storm tarps). About 15–20 minutes. Main standard 5.3I; also practices 5.3J and 5.3L.',
  misconception_note = 'Watch for students who multiply the bottom number too (4 × 2/3 = 8/12), or who think dividing always makes a number smaller (4 ÷ 1/2 = 2).'
WHERE standard = 'MA.5.3I-XP';

-- Verify:
-- SELECT standard, title, engine, grade, subject FROM cases WHERE standard LIKE '%-XP' ORDER BY grade, standard;
