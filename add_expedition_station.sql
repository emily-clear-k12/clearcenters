-- Expedition Station. Run this before assigning The Frozen Relay.
-- Quest codes end in -XP (Exhibit Hall already uses -EX).

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS expedition_station_data JSONB;

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.4.3E-XP', 'Expedition Station: The Frozen Relay', 'expedition_station', 4, 'Math')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can add and subtract fractions that have the same bottom number. I can show how with pictures, a number line, and by adding in a different order.',
  lesson_summary = 'Act 1 station visit on Frostveil: four fraction cards in any order, then Challenge 1 (the cold snap). About 15–20 minutes. Autosave after every card. Full quest is 15 tasks; Acts 2–3 ship next.'
WHERE standard = 'MA.4.3E-XP';
