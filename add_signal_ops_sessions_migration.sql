-- Signal Ops V1 live class sessions (Sept 12, 2026)
-- Paste in Supabase SQL editor. Safe to re-run (IF NOT EXISTS).
--
-- All reads/writes go through Next.js API routes using the service-role
-- admin client (same pattern as /api/signal-defense/submit). RLS is
-- enabled with no anon policies so the browser cannot touch these tables
-- directly. Wrong answers are never written here — only correct
-- contributions bump shared meters.

CREATE TABLE IF NOT EXISTS signal_ops_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'lobby'
    CHECK (status IN ('lobby', 'live', 'ended')),
  salvage integer NOT NULL DEFAULT 0 CHECK (salvage >= 0),
  power integer NOT NULL DEFAULT 100 CHECK (power >= 0 AND power <= 100),
  base_health integer NOT NULL DEFAULT 100 CHECK (base_health >= 0 AND base_health <= 100),
  total_correct integer NOT NULL DEFAULT 0 CHECK (total_correct >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  ended_at timestamptz
);

-- At most one open (lobby/live) session per assignment.
CREATE UNIQUE INDEX IF NOT EXISTS signal_ops_sessions_one_open_per_assignment
  ON signal_ops_sessions (assignment_id)
  WHERE status IN ('lobby', 'live');

CREATE INDEX IF NOT EXISTS signal_ops_sessions_assignment_idx
  ON signal_ops_sessions (assignment_id);

CREATE INDEX IF NOT EXISTS signal_ops_sessions_class_idx
  ON signal_ops_sessions (class_id);

CREATE TABLE IF NOT EXISTS signal_ops_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES signal_ops_sessions(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  callsign text,
  correct_count integer NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
  joined_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, student_id)
);

CREATE INDEX IF NOT EXISTS signal_ops_participants_session_idx
  ON signal_ops_participants (session_id);

ALTER TABLE signal_ops_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE signal_ops_participants ENABLE ROW LEVEL SECURITY;

-- No PUBLIC / anon / authenticated policies on purpose: browser clients
-- never query these tables. API routes use SUPABASE_SERVICE_ROLE_KEY.
