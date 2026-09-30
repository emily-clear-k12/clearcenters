-- Sept 29, 2026: ClearKeys Fluency levels 21-40.
-- One new column holds each student's Fluency progress: { current, results }.
-- Safe to run more than once.
alter table relay_station_progress
  add column if not exists fluency jsonb not null default '{}'::jsonb;
