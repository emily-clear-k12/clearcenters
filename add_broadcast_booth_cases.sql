-- Broadcast Booth — Correspondent + Debate seeds.
-- Run in Supabase SQL editor after add_broadcast_booth.sql (Explain / Desert Radio).
-- Playable content lives in lib/cases/broadcast-booth/catalog.js; SQL makes rows assignable.
-- ON CONFLICT updates title/engine/grade/subject so re-runs are safe.
-- Desert Radio SCI.3.13A-BB is intentionally left alone here.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.3.12B-BB', 'Broadcast Booth: Creek Desk (Correspondent)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.11B-BB', 'Broadcast Booth: Schoolyard Debate (Shade vs Play)', 'broadcast_booth', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can report from a creek habitat and tell how living things connect in a food chain.',
  lesson_summary = 'Students use a you-are-here kit, place chips on Correspondent trays (Where / What I noticed / Why it matters / Sign off), then record. Unlock needs chips on What I noticed and Why it matters. Teacher listens — not AI-graded. About 25–30 minutes.',
  misconception_note = 'Correspondent seed. Unlock trays: What I noticed + Why it matters. Desert Radio Explain (SCI.3.13A-BB) stays as-is.'
WHERE standard = 'SCI.3.12B-BB';

UPDATE cases SET
  learning_target = 'I can present both sides of a schoolyard choice and share what I think now about conserving resources and play space.',
  lesson_summary = 'Students read shared context plus Side A / Side B mini-briefs, place chips on Debate trays, then record. Unlock needs chips on both sides. Teacher listens — not AI-graded. About 25–30 minutes.',
  misconception_note = 'Debate seed. Side labels from case (More shade trees / More playground); teacher can override. Desert Radio Explain stays as-is.'
WHERE standard = 'SCI.3.11B-BB';

-- Verify:
-- SELECT standard, title, engine, grade, subject FROM cases
-- WHERE engine = 'broadcast_booth'
-- ORDER BY standard;
