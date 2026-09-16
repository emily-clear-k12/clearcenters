-- Sept 16, 2026 — Signal Ops grade 4 Science, third batch.
--
-- Run in the Supabase SQL editor when you want these in the Challenge
-- Library. Questions already ship in lib/cases/signal-defense/.
-- Standards quoted from TEA's adopted grade 4 science TEKS; each case file
-- header carries the verbatim wording and the verbs it was built on.
--
-- Note: TEA's 2024-2025 grade 5 STAAR comparison lists 4.10C among the
-- standards assessed on the GRADE 5 test, so that bank doubles as grade 5
-- review.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('4.9A-SD',  'Signal Defense: Patterns of Change in Seasons',  'signal_defense', 4, 'Science'),
  ('4.9B-SD',  'Signal Defense: Patterns of Change in the Moon', 'signal_defense', 4, 'Science'),
  ('4.10A-SD', 'Signal Defense: The Water Cycle',                'signal_defense', 4, 'Science'),
  ('4.10C-SD', 'Signal Defense: Weather vs. Climate',            'signal_defense', 4, 'Science')
ON CONFLICT (standard) DO NOTHING;

-- To remove them again:
-- DELETE FROM cases WHERE standard IN ('4.9A-SD','4.9B-SD','4.10A-SD','4.10C-SD');
