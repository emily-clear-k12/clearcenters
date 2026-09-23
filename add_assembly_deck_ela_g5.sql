-- Assembly Deck grade 5 ELAR.
-- What a Watershed Is, The Request to the City Engineer,
-- Two Summaries, One Article, Four Sources, One Question.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.
-- The Case for Later Practice (ELA.5.12C-AD) is already in the library.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.5.12B-AD', 'Assembly Deck: What a Watershed Is',              'assembly_deck', 5, 'ELAR'),
  ('ELA.5.12D-AD', 'Assembly Deck: The Request to the City Engineer', 'assembly_deck', 5, 'ELAR'),
  ('ELA.5.7D-AD',  'Assembly Deck: Two Summaries, One Article',       'assembly_deck', 5, 'ELAR'),
  ('ELA.5.13D-AD', 'Assembly Deck: Four Sources, One Question',       'assembly_deck', 5, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can write an informational piece with one central idea and the facts that hold it.',
  lesson_summary = 'Students explain that a watershed is the land that drains to one body of water, using the school ridge. About 20 minutes.'
WHERE standard = 'ELA.5.12B-AD';

UPDATE cases SET
  learning_target = 'I can write a letter that requests specific information and tells the reader how to reply.',
  lesson_summary = 'Students ask the city engineer three facts about a flooded crosswalk and leave orders out of the letter. About 20 minutes.'
WHERE standard = 'ELA.5.12D-AD';

UPDATE cases SET
  learning_target = 'I can summarize a text without changing its meaning.',
  lesson_summary = 'Students summarize a bike-lane article and keep a cars-are-banned rumor out of the summary. About 20 minutes.'
WHERE standard = 'ELA.5.7D-AD';

UPDATE cases SET
  learning_target = 'I can decide which source is credible enough to answer a question.',
  lesson_summary = 'Students compare four sources about a May 4 flood and use the dated photo log instead of an old website. About 20 minutes.'
WHERE standard = 'ELA.5.13D-AD';
