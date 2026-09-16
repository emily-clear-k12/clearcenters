-- Sept 16, 2026 — retire the Signal Check "Weigh-In" and "Thread" formats.
--
-- Run this once in the Supabase SQL editor.
--
-- Signal Check briefly shipped each TEKS standard in three formats. Only
-- the original (Verdict) is left; the code that ran the other two is gone
-- and their case content has been removed from the app. These rows are
-- what still puts them in the teacher's Challenge Library, so they need to
-- come out of the database too.
--
-- The app also filters these out on its own, so nothing breaks if this
-- never gets run — the library just stays correct either way.

-- First, look at what's about to be removed (safe to run on its own):
SELECT standard, title, grade, subject
FROM cases
WHERE standard LIKE '%-SC-WI'
   OR standard LIKE '%-SC-TH'
ORDER BY grade, subject, standard;

-- Then delete them:
DELETE FROM cases
WHERE standard LIKE '%-SC-WI'
   OR standard LIKE '%-SC-TH';

-- Assignments and submissions are deliberately left alone. If a teacher
-- already assigned one of these, the record of it and any work students
-- turned in stays exactly where it is.
