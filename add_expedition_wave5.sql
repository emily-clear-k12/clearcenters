-- Expedition Station wave 5 (Sept 27, 2026): four whole-number math quests (15 tasks, 3 acts each).
-- Safe to run more than once.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.4C-XP', 'Expedition Station: The Market Stall', 'expedition_station', 3, 'Math'),
  ('MA.4.7C-XP', 'Expedition Station: The Telescope Array', 'expedition_station', 4, 'Math'),
  ('MA.3.6C-XP', 'Expedition Station: The Greenhouse Floor', 'expedition_station', 3, 'Math'),
  ('MA.3.8B-XP', 'Expedition Station: The Sighting Board', 'expedition_station', 3, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can find the value of a group of coins and bills, make change, and think about the costs and benefits of spending choices.',
  lesson_summary = 'A 15-task math quest on Solara in 3 acts (about 15–20 minutes per act). Students count coins and bills, build exact amounts in a money tray, use the fewest coins, make change by counting up, and sort planned and unplanned spending. Main standard 3.4C; also practices 3.9C and 3.4A. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who think more coins always means more money, that a bigger coin is worth more (a nickel vs. a dime), or who type cents when the answer asks for dollars.'
WHERE standard = 'MA.3.4C-XP';

UPDATE cases SET
  learning_target = 'I can measure angles in degrees with a protractor, reading the right scale, and find an unknown angle when two angles sit side by side.',
  lesson_summary = 'A 15-task math quest on Cloudreach in 3 acts (about 15–20 minutes per act). Students read a two-scale protractor, learn that a degree is 1/360 of a turn, classify angles, draw an angle of a given size, and find unknown adjacent angles while aiming telescopes at a comet. Main standard 4.7C; also practices 4.7A, 4.7B, 4.7D, 4.7E. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who read the wrong protractor scale (writing 140° for a 40° angle), or who think longer rays make a bigger angle.'
WHERE standard = 'MA.4.7C-XP';

UPDATE cases SET
  learning_target = 'I can find the area of a rectangle by multiplying the rows by the squares in each row, split an L-shape into rectangles, and show equal-area parts as unit fractions.',
  lesson_summary = 'A 15-task math quest on Lumara in 3 acts (about 15–20 minutes per act). Students tile greenhouse floors with unit squares, find missing sides, compare beds with the same area, split L-shaped floors two ways, and cut beds into equal-area parts. Main standard 3.6C; also practices 3.6D and 3.6E. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who add the side lengths (5 + 4) instead of multiplying, count only the border squares, or think equal shares must be the same shape.'
WHERE standard = 'MA.3.6C-XP';

UPDATE cases SET
  learning_target = 'I can solve one- and two-step problems using frequency tables, dot plots, pictographs, and bar graphs with scales.',
  lesson_summary = 'A 15-task math quest on Solara in 3 acts (about 15–20 minutes per act). Students read bar graphs with scales of 2, 5, 10, and 25, picture graphs with keys and half pictures, dot plots, and frequency tables about real rainforest animals, then plan a canopy tour. Main standard 3.8B; also practices 3.8A. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who count grid lines or pictures without using the scale or key, or who read a bar that falls between grid lines as the line below it.'
WHERE standard = 'MA.3.8B-XP';
