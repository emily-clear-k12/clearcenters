-- Broadcast Booth: Where does the water go? (SCI.4.10A-BB)
-- Playable content is in lib/cases/broadcast-booth/wave2.js.
-- Safe to run twice. Not run yet.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.4.10A-BB', 'Broadcast Booth: Where does the water go? (Explain)', 'broadcast_booth', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain how water keeps moving through the water cycle and how the Sun''s energy lifts it.',
  lesson_summary = 'Grade 4 Explain broadcast. The Sun''s energy moves water through the water cycle. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'The water is not gone. The Sun here is an energy source, not the reason for day and night.'
WHERE standard = 'SCI.4.10A-BB';
