-- Gradebook setup on each class.
-- Points, percent, 4-point, or custom numbers for Got it / Almost / Not yet.
-- Safe to run more than once.

alter table classes add column if not exists gradebook_scale text default 'points';
alter table classes add column if not exists gradebook_got int default 2;
alter table classes add column if not exists gradebook_almost int default 1;
alter table classes add column if not exists gradebook_notyet int default 0;
