-- Assembly Deck — Wave 1 (paragraph mode).
-- Run BEFORE pushing: the activity page and the submit route both read
-- submissions.assembly_deck_data.

-- 1) Where a build is stored: boards, leftover reasons, paragraph order,
--    scores, and S.A.M.'s feedback on the written explanation.
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS assembly_deck_data JSONB;

-- 2) The first six cases. Two per grade, three subjects.
INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('3.6A-AD',      'Assembly Deck: The Sorting Bin Report',     'assembly_deck', 3, 'Science'),
  ('4.10B-AD',     'Assembly Deck: The Bend in Sandy Creek',    'assembly_deck', 4, 'Science'),
  ('SS.4.6B-AD',   'Assembly Deck: Two Regions, One Report',    'assembly_deck', 4, 'Social Studies'),
  ('SS.5.4C-AD',   'Assembly Deck: What the Expedition Was For','assembly_deck', 5, 'Social Studies'),
  ('ELA.3.12B-AD', 'Assembly Deck: The Lunchroom Recycling Report', 'assembly_deck', 3, 'ELAR'),
  ('ELA.5.12C-AD', 'Assembly Deck: The Case for Later Practice','assembly_deck', 5, 'ELAR')
ON CONFLICT (standard) DO NOTHING;

UPDATE cases SET
  learning_target = 'I can build a paragraph that uses evidence, and explain why the sentences I left out do not belong.',
  lesson_summary  = 'Students assemble three paragraphs one sentence at a time, decide what each leftover sentence was really doing (an opinion, a contradiction, an unsupported claim, an anecdote), put the finished paragraphs in the order a reader needs, and write a short explanation S.A.M. reads first. About 20 minutes.'
WHERE standard IN ('3.6A-AD', '4.10B-AD', 'SS.4.6B-AD', 'SS.5.4C-AD', 'ELA.3.12B-AD', 'ELA.5.12C-AD');

-- Per-case targets, so the standards report reads right.
UPDATE cases SET learning_target = 'I can explain what a magnet test shows about a material, and what it cannot show.'
  WHERE standard = '3.6A-AD';
UPDATE cases SET learning_target = 'I can use survey evidence to explain erosion and deposition at a creek bend.'
  WHERE standard = '4.10B-AD';
UPDATE cases SET learning_target = 'I can compare two Texas regions using evidence, without turning the comparison into an opinion.'
  WHERE standard = 'SS.4.6B-AD';
UPDATE cases SET learning_target = 'I can judge the Lewis and Clark expedition against the orders it was actually given.'
  WHERE standard = 'SS.5.4C-AD';
UPDATE cases SET learning_target = 'I can write an informational paragraph that gives readers facts instead of opinions or stories.'
  WHERE standard = 'ELA.3.12B-AD';
UPDATE cases SET learning_target = 'I can build an argument with a claim, evidence, and an honest answer to the other side.'
  WHERE standard = 'ELA.5.12C-AD';

-- Check: expect 1, 6
SELECT
  (SELECT count(*) FROM information_schema.columns WHERE table_name = 'submissions' AND column_name = 'assembly_deck_data') AS data_column,
  (SELECT count(*) FROM cases WHERE engine = 'assembly_deck') AS assembly_deck_cases;
