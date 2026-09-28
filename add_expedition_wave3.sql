-- Expedition Station wave 3 (Sept 27, 2026): three new full quests (15 tasks, 3 acts each).
-- Safe to run more than once.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('ELA.4.8A-XP', 'Expedition Station: The Tall Tale Trail', 'expedition_station', 4, 'ELAR'),
  ('SCI.3.6C-XP', 'Expedition Station: The Melting Point', 'expedition_station', 3, 'Science'),
  ('ELA.5.13D-XP', 'Expedition Station: The Trusted Source', 'expedition_station', 5, 'ELAR')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can figure out the theme of a story and prove it with evidence. I can tell a tall tale, a legend, and a fable apart.',
  lesson_summary = 'A 15-task reading quest on Solara in 3 acts (about 15–20 minutes per act). The camp elders tell a tall tale, a legend, and a fable while two camps learn to share one supply crate. Students infer themes, highlight evidence, compare themes across stories, fix a report, and write a short response. Main standard 4.8A; also practices 4.9A, 4.6F, 4.7C, 4.7B, 4.10D, 4.11D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who name a topic (soup, bravery) or retell the plot instead of stating a theme as a lesson about life.'
WHERE standard = 'ELA.4.8A-XP';

UPDATE cases SET
  learning_target = 'I can predict, observe, and record how heating and cooling change matter, like ice melting, water boiling into vapor, and drops forming on a cold glass.',
  lesson_summary = 'A 15-task science quest on Cindara in 3 acts (about 15–20 minutes per act). Students heat and cool ice, water, wax, and chocolate, read simple observation tables, run an ice-melting fair test, and choose shelter materials that stay solid near heat. Main standard 3.6C; also practices 3.6D, 3.1B, 3.1D, 3.1E, 3.2B, 3.2C, 3.2D, 3.3A, 3.3C, 3.5B, 3.5G.',
  misconception_note = 'Watch for students who think drops on a cold glass leaked through it, that melted ice is a new kind of water, or that all solids melt at the same temperature.'
WHERE standard = 'SCI.3.6C-XP';

UPDATE cases SET
  learning_target = 'I can tell primary sources from secondary sources, decide which sources are credible, and use the best sources to make a recommendation.',
  lesson_summary = 'A 15-task research quest on Mechara in 3 acts (about 15–20 minutes per act). Students weigh six sources about flickering city lights (a measurement log, an ad, an anonymous post, an encyclopedia entry, a news report, and an outdated guide), spot bias and missing evidence, paraphrase with credit, and write a recommendation. Main standard 5.13D; also practices 5.13C, 5.13E, 5.13F, 5.13G, 5.9E, 5.6F, 5.6H, 5.7C. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who trust a source because it is popular, exciting, or confident, or who miss that an old source can be outdated.'
WHERE standard = 'ELA.5.13D-XP';
