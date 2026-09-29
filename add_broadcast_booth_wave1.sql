-- Broadcast Booth wave 1, first four Explain cases.
-- Playable content is in lib/cases/broadcast-booth/wave1.js.
-- Run this in the Supabase SQL editor. Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.5.9-BB', 'Broadcast Booth: Why do we have day and night? (Explain)', 'broadcast_booth', 5, 'Science'),
  ('SCI.5.7A-BB', 'Broadcast Booth: Why did it move? (Explain)', 'broadcast_booth', 5, 'Science'),
  ('SCI.4.8C-BB', 'Broadcast Booth: Why is the bulb lit? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.3.6C-BB', 'Broadcast Booth: What does heat do to water? (Explain)', 'broadcast_booth', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain that Earth rotates about once every 24 hours and that this spin causes day and night.',
  lesson_summary = 'Grade 5 Explain broadcast. Earth''s spin causes day and night. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'The Sun does not orbit the school each day.'
WHERE standard = 'SCI.5.9-BB';

UPDATE cases SET
  learning_target = 'I can explain that balanced forces do not change motion and unbalanced forces do.',
  lesson_summary = 'Grade 5 Explain broadcast on balanced and unbalanced forces. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'A still object can have balanced forces on it.'
WHERE standard = 'SCI.5.7A-BB';

UPDATE cases SET
  learning_target = 'I can explain that a bulb lights when the circuit is closed and stays dark when the circuit is open.',
  lesson_summary = 'Grade 4 Explain broadcast. A closed path lets the bulb light. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'An open switch is a gap. The path has to be complete.'
WHERE standard = 'SCI.4.8C-BB';

UPDATE cases SET
  learning_target = 'I can explain that heating and cooling can change water from ice to liquid water to water vapor.',
  lesson_summary = 'Grade 3 Explain broadcast on states of water. Not a water-cycle lesson. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Melting is not disappearing. The water is still there as a liquid.'
WHERE standard = 'SCI.3.6C-BB';
