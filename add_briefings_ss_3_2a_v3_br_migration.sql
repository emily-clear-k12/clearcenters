-- SS-3-2A-V3-BR — Why Communities Form, rebuilt on the v3 "thinking
-- lesson" shape (openingFrame → storyTeach → synthesis → reasonSort →
-- opsChoice → transfer → clearance).
--
-- This is added ALONGSIDE SS-3-2A-BR rather than replacing it, on purpose:
--   * the old lesson keeps working exactly as it does today, so nothing
--     resets for a student part-way through it;
--   * both appear on /teacher/assign/briefing, so the two can be assigned
--     to different groups and compared on real students.
--
-- If the v3 version wins, retiring the old one is two steps: set
-- published = false on 'SS-3-2A-BR' below, and drop its entry from
-- lib/briefings/index.public.js and index.server.js.
--
-- Safe to re-run (ON CONFLICT update). Does not recreate tables.

INSERT INTO briefings (
  id, title, tagline, subject, grade, teks, minutes,
  related_challenge_ids, engine, published
)
VALUES (
  'SS-3-2A-V3-BR',
  'Why Communities Form',
  'Four families stopped at a river crossing. Three hundred live there now.',
  'social_studies',
  3,
  '3.2A',
  20,
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

-- Optional: once you've decided, uncomment to take the old one off the
-- assign screen without deleting any of its submissions or history.
-- UPDATE briefings SET published = false WHERE id = 'SS-3-2A-BR';
