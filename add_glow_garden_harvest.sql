-- Expedition Station: The Glow Garden Harvest (Grade 3 math, main standard 3.3A).
-- Run this before assigning it. Same pattern as add_expedition_station.sql.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.3A-XP', 'Expedition Station: The Glow Garden Harvest', 'expedition_station', 3, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can show a fraction with pictures, strip diagrams, and number lines. I can find the fraction at a point on a number line.',
  lesson_summary = 'Act 1 station visit on Lumara: four fraction cards in any order, then Challenge 1 (the flickering lanterns). About 15–20 minutes. Autosave after every card. Main standard 3.3A; also practices 3.3B, 3.3C, 3.3D, and 3.7A.',
  misconception_note = 'Watch for students who count tick marks instead of equal spaces on a number line, call unequal pieces "fourths," or flip the top and bottom numbers.'
WHERE standard = 'MA.3.3A-XP';

-- Verify:
-- SELECT standard, title, engine, grade, subject FROM cases WHERE standard = 'MA.3.3A-XP';
