-- Signal Ops V1.5 — votes, upgrades, power drain, wave damage (Sept 12, 2026)
-- Paste in Supabase SQL editor AFTER add_signal_ops_sessions_migration.sql.
-- Safe to re-run (IF NOT EXISTS / additive columns only).

ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS wave_index integer NOT NULL DEFAULT 0;

ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS next_vote_threshold integer NOT NULL DEFAULT 48;

-- upgrades: { "shield": true, "turret": 1 }
-- shield = one-shot block for next wave; turret = ongoing count
ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS upgrades jsonb NOT NULL DEFAULT '{}'::jsonb;

-- vote: null | {
--   "options": ["shield","turret","repair"],
--   "tallies": {"shield":2,"turret":1,"repair":0},
--   "ends_at": "<iso>",
--   "resolved": null | "shield",
--   "opened_at": "<iso>"
-- }
ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS vote jsonb;

ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS meters_ticked_at timestamptz;

ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS wave_started_at timestamptz;

ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS last_upgrade_id text;

ALTER TABLE signal_ops_sessions
  ADD COLUMN IF NOT EXISTS outcome text NOT NULL DEFAULT 'ongoing';

-- Keep outcome values constrained without failing on older rows.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'signal_ops_sessions_outcome_check'
  ) THEN
    ALTER TABLE signal_ops_sessions
      ADD CONSTRAINT signal_ops_sessions_outcome_check
      CHECK (outcome IN ('ongoing', 'victory', 'regroup'));
  END IF;
END $$;

ALTER TABLE signal_ops_participants
  ADD COLUMN IF NOT EXISTS vote_choice text;

COMMENT ON COLUMN signal_ops_sessions.upgrades IS 'Signal Ops V1.5 active upgrades blob';
COMMENT ON COLUMN signal_ops_sessions.vote IS 'Signal Ops V1.5 class vote state or null';
COMMENT ON COLUMN signal_ops_sessions.outcome IS 'ongoing | victory | regroup (team-only loss)';
