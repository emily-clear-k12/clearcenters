-- Frequency Rush ELAR word-study sets (Sept 24, 2026). Design: FrequencyRush_Fluency_Expansion_v1.md §11.5.
-- The questions live in the code (lib/cases/frequency-rush/skills/). This only adds the 12 case rows,
-- so the sets appear under ELAR on the assign page. Safe to run more than once.

INSERT INTO cases (standard, title, engine, grade, subject, unit) VALUES
  ('ELA.3.3D-FR-HOM', 'Frequency Rush: Homophones', 'frequency_rush', 3, 'ELAR', 'skill'),
  ('ELA.3.3C-FR-AFX', 'Frequency Rush: Prefixes and Suffixes', 'frequency_rush', 3, 'ELAR', 'skill'),
  ('ELA.3.3D-FR-SYN', 'Frequency Rush: Synonyms, Antonyms, and Idioms', 'frequency_rush', 3, 'ELAR', 'skill'),
  ('ELA.3.11D-FR-POS', 'Frequency Rush: Parts of Speech', 'frequency_rush', 3, 'ELAR', 'skill'),
  ('ELA.4.3D-FR-HOM', 'Frequency Rush: Homophones', 'frequency_rush', 4, 'ELAR', 'skill'),
  ('ELA.4.3C-FR-AFX', 'Frequency Rush: Affixes and Roots', 'frequency_rush', 4, 'ELAR', 'skill'),
  ('ELA.4.11D-FR-IRV', 'Frequency Rush: Irregular Past-Tense Verbs', 'frequency_rush', 4, 'ELAR', 'skill'),
  ('ELA.4.9B-FR-FIG', 'Frequency Rush: Simile, Metaphor, and Personification', 'frequency_rush', 4, 'ELAR', 'skill'),
  ('ELA.5.3C-FR-AFX', 'Frequency Rush: Affixes and Roots', 'frequency_rush', 5, 'ELAR', 'skill'),
  ('ELA.5.3D-FR-ADG', 'Frequency Rush: Adages and Puns', 'frequency_rush', 5, 'ELAR', 'skill'),
  ('ELA.5.11D-FR-GRM', 'Frequency Rush: Grammar Fix-Ups', 'frequency_rush', 5, 'ELAR', 'skill'),
  ('ELA.5.2B-FR-SPL', 'Frequency Rush: Spelling Changes', 'frequency_rush', 5, 'ELAR', 'skill')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title,
  engine = EXCLUDED.engine,
  grade = EXCLUDED.grade,
  subject = EXCLUDED.subject,
  unit = EXCLUDED.unit;

UPDATE cases SET learning_target = 'I can choose the right homophone for a sentence.', lesson_summary = 'Pick the homophone that fits: their/there/they''re, to/two/too, hear/here and more. 30 questions.' WHERE standard = 'ELA.3.3D-FR-HOM';
UPDATE cases SET learning_target = 'I can use prefixes and suffixes to figure out what a word means.', lesson_summary = 'The affixes named in 3.3C: dis-, non-, pre-, in-, im-, -ful, -ness, -y. 30 questions.' WHERE standard = 'ELA.3.3C-FR-AFX';
UPDATE cases SET learning_target = 'I can find synonyms and antonyms and explain what an idiom means.', lesson_summary = '12 synonym, 12 antonym and 6 idiom questions, with the opposite word as a trap. 30 questions.' WHERE standard = 'ELA.3.3D-FR-SYN';
UPDATE cases SET learning_target = 'I can name the part of speech of a word and use the right form.', lesson_summary = 'Nouns, verbs, adjectives, adverbs, pronouns, prepositions and conjunctions, plus comparatives and verb tense. 30 questions.' WHERE standard = 'ELA.3.11D-FR-POS';
UPDATE cases SET learning_target = 'I can explain the meaning of homophones like reign and rain.', lesson_summary = 'Harder homophones: reign/rein, principal/principle, capital/capitol, whether/weather. 30 questions.' WHERE standard = 'ELA.4.3D-FR-HOM';
UPDATE cases SET learning_target = 'I can use mis-, sub-, -ment, -ity and the roots auto, graph and meter to find meaning.', lesson_summary = 'The affixes and roots named in 4.3C. 30 questions.' WHERE standard = 'ELA.4.3C-FR-AFX';
UPDATE cases SET learning_target = 'I can use the correct past tense of irregular verbs.', lesson_summary = 'Pick the right past-tense verb. Wrong choices are real mistakes like throwed, brang and seen. 30 questions.' WHERE standard = 'ELA.4.11D-FR-IRV';
UPDATE cases SET learning_target = 'I can tell a simile, a metaphor and personification apart.', lesson_summary = 'Name the kind of figurative language in a line. Includes two literal lines. 30 questions.' WHERE standard = 'ELA.4.9B-FR-FIG';
UPDATE cases SET learning_target = 'I can use trans-, super-, -ive, -logy and the roots geo and photo to find meaning.', lesson_summary = 'The affixes and roots named in 5.3C. 30 questions.' WHERE standard = 'ELA.5.3C-FR-AFX';
UPDATE cases SET learning_target = 'I can explain the meaning of adages and puns.', lesson_summary = '20 adages and 10 puns. 30 questions.' WHERE standard = 'ELA.5.3D-FR-ADG';
UPDATE cases SET learning_target = 'I can pick the sentence that follows the rules of standard English.', lesson_summary = 'Fragments, run-ons, agreement, irregular verbs, comparatives, capitals, quotation marks and commas. 30 questions.' WHERE standard = 'ELA.5.11D-FR-GRM';
UPDATE cases SET learning_target = 'I can spell words when a suffix changes the sound, like select and selection.', lesson_summary = 't-to-sh and k-to-sh changes: select/selection, music/musician, celebrate/celebration. 30 questions.' WHERE standard = 'ELA.5.2B-FR-SPL';
