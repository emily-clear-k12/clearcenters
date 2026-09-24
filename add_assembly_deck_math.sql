-- Assembly Deck math. Twelve word problems, grades 3-5.
-- Run in the Supabase SQL editor. Assign will not list a case until its row exists.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('MA.3.5A-AD', 'Assembly Deck: The Book Drive',              'assembly_deck', 3, 'Math'),
  ('MA.3.5B-AD', 'Assembly Deck: Chairs for the Assembly',     'assembly_deck', 3, 'Math'),
  ('MA.3.4K-AD', 'Assembly Deck: The Garden Beds',             'assembly_deck', 3, 'Math'),
  ('MA.3.8B-AD', 'Assembly Deck: The Pet Survey',              'assembly_deck', 3, 'Math'),
  ('MA.4.5A-AD', 'Assembly Deck: The Field Trip Buses',        'assembly_deck', 4, 'Math'),
  ('MA.4.4H-AD', 'Assembly Deck: What the Remainder Means',    'assembly_deck', 4, 'Math'),
  ('MA.4.5B-AD', 'Assembly Deck: The Sticker Machine',         'assembly_deck', 4, 'Math'),
  ('MA.4.9B-AD', 'Assembly Deck: Rainfall Week',               'assembly_deck', 4, 'Math'),
  ('MA.5.4B-AD', 'Assembly Deck: The Concession Stand',        'assembly_deck', 5, 'Math'),
  ('MA.5.3K-AD', 'Assembly Deck: The Relay Splits',            'assembly_deck', 5, 'Math'),
  ('MA.5.3L-AD', 'Assembly Deck: Cutting the Ribbon',          'assembly_deck', 5, 'Math'),
  ('MA.5.9C-AD', 'Assembly Deck: The Science Fair Scores',     'assembly_deck', 5, 'Math')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can add two amounts and then subtract to find what is still needed.',
  lesson_summary = 'Students add 248 and 175 books, then find that 77 more are needed to reach 500. About 20 minutes.'
WHERE standard = 'MA.3.5A-AD';

UPDATE cases SET
  learning_target = 'I can multiply equal rows and then add a leftover row.',
  lesson_summary = 'Students find 7 rows of 8 chairs, then add a short row of 5 to get 61 chairs. About 20 minutes.'
WHERE standard = 'MA.3.5B-AD';

UPDATE cases SET
  learning_target = 'I can find the total in one group and then in several equal groups.',
  lesson_summary = 'Students find 24 seeds in one bed and 48 seeds in two beds. About 20 minutes.'
WHERE standard = 'MA.3.4K-AD';

UPDATE cases SET
  learning_target = 'I can use a scale on a picture graph before I compare the categories.',
  lesson_summary = 'Students use a key of 2, then find that 6 more students chose dogs than birds. About 20 minutes.'
WHERE standard = 'MA.3.8B-AD';

UPDATE cases SET
  learning_target = 'I can use a letter for an unknown amount in a multi-step problem.',
  lesson_summary = 'Students find 108 students on full buses, then add 14 more to get 122. About 20 minutes.'
WHERE standard = 'MA.4.5A-AD';

UPDATE cases SET
  learning_target = 'I can tell what a remainder means in a real situation.',
  lesson_summary = 'Students use 25 divided by 6. The same remainder means 5 vans are needed, and 1 student is left over. About 20 minutes.'
WHERE standard = 'MA.4.4H-AD';

UPDATE cases SET
  learning_target = 'I can find a rule in an input-output table and use it.',
  lesson_summary = 'Students use the rule multiply by 3, then add 1, and find that 6 gives 19. About 20 minutes.'
WHERE standard = 'MA.4.5B-AD';

UPDATE cases SET
  learning_target = 'I can answer the question a dot plot actually asks.',
  lesson_summary = 'Students add the two wettest days, 2.0 and 1.5, to get 3.5 inches. About 20 minutes.'
WHERE standard = 'MA.4.9B-AD';

UPDATE cases SET
  learning_target = 'I can find profit by subtracting the cost from the sales.',
  lesson_summary = 'Students find 200 dollars in sales, subtract an 80 dollar cost, and get a 120 dollar profit. About 20 minutes.'
WHERE standard = 'MA.5.4B-AD';

UPDATE cases SET
  learning_target = 'I can add decimal times and subtract to compare them with a goal.',
  lesson_summary = 'Students add four relay splits to 240 seconds, then find the team was 10 seconds under a 250-second goal. About 20 minutes.'
WHERE standard = 'MA.5.3K-AD';

UPDATE cases SET
  learning_target = 'I can divide a whole number by a unit fraction and explain why the answer gets bigger.',
  lesson_summary = 'Students find that a 3-yard ribbon cut into quarter-yard pieces makes 12 pieces. About 20 minutes.'
WHERE standard = 'MA.5.3L-AD';

UPDATE cases SET
  learning_target = 'I can compare groups on a graph without confusing counts and scores.',
  lesson_summary = 'Students read two displays of the same scores and find that 3 more projects scored in the 90s than in the 70s. About 20 minutes.'
WHERE standard = 'MA.5.9C-AD';
