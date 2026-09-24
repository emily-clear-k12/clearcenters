-- Classification Lab. Run this before assigning a case.
-- Adds the result column and the first eight cases.

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS classification_lab_data JSONB;

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA-3.6B-CL', 'Classification Lab: Four sides', 'classification_lab', 3, 'Math'),
  ('ELAR-3.3C-CL', 'Classification Lab: The word part', 'classification_lab', 3, 'ELAR'),
  ('SS-3.7A-CL', 'Classification Lab: Who makes the rule', 'classification_lab', 3, 'Social Studies'),
  ('SCI-4.12B-CL', 'Classification Lab: What they eat', 'classification_lab', 4, 'Science'),
  ('ELAR-4.11D-CL', 'Classification Lab: One sentence or two', 'classification_lab', 4, 'ELAR'),
  ('MA-5.4A-CL', 'Classification Lab: Prime or composite', 'classification_lab', 5, 'Math'),
  ('ELAR-5.11D-CL', 'Classification Lab: The joining word', 'classification_lab', 5, 'ELAR'),
  ('SCI-5.6B-CL', 'Classification Lab: Mixed or dissolved', 'classification_lab', 5, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can sort shapes by right angles and parallel sides, and see that a square is also a rectangle.',
  lesson_summary = 'Students sort shapes by the card, then place them on a Venn. A turned square is still a square. About 20 minutes.'
WHERE standard = 'MA-3.6B-CL';

UPDATE cases SET
  learning_target = 'I can sort words by what the prefix means, not by the topic.',
  lesson_summary = 'Students sort non-, dis-, in-, and pre- words, then use a Venn for prefix and suffix. About 20 minutes.'
WHERE standard = 'ELAR-3.3C-CL';

UPDATE cases SET
  learning_target = 'I can sort a rule by who makes it: the city, the state, or the country.',
  lesson_summary = 'Students sort rules by who makes them, not by what people need. A home rule fits neither. About 20 minutes.'
WHERE standard = 'SS-3.7A-CL';

UPDATE cases SET
  learning_target = 'I can sort living things by what they eat, not by where they live.',
  lesson_summary = 'Students sort a food web by diet. The ocean is the trap. The bear eats both. About 20 minutes.'
WHERE standard = 'SCI-4.12B-CL';

UPDATE cases SET
  learning_target = 'I can tell a simple sentence from a compound sentence.',
  lesson_summary = 'Students sort sentences. A long sentence can still be simple. A fragment is neither. About 20 minutes.'
WHERE standard = 'ELAR-4.11D-CL';

UPDATE cases SET
  learning_target = 'I can identify prime and composite numbers, including 1.',
  lesson_summary = 'Students sort numbers by prime or composite. Odd and even is the trap. About 20 minutes.'
WHERE standard = 'MA-5.4A-CL';

UPDATE cases SET
  learning_target = 'I can tell a simple, compound, and complex sentence apart by the joining word.',
  lesson_summary = 'Students sort sentences by simple, compound, or complex. Because, when, and if mark a complex sentence. About 20 minutes.'
WHERE standard = 'ELAR-5.11D-CL';

UPDATE cases SET
  learning_target = 'I can tell a mixture you can see from a solution, and I know a solution is still a mixture.',
  lesson_summary = 'Students sort mixtures. Clear does not mean dissolved. Salt water is still a mixture. About 20 minutes.'
WHERE standard = 'SCI-5.6B-CL';
