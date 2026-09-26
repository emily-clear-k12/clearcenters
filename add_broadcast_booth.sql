-- Broadcast Booth Wave 0. Run this in Supabase SQL editor before assigning
-- SCI.3.13A-BB (Desert Radio · Explain it live).
-- Teacher reviews voice clips (NOT AI-graded).

-- 1) Submission payload for Broadcast Booth beats
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS broadcast_booth_data JSONB;

-- 2) Per-assignment Broadcast config (optional prompt override / debate labels)
ALTER TABLE assignments
  ADD COLUMN IF NOT EXISTS broadcast_booth_config JSONB;

-- 3) Seed Explain case (Science TEKS-friendly desert adaptations / cactus)
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.3.13A-BB', 'Broadcast Booth: Desert Radio (Explain)', 'broadcast_booth', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain how a cactus survives in the desert using clear spoken ideas.',
  lesson_summary = 'Students hear a short stimulus, then record four Explain beats (Hook, Big idea, Show me, Sign off). Optional stills on Big idea and Show me. Teacher listens — not AI-graded. About 25–30 minutes.',
  misconception_note = 'Wave 0 seeds Explain. Correspondent and Debate segment types are wired in the app for later cases.'
WHERE standard = 'SCI.3.13A-BB';

-- Verify:
-- SELECT standard, title, engine, grade, subject FROM cases
-- WHERE engine = 'broadcast_booth' OR standard = 'SCI.3.13A-BB';
--
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name IN ('assignments', 'submissions')
--   AND column_name LIKE 'broadcast_booth%';
