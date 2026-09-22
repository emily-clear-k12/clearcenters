-- Sept 22, 2026 — Relay Station (typing center), v1.
-- Run the whole thing once in the Supabase SQL editor. Safe to re-run.
-- Lessons already ship in code at lib/cases/relay-station/index.js.

-- 1) Where each student's typing results are stored (best run + last run).
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS relay_station_data JSONB;

-- 2) The lessons, so they show up in the Challenge Library.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('RS.3.K01', 'Relay Station: Home Row Home Base',        'relay_station', 3, 'ELAR'),
  ('RS.3.K02', 'Relay Station: Home Row Words',            'relay_station', 3, 'ELAR'),
  ('RS.3.K03', 'Relay Station: Reach Up - E and I',        'relay_station', 3, 'ELAR'),
  ('RS.3.K04', 'Relay Station: Reach Up - R and U',        'relay_station', 3, 'ELAR'),
  ('RS.3.K05', 'Relay Station: Pointer Reach - T, G, Y, H','relay_station', 3, 'ELAR'),
  ('RS.4.K01', 'Relay Station: Home Row Home Base',        'relay_station', 4, 'ELAR'),
  ('RS.4.K02', 'Relay Station: Home Row Words',            'relay_station', 4, 'ELAR'),
  ('RS.4.K03', 'Relay Station: Reach Up - E and I',        'relay_station', 4, 'ELAR'),
  ('RS.4.K04', 'Relay Station: Reach Up - R and U',        'relay_station', 4, 'ELAR'),
  ('RS.4.K05', 'Relay Station: Pointer Reach - T, G, Y, H','relay_station', 4, 'ELAR'),
  ('RS.5.K01', 'Relay Station: Home Row Home Base',        'relay_station', 5, 'ELAR'),
  ('RS.5.K02', 'Relay Station: Home Row Words',            'relay_station', 5, 'ELAR'),
  ('RS.5.K03', 'Relay Station: Reach Up - E and I',        'relay_station', 5, 'ELAR'),
  ('RS.5.K04', 'Relay Station: Reach Up - R and U',        'relay_station', 5, 'ELAR'),
  ('RS.5.K05', 'Relay Station: Pointer Reach - T, G, Y, H','relay_station', 5, 'ELAR'),
  ('RS.3.S01', 'Relay Station: Science Words - Properties of Matter',      'relay_station', 3, 'Science'),
  ('RS.3.P01', 'Relay Station: Paragraph - How Scientists Describe Matter','relay_station', 3, 'Science'),
  ('RS.3.C01', 'Relay Station: Conversation - Ready for Landing',          'relay_station', 3, 'ELAR'),
  ('RS.3.L01', 'Relay Station: Friendly Letter - Thank You for the Telescope','relay_station', 3, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

-- 3) Check it worked — should return 19, and the column query should return 1 row.
SELECT count(*) AS relay_station_lessons FROM cases WHERE engine = 'relay_station';
SELECT column_name FROM information_schema.columns
  WHERE table_name = 'submissions' AND column_name = 'relay_station_data';
