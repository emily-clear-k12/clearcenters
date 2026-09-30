-- Sept 29, 2026: ClearKeys class settings (this week's Daily words, minutes-per-day goal).
-- One new column on classes. Safe to run more than once.
alter table classes
  add column if not exists clearkeys_settings jsonb not null default '{}'::jsonb;
