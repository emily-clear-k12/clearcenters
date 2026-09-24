# Frequency Rush — Fluency Expansion (Math + ELAR) · Design v1

*Companion to `FrequencyRush_Digital_Design_v1.md`. Its numbering continues that doc as §11. Read that doc for the run game, the Word Wall, Distress Call and Signal Ops. This file covers the Sept 24, 2026 decisions only. It is a design note, not a status document; status lives in `ClearCenters_STATE.md`.*

## 11 · Sept 24, 2026 — Frequency Rush becomes the fluency center (Math + ELAR expansion), decided

**Why:** Frequency Rush was built for Science and Social Studies vocabulary only. ClearCenters now covers all four subjects in every center. Emily wants Frequency Rush to be "so much more." **The job it takes on:** it's the only center that trains *speed and automaticity*. None of the other centers do, and several Math and ELAR TEKS ask for exactly that.

### 11.1 · What was true before this decision (checked in code, Sept 24)

- **One live mode:** Individual Practice, meaning the run game. It comes in 4 world skins exported from Emily's generator tool (Asteroid, Cloudreach, Frostveil, Cindara), listed in `lib/frequencyRushSkins.js`.
- **Question types the game file supports:** `lock_signal`, `true_false`, `frequency_fill`, `odd_signal_out` (in the game, but the site never turns it on), `sort_bins`, and the multi-item `classification`. That list comes from `getCapabilities()`.
- **Content:** Science and Social Studies vocabulary in `frequency_rush_words`, plus 50 sort banks in `lib/cases/frequency-rush/classify/`.
- **The game file cannot** show an image inside a question, read text aloud (its only audio is sound effects), or take a typed answer.
- **Designed but never built:** Group Live, the Living Word Wall, Signal Match, Picture Signal, and teacher word lists (§9 item 12).

### 11.2 · The key finding: `sort_bins` is already a general question type

Each `sort_bins` item carries **its own** 2–6 answer buttons, plus an optional `rule`, `explanation` and `metadata` (see `cleanSortBinsBank` in the game file). So any "prompt plus a few buttons" question already runs in all 4 skins with **no re-export**. That covers math facts, written comparisons, homophones in context, word-part meanings, synonyms and antonyms, parts of speech, picking the correctly punctuated sentence, figurative language, and spelling by sight.

### 11.3 · Decisions (Emily, Sept 24)

- **Content in scope:** Math fluency and picture rounds, ELAR word study, and teacher's own lists. **Math and ELAR vocabulary** (word/definition/sentence, same as Science) is also wanted, but **comes later.** Emily chose to put the effort into skills first.
- **Features in scope:** My Missed Words, the Living Word Wall (plus a Fact Wall for math), and a daily warm-up with a ghost race. **Group Live was not picked** this round. Its design stands and it's parked.
- **Where new question types live: the hybrid path Claude recommended.** Everything that fits `sort_bins` runs today. The three things the game can't do go into **one** spec, so Emily re-exports the 4 skins once: pictures in questions, read-aloud, and typed answers (optional).
- **Build order, approved:**
  1. Skill sets + Math facts.
  2. ELAR word study sets.
  3. Teacher's own lists.
  4. My Missed Words.
  5. Living Word Wall + Fact Wall.
  6. Daily warm-up + ghost.
  7. The re-export spec (pictures + read-aloud).
- **The first Math facts set:** × and ÷ to 10×10 (TEKS **3.4F**, verified in the Math PDF: "recall facts to multiply up to 10 by 10 with automaticity and recall the corresponding division facts"), **plus + and − facts** as foundation support. Basic +/− facts are below grade 3 in the TEKS. The nearest grade 3 code is 3.4A (fluency within 1,000), so whether the +/− set carries that tag or goes untagged is Emily's call (§11.7).

### 11.4 · Skill sets — the new content unit

A **skill set** is a small group of questions tied to one TEKS code. A teacher assigns it the way she assigns a vocabulary unit today.

- **Two kinds:**
  - **Generated** sets are built by code at run start, with no written content. Examples: × facts, ÷ facts, +/− facts.
  - **Authored** sets are written items, drafted by Claude and approved by Emily. Examples: ELAR homophones, affixes, parts of speech.
- **Both feed the game as `sort_bins` items.** The game code doesn't change.
- **Generated math wrong answers must be real near misses, not random numbers.** Examples: the neighboring fact (7×7 or 7×9 when the answer is 7×8), the fact with one digit swapped, and the sum given instead of the product (7+8=15 for 7×8). This follows the project rule that wrong answers target real misconceptions.
- **Every item needs a stable id** (for example `mul:7x8`, `div:56/8`). My Missed Words and the Fact Wall track at the level of the single fact or word.
- **Grading stays on the server.** Today the submit route re-scores `sort_bins` answers by looking them up in the written sort banks (`findSortBinItem`). Generated items won't be in any bank, so the server has to **recompute** a generated item from its id. A student can never report their own answer key.

### 11.5 · ELAR word study — candidate TEKS (verified in the ELAR PDF Sept 24; the per-grade list is chosen when the sets are drafted)

- **Spelling:** 3.2B / 4.2B / 5.2B. Homophones appear as 3.2B(ii) and 4.2B(ii).
- **Word meaning:** 3.3D (antonyms, synonyms, idioms, homophones, homographs) and 4.3D (homophones).
- **Affixes and roots:** 4.3C and 5.3C.
- **Grammar and punctuation:** 3.11D and 4.11D. The subparts cover verb tense, nouns, adjectives, adverbs, pronouns, punctuation and spelling.
- **Figurative language:** 3.10D and 4.10D (the author's use of figurative language), and 4.9B (simile, metaphor and personification in poetry).
- **Context clues:** 3.3B, 4.3B and 5.3B.

Spelling *by ear* (hear the word, pick the spelling) waits for read-aloud in the re-export. Until then, spelling runs as *spot the correct spelling* by sight.

### 11.6 · Reused from Relay Station, not rebuilt

- **Daily warm-up and weekday streaks:** the Daily Transmission pattern.
- **Ghost race:** Relay Station's ghost racer.
- **Your own lists:** the Typing Texts paste-your-own pattern.
- **The Fact Wall heatmap:** styled on the class trouble-key heatmap.

### 11.7 · Open decisions from this section

1. ~~The +/− facts set: tag it 3.4A, or leave it untagged?~~ **Decided Sept 24: tag it 3.4A.**
2. **Teacher spelling lists need wrong-answer spellings.** They can be generated (dropped or doubled letters, vowel swaps) or typed by the teacher. Generated misspellings risk being silly or accidentally correct. A quality check is needed before this ships.
3. ~~Where do skill sets appear on the assign page?~~ **Decided Sept 24: under the existing Math and ELAR subject tiles**, like every other center's cases.
4. **Should a skill set also include vocabulary questions** once Math and ELAR vocabulary exists, or stay pure skill practice?
5. **Group Live** is parked. Revisit after the Wall exists.

### 11.8 · Step 1 built (Sept 24): skill sets + Math facts

**Files** (all written to the app folder; none committed or pushed):
- `lib/frequencyRushSkills.js` (new): the six sets, the fact generator with near-miss wrong answers, and `recomputeSkillItem` for grading.
- `app/api/frequency-rush/start/route.js`: a skill-set case builds 24 fresh facts per run and skips the vocabulary loading.
- `app/api/frequency-rush/submit/route.js`: skill answers are graded by recomputing the fact from its id, and each answer saves an `item_key`. If the column is missing, the answers save without it rather than failing.
- `app/activity/[assignmentId]/FrequencyRushClient.js`: facts refresh on every replay, and the game's "Sort the Bins" header is relabeled to "MATH FACTS / RAPID SIGNAL / Pick the answer."
- `lib/frequencyRushSkins.js`: records which worlds support `sort_bins`.
- `add_frequency_rush_skills.sql`: adds `frequency_rush_attempts.item_key`, makes `word_id` nullable, and inserts the six `cases` rows. Tested twice on a local Postgres.

**The six sets** (Math, Grade 3): `MA.3.4F-FR-MUL`, `-DIV`, `-MIX` and `MA.3.4A-FR-ADD`, `-SUB`, `-MIX`. Facts run 1–10 on each side, so there are no ×0 facts. Mixed sets split the operations half and half.

**Verified:**
- 57,600 generated items: every one has 4 distinct choices including the answer, no negatives, and regrades correctly from its id. Forged or out-of-set ids are rejected.
- Real runs in Asteroid Run and Cloudreach Run through a headless browser: the game accepted the items, the header was relabeled, and the game's own right/wrong matched the server's grading on every answer.

**Found while building: Frostveil Run and Cindara Run don't support `sort_bins` at all.** Their `getCapabilities()` lists only vocabulary and classification. So a skill set assigned in those worlds now plays in Asteroid Run instead (`getSkinForSortBins`). **The same gap already affects the existing Science and Social Studies sort banks in those two worlds.** The sort rounds are silently missing there. The fix is the re-export in step 7: all 4 skins should export from the same game version.

**Still open for step 1:** run the SQL, push, then play one set live. The run-length default (10 rounds) and whether facts should use the game's optional per-question timer are not tuned yet.
