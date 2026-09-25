-- Exhibit Hall. Run this before assigning the desert case.

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS exhibit_hall_data JSONB;

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.13A-EX', 'Exhibit Hall: Built for the desert', 'exhibit_hall', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can show how a body part helps an animal in the desert, and leave out a source that does not prove it.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit, write the labels, and answer a late field note. A wrong piece stays. About 20 minutes.'
WHERE standard = '3.13A-EX';

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('4.13A-EX', 'Exhibit Hall: Built to live here', 'exhibit_hall', 4, 'Science'),
  ('ELA.3.8A-EX', 'Exhibit Hall: The lost kite', 'exhibit_hall', 3, 'ELAR'),
  ('SS.4.3A-EX', 'Exhibit Hall: Why Texans fought', 'exhibit_hall', 4, 'Social Studies')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can show how a plant structure helps a plant live where it lives, and leave out a source that does not prove it.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit, write the labels, and answer a late field note. About 20 minutes.'
WHERE standard = '4.13A-EX';

UPDATE cases SET
  learning_target = 'I can use lines from a story to prove a theme, and leave out a line that only names the topic.',
  lesson_summary = 'Students use an original short story, stamp each source, build a four-spot exhibit, and check a late note. About 20 minutes.'
WHERE standard = 'ELA.3.8A-EX';

UPDATE cases SET
  learning_target = 'I can show causes of the Texas Revolution and leave out an effect or a myth.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit of causes, and check a late note. About 20 minutes.'
WHERE standard = 'SS.4.3A-EX';

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.8A-EX', 'Exhibit Hall: Energy all around us', 'exhibit_hall', 3, 'Science'),
  ('4.12A-EX', 'Exhibit Hall: Food from light', 'exhibit_hall', 4, 'Science'),
  ('ELA.3.9D-EX', 'Exhibit Hall: Text feature hall', 'exhibit_hall', 3, 'ELAR'),
  ('SS.4.8A-EX', 'Exhibit Hall: Changing Texas to live in it', 'exhibit_hall', 4, 'Social Studies')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can show light, sound, thermal, and mechanical energy in everyday life, and leave out a source that does not prove it.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit, write the labels, and answer a late field note. About 20 minutes.'
WHERE standard = '3.8A-EX';

UPDATE cases SET
  learning_target = 'I can prove that plants make their own food and leave out the myth that plants eat soil.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit, write the labels, and answer a late field note. About 20 minutes.'
WHERE standard = '4.12A-EX';

UPDATE cases SET
  learning_target = 'I can tell a text feature from a story sentence or a decoration.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit of text features, and answer a late note. About 20 minutes.'
WHERE standard = 'ELA.3.9D-EX';

UPDATE cases SET
  learning_target = 'I can show ways people adapted to or changed the Texas environment, and leave out a natural place or a myth.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit, write the labels, and answer a late field note. About 20 minutes.'
WHERE standard = 'SS.4.8A-EX';
