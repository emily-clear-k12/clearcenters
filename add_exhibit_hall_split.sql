INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.10B-EX', 'Exhibit Hall: Sand or clay', 'exhibit_hall', 3, 'Science'),
  ('4.13B-EX', 'Exhibit Hall: Born with it or picked it up', 'exhibit_hall', 4, 'Science'),
  ('5.13B-EX', 'Exhibit Hall: Born knowing or taught', 'exhibit_hall', 5, 'Science'),
  ('SS.3.10B-EX', 'Exhibit Hall: Two Texas celebrations', 'exhibit_hall', 3, 'Social Studies'),
  ('SS.4.6B-EX', 'Exhibit Hall: Coast or mountains', 'exhibit_hall', 4, 'Social Studies'),
  ('SS.5.9A-EX', 'Exhibit Hall: North or south colonies', 'exhibit_hall', 5, 'Social Studies'),
  ('ELA.3.9A-EX', 'Exhibit Hall: Fable or fairy tale', 'exhibit_hall', 3, 'ELAR'),
  ('ELA.4.7B-EX', 'Exhibit Hall: Two views of the storm', 'exhibit_hall', 4, 'ELAR'),
  ('ELA.5.13D-EX', 'Exhibit Hall: There or later', 'exhibit_hall', 5, 'ELAR'),
  ('3.7D-EX', 'Exhibit Hall: Pour it or weigh it', 'exhibit_hall', 3, 'Math'),
  ('4.10A-EX', 'Exhibit Hall: Same every month?', 'exhibit_hall', 4, 'Math'),
  ('5.4D-EX', 'Exhibit Hall: Plus or times', 'exhibit_hall', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;
