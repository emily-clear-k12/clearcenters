-- Assembly Deck grade 4 ELAR.
-- How the Cafeteria Line Works, Later Recess,
-- The Letter to the Museum, The Article and the Rumor.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.4.12B-AD', 'Assembly Deck: How the Cafeteria Line Works', 'assembly_deck', 4, 'ELAR'),
  ('ELA.4.12C-AD', 'Assembly Deck: Later Recess',                  'assembly_deck', 4, 'ELAR'),
  ('ELA.4.12D-AD', 'Assembly Deck: The Letter to the Museum',      'assembly_deck', 4, 'ELAR'),
  ('ELA.4.7D-AD',  'Assembly Deck: The Article and the Rumor',     'assembly_deck', 4, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can write an informational piece with a clear central idea and the details that support it.',
  lesson_summary = 'Students explain the cafeteria line in order and show what makes it finish before the bell. About 20 minutes.'
WHERE standard = 'ELA.4.12B-AD';

UPDATE cases SET
  learning_target = 'I can write an opinion with a claim, evidence, and an answer to the other side.',
  lesson_summary = 'Students argue for a 20-minute recess using a class survey and answer the worry about losing math time. About 20 minutes.'
WHERE standard = 'ELA.4.12C-AD';

UPDATE cases SET
  learning_target = 'I can write a letter that requests specific information and tells the reader how to reply.',
  lesson_summary = 'Students write the museum for three fossil-trip facts and say the reply should go to the teacher. About 20 minutes.'
WHERE standard = 'ELA.4.12D-AD';

UPDATE cases SET
  learning_target = 'I can summarize a text without changing its meaning or swapping in a rumor.',
  lesson_summary = 'Students summarize a playground-repair article and keep a forever-closing rumor out of the summary. About 20 minutes.'
WHERE standard = 'ELA.4.7D-AD';
