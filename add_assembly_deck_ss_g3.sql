-- Assembly Deck grade 3 social studies.
-- The Field Trip Fund, Who Do You Call?,
-- The Playground Rule, Two Accounts of the Same Day.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SS.3.5B-AD',  'Assembly Deck: The Field Trip Fund',            'assembly_deck', 3, 'Social Studies'),
  ('SS.3.7C-AD',  'Assembly Deck: Who Do You Call?',                'assembly_deck', 3, 'Social Studies'),
  ('SS.3.9A-AD',  'Assembly Deck: The Playground Rule',             'assembly_deck', 3, 'Social Studies'),
  ('SS.3.14B-AD', 'Assembly Deck: Two Accounts of the Same Day',    'assembly_deck', 3, 'Social Studies')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can make a simple budget that spends on needs and saves what is left.',
  lesson_summary = 'Students use a 20 dollar class jar, keep the trip costs, cut a sticker wish, and save 4 dollars. About 20 minutes.'
WHERE standard = 'SS.3.5B-AD';

UPDATE cases SET
  learning_target = 'I can match a problem to the city, the state, or the nation.',
  lesson_summary = 'Students sort trash, a state highway, and mail to another state by the level of government that does that job. About 20 minutes.'
WHERE standard = 'SS.3.7C-AD';

UPDATE cases SET
  learning_target = 'I can show good citizenship as an action, not only a feeling.',
  lesson_summary = 'Students tell the truth about a broken swing-turn rule and say what a fair next day looks like. About 20 minutes.'
WHERE standard = 'SS.3.9A-AD';

UPDATE cases SET
  learning_target = 'I can tell a primary source from a secondary source about the same event.',
  lesson_summary = 'Students compare a diary written at a flooded garden with a newspaper that was not there. About 20 minutes.'
WHERE standard = 'SS.3.14B-AD';
