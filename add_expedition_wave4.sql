-- Expedition Station wave 4 (Sept 27, 2026): first whole-number math quests (15 tasks, 3 acts each).
-- Safe to run more than once.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.4K-XP', 'Expedition Station: The Seed Crates', 'expedition_station', 3, 'Math'),
  ('MA.3.2A-XP', 'Expedition Station: The Crystal Count', 'expedition_station', 3, 'Math'),
  ('MA.5.8C-XP', 'Expedition Station: The Radar Grid', 'expedition_station', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can solve one-step and two-step multiplication and division problems using arrays, equal groups, number lines, and facts I know.',
  lesson_summary = 'A 15-task math quest on Lumara in 3 acts (about 15–20 minutes per act). Students build arrays, skip count on a number line, share seeds into equal groups, use fact families and the turn-around property, read a picture graph, and solve two-step problems. Main standard 3.4K; also practices 3.4D, 3.4E, 3.4H, 3.4J, 3.5B. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who add the two numbers instead of multiplying (4 crates of 6 = 10), or who subtract when they should divide (24 ÷ 4 = 20).'
WHERE standard = 'MA.3.4K-XP';

UPDATE cases SET
  learning_target = 'I can build and break apart numbers with blocks, pictures, and expanded form. I can tell what a digit is worth and round numbers on a number line.',
  lesson_summary = 'A 15-task math quest on Frostveil in 3 acts (about 15–20 minutes per act). Students bundle ice crystals with base-ten blocks, regroup, write expanded form, find a digit''s value up to ten thousands, and round on a number line. Main standard 3.2A; also practices 3.2B and 3.2C. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who leave out a zero as a placeholder (3,000 + 40 + 5 written as 345), write 14 in the ones place instead of regrouping, or think a digit is worth the same in every place.'
WHERE standard = 'MA.3.2A-XP';

UPDATE cases SET
  learning_target = 'I can graph ordered pairs in the first quadrant, including points from a number pattern or an input-output table, and describe how to plot a point.',
  lesson_summary = 'A 15-task math quest on Cloudreach in 3 acts (about 15–20 minutes per act). Students drop weather probes on a coordinate grid, read labelled points, describe the plotting steps, find points on the axes, and graph points from input-output tables and rules. Main standard 5.8C; also practices 5.8A, 5.8B, 5.4C. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who switch the order of an ordered pair, plotting (5, 2) for (2, 5), or who move up before moving across.'
WHERE standard = 'MA.5.8C-XP';
