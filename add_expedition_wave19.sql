-- Expedition Station wave 19 (Sept 28, 2026). Safe to run again.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.6A-XP', 'Expedition Station: The Shape Workshop', 'expedition_station', 3, 'Math'),
  ('ELA.5.8A-XP', 'Expedition Station: The Twin Legends', 'expedition_station', 5, 'ELAR'),
  ('SCI.5.9-XP', 'Expedition Station: The Spinning Earth', 'expedition_station', 5, 'Science'),
  ('SCI.3.10B-XP', 'Expedition Station: The Soil Makers', 'expedition_station', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can classify and sort 2D and 3D figures by their attributes using geometry words, and recognize different kinds of quadrilaterals.',
  lesson_summary = 'A 15-task math quest on Mechara in 3 acts (about 15–20 minutes per act). Robots build parts from shapes. Students sort 2D and 3D figures, count faces, edges, and vertices on cubes and prisms, solve "which shape am I?" riddles, sort solids by flat faces and curved surfaces, name every quadrilateral that fits a square, sort rhombuses, rectangles, and trapezoids, settle a debate about whether a square turned on its point is still a square, fix Kai''s edge count, and describe a quadrilateral of their own. Main standard 3.6A; also practices 3.6B. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who think a square is not a rectangle, that a square turned on its point becomes a "diamond," or who miss the hidden edges when counting a cube.'
WHERE standard = 'MA.3.6A-XP';

UPDATE cases SET
  learning_target = 'I can infer more than one theme in a story and support each with text evidence, and tell legends from myths and fantasy.',
  lesson_summary = 'A 15-task reading quest on Lumara in 3 acts (about 15–20 minutes per act). Students read two original legends from the glowing garden and a short science-fiction scene. They tell theme statements from topics and morals, infer two themes in each legend with evidence, find the theme both legends share, sort themes to the legend that supports them, compare genre features, settle a debate about whether a story has only one theme, fix Kai''s theme tag, and write their own theme statement with evidence. Main standard 5.8A; also practices 5.9A, 5.6F, 5.7C, 5.8B, 5.7B, 5.3B. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who think a story has only one theme, who name a topic instead of a theme statement, or who give a theme without evidence.'
WHERE standard = 'ELA.5.8A-XP';

UPDATE cases SET
  learning_target = 'I can explain how Earth''s rotation causes day and night, the Sun''s path across the sky, and changes in shadows.',
  lesson_summary = 'A 15-task science quest on Cloudreach in 3 acts (about 15–20 minutes per act). Watching Earth from the sky reef, students order the Sun''s path, sort effects of rotation and revolution, read shadow-stick data from Austin, predict shadow length and direction, use a flashlight-and-globe model, reason about day and night on opposite sides of Earth, settle a debate about whether the Sun circles Earth each day, fix Kai''s claim that shadows are longest at noon, and explain why shadows change. Main standard 5.9; also practices science practices 5.1–5.5.',
  misconception_note = 'Watch for students who think the Sun moves around Earth each day, that shadows are longest at noon, or who mix up rotation (a day) with revolution (a year).'
WHERE standard = 'SCI.5.9-XP';

UPDATE cases SET
  learning_target = 'I can explain how soil forms from weathered rock and decomposed plants and animals, and describe fast changes to Earth''s surface.',
  lesson_summary = 'A 15-task science quest on Cindara in 3 acts (about 15–20 minutes per act). As lava rock slowly becomes soil, students sort what soil is made of, order the steps of soil forming, track a rotting log, sort sand, silt, clay, and humus, read a water-drain test, sort fast and slow changes, settle a debate about whether soil has always been there, fix Kai''s upside-down soil layers, and choose soil for a garden after a landslide. Main standard 3.10B; also practices 3.10C and science practices 3.1–3.5.',
  misconception_note = 'Watch for students who think soil has always been there or forms quickly, or who mix up how sand and clay hold water.'
WHERE standard = 'SCI.3.10B-XP';
