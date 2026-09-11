-- Briefings pack 2 — SS-3-2B-BR How Communities Meet Needs.
-- Paste into Supabase SQL Editor and Run after the 3.2A migration.
-- Safe to re-run (ON CONFLICT update). Does not recreate tables.

INSERT INTO briefings (
  id, title, tagline, subject, grade, teks, minutes,
  related_challenge_ids, engine, published
)
VALUES (
  'SS-3-2B-BR',
  'How Communities Meet Needs',
  'Maple Crossing and Cloudreach both take care of people — they just do it differently.',
  'social_studies',
  3,
  '3.2B',
  30,
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
