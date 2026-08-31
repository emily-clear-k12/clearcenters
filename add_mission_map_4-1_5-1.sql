-- Mission Map — seeds the 2nd and 3rd authored cases: the first Grade 4 case
-- (4.1-MM, Earth & Space / TEKS 4.9B) and the first Grade 5 case (5.1-MM,
-- Force & Energy / TEKS 5.7A-5.7B). No ALTER needed — the mission_map_data
-- column already exists from add_mission_map_migration.sql, run for 3.1-MM.
--
-- Without a matching row here, page.js's lookup on `cases` finds nothing for
-- these two standards and would default `engine` to "group_chat" instead of
-- routing to Mission Map — same reason 3.1-MM needed its own seed row.
--
-- Note: "4.9B" and "5.7A"/"5.7B" (the real TEKS codes these cases are built
-- on) are already in use as `cases.standard` values for separate Group Chat
-- cases (see add_new_cases.sql — different engine, different case content).
-- That's exactly why Mission Map cases use their own "<grade>.<concept>-MM"
-- numbering instead of the raw TEKS code — `cases.standard` is the table's
-- primary key, so reusing "4.9B" here would collide with that existing row.
INSERT INTO cases (standard, title, engine, grade, subject)
VALUES
  ('4.1-MM', 'Chart the Moon''s Pattern', 'mission_map', 4, 'Science'),
  ('5.1-MM', 'Solve the Derby Track Mystery', 'mission_map', 5, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  engine = EXCLUDED.engine,
  title = EXCLUDED.title,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

-- To actually test these end to end, an `assignments` row also needs
-- `case_standard = '4.1-MM'` (or '5.1-MM') pointed at a real class — that's a
-- normal teacher-side assignment action, not part of this migration.
