-- Broadcast Booth — Grade 3 ELAR 3.9D (News Desk · Explain).
-- Run in Supabase after the earlier Broadcast Booth SQL.
-- Playable content lives in lib/cases/broadcast-booth/catalog.js.
-- Desert Radio, Creek Desk, and Schoolyard Debate are not changed.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.3.9D-BB', 'Broadcast Booth: News Desk (Central Idea)', 'broadcast_booth', 3, 'ELAR')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'Recognize the central idea of an informational text and the evidence that supports it.',
  lesson_summary = 'Students read a short garden article, place picture chips on Explain trays (Hook / Big idea / Show me / Sign off), then record. Unlock needs a chip on Big idea and Show me. Teacher listens — not AI-graded. About 25–30 minutes.',
  misconception_note = 'ELAR 3.9D. Same Explain design as Desert Radio. The central idea is that saved rain water keeps the garden watered. One detail is evidence, not the central idea.'
WHERE standard = 'ELA.3.9D-BB';
