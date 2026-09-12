-- Briefings pack — SCI-3-6B-BR Solid, Liquid, or Gas?
-- Paste into Supabase SQL Editor and Run after the 3.2B migration.
-- Safe to re-run (ON CONFLICT update). Does not recreate tables.

INSERT INTO briefings (
  id, title, tagline, subject, grade, teks, minutes,
  related_challenge_ids, engine, published
)
VALUES (
  'SCI-3-6B-BR',
  'Solid, Liquid, or Gas?',
  'Matter can be a solid, a liquid, or a gas. The clue is what happens to its shape.',
  'science',
  3,
  '3.6B',
  25,
  '[]'::jsonb,
  'briefing',
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  subject = EXCLUDED.subject,
  grade = EXCLUDED.grade,
  teks = EXCLUDED.teks,
  minutes = EXCLUDED.minutes,
  related_challenge_ids = EXCLUDED.related_challenge_ids,
  engine = EXCLUDED.engine,
  published = EXCLUDED.published;

-- Assign via /teacher/assign/briefing after this lands.
