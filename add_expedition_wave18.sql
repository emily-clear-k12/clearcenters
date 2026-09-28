-- Expedition Station wave 18 (Sept 28, 2026). Safe to run again.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.5D-XP', 'Expedition Station: The Missing Number Lock', 'expedition_station', 3, 'Math'),
  ('ELA.5.8C-XP', 'Expedition Station: The River Rescue', 'expedition_station', 5, 'ELAR'),
  ('SCI.3.12A-XP', 'Expedition Station: The Migration Map', 'expedition_station', 3, 'Science'),
  ('SCI.5.13B-XP', 'Expedition Station: The Instinct Files', 'expedition_station', 5, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can find the missing number in a multiplication or division equation, use fact families, describe times-as-many comparisons, and fill in number-pair tables.',
  lesson_summary = 'A 15-task math quest on Cindara in 3 acts (about 15–20 minutes per act). Vault doors open only when students find the missing factor, product, dividend, or divisor. They use arrays and fact families, turn division into multiplication, describe times-as-many comparisons, complete number-pair tables, sort equations by their missing number, settle a debate about adding instead of multiplying, and fix Kai''s division mistake. Main standard 3.5D; also practices 3.5C and 3.5E. Students can stop after any task and come back.',
  misconception_note = 'Watch for students who add or subtract to find a missing factor (6 × ? = 42, so ? = 36), or who divide the numbers they see in ? ÷ 4 = 8 and answer 2.'
WHERE standard = 'MA.3.5D-XP';

UPDATE cases SET
  learning_target = 'I can analyze a story''s plot, including the rising action, climax, falling action, and resolution, and explain how an author''s structure fits their purpose.',
  lesson_summary = 'A 15-task reading quest on Solara in 3 acts (about 15–20 minutes per act). Students read an original five-part story about two young river guides rescuing stranded travelers in a flash flood, plus a short story told with a flashback. They identify external and internal conflict, order rising-action events, find the true climax, tell falling action from resolution, sort events by plot element, explain why the author used a flashback, settle a debate about whether the climax is just the most exciting scene, fix Kai''s plot diagram, and write a summary with plot terms. Main standard 5.8C; also practices 5.10B, 5.8B, 5.6F, 5.7C, 5.3B, 5.7D. Written answers are scored by the teacher.',
  misconception_note = 'Watch for students who pick the most exciting action scene as the climax instead of the turning point, or who treat falling action and resolution as the same thing.'
WHERE standard = 'ELA.5.8C-XP';

UPDATE cases SET
  learning_target = 'I can explain how temperature and rain change what animals do and how they grow, including migration, hibernation, and dormancy.',
  lesson_summary = 'A 15-task science quest on Cloudreach in 3 acts (about 15–20 minutes per act). From the sky reef, the crew tracks real animals. Students sort animals that migrate, hibernate, or stay active, order the cause-and-effect chain that sends hummingbirds south, read a bar graph and table of ducks at a Texas pond, identify hibernation and dormancy, settle a debate about whether birds migrate because they are cold, fix Kai''s caribou label, and predict what happens when northern lakes freeze early. Main standard 3.12A; also practices science practices 3.1–3.5.',
  misconception_note = 'Watch for students who think animals migrate because they feel cold rather than because food runs out, or who think hibernation is just a long normal sleep.'
WHERE standard = 'SCI.3.12A-XP';

UPDATE cases SET
  learning_target = 'I can tell instincts from learned behaviors and explain how both help animals survive in their environment.',
  lesson_summary = 'A 15-task science quest on Lumara in 3 acts (about 15–20 minutes per act). Nova''s case files cover real animal behavior. Students sort instinct and learned behaviors, explain why sea turtle hatchlings and young cuckoos rely on instinct, read crow and octopus puzzle-trial data, compare how a roadrunner and a horned lizard survive in the same desert, order a salmon''s journey home, settle a debate about whether every behavior is learned from parents, fix Kai''s label for a dog trick, and explain a sea otter''s skill. Main standard 5.13B; also practices 5.13A and science practices 5.2–5.3.',
  misconception_note = 'Watch for students who think all behaviors are taught by parents, or that practice can turn a learned behavior into an instinct.'
WHERE standard = 'SCI.5.13B-XP';
