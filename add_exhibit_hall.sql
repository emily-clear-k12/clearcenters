-- Exhibit Hall. Run this before assigning the desert case.

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS exhibit_hall_data JSONB;

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI-3.13A-EX', 'Exhibit Hall: Built for the desert', 'exhibit_hall', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can show how a body part helps an animal in the desert, and leave out a source that does not prove it.',
  lesson_summary = 'Students stamp each source, build a four-spot exhibit, write the labels, and answer a late field note. A wrong piece stays. About 20 minutes.'
WHERE standard = 'SCI-3.13A-EX';
