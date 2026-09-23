-- Mission Map — Math batch (12 cases), Sept 22, 2026.
-- Idempotent: safe to run more than once.
--
-- Mission Map case codes are INTERNAL concept numbers, not TEKS codes. The
-- real standard for each one lives in lib/cases/mission-map/teksLabels.js and
-- in lib/cases/TEKS_STANDARDS.md; it is repeated in the comment on each row
-- below so this file can be read on its own.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.9-MM',  'Open the Perimeter Gate',       'mission_map', 3, 'Math'),  -- TEKS 3.7B
  ('3.10-MM', 'Array Door Challenge',          'mission_map', 3, 'Math'),  -- TEKS 3.4D
  ('3.11-MM', 'Fraction Path Unlock',          'mission_map', 3, 'Math'),  -- TEKS 3.7A
  ('3.12-MM', 'Data Clue Trail',               'mission_map', 3, 'Math'),  -- TEKS 3.8B
  ('4.10-MM', 'Fraction Comparison Castle',    'mission_map', 4, 'Math'),  -- TEKS 4.3D
  ('4.11-MM', 'Area and Perimeter Labyrinth',  'mission_map', 4, 'Math'),  -- TEKS 4.5D
  ('4.12-MM', 'Decimal Tenths Treasure',       'mission_map', 4, 'Math'),  -- TEKS 4.2B
  ('4.13-MM', 'Operation Key Quest',           'mission_map', 4, 'Math'),  -- TEKS 4.5A
  ('5.9-MM',  'Decimal Dungeon Escape',        'mission_map', 5, 'Math'),  -- TEKS 5.2B
  ('5.10-MM', 'Volume Vault',                  'mission_map', 5, 'Math'),  -- TEKS 5.6B
  ('5.11-MM', 'Graph Scale Escape',            'mission_map', 5, 'Math'),  -- TEKS 5.9C
  ('5.12-MM', 'Fraction Recipe Quest',         'mission_map', 5, 'Math')   -- TEKS 5.3H
ON CONFLICT (standard) DO UPDATE
  SET title = EXCLUDED.title,
      engine = EXCLUDED.engine,
      grade = EXCLUDED.grade,
      subject = EXCLUDED.subject;

-- Check: expect 12 rows, and mission_map_math = 12.
SELECT count(*) AS mission_map_math
FROM cases
WHERE engine = 'mission_map' AND subject = 'Math';

-- Check: expect 37 — 13 Science, 12 Social Studies, 12 Math.
SELECT subject, count(*) AS n
FROM cases
WHERE engine = 'mission_map'
GROUP BY subject
ORDER BY subject;
