# ClearCenters — STATE
**Current truth. Start here.** · Last updated: September 24, 2026, afternoon (**Reconciled with the app folder: Assembly Deck is now 66 cases and Classification Lab is built with 8 cases, both from other sessions that STATE never logged. Their SQL run status is UNKNOWN**) · Sept 24 midday: (**Maker Studio designed: the next new center, merging Museum Exhibit/Field Dispatch into it; design only, nothing built. New site-wide rule: a confidence check on every submit (§9 rule 21)**) · Sept 23 afternoon: (**Signal Check re-leveled: all 108 registered cases now read on grade — written to the app folder, NOT yet committed or pushed; no SQL needed**) · earlier Sept 23: Mission Map ELAR 12 authored and all 49 Mission Map cases re-leveled; Assembly Deck's first pilot and its fixes; Math 12 authored · *state updated at session end*

*Reconciled from four sources: the Claude project · `ClearCenters_Project_Files.zip` · `ClearCenters_MANIFEST.md` · and both device folders.*
*Supersedes `ClearCenters_PROJECT_SPRINGBOARD_v4.md` (stale — predates Newsroom).*

---

## 0 · HOW THIS FILE IS USED  *(read this first, every session)*

**This file is the master. Everything else is a view of it.**

| Thing | Who reads it | Who updates it |
|---|---|---|
| **`ClearCenters_STATE.md`** *(this file)* | **Claude, automatically, every session** | Claude, at the end of each session |
| `ClearCenters_Tracker.html` | Emily, between sessions | Emily clicks · Claude regenerates it from this file |
| `ClearCenters_Move_Checklist.html` | Emily, one-time cleanup | Emily clicks |
| `START_HERE.txt` · `NAMING_RULES.txt` | Emily, when orienting | Rarely |

**Claude cannot see Emily's tracker ticks** — they live in browser storage. If work happened
outside a session, either Emily says so, or she clicks **Backup** in the tracker and drops the
`.json` into `00_START_HERE`, where Claude can read it.

**Note (Sept 4, 2026): Emily asked to pause Tracker regeneration for now** ("no more updating
the tracker for now") — this file (STATE.md) and design docs are still being kept current every
session as usual; only the `ClearCenters_Tracker.html` regeneration step is on hold until she
says otherwise.

### The session protocol

1. **Start.** Claude reads this file from the project. Emily does not need to upload anything.
2. **Work.** Claude notes every change to state as it happens.
3. **End.** Emily says **"update state"** — or **Claude offers it unprompted** whenever this
   session changed what is true. Claude then:
   - rewrites this file in the Claude project,
   - writes the same file to `00_START_HERE\ClearCenters_STATE.md`,
   - regenerates `ClearCenters_Tracker.html` so it matches (**paused for now — see note above**),
   - and states plainly what changed.

**Claude: if a session ends without step 3, this file has already started going stale.
Offer it. Do not wait to be asked.** The previous springboard died exactly this way — it was
well written and nothing forced it current.

*(Sept 22, 2026: the `00_START_HERE` copy could not be written this session — only the
`clearcenters` app folder is connected to the session, not `ClearCenters - Masters`. The project
copy and a copy at the app folder's root are both current; the Masters copy needs Emily to drop
it in, or a folder grant next session.)*

### The three-line update rule

Every update to this file records: **what changed · what is now true · what is still open.**
Nothing else. This file is a status document, not a design document — design notes live in
`05_REFERENCE`.

---

## 0.5 · SESSION LOG

**Sept 24, 2026 (late night) — Frequency Rush step 5: the Star Chart (the Living Word Wall). Built; no SQL needed; not pushed.**

*What changed*
- **Design approved through a clickable mockup** ("Star Chart Mockup" canvas). Emily: "this is the way to go." Name: **Star Chart**. Frequency Rush keeps its name for now.
- **Teacher page** `/teacher/star-chart` (sidebar: Star Chart). One question: *what do I reteach next?*
  - Class tabs, plus a Whole class / A group switch; the group is picked by tapping names.
  - **Reteach next:** the 3 stars the most students are stuck on, each with a **Quick run** button. It assigns that activity again to just those students, keeping the class's world and timer. My Missed Words brings their misses back as SECOND CHANCE.
  - **The class sky:** one constellation per Frequency Rush activity assigned to the class. Tap a constellation to list its stars; tap a star to see who's stuck and quick-run them. Names never appear on the sky.
- **Student page** `/star-chart` (student sidebar: Star Chart). One question: *what's mine to work on?* It shows stars lit and new this week, **Power up these 3** with Play buttons, and My Sky: their own stars only, newly lit ones twinkling, tap for the word and meaning. It's never compared to classmates, and only includes activities the student can see (targeting respected).
- **Rules** (Emily agreed "keep working" to the proposed thresholds):
  - A **student's** star is *lit* after 2 separate right runs while not missed, *needs work* while it's a missed question (the My Missed Words rule), and *learning* otherwise.
  - The **class** star is *lit* when 80% of the students in view have lit it, *needs work* when 25% of those who tried are stuck, and *learning* otherwise. Grey means nobody has practiced it.
  - A constellation draws up to 16 stars, the ones needing attention first; the side list has them all.
- **Stars come from every content type:** vocabulary units (words), math facts (appear as practiced), ELAR word study (the answer word) and custom lists (per word). Facts from separate assignments of the same activity are combined.
- **No new tables:** everything is computed from `frequency_rush_sessions` and `frequency_rush_attempts` on each visit, with paging past Supabase's 1,000-row limit.
- **Tested:** the data logic against a mock database (per-student and class statuses, a student seeing only their own data, "lit this week" dates), and the sky layout drawn from the real layout code and screenshotted. **Not tested:** the React pages themselves render, because React can't be installed in the sandbox; esbuild/npm are blocked. Syntax-checked only.
- Files (new): `lib/starChart.js`, `lib/starChartLayout.js`, `components/StarSky.js`, `app/api/teacher/star-chart/route.js`, `app/teacher/star-chart/page.js`, `app/star-chart/page.js`, `app/star-chart/StarChartClient.js`. Updated: `components/StudentSidebar.js`, `components/TeacherSidebar.js`.

*What is still open*
- **Push, then open both pages live.** They are the least-tested part of this build.
- Watch whether the class sky is mostly yellow in real use. With 80%/25% thresholds a mixed class reads as "learning"; the thresholds are easy to tune in `lib/starChartLayout.js`.
- Not built yet: Projector mode, the 10×10 Fact Wall grid, and the design doc's one-tier-at-a-time regression (which would need stored history).
- Next is step 6: daily warm-up + ghost race.

---

**Sept 24, 2026 (night) — Frequency Rush step 4: My Missed Words. Code only; no SQL needed; not pushed.**

*What changed*
- **What a student missed comes back in their next run.** A question counts as missed when the student's latest answer to it was wrong, or they got it wrong in 2 of their last 3 tries. It's cleared once they get it right. Missed questions are tracked per activity, across every assignment of it, from the student's last 30 runs.
- **Skill sets, ELAR word study and custom lists:** up to 4 missed questions go into a 10-question run, so they're sure to appear. Each is rebuilt with freshly shuffled choices. **Vocabulary units:** missed words stay in a word bank trimmed to 10, and missed sort questions are kept the same way, so they're much likelier to come up.
- **Students see it:** a banner before the run ("🔁 2 questions you missed last time are coming back. Look for SECOND CHANCE.") and, in the game, retry questions get the header **SECOND CHANCE · ONE MORE TRY**. The framing is positive, never "you got this wrong."
- **No new tables.** It reads `frequency_rush_sessions` and `frequency_rush_attempts` (`item_key`, or `word_id` for vocabulary). If anything fails, the run starts normally.
- Tested: the missed/cleared rules; a mock database (other students and other activities correctly ignored); and real runs in Asteroid Run (math facts) and Frostveil (vocabulary), where retry questions showed SECOND CHANCE and the others kept their normal header.
- Files: `lib/frequencyRushMissed.js` (new). Updated: `lib/frequencyRushSkills.js` (`skillItemForKey`), `lib/frequencyRushCustomLists.js` (`customItemForKey`), `app/api/frequency-rush/start/route.js`, `app/activity/[assignmentId]/FrequencyRushClient.js`.

*Process note*
- **Writing the same temporary file path twice can send an older copy to Emily's folder.** STATE and the plan doc landed one version behind twice today; they were re-sent and confirmed by size. All code files were checked the same way and match. From now on, each batch goes out from a fresh path, and its sizes are confirmed after writing.

*What is still open*
- Push steps 3 and 4 after running `add_frequency_rush_word_lists.sql`.
- The ELAR word-study review (step 2) is still waiting on Emily.
- Next is step 5: Living Word Wall + Fact Wall.

---

**Sept 24, 2026 (evening) — Frequency Rush step 3: teachers' own word lists. On disk; SQL not run; not pushed.**

*What changed*
- **New teacher page, Word Lists** (`/teacher/word-lists`, in the sidebar under Typing Texts). A teacher types, pastes or uploads (.txt/.csv) a list of words with definitions, picks grade, subject and question types (Meaning, Spelling, or both), and presses **Check list**. **The site makes three wrong spellings for every word** (Emily's call: automatic, not teacher-typed). The teacher sees them and can re-roll any word with ↻ before saving. The list becomes a private Frequency Rush activity under Challenge Library → subject → grade → **My Word Lists**. It follows the same pattern as Relay Station's Typing Texts.
- **Wrong spellings are real mistake types:** swapped vowel teams (*freind*), endings (*adaptashun*), doubled or dropped letters, unstressed vowels (*seperate*), sound-alike letters (*fone*), a dropped silent e, and a letter dropped from a cluster (*Febuary*). **None can be a real word.** Each one is checked against the SCOWL/hunspell English dictionary (145,736 words, permissive license, notice kept in `lib/data/englishWords.js`). A wrong spelling also can't be another word on the list or contain a rude string. It passed a 5,000-word stress test with 0 real words slipping through. About 5% of words, mostly very short ones like *cat* and *run*, can't get two believable misspellings; they get meaning questions only, and the page says so.
- **Questions in the game:** each word gets one meaning question (word → definition or definition → word) and one spelling question ("Spell the word that means ___"). The server grades against the saved list. The whole path was tested end to end: paste, parse, check, build, play in the game, grade.
- **List checks before saving:** 4–30 words, a definition on every word, no duplicate words or definitions, definitions under 100 characters, and no definition that contains its own word.
- Files: `lib/frequencyRushCustomLists.js`, `lib/data/englishWords.js` (478 KB, server only), `app/api/teacher/word-lists/route.js`, `app/teacher/word-lists/page.js`. The start and submit routes, the assign page (private lists plus the "My Word Lists" topic) and `components/TeacherSidebar.js` were also updated. `add_frequency_rush_word_lists.sql` creates `frequency_rush_custom_lists` with RLS on; it was tested twice locally.

*What is still open*
- **Run `add_frequency_rush_word_lists.sql` before pushing (rule 16).** Without the table, the Word Lists page errors on save.
- **The Word Lists page itself has not been rendered.** There was no way to load the Next.js page here. The server logic and the game side were tested; the page layout wasn't. Emily should make one list after pushing.
- The ELAR word-study review (step 2) is still waiting on Emily.
- Next is step 4, My Missed Words.

---

**Sept 24, 2026 (late afternoon) — Frequency Rush step 2: 12 ELAR word-study sets, 360 questions. On disk, awaiting Emily's review; SQL not run; not pushed. Step 1 (facts + timer) is committed ("FR update 1.2").**

*What changed*
- **12 sets (Emily's picks), 30 questions each.** Every TEKS code was checked in the ELAR PDF.
  - Grade 3: Homophones (3.3D), Prefixes and Suffixes (3.3C), Synonyms/Antonyms/Idioms (3.3D), Parts of Speech (3.11D).
  - Grade 4: Homophones (4.3D), Affixes and Roots (4.3C), Irregular Past Tense (4.11D), Simile/Metaphor/Personification (4.9B).
  - Grade 5: Affixes and Roots (5.3C), Adages and Puns (5.3D), Grammar Fix-Ups (5.11D), Spelling Changes (5.2B).
- They are **authored skill sets** in `lib/cases/frequency-rush/skills/`, and they run on the same `sort_bins` path as the math facts. The server grades each answer from the bank. The answer buttons have hashed ids, so the right one can't be spotted from its id. Each set has its own header label (for example "HOMOPHONES · Which word fits?"). Every question shows an explanation after it's answered. The math facts now get one too ("3 × 5 = 15."); before, the game printed "3 × 5 = ?: ".
- **New checker, `tools/frequency-rush-skillcheck.cjs`.** It checks shape (30 items, 3–4 unique choices, answer present, explanation present), game fit (prompt ≤ 110 characters, choice ≤ 70) and the per-grade maximum sentence length. All 12 sets pass. A deliberately broken bank was caught.
- Played through the game in a headless browser: ELAR items in Cloudreach and Asteroid, with relabeled headers and explanations shown.
- `add_frequency_rush_elar_skills.sql` adds 12 `cases` rows under ELAR. It was tested twice locally.
- **The review sheet for Emily** is `FrequencyRush_ELAR_WordStudy_Review_v1.md`: every question, answer, wrong choice and explanation in one table per set.

*What is still open*
- **Emily reviews the 360 questions (author of record)** before anything is assigned.
- After the review: run `add_frequency_rush_elar_skills.sql`, then push. The sets don't show on the assign page until the SQL runs.
- Next in the build order is step 3, teacher's own lists.

---

**Sept 24, 2026 (afternoon) — Frequency Rush becomes the fluency center. The plan for Math and ELAR is decided, and step 1 is built: six Math fact sets. Files are on disk; SQL not run; nothing pushed.**

*What changed*
- **Plan decided**, in `FrequencyRush_Fluency_Expansion_v1.md` (§11, a companion to the v1 design doc). Frequency Rush takes on speed and automaticity, which no other center trains. Build order:
  1. Skill sets + Math facts.
  2. ELAR word study.
  3. Teacher's own lists.
  4. My Missed Words.
  5. Living Word Wall + Fact Wall.
  6. Daily warm-up + ghost.
  7. One game re-export spec for pictures and read-aloud.
  Math and ELAR vocabulary comes later. Group Live is parked.
- **The key finding:** the run game's `sort_bins` question already takes its own 2–6 answer buttons per question. So facts and word study run in the existing worlds with no re-export.
- **Step 1 built.** There are six generated sets under Math, Grade 3: `MA.3.4F-FR-MUL / -DIV / -MIX` and `MA.3.4A-FR-ADD / -SUB / -MIX`. Emily chose to tag the +/− sets 3.4A. Wrong answers are real near misses. Facts refresh on every replay. The server grades each answer by recomputing the fact from its id. Each answer now saves an `item_key` for later tracking. The files are listed in §11.8 of the plan doc.
- `add_frequency_rush_skills.sql` was written and tested twice on a local Postgres.
- **The teacher now sets the time per question** for every Frequency Rush assignment (not just facts): No timer, or 5, 8, 10, 15, 20 or 30 seconds, chosen on the assign page. Running out of time counts as a miss. The speed bonus is measured against the teacher's time. The game's own student-facing timer checkbox is hidden. The setting is stored in `assignments.question_seconds`, which the same SQL file adds. Tested in all 4 worlds. If the SQL hasn't run, assigning and playing still work, just without a timer.

*What is now true*
- The generator was checked on 57,600 items. Real runs were played in Asteroid Run and Cloudreach Run by a headless browser: the game's right/wrong matched the server's on every answer, and the header reads "MATH FACTS."
- **Frostveil Run and Cindara Run don't support `sort_bins`.** Skill sets fall back to Asteroid Run there. **The existing Science and Social Studies sort banks are silently missing in those two worlds too.** This was a gap before today.

*What is still open*
- **Run `add_frequency_rush_skills.sql` before pushing (rule 16).** The submit route saves answers even if the SQL hasn't run, but the six sets won't appear on the assign page until it does.
- Commit and push the 5 code files and the SQL through GitHub Desktop. Then play one set live.
- Next is step 2: ELAR word study sets, drafted by Claude and approved by Emily.

---

**Sept 24, 2026 (afternoon, reconciliation) — STATE caught up with the app folder. Two big pieces of work from other sessions were never logged here: Assembly Deck grew from 6 to 66 cases, and Classification Lab was built.**

*How this was found:* by reading the app folder and the git reflog (`.git/logs/HEAD`), not from a session report. Those sessions pushed to origin, and the work came down in Emily's pulls. The last pulls were after "SC revise" (about 8:45 AM) and after "MS 1" (about 12:15 PM). **Claude did not write this code. Only its shape was checked here, not its content.**

*What is now true*
- **Assembly Deck: 66 cases, all registered in `lib/cases/assembly-deck/index.public.js`.** Science 26 (9 / 9 / 8 for grades 3 / 4 / 5), ELAR 14 (5 / 4 / 5), Social Studies 14 (4 / 5 / 5), Math 12 (4 per grade). **This covers the 48-case map**, plus the 6 original cases and the Sept 23 grade 3 and 4 Science extras. The Math cases are word-problem mode (for example "The Book Drive" and "What the Remainder Means").
- The Assembly Deck SQL is at the app root: `add_assembly_deck_3_12b`, `_g3_sci_batch`, `_g4_sci`, `_g5_sci`, `_sci_batch2`, `_ela_g3/g4/g5`, `_ss_g3/g4/g5` and `_math`.
- **Classification Lab: built and in the code.** It has an engine, `lib/cases/classification-lab/` (`catalog.js`, `index.public.js`, `index.server.js`), and a migration, `add_classification_lab.sql`. The migration adds `submissions.classification_lab_data` and 8 case rows. Each case has three pages: Sort, Harder sort (with a Neither group) and Venn, plus three questions. Check says how many are wrong but never which ones, and the first check on each page is the grade. The 8 cases are MA-3.6B, ELAR-3.3C, SS-3.7A, SCI-4.12B, ELAR-4.11D, MA-5.4A, ELAR-5.11D and SCI-5.6B.
- The Classification Lab docs are at the app root: `Classification_Lab_Content_Spec.md` (and `.docx`), which is the authoring rules, and `ClassificationLab_CaseMap_v1.md`, a table of possible cases in which every code was checked against the TEKS PDFs.
- **Classification Lab Batch 1 is authored but not wired.** `ClassificationLab_Batch1/` holds SCI-3.10C, MA-4.3C, SS-4.6A and SS-5.15C as JSON, plus `ClassificationLab_Batch1_Review.docx`. None of the four are in `catalog.js` or the SQL yet. The case map lists them as "done," which means authored, not live.

*What is still open*
- **Whether any of this SQL has been run in production is UNKNOWN (rule 16).** The Sept 23 audit knew only 10 Assembly Deck codes and checked no Classification Lab codes or column. **Before assigning any new Assembly Deck or Classification Lab case, run the SQL, then update and re-run `audit_production_readonly.sql` so it covers all 66 + 8 codes and `classification_lab_data`.**
- **The case-code prefixes differ between the two engines.** Assembly Deck uses `MA.` / `ELA.` / `SS.` (for example `MA.3.5A-AD`), which matches the Math/ELAR convention. Classification Lab uses `MA-` / `ELAR-` / `SCI-` / `SS-` (for example `ELAR-3.3C-CL`). Within each engine the codes are consistent, so nothing breaks. But reports or tools that assume one form could miss the other. Emily's call whether to normalize.
- **An orphan row:** a `3.6B-CL` row, "Solid, Liquid, or Gas?", is still in the `cases` table (Sept 23 audit). It matches no case in the new catalog, whose codes are prefixed.
- Emily reviews the Classification Lab Batch 1 docx. Then the 4 cases get wired into `catalog.js` along with their SQL.
- **None of the 60 new Assembly Deck cases or the 8 Classification Lab cases have been measured by Claude with the reading-level gate or the case checkers.** They may have been checked in the sessions that wrote them. Running `tools/assembly-deck-gradecheck.cjs` and `assembly-deck-casecheck.cjs` across all 66 is cheap and would confirm it.
- No live test yet for either engine's new content. Assembly Deck's re-pilot since the Chief's Debrief was added is still outstanding.
- The confidence check (rule 21) needs adding to Classification Lab and Assembly Deck along with every other engine.

---

**Sept 24, 2026 — Maker Studio designed as the next new center. Design only; no code, no SQL. New site-wide rule: every submit asks "How sure are you?"**

- **What changed:** Emily turned down "game skin" ideas (the rejects are kept in `claude/ClearCenters_Game_Ideas_ParkingLot.md`) and chose **Maker Studio**, a center where students make a product to turn in. **Museum Exhibit / Field Dispatch merges into it** as its first mode, "exhibit." Students get a job with a driving question. They pick pieces from a storage room of pictures, data and passages, some of which are traps, write one placard per piece, then write the plaque that answers the question. The AI reads it first; the teacher grades and releases, as with every center.
- **Decided today:**
  - Wall size by grade: 4 pieces in Grade 3, 5 in Grade 4, 6 in Grade 5. About 20 minutes.
  - Five exhibit types: Prove It, Side by Side, Then to Now, Every Kind, Portrait. The site draws math pieces from data.
  - Students pick a museum hall. Halls are built so new ones are just a new room picture over the same spots. The first three: Space Station Gallery, Grand Stone Museum, Nature Dome.
  - Class Museum field trip: exhibits appear only after release, visitors can only leave stickers, and ready-made museum sets are built from topic tags.
  - A send-back reopens the whole exhibit, with the student's work filled back in.
  - Teacher checkboxes on the assign page: Class Museum, Gallery stickers, Quick release, Curator's Challenge, Decorations.
  - No paper companion for now.
  - Also in Wave 1: the generator-ready case spec, a backup word filter before the museum, "did they read it?" tracking, read-aloud and alt text, a field-trip scavenger hunt, the confidence check, and **My Museum** (a year-long portfolio).
- **What is now true:**
  - `MakerStudio_Digital_Design_v1.md` is the design; §13 holds the open decisions and §14 the Wave 1 extras.
  - `MakerStudio_Exhibit_Table_of_Possibles.md` has 60 possible exhibits (5 types × 4 subjects × 3 grades), with every code checked against the real TEKS PDFs. SS 3.13A was changed to Jonas Salk, because Franklin is not in that standard.
  - `MakerStudio_Case_3-13A_DRAFT.md` is the full sample case, "Built for the Desert."
  - All three files are in the app folder and in the project, and none are committed.
- **Still open:**
  - The name; whether there is a centerpiece; the Grade 3 writing load; whether arrangement is graded; printing; whether to retire Field Dispatch outright or just re-rank it; the first museum set; which four cases go first (suggested: SCI 3.13A, SS 4.4B, ELA 3.9D(ii), MA 5.4D).
  - It isn't settled where Maker Studio falls in the build order next to Classification Lab, which Emily is building in another session.
  - Check that the Sept 23 Signal Check re-level has been committed and pushed.

**Sept 23, 2026 (afternoon) — Signal Check re-leveled. All 108 registered cases now read on grade, and the three grades separate cleanly in Science and Social Studies.**

*What changed*
- Emily approved the rewrite ("go ahead and move with signal check reading level revisions"). 89 case files were rewritten, field by field, using the same method as the Mission Map pass: measure, rewrite, re-measure.
- **Only student-facing text changed:** the claim, field report, signals, reasons, and evidence readings (plus the matching tagline). A before/after script confirmed that every id, verdict, `stemEvidenceIds`, `sortBins` entry, image path, label, echo line and self-check question is byte-identical to before. **No `.server.js` file was touched**, so rubrics and model answers did not change.
- Standards vocabulary was kept on purpose (rule 18). Examples: *renewable, sediment, porous, migrate, hibernate, abiotic, impressment, Parliament, three branches, vegetation, settlements, federal law, fertile*. Where a first draft dropped one of these, it was put back.
- The wording was also checked against the S.A.M. hints in `lib/hints.js`. Six cases were adjusted so the hint and the case still use the same words (3.10A "fast-moving weather system", 3.12B "zero real change", 5.6C "particles", SS.3.3A "nearly identical", SS.3.8A "purposes", SS.5.4D "unrelated" / "economic map").
- **Two small content fixes:** 3.12B-SC evidence reading 5 was garbled ("more of the insects herons used to eat frogs instead of"); it now says fewer frogs meant fewer herons and more insects. SS.5.2A-SC's field report said "Parliament was repealed the Stamp Act"; that typo is fixed.
- `tools/signal-check-gradecheck.cjs` now scores only the cases registered in `index.public.js`. It lists any unregistered files at the end instead of counting them.

*What is now true*
- **108/108 registered Signal Check cases pass the gate.** Mean FK by grade 3 / 4 / 5: **Science 3.0 / 4.4 / 5.8** (was 5.6 / 6.1 / 8.1) · **Social Studies 2.4 / 4.8 / 6.3** (was 5.8 / 9.2 / 9.7) · ELAR 3.8 / 4.3 / 4.2 · Math 0.5 / 0.1 / 1.8. Every sentence is within its grade's maximum.
- **Three case files in the folder are not registered and never reach students:** `3-6E-SC`, `4-7B-SC`, `5-10D-SC`. The 3.6E file is an early copy of the 3.6A magnet case with a wrong tagline about shadows. They were left untouched.

*What is still open*
- **Commit and push the 89 case files and the checker.** No SQL is needed.
- ELAR still does not separate by grade (3.8 / 4.3 / 4.2). All ELAR cases pass, but grade 5 sits below its 5.0 floor. Raising grade 5 ELAR is a separate choice for Emily.
- Some cases now sit slightly under their grade's floor. Most are number-heavy Math and SS cases, where numbers count as one syllable. This was not acted on, just as with Mission Map.
- Decide whether to delete or archive the three unregistered files.
- Not live-tested. The grade 4 and grade 5 AI grader reads meaning, not exact words, so the rubric should still line up; one live run per grade would confirm it.
- Reading level is still unmeasured on Frequency Rush, Simulation Lab and the Briefings.

---

**Sept 23, 2026 (Signal Check measured) — Signal Check's reading level was measured for the first time. Only 19 of 108 cases are on grade. Nothing has been rewritten yet; the numbers went to Emily first.**

- New tool: `tools/signal-check-gradecheck.cjs`. It uses the same form-aware method and bands as the Mission Map checker. FK is measured on the claim, the field-report notes, the signals, the readings and the proof lines. `--list` prints every over-long sentence. The rule-17 check was done: the longest "sentences" (up to 40 words) are real prose, not the scorer joining things together.
- Mean FK by grade 3 / 4 / 5 (ceilings 4.2 / 5.6 / 7.2):
  - **Science:** 5.6 / 6.1 / 8.1. 5 of 54 cases pass; 109 sentences are too long.
  - **Social Studies:** 5.8 / 9.2 / 9.7. 0 of 30 pass; 100 sentences are too long. This is the worst in the project.
  - **Math:** 0.9 / 0.3 / 1.8. 11 of 12 pass. The numbers look low because numerals count as one syllable, not because the text is easy.
  - **ELAR:** 4.5 / 4.4 / 4.2. 7 of 12 pass. It does not separate by grade.
- Rewrites would touch only student-facing text fields. Verdicts, `stemEvidenceIds`, `sortBins` and every id stay as they are.

---

**Sept 23, 2026 (reading level) — Mission Map re-leveled. Open decision 26 is closed: the original 25 cases now read on grade, and all 49 separate cleanly by grade.**

*What changed*
- Emily approved the retroactive pass. All 25 Science and Social Studies cases were measured with `tools/mission-map-gradecheck.cjs`. **173 sentences were over their grade's limit**, some up to 39 words. The rule-17 check was run first: the long sentences were real, not a scorer artifact.
- 23 cases were rewritten, field by field. Grade 3 got full plain-language rewrites. Grades 4 and 5 were mostly sentence splits. 5.2 and 5.4 already passed and were left alone. **Server files are untouched, so answer keys, rubrics and model answers did not change.** `mission-map-casecheck.cjs` still passes all 49. Standards vocabulary was kept (rule 18).
- Result (same scorer for every subject): **Science 2.5 / 3.7 / 5.6, Social Studies 2.1 / 3.6 / 6.0** for grades 3 / 4 / 5, down from 5.3 / 5.7 / 5.7 and 5.6 / 7.1 / 6.7. Every sentence is now within its grade's max. ELAR reads 2.0 / 3.3 / 4.4.
- One content fix along the way: **5.7-MM cp5's evidence contradicted the case.** It said "the three sites are actually the same location," while the brief promised three different sites. It was rewritten to say the first three survey stops looked at one river-valley site from different sides.
- Two Math sentences were split (3.10 final prompt, 5.11 cp1).
- Someone had pointed the 12 Math cases' `mapImage` at the fallback `/teacher/challenges/mission_map.jpg`, because their maps don't exist yet. **The 12 ELAR cases now use the same fallback**, instead of pointing at missing images.
- Found during the pass: the Math files on disk had changed at 12:18, when that fallback edit came in with a pull. The two Math edits were re-applied on top of the current files, so nothing was overwritten.

*What is still open*
- The scorer still flags Math grade 4→5 separation (2.0 → 2.6). That is mostly numerals scoring as one syllable, so it was not acted on.
- Grade 3 Social Studies 3.6 and 3.7 read at 1.4 and 1.7, a little below the 2.0 floor. That is fine for grade 3, but they are the plainest cases in the library.
- None of it is live-tested. Commit and push the 37 changed case files; no SQL is needed.

---

**Sept 23, 2026 (audit) — First full production audit: the database now matches the code, with one small gap.**

*What changed*
- Built `audit_production_readonly.sql` (app root). It reads only and changes nothing. It checks every case code in every engine's registry against `cases` (row present, engine right), and every table, column and function the API code uses against the live schema. It was tested on a local Postgres, where it caught a missing row and a wrong engine and was silent when everything was right. **Re-run it before any push that touches schema.** This answers open decision 22 in practice.
- Emily ran it on production.

*What is now true*
- **Schema is clean.** No missing table, column or function. So there is no hidden login-outage-class risk left.
- **The three "never confirmed" blocks are confirmed live:** Simulation Lab's 10 cases, Mission Map's Sept 2 Social Studies batch, and Signal Check's Social Studies batch. The ELAR 12 are in too (Mission Map: 49 rows).

*What is still open*
- **3 Assembly Deck rows missing: 3.10C-AD, 3.11B-AD, 3.13A-AD.** Another session authored these four grade 3 Science cases today (3.12B-AD's row is in). Their SQL is `add_assembly_deck_g3_sci_batch.sql`. Until it runs, those cases open as Group Chat.
- **5 case rows are ahead of the code** (identified Sept 23): Assembly Deck grade 4 Science `4.8B-AD` (The Cold Lunchbox Job), `4.9B-AD` (Twenty-Eight Nights), `4.11B-AD` (Two Ways to Power the School), `4.12B-AD` (When the Owls Left), and Classification Lab `3.6B-CL` (Solid, Liquid, or Gas?). There are no case files for them in local main or on origin/main. So they show in the teacher library, but a student who opens one gets the "This mission isn't ready yet" screen, not a crash. **Their code must ship before real classroom use, or the rows need to be pulled.**
- Git, seen from the reflog: Emily pulled and pushed at 12:38–12:39 ("MM update"). Local main now equals origin/main, so the earlier "one commit behind" note is resolved.
- **172 retired Signal Check Weigh-In/Thread rows** are still in `cases`. The app filters them, so this is harmless. `remove_signal_check_wi_th_cases.sql` deletes them when Emily wants.

---

**Sept 23, 2026 (later session) — Mission Map's ELAR 12 authored. Mission Map is now complete: 49 cases, all four subjects, every concept in the 48-concept library plus the original pilot.**

*What changed*
- **12 ELAR cases written** from the Evidence Quest library (read directly from `05_REFERENCE`) against the anchors Emily approved: `3.13`–`3.16-MM` (3.7C, 3.6G, 3.8C, 3.10C), `4.14`–`4.17-MM` (4.8A, 4.10A, 4.9E, 4.7D), `5.13`–`5.16-MM` (5.6F, 5.7B, 5.8A, 5.10A). Same six-checkpoint shape as the Math batch, using all four checkpoint types (standard, quickScan, showdown, sequence). All passages are original. The one real-world statistic (5.16-MM, ~80% of North Americans cannot see the Milky Way) is sourced in the case header.
- **Each library trap kept as the trap**, usually as a showdown. Two cases go past the library on purpose, and their headers explain why: **3.13-MM** adds a second, harder trap (a detail that is about Rosa but still doesn't prove the trait). **5.15-MM** adds a second theme, because 5.8A says *multiple* themes and the library concept only had one. 5.15's "rank the evidence" was **not** built as a sequence: ranking the middle items is arguable, and a checkpoint needs one answer you can defend.
- **Per-checkpoint S.A.M. hints for all 12** added to `lib/hints.js` (they point to where to look, never to the answer). **This surfaced a gap: the Sept 23 Math 12 have no case hints at all.** They fall back to the generic pool.
- **New tool, `tools/mission-map-gradecheck.cjs`**: a form-aware reading-level gate for Mission Map (rule 17). It scores each field on its own, treats "(1)…(2)" task lists as separate items, skips data displays, and prints the longest sentence found. First run flagged 7 over-long sentences in the ELAR batch; all 7 were split. **ELAR now reads 2.0 → 3.3 → 4.4 across grades 3/4/5**, and every sentence is within its grade's max.
- Registered in both index files and `teksLabels.js`. ELAR section added to `lib/cases/TEKS_STANDARDS.md`. `add_mission_map_elar_batch.sql` written to the app root.

*What is now true*
- **Mission Map: 49 cases.** Science 13, Social Studies 12, Math 12, ELAR 12. `mission-map-casecheck.cjs` passes all 49, and every client/server answer key agrees.
- All 31 files are written to Emily's local `clearcenters` folder.

*What is still open*
- **THE ELAR SQL IS DELIVERED, NOT RUN, AND NOTHING IS COMMITTED OR PUSHED.** Rule 16: run `add_mission_map_elar_batch.sql` before pushing these files. Also, **pull first**: her checkout was already one commit behind origin (the "Student progress" commit).
- **No map art for 24 cases.** The Math 12 and ELAR 12 point at `/mission-map/<code>-map.jpg`, and none of those files exist yet. The Science and SS maps do exist.
- ~~Math 12 need case hints~~ **Done Sept 23: `lib/hints.js` now has one hint for each checkpoint in all 49 Mission Map cases (checked by script).**
- Scorer calibration note: the new scorer puts the Math batch at 1.0 / 2.0 / 2.6, lower than the 2.2 / 3.6 / 4.3 recorded this morning. Numerals count as one syllable, and a different scorer was used then. **Compare batches with the same tool.** On this tool, ELAR reads a little above Math at every grade.
- The ELAR and Math TEKS PDFs are still not in `05_REFERENCE/TEKS/`; they only ever came in through chat.
- Not live-tested.

---

**Sept 23, 2026 — Assembly Deck's first classroom pilot, the three changes it produced, and Mission Map's Math batch: 12 cases authored against the real Math TEKS, closing the last standards block from August. Everything in this entry is live — verified file by file against the commit Vercel is deploying, not taken on trust.**

*What changed*

**Assembly Deck — the pilot happened, and it moved the design.** Emily ran `3.6A-AD` with a real grade 3 student ("i love it") and came back with three notes. All three are built.
- **The last question was impossible.** It asked why six sentences had been left out — of a student who had last seen those sentences three screens and twenty minutes earlier. Fixed with the **Case File**: a button pinned bottom-left on every screen from the first build to the last question, opening a read-only overlay with the source notes, every paragraph built so far, and every leftover sentence with the reason the student gave for it. Once a round's leftovers are checked it also shows which reasons held up. It never reveals a verdict the student has not earned.
- **The leftovers were carrying the whole end of the case** — sort them three times, then write about them. Emily: "the leftover step is necessary but i dont think we need that to also be the last question." The three rounds stay; the ending changed.
- **Added a second question type.** The new **Chief's Debrief** sits between the Editor's Trap and the written answer and asks two things about the report the student just built: a **pinpoint** (a hotspot on their own finished report — every sentence tappable, the question naming a job the sentence does) and one **multiple choice** on the standard, with a written explanation for *every* choice so a wrong answer is told what was wrong with its reasoning. Question two stays hidden until question one is answered.
- **The written question was re-pointed in all six cases**, off the leftovers and onto the content. The AI grader now reads the case's own `explain.prompt`, so re-pointing a question re-points its grading automatically.
- **Open decision 25 is answered.** The leftovers step does hold up three times per case. It just should not also be the finale.

**Mission Map — the Math batch (12 cases), blocked since August, now live.** The 24 Math/ELAR concepts in the Evidence Quest library had been waiting on real TEKS documents. Emily supplied the Mathematics and ELAR PDFs; all 24 were anchored against them and the Math 12 were authored.
- `3.9`–`3.12-MM`, `4.10`–`4.13-MM`, `5.9`–`5.12-MM`. **Mission Map is now 37 cases and complete in Science, Social Studies and Math.**
- **All 12 Math codes are new coverage** — not one is used by any other engine's case.
- Three anchors deliberately avoid the obvious code, and the reasoning is recorded in each case file and in `claude/MissionMap_MathELAR_Anchors_v1.md`: perimeter to **3.7B** not 3.6C (3.6C is area; 3.7B is the only code naming a missing side length); arrays to **3.4D** not 3.5B (3.4D says *equally-sized* groups, which is exactly what the case's trap tests); decimal place value to **4.2B** not 4.2G (the case's own final idea is that position sets value).
- Emily approved both judgment calls on the ELAR side in advance: `ELAR 3.1` anchors to **3.7C** (grade 3 has no character-traits standard at all), and `ELAR 4.2` to **4.10A** (grade 4's craft standard names imagery and sound devices, not repetition).

**A validator the engine did not have.** Mission Map grades each checkpoint twice — the client from the public case, the server from the server case — so the two files can disagree and a student is told they are right while the gradebook records a miss. Nothing was checking that. `tools/mission-map-casecheck.cjs` now does, across all 37 cases, along with checkpoint ordering, choice-key validity, showdown and sequence shape, and completeness of `teksLabels.js`. All 37 pass.

**Reading level — a measurement error caught before it caused a rewrite, and a real defect found underneath it.** The first pass said all 12 Math cases were badly over limit, with 70-word sentences. The scorer was fusing consecutive answer choices into one sentence — the same bug class as the September Relay Station sweep, and the second time this exact mistake has been made. Once the scorer was made form-aware, the real picture appeared: **the grade 5 cases read easier than the grade 4 ones.** That is backwards. The grade 5 prose was raised and 31 over-long sentences were split across all 12. They now read **2.2 → 3.6 → 4.3** across grades 3/4/5, every sentence inside its grade's limit.

**A finding about the existing Mission Map library, measured and deliberately not acted on.** The 25 shipped Science and Social Studies cases read at **5.8 / 6.7 / 6.8** for grades 3/4/5 — grade 3 well above its 4.2 ceiling, and the three grades barely separating. Longest sentences run 37–39 words. Emily declined a retroactive sweep of the older engines on Sept 22 and that still stands, so this is recorded, not fixed. It does mean the Math batch reads noticeably plainer than the Science and Social Studies cases beside it.

**The assign page's thumbnail fallback, lost and restored.** The `thumbFallback` helper added Sept 22 survived the `teacher-bridge-live` rewrite of `app/teacher/assign/new/page.js` as a defined-but-unwired function — none of the new `<img>` tags called it. Re-attached. Worth noting what the investigation found: **nothing was actually broken on that page**, because every image it renders exists. The fix is for the next missing one.

*What is now true*
- **Every pending SQL block has been run** and Emily confirmed it: Relay Station Wave 3, Assembly Deck Wave 1, and the Mission Map Math 12. For the first time since Sept 4 there is no schema debt sitting behind shipped code.
- **Everything is pushed and deployed.** Verified by walking the deployed commit's own tree rather than trusting timestamps: all 27 Mission Map files, `lib/cases/TEKS_STANDARDS.md`, `tools/mission-map-casecheck.cjs` and the re-wired assign page are byte-identical inside it.
- **`lib/cases/TEKS_STANDARDS.md` has Math codes for the first time** — all 12, with the reasoning for the three non-obvious anchors. The Math PDF also settled a standing question in that file: **5.5 and 5.7 genuinely have no lettered subparts**, so `MA.5.5` is correctly formed, the opposite of the `5.9`/`5.9A` problem.
- **Mission Map: 37 cases.** Science 13, Social Studies 12, Math 12.
- **Assembly Deck: 6 cases**, all six carrying the Case File, the Chief's Debrief and a re-pointed written question, and one of them pilot-tested with a real student.

*What is still open*
- **Mission Map's ELAR 12 is the last content gap in that engine.** All 12 anchors are checked and Emily-approved; this is pure authoring. Both judgment calls are settled.
- **Assembly Deck has not been re-piloted since the debrief was added.** The Case File and the pinpoint have been verified by simulation only. A second 20-minute run of `3.6A-AD` is the cheapest possible de-risking of the 48-case map.
- **The 48-case Assembly Deck map is still unreviewed** by Emily, who is author of record.
- **Emily's local checkout is one commit behind origin.** A "Student progress" change — work-first ordering, a grade graph and past-due handling — was committed on GitHub and is deployed, but has not been pulled down. Claude has never seen that code.
- **`assembly_deck.jpg` still does not exist.** Assembly Deck is borrowing the Repair Desk bench artwork through `lib/teacherBridge.js`. It looks fine; it is just not its own art.
- **`DEV_FORCE_UNLOCK_ALL` is still `true`** and must be flipped before real classroom use.
- Reading level remains unmeasured on Frequency Rush, Signal Check, Simulation Lab, the Briefings, and — as of this session, measured but unaddressed — Mission Map's original 25.
- Everything else open before this session is unchanged.

---

**Sept 22, 2026 — Two engines shipped in one day: Relay Station (a typing center, Waves 1-3, 94 lessons) and Assembly Deck (a build-the-paragraph center, Wave 1, 6 cases) — plus every remaining TEKS PDF received, and a reading-level gate applied retroactively to both engines' content.**

*What changed*

**Relay Station — new engine, built end to end this session (design doc §1-§16).** A typing center Emily asked for ("Typing Club but better") that doubles as reading practice.
- **Foundations Track** — 20 auto-advancing keyboarding levels for grades 3-5, assigned once, with its own 5th tile beside the four subject tiles. Rising pass bar per Emily's call: 90% accuracy levels 1-10, 95% levels 11-15, 100% levels 16-20. A placement check can skip a strong typist ahead; teachers can also move anyone by hand from the Typing Track board.
- **A 94-lesson library** across six topic families (science paragraphs, cadet logs, social studies, biographies, ELAR text types, numbers), plus conversations, friendly/business letters, and a vocabulary set.
- **Wave 1** — ghost racer (race your own best run), Repair Drills (auto-generated drills on the keys you actually miss), a class trouble-key heatmap for the teacher, and an accommodations/Supports editor (per-student bar adjustment, extra time, hints).
- **Wave 2** — Dictation mode (text hidden, spoken aloud — doubles as a spelling test), Corrupted Transmission (scrambled words to repair), Copy → Compose (a short writing prompt after a copy task, AI-first-read), and Daily Transmission (a new warm-up every school day with weekday streaks; weekends never break a streak).
- **Wave 3** — S.A.M. present on *every* screen (Emily's explicit ask: "SAM follows the student around"), 7 unlockable keyboard skins tied to track rank, a whole-class **Relay Race** (the teacher starts a race on a projector board; each student types one sentence of a secret message and the class decodes it together; everyone who carried a leg earns crystals), and **Mechara: Word Blaster**, a self-hosted minigame for the Robot Relay City world's reward station.
- Teacher surfaces: Typing Track board, Typing Texts (paste-your-own passages, with a dictation-only mode for spelling lists), Relay Race Board, Distress Call support, and a Keyboarding section in the standards report.

**Assembly Deck — new engine, designed and built this session (design doc; case map doc).** The "build something" center; **Territory Builder was retired into it** per Emily's earlier call, and its coming-soon tile removed.
- One engine, four planned assembly modes (paragraph, investigation, map, word problem). **Wave 1 ships paragraph mode.**
- A case is a **whole short piece, not one paragraph** (Emily: these have to fill a ~20-minute rotation): three paragraph builds, each with its own tray and decoys, then an assembly round that puts the finished paragraphs in the order a reader needs. Rounds are labeled by content, never by position, so the ordering is a real structure decision.
- The graded thinking is the **leftovers step**: for each sentence that didn't belong, the student names *what it was* — an opinion, a contradiction of the notes, an unsupported claim, an off-topic fact, a personal story, or one example standing in for evidence.
- **Six cases, two per grade:** `3.6A-AD` (magnet test / physical properties), `4.10B-AD` (erosion and deposition at a creek bend), `SS.4.6B-AD` (comparing two Texas regions), `SS.5.4C-AD` (judging Lewis and Clark against Jefferson's actual orders), `ELA.3.12B-AD` (informational article), `ELA.5.12C-AD` (argument with a counterargument answered).
- **Fun pass, Emily's picks:** every decoy protests in its own voice when rejected and S.A.M. answers it; the person who asked for the report (Chief Okafor, the curator, the athletic director…) writes back in one of three tiers based on real scores; an optional **Editor's Trap** where S.A.M. slips a bad sentence into a paragraph the student built (+2 💎); and **Chief's Challenge**, an opt-in harder run that removes scaffolding rather than adding content (no slot hints, shuffled tray, all six reason chips, no second-attempt reveal, trap mandatory; +3 💎).
- **Sentence Sort board** (`/teacher/assembly-deck`) — the report only this engine can produce: which decoy category a class names correctly least often, and what they call it instead ("weakest on *opinion*; when they miss it they call it *off topic*"), slot accuracy hardest-first, and per-student weak categories. Recomputed from raw answers at request time, so stored scores can't be tampered into it. No new table.

**TEKS — every remaining PDF received (major unblock).** Emily supplied ELAR Grades 3-5, Mathematics Grades 3-5, and Grade 3/4/5 Science and Social Studies. All were extracted and used in-session. **This also unblocks Mission Map's 24 Math/ELAR concepts**, which this file has listed as blocked since August.

**Reading level — measured, not assumed.** Emily asked whether content was written on grade, and specifically that "3rd grade should read different than 4th and 5th."
- Built a gate (`tools/assembly-deck-gradecheck.cjs`): Flesch-Kincaid plus average and longest sentence, with a **floor as well as a ceiling**, and a required gap between grades. Bands: grade 3 FK 2.0-4.2 / ≤11-word average / ≤16-word max; grade 4 3.5-5.6 / 14 / 21; grade 5 5.0-7.2 / 16 / 25.
- **All six Assembly Deck cases failed it** (grade 3 was reading at 4.6-5.2; the Lewis and Clark case at 8.6). Rewritten sentence by sentence; they now read 3.1 / 3.1 / 4.5 / 4.8 / 6.0 / 6.6 and separate 3.1 → 4.7 → 6.3 across grades.
- **Then swept Relay Station's 72 readings** (`tools/relay-station-gradecheck.cjs`). The first measurement was partly wrong and was fixed before acting on it: scoring everything as running prose fused headlines onto the next sentence and treated recipe steps and dialogue lines as sentences. Of the real findings, **21 readings had sentences over their grade's limit** (worst: a 34-word sentence in a grade-5 log, 25 words in a grade-3 news brief) — all split, nothing cut. Grade averages moved 4.3 / 5.7 / 6.2 → **3.8 / 5.2 / 5.8**.
- 19 readings still score above their FK ceiling; `tools/relay-station-readingcheck.cjs` re-scores them with proper nouns and target vocabulary removed and **all 19 land in band** — the load is *conductors*, *insulators*, *deposition*, *Reconstruction*, *cardinal and intermediate directions*. Deliberately left alone: those words are the standards. Sentence length is the lever; vocabulary is the lesson.
- S.A.M.'s written feedback now takes its reading level from the case's `grade` field rather than a pattern on the standard code, which would have mis-fired on `SS.3.*` and `MA.3.*`.

**Art.** A full image-prompt batch for Relay Station was written (`RelayStation_Art_Batch_v1.md`, 123 files with exact paths, sizes, and a house style block). Emily generated and connected images during the session, at paths that don't match the prompt doc — **the tile references and the unwired art below are still open.**

*What is now true*
- **Two new live engines in the current app**, both with the full stack (schema, client, `page.js` branch, submit route, authored TEKS-verified cases, teacher surfaces): Relay Station and Assembly Deck.
- **Every TEKS subject now has a verified PDF in hand** — Science, Social Studies, ELAR, and Math, grades 3-5. Nothing is blocked on standards documents any more, anywhere in the project.
- **Content across both new engines is gated on reading level**, with the checkers committed to `tools/` so future cases can't drift; the bands and the reasoning are recorded in both design docs.
- A 48-case map for Assembly Deck (`AssemblyDeck_CaseMap_v1.md`) is drafted and standards-verified — four cases per subject per grade across Science, Social Studies, ELAR and Math — awaiting Emily's review before authoring.
- **Math needs no new engine work.** Word-problem mode turned out to be the same slots-and-tray machinery with different round shapes (build the problem → build the representation → solve and check), so Math is 12 cases of authoring, not a build.

*What is still open*
- **THE SQL FOR BOTH ENGINES IS DELIVERED BUT NOT RUN.** Emily confirmed at session end she has not run any of it. Two blocks are pending: Relay Station Wave 3 (`keyboard_skin` column, `relay_races` + `relay_race_legs` tables, three `RS.*.RACE` cases) and Assembly Deck Wave 1 (`submissions.assembly_deck_data`, six `*-AD` cases). **The Relay Wave 3 code is already committed as "relay 7" — if that is pushed before its SQL runs, the activity page will select a `keyboard_skin` column that does not exist.** This is exactly the §9.16 failure mode that took down login on Sept 4.
- **Neither engine has been live-tested.** Relay Station's earlier waves were tested by Emily (track and placement confirmed working); Waves 2-3 and all of Assembly Deck have only been verified by simulation. **Recommended before scaling the Assembly Deck library: run one case with a real student.** The specific unknown is whether the leftovers step stays engaging when it repeats three times in one case — a simulation cannot answer that.
- **Art wiring.** The Assembly Deck tile points at `/teacher/challenges/assembly_deck.jpg`, which does not exist yet — the tile will show a broken image until it does. Relay Station's rank badges, keyboard-skin previews, posture diagram and hands diagram are not referenced in code at all, and the challenge tile still points at the SVG placeholder. Emily has generated art but at paths that don't match the prompt doc; several `CC_DROP_*` folders and zips appeared in the app folder this session and may hold it. **Needs Emily to say where the files landed.**
- **The 48-case Assembly Deck map is unreviewed.** Emily is author of record; nothing should be authored from it until she has read it. Build order proposed: ELAR 12 → Science 12 → Social Studies 12 → Math 12.
- **Reading level has only been swept on the two new engines.** Frequency Rush questions, Signal Check cases, Mission Map, Simulation Lab and the Briefings have never been measured and predate the gate entirely.
- **Every Science and Social Studies code used this session should be added to `lib/cases/TEKS_STANDARDS.md`** as the log intends — it currently holds 23 Grade 3 Science codes and 10 Social Studies codes per grade, but only one verified code each for Grade 4 and Grade 5 Science, which is what prompted asking for the PDFs.
- Everything open before this session (the SQL audit sweep, `DEV_FORCE_UNLOCK_ALL`, the orphaned Glow Garden pieces, Simulation Lab live-testing and art, the 7 unwired background images, 3 dead Signal Check files) is unchanged.

---

**Sept 4, 2026 — Production login outage: students could not log in at all, root-caused to years-old S.A.M./Home-background SQL that had never actually been run in Supabase; fixed, and the whole backlog of "not yet confirmed run" SQL finally confirmed run (thirtieth pass, same day, immediately after the World Reward Station shipped).**

*What happened*
- Minutes after the World Reward Station pass shipped, Emily reported student login "doesn't open" — a genuinely urgent, all-students-blocked report.
- **First hypothesis (reasonable but wrong): PostgREST schema-cache lag.** `app/home/page.js` now selected the brand-new `students.equipped_world_trail` column; a column added via `ALTER TABLE` can take a moment for Supabase's API layer to recognize. Shipped a defensive fallback in `app/home/page.js` and `app/gear-locker/world/[planetKey]/page.js`: if the student-row select fails, retry without `equipped_world_trail` rather than hard-redirecting to `/login`. This was a real, worthwhile hardening — but not the actual cause.
- **Diagnosis took several rounds because surface signals were misleading:** Vercel's Runtime Logs showed `GET /home` returning `200` even on failed attempts — which looks like success, but a client-side (`router.push`) RSC navigation can return `200` while still carrying a server `redirect()` instruction embedded in the response stream, invisible from the status code alone. Confirmed via a full walkthrough with Emily: checked the deployment was actually "Ready" (it was), checked it was actually the newest deployment serving requests (confirmed via deployment ID, since an earlier failing request turned out to be from the tail end of the PREVIOUS deployment's rollout), then added explicit `console.error` diagnostic logging to `app/home/page.js` to stop guessing and see the server's real reason for redirecting.
- **That logging immediately surfaced the real cause on the next attempt:** `column students.equipped_sam_skin does not exist` (Postgres code `42703`) — a column from the much-earlier S.A.M. skin-customization feature (`SAM_Companion_Concept_v1.md` §11), whose SQL had been written and delivered in chat that same day but **never actually run against the live Supabase project.** Nobody had tried a real student login against production since that feature's code shipped, so the break had been latent (not caused by that session) until Emily's test surfaced it.
- Searched the project's own design docs to reconstruct the exact missing SQL rather than guessing at column types/defaults, and combined it with every other still-"not yet confirmed run" SQL fragment flagged across the project (`students.home_background`, `students.teacher_unlocked_sam_skins`, the `hint_requests` table + RLS policy, the `sam_shoutouts` table + RLS policy, and the `grant_sam_skin`/`send_sam_shoutout` RPCs) into one idempotent SQL block, delivered as plain text in chat per Emily's standing preference, safe to run even where some pieces already existed.
- Emily ran that SQL; login confirmed working immediately after.

*What is now true*
- **Student login on the live production site works again.** All of the schema debt flagged as "not yet confirmed run" across multiple earlier session-log entries is now actually confirmed run: `students.equipped_sam_skin`, `students.sam_nickname`, `students.teacher_unlocked_sam_skins`, `students.home_background`, `hint_requests` (+ RLS), `sam_shoutouts` (+ RLS), `grant_sam_skin`, `send_sam_shoutout` — on top of the World Reward Station SQL. The S.A.M. Phase 1/2 features and the Home Settings background picker are, for the first time, actually functional in production rather than just shipped in code.
- `app/home/page.js` and `app/gear-locker/world/[planetKey]/page.js` now have a defensive fallback around the newest column plus explicit `console.error` diagnostics on every redirect-to-login path.
- **New standing lesson (§9, convention 16):** code that depends on a new column/table is not "done" until someone confirms the migration ran in the production database being deployed to.

*What is still open*
- Everything from the World Reward Station pass is unchanged (5 worlds still need story/game content — **Mechara got its story and game on Sept 22, leaving 4** — the two orphaned-file decisions, `DEV_FORCE_UNLOCK_ALL` still `true`).
- **Every other engine's SQL flagged "not yet confirmed run" should be treated with new suspicion, not assumed fine because it's old.** Worth a deliberate "run everything still flagged, in one sitting" pass.
- The diagnostic `console.error` calls are intentionally left in.

---

**Sept 4, 2026 — World Reward Station shipped: every unlocked Galaxy Hub planet now opens its own reward page (story → S.A.M. trail + Home background unlock → paid minigame); Lumara/`glow_garden` is the reference build; old Glow Garden bespoke page retired (twenty-ninth pass, same day).**

*What changed*
- Emily sent 6 new per-world background images plus a refreshed Galaxy Hub lobby background and asked to brainstorm a "reward station" screen for when a student clicks an unlocked planet.
- Brainstormed via Emily's own numbered answers: reading a "learn about this world" story is the free, one-time trigger that unlocks BOTH a S.A.M. cosmetic and that world's background; the cosmetic is a "trail" accessory (not a new S.A.M. design — no art pipeline for that); earned backgrounds get their own settings-panel section, hidden until at least one is earned; the embedded game costs 1 crystal as a separate "ticket" purchase.
- Investigated before building: the existing "Bloom Trail" cosmetic is pure code/CSS (no image asset), and `increment_crystal_points` already accepts negative amounts, so charging a crystal needed no new database function.
- Emily's ChatGPT-hosted game link 401'd on fetch; per policy this wasn't worked around — flagged directly, and she uploaded a complete self-hosted offline HTML5 bundle ("Lumara: Canopy Bounce") instead.
- **Built the full feature:** `lib/worldStories.js`; `components/SamTrail.js`; three new API routes (`read-world-story`, `set-world-trail`, `unlock-world-game`); a new dynamic route `app/gear-locker/world/[planetKey]`; `set-background/route.js` extended; `GearLockerClient.js` simplified with re-measured `PORTAL_HOTSPOTS`; `HomeClient.js`/`page.js` gained an Earned Backgrounds grid and a S.A.M. Trails picker.
- The delivered game bundle was placed at `public/games/lumara-canopy-bounce/`, with one small additive line in `game.js` to `postMessage` the result to the parent page — disclosed to Emily as a modification to her file.
- Verified with an esbuild JSX-aware check on all 11 new/changed files; caught a latent crash for a future world with a story but no game before pushing.
- SQL delivered as plain text in chat — **confirmed run** (see the login-outage entry above).

*What is now true*
- Every unlocked Galaxy Hub planet opens a real per-world reward page; Lumara has full content, the others showed "coming soon" (**Mechara joined Lumara with a real story and game on Sept 22**).
- One free action (reading a world's story) unlocks two rewards, both re-verified server-side.
- A real, self-hosted, offline-capable minigame is live behind a working "spend 1 crystal" flow built on existing infrastructure.

*What is still open*
- The two orphaned pieces from the old Glow Garden system (the old page/client/logic files; the `student_planet_discoveries` table + `/api/planets/discover` route), flagged for Emily's decision rather than silently deleted.
- Old per-planet `.png` art in `public/planets/`, superseded by `.jpg` at the same stems, left pending a delete decision.
- **`DEV_FORCE_UNLOCK_ALL` is still `true`** in `GearLockerClient.js` — must be flipped before real classroom use.
- **4 of 6 worlds still need story + game** (Frostveil, Cindara, Solara, Cloudreach).
- The S.A.M. trail cosmetic renders only on Home, not yet in Missions/activities.
- The World Reward Station click-through still hasn't been walked start to finish in a real browser.

---

**Sept 4, 2026 — Galaxy Hub redesigned around real portal art; Home dashboard gained 6 rotating backgrounds plus a student Settings panel with a durable per-student background choice (twenty-eighth pass, same day).**

*What changed*
- Emily sent 9 background images; checked with a contact-sheet comparison that they were one style family before wiring anything, then confirmed with her which engine each maps to.
- **Galaxy Hub rebuilt around the new art's baked-in portals** — all 6 portal regions measured with a gridded-crop pixel technique into `PORTAL_HOTSPOTS`; floating planet icons, connector lines and the ship marker removed; each portal is now an invisible click target with the unlock check and name/threshold pill around it.
- **Fixed a real content mismatch:** 4 of 6 baked-in portal labels didn't match the planet data's display names. Resolved via AskUserQuestion rather than guessing — Emily chose to rename the DATA to match the art (stable `planet_key` values untouched). Superseded the same day by the World Reward Station naming.
- **Fixed a "Galaxy Hub looks dark" report** by measuring actual image brightness (144/255) to rule out a bad source file, then finding a leftover `opacity: 0.55` rule from a Sept 1 fix.
- **Added a temporary `DEV_FORCE_UNLOCK_ALL` flag** for design review, leaving the real gate logic untouched underneath.
- **Home dashboard:** built a session-scoped random-background system (`lib/homeBackgrounds.js`, a `cc_home_bg` cookie re-validated server-side), then a Settings panel on top of it with a durable `students.home_background` choice, a new `app/api/student/set-background` route, a 6-thumbnail grid with optimistic UI, and a second, more visible Log Out button.
- Re-read `HomeClient.js` in full first and confirmed the Log Out link had never actually been removed — so the fix was discoverability, not restoration (see §9.15).

*What is now true*
- Galaxy Hub's planets are clickable portals baked into the art itself, brighter, with the hover/positioning bugs caught before pushing.
- Home has 6 possible backgrounds; students who haven't chosen get a fresh random one per login, and a chosen one persists.
- The Home logout control is confirmed intact and now exists in two places.

*What is still open*
- Galaxy Hub planet `description` text wasn't updated to match the renames — current copy isn't in any local file.
- 7 of the original 9 uploaded background images are still not wired into their engines.

---

**Sept 4, 2026 — Simulation Lab's first grade-5 Science content batch: 3 more cases built, first authored use of fillBlank checkpoints, engine's first Earth & Space case (twenty-seventh pass, same day).**

*What changed*
- Proposed a specific 3-case batch via AskUserQuestion (topic spread: Force/Energy/Earth & Space); Emily approved as proposed.
- **Authored 3 grade-5 Science cases, each checked against the real Grade 5 Science TEKS before writing:** `5.7B-SL` Balloon Rocket Test (the standard's own listed example), `5.8B-SL` Circuit Motor Test (electrical → motion, deliberately distinct from Grade 4's electrical → light), and `5.9-SL` Shadow Tracker (the engine's first Earth & Space case, deliberately scoped to the morning window because a full day's shadow length isn't monotonic).
- **First real exercise of the `fillBlank` checkpoint type**, usable client-side thanks to the same-day bug fix.
- Registered all 3, bringing Simulation Lab to **10 cases**; verified with `node --check` plus a scripted structural cross-check (checkpoint parity, non-empty accepted answers, genuinely monotonic lookup tables, standards matching between public/server) — all passed first run.
- SQL delivered as plain text in chat.

*What is now true*
- Simulation Lab has 10 live-in-code cases across three grades, all built to the documented grade-based rigor rubric.
- The `fillBlank` checkpoint type is proven in real authored content.
- There is a documented pattern for a TEKS standard whose real-world relationship isn't monotonic: scope to the sub-window that is.

*What is still open*
- **None of this pass has been live-tested.**
- **Run the new SQL** (3 new `cases` rows) — treat as NOT confirmed until explicitly checked.
- **All 10 cases still need anchor/thumbnail art.**
- A possible second Grade 5 or Grade 4 batch remains open.

---

*Earlier entries (Sept 4 bug-fix pass and before) unchanged — see prior versions of this file for the full session-by-session history back through the pre-digital-app era.*

---

## 1 · THE HEADLINE

**ClearCenters is not behind. It is un-shipped.**

**29 complete centers are built and sitting on disk, unpublished** from the old Site/PacketPress era — see the Aug 29 caveat: only Group Chat and Signal Check were confirmed to exist in the current 100%-digital Next.js app (`clearcenters`) as of Aug 29; Mission Map, Simulation Lab, Frequency Rush/Signal Ops, Relay Station and Assembly Deck have since joined them, built from scratch in that app.

**Cases authored (current app): Group Chat 27 (8 live + 19 built/waiting) · Signal Check 84 Science/SS standards plus 24 Math/ELAR cases authored Sept 21-22 · Mission Map **49 cases — complete** (Science 13, Social Studies 12, Math 12, **ELAR 12 as of Sept 23, SQL not yet run**) · Simulation Lab 10 live cases across Grades 3-5 Science · Relay Station 94 lessons (20-level Foundations Track + 72 readings + daily/race) · **Assembly Deck 66 cases** (Science 26, ELAR 14, Social Studies 14, Math 12; the 48-case map is authored) · **Classification Lab 8 cases live in code**, with 4 more authored and awaiting review.** *(Sept 24: SQL run status for the new Assembly Deck and Classification Lab cases is unknown. See the session log.)*

**As of Sept 23, there is no outstanding schema debt for the first time since Sept 4.** Relay Station Wave 3, Assembly Deck Wave 1 and the Mission Map Math 12 have all been run and confirmed by Emily, and everything is pushed and deployed — the deployed commit's own tree was walked file by file to confirm it, rather than inferred from timestamps. §9.16 still applies to the next batch.

| Engine | Status |
|---|---|
| Group Chat | Live. 8 published, 19 built and content/TEKS-verified, formatting pending (old-era paper, largely moot for the current app). |
| Signal Check | Live. 84 standards across grades 3-5 (108 cases). **Re-leveled Sept 23: all 108 on grade, not yet pushed.** 3 dead files await manual deletion; the Social Studies batch's SQL/images still pending — **re-verify, don't assume.** |
| Mission Map/Evidence Quest | **Complete: 49 cases**: Science 13, Social Studies 12, Math 12, **ELAR 12 (authored Sept 23, later session; SQL delivered, not run; not pushed)**. Everything up to the Math batch is run and deployed. `tools/mission-map-gradecheck.cjs` gates reading level. Map art is missing for the 24 Math/ELAR cases. `tools/mission-map-casecheck.cjs` now guards the engine's client/server answer-key agreement across all 49. Still not live-tested since the Sept 2 batch. |
| Simulation Lab | 10 cases across Grades 3-5 Science, all to the documented rigor rubric. Two bugs found and fixed in live-testing. Not live-tested since; SQL run status unconfirmed. Anchor art still needed for all 10. |
| **Relay Station** | **Live through Wave 3; Wave 3 SQL now run and deployed.** A typing center that doubles as reading practice: a 20-level auto-advancing Foundations Track (rising pass bar 90/95/100%) with placement and teacher override, a 72-reading library across 6 topic families, ghost racer, Repair Drills, a class trouble-key heatmap, per-student Supports, Dictation and Corrupted Transmission modes, Copy → Compose (AI-first-read), a Daily Transmission with weekday streaks, 7 rank-unlocked keyboard skins, S.A.M. on every screen, and a whole-class Relay Race with a projector board. Teacher surfaces: Typing Track, Typing Texts, Relay Race Board, Distress Call, standards report. Waves 2-3 still not live-tested. |
| **Assembly Deck** | **Live, Wave 1 (paragraph mode). Piloted with a real student Sept 23.** Students build three paragraphs sentence by sentence, name what each leftover sentence actually was, order the finished paragraphs, answer the two **Chief's Debrief** questions about the report they built, and write a short explanation S.A.M. reads first. A **Case File** is reachable from every screen. ~20 minutes per case. **66 cases** (Science 26, ELAR 14, SS 14, Math 12 in word-problem mode), all registered. They were authored in other sessions and discovered Sept 24; **their SQL run status is unknown.** Includes protest lines, a requester who writes back, the Editor's Trap and Chief's Challenge, plus the Sentence Sort teacher board. **Territory Builder retired into this engine** (its map mode). **SQL run and deployed.** Not re-piloted since the debrief was added. Its own tile art still does not exist — it borrows the Repair Desk image. |
| Frequency Rush / Signal Ops | Live. Vocabulary engine plus the whole-class Signal Ops board. **Sept 24: becoming the fluency center** (`FrequencyRush_Fluency_Expansion_v1.md`). Six Math fact sets are built (SQL not run, not pushed). ELAR word study is next. |
| Galaxy Hub (Gear Locker) | Per-world "World Reward Station" pages. **Lumara and Mechara** are real reference builds with story + self-hosted game (Mechara: Word Blaster added Sept 22); Frostveil/Cindara/Solara/Cloudreach still "coming soon." `DEV_FORCE_UNLOCK_ALL` still `true` — must be turned off before real use. |
| Home dashboard | 6 free rotating backgrounds plus per-world earned backgrounds and S.A.M. trails via the Settings panel. All backing SQL confirmed run. |
| **Classification Lab** | **Built (another session, found Sept 24).** Three pages per case: Sort, Harder sort with Neither, and Venn plus 3 questions. 8 cases are in `catalog.js`. Batch 1 (4 cases) is authored as JSON and awaiting review. There's a content spec and a case map at the app root. **SQL (`add_classification_lab.sql`) run status is unknown. Not live-tested.** |
| Repair Desk | 11 old-era cases; design decided Aug 29; not built in the current app. |
| **Maker Studio** (absorbs Field Dispatch, née Museum Exhibit Builder) | **Designed Sept 24, 0 built.** Exhibit mode first; more product modes later (graph, diagram, blueprint, comic and others). Design: `MakerStudio_Digital_Design_v1.md`. 60 possible exhibits mapped; 1 sample case drafted. It reuses the existing image bank, so far less new art is needed than the old Field Dispatch plan. |
| The Tribunal (née Comment Court) | 0 built. Design decided Aug 29. |
| Newsroom | 38 old-era Card 2.0s against a rejected mechanic; new design decided Aug 29; not built. |
| ~~Sector Survey / Territory Builder~~ | **Retired Sept 22, 2026 into Assembly Deck's map mode** per Emily's call; its coming-soon tile was removed. |
| Mission Quest (old era) | 1 full packet, 5 fixable defects, unconfirmed in the current app. |
| You Be the Judge / Comment Section (old era) | Live in the old Site build only; folded into The Tribunal's design. |

---

## 2 · WHERE THINGS LIVE NOW

Everything is under `ClearCenters - Masters`. Nine folders, numbered so Explorer sorts them usefully: `00_START_HERE` (this file, tracker, naming rules) · `01_ENGINES` · `02_TOOLS` · `03_CENTERS` · `04_CARDS` · `05_REFERENCE` (concept libraries, digital design docs, TEKS PDFs) · `06_PLANNING` · `07_PITCH` · `_ARCHIVE`. The current `clearcenters` Next.js app lives in a separate device folder (`C:\Users\emben\OneDrive\Desktop\clearcenters`), not under Masters.

**Only the `clearcenters` app folder is connected to Claude sessions** — the Masters folder is not, so `00_START_HERE` copies of this file have to be placed by Emily or a folder grant arranged.

**`tools/` in the app folder holds the content checkers:** `assembly-deck-gradecheck.cjs` (reading level), `assembly-deck-casecheck.cjs` and `mission-map-casecheck.cjs` (case consistency), `relay-station-gradecheck.cjs` and `relay-station-readingcheck.cjs`. A `sim/` folder holds a small React runtime that walks an Assembly Deck case end to end as a student. Design docs for both new engines, plus the Relay art batch and the Assembly Deck case map, sit at the app folder root and in the Claude project.

**The rule:** a file's folder is decided by *what it is for*, not when it was made.

---

## 3 · WHAT EACH ENGINE STILL NEEDS (current app)

A shippable engine needs: a case schema (`public.js`/`server.js` pair), a client component, a `page.js` routing branch, an `/api/<engine>/submit` route, and at least one authored, TEKS-verified case.

| Engine | Schema | Client | Routing | Submit route | ≥1 case | Verdict |
|---|---|---|---|---|---|---|
| Group Chat | ● | ● | ● | ● | ● | Live |
| Signal Check | ● | ● | ● | ● | ● | Live, 84 standards |
| Mission Map | ● | ● | ● | ● | ● | 49 cases, complete. ELAR SQL still to run |
| Simulation Lab | ● | ● | ● | ● | ● | 10 cases — needs live-test; SQL unconfirmed |
| **Relay Station** | ● | ● | ● | ● | ● | 94 lessons — SQL run; Waves 2-3 still untested |
| **Assembly Deck** | ● | ● | ● | ● | ● | 66 cases — SQL for the 60 new cases unconfirmed; piloted once; own tile art missing |
| **Classification Lab** | ● | ● | ● | ● | ● | 8 cases in code — SQL unconfirmed; not live-tested |
| Repair Desk | ○ | ○ | ○ | ○ | ○ | Designed, not built |
| Maker Studio (absorbs Field Dispatch) | ○ | ○ | ○ | ○ | ○ | Designed Sept 24, not built |
| The Tribunal | ○ | ○ | ○ | ○ | ○ | Designed, not built |
| Newsroom | ○ | ○ | ○ | ○ | ○ | Designed, not built |

---

## 4 · THE API KEY — old-era issue, owned by the dev team, not tracked here

This was a blocker in the old Site/PacketPress era. The current app uses a real server-side API route (`lib/anthropic.js`'s `callClaude`) for every AI-graded response — kept here only as historical context.

---

## 5 · MISSION QUEST — old-era audit, August 12 (historical)

The old-era 5.6A "Creek Sensor Mix-Up" packet had strong reasoning design undermined by 5 fixable production defects. Not confirmed to exist in the current app — historical reference only.

---

## 6 · THE PLAN

**Current-app build order (confirmed Aug 29, amended since):** Mission Map ✓ → Simulation Lab ✓ (10 cases) → *(inserted by Emily's call: Frequency Rush/Signal Ops ✓, Relay Station ✓, Assembly Deck ✓ 66 cases)* → Classification Lab ✓ (built, 8 cases) → Repair Desk → **Maker Studio** (replaces Field Dispatch, Sept 24; its exact place in line is not yet set) → The Tribunal → Newsroom. **Sector Survey is no longer in the order** — retired into Assembly Deck.

**Immediate next steps:**
0a. ~~Run `add_frequency_rush_skills.sql` and push~~ **Committed as "FR update 1.2".** Next: Emily reviews `FrequencyRush_ELAR_WordStudy_Review_v1.md`, then runs `add_frequency_rush_elar_skills.sql` and pushes.
0. **(Sept 24) Confirm the SQL for the new Assembly Deck (60 cases) and Classification Lab (column + 8 cases) has run.** Then extend `audit_production_readonly.sql` to cover them and re-run it. Do this before assigning any of those cases.
1. **Pull.** Emily's local checkout is one commit behind origin — the "Student progress" change was made on GitHub and is deployed but not down on her machine. Pull before editing anything, or the next commit fights it.
2. **Re-pilot `3.6A-AD` with a student**, now that the Case File and the Chief's Debrief are in it. Twenty minutes, and it is the cheapest de-risking available before 48 more cases are written against that ending.
3. ~~Author Mission Map's ELAR 12~~ **Done Sept 23 (later session).** The ELAR SQL has been run (the audit shows 49 rows) and the code was pushed at 12:39. Still to do: map art for the 24 Math/ELAR cases. Math hints are done.
4. ~~Emily reviews `AssemblyDeck_CaseMap_v1.md`, then author the 48~~ **Authored (Sept 24, found in the folder); Assembly Deck is at 66.** Still open: Emily's read of the authored cases as author of record, and a checker run across all 66.
4b. **(Sept 24) Emily reviews `ClassificationLab_Batch1_Review.docx`**, then the 4 cases get wired into `catalog.js` with their SQL.
5. **Generate `assembly_deck.jpg`** so Assembly Deck stops borrowing the Repair Desk artwork, and tell Claude where the rest of the generated art landed (Relay rank badges, skin previews, posture/hands diagrams).
6. ~~SQL sweep~~ **Done Sept 23 via `audit_production_readonly.sql` — schema clean; only 3 Assembly Deck rows outstanding.**
7. Turn `DEV_FORCE_UNLOCK_ALL` back to `false` before real classroom use.
8. Live-test the World Reward Station end to end, plus Simulation Lab's 10 cases.
9. Decide stories/games for the remaining 4 worlds (Frostveil, Cindara, Solara, Cloudreach).
10. Get a decision on the orphaned Glow Garden files and `student_planet_discoveries`.
11. Old-era items (§4, §5, the 83-case Site-era catalog) remain parked.
12. **(Sept 24) Commit the Signal Check re-level and the three Maker Studio docs** through GitHub Desktop.
13. **(Sept 24) Audit every engine's submit screen for the confidence check** (§9 rule 21). Add it wherever it is missing, and store it with the submission so teachers see it next to the level.

---

## 7 · STILL GENUINELY MISSING (current app)

- ~~Relay Station Wave 3 and Assembly Deck Wave 1 SQL~~ **Run and confirmed Sept 23**, along with the Mission Map Math 12. No outstanding schema debt.
- **Assembly Deck has not been re-piloted since the Chief's Debrief was added**, and Relay Station Waves 2-3 have never been live-tested.
- **Assembly Deck tile art** (`/teacher/challenges/assembly_deck.jpg`) still does not exist. It is not a broken image — `lib/teacherBridge.js` points the engine at `repair_desk.jpg` — but Assembly Deck is wearing another engine's picture.
- ~~Mission Map's ELAR 12~~ **Authored Sept 23.** Its SQL is not yet run, and the files are not yet pushed.
- **Map art for Mission Map's 24 Math/ELAR cases** (`/mission-map/<code>-map.jpg`, which should also be saved as the `/cases/` thumbnail).
- ~~Case hints for Mission Map's Math 12~~ **Done Sept 23.**
- ~~Mission Map's original 25 read above grade band~~ **Re-leveled Sept 23.**
- **A "Student progress" commit made on GitHub is deployed but unreviewed by Claude** and unpulled on Emily's machine.
- **Relay Station art is generated but unconnected** — rank badges, keyboard-skin previews, posture and hands diagrams are referenced nowhere in code, and the challenge tile still points at the SVG placeholder. Paths unknown to Claude.
- **SQL run status unknown** for the 60 new Assembly Deck cases and for Classification Lab (a column and 8 rows). The audit script doesn't cover them yet.
- **Classification Lab Batch 1 (4 cases) is authored but not wired.** The Sept 23 audit's orphan `3.6B-CL` row is still in `cases`.
- **The 60 new Assembly Deck cases have not been reviewed by Emily**, who is author of record, and Claude hasn't checked them.
- **Reading level unmeasured on Frequency Rush, Simulation Lab and the Briefings.** Assembly Deck, Relay Station, Mission Map and Signal Check are now all measured and on grade.
- **`lib/cases/TEKS_STANDARDS.md` is behind** — every Science/SS code used on Sept 22 still needs adding, and the log is thin above Grade 3 Science.
- A deliberate SQL audit sweep for Simulation Lab, Mission Map and Signal Check.
- Two orphaned pieces from the old Glow Garden system; old per-planet `.png` art.
- **`DEV_FORCE_UNLOCK_ALL`** still `true`.
- Galaxy Hub planet `description` text not updated to match the renames.
- Simulation Lab anchor/thumbnail art for all 10 cases.
- 7 of the original 9 uploaded background images not wired into their engines.
- Images for the Sept 2 Mission Map batches and Signal Check's 27 field reports.
- 3 dead Signal Check files still need Emily's manual deletion.
- Repair Desk, Maker Studio (absorbs Field Dispatch), The Tribunal, Newsroom — designed, none built.
- Whether each round of device-side changes is committed and pushed to GitHub remains worth checking directly rather than assuming, since Vercel deploys off GitHub. (Emily committed several times during Sept 22 — "relay 7", "relay art 1", "image audit batch 1", "new icons", "Challenge Library", "ship cohesion".)

---

## 8 · OPEN DECISIONS

26. ~~Re-level Math up or the original 25 down?~~ **Resolved Sept 23: the original 25 were re-leveled down. All 49 now separate by grade.**
25. ~~**Does the leftovers step hold up three times per case?**~~ **Answered Sept 23 by the pilot: yes.** Emily ran the grade 3 Science case with a student and the leftovers step held. What did not hold was using it *again* as the final written question — that ending is now the Chief's Debrief.
24. **(Sept 22, 2026, new) Should the reading-level gate be applied retroactively to the older engines** (Frequency Rush, Signal Check, Mission Map, Simulation Lab, Briefings)? Offered and declined for now ("no thats ok for now").
23. **(Sept 22, 2026, new) Where did the generated art land, and which pieces map to which paths?** Blocking all art wiring for both new engines.
22. **(Sept 4, 2026) Should there be a recurring "SQL audit" step at the end of every session that touches schema?** Leaning yes; §9.16 covers the principle but it isn't a formal step. **The Sept 22 session ended with two unrun blocks, which argues for adopting it.**
20. **(Sept 4, 2026) What should the remaining worlds' stories and games be?** Lumara and Mechara are done; 4 remain.
21. **(Sept 4, 2026) Delete or keep the orphaned old Glow Garden files and `student_planet_discoveries`/`/api/planets/discover`?**
19. ~~How should Home backgrounds gate on Galaxy Hub unlocks?~~ **Resolved Sept 4** — per-world, via reading that world's story.
15. **(Aug 29) Which of the designed-but-uncoded engines gets built, in order?** Amended repeatedly by Emily's own calls (Frequency Rush, then Relay Station, then Assembly Deck all jumped the queue). Sector Survey is now retired. **Sept 23 note: Mission Map is now finished, so the choice is two-way: build out Assembly Deck's 48, or start Classification Lab.** **Sept 24: both are done.** Next in line: Repair Desk, then Maker Studio (its place in line not yet set), The Tribunal and Newsroom.
18. **(Sept 1) Should the background-scrim and Save Progress patterns be pulled into shared components?** Not done, not yet asked for.
13. **(Aug 29) Do Newsroom's 4 modes still make sense as separate modes under the new mechanic?**
10/11. **(Aug 29) Should Repair Desk's design be revisited for the space theme, and is the space theme default-on for every future design?** (Relay Station and Assembly Deck both adopted the Cadet/transmission voice by default, which is evidence for "yes.")
9. **(Aug 29) Full reconciliation of this file's old Site-era "built" claims against the current app** — Emily's call on timing.
1-8, 12, 14, 16, 17 — resolved; see the condensed Aug 29/Aug 12-14 session-log entries.

---

## 9 · CONVENTIONS

1. **The project holds current only.** Superseded versions go to `_ARCHIVE` the same day.
2. End every session by saving verified files into the right folder here.
3. **Update this file at the END of a session, not the start of the next one.**
4. Build handoff docs are temporary. When a build lands, STATE absorbs it and the handoff is deleted.
5. Propose → Emily approves → content locked → build → verify by simulation → present.
6. AI drafts; Emily is author of record. Gate checks mechanics; humans check rigor.
7. One approved source, many outputs — paper and digital are siblings and cannot drift.
8. Facts real. `[VERIFY]` resolved, never deleted. **Standards never asserted unconfirmed.**
9. Emily's words win ties.
10. Fun never replaces thinking.
11. **(Aug 31, 2026) Real TEKS documents are checked BEFORE authoring or revising any case content, not after.** Applied again Sept 22 for all six Assembly Deck cases and all 48 mapped ones.
12. **(Sept 1, 2026) Before believing an engine "runs live," check its actual routing in `page.js`.** Both Relay Station's and Assembly Deck's dispatch branches were added in the same pass as their client components, specifically to avoid repeating the Mission Map bug class.
13. **(Sept 3, 2026) When live-test feedback surfaces multiple real gaps at once, synthesize them into concrete AskUserQuestion forks before writing any code — never guess at a fix.**
14. **(Sept 4, 2026) Grade-based rigor is a per-case content-authoring decision, not a schema/UI one.** **Extended Sept 22:** it is now *measured*, not asserted — `tools/*gradecheck.cjs` gate every case against its grade's band, with a floor as well as a ceiling and a required gap between grades.
15. **(Sept 4, 2026) When a student reports something looks "broken" or "lost," check the actual current code before assuming a fix is needed.**
16. **(Sept 4, 2026) "SQL delivered in chat" and "SQL confirmed run in production" are different facts — do not let the first stand in for the second.** Also don't trust a `200` status alone on a page that redirects. **Sept 22 note: this file ends with two unrun blocks and one of them has its code already committed. Check this first next session.**
17. **(Sept 22, 2026) Measure before rewriting, and check the measurement before trusting it.** The first reading-level sweep of Relay Station flagged 26 of 72 readings, but part of that was the scorer treating headlines, recipe steps and dialogue lines as running prose. The fix was a form-aware scorer, then rewriting only what was genuinely wrong. A number that tells you to change 26 things deserves a second look before you change them.
    **Sept 23 — this happened again, the same way.** Scoring the 12 new Math cases reported 70-word sentences and all 12 out of band; the scorer was fusing consecutive answer choices into one sentence, because a multiple-choice option has no full stop at the end of it. **The rule is now specific: before acting on a text measurement, look at the longest "sentence" it found.** If that string spans two things a student would never read as one sentence, the scorer is wrong, not the content. Both times, the honest measurement underneath revealed a smaller real defect that would otherwise have been buried in the noise — on Sept 23 it was that the grade 5 cases read easier than the grade 4 ones.
19. **(Sept 23, 2026, new) When an engine grades the same answer in two places, something automated has to check that the two agree.** Mission Map decides right/wrong on the client from the public case, and again on the server from the server case, for 37 cases and four checkpoint types. A disagreement between those two files is invisible in review and silent in production: the student is told they were right and the gradebook records a miss. Nothing was checking it until `tools/mission-map-casecheck.cjs` existed. Any engine with a public/server case pair should assume the same risk.

20. **(Sept 23, 2026, new) A pilot's job is to move the design, not to approve it.** The Assembly Deck pilot produced "i love it" AND three changes that reshaped the end of every case. The useful output was not the verdict; it was Emily noticing that the last question was unanswerable because the evidence had scrolled away twenty minutes earlier. No simulation was going to find that, and a pilot that only returns a thumbs-up has not been run properly.

21. **(Sept 24, 2026, new — SITE-WIDE RULE, Emily's call) Every submit asks "How sure are you?" 😕 🙂 😄, in every center, every time, including a resubmit after a send-back.**
    - The answer is saved with that submission.
    - The teacher sees it next to the level on the grading screen, and sees how it changed between tries.
    - "Very sure, but Level 0" is the flag that matters: that student believes something wrong.
    - It never affects the score or the Crystal Points, and students never see it used against them.
    - New engines include it from the start. Existing engines get audited and backfilled (§6 step 13). Which ones already have it has not been checked; Group Chat's is the model.

18. **(Sept 22, 2026) Vocabulary that a standard names is not "too hard."** When a reading scores above grade because of *conductors*, *deposition* or *Reconstruction*, the sentence around the word is the lever — not the word. `tools/relay-station-readingcheck.cjs` exists to tell those two cases apart.

---

## 10 · OPEN [VERIFY] LIST

**TEKS documents in hand (as of Sept 22, 2026): ALL OF THEM** — Grade 3/4/5 Science (adopted 2021, implemented 2024-25), Grade 3/4/5 Social Studies (adopted 2022, implemented 2024-25), ELAR Grades 3-5, and Mathematics Grades 3-5. Nothing in the project is blocked on a standards document any more.

**Confirmed TEKS (current app), added Sept 23:** all 12 Mission Map Math anchors — 3.7B, 3.4D, 3.7A, 3.8B (grade 3) · 4.3D, 4.5D, 4.2B, 4.5A (grade 4) · 5.2B, 5.6B, 5.9C, 5.3H (grade 5) — each checked against the real Texas Mathematics TEKS PDF before authoring. The same pass confirmed **5.5 and 5.7 have no lettered subparts**, so `MA.5.5` is a correctly-formed code. **Added Sept 23 (later): all 12 Mission Map ELAR anchors are now in authored content:** 3.7C, 3.6G, 3.8C, 3.10C · 4.8A, 4.10A, 4.9E, 4.7D · 5.6F, 5.7B, 5.8A, 5.10A. They are logged in `TEKS_STANDARDS.md`.

**Confirmed TEKS (current app):** `3.1-MM` (3.12B) · `4.1-MM` (4.9B) · `5.1-MM` (5.7A/5.7B) · all 22 Sept 2 Mission Map cases · all 84 Signal Check standards · all 10 Simulation Lab cases · Relay Station's keyboarding anchors (Tech Apps 3/4/5.12C) and all 72 readings' subject anchors · all 6 Assembly Deck cases (3.6A, 4.10B, SS 4.6B, SS 5.4C, ELA 3.12B + 3.11B(i), ELA 5.12C + 5.11B(i)) · all 48 mapped Assembly Deck cases, checked in-session against the PDFs above.

**Outstanding:** the 24 Math/ELAR Signal Check cases authored Sept 21-22, whose codes are used by live content but have never been checked off in `TEKS_STANDARDS.md` · Simulation Lab's two Social Studies candidates and a possible second Grade 4/5 batch · old-era Mission Quest/Judge/Comment Section codes (historical).

**Failed verification, later fixed:** `3.1-MM`'s original pollination premise (no such standard at grades 3-5; rewritten to 3.12B) · Mission Map's "basic needs" Habitat Trail (re-anchored to 3.12C) · Mission Map's Grade 5 weather-vs-climate concept (moved to Grade 4) · Mission Map's "Goods and Services Market Map" (re-anchored to 3.6A) · Mission Map's civic-participation anchor (re-pointed to 4.22A) · Relay Station's early uncertain TEKS letters (reduced to knowledge-and-skills numbers only: 4.2, 4.3, 4.4, 5.4) until the real PDFs arrived.
