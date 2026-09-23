-- Assembly Deck grade 3 ELAR.
-- The Day the Bus Was Late, Keep the Library Open at Lunch,
-- The Letter to the Fire Station, Say It Shorter.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.
-- The Lunchroom Recycling Report (ELA.3.12B-AD) is already in the library.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.3.12A-AD', 'Assembly Deck: The Day the Bus Was Late',        'assembly_deck', 3, 'ELAR'),
  ('ELA.3.12C-AD', 'Assembly Deck: Keep the Library Open at Lunch',  'assembly_deck', 3, 'ELAR'),
  ('ELA.3.12D-AD', 'Assembly Deck: The Letter to the Fire Station',   'assembly_deck', 3, 'ELAR'),
  ('ELA.3.7D-AD',  'Assembly Deck: Say It Shorter',                   'assembly_deck', 3, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can write a personal narrative that tells what happened, in order, and what changed.',
  lesson_summary = 'Students build the true story of a morning the bus did not come, including the feeling change. About 20 minutes.'
WHERE standard = 'ELA.3.12A-AD';

UPDATE cases SET
  learning_target = 'I can write an opinion with a clear ask, reasons from the notes, and an answer to one worry.',
  lesson_summary = 'Students build an opinion asking to keep the library open at lunch and answer the noise worry. About 20 minutes.'
WHERE standard = 'ELA.3.12C-AD';

UPDATE cases SET
  learning_target = 'I can write a thank-you letter that names the person, the real help, and a closing.',
  lesson_summary = 'Students build a thank-you letter to the firefighters and leave demands out. About 20 minutes.'
WHERE standard = 'ELA.3.12D-AD';

UPDATE cases SET
  learning_target = 'I can retell a text in fewer words without changing the meaning or the order.',
  lesson_summary = 'Students turn a garden article into a short retelling and reject lines that change the news. About 20 minutes.'
WHERE standard = 'ELA.3.7D-AD';
