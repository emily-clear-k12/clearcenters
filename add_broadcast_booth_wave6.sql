-- Broadcast Booth wave6: SCI.4.10C-BB, SCI.4.11B-BB, SCI.4.11C-BB, SCI.4.12A-BB.
-- Playable content is in lib/cases/broadcast-booth/wave6.js.
-- Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.4.10C-BB', 'Broadcast Booth: A rainy week in the desert? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.11B-BB', 'Broadcast Booth: A day without power (Correspondent)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.11C-BB', 'Broadcast Booth: Water hiding in the rock? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.12A-BB', 'Broadcast Booth: Where does a tree get its food? (Explain)', 'broadcast_booth', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title, engine = EXCLUDED.engine, grade = EXCLUDED.grade, subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain the difference between weather and climate and use data to tell them apart.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.10C. A rainy week in El Paso is weather; about 9 inches of rain a year over 30 years is its dry climate. Houston''s wetter climate is the comparison. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'One unusual week does not change a climate. Weather changes day to day; climate is an average over many years. Rainfall numbers are 1991–2020 averages.'
WHERE standard = 'SCI.4.10C-BB';

UPDATE cases SET
  learning_target = 'I can explain why energy resources matter in daily life and how conservation, recycling, and proper disposal help the environment.',
  lesson_summary = 'Grade 4 Correspondent broadcast. TEKS 4.11B. From a street after a day-long power outage, students report what stopped working without energy and how saving energy, recycling cans, and dropping off batteries help the environment. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Electricity has to be made from an energy resource; it doesn''t just come from the wall. Recycling and conservation are different: one reuses materials, the other uses less.'
WHERE standard = 'SCI.4.11B-BB';

UPDATE cases SET
  learning_target = 'I can identify the properties of rocks, such as spaces and cracks that connect, that let them store water, oil, and natural gas.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.11C. Using the Edwards Aquifer''s limestone, sandstone, and granite, students explain how holes, cracks, and connected spaces let some rocks store water, oil, and natural gas. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'An aquifer is not an underground lake; the water fills spaces inside rock. Hard rock like granite can''t hold much because it has almost no spaces.'
WHERE standard = 'SCI.4.11C-BB';

UPDATE cases SET
  learning_target = 'I can explain how most producers make their own food using sunlight, water, and carbon dioxide, and how matter cycles between plants and animals.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.12A. Using a pecan tree, students explain how leaves use sunlight, water, and carbon dioxide to make sugar, and how oxygen and carbon dioxide cycle between plants and animals. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Plants do not get their food from the soil; soil gives water and nutrients, but the plant makes its food. The mass of a tree comes mostly from carbon dioxide in the air.'
WHERE standard = 'SCI.4.12A-BB';
