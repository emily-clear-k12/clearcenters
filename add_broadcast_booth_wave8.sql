-- Broadcast Booth wave8: SCI.3.6A-BB, SCI.3.6B-BB, SCI.3.6D-BB, SCI.3.7A-BB.
-- Playable content is in lib/cases/broadcast-booth/wave8.js.
-- Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.3.6A-BB', 'Broadcast Booth: The pumpkin patch tests (Explain)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.6B-BB', 'Broadcast Booth: What shape is lemonade? (Explain)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.6D-BB', 'Broadcast Booth: Build it strong (Correspondent)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.7A-BB', 'Broadcast Booth: Can a force work without touching? (Explain)', 'broadcast_booth', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title, engine = EXCLUDED.engine, grade = EXCLUDED.grade, subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can measure, test, and record properties of matter such as mass, temperature, magnetism, and sinking or floating.',
  lesson_summary = 'Grade 3 Explain broadcast. TEKS 3.6A. At a fall festival, students report how a pumpkin, an apple, and a metal washer were measured and tested for mass, magnetism, sinking or floating, and temperature, and how the results were recorded. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Big or heavy does not always mean it sinks: the pumpkin has the most mass and still floats. Not all metals stick to magnets, but this steel washer does.'
WHERE standard = 'SCI.3.6A-BB';

UPDATE cases SET
  learning_target = 'I can classify matter as solid, liquid, or gas and show that solids keep their shape while liquids and gases take the shape of their container.',
  lesson_summary = 'Grade 3 Explain broadcast. TEKS 3.6B. At a lemonade stand, students compare an ice cube, lemonade poured into different containers, and air in two balloons to show how solids, liquids, and gases differ. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'A liquid changes shape but not amount when it is poured. Air is matter even though we can''t see it. This is not about melting or freezing.'
WHERE standard = 'SCI.3.6B-BB';

UPDATE cases SET
  learning_target = 'I can combine materials to build or change an object and explain why I chose each material because of its properties.',
  lesson_summary = 'Grade 3 Correspondent broadcast. TEKS 3.6D. At a school maker fair, students report why builders chose stiff tubes, a heavy clay base, and tape for a tower, and why clay makes a sand brick stronger. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'The best material is the one whose properties fit the job, not the biggest or the prettiest. A good builder can say why each material was chosen.'
WHERE standard = 'SCI.3.6D-BB';

UPDATE cases SET
  learning_target = 'I can describe forces that act by touching an object and forces that act at a distance, such as magnetism and gravity.',
  lesson_summary = 'Grade 3 Explain broadcast. TEKS 3.7A. Students compare contact forces (pushing a door, pulling a wagon) with forces that act at a distance (a magnet holding a paper clip in the air, gravity pulling a dropped ball). Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Gravity is a force even though you can''t see or feel it touching. A force does not have to touch an object to push or pull it.'
WHERE standard = 'SCI.3.7A-BB';
