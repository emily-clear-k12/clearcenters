-- Mission Map — ELAR batch (12 cases), Sept 23, 2026.
-- Idempotent: safe to run more than once.
--
-- Mission Map case codes are INTERNAL concept numbers, not TEKS codes. The
-- real standard for each one lives in lib/cases/mission-map/teksLabels.js and
-- in lib/cases/TEKS_STANDARDS.md; it is repeated in the comment on each row
-- below so this file can be read on its own.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.13-MM', 'Unlock the Character Clue Door', 'mission_map', 3, 'ELAR'),  -- TEKS 3.7C
  ('3.14-MM', 'Main Idea Treasure Map',         'mission_map', 3, 'ELAR'),  -- TEKS 3.6G
  ('3.15-MM', 'Sequence Story Gate',            'mission_map', 3, 'ELAR'),  -- TEKS 3.8C
  ('3.16-MM', 'Text Feature Code Breaker',      'mission_map', 3, 'ELAR'),  -- TEKS 3.10C
  ('4.14-MM', 'Theme Vault',                    'mission_map', 4, 'ELAR'),  -- TEKS 4.8A
  ('4.15-MM', 'Author''s Choice Labyrinth',     'mission_map', 4, 'ELAR'),  -- TEKS 4.10A
  ('4.16-MM', 'Argument Aim Quest',             'mission_map', 4, 'ELAR'),  -- TEKS 4.9E
  ('4.17-MM', 'Summary Lock Path',              'mission_map', 4, 'ELAR'),  -- TEKS 4.7D
  ('5.13-MM', 'Inference Investigation',        'mission_map', 5, 'ELAR'),  -- TEKS 5.6F
  ('5.14-MM', 'Paired Text Portal',             'mission_map', 5, 'ELAR'),  -- TEKS 5.7B
  ('5.15-MM', 'Theme Evidence Escape',          'mission_map', 5, 'ELAR'),  -- TEKS 5.8A
  ('5.16-MM', 'Author''s Purpose Control Room', 'mission_map', 5, 'ELAR')   -- TEKS 5.10A
ON CONFLICT (standard) DO UPDATE
  SET title = EXCLUDED.title,
      engine = EXCLUDED.engine,
      grade = EXCLUDED.grade,
      subject = EXCLUDED.subject;

-- Check: expect 49 — 13 Science, 12 Social Studies, 12 Math, 12 ELAR.
SELECT subject, count(*) AS n
FROM cases
WHERE engine = 'mission_map'
GROUP BY subject
ORDER BY subject;
