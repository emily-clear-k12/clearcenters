-- Broadcast Booth wave5: SCI.4.7-BB, SCI.4.8A-BB, SCI.4.8B-BB, SCI.4.9A-BB.
-- Playable content is in lib/cases/broadcast-booth/wave5.js.
-- Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.4.7-BB', 'Broadcast Booth: Why do socks slide and sneakers stop? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.8A-BB', 'Broadcast Booth: How does energy travel at the lake? (Correspondent)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.8B-BB', 'Broadcast Booth: Why is the pot hot but the handle cool? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.9A-BB', 'Broadcast Booth: What will next month bring? (Correspondent)', 'broadcast_booth', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title, engine = EXCLUDED.engine, grade = EXCLUDED.grade, subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can use data from an investigation to describe a pattern of friction between different surfaces.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.7. Students use a class investigation (the same push on three surfaces) to describe the pattern that rougher surfaces make more friction. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Objects don''t just ''run out'' of motion; friction is a force that slows them. Only the surface changed, which is what makes it a fair test.'
WHERE standard = 'SCI.4.7-BB';

UPDATE cases SET
  learning_target = 'I can identify how energy is transferred by objects in motion, by waves in water, and by sound.',
  lesson_summary = 'Grade 4 Correspondent broadcast. TEKS 4.8A. From a lake dock, students report energy moving from a rolling ball to cups, from a boat''s waves to the dock, and from a drum through the air. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'A wave moves energy, not the water itself, across the lake; the toy boat bobs in place. Sound is energy traveling as vibrations, not something you can see.'
WHERE standard = 'SCI.4.8A-BB';

UPDATE cases SET
  learning_target = 'I can identify conductors and insulators of heat and electricity and explain how each is used.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.8B. Students use a pot, its handle, an oven mitt, and a lamp cord to explain which materials conduct heat or electricity and which insulate. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'An insulator doesn''t make things cold; it slows heat moving through it. A material can conduct heat and electricity (most metals) or insulate both (plastic, rubber). Never test electricity at an outlet.'
WHERE standard = 'SCI.4.8B-BB';

UPDATE cases SET
  learning_target = 'I can use daylight and temperature data to describe the pattern of the seasons and predict what will change next.',
  lesson_summary = 'Grade 4 Correspondent broadcast. TEKS 4.9A. From a school weather station in Austin, students use a year of daylight and temperature data to describe the seasonal pattern and predict the next change. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Seasons are not caused by Earth getting closer to the Sun. This broadcast is about the pattern and predicting from it, not the cause. Daily weather can break the pattern for a day; the seasonal pattern still holds.'
WHERE standard = 'SCI.4.9A-BB';
