-- Broadcast Booth wave 3: canyon (SCI.4.10B-BB), use less or recycle (SCI.5.11-BB),
-- central idea (ELA.5.9D-BB). Playable content is in lib/cases/broadcast-booth/wave3.js.
-- Safe to run twice. Not run yet.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.4.10B-BB', 'Broadcast Booth: How did the canyon get so deep? (Correspondent)', 'broadcast_booth', 4, 'Science'),
  ('SCI.5.11-BB', 'Broadcast Booth: Use less, or recycle more? (Debate)', 'broadcast_booth', 5, 'Science'),
  ('ELA.5.9D-BB', 'Broadcast Booth: What is the article mostly about? (Explain)', 'broadcast_booth', 5, 'ELAR')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can describe how weathering, erosion, and deposition from water, wind, and ice slowly change Earth''s surface.',
  lesson_summary = 'Grade 4 Correspondent broadcast from Palo Duro Canyon. Water, wind, and ice break rock, carry it away, and drop it somewhere new. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Weathering breaks rock; erosion moves it. These changes are slow. This is not the water cycle.'
WHERE standard = 'SCI.4.10B-BB';

UPDATE cases SET
  learning_target = 'I can explain how conservation and recycling each reduce the harm from using natural resources, and compare the two fairly.',
  lesson_summary = 'Grade 5 Debate broadcast. Use less (conservation) or recycle more: both sides have real benefits and limits. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Recycling still uses energy, and dirty or mixed items can''t be recycled. Neither side is the only right answer.'
WHERE standard = 'SCI.5.11-BB';

UPDATE cases SET
  learning_target = 'I can identify the central idea of an informational text and support it with evidence from the text.',
  lesson_summary = 'Grade 5 Explain broadcast. TEKS 5.9D(i). Students name the central idea of a short article about Texas horned lizards and support it with two details. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'An interesting detail is not the central idea. This is informational text: a central idea, not a theme.'
WHERE standard = 'ELA.5.9D-BB';
