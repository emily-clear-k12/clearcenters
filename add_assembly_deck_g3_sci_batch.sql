-- Assembly Deck grade 3 science batch.
-- The Water Bill, Built for This, The Road That Moved.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.11B-AD', 'Assembly Deck: The Water Bill', 'assembly_deck', 3, 'Science'),
  ('3.13A-AD', 'Assembly Deck: Built for This', 'assembly_deck', 3, 'Science'),
  ('3.10C-AD', 'Assembly Deck: The Road That Moved', 'assembly_deck', 3, 'Science')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can use evidence to say why water use changed and what to conserve first.',
  lesson_summary = 'Students assemble three paragraphs about a school water bill, reject guesses, and explain which use to shut off first. About 20 minutes.'
WHERE standard = '3.11B-AD';

UPDATE cases SET
  learning_target = 'I can explain how an animal''s structure helps it survive in its habitat.',
  lesson_summary = 'Students assemble three paragraphs about a desert fox''s large ears and explain the job those ears do. About 20 minutes.'
WHERE standard = '3.13A-AD';

UPDATE cases SET
  learning_target = 'I can tell a rapid change to Earth''s surface from a slow change.',
  lesson_summary = 'Students assemble three paragraphs about a landslide, name why it was fast, and keep the slow crumbling separate. About 20 minutes.'
WHERE standard = '3.10C-AD';
