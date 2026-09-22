# Assembly Deck — Digital Design v1

**Sept 22, 2026.** The center where students *build* something instead of choosing something. One engine, four assembly modes, all four subjects. This is a design note; status lives in `ClearCenters_STATE.md`.

Territory Builder is retired into this engine per Emily's Sept 2026 call — the map work becomes Assembly Deck's `map` mode rather than its own engine, so there is one deck, one grader, one teacher view.

---

## 1 · One sentence

A tray of pieces, a board with labeled slots, and a rule about what belongs where: students assemble a paragraph, an investigation, a map, or a word problem — including deciding which pieces to *leave in the tray* — then explain in a sentence or two why their build holds up.

---

## 2 · Why one engine and not four

Four separate engines would mean four case schemas, four graders, four teacher views, four sets of art. Every mode here is the same interaction underneath:

> pieces + slots + a rule for which piece belongs in which slot + decoys that belong nowhere.

A paragraph's slots are rhetorical (topic / evidence / reasoning / conclusion). An investigation's slots are procedural (question / change / keep the same / measure / record). A map's slots are *places*. A word problem's slots are structural (situation / numbers / question). The renderer differs only in how a slot is drawn — a labeled row, or a region on a map image. Everything else — the deck, the drag, the check, the decoy logic, the explain step, the grading, the results screen — is shared.

**The rule this engine lives by:** a new case is a data file. If a case ever needs its own component, the case is wrong for this engine.

---

## 3 · A case is a whole piece, not a paragraph (Emily, Sept 22)

These run in a ~20-minute center rotation, so one paragraph is not enough work. Every case is **three paragraph builds plus an assembly round**, and the rounds are labeled by **content** ("What happened to the outside bank"), never by position, so ordering them at the end is a real structure decision rather than a formality. Measured against the engine's own time model — reading every sentence in the tray, placing them, choosing a reason for each leftover, the assembly, and the writing — the six Wave 1 cases land at 19–20 minutes each.

---

## 3 · Student flow

1. **Mission brief** — the situation in three or four lines, in the station voice, plus what they're building, who it's for, and how long it runs. The source card (survey notes, fact card, research card) opens here and stays reachable on every later screen. S.A.M. is on screen throughout, the Relay Station pattern.
2. **The deck** — the board (empty slots) above, the tray of sentences below. Tap a sentence, tap a slot. Pieces move back to the tray freely. Nothing is timed, and every control is a real button, so the whole engine works from a keyboard.
3. **Check** — one button. The board is graded instantly against the key. Correct sentences lock with a green edge; wrong ones return to the tray carrying a one-line reason — a different one depending on whether the sentence belongs elsewhere in the paragraph ("This is a measurement from the survey — evidence") or never belonged at all ("This is an opinion about the creek"). **Attempt 2 is allowed**; if it is still wrong, the correct build is filled in rather than leaving a student stuck.
4. **Read it back** — a correct board shows the finished paragraph as continuous prose before anything else happens. This beat is the payoff for the round and is never auto-skipped.
5. **The leftovers** — the sentences still in the tray come forward, and for each one the student picks **why** it failed: an opinion, a contradiction of the notes, a claim nothing supports, an off-topic fact, a personal story, or one example standing in for evidence. The leftovers are obvious; naming what each one *was* is the thinking. Graded, with the real reason shown either way.
6. **Repeat** for each paragraph, then **assemble**: the finished paragraphs, in the student's own words, get ordered. A wrong order stays changeable — the check is feedback, not a lock — and a correct one shows why that order is the one a reader needs.
7. **Explain** — one short written answer against 3–5 visible criteria. S.A.M. reads it first and returns two glows and one grow; Emily is the scorer of record. Same pattern as Group Chat and Signal Check.
8. **Payoff** — the whole assembled piece read back in order, the three scores, and crystals.

---

## 4 · The four modes

### 4.1 `paragraph` — Build an Explanation *(built, Wave 1)*
Slots: **Topic sentence · Evidence (×2) · Reasoning · Conclusion**; grade 3 drops the reasoning slot, because 3.11B(i) names only an introduction and a conclusion. Grades 4–5 model transitions in the sentences themselves — the engine never grades a connector word, which would be easy to satisfy and hard to satisfy honestly. Pieces are single sentences. Decoy types, one or two per round:
- **off-topic** — true, interesting, wrong paragraph
- **opinion-as-evidence** — "Everyone knows deserts are the worst"
- **contradicts-the-source** — states the opposite of the given text
- **right-idea-wrong-slot** — a fine conclusion sitting in the evidence pile

Works in every subject; cheapest to author; the backbone of the first wave.

### 4.2 `investigation` — Build a Fair Test
Slots: **Testable question · What we change · What we keep the same (3 slots) · What we measure · How we record it.** Decoys break fair-test logic: a second variable changed, an untestable question ("Which plant is prettiest?"), a measurement with no tool, a control that isn't controllable. The finished plan is the answer key for a real classroom investigation, so Emily can run it for real the next day.

### 4.3 `map` — Build the Territory
A grade-appropriate map image with **drop zones defined in data as percentage rectangles or polygons** — never per-case code. Pieces are settlements, forts, missions, habitats, resources, or region labels. Each zone carries its own accept/reject rule and a one-line reason ("A mission needed a river and people nearby — this bluff has neither"). This is where the old Territory Builder library lands.

### 4.4 `problem` — Build a Word Problem
Slots: **Situation · The numbers · The question**, then a second board for **the representation** (strip diagram / equation with a letter for the unknown), then solve. Decoys: a number that isn't needed, a question the numbers can't answer, an equation that matches a different operation. Maps directly onto the "represent *and* solve" standards rather than only the answer.

---

## 5 · Case schema

Same `public` / `server` split and folder layout as Simulation Lab: `lib/cases/assembly-deck/<CODE>-AD.public.js` and `.server.js`, registered in the folder's `index.public.js` / `index.server.js`. Case codes carry the `-AD` suffix, and Math/ELAR use the `MA.` / `ELA.` prefixes already in use.

A case file holds `rounds[]` (each with its own slots, tray, decoys, and offered reason chips) plus one `assembly` block; the server file mirrors it with `rounds{}` keyed the same way, an `assemblyKey`, and one rubric for the whole piece.

**Public (safe in the browser — no key):**
```js
export const PUBLIC_CASE = {
  standard: "MA.4.5A-AD",
  mode: "problem",              // paragraph | investigation | map | problem
  title: "The Field Trip Bus",
  brief: [ "...3–4 lines of station framing..." ],
  buildLabel: "Build the word problem",
  slots: [ { id: "situation", label: "The situation", accepts: 1 },
           { id: "numbers",   label: "The numbers",   accepts: 2 },
           { id: "question",  label: "The question",  accepts: 1 } ],
  pieces: [ { id: "p1", text: "..." }, ... ],   // includes the decoys, unmarked
  rejectPrompt: "Two of these don't belong. Which ones, and why?",
  explain: { prompt: "...", criteria: [ "...", "...", "..." ] },
  board: null,                  // map mode only: { image, zones[] }
};
```

**Server (never imported by a client component):**
```js
export const SERVER_CASE = {
  standard: "MA.4.5A-AD",
  key: { situation: ["p1"], numbers: ["p3", "p5"], question: ["p7"] },
  decoys: { p2: "This number is in the story but the question doesn't need it.",
            p6: "The numbers can't answer this question." },
  misplacementNotes: { p4: "True, but it belongs in the situation, not the question." },
  mustInclude: [ "Names the unneeded number and says why it isn't needed.", ... ],
  aiContext: "private pedagogical brief, same as every other engine",
};
```

Map mode adds `board: { image: "/assembly-deck/maps/texas-regions.jpg", zones: [ { id, shape: "rect", x, y, w, h, label } ] }` in the public file and the same `key` shape in the server file — zone id in place of slot id.

---

## 5.5 · Making it fun (Emily's picks, Sept 22)

Four additions, all data, no new screens except one:

- **The leftovers fight back.** Every decoy has a protest line in its own voice — the opinion sentence insists it's "practically data," the contradicting one mutters "outward, backward, the bank moved, didn't it" — and S.A.M. answers it with the real reason. Protest lines live in the **server** case, so the tray never hints at which sentences are decoys, and they arrive only after the student has committed to a reason.
- **The requester writes back.** Chief Okafor, Chief Engineer Vance, the Alvarado family, the curator, Ms. Alvarez, the athletic director — whoever asked for the piece replies on the results screen, in one of three tiers picked from the student's actual scores. The "rough" reply is honest rather than consoling: *"half of what you wrote is the test, and half is what somebody assumed."*
- **The Editor's Trap.** After the assembly, S.A.M. slips one bad sentence into a paragraph the student built and dares them to find it, worth +2 💎. The trap text never ships with the case: the route rebuilds the paragraph from the student's own board, inserts the trap at the position the case names, and returns **plain sentences with no ids**. The answer is checked by index, so nothing in the payload gives it away. Optional by default.
- **Chief's Challenge.** An opt-in harder run that adds no content and takes scaffolding away: slot hints hidden, tray shuffled (deterministically, so a re-render doesn't reorder it mid-build), every reason chip in the engine offered instead of the case's shortlist, the second-attempt reveal switched off, and the Editor's Trap made mandatory. +3 💎.

A perfect challenge run with the trap caught pays 13 crystals; a quiet ordinary run pays 3.

---

## 5.6 · Reading level — grade 3 has to read like grade 3

Every case's student-facing text is gated against its grade band before it ships (`tools/assembly-deck-gradecheck.cjs`). Flesch-Kincaid is measured twice: once on the sentences the student actually sorts, and once on everything else on screen (brief, source card, prompts, the notes that come back, the protest lines, the requester's reply).

| Grade | FK band | Avg sentence | Longest single sentence |
|---|---|---|---|
| 3 | 2.0 – 4.2 | ≤ 11 words | ≤ 16 words |
| 4 | 3.5 – 5.6 | ≤ 14 words | ≤ 21 words |
| 5 | 5.0 – 7.2 | ≤ 16 words | ≤ 25 words |

There is a **floor** as well as a ceiling: a grade-5 case that reads at 3.5 isn't on grade either. The gate also fails if the grades stop separating — each grade's average has to sit at least 0.8 above the one below it.

The Wave 1 six were written before this gate existed and all six failed it (grade 3 was reading at 4.6–5.2, and the Lewis and Clark case at 8.6). They were rewritten sentence by sentence on Sept 22; the six now read 3.1 / 3.1 / 4.5 / 4.8 / 6.0 / 6.6, separating 3.1 → 4.7 → 6.3 across the grades. Target vocabulary — *erosion*, *deposition*, *property*, *scarcity* — is exempt from the word-length pressure: those words are the lesson, and the sentences around them carry the load instead.

S.A.M.'s written feedback takes its reading level from the case's `grade` field, not from a pattern on the standard code, so `SS.3.*` and `MA.3.*` get third-grade phrasing too.

---

## 6 · Grading

- **Build score** — correct pieces in correct slots, out of the total. Attempt 1 counts; attempt 2 is recorded but capped (matches the other engines' second-attempt handling).
- **Rejection score** — decoys correctly left out and correctly identified in step 4.
- **Explanation** — S.A.M. returns 0/1/2 against `mustInclude` plus two glows and one grow; the writing and the score both land in `submissions` so Emily grades from the Submissions view as usual.
- One API call per submission, on the explain step only. Everything else is free.

---

## 7 · Reused infrastructure (nothing new invented)

| Piece | How it's reused |
|---|---|
| Crystals | `increment_crystal_points` on first completion, bonus for a clean attempt-1 build |
| Distress Call | new adapter in `lib/distressCallEngines.js`; class goal counts finished builds |
| Standards reports | engine rows already keyed by `cases.standard` |
| S.A.M. | `SamGuide` on every screen, the Relay Station pattern (brief, deck, check, rejects, explain, payoff) |
| Teacher assign | one new tile in `CHALLENGE_TYPES`; Territory Builder's tile is removed in the same change |
| Sentence Sort board | `/teacher/assembly-deck` — the one report only this engine can produce (§7.1) |
| Submissions | `attempt1` / `attempt2` / `ai_score` / `ai_rationale`, plus one new `assembly_deck_data` jsonb column for the board state |

---

### 7.1 · The Sentence Sort board (built Sept 22, 2026)

Every other board in ClearCenters answers *how far did they get*. This one answers *what kind of bad sentence gets past this class*, which is the thing the engine uniquely measures.

- **What to teach tomorrow** — the decoy category this class names correctly least often, and the label they reach for instead. "Weakest on *opinion* — named correctly 38% of the time; when they miss it they call it *off topic*." A student who calls an opinion "off topic" is making a different mistake than one who calls it "not in the notes," and that difference is a lesson.
- **A confusion matrix, not a score.** For each category: how often it was named right, and what the wrong answers actually were. Leaving a leftover blank is tracked separately from naming it wrong.
- **Slot accuracy, hardest first.** Where sentences land across every case. A low bar on Reasoning means the class can find evidence but can't say why it matters.
- **Per student**, expandable: placement, paragraph order, traps caught, challenge runs, and the categories that student keeps missing. Plus who hasn't started.

Everything is recomputed from `submissions.assembly_deck_data` against the case keys at request time — the stored scores are never trusted, so a tampered payload can't move the class numbers. No new table, no SQL. Covered by `sim/deckboard.cjs` (access control, both empty states, the matrix arithmetic, per-student attribution, and the tamper case).

---

## 8 · Accessibility

Tap-then-tap works everywhere drag does; every piece is reachable by keyboard (arrow + enter); no timers anywhere in the engine; the brief and every piece can be read aloud with the same speech helper Relay Station's dictation mode uses; slot labels never rely on color alone.

---

## 9 · Candidate content — standards checked before authoring

Science and Social Studies codes come from the verified log in `lib/cases/TEKS_STANDARDS.md`. **ELAR and Math codes below are quoted from the official PDFs Emily supplied Sept 22, 2026** (`Texas_ELAR_TEKS_Grades_3_4_5.pdf`, `Texas_Math_TEKS_Grades_3_4_5.pdf`, both marked verified Sept 20, 2026).

**ELAR — `paragraph` mode**
- 3.11B(i) — "organizing with purposeful structure, including an introduction and a conclusion"
- 4.11B(i) / 5.11B(i) — same, **including transitions** (this is exactly the extra tile type grades 4–5 get)
- 3.12B / 4.12B / 5.12B — compose informational texts
- 3.12C / 4.12C / 5.12C — compose argumentative texts, including opinion essays

**Math — `problem` mode**
- 3.5A — "represent one- and two-step problems involving addition and subtraction of whole numbers to 1,000 using pictorial models, number lines, and equations"
- 3.5B — "represent and solve one- and two-step multiplication and division problems within 100 using arrays, strip diagrams, and equations"
- 4.5A — "represent multi-step problems involving the four operations with whole numbers using strip diagrams and equations with a letter standing for the unknown quantity"
- 5.4B — "represent and solve multi-step problems involving the four operations with whole numbers using equations with a letter standing for the unknown quantity"
- Process standards 3.1B / 4.1B / 5.1B (problem-solving model) ride along on every case.

**Social Studies — `map` and `paragraph` modes** (already-verified codes)
- 4.2C Spanish mission site selection · 4.6B comparing Texas's physical regions · 4.4B growth of the cattle industry — all three are map builds
- 3.3A physical environments · 3.6B scarcity · 5.4C Lewis and Clark — paragraph builds

**Science — `investigation` and `paragraph` modes**
- 3.6A physical properties · 4.10B weathering, erosion, deposition · 5.13B instinctual vs. learned behavior — verified and already in use
- The process/practice standards for the investigation mode (the x.1 "scientific and engineering practices" strands) **must be pulled from the Science PDFs before the first investigation case is authored** — they are not in the verified log yet.

---

## 10 · Art

Same batching rule as Relay Station: prompts collected, one upload.
- `teacher/challenges/assembly_deck.jpg` — the challenge tile (and Territory Builder's tile retires with it)
- `assembly-deck/maps/*.jpg` — one map per map-mode case; this is the only art the engine actually needs to function
- Optional: a deck/workbench hero for the brief screen

---

## 11 · Build waves

1. **Wave 1 — the engine + `paragraph`. BUILT Sept 22, 2026.** Deck, slots, check, read-back, leftovers, assembly, explain, results, submit route, teacher tile, Distress Call adapter, SQL. Six cases, two per grade: `3.6A-AD`, `4.10B-AD`, `SS.4.6B-AD`, `SS.5.4C-AD`, `ELA.3.12B-AD`, `ELA.5.12C-AD`. Territory Builder's "coming soon" tile was removed in the same change, since its content now lands in this engine's map mode. Validated by `sim/assembly.cjs` (a full student run, including a messy first attempt) and `advalidate.cjs` (every case's key, decoy reasons, slot capacities, assembly key, and runtime).
2. **Wave 2 — `investigation`.** Needs the Science practice codes verified first. Four cases.
3. **Wave 3 — `map`.** Territory Builder's library lands here; needs map art. Four cases.
4. **Wave 4 — `problem`.** Math, including the representation board. Four cases.

Each wave ships the same way Relay Station's did: SQL in chat first, code committed, simulation harness green before it goes live.

---

## 12 · Open decisions for Emily

1. Wave order — is `paragraph` first right, or do you want `map` early since that content already exists in the Territory Builder library?
2. Does the Territory Builder tile disappear the day Assembly Deck's first case ships, or stay as a "coming soon" until the map mode lands?
3. Grade 3 paragraph builds: three slots (topic / evidence / conclusion) or four, same as 4–5?
