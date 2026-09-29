-- Broadcast Booth wave9: SCI.3.7B-BB, SCI.3.8A-BB, SCI.3.8B-BB, SCI.3.9A-BB.
-- Playable content is in lib/cases/broadcast-booth/wave9.js.
-- Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.3.7B-BB', 'Broadcast Booth: Push it, pull it, watch it move (Correspondent)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.8A-BB', 'Broadcast Booth: Energy hunt at the county fair (Correspondent)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.8B-BB', 'Broadcast Booth: Why does a faster ball knock down more pins? (Explain)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.9A-BB', 'Broadcast Booth: Who goes around whom? (Explain)', 'broadcast_booth', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title, engine = EXCLUDED.engine, grade = EXCLUDED.grade, subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can explain how pushes and pulls change an object''s position and motion, using what I saw in an investigation.',
  lesson_summary = 'Grade 3 Correspondent broadcast. TEKS 3.7B. From a playground investigation, students report how pushes and pulls started, stopped, sped up, and turned a swing, a ball, and a wagon. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Things do not start, stop, or turn by themselves; a push or a pull makes the change. A bigger push or pull makes a bigger change.'
WHERE standard = 'SCI.3.7B-BB';

UPDATE cases SET
  learning_target = 'I can identify everyday examples of light, sound, thermal, and mechanical energy.',
  lesson_summary = 'Grade 3 Correspondent broadcast. TEKS 3.8A. On an energy hunt at a county fair, students report examples of light (ride lights), sound (a band), thermal (a popcorn machine), and mechanical (a spinning Ferris wheel) energy. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Energy is not only electricity. One thing can show more than one kind of energy: the Ferris wheel has light and mechanical energy.'
WHERE standard = 'SCI.3.8A-BB';

UPDATE cases SET
  learning_target = 'I can use an investigation to show that a faster object has more mechanical energy.',
  lesson_summary = 'Grade 3 Explain broadcast. TEKS 3.8B. In a gym bowling investigation, students explain why the same ball rolled faster knocks down more pins: more speed means more mechanical energy. Only the speed changed. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'A heavier ball is not the point here; the ball stayed the same. Changing only one thing (the speed) is what makes the test fair.'
WHERE standard = 'SCI.3.8B-BB';

UPDATE cases SET
  learning_target = 'I can use a model to explain that the Moon orbits Earth and Earth orbits the Sun.',
  lesson_summary = 'Grade 3 Explain broadcast. TEKS 3.9A. Using a people model on the playground, students explain that Earth orbits the Sun about once a year and the Moon orbits Earth about once a month. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'The Sun does not go around Earth, even though it seems to move across the sky. This is about orbits, not the Moon''s phases or day and night.'
WHERE standard = 'SCI.3.9A-BB';
