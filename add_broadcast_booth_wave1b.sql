-- Broadcast Booth: energy debate, inference, theme, argument.
-- Playable content is in lib/cases/broadcast-booth/wave1.js.
-- Safe to run twice. Not run yet.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.4.11A-BB', 'Broadcast Booth: How should the town get power? (Debate)', 'broadcast_booth', 4, 'Science'),
  ('ELA.3.6F-BB', 'Broadcast Booth: The story never says the feeling (Explain)', 'broadcast_booth', 3, 'ELAR'),
  ('ELA.5.8A-BB', 'Broadcast Booth: What is the play really about? (Explain)', 'broadcast_booth', 5, 'ELAR'),
  ('ELA.5.9E-BB', 'Broadcast Booth: Which facts support the claim? (Debate)', 'broadcast_booth', 5, 'ELAR')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can compare renewable and nonrenewable resources and give a fair reason for each side.',
  lesson_summary = 'Grade 4 Debate. Wind and sunlight versus natural gas. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Natural gas comes from nature and still runs out. Renewable does not mean perfect.'
WHERE standard = 'SCI.4.11A-BB';

UPDATE cases SET
  learning_target = 'I can make an inference about a character''s feelings and point to evidence in the story.',
  lesson_summary = 'Grade 3 Explain broadcast on inference. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'A feeling can be shown by what a character does, even when the story never names it.'
WHERE standard = 'ELA.3.6F-BB';

UPDATE cases SET
  learning_target = 'I can infer more than one theme and support each theme with evidence from the text.',
  lesson_summary = 'Grade 5 Explain broadcast on theme. Plot is not a theme. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Retelling what happened is the plot. A theme reaches beyond the story.'
WHERE standard = 'ELA.5.8A-BB';

UPDATE cases SET
  learning_target = 'I can explain which facts an author uses for an argument and which facts work against it.',
  lesson_summary = 'Grade 5 Debate on facts for and against a claim. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'The loudest line is not the strongest evidence.'
WHERE standard = 'ELA.5.9E-BB';
