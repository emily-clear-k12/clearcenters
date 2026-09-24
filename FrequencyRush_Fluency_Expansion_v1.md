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
2. ~~Teacher spelling lists: generated or teacher-typed wrong spellings?~~ **Decided Sept 24: generated automatically.** Checked against an English dictionary so none is a real word, and teachers can re-roll any word before saving (§11.10).
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

**Added Sept 24 (Emily's ask): the teacher sets the time per question.** On the assign page, next to the game world, there are chips for No timer and 5, 8, 10, 15, 20 or 30 seconds. The setting is stored as `assignments.question_seconds` and applies to every Frequency Rush assignment, vocabulary included. The site passes it to the game's `configure({ questionSeconds })`, which is supported in all 4 worlds and tested in each. A timeout counts as a miss. The server measures the speed bonus against the teacher's time, and uses the old 8 seconds when there's no timer. The game's own "Add an 8-second timer" checkbox is hidden, so students can't change it.

**Still open for step 1:** run the SQL, push, then play one set live. The run-length default (10 rounds) is not tuned yet.

### 11.9 · Step 2 built (Sept 24): ELAR word study, 12 sets, 360 questions

- **Emily's picks, 30 questions each:**
  - Grade 3: 3.3D Homophones, 3.3C Prefixes and Suffixes, 3.3D Synonyms/Antonyms/Idioms, 3.11D Parts of Speech.
  - Grade 4: 4.3D Homophones, 4.3C Affixes and Roots, 4.11D Irregular Past Tense, 4.9B Simile/Metaphor/Personification.
  - Grade 5: 5.3C Affixes and Roots, 5.3D Adages and Puns, 5.11D Grammar Fix-Ups, 5.2B Spelling Changes.
- **Case codes** follow `ELA.<teks>-FR-<SET>`, for example `ELA.4.3D-FR-HOM`, so the assign page groups them under the TEKS code.
- **Authored sets** live in `lib/cases/frequency-rush/skills/<code>.js`, one JSON bank per set. `lib/frequencyRushSkills.js` registers them as `kind: "authored"`. The server grades from the bank. Answer-button ids are a hash of the choice text, so they don't reveal the answer. Each set carries its own header labels.
- **Checker:** `tools/frequency-rush-skillcheck.cjs` (rule 17). Sentence limits are 16 / 21 / 25 words for grades 3 / 4 / 5. These are short items, so an FK score isn't meaningful for them; sentence length is the gate.
- **Review:** `FrequencyRush_ELAR_WordStudy_Review_v1.md`. SQL: `add_frequency_rush_elar_skills.sql`.
- **Choices that need Emily's eye** are listed at the top of the review sheet: the 3.11D naming-versus-editing split, the repeated prompt in 5.11D, the made-up misspellings in 5.2B, and the two literal lines in 4.9B.

### 11.10 · Step 3 built (Sept 24): teachers' own word lists

- **Teacher side:** the Word Lists page (`/teacher/word-lists`). Type, paste or upload (.txt/.csv) one word and its definition per line. A dash, colon, comma, equals sign or tab separates them, so two columns pasted from a spreadsheet work too. A "word / definition" header line is skipped. Choose grade, subject, and Meaning and/or Spelling questions. **Check list** shows each word with its three generated wrong spellings; ↻ re-rolls a word. **Save List** creates a private case `FR.C.<teacher8>.<id>`, listed under "My Word Lists" on the assign page. A list can be deleted until it's assigned.
- **Rules:** 4–30 words. Every word needs a definition of 3–100 characters. No repeated words or definitions. A definition can't contain its own word.
- **Wrong spellings** (`makeMisspellings`): they come from real mistake types, likeliest first. Each must keep the same first letter (or a same-sound one: ph→f, kn→n, wr→r, c↔k) and stay within 2 letters of the real length. It **must not be a real English word** (SCOWL/hunspell en_US, affixes expanded, packed into `lib/data/englishWords.js`), must not match another list word, and must not add a rude string. Wrong spellings are saved with the list, so the teacher sees exactly what students get. The server re-checks them on save.
- **In the game:** per word, one meaning question (random direction) and one spelling question. Words that can't get two wrong spellings get meaning questions only. Items are `sort_bins`. The ids are `cl:<index>:<m1|m2|sp>`, and they're graded against the saved list. The header reads "WORD LIST · Pick the best answer."
- **SQL:** `add_frequency_rush_word_lists.sql`, creating the table `frequency_rush_custom_lists` with RLS on and no policies.

### 11.10b · Step 4 built (Sept 24): My Missed Words

- **Missed** means the latest answer was wrong, or 2 of the last 3 were wrong. It clears once the student answers right. It's tracked per activity (case code), across its assignments, over the student's last 30 runs (`lib/frequencyRushMissed.js`).
- **Skill sets, word study and custom lists:** up to 4 retries plus fresh questions make exactly 10, the game's run length, so every retry appears. Items are rebuilt from their keys with new shuffles (`skillItemForKey`, `customItemForKey`).
- **Vocabulary units:** the word bank is trimmed to 10 with the missed words kept; missed sort questions are kept the same way. The game builds its own rounds from that bank, so retries are likely rather than certain.
- **On screen:** a banner before the run, plus the in-game header "SECOND CHANCE · ONE MORE TRY" on retry questions. The site matches the question text; the game file is unchanged.
- No SQL. It reads existing tables, and a failure just means a normal run.

### 11.10c · Step 5 direction decided (Sept 24): the Star Chart

- **Name: "Star Chart"** (the sidebar and the student page). It replaces the working name "Living Word Wall."
- **Look: a Star Map.** Every word or fact is a star: dim red means needs work, warm yellow means learning, bright white-blue means lit. The three states also differ in size and brightness, not only in hue. Stars group into constellations, one per assigned unit or skill set; activities that haven't been assigned never show.
- **Design rule: each screen answers one question, and the rest waits behind a tap.** No full class grid, no rankings, and never more than three to-do items at once.
- **First build: the teacher desk view and the student's My Sky.** Projector mode and the 10×10 Fact Wall grid wait for a later pass.
  - **Teacher:** "Reteach next" (the 3 words the most students are missing, each with a Quick run button), then the class sky ("18 of 24 lit" per constellation). Tap a constellation to list its stars; tap a star to see which students are stuck and launch a quick run for just them. A scope switch covers the whole class or a group.
  - **Student:** a lit-count and a "new this week" count; "Power up these 3" with a **Play my 3** button (those words come back as SECOND CHANCE); then My Sky, their own stars only, where newly lit stars twinkle and tapping a star shows the word, its definition and an encouraging status line.
- **Mockup:** the "Star Chart Mockup" canvas (a Claude artifact, sample data). Emily approved the direction on seeing it: "this is the way to go."
- **Still to settle before building:** exact thresholds for a lit star per student and per class. The design doc §3 model is breadth-based with separate sessions for lit and one-tier regression.

### 11.10d · Step 5 built (Sept 24): the Star Chart

- **Pages:** `/teacher/star-chart` (teacher desk view) and `/star-chart` (student My Sky), both in their sidebars. Built as in §11.10c.
- **Data:** `lib/starChart.js` (server). It computes per-student statuses from sessions and attempts: *lit* = 2 separate right runs and not missed; *needs* = missed (the step-4 rule); *learning* otherwise. It also records "lit at" for the student view.
- **Shared, browser-safe:** `lib/starChartLayout.js` holds the class rule (lit at 80% lit; needs when 25% of those who tried are stuck), the grid layout (300×250 cells, up to 16 stars drawn, stable positions per star), and the star looks. `components/StarSky.js` draws the sky for both pages.
- **Quick run:** a new targeted assignment of the same activity for the stuck students, copying the class's latest world and timer.
- **Later:** Projector mode, the Fact Wall grid, and one-tier regression.
- **Colors changed the same night (Emily):** stars use the teacher home page's score bands (`scoreColor` in `components/teacher/TodayBridge.js`): ≤50 red, <70 orange, <80 yellow, <90 green, else blue. A student's star = percent right on their last 5 answers; a class star = the average over students in view who tried it. On the dark sky, yellow, green and blue are slightly brighter versions of the same hues so they stay visible; the white side panel uses the exact home colors. "Lit" = 80%+. Stuck students still follow the My Missed Words rule.

### 11.11 · Parked for later (Sept 24): more game modes for the question banks

**Why:** Emily raised this: the flying ship will get boring, and the question banks are getting large. Parked, not decided.

**The key fact:** any game that exposes the run game's API (`setQuestionBank`, `configure`, `onComplete`) can play every question type already built: facts, word study, custom lists, vocabulary and sorts. A new mode is a new export from Emily's game generator. The content isn't touched.

**Ideas, grouped by feel:**
- **Fast** (short items: facts, homophones)
  1. Hover Race: correct answers boost you, and you race your ghost (ties to step 6).
  2. Mining Dig: answers refuel the drill, and rare crystals sit deeper down.
- **Strategic** (longer items: grammar, adages; untimed)
  3. Solo Base Defense: reuses Signal Defense's art and mechanics.
  4. Dungeon Doors: each door is a question, and the boss room is your missed words (ties to step 4).
  5. Card Battle vs. a Boss: fight the computer, never a classmate.
- **Calm / collecting** (the long-term hook)
  6. Deep-Space Fishing: answers reel in alien creatures for a year-long Creature Codex.
  7. Playable Outpost Builder: answers earn materials you spend on your own base.
- **Whole class**
  8. Quiz Show: a Jeopardy-style team board (Group Live).
  9. Class Boss Raid: everyone's correct answers damage one projector boss (builds on Distress Call).

**Design notes to carry forward:**
- **Match the mode to the pace of the question type.** Long-sentence items don't suit reflex games. Consider a `pace` tag per set (fast / steady / calm) so the site suggests the right modes.
- **Rotation keeps it fresh.** The teacher allows several modes and students choose, and/or modes unlock through the Galaxy Hub worlds. That would give the 4 unfinished worlds (Frostveil, Cindara, Solara, Cloudreach) their reward.
- Every mode must pass §2.13a: each correct answer does something immediate and personal. No player-vs-player competition.
