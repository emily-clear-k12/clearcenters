-- Sept 29, 2026: ClearKeys naming. Typing activities were titled "Relay Station: ...".
-- Students see this title in My Missions, and teachers see it in the gradebook.
-- This only renames; nothing else changes. Safe to run more than once.
update cases
set title = regexp_replace(title, '^Relay Station:\s*', 'ClearKeys: ')
where engine = 'relay_station'
  and title like 'Relay Station:%';

-- Check: should return 0 rows.
select standard, title from cases where engine = 'relay_station' and title like 'Relay Station%';
