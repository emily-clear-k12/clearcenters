-- Assembly Deck grade 5 social studies.
-- Before the Shooting, What the Document Actually Says,
-- The Bill That Didn't Pass, Why the Factory Is There.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.
-- What the Expedition Was For (SS.5.4C-AD) is already in the library.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SS.5.2A-AD',  'Assembly Deck: Before the Shooting',                 'assembly_deck', 5, 'Social Studies'),
  ('SS.5.14A-AD', 'Assembly Deck: What the Document Actually Says',     'assembly_deck', 5, 'Social Studies'),
  ('SS.5.15B-AD', 'Assembly Deck: The Bill That Didn''t Pass',           'assembly_deck', 5, 'Social Studies'),
  ('SS.5.12B-AD', 'Assembly Deck: Why the Factory Is There',             'assembly_deck', 5, 'Social Studies')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can put a cause of the American Revolution before its effects.',
  lesson_summary = 'Students trace taxes after the French and Indian War, the Boston Tea Party, and the fighting in 1775. About 20 minutes.'
WHERE standard = 'SS.5.2A-AD';

UPDATE cases SET
  learning_target = 'I can explain the purpose of the Declaration of Independence, one claim it makes, and why the complaint list matters.',
  lesson_summary = 'Students keep the Declaration separate from the Constitution and use the complaint list as evidence. About 20 minutes.'
WHERE standard = 'SS.5.14A-AD';

UPDATE cases SET
  learning_target = 'I can explain how a veto and a court can check a law, and why a stopped bill can mean the system worked.',
  lesson_summary = 'Students follow one example bill through Congress, a veto, and a failed override. About 20 minutes.'
WHERE standard = 'SS.5.15B-AD';

UPDATE cases SET
  learning_target = 'I can explain how geography influenced where a factory was built.',
  lesson_summary = 'Students use river power, Boston ships, and the workers who moved to Lowell, without letting the river set the wages. About 20 minutes.'
WHERE standard = 'SS.5.12B-AD';
