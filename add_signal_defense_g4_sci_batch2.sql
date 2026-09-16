-- Sept 16, 2026 — Signal Ops grade 4 Science, second batch.
--
-- Run in the Supabase SQL editor when you want these in the Challenge
-- Library. Questions already ship in lib/cases/signal-defense/.
-- Standards quoted from TEA's adopted grade 4 science TEKS; each case file
-- header carries the verbatim wording and the action verbs it was built on.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('4.6C-SD', 'Signal Defense: Conservation of Matter in Mixtures',   'signal_defense', 4, 'Science'),
  ('4.8A-SD', 'Signal Defense: Transfer of Energy',                   'signal_defense', 4, 'Science'),
  ('4.8B-SD', 'Signal Defense: Conductors and Insulators',            'signal_defense', 4, 'Science'),
  ('4.8C-SD', 'Signal Defense: Electrical Energy in a Closed Path',   'signal_defense', 4, 'Science')
ON CONFLICT (standard) DO NOTHING;

-- To remove them again:
-- DELETE FROM cases WHERE standard IN ('4.6C-SD','4.8A-SD','4.8B-SD','4.8C-SD');
