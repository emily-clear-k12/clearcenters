-- Adds the final 6 4th grade Group Chat cases that were
-- skipped in the first batch (incomplete schema at the time). Emily
-- re-exported them with the full schema.
insert into cases (standard, title, grade, subject) values
  ('4.6C', 'The Fourth Do-Over', 4, 'Science'),
  ('4.8B', 'The Coat on the Snowman', 4, 'Science'),
  ('4.9B', 'Luna Thinks She Is Shrinking', 4, 'Science'),
  ('4.10A', 'The Puddle Mystery', 4, 'Science'),
  ('4.12B', 'Who Passes the Baton?', 4, 'Science'),
  ('4.13B', 'What Nell Is About to Tell Her Class', 4, 'Science');
