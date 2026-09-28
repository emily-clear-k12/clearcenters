-- Expedition Station overnight batch (Sept 27–28, 2026). Run once in the morning; safe to run again.
-- Includes wave 5 (if add_expedition_wave5.sql was not run yet) and every quest written overnight.

-- Wave 5
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

-- Wave 6
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.4.9B-XP', 'Expedition Station: The Crew Poems', 'expedition_station', 4, 'ELAR'),
  ('SCI.4.8C-XP', 'Expedition Station: The Power Grid', 'expedition_station', 4, 'Science'),
  ('ELA.5.9D-XP', 'Expedition Station: The Glacier Files', 'expedition_station', 5, 'ELAR'),
  ('MA.3.7B-XP', 'Expedition Station: The Creature Pens', 'expedition_station', 3, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain how poets use similes, metaphors, and personification to create pictures in my mind, and I can use them in a poem of my own.',
  lesson_summary = 'A 15-task poetry quest on Lumara in 3 acts (about 15–20 minutes per act). At a garden poetry night, students read four original poems, find similes, metaphors, personification, imagery, rhyme, lines, and stanzas, explain the pictures they create, fix a poem card, and write their own lines. Main standard 4.9B; also practices 4.10D, 4.3B, 4.6F, 4.12A, 4.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who call every comparison a metaphor, mix up simile and metaphor, or read figurative lines literally.'
WHERE standard = 'ELA.4.9B-XP';

UPDATE cases SET
  learning_target = 'I can show and explain that electrical energy moves in a closed path and can make light and heat, and I can tell conductors from insulators.',
  lesson_summary = 'A 15-task science quest on Mechara in 3 acts (about 15–20 minutes per act). Students wire the outpost''s lights and heaters: they sort conductors and insulators, predict which circuits light, read simple test tables, find the gap in a broken loop, and explain how a closed circuit makes light and heat. Main standard 4.8C; also practices 4.8B, 4.1B, 4.1G, 4.2B, 4.3A, 4.3C, 4.5B, 4.5D.',
  misconception_note = 'Watch for students who think a battery needs only one wire, that the first bulb uses up the electricity, or that any material will carry electricity.'
WHERE standard = 'SCI.4.8C-XP';

UPDATE cases SET
  learning_target = 'I can find the central idea of informational text and explain how text features like timelines and sidebars and patterns like cause and effect help me understand it.',
  lesson_summary = 'A 15-task reading quest on Frostveil in 3 acts (about 15–20 minutes per act). Students read six research files about glaciers (a report, a timeline, a sidebar, cause-and-effect, problem-and-solution, and compare-and-contrast articles), find central ideas and evidence, identify structures, use a data table, and write a summary. Main standard 5.9D; also practices 5.10B, 5.10C, 5.6G, 5.6H, 5.7D, 5.3B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who assume the title is always the central idea, or who mix up causes and effects.'
WHERE standard = 'ELA.5.9D-XP';

UPDATE cases SET
  learning_target = 'I can find the perimeter of a polygon and a missing side length, and tell perimeter from area.',
  lesson_summary = 'A 15-task math quest on Solara in 3 acts (about 15–20 minutes per act). Students fence rescued animals'' pens: rectangles, triangles, pentagons, hexagons, and an L-shape. They find missing sides from a perimeter, compare pens with the same perimeter, and tell perimeter jobs from area jobs. Main standard 3.7B; also practices 3.6C. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who add only the two labeled sides of a rectangle, count the squares inside instead of the edge, or mix up meters and square meters.'
WHERE standard = 'MA.3.7B-XP';

-- Wave 7
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.3.11D-XP', 'Expedition Station: The Garbled Messages', 'expedition_station', 3, 'ELAR'),
  ('SCI.4.10B-XP', 'Expedition Station: The Canyon Makers', 'expedition_station', 4, 'Science'),
  ('ELA.4.8B-XP', 'Expedition Station: The Rival Pilots', 'expedition_station', 4, 'ELAR'),
  ('MA.4.2F-XP', 'Expedition Station: The Decimal Dials', 'expedition_station', 4, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can edit writing to fix capital letters, punctuation, verbs, pronouns, and spelling, and revise sentences so they are clear.',
  lesson_summary = 'A 15-task editing quest on Cindara in 3 acts (about 15–20 minutes per act). A lava storm scrambled the outpost''s radio messages, and students fix each one: capitals, end marks, commas in dates and lists, contractions, verb tense and agreement, pronouns, and spelling. They also combine and reorder sentences. Main standard 3.11D; also practices 3.11C. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who put commas wherever they would pause, mix up there, their, and they''re, or change correct words while editing.'
WHERE standard = 'ELA.3.11D-XP';

UPDATE cases SET
  learning_target = 'I can model and describe how weathering, erosion, and deposition by water, wind, and ice slowly change Earth''s surface.',
  lesson_summary = 'A 15-task science quest on Cindara in 3 acts (about 15–20 minutes per act). Using a time-lapse camera on a canyon, students sort weathering, erosion, and deposition, sequence ice wedging, predict where deltas form, read stream-table and canyon data, and explain slow changes to land. Main standard 4.10B; also practices 4.1B, 4.1E, 4.1G, 4.2B, 4.3A, 4.3C, 4.5A, 4.5B, 4.5G.',
  misconception_note = 'Watch for students who think weathering and erosion are the same thing, or that canyons form quickly in one flood.'
WHERE standard = 'SCI.4.10B-XP';

UPDATE cases SET
  learning_target = 'I can explain how characters interact and change, and how the setting affects what happens in a story.',
  lesson_summary = 'A 15-task reading quest on Cloudreach in 3 acts (about 15–20 minutes per act). Two rival sky pilots clash, then must work together when a storm hits the race. Students find character traits with evidence, explain how one character affects the other, trace how each pilot changes, connect the setting to the plot, and write about a character''s change. Main standard 4.8B; also practices 4.8D, 4.8C, 4.6F, 4.7C, 4.3B, 4.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who describe what a character did instead of how the character changed, or who give a trait without evidence from the text.'
WHERE standard = 'ELA.4.8B-XP';

UPDATE cases SET
  learning_target = 'I can compare and order decimals to the hundredths using grids, number lines, and money, and relate decimals to fractions.',
  lesson_summary = 'A 15-task math quest on Mechara in 3 acts (about 15–20 minutes per act). Students tune factory dials with tenths and hundredths grids, number lines, dimes and pennies, compare and order decimals, match decimals to fractions, and read points on a number line. Main standard 4.2F; also practices 4.2E, 4.2G, 4.2H. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who think a decimal with more digits is bigger (0.25 > 0.3), or who compare hundredths like whole numbers.'
WHERE standard = 'MA.4.2F-XP';
