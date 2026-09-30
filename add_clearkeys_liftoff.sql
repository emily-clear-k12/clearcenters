-- Sept 30, 2026: ClearKeys Typing Level 1 (Liftoff) readings, 20 short, plain texts for beginning typists.
-- Text ships in lib/cases/relay-station/index.js. Safe to run more than once.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('RS.3.LIFT01', 'ClearKeys · Science: Ice, Water, and Steam', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT02', 'ClearKeys · Science: Will It Float?', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT03', 'ClearKeys · Science: Magnets', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT04', 'ClearKeys · Science: Push and Pull', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT05', 'ClearKeys · Science: Energy All Around', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT06', 'ClearKeys · Science: Our Planet', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT07', 'ClearKeys · Science: Who Eats What?', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT08', 'ClearKeys · Science: Cactus Survival', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT09', 'ClearKeys · Science: Fast Changes', 'relay_station', 3, 'Science'),
  ('RS.3.LIFT10', 'ClearKeys · Social Studies: Which Way?', 'relay_station', 3, 'Social Studies'),
  ('RS.3.LIFT11', 'ClearKeys · Social Studies: Not Enough', 'relay_station', 3, 'Social Studies'),
  ('RS.3.LIFT12', 'ClearKeys · Social Studies: A Good Citizen', 'relay_station', 3, 'Social Studies'),
  ('RS.3.LIFT13', 'ClearKeys · Social Studies: Leaders', 'relay_station', 3, 'Social Studies'),
  ('RS.3.LIFT14', 'ClearKeys · Social Studies: Saving Up', 'relay_station', 3, 'Social Studies'),
  ('RS.3.LIFT15', 'ClearKeys · Poem: Rain', 'relay_station', 3, 'ELAR'),
  ('RS.3.LIFT16', 'ClearKeys · Note: Library Day', 'relay_station', 3, 'ELAR'),
  ('RS.3.LIFT17', 'ClearKeys · Opinion: Dogs Are Great', 'relay_station', 3, 'ELAR'),
  ('RS.3.LIFT18', 'ClearKeys · Questions and Answers', 'relay_station', 3, 'ELAR'),
  ('RS.3.LIFT19', 'ClearKeys · Log: My First Day', 'relay_station', 3, 'ELAR'),
  ('RS.3.LIFT20', 'ClearKeys · How to Say Hello', 'relay_station', 3, 'ELAR')
ON CONFLICT (standard) DO UPDATE SET title = EXCLUDED.title;

SELECT count(*) AS liftoff_readings FROM cases WHERE standard LIKE 'RS.3.LIFT%';
