-- Expedition Station waves 12–13 (Sept 28, 2026). Safe to run again.

-- Wave 12
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.4.4D-XP', 'Expedition Station: The Cargo Bays', 'expedition_station', 4, 'Math'),
  ('ELA.4.10E-XP', 'Expedition Station: Two Sides of the Storm', 'expedition_station', 4, 'ELAR'),
  ('SCI.3.13A-XP', 'Expedition Station: The Survival Suits', 'expedition_station', 3, 'Science'),
  ('MA.5.2B-XP', 'Expedition Station: The Precision Lab', 'expedition_station', 5, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can multiply up to a four-digit number by a one-digit number and a two-digit number by a two-digit number, using mental math, partial products, area models, properties, and the standard algorithm.',
  lesson_summary = 'A 15-task math quest on Cindara in 3 acts (about 15–20 minutes per act). Students load lava freighters at the Magma Docks: they multiply by 10 and 100, estimate, fill area-model and partial-product tables, regroup with properties, use the standard algorithm, settle a crew debate about missing partial products, and repair Kai''s mistake of dropping a zero. Main standard 4.4D; also practices 4.4B and 4.4C. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who multiply only tens by tens and ones by ones (23 × 45 = 800 + 15), or who forget the zero when multiplying by the tens digit.'
WHERE standard = 'MA.4.4D-XP';

UPDATE cases SET
  learning_target = 'I can tell whether a story is told in first person or third person, and explain how the point of view changes what the reader learns.',
  lesson_summary = 'A 15-task reading quest on Cloudreach in 3 acts (about 15–20 minutes per act). Students read the same sky-reef storm told by a young reef keeper in first person, by a third-person narrator, in a news report, and in her grandfather''s journal. They use pronoun clues, sort sentences by point of view, decide what each narrator can know, rewrite sentences in the other point of view, and write a comparison. Main standard 4.10E; also practices 4.7B, 4.6F, 4.7C, 4.3B, 4.8B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who call a story first person because a character says "I" in dialogue, or who think a first-person narrator can know what other characters are thinking.'
WHERE standard = 'ELA.4.10E-XP';

UPDATE cases SET
  learning_target = 'I can explain how animal body parts, like a giraffe''s long neck or a duck''s webbed feet, help animals survive where they live, and use those ideas to design a survival suit.',
  lesson_summary = 'A 15-task science quest on Frostveil in 3 acts (about 15–20 minutes per act). The crew designs survival suits by studying real animals from the Arctic, desert, ocean, and rainforest. Students match structures to their jobs, sort structures by environment, read fox-ear and blubber-glove data, settle a debate about whether animals grow structures by trying, fix Kai''s hood design, and explain which animal structures their suit copies. Main standard 3.13A; also practices science practices 3.1–3.5.',
  misconception_note = 'Watch for students who think an animal grows a longer neck or thicker fur during its life because it tries or needs to, instead of being born with these structures.'
WHERE standard = 'SCI.3.13A-XP';

UPDATE cases SET
  learning_target = 'I can compare and order decimals to the thousandths using >, <, and =, show digit values in expanded form, and round decimals to tenths or hundredths.',
  lesson_summary = 'A 15-task math quest on Frostveil in 3 acts (about 15–20 minutes per act). In the ice lab, students read place-value tables, write decimals in expanded form, tap thousandths on zoomed-in number lines, compare and order ice-core and crystal measurements, round to tenths and hundredths, settle a debate about whether longer decimals are bigger, and repair Kai''s comparison mistake. Main standard 5.2B; also practices 5.2A and 5.2C. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who think a decimal with more digits is bigger (0.305 > 0.35), or who round twice (12.649 to 12.65 to 12.7).'
WHERE standard = 'MA.5.2B-XP';

-- Wave 13
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.4A-XP', 'Expedition Station: The Parts Depot', 'expedition_station', 3, 'Math'),
  ('ELA.3.3B-XP', 'Expedition Station: The Word Garden', 'expedition_station', 3, 'ELAR'),
  ('SCI.4.6B-XP', 'Expedition Station: The Mixing Lab', 'expedition_station', 4, 'Science'),
  ('SCI.3.7A-XP', 'Expedition Station: The Push and Pull Yard', 'expedition_station', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can add and subtract within 1,000 using place value, number lines, and equations, and I can estimate to check if my answer makes sense.',
  lesson_summary = 'A 15-task math quest on Mechara in 3 acts (about 15–20 minutes per act). Students restock a robot-parts depot: they build sums and differences with base-ten blocks, jump on open number lines, round to estimate, match strip diagrams to equations, read inventory tables, settle a debate about subtracting across a zero, and repair Kai''s regrouping mistake. Main standard 3.4A; also practices 3.4B and 3.5A. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who subtract the smaller digit from the larger in each place (503 − 278 = 375), or who forget to regroup when adding (467 + 285 = 642).'
WHERE standard = 'MA.3.4A-XP';

UPDATE cases SET
  learning_target = 'I can use clues in and around a sentence to figure out new words and words with more than one meaning, and use prefixes, suffixes, synonyms, antonyms, and idioms to understand words.',
  lesson_summary = 'A 15-task word-study quest on Lumara in 3 acts (about 15–20 minutes per act). Students read an original gardener''s guide, story, and newsletter from the glowing garden. They use context clues, sort multiple-meaning words, find affix meanings, build words, pick synonyms and antonyms, spot idioms and homographs, fix wrongly used words, and write a sentence with a new word. Main standard 3.3B; also practices 3.3C and 3.3D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think a word has only one meaning, or who skip hard words instead of looking for clues in nearby sentences.'
WHERE standard = 'ELA.3.3B-XP';

UPDATE cases SET
  learning_target = 'I can investigate and compare mixtures, including solutions of liquids in liquids and solids in liquids, separate mixtures, and show that matter is conserved when mixtures form.',
  lesson_summary = 'A 15-task science quest on Cloudreach in 3 acts (about 15–20 minutes per act). In the crew''s lab, students sort mixtures and solutions, test what dissolves, order the steps to separate a spilled mixture, read balance logs that show mass is conserved, plan a fair test of stirring and temperature, settle a debate about whether dissolved sugar weighs anything, and fix Kai''s conclusion from an open dish that lost water. Main standard 4.6B; also practices 4.6C, 4.1B, 4.1D, 4.2B, 4.3A, 4.3C, 4.5B, 4.5E.',
  misconception_note = 'Watch for students who think dissolved salt or sugar disappears or weighs nothing, or who mix up dissolving and melting.'
WHERE standard = 'SCI.4.6B-XP';

UPDATE cases SET
  learning_target = 'I can show and describe forces that act by touching, like pushes and pulls, and forces that act at a distance, like magnetism and gravity, and test how pushes and pulls change the way things move.',
  lesson_summary = 'A 15-task science quest on Mechara in 3 acts (about 15–20 minutes per act). In a robot training yard, students sort pushes and pulls and contact and at-a-distance forces, predict how forces start, stop, speed up, slow down, or turn objects, read cart and launcher data, test magnets, explore gravity, settle a debate about whether heavy things fall faster, fix Kai''s push, and design a fair magnet test. Main standard 3.7A; also practices 3.7B and science practices 3.1–3.5.',
  misconception_note = 'Watch for students who think heavier objects fall much faster, that magnets attract all metals, or that a push is used up as an object moves.'
WHERE standard = 'SCI.3.7A-XP';
