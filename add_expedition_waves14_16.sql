-- Expedition Station waves 14–16 (Sept 28, 2026). Safe to run again.

-- Wave 14
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.3.12D-XP', 'Expedition Station: The Fossil Dig', 'expedition_station', 3, 'Science'),
  ('SCI.4.9A-XP', 'Expedition Station: The Season Tracker', 'expedition_station', 4, 'Science'),
  ('ELA.3.9D-XP', 'Expedition Station: The Field Guide', 'expedition_station', 3, 'ELAR'),
  ('MA.4.5D-XP', 'Expedition Station: The Garden Plots', 'expedition_station', 4, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain how fossils show what living things and places were like long ago.',
  lesson_summary = 'A 15-task science quest on Cindara in 3 acts (about 15–20 minutes per act). Earth sends rock crates for a Fossil Hall. Students sort body and trace fossils, order the steps of how a fossil forms, read rock-layer cores (oldest at the bottom), study Texas dinosaur tracks and ancient sea fossils, settle debates about whether fossils are only dinosaur bones and whether people lived with dinosaurs, fix Kai''s exhibit sign, and explain how one place changed over time. Main standard 3.12D; also practices science practices 3.1–3.5.',
  misconception_note = 'Watch for students who think all fossils are dinosaur bones, that the top rock layer is the oldest, or that people lived at the same time as dinosaurs.'
WHERE standard = 'SCI.3.12D-XP';

UPDATE cases SET
  learning_target = 'I can use temperature and daylight data to put the seasons in order and predict how they will change.',
  lesson_summary = 'A 15-task science quest on Frostveil in 3 acts (about 15–20 minutes per act). The crew reads Earth weather-station data from Austin, Texas, Fairbanks, Alaska, and a station in Australia. Students order the seasons, read daylight and temperature tables and bar graphs, predict next month''s values, compare places near and far from the equator, settle a debate about whether summer happens because Earth is closer to the Sun, and fix Kai''s misread table. Main standard 4.9A; also practices science practices 4.1–4.5.',
  misconception_note = 'Watch for students who think summer happens because Earth is closer to the Sun, or that the length of daylight stays the same all year.'
WHERE standard = 'SCI.4.9A-XP';

UPDATE cases SET
  learning_target = 'I can find the central idea of informational text and explain how text features and patterns like cause and effect and problem and solution help me understand it.',
  lesson_summary = 'A 15-task reading quest on Solara in 3 acts (about 15–20 minutes per act). Nova writes an original field guide to real rainforest plants and animals. Students find central ideas with evidence, use headings, bold words, bullets, captions, a timeline, and a table, sort features by their job, identify cause-and-effect and problem-and-solution patterns, fix a heading on Kai''s page, and write about how a feature helps a reader. Main standard 3.9D; also practices 3.10C, 3.6G, 3.7C, 3.3B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think the title always states the central idea, or who skip text features as decoration.'
WHERE standard = 'ELA.3.9D-XP';

UPDATE cases SET
  learning_target = 'I can use formulas to find the perimeter and area of rectangles and solve problems with them.',
  lesson_summary = 'A 15-task math quest on Lumara in 3 acts (about 15–20 minutes per act). Students fence and plant garden plots: they use 2l + 2w, 4s, and l × w, find missing sides, compare plots with the same area but different fences, sort perimeter jobs from area jobs, settle a debate about whether perimeter and area are the same, repair Kai''s fence order, and solve multi-step fence-cost and seed-packet problems. Main standard 4.5D; also practices 4.5C. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who add length and width for perimeter (only two sides), mix up perimeter and area, or think a bigger perimeter always means a bigger area.'
WHERE standard = 'MA.4.5D-XP';

-- Wave 15
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.3.8C-XP', 'Expedition Station: The Lost Rover', 'expedition_station', 3, 'ELAR'),
  ('SCI.4.12B-XP', 'Expedition Station: The Web of Life', 'expedition_station', 4, 'Science'),
  ('SCI.5.8C-XP', 'Expedition Station: The Light Lab', 'expedition_station', 5, 'Science'),
  ('MA.5.3E-XP', 'Expedition Station: The Fuel Price', 'expedition_station', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain the sequence of events, the conflict, and the resolution in a story.',
  lesson_summary = 'A 15-task reading quest on Frostveil in 3 acts (about 15–20 minutes per act). Students read an original four-part story about a young helper searching for a lost rover in a snowstorm, plus a short story about two friends and one block of ice. They find the conflict, order events, pick the turning point and resolution, trace cause and effect, sort beginning, middle, and end, settle a debate about whether a story needs a bad guy to have a conflict, fix Kai''s retelling, and write their own. Main standard 3.8C; also practices 3.10B, 3.6F, 3.7C, 3.7D, 3.3B, 3.8B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think a conflict needs a villain, or who treat the last sentence as the resolution without checking how the problem was solved.'
WHERE standard = 'ELA.3.8C-XP';

UPDATE cases SET
  learning_target = 'I can describe how energy flows and matter cycles through a food web, including the roles of the Sun, producers, consumers, and decomposers.',
  lesson_summary = 'A 15-task science quest on Solara in 3 acts (about 15–20 minutes per act). Using real Texas salt marsh, desert, forest, and Gulf food webs, students sort roles, count the food chains that pass through one animal, trace energy back to the Sun, sort matter cycling from one-way energy flow, predict how a population change spreads through a web, fix Kai''s mistake about a black bear, and explain why blue crabs matter to a marsh. Main standard 4.12B; also practices science practices 4.1–4.5.',
  misconception_note = 'Watch for students who think energy is recycled like matter, who leave decomposers out of the web, or who think a change affects only one link.'
WHERE standard = 'SCI.4.12B-XP';

UPDATE cases SET
  learning_target = 'I can show that light travels in a straight line until it hits an object and is reflected, refracted, or absorbed.',
  lesson_summary = 'A 15-task science quest on Lumara in 3 acts (about 15–20 minutes per act). In the garden''s light lab, students sort reflection, refraction, and absorption, test straight-line travel with cards and shadows, sort transparent, translucent, and opaque materials, explain the bent pencil and the prism, read a black-and-white cloth temperature test, settle a debate about whether eyes send out light, fix Kai''s clear sun shade, and use mirrors to send a beam around a wall. Main standard 5.8C; also practices science practices 5.1–5.3.',
  misconception_note = 'Watch for students who think we see because light comes out of our eyes, or that a mirror makes its own light.'
WHERE standard = 'SCI.5.8C-XP';

UPDATE cases SET
  learning_target = 'I can multiply decimals to the hundredths, including money, using place value, area models, and what I know about whole-number multiplication.',
  lesson_summary = 'A 15-task math quest on Mechara in 3 acts (about 15–20 minutes per act). At the Sprocket Bazaar, students multiply prices and lengths with tile grids and area models, use whole-number facts to place the decimal point, estimate to check, sort products bigger or smaller than the first factor, settle a debate about whether multiplying always makes a number bigger, fix Kai''s grease bill, and total a shopping trip with change. Main standard 5.3E; also practices 5.3D. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who think multiplying always makes a number bigger, or who place the decimal point by lining up digits (0.4 × 0.2 = 0.8).'
WHERE standard = 'MA.5.3E-XP';

-- Wave 16
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.2D-XP', 'Expedition Station: The Signal Race', 'expedition_station', 3, 'Math'),
  ('ELA.4.6G-XP', 'Expedition Station: The Summit Summary', 'expedition_station', 4, 'ELAR'),
  ('SCI.4.11A-XP', 'Expedition Station: The Energy Choice', 'expedition_station', 4, 'Science'),
  ('SCI.3.8A-XP', 'Expedition Station: The Energy Hunt', 'expedition_station', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can compare and order whole numbers up to 100,000 using >, <, and =, and find numbers on a number line to round them.',
  lesson_summary = 'A 15-task math quest on Cloudreach in 3 acts (about 15–20 minutes per act). Sky racers send signal scores. Students compare numbers in place-value tables, pick >, <, or =, order scores, sort them against a benchmark, tap number lines to locate and round to the nearest ten, hundred, thousand, and ten thousand, settle a debate about comparing by the first digit, and fix Kai''s comparison mistake. Main standard 3.2D; also practices 3.2C. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who compare the first digits without lining up place values (9,876 > 12,345 because 9 > 1), or who start comparing at the ones place.'
WHERE standard = 'MA.3.2D-XP';

UPDATE cases SET
  learning_target = 'I can decide which details are important to find the key idea, and paraphrase and summarize a text in a way that keeps its meaning and order.',
  lesson_summary = 'A 15-task reading quest on Frostveil in 3 acts (about 15–20 minutes per act). Before climbing the ice summit, the crew reads original articles about real Earth mountains: how they form, why the tops are cold, thin air, mountain animals, and the first climb of Everest. Students find key ideas with evidence, sort important and minor details, order summary sentences, choose paraphrases, fix Kai''s summary, and write their own. Main standard 4.6G; also practices 4.7D, 4.6F, 4.7C, 4.9D, 4.3B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think a summary should include every detail, who pick the most exciting detail as the key idea, or who add their own opinion to a summary.'
WHERE standard = 'ELA.4.6G-XP';

UPDATE cases SET
  learning_target = 'I can identify renewable and nonrenewable resources and explain the advantages and disadvantages of using them.',
  lesson_summary = 'A 15-task science quest on Mechara in 3 acts (about 15–20 minutes per act). The city council must choose how to power a new district. Students sort renewable and nonrenewable resources, match resources to everyday uses, read pros-and-cons, wind, and solar tables, sort conservation habits, settle a debate about whether natural gas is renewable, fix Kai''s claim that a dam has no disadvantages, and recommend a mix of resources. Main standard 4.11A; also practices 4.11B, 4.11C, and science practices 4.1–4.5.',
  misconception_note = 'Watch for students who think renewable resources have no disadvantages, or that natural gas is renewable because it is "natural."'
WHERE standard = 'SCI.4.11A-XP';

UPDATE cases SET
  learning_target = 'I can find everyday examples of light, sound, and thermal energy, and explain that sound comes from vibrations, light comes from a source, and heat moves from warmer things to cooler things.',
  lesson_summary = 'A 15-task science quest on Lumara in 3 acts (about 15–20 minutes per act). The crew hunts for energy around the garden outpost. Students sort light, sound, and thermal examples, find light sources, show that vibrations make sound, read cocoa-cooling and sunny-versus-shady temperature tables, settle a debate about whether cold moves into your hand, fix Kai''s silent bell, and explain the energy a campfire gives off. Main standard 3.8A; also practices science practices 3.1–3.5.',
  misconception_note = 'Watch for students who think cold moves from ice into their hand, or who call a mirror or the Moon a light source.'
WHERE standard = 'SCI.3.8A-XP';
