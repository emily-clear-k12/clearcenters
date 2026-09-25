INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.11C-EX', 'Exhibit Hall: Every careful use', 'exhibit_hall', 3, 'Science'),
  ('4.7-EX', 'Exhibit Hall: Every kind of force', 'exhibit_hall', 4, 'Science'),
  ('5.6A-EX', 'Exhibit Hall: Every kind of test', 'exhibit_hall', 5, 'Science'),
  ('ELA.3.10A-EX', 'Exhibit Hall: Every kind of purpose', 'exhibit_hall', 3, 'ELAR'),
  ('ELA.4.9E-EX', 'Exhibit Hall: Every piece of the argument', 'exhibit_hall', 4, 'ELAR'),
  ('ELA.5.10D-EX', 'Exhibit Hall: Every kind of feature', 'exhibit_hall', 5, 'ELAR'),
  ('SS.3.5A-EX', 'Exhibit Hall: Every kind of money choice', 'exhibit_hall', 3, 'Social Studies'),
  ('SS.4.6A-EX', 'Exhibit Hall: Every kind of Texas region', 'exhibit_hall', 4, 'Social Studies'),
  ('SS.5.15A-EX', 'Exhibit Hall: Every kind of branch', 'exhibit_hall', 5, 'Social Studies'),
  ('3.3C-EX', 'Exhibit Hall: Every kind of unit fraction', 'exhibit_hall', 3, 'Math'),
  ('4.2B-EX', 'Exhibit Hall: Every way to show 3 tenths', 'exhibit_hall', 4, 'Math'),
  ('5.4A-EX', 'Exhibit Hall: Prime or composite', 'exhibit_hall', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;
