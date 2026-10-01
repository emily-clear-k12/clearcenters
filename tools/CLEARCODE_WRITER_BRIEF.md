# ClearCode ruin writer brief

You are writing ClearCode ruin content files for ClearCenters (Next.js app in /home/claude/clearcenters). ClearCode is daily word-reading practice for struggling readers in grades 3–5: students with dyslexia, emergent bilingual students, and any student reading below grade level. A 5th grader may be reading at a kindergarten–2nd grade level. Words follow the student's skill, but the content must never feel babyish: grown-up word choices where possible (hull, vent, drill, jet, lab, gap), a sci-fi exploration story, no cute talk.

## The world
Students are code experts on a crew exploring the ruins of an ancient civilization (the "builders" or "makers") on far planets. The builders' writing works like English letters and sounds. Each ruin teaches one phonics pattern in UFLI Foundations order. Each ruin is a place (grown-up name like "Mud Flats", "Ruin of Tides", "The Archive"), has a relic the crew recovers, and 4 short logs (inscriptions) that tell a mini-story across the 4 chambers, ending with finding the relic. The big mystery across the whole ladder: who built the ruins and where did they go? (Hints so far: they marked gates with signs, they tracked water across planets, and in the end the crew learns they left on a mission and left directions for anyone who could read their code.) Drop small clues; don't solve it.

Crew names you can use (only when the name is decodable at that ruin, or put it in `heart`): Tam, Kit, Gus, Mel, Ray, and S.A.M. (the crew's robot, write it as "Sam" in logs only if decodable, otherwise skip it). You may invent other decodable names.

## Read first
- `lib/clearcode/ruins/A3.js` (early ruin, sounds wall, no forge), `G1.js` (vowel team, syllable wall, forge), `K1.js` (advanced, custom `game`). Match their exact shape and tone.
- `lib/clearcode/ladder.js` for your ruin's pattern, UFLI lesson numbers, and its placement probe words (don't reuse the probe words as codex words; it's fine if they appear in the bank).

## File shape (every field required unless noted)
- `id`, `name`, `find` (regex string matching the code inside a word, e.g. "ai|ay", "a[^aeiou]e" for a_e), `code {label, spellings[], rule}`.
- `sort {yes, yesHint, no, noHint, hintYes(w), hintNo(w)}`: the sorting vault. yes = words with the code (from `bank`), no = look-alike words without it (from `contrast`).
- `codex`: exactly 6 words `{w, parts, hi}`; `parts` join to `w`; `parts[hi]` is the chunk with the code (must match `find`).
- `checks`: 12 triples `[answer, foil, foil]` (answer has the code, foils are look-alikes). All REAL words.
- `vaultPicks`: 8 more triples, different words from `checks`. Real words.
- `bank`: 20–40 real words with the code (no repeats). `contrast`: 12–16 real look-alike words WITHOUT the code. If the sort needs contrast words that contain the code (like K1 shun/zhun), add `game: {targets, decoys}` where targets have the code and decoys don't.
- `wall`: `{mode: "sounds", words: [{w, cuts}]}` for one-syllable ruins (cut between sounds, never inside a digraph like sh/ck/ai), or `mode: "syllables"` from Planet D onward and whenever the words are multi-syllable. `cuts` are letter indexes, ascending. 6 words.
- `forge`: `null` for ruins before suffixes/prefixes are taught; otherwise `{items: [{w, clue, parts, explain}], extra: [{t, k}]}` where k is "pre" | "base" | "suf". Only use affixes the student has been taught (endings -s, -es, -ed, -ing come at D1; -er/-est I1; -ly/-less/-ful I2; un-/pre-/re- I3; dis- I4).
- `door`: 6–7 spelling words `{w, parts, extra}`; `parts` are sound-by-sound chips joining to `w`; `extra` = 2 look-alike chips (e.g. "ay" vs "ai").
- `chains`: 2 chains of 4–5 real words, each step changes exactly ONE letter (same length).
- `heart`: irregular high-frequency words allowed in this ruin's logs that would otherwise fail the checker (the, a, I, said, was, of, to, do, you, are, they, have, one, what, from, there, were, your, put, come, some, he, she, we, me, be, no, go, so, my, by, too, who, water...). Only truly irregular or not-yet-decodable high-frequency words; never use `heart` to sneak in a content word.
- `vaultFake`: 2–4 triples of MADE-UP words `[target, foil, foil]` that use the code. This is the ONLY place made-up words are allowed (Emily does not want many nonsense words).
- `inscriptions`: exactly 4 `{title, text}`, 40–90 words each, each with at least 3 words containing the code (more is better: 6+). DECODABLE: use only patterns taught at or before this ruin (UFLI order on the ladder) plus `heart` words. Real, plain, grown-up sentences; a little suspense. No made-up words.
- `relic {name, caption}`, `story` (one sentence: what happens in this ruin), `spanish` (one or two sentences for teachers: how this pattern relates to Spanish), `miniLesson {title, steps}` (5 concrete steps for a 5-minute small-group reteach, in a teacher's voice).
- Comment block at the top like A3/G1: ruin id, pattern, UFLI lesson, what the decodable rule is.

## Writing rules
- Plain words. Don't use em dashes in student-facing text. Feedback hints (`hintYes`, `hintNo`) explain the code in one short sentence.
- Skill first: early ruins need simple CVC words; still prefer older-sounding words (lab, jet, gap, dig, rig, mop, hut, pit, tab, vat).
- Every word a student reads must be a real word, appropriate for school (no slang, nothing crude).
- Before the ruin that teaches blends (B6), words in logs can't have consonant blends (st, tr, nd, mp...). Before short e (A4) there is no letter e at all in logs except heart words. Before ck (B2), no ck. Plurals with -s are fine from A5 (and A3 already uses them lightly).

## Checking
Run `node tools/clearcode-check.cjs <IDs>` (e.g. `node tools/clearcode-check.cjs B1 B2 B3`) after writing. It checks shape, that the code appears where it must, one-letter chain steps, and a decodability proxy for logs (it flags words that show a spelling marker from a LATER ruin). Fix everything until it prints "All checks passed." The proxy can't catch everything, so also reread each log yourself, word by word, against the ladder order.

Only create your own ruin files in `lib/clearcode/ruins/`. Don't edit any other file.
