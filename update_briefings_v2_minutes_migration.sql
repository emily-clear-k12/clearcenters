-- Briefings v2 foundation pass (Sept 14, 2026) — sync the `briefings`
-- catalog table's `minutes` column with the rebuilt lesson packs.
--
-- Why this is needed: app/teacher/assign/briefing/page.js reads the
-- assign-screen catalog straight from this `briefings` table, not from
-- the lib/briefings/*.public.js files the actual player uses. The public
-- packs for SS-3-2A-BR, SS-3-2B-BR, and SCI-3-6B-BR were all changed to
-- `minutes: 20` as part of the v2 rebuild -- without this update, the
-- teacher assign screen will keep showing the old 30/30/25-minute badges
-- even though the lesson itself now runs ~20 minutes.
--
-- Safe to re-run. Paste into Supabase SQL Editor and Run.

UPDATE briefings SET minutes = 20 WHERE id = 'SS-3-2A-BR';
UPDATE briefings SET minutes = 20 WHERE id = 'SS-3-2B-BR';
UPDATE briefings SET minutes = 20 WHERE id = 'SCI-3-6B-BR';
