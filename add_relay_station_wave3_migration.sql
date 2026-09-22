-- Relay Station Wave 3: keyboard skins + Class Relay Race.
-- Run BEFORE pushing the Wave 3 code (the activity page reads keyboard_skin).

-- 1) Keyboard skin a student has equipped (unlocked by track rank).
ALTER TABLE relay_station_progress
  ADD COLUMN IF NOT EXISTS keyboard_skin TEXT NOT NULL DEFAULT 'classic';

-- 2) Class Relay Race: one row per race, one row per leg (sentence).
CREATE TABLE IF NOT EXISTS relay_races (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id   UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL,
  source     TEXT NOT NULL,
  title      TEXT NOT NULL,
  legs       JSONB NOT NULL,
  status     TEXT NOT NULL DEFAULT 'live',  -- live | done | ended
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at   TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS relay_races_class_started ON relay_races (class_id, started_at DESC);
ALTER TABLE relay_races ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS relay_race_legs (
  race_id    UUID NOT NULL REFERENCES relay_races(id) ON DELETE CASCADE,
  leg_index  INT  NOT NULL,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  claimed_at TIMESTAMPTZ,
  done_at    TIMESTAMPTZ,
  wpm        INT,
  accuracy   INT,
  PRIMARY KEY (race_id, leg_index)
);
ALTER TABLE relay_race_legs ENABLE ROW LEVEL SECURITY;

-- 3) The assignable Relay Race cases (one per grade).
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('RS.3.RACE', 'Relay Station: Class Relay Race', 'relay_station', 3, 'ELAR'),
  ('RS.4.RACE', 'Relay Station: Class Relay Race', 'relay_station', 4, 'ELAR'),
  ('RS.5.RACE', 'Relay Station: Class Relay Race', 'relay_station', 5, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can type my part of a message accurately so my whole class can finish it together.',
  lesson_summary  = 'A whole-class typing race. The teacher starts a race on the Relay Race Board; each student grabs one sentence ("leg") of a secret message, types it, and grabs another. The message assembles on the projector. Everyone who carried a leg earns crystals when the class finishes. Assign once; it stays on the mission list.'
WHERE standard IN ('RS.3.RACE', 'RS.4.RACE', 'RS.5.RACE');

-- Check: expect 1, 2, 3
SELECT
  (SELECT count(*) FROM information_schema.columns WHERE table_name = 'relay_station_progress' AND column_name = 'keyboard_skin') AS skin_column,
  (SELECT count(*) FROM information_schema.tables WHERE table_name IN ('relay_races', 'relay_race_legs')) AS race_tables,
  (SELECT count(*) FROM cases WHERE standard ~ '^RS\.[345]\.RACE$') AS race_cases;
