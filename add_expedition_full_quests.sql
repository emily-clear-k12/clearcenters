-- Expedition Station: all three acts open + first ELAR and science quests (Sept 26, 2026).
-- Run once. Safe to run again (upserts + updates only).
--   1. Adds The Dark Canopy (ELA.4.6F-XP) and The Cooling Core (SCI.5.6A-XP).
--   2. Updates the teacher lesson summary on every quest now that all 15 tasks
--      (3 acts) are playable. Students can stop after any task and come back;
--      the quest turns in when all three acts are done.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.4.6F-XP', 'Expedition Station: The Dark Canopy', 'expedition_station', 4, 'ELAR'),
  ('SCI.5.6A-XP', 'Expedition Station: The Cooling Core', 'expedition_station', 5, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can make inferences about a text and use evidence from the text to support them.',
  lesson_summary = 'A 15-task reading quest on Lumara in 3 acts (about 15–20 minutes per act). Students read short field logs and reports, highlight evidence, fix a draft, and write a short report. Challenges: What Nova suspects, The lights-off test, Send the mission report. Main standard 4.6F; also practices 4.7C, 4.11C, 4.11D, 4.3B, 4.3C, 4.8A, 4.8B, 4.7B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who pick an answer that sounds true but is not supported by the text, or who highlight a sentence that repeats the question instead of one that proves the answer.'
WHERE standard = 'ELA.4.6F-XP';

UPDATE cases SET
  learning_target = 'I can classify matter by its properties: magnetism, mass, conducting or insulating, and whether it is a solid, liquid, or gas. I can test how mixtures and solutions behave.',
  lesson_summary = 'A 15-task science quest on Cindara in 3 acts (about 15–20 minutes per act). Students sort samples by property, read data tables, test a mixture and a solution, and choose materials for a heat shield. Challenges: The supply spill, The strange result, Rebuild the shield. Main standard 5.6A; also practices 5.6B, 5.6C, 5.6D, 5.1B, 5.1C, 5.2B, 5.3A.',
  misconception_note = 'Watch for students who think all metals are magnetic, or who think salt disappears (loses its mass) when it dissolves in water.'
WHERE standard = 'SCI.5.6A-XP';

-- All six math quests: every act is now playable.
UPDATE cases SET lesson_summary = 'A 15-task fraction quest on Frostveil in 3 acts (about 15–20 minutes per act). Challenges: The cold snap, The ice quake, Restart the relay. Main standard 4.3E. Students can stop after any task and come back.'
WHERE standard = 'MA.4.3E-XP';
UPDATE cases SET lesson_summary = 'A 15-task fraction quest on Lumara in 3 acts (about 15–20 minutes per act). Challenges: The flickering lanterns, The smudged path map, Light the stage. Main standard 3.3A; also practices 3.3B, 3.3C, 3.3D, 3.7A. Students can stop after any task and come back.'
WHERE standard = 'MA.3.3A-XP';
UPDATE cases SET lesson_summary = 'A 15-task fraction quest on Cloudreach in 3 acts (about 15–20 minutes per act). Challenges: The dry spell, The storm sensors, Guide the sky whales. Main standard 3.3F; also practices 3.3G and 3.3H. Students can stop after any task and come back.'
WHERE standard = 'MA.3.3F-XP';
UPDATE cases SET lesson_summary = 'A 15-task fraction quest on Cindara in 3 acts (about 15–20 minutes per act). Challenges: The lava rises, The cracked bridges, Seal the lava lock. Main standard 4.3C; also practices 4.3D and 4.3G. Students can stop after any task and come back.'
WHERE standard = 'MA.4.3C-XP';
UPDATE cases SET lesson_summary = 'A 15-task fraction quest on Mechara in 3 acts (about 15–20 minutes per act). Challenges: The power surge, The blocked street, Restart Mechara. Main standard 5.3H; also practices 5.3K and 5.3A. Students can stop after any task and come back.'
WHERE standard = 'MA.5.3H-XP';
UPDATE cases SET lesson_summary = 'A 15-task fraction quest on Solara in 3 acts (about 15–20 minutes per act). Challenges: The storm tarps, The supply drop, The last supply drop. Main standard 5.3I; also practices 5.3J and 5.3L. Students can stop after any task and come back.'
WHERE standard = 'MA.5.3I-XP';

-- Verify (should return 8 rows):
-- SELECT standard, title, subject, grade FROM cases WHERE engine = 'expedition_station' ORDER BY subject, grade, standard;
