-- Assembly Deck grade 5 science.
-- The Sorting Table, The Bent Straw, The Bay After the Storm, Reading a Canyon.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('5.6B-AD',  'Assembly Deck: The Sorting Table',         'assembly_deck', 5, 'Science'),
  ('5.8C-AD',  'Assembly Deck: The Bent Straw',            'assembly_deck', 5, 'Science'),
  ('5.12B-AD', 'Assembly Deck: The Bay After the Storm',   'assembly_deck', 5, 'Science'),
  ('5.10C-AD', 'Assembly Deck: Reading a Canyon',          'assembly_deck', 5, 'Science')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can explain that a mixture can be separated and that its parts keep their own properties.',
  lesson_summary = 'Students assemble a sorting log for iron filings and sand, then show that mixing did not make a new substance. About 20 minutes.'
WHERE standard = '5.6B-AD';

UPDATE cases SET
  learning_target = 'I can explain that light travels in a straight line and can be reflected, refracted, or absorbed.',
  lesson_summary = 'Students assemble a light log: a straight beam, a mirror, a bent-looking straw, and a black card. About 20 minutes.'
WHERE standard = '5.8C-AD';

UPDATE cases SET
  learning_target = 'I can predict how a change in an ecosystem affects energy flow and matter in a food web.',
  lesson_summary = 'Students assemble a bay web, then say what the fish and heron counts do after a storm tears out the marsh grass. About 20 minutes.'
WHERE standard = '5.12B-AD';

UPDATE cases SET
  learning_target = 'I can explain how water, wind, and ice shape landforms, including canyons, deltas, and dunes.',
  lesson_summary = 'Students assemble a canyon log that follows one river from the walls to the delta, then compare wind and ice. About 20 minutes.'
WHERE standard = '5.10C-AD';
