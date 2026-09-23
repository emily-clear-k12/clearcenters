-- Assembly Deck — The Pond That Went Quiet (3.12B-AD).
-- Run in Supabase after the Wave 1 Assembly Deck migration.
-- The activity code is already in the app. Assign will not list this case until this row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.12B-AD', 'Assembly Deck: The Pond That Went Quiet', 'assembly_deck', 3, 'Science')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can explain where the energy in a food chain starts, what eats what, and what happens when one link is missing.',
  lesson_summary = 'Students assemble three paragraphs about a pond food chain, name why the leftover sentences do not belong, put the paragraphs in order, and explain the chain in their own words. About 20 minutes.'
WHERE standard = '3.12B-AD';
