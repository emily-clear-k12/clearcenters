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

## 3 · Student flow

1. **Mission brief** — the situation in three or four lines, in the station voice, plus what they're building and who it's for. S.A.M. is on screen, as on every Relay Station screen.
2. **The deck** — the board (empty slots) above, the tray of pieces below. Tap a piece, tap a slot (or drag, on a device that supports it). Pieces move back to the tray freely. Nothing is timed.
3. **Check** — one button. The board is graded instantly against the key. Correct pieces lock with a green edge; wrong ones bounce back with a one-line reason ("This is true, but it isn't *evidence* for the claim"). **Attempt 2 is allowed**, then the correct build is shown. Same two-attempt shape as the other engines, stored in `attempt1` / `attempt2`.
4. **The rejects** — after the board is right, the leftover pieces come forward: "Two of these never belonged. Why not?" Students tap the ones they rejected on purpose. This is graded too, and it is where most of the thinking is.
5. **Explain** — one short written answer against 3–5 visible criteria ("Name the piece you rejected and say why"). S.A.M. reads it first and returns glows + one grow; Emily is the scorer of record. Same pattern as Group Chat and Signal Check.
6. **Payoff** — the finished build is shown clean (a paragraph reads as a paragraph, a map shows the finished territory), plus crystals and a line about what they can do now that they couldn't before.

---

## 4 · The four modes

### 4.1 `paragraph` — Build an Explanation
Slots: **Topic sentence · Evidence · Reasoning · Conclusion** (grade 3 uses three slots; grades 4–5 add transitions as their own tile type). Pieces are single sentences. Decoy types, one of each in most cases:
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
| Submissions | `attempt1` / `attempt2` / `ai_score` / `ai_rationale`, plus one new `assembly_deck_data` jsonb column for the board state |

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

1. **Wave 1 — the engine + `paragraph`.** Deck, slots, check, rejects, explain, results, submit route, teacher tile, Distress Call adapter, SQL. First six cases: two Science, two Social Studies, two ELAR (grades 3–5 spread).
2. **Wave 2 — `investigation`.** Needs the Science practice codes verified first. Four cases.
3. **Wave 3 — `map`.** Territory Builder's library lands here; needs map art. Four cases.
4. **Wave 4 — `problem`.** Math, including the representation board. Four cases.

Each wave ships the same way Relay Station's did: SQL in chat first, code committed, simulation harness green before it goes live.

---

## 12 · Open decisions for Emily

1. Wave order — is `paragraph` first right, or do you want `map` early since that content already exists in the Territory Builder library?
2. Does the Territory Builder tile disappear the day Assembly Deck's first case ships, or stay as a "coming soon" until the map mode lands?
3. Grade 3 paragraph builds: three slots (topic / evidence / conclusion) or four, same as 4–5?
