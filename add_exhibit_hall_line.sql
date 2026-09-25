INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.13B-EX', 'Exhibit Hall: A beetle''s year', 'exhibit_hall', 3, 'Science'),
  ('4.9B-EX', 'Exhibit Hall: 29 nights', 'exhibit_hall', 4, 'Science'),
  ('5.10B-EX', 'Exhibit Hall: From mud to stone', 'exhibit_hall', 5, 'Science'),
  ('SS.3.1A-EX', 'Exhibit Hall: How our town grew', 'exhibit_hall', 3, 'Social Studies'),
  ('SS.4.4B-EX', 'Exhibit Hall: Longhorn boom', 'exhibit_hall', 4, 'Social Studies'),
  ('SS.5.4C-EX', 'Exhibit Hall: Growing west', 'exhibit_hall', 5, 'Social Studies'),
  ('ELA.3.8C-EX', 'Exhibit Hall: The lemonade plan', 'exhibit_hall', 3, 'ELAR'),
  ('ELA.4.8C-EX', 'Exhibit Hall: The science fair disaster', 'exhibit_hall', 4, 'ELAR'),
  ('ELA.5.8C-EX', 'Exhibit Hall: Lost in the library', 'exhibit_hall', 5, 'ELAR'),
  ('3.9E-EX', 'Exhibit Hall: Maya''s bike fund', 'exhibit_hall', 3, 'Math'),
  ('4.5B-EX', 'Exhibit Hall: The growing tower', 'exhibit_hall', 4, 'Math'),
  ('5.10E-EX', 'Exhibit Hall: The family budget', 'exhibit_hall', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;
