-- Sept 22, 2026 — Relay Station Wave 1: per-student supports (accommodations).
-- Run BEFORE pushing the Wave 1 code. Safe to re-run.

ALTER TABLE relay_station_progress
  ADD COLUMN IF NOT EXISTS accommodations JSONB;

SELECT count(*) AS accommodations_column FROM information_schema.columns
  WHERE table_name = 'relay_station_progress' AND column_name = 'accommodations';
