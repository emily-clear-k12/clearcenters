-- Sept 16, 2026 — Signal Ops, first grade 4 bank (pilot).
--
-- Run this in the Supabase SQL editor only if you want to try 4.10B with a
-- class. It adds the one row the Challenge Library needs to offer this case;
-- the questions themselves already ship in
-- lib/cases/signal-defense/4-10B-SD.public.js.
--
-- Until this runs, Signal Ops keeps showing only the 22 grade 3 cases and
-- nothing changes for anyone.
--
-- Standard 4.10B (Weathering, Erosion & Deposition) is verified in
-- lib/cases/TEKS_STANDARDS.md — Signal Check's 4.10B-SC uses the same root.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('4.10B-SD', 'Signal Defense: Weathering, Erosion & Deposition', 'signal_defense', 4, 'Science')
ON CONFLICT (standard) DO NOTHING;

-- To remove it again:
-- DELETE FROM cases WHERE standard = '4.10B-SD';
