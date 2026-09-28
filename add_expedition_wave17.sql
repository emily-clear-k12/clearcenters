-- Expedition Station wave 17 (Sept 28, 2026). Safe to run again.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.4.4F-XP', 'Expedition Station: The Sharing Station', 'expedition_station', 4, 'Math'),
  ('ELA.3.9B-XP', 'Expedition Station: The Sky Songs', 'expedition_station', 3, 'ELAR'),
  ('SCI.4.13A-XP', 'Expedition Station: The Plant Survivors', 'expedition_station', 4, 'Science'),
  ('SCI.5.7A-XP', 'Expedition Station: The Tug-of-War', 'expedition_station', 5, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can divide a number up to four digits by a one-digit number, show my thinking with models and equations, check with multiplication, and decide what to do with a remainder.',
  lesson_summary = 'A 15-task math quest on Solara in 3 acts (about 15–20 minutes per act). Students share supplies across canopy camps: they divide with base-ten blocks, area models, and partial quotients, write equations with a letter for the quotient, estimate with compatible numbers, check with multiplication, decide whether to round up, drop, or report a remainder, settle a debate about a missing zero in the quotient, and fix Kai''s remainder that is too big. Main standard 4.4F; also practices 4.4E and 4.4G. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who leave a zero out of the quotient (824 ÷ 4 = 26), keep a remainder bigger than the divisor, or handle every remainder the same way.'
WHERE standard = 'MA.4.4F-XP';

UPDATE cases SET
  learning_target = 'I can explain rhyme schemes, sound devices, and stanzas in poems, and tell how a poet''s words help me see and hear.',
  lesson_summary = 'A 15-task poetry quest on Cloudreach in 3 acts (about 15–20 minutes per act). Students read four original sky-reef poems and songs. They count lines and stanzas, name AABB and ABAB rhyme schemes, find onomatopoeia, alliteration, repetition, similes, and imagery, sort sound devices, settle a debate about whether every poem must rhyme, fix Kai''s rhyme-scheme label and poem card, and write two rhyming lines. Main standard 3.9B; also practices 3.10D, 3.6F, 3.3B, 3.12A, 3.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think every poem must rhyme, or who mix up a line and a stanza.'
WHERE standard = 'ELA.3.9B-XP';

UPDATE cases SET
  learning_target = 'I can explain how plant structures, like waxy leaves and deep roots, help plants survive where they live, and tell inherited traits from acquired traits.',
  lesson_summary = 'A 15-task science quest on Lumara in 3 acts (about 15–20 minutes per act). In the garden''s survival domes, students sort real plants by environment, match structures to their jobs, read a waxy-leaf water test, sort inherited and acquired traits, explore Texas plants like mesquite, prickly pear, bluebonnets, and resurrection ferns, settle a debate about whether a cactus grows spines because it wants to, fix Kai''s soggy cactus, and design a plant for a hot, dry, windy dome. Main standard 4.13A; also practices 4.13B and science practices 4.1–4.5.',
  misconception_note = 'Watch for students who think a plant grows a structure because it wants or needs to during its life, or who mix up inherited and acquired traits.'
WHERE standard = 'SCI.4.13A-XP';

UPDATE cases SET
  learning_target = 'I can explain how equal and opposite forces act on objects, find the net force in newtons, predict how unbalanced forces change motion, and design a fair test of how force affects an object.',
  lesson_summary = 'A 15-task science quest on Frostveil in 3 acts (about 15–20 minutes per act). The crew frees a rover stuck in a snowdrift. Students sort balanced and unbalanced forces, find net force in newtons, predict motion, rank friction on different surfaces, analyze balloon-rocket and ramp investigations, settle a debate about whether moving objects need a constant push, fix Kai''s net-force mistake, and choose and explain a tow plan. Main standard 5.7A; also practices 5.7B and science practices 5.1–5.5.',
  misconception_note = 'Watch for students who add forces that point in opposite directions, think an object at rest has no forces on it, or think a moving object needs a constant force to keep moving.'
WHERE standard = 'SCI.5.7A-XP';
