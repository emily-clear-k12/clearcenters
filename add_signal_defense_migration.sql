-- Signal Defense - small, required schema addition.
-- Mirrors Mission Map / Signal Check: one new nullable JSONB column on
-- `submissions` to hold Signal Defense's structured run summary + result
-- log. Shared columns (`attempt2`, `submitted_at`, `revision_requested`)
-- are already written by /api/signal-defense/submit.

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS signal_defense_data JSONB;

-- Optional note: Frequency Rush / Simulation Lab engine-data columns may
-- already exist in your live DB even if they aren't in this repo's SQL
-- files - Signal Defense only needs the column above.
