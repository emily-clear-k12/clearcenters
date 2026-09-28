-- Expedition Station wave 2 (Sept 27, 2026): four new full quests (15 tasks, 3 acts each).
-- Safe to run more than once.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.4.3A-XP', 'Expedition Station: The Pollen Scoops', 'expedition_station', 4, 'Math'),
  ('MA.4.3F-XP', 'Expedition Station: The Close Enough Check', 'expedition_station', 4, 'Math'),
  ('ELA.3.6F-XP', 'Expedition Station: The Missing Map', 'expedition_station', 3, 'ELAR'),
  ('SCI.4.10A-XP', 'Expedition Station: The Water Cycle Loop', 'expedition_station', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can break a fraction into a sum of smaller fractions with the same bottom number, in more than one way.',
  lesson_summary = 'A 15-task fraction quest on Lumara in 3 acts (about 15–20 minutes per act). Students mix pollen for the glow bees one scoop at a time. Challenges: The pollen gust, The dimming lamps, The queen''s flower. Main standard 4.3A; also practices 4.3B. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who add the bottom numbers when they join fractions (2/5 + 2/5 = 4/10), or who think a fraction can only be split into unit fractions one way.'
WHERE standard = 'MA.4.3A-XP';

UPDATE cases SET
  learning_target = 'I can use benchmark fractions like 0, 1/4, 1/2, 3/4, and 1 to estimate a sum or difference and tell if an answer makes sense.',
  lesson_summary = 'A 15-task fraction quest on Frostveil in 3 acts (about 15–20 minutes per act). Students check Kai''s fast fuel math with benchmarks, then find the exact answer. Main standard 4.3F; also practices 4.3G. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who accept an answer without estimating first, or who add the tops and the bottoms (3/8 + 4/8 = 7/16) and do not notice the total got smaller.'
WHERE standard = 'MA.4.3F-XP';

UPDATE cases SET
  learning_target = 'I can make inferences and prove them with clues from the text.',
  lesson_summary = 'A 15-task reading mystery on Frostveil in 3 acts (about 15–20 minutes per act). Students read crew logs, a note, field notes, and a report to figure out what happened to the missing map, highlight evidence, fix mistakes, and write a short report. Main standard 3.6F; also practices 3.7C, 3.7B, 3.3B, 3.8A, 3.8C, 3.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who pick a sentence that repeats the idea instead of one that proves it, or who choose an answer that is true about the story but is not supported by the clue asked for.'
WHERE standard = 'ELA.3.6F-XP';

UPDATE cases SET
  learning_target = 'I can describe how water moves through the water cycle, above and on Earth''s surface, and explain how the Sun''s energy makes it go.',
  lesson_summary = 'A 15-task science quest on Cloudreach in 3 acts (about 15–20 minutes per act). Students follow one tagged water drop from the ocean to the clouds and back, sort processes, read an evaporation investigation, and explain the cycle with evidence. Main standard 4.10A; also practices 4.1B, 4.1D, 4.1G, 4.2B, 4.3A, 4.3C, 4.5B, 4.5E.',
  misconception_note = 'Watch for students who think rain is brand-new water, that clouds are steam or smoke, or that the Moon (not the Sun) makes water evaporate.'
WHERE standard = 'SCI.4.10A-XP';
