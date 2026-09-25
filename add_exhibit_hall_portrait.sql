INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.9A-EX', 'Exhibit Hall: Portrait of a day', 'exhibit_hall', 3, 'Science'),
  ('4.10B-EX', 'Exhibit Hall: Portrait of a canyon', 'exhibit_hall', 4, 'Science'),
  ('5.8B-EX', 'Exhibit Hall: Portrait of a circuit', 'exhibit_hall', 5, 'Science'),
  ('ELA.3.10C-EX', 'Exhibit Hall: Portrait of a poster', 'exhibit_hall', 3, 'ELAR'),
  ('ELA.4.7D-EX', 'Exhibit Hall: Portrait of a summary', 'exhibit_hall', 4, 'ELAR'),
  ('ELA.5.8A-EX', 'Exhibit Hall: Portrait of a theme', 'exhibit_hall', 5, 'ELAR'),
  ('SS.3.4C-EX', 'Exhibit Hall: Portrait of a map', 'exhibit_hall', 3, 'Social Studies'),
  ('SS.4.14A-EX', 'Exhibit Hall: Portrait of the Texas flag', 'exhibit_hall', 4, 'Social Studies'),
  ('SS.5.14B-EX', 'Exhibit Hall: Portrait of the Preamble', 'exhibit_hall', 5, 'Social Studies'),
  ('3.6C-EX', 'Exhibit Hall: Portrait of this rectangle', 'exhibit_hall', 3, 'Math'),
  ('4.6A-EX', 'Exhibit Hall: Portrait of a ray', 'exhibit_hall', 4, 'Math'),
  ('5.6B-EX', 'Exhibit Hall: Portrait of this box', 'exhibit_hall', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;
