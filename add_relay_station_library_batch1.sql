-- Sept 22, 2026 — Relay Station reading library, batch 1: Science + Cadet Logs (24 readings).
-- Safe to re-run. Text ships in lib/cases/relay-station/index.js.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('RS.3.SCI01', 'Relay Station: Science (Launch) - States of Matter', 'relay_station', 3, 'Science'),
  ('RS.3.SCI02', 'Relay Station: Science (Cruise) - The Order of the Planets', 'relay_station', 3, 'Science'),
  ('RS.3.SCI03', 'Relay Station: Science (Cruise) - A Pond Food Chain', 'relay_station', 3, 'Science'),
  ('RS.3.SCI04', 'Relay Station: Science (Orbit) - Fast Changes to Earth''s Surface', 'relay_station', 3, 'Science'),
  ('RS.4.SCI01', 'Relay Station: Science (Launch) - Conductors and Insulators', 'relay_station', 4, 'Science'),
  ('RS.4.SCI02', 'Relay Station: Science (Cruise) - Patterns in the Seasons', 'relay_station', 4, 'Science'),
  ('RS.4.SCI03', 'Relay Station: Science (Cruise) - Food Webs', 'relay_station', 4, 'Science'),
  ('RS.4.SCI04', 'Relay Station: Science (Orbit) - Weathering, Erosion, and Deposition', 'relay_station', 4, 'Science'),
  ('RS.5.SCI01', 'Relay Station: Science (Launch) - Mixtures', 'relay_station', 5, 'Science'),
  ('RS.5.SCI02', 'Relay Station: Science (Cruise) - How Light Behaves', 'relay_station', 5, 'Science'),
  ('RS.5.SCI03', 'Relay Station: Science (Cruise) - Living and Nonliving Parts of an Ecosystem', 'relay_station', 5, 'Science'),
  ('RS.5.SCI04', 'Relay Station: Science (Orbit) - How Landforms Are Made', 'relay_station', 5, 'Science'),
  ('RS.3.LOG01', 'Relay Station: Cadet Log 1 (Launch) - The Lost Signal', 'relay_station', 3, 'ELAR'),
  ('RS.3.LOG02', 'Relay Station: Cadet Log 2 (Cruise) - The Lost Signal', 'relay_station', 3, 'ELAR'),
  ('RS.3.LOG03', 'Relay Station: Cadet Log 3 (Cruise) - The Lost Signal', 'relay_station', 3, 'ELAR'),
  ('RS.3.LOG04', 'Relay Station: Cadet Log 4 (Orbit) - The Lost Signal', 'relay_station', 3, 'ELAR'),
  ('RS.4.LOG01', 'Relay Station: Cadet Log 1 (Launch) - The Frozen Greenhouse', 'relay_station', 4, 'ELAR'),
  ('RS.4.LOG02', 'Relay Station: Cadet Log 2 (Cruise) - The Frozen Greenhouse', 'relay_station', 4, 'ELAR'),
  ('RS.4.LOG03', 'Relay Station: Cadet Log 3 (Cruise) - The Frozen Greenhouse', 'relay_station', 4, 'ELAR'),
  ('RS.4.LOG04', 'Relay Station: Cadet Log 4 (Orbit) - The Frozen Greenhouse', 'relay_station', 4, 'ELAR'),
  ('RS.5.LOG01', 'Relay Station: Cadet Log 1 (Launch) - The Asteroid Map', 'relay_station', 5, 'ELAR'),
  ('RS.5.LOG02', 'Relay Station: Cadet Log 2 (Cruise) - The Asteroid Map', 'relay_station', 5, 'ELAR'),
  ('RS.5.LOG03', 'Relay Station: Cadet Log 3 (Cruise) - The Asteroid Map', 'relay_station', 5, 'ELAR'),
  ('RS.5.LOG04', 'Relay Station: Cadet Log 4 (Orbit) - The Asteroid Map', 'relay_station', 5, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

SELECT count(*) AS new_library_readings FROM cases WHERE standard ~ '^RS\.[345]\.(SCI|LOG)0[1-4]$';
