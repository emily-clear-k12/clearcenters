-- Broadcast Booth wave4: SCI.4.9B-BB, SCI.4.6A-BB, SCI.4.6B-BB, SCI.4.6C-BB.
-- Playable content is in lib/cases/broadcast-booth/wave4.js.
-- Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.4.9B-BB', 'Broadcast Booth: Can you predict the Moon? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.6A-BB', 'Broadcast Booth: How would you sort the mystery tray? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.6B-BB', 'Broadcast Booth: Mixture or solution? (Correspondent)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.6C-BB', 'Broadcast Booth: Where did the water go? (Explain)', 'broadcast_booth', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title, engine = EXCLUDED.engine, grade = EXCLUDED.grade, subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can use data to describe the pattern of the Moon''s changing shape and predict what it will look like next.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.9B. Students use a month of Moon observations to describe the order of the shapes and predict the next one. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'The Moon does not change size or disappear; how much of the lit side we see changes in a set order. This is not day and night, and Earth''s shadow does not make the phases.'
WHERE standard = 'SCI.4.9B-BB';

UPDATE cases SET
  learning_target = 'I can classify and describe matter using properties I can observe or measure, such as mass, magnetism, temperature, sinking or floating, and state.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.6A. Students sort objects on a mystery tray by temperature, mass, magnetism, sinking or floating, and state of matter. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Not every metal is magnetic, and heavy things do not always sink. Mass is how much matter an object has, not how big it looks.'
WHERE standard = 'SCI.4.6A-BB';

UPDATE cases SET
  learning_target = 'I can compare mixtures and tell which ones are solutions, including a solid in a liquid and a liquid in a liquid.',
  lesson_summary = 'Grade 4 Correspondent broadcast. TEKS 4.6B. From a test kitchen, students compare trail mix, salt water, colored water, and oil and water, and explain which are solutions. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Dissolved salt is not gone; it is spread evenly through the water. Oil and water is a mixture but not a solution. Every solution is a mixture.'
WHERE standard = 'SCI.4.6B-BB';

UPDATE cases SET
  learning_target = 'I can show that matter is conserved when a mixture forms, because the mass of the mixture equals the mass of its parts.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.6C. Students use scale readings for soil and water, and oil and water, to show the mass before and after mixing is the same. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Water that soaks into soil is not gone; the total mass stays the same. If a mixture sits out, some water can evaporate, so it is weighed right away.'
WHERE standard = 'SCI.4.6C-BB';
