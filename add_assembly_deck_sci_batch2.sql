-- Assembly Deck science, second batch. Standards not already on the deck.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.7B-AD',  'Assembly Deck: The Wagon That Moved',    'assembly_deck', 3, 'Science'),
  ('3.8A-AD',  'Assembly Deck: Four Kinds of Energy',    'assembly_deck', 3, 'Science'),
  ('3.9A-AD',  'Assembly Deck: Who Goes Around Whom',    'assembly_deck', 3, 'Science'),
  ('3.12C-AD', 'Assembly Deck: After the Flood',         'assembly_deck', 3, 'Science'),
  ('4.8C-AD',  'Assembly Deck: The Closed Path',         'assembly_deck', 4, 'Science'),
  ('4.9A-AD',  'Assembly Deck: The Daylight Log',        'assembly_deck', 4, 'Science'),
  ('4.10A-AD', 'Assembly Deck: The Puddle''s Trip',      'assembly_deck', 4, 'Science'),
  ('4.10C-AD', 'Assembly Deck: Tuesday Is Not the Climate','assembly_deck', 4, 'Science'),
  ('5.8B-AD',  'Assembly Deck: The Spinning Motor',      'assembly_deck', 5, 'Science'),
  ('5.9-AD',   'Assembly Deck: Shadows Move',            'assembly_deck', 5, 'Science'),
  ('5.10A-AD', 'Assembly Deck: Heat From the Ocean',     'assembly_deck', 5, 'Science'),
  ('5.12A-AD', 'Assembly Deck: The Pond Tank',           'assembly_deck', 5, 'Science')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can explain how a push or a pull changes position and motion.',
  lesson_summary = 'Students assemble a wagon test: a push starts the roll, and a pull stops it. About 20 minutes.'
WHERE standard = '3.7B-AD';

UPDATE cases SET
  learning_target = 'I can identify light, sound, thermal, and mechanical energy.',
  lesson_summary = 'Students sort a lamp, a bell, a warm mug, and a rolling ball into four forms of energy. About 20 minutes.'
WHERE standard = '3.8A-AD';

UPDATE cases SET
  learning_target = 'I can describe the orbits of Earth and the Moon.',
  lesson_summary = 'Students assemble a model where Earth orbits the Sun and the Moon orbits Earth. About 20 minutes.'
WHERE standard = '3.9A-AD';

UPDATE cases SET
  learning_target = 'I can describe how a flood can make organisms thrive, perish, or move.',
  lesson_summary = 'Students assemble a flood report: plants thrived, some insects perished, and deer moved uphill. About 20 minutes.'
WHERE standard = '3.12C-AD';

UPDATE cases SET
  learning_target = 'I can explain that electrical energy needs a closed path and can become light or thermal energy.',
  lesson_summary = 'Students assemble a circuit test: an open path stays dark, and a closed path makes light and heat. About 20 minutes.'
WHERE standard = '4.8C-AD';

UPDATE cases SET
  learning_target = 'I can describe a seasonal pattern in temperature and length of daylight.',
  lesson_summary = 'Students use a log of short, cold winter days and long, warm summer days to predict the next season. About 20 minutes.'
WHERE standard = '4.9A-AD';

UPDATE cases SET
  learning_target = 'I can describe the water cycle and the sun as its energy source.',
  lesson_summary = 'Students follow a puddle into vapor, a cloud, rain, and a creek, with the sun supplying the energy. About 20 minutes.'
WHERE standard = '4.10A-AD';

UPDATE cases SET
  learning_target = 'I can tell weather from climate.',
  lesson_summary = 'Students separate a rainy Tuesday from the long pattern of hot, dry summers. About 20 minutes.'
WHERE standard = '4.10C-AD';

UPDATE cases SET
  learning_target = 'I can explain how a complete circuit transforms electrical energy into motion.',
  lesson_summary = 'Students assemble a motor test: a complete circuit spins the motor, and an open switch stops it. About 20 minutes.'
WHERE standard = '5.8B-AD';

UPDATE cases SET
  learning_target = 'I can explain how Earth rotation causes day, night, and changing shadows.',
  lesson_summary = 'Students connect one about-24-hour rotation to day, night, and a shadow that changes from long to short. About 20 minutes.'
WHERE standard = '5.9-AD';

UPDATE cases SET
  learning_target = 'I can explain how the sun and the ocean interact in the water cycle and affect weather.',
  lesson_summary = 'Students give the sun the energy job and the ocean the water job, then connect the vapor to storms. About 20 minutes.'
WHERE standard = '5.10A-AD';

UPDATE cases SET
  learning_target = 'I can describe how organisms survive using biotic and abiotic factors.',
  lesson_summary = 'Students sort a tank into living factors and nonliving factors, then explain why a fish needs both. About 20 minutes.'
WHERE standard = '5.12A-AD';
