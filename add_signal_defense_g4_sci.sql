-- Sept 16, 2026 — Signal Ops grade 4 Science banks.
--
-- Run in the Supabase SQL editor when you want these available to teachers.
-- The questions ship in lib/cases/signal-defense/<standard>-SD.public.js;
-- these rows are only what puts the cases in the Challenge Library.
--
-- Until this runs, Signal Ops keeps showing the 22 grade 3 cases and nothing
-- changes for anyone.
--
-- Every standard below is quoted from TEA's adopted grade 4 science TEKS,
-- checked Sept 16 2026 — see each case file's header for the verbatim
-- wording and the action verbs it was authored against.
--
-- NOTE: 4.7A, not "4.7". TEKS_STANDARDS.md used to say 4.7 has no
-- sub-letter; TEA's text has 4.7(A). There is no 4.7B, which is the part
-- that note got right.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('4.6A-SD',  'Signal Defense: Classifying Matter by Physical Properties', 'signal_defense', 4, 'Science'),
  ('4.6B-SD',  'Signal Defense: Mixtures and Solutions',                    'signal_defense', 4, 'Science'),
  ('4.7A-SD',  'Signal Defense: Patterns of Forces',                        'signal_defense', 4, 'Science'),
  ('4.10B-SD', 'Signal Defense: Weathering, Erosion & Deposition',          'signal_defense', 4, 'Science')
ON CONFLICT (standard) DO NOTHING;

-- To remove them again:
-- DELETE FROM cases WHERE standard IN ('4.6A-SD','4.6B-SD','4.7A-SD','4.10B-SD');
