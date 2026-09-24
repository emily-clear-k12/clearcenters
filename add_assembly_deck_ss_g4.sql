-- Assembly Deck grade 4 social studies.
-- Why Here?, A Country With No Money, The Price of a Longhorn, What Built This Town.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.
-- Two Regions, One Report (SS.4.6B-AD) is already in the library.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SS.4.2C-AD',  'Assembly Deck: Why Here?',                 'assembly_deck', 4, 'Social Studies'),
  ('SS.4.3D-AD',  'Assembly Deck: A Country With No Money',   'assembly_deck', 4, 'Social Studies'),
  ('SS.4.4B-AD',  'Assembly Deck: The Price of a Longhorn',   'assembly_deck', 4, 'Social Studies'),
  ('SS.4.11C-AD', 'Assembly Deck: What Built This Town',      'assembly_deck', 4, 'Social Studies')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can explain when, where, and why the Spanish built a mission, including who already lived there.',
  lesson_summary = 'Students explain the 1718 San Antonio River mission using water, the people already there, and the Spanish reasons. About 20 minutes.'
WHERE standard = 'SS.4.2C-AD';

UPDATE cases SET
  learning_target = 'I can describe a success and a problem of the Republic of Texas, and why annexation kept coming up.',
  lesson_summary = 'Students hold the Republic constitution beside its debt and connect annexation in 1845 to money and protection. About 20 minutes.'
WHERE standard = 'SS.4.3D-AD';

UPDATE cases SET
  learning_target = 'I can explain why cattle drives happened and what ended them.',
  lesson_summary = 'Students use the gap between a 4 dollar Texas price and a 40 dollar railhead price, then explain railroads and barbed wire. About 20 minutes.'
WHERE standard = 'SS.4.4B-AD';

UPDATE cases SET
  learning_target = 'I can explain how a water route, newcomers, and trade helped a Texas town grow.',
  lesson_summary = 'Students explain Houston in 1836 on Buffalo Bayou, the people who moved there, and the trade that followed. About 20 minutes.'
WHERE standard = 'SS.4.11C-AD';
