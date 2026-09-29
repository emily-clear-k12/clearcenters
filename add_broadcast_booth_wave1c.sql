-- Broadcast Booth: multiplication, fractions, communities, supply and demand.
-- Playable content is in lib/cases/broadcast-booth/wave1.js.
-- Safe to run twice. Not run yet.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.5B-BB', 'Broadcast Booth: Six tables of cupcakes (Explain)', 'broadcast_booth', 3, 'Math'),
  ('MA.4.3E-BB', 'Broadcast Booth: Three eighths plus two eighths (Explain)', 'broadcast_booth', 4, 'Math'),
  ('SS.3.2B-BB', 'Broadcast Booth: Same need, different way (Correspondent)', 'broadcast_booth', 3, 'Social Studies'),
  ('SS.4.10A-BB', 'Broadcast Booth: The lemonade puzzle (Explain)', 'broadcast_booth', 4, 'Social Studies')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can solve a multiplication problem within 100 and show it with an array.',
  lesson_summary = 'Grade 3 Explain broadcast. 6 groups of 4 is 24. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Altogether does not mean add 6 and 4. These are equal groups.'
WHERE standard = 'MA.3.5B-BB';

UPDATE cases SET
  learning_target = 'I can add two fractions with the same denominator and explain why the denominator stays the same.',
  lesson_summary = 'Grade 4 Explain broadcast. 3/8 + 2/8 = 5/8. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Do not add the denominators. 5/16 is not the total.'
WHERE standard = 'MA.4.3E-BB';

UPDATE cases SET
  learning_target = 'I can explain how two communities meet the same need in different ways.',
  lesson_summary = 'Grade 3 Correspondent broadcast. A town and an island meet the same needs differently. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'The same need does not have to use the same solution.'
WHERE standard = 'SS.3.2B-BB';

UPDATE cases SET
  learning_target = 'I can explain how supply and demand together affect price and whether something is still available.',
  lesson_summary = 'Grade 4 Explain broadcast. High demand does not always raise the price. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Look at supply and demand together.'
WHERE standard = 'SS.4.10A-BB';
