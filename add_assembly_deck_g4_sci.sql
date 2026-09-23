-- Assembly Deck grade 4 science.
-- The Cold Lunchbox Job, Twenty-Eight Nights, When the Owls Left, Two Ways to Power the School.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('4.8B-AD',  'Assembly Deck: The Cold Lunchbox Job',       'assembly_deck', 4, 'Science'),
  ('4.9B-AD',  'Assembly Deck: Twenty-Eight Nights',         'assembly_deck', 4, 'Science'),
  ('4.12B-AD', 'Assembly Deck: When the Owls Left',          'assembly_deck', 4, 'Science'),
  ('4.11B-AD', 'Assembly Deck: Two Ways to Power the School','assembly_deck', 4, 'Science')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can tell a thermal insulator from a conductor and say which material also conducts electricity.',
  lesson_summary = 'Students assemble a lunch-box test, use the temperatures, and choose foam for heat and metal for electrical energy. About 20 minutes.'
WHERE standard = '4.8B-AD';

UPDATE cases SET
  learning_target = 'I can describe a Moon pattern from observations and predict the next look.',
  lesson_summary = 'Students assemble a 28-night Moon log, name the repeating pattern, and predict the next week. About 20 minutes.'
WHERE standard = '4.9B-AD';

UPDATE cases SET
  learning_target = 'I can describe how energy and matter move in a food web, including producers, consumers, and decomposers.',
  lesson_summary = 'Students assemble a meadow web, then explain what the counts do after the owls leave. About 20 minutes.'
WHERE standard = '4.12B-AD';

UPDATE cases SET
  learning_target = 'I can explain how an energy resource matters and how conservation, disposal, and recycling affect the environment.',
  lesson_summary = 'Students compare a gas-plant line with solar panels and separate slogans from the trade-offs. About 20 minutes.'
WHERE standard = '4.11B-AD';
