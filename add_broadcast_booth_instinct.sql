-- Broadcast Booth: Born knowing, or taught? (SCI.5.13B-BB)
-- Playable content is in lib/cases/broadcast-booth/wave1.js.
-- Run this in the Supabase SQL editor. Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.5.13B-BB', 'Broadcast Booth: Born knowing, or taught? (Correspondent)', 'broadcast_booth', 5, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can report the difference between a behavior an animal is born knowing and a behavior it was taught.',
  lesson_summary = 'Grade 5 Correspondent broadcast on instinct and learned behavior. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'A dog sitting for a treat is learned. A shell is a body part, not a behavior.'
WHERE standard = 'SCI.5.13B-BB';
