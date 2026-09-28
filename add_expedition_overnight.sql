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

-- Wave 8
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.5.8B-XP', 'Expedition Station: The Crew Conflict', 'expedition_station', 5, 'ELAR'),
  ('SCI.3.9A-XP', 'Expedition Station: The Orbit Model', 'expedition_station', 3, 'Science'),
  ('ELA.3.8B-XP', 'Expedition Station: The New Crew Member', 'expedition_station', 3, 'ELAR'),
  ('MA.5.3C-XP', 'Expedition Station: The Freight Split', 'expedition_station', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can analyze how characters relate to each other and the conflicts between them, and how the setting shapes the plot.',
  lesson_summary = 'A 15-task reading quest on Cindara in 3 acts (about 15–20 minutes per act). Three junior volcano scientists argue about staying or leaving as a volcano rumbles. Students sort types of conflict, trace how relationships change, explain motivations, connect the setting and the town''s history to the plot, fix a summary, and write an analysis. Main standard 5.8B; also practices 5.8D, 5.8C, 5.6F, 5.7C, 5.3B, 5.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who name a conflict without explaining how it affects the characters'' relationship, or who judge a character without evidence.'
WHERE standard = 'ELA.5.8B-XP';

UPDATE cases SET
  learning_target = 'I can build and explain models of how the Earth orbits the Sun and the Moon orbits the Earth, and I can put the planets in order from the Sun.',
  lesson_summary = 'A 15-task science quest on Cloudreach in 3 acts (about 15–20 minutes per act). Using the reef telescope, students choose correct Sun-Earth-Moon models, order the planets, sort what orbits what, read orbit-time tables, fix a wrong model, and explain the limits of models. Main standard 3.9A; also practices 3.9B, 3.1E, 3.1G, 3.2B, 3.2C, 3.3A, 3.3B, 3.3C, 3.5A, 3.5D, 3.5F.',
  misconception_note = 'Watch for students who think the Sun goes around the Earth because it moves across the sky, or who mix up a day (one spin) with a year (one orbit).'
WHERE standard = 'SCI.3.9A-XP';

UPDATE cases SET
  learning_target = 'I can explain how the main characters and the smaller characters in a story are connected and how their relationships change.',
  lesson_summary = 'A 15-task reading quest on Mechara in 3 acts (about 15–20 minutes per act). A new little robot joins the crew, makes mistakes, and saves the day in a city power outage with help from a grumpy old delivery bot. Students tell major from minor characters, find evidence of how characters feel about each other, explain how the setting drives the plot, fix a note, and write about a relationship that changed. Main standard 3.8B; also practices 3.8D, 3.8C, 3.6F, 3.7C, 3.7B, 3.3B, 3.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think a minor character does not matter to the plot, or who call a grumpy character a bad character without looking at what he does.'
WHERE standard = 'ELA.3.8B-XP';

UPDATE cases SET
  learning_target = 'I can divide up to four-digit numbers by two-digit numbers, estimate to check, and decide what to do with a remainder.',
  lesson_summary = 'A 15-task math quest on Cindara in 3 acts (about 15–20 minutes per act). Students split lava-rock shipments into freighters: they estimate with compatible numbers, divide with partial quotients and area models, check with multiplication, and decide whether to round up, drop, or report the remainder. Main standard 5.3C; also practices 5.3A and 5.3B. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who leave a zero out of the quotient (2,448 ÷ 24 = 12), keep a remainder bigger than the divisor, or always drop the remainder even when more freighters are needed.'
WHERE standard = 'MA.5.3C-XP';

-- Wave 9
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.3.6G-XP', 'Expedition Station: The Big Idea Board', 'expedition_station', 3, 'ELAR'),
  ('SCI.5.12A-XP', 'Expedition Station: The Ecosystem Balance', 'expedition_station', 5, 'Science'),
  ('ELA.4.9E-XP', 'Expedition Station: The Outpost Debate', 'expedition_station', 4, 'ELAR'),
  ('MA.4.5B-XP', 'Expedition Station: The Pattern Machine', 'expedition_station', 4, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can decide which details are most important to find the key idea, and retell a text in my own words in order.',
  lesson_summary = 'A 15-task reading quest on Cloudreach in 3 acts (about 15–20 minutes per act). Students read Nova''s field-guide entries about real animals (manta rays, monarch butterflies, Arctic terns, flying fish), find key ideas, sort important and interesting details, pick the best retelling, fix a summary, and write their own. Main standard 3.6G; also practices 3.7D, 3.9D, 3.6F, 3.7C, 3.3B, 3.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who choose the most exciting detail as the key idea, or whose summaries include small details and miss the main point.'
WHERE standard = 'ELA.3.6G-XP';

UPDATE cases SET
  learning_target = 'I can describe how living things in an ecosystem survive by interacting with living and nonliving factors, and predict what happens when the ecosystem changes.',
  lesson_summary = 'A 15-task science quest on Solara in 3 acts (about 15–20 minutes per act). In a real rainforest ecosystem, students sort biotic and abiotic factors, identify producers, consumers, and decomposers, trace energy and matter, read population and decomposition data, fix a backward food web, and predict the effects of a long dry season. Main standard 5.12A; also practices 5.12B, 5.1A, 5.2B, 5.2D, 5.3A, 5.3B, 5.3C, 5.5E, 5.5F, 5.5G.',
  misconception_note = 'Watch for students who draw food web arrows from eater to food, think decomposers are unimportant, or think nonliving factors do not affect animals.'
WHERE standard = 'SCI.5.12A-XP';

UPDATE cases SET
  learning_target = 'I can find the claim in an argument, explain how facts support it, and tell who the author is writing for.',
  lesson_summary = 'A 15-task reading quest on Frostveil in 3 acts (about 15–20 minutes per act). The crew must decide whether to move camp before winter. Students find claims, sort facts and opinions, spot weak reasons, use a wind-and-snow data table, identify the audience of a letter and a poster, and write a short argument. Main standard 4.9E; also practices 4.10A, 4.6F, 4.7C, 4.3B, 4.11D, 4.12C. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think exclamation points or strong words make an argument stronger than facts do, or who mix up facts and opinions.'
WHERE standard = 'ELA.4.9E-XP';

UPDATE cases SET
  learning_target = 'I can use an input-output table and a rule to find a number pattern, and use a letter for an unknown in an equation.',
  lesson_summary = 'A 15-task math quest on Mechara in 3 acts (about 15–20 minutes per act). Students crack assembly-line rules: they find missing values in input-output tables, choose the rule that connects position and value, jump to far positions, find the position for a value, and solve multi-step equations with a letter for the unknown. Main standard 4.5B; also practices 4.5A. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who describe only how values grow from one to the next (add 4) instead of the rule connecting position and value (multiply by 4), or who apply a rule to the previous value.'
WHERE standard = 'MA.4.5B-XP';

-- Wave 10
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.5.6H-XP', 'Expedition Station: The Three Reports', 'expedition_station', 5, 'ELAR'),
  ('SCI.4.12A-XP', 'Expedition Station: The Greenhouse Test', 'expedition_station', 4, 'Science'),
  ('ELA.3.9E-XP', 'Expedition Station: The Trader''s Pitch', 'expedition_station', 3, 'ELAR'),
  ('MA.3.4G-XP', 'Expedition Station: The Rover Convoy', 'expedition_station', 3, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can put together information from different sources to understand something new, and explain it in my own words.',
  lesson_summary = 'A 15-task reading quest on Cloudreach in 3 acts (about 15–20 minutes per act). Students read three original reports about one hurricane (a science report, a news report, and a pilot''s journal), find what each source adds, spot where they agree, and combine details to explain things no single report explains alone. Main standard 5.6H; also practices 5.7B, 5.6G, 5.7C, 5.9D, 5.13C, 5.13E, 5.3B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who summarize one source at a time instead of connecting them, or who treat a firsthand account and a science report as saying the same kind of thing.'
WHERE standard = 'ELA.5.6H-XP';

UPDATE cases SET
  learning_target = 'I can investigate and explain how plants make their own food using sunlight, water, and carbon dioxide, and how matter cycles between plants and animals.',
  lesson_summary = 'A 15-task science quest on Lumara in 3 acts (about 15–20 minutes per act). Students sort producers and consumers, name what plants take in and give off, read plant-growth and greenhouse air-sensor data, plan fair tests with one changed variable, settle a crew debate about whether plants get food from the soil, fix Kai''s rushed conclusion from a light test, and trace carbon dioxide and oxygen between plants and animals. Main standard 4.12A; also practices 4.1B, 4.1E, 4.2B, 4.2C, 4.2D, 4.3A, 4.3B, 4.3C, 4.5B, 4.5E.',
  misconception_note = 'Watch for students who think plants get their food from the soil, or who think plants take in oxygen and give off carbon dioxide for making food.'
WHERE standard = 'SCI.4.12A-XP';

UPDATE cases SET
  learning_target = 'I can find the claim in a pitch, tell facts from opinions, and name who the writer is talking to. I can write my own opinion with a reason.',
  lesson_summary = 'A 15-task reading quest on Mechara in 3 acts (about 15–20 minutes per act). Traders pitch gadgets to the crew in original ads, letters, and posters. Students find each claim, sort facts from opinions, spot reasons that do not support the claim, name the audience, and write their own opinion with a reason. Main standard 3.9E; also practices 3.10A, 3.6F, 3.7C, 3.3B, 3.11D, 3.12C. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think any sentence that sounds exciting or certain is a fact, or who pick a reason that is interesting but does not support the claim.'
WHERE standard = 'ELA.3.9E-XP';

UPDATE cases SET
  learning_target = 'I can multiply a two-digit number by a one-digit number using partial products, properties, and the standard algorithm, and tell if a product is even or odd.',
  lesson_summary = 'A 15-task math quest on Frostveil in 3 acts (about 15–20 minutes per act). Students load a rover convoy: they estimate, break two-digit numbers into tens and ones, fill partial-product load charts, use the standard algorithm with regrouping, repair Kai''s multiplying mistake, and decide whether products are even or odd. Main standard 3.4G; also practices 3.4F and 3.4I. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who multiply only the ones and write the tens digit down unchanged (6 × 24 = 124), or who forget to add the regrouped ten.'
WHERE standard = 'MA.3.4G-XP';

-- Wave 11
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.7C-XP', 'Expedition Station: The Launch Schedule', 'expedition_station', 3, 'Math'),
  ('ELA.3.8A-XP', 'Expedition Station: The Fable Fire', 'expedition_station', 3, 'ELAR'),
  ('SCI.3.12B-XP', 'Expedition Station: The Food Chain Crew', 'expedition_station', 3, 'Science'),
  ('SCI.4.9B-XP', 'Expedition Station: The Moon Watch', 'expedition_station', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can add and subtract time in minutes using a time line. I can find when something starts, when it ends, and how long it lasts.',
  lesson_summary = 'A 15-task math quest on Cloudreach in 3 acts (about 15–20 minutes per act). On Launch Day, students jump along minute time lines to add and subtract time intervals, find start times, end times, and elapsed time, read a flight board, repair Kai''s mistake of subtracting clock times like regular numbers, and plan a full launch schedule. Main standard 3.7C; also practices 3.4A. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who subtract clock times like whole numbers (2:10 − 1:50 = 60 minutes) or who forget that the hour changes after 60 minutes, not 100.'
WHERE standard = 'MA.3.7C-XP';

UPDATE cases SET
  learning_target = 'I can figure out the theme of a story and tell it apart from the topic. I can tell fables, folktales, and fairy tales apart.',
  lesson_summary = 'A 15-task reading quest on Cindara in 3 acts (about 15–20 minutes per act). Around a lava-rock fire, students read four original tales (two fables, a folktale, and a fairy tale), sort theme statements from topic words, find evidence sentences, compare tales with the same theme, tell the genres apart, and write a theme statement. Main standard 3.8A; also practices 3.9A, 3.6F, 3.7C, 3.3B, 3.8B, 3.8C, 3.7B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who give a one-word topic (friendship) as the theme, or who retell what happens instead of stating the lesson.'
WHERE standard = 'ELA.3.8A-XP';

UPDATE cases SET
  learning_target = 'I can describe how energy flows from the Sun through a food chain and predict what happens when a living thing is removed or when a flood or drought changes an ecosystem.',
  lesson_summary = 'A 15-task science quest on Solara in 3 acts (about 15–20 minutes per act). Studying real Earth ponds, grasslands, fields, and oceans, students sort producers, consumers, and decomposers, order food chains starting from the Sun, settle a crew debate about which way the arrows point, read population data, repair Kai''s sort of producers, consumers, and decomposers, and predict what happens when frogs, bees, or sea otters disappear or when floods and droughts hit. Main standard 3.12B; also practices 3.12C and science practices 3.1–3.5.',
  misconception_note = 'Watch for students who draw arrows from the eater to the food, or who think removing one animal affects only the animal that eats it.'
WHERE standard = 'SCI.3.12B-XP';

UPDATE cases SET
  learning_target = 'I can collect and study Moon data to put the Moon''s phases in order, and use the pattern to predict how the Moon will look from Earth.',
  lesson_summary = 'A 15-task science quest on Lumara in 3 acts (about 15–20 minutes per act). The crew logs Earth''s Moon for two months. Students order the eight phases, sort waxing and waning Moons, count days between phases, fill gaps in a cloudy log, fix Kai''s phase names, settle a debate about whether Earth''s shadow causes phases, and predict the next full moon. Main standard 4.9B; also practices science practices 4.1–4.5.',
  misconception_note = 'Watch for students who think Earth''s shadow causes the Moon''s phases, or who mix up waxing and waning.'
WHERE standard = 'SCI.4.9B-XP';
