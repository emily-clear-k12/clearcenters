-- Broadcast Booth wave7: SCI.4.12B-BB, SCI.4.12C-BB, SCI.4.13A-BB, SCI.4.13B-BB.
-- Playable content is in lib/cases/broadcast-booth/wave7.js.
-- Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.4.12B-BB', 'Broadcast Booth: Who eats what on the forest floor? (Correspondent)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.12C-BB', 'Broadcast Booth: What was this place like long ago? (Correspondent)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.13A-BB', 'Broadcast Booth: How do Texas trees survive a drought? (Explain)', 'broadcast_booth', 4, 'Science'),
  ('SCI.4.13B-BB', 'Broadcast Booth: Born with it, or got it later? (Explain)', 'broadcast_booth', 4, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title, engine = EXCLUDED.engine, grade = EXCLUDED.grade, subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can describe how energy flows and matter cycles through a food web, including the roles of the Sun, producers, consumers, and decomposers.',
  lesson_summary = 'Grade 4 Correspondent broadcast. TEKS 4.12B. From an East Texas forest trail, students trace energy from the Sun to oaks, squirrels, and hawks, and explain how mushrooms and earthworms return matter to the soil. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Mushrooms are not plants or producers; they are decomposers. Energy flows one way from the Sun, but matter cycles back through the soil. This is not the creek food chain.'
WHERE standard = 'SCI.4.12B-BB';

UPDATE cases SET
  learning_target = 'I can use fossil evidence, including Texas fossils, to describe what an environment was like long ago.',
  lesson_summary = 'Grade 4 Correspondent broadcast. TEKS 4.12C. From the Paluxy River at Dinosaur Valley State Park, students use dinosaur tracks and shell-rich rock to describe a past environment: the muddy edge of a sea about 113 million years ago. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Tracks are fossils too, not just bones. The environment in the past can be very different from today: this dry hill country was once the muddy shore of a sea.'
WHERE standard = 'SCI.4.12C-BB';

UPDATE cases SET
  learning_target = 'I can explain how plant structures, such as waxy leaves, deep roots, and thorns, help plants survive in their environment.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.13A. Using a live oak and a mesquite in a drought, students explain how waxy leaves, a deep taproot, tiny leaflets, and thorns help plants survive. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Plants do not choose or grow these structures because they need them; the structures are part of how the plant is built. Roots do more than hold the plant up; they take in water.'
WHERE standard = 'SCI.4.13A-BB';

UPDATE cases SET
  learning_target = 'I can tell the difference between inherited and acquired physical traits and give examples of each.',
  lesson_summary = 'Grade 4 Explain broadcast. TEKS 4.13B. Using a ranch dog named Pepper, students sort physical traits into inherited (coat, eyes, ears) and acquired (a scar, strong muscles), and explain the difference. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'An acquired trait, like a scar or strong muscles, is not passed to offspring. A trait here is a body feature, not a behavior like herding sheep.'
WHERE standard = 'SCI.4.13B-BB';
