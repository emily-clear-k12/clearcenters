# ClearCenters Briefings — v3 "Thinking Lesson" Shape

**Master brief. Written Sept 14, 2026. Self-contained — a session with no other context can work from this alone.**

---

## 0. How to use this document

If you are a fresh session picking this up: read §2 before you write a single line of lesson content. The shape in §4 is easy to copy and easy to fill with material that looks right and teaches nothing — that is exactly what happened twice before this rebuild. §2 is what stops it happening again.

If you are here to build content, the order is: §2 (why) → §3 (the rules) → §5/§6 (the contracts) → §8 (run the audit before you show anyone anything).

If you are here to extend the player, §7 has the integration points.

---

## 1. What a Briefing is

ClearCenters is Emily's internal thinking-stations product for Grades 3–5 Texas TEKS, under the Crystal Instruction brand. Briefings are one engine inside it: ~20-minute self-serve station lessons a student runs on a device, framed as intel work for "HQ" with a guide character called S.A.M.

Two subjects, two different jobs:

- **Social Studies** gets little or no direct instruction in the classroom, so an SS briefing is a genuine **first teach**. This document is about that shape.
- **Science** is already taught in class, so a Science briefing **refreshes rather than re-teaches**. That's a separate, lighter shape (`scienceLightReview.schema.js`, 5 phases) and it is not what this document describes.

Each lesson ships as two files: a **public pack** (`*.public.js`) the browser receives, and a **server pack** (`*.server.js`) holding answer keys, which must never be imported by a client component.

The long-term goal is **AI batch generation** across grades 3/4/5 × Social Studies/Science — roughly thirty lessons. Everything in this document is shaped by that: rules a machine can enforce are worth far more than rules a human has to remember.

---

## 2. Why v3 exists — the critique that drove it

**This is the most important section in the document.**

The v2 lesson (SS-3-2A-BR, still in the catalog) looked fine. Emily played it and said it needed no real thinking. She was right, and here is the specific evidence, because the general version of this criticism is useless:

**Every clue in the sort contained its own answer.** "Town posts a night watch and a **rule**" went in the bin labelled *laws*. "People practice their beliefs in their own **meeting house**" went in *religious freedom*. "A **market** and road help **farmers** sell what they grow" went in *material well-being*. A student who could not define a single one of the three terms still scored six out of six by matching words.

**The apply phase had no wrong answer.** Ops Choice offered three real projects plus a joke ("giant toy arcade"), and the server accepted *any two of the three real ones*. There was nothing to defend, which is why it never felt like a decision.

**The evidence phase could not go wrong.** The postcard asked for a scene, a reason and an evidence chip from three closed lists that mapped one-to-one — and the app filtered the scene list down to the projects the student had already funded. Three taps with no possible error.

**The assessment could not tell who understood.** Distractors included "fun only; toys; being famous" and "sports; shopping; vacations". A student who learned nothing eliminated their way to the answer. One true/false item was given away verbatim by a trap line three screens earlier. Question one asked which three reasons *TEKS 3.2A* names — a standard code, in a stem, for an eight-year-old.

**And the deeper structural problem, found only after the obvious ones were fixed:** across all phases the lesson asked for 22 interactions performing **one cognitive move** — *given a thing, which of these three categories is it?* Raising the difficulty of classification does not fix a lesson that is only ever classification. Notably, the process standard paired with 3.2A is **TEKS 3.17(B) — sequence and categorize information**. The v2 lesson categorized constantly and never once sequenced.

Three more gaps found in the same pass:

- The word **community** was never taught. Twenty minutes inside one invented town teaches a third grader that *community* means *town*. It is a neighbourhood, a school, a congregation too — and the standard is about communities, not towns.
- The interdependence of the three reasons was **asserted in a closing sentence**, never constructed. A student who reads "take one away and there's no town" has learned nothing.
- **Nothing left the station.** The postcard was the only artifact the lesson produced; scrapping it left a score, which is worth nothing on a wall and nothing to the next station in a rotation.

**Two failure modes to avoid when writing v3 content**, both of which happened in this project:

1. *Rewriting the prose and calling it a rebuild.* A new story on the same interactions is not a new lesson. Emily's exact words: "you just put another story on top of it."
2. *Writing content the player never renders.* `improves` was authored in every pack since P3 and displayed nowhere for months. So was `consequenceTitle` and a whole `debrief` paragraph. If a field isn't rendered, either wire it or delete it.

---

## 3. The five rules

1. **Tapping must carry a thought.** Third graders type about five words a minute, so there is no typing anywhere in this shape — that constraint is real and stays. But options must *combine into claims that can be false*, rather than matching one-to-one. Three reasons × six pieces of evidence is eighteen sentences, twelve of them untrue; that is a reasoning task with the same number of taps as a matching task.
2. **No distractor is a joke.** Every wrong option is a mistake a third grader actually makes, and its feedback teaches instead of marking. For this standard the real ones are: material well-being as *luxury* rather than need; security as *soldiers* rather than agreed rules; religious freedom as *everyone believing the same*; and "if it's new the town built it, so it must be material well-being."
3. **Some steps have no right answer, and go to the teacher.** The project's own governance principle is "the teacher is always the scorer of record; the AI is a first reader, never the judge." Where an item is genuinely a matter of judgment, the *opinion* is never marked — only the *logic* is checked.
4. **The teach must build.** If the beats can be shuffled without loss, it is a list of facts wearing a narrative costume. Each problem must be **caused by the previous solution**.
5. **A clue never contains its own answer.** Mechanically enforced — see §8.

---

## 4. The v3 phase sequence

Declared in the pack as `shape: "ssThinking"`, seven phases, target **20 minutes**:

| # | Phase id | What it does |
|---|---|---|
| 1 | `openingFrame` | Builds the definition of *community* from a decision, then takes a prediction that isn't settled for ten minutes |
| 2 | `storyTeach` | One town, three problems, each caused by the last solution. Student decides before being told, then **names the reason themselves** |
| 3 | `synthesis` | Sequence the problems, say what caused what, then remove one reason and reason about what breaks |
| 4 | *practice mechanic* | Any of `reasonSort`, `matchPairs`, `sequenceIt`, `labelPicture`, `trueFalseReason` |
| 5 | `opsChoice` | A civic decision with three people who each want something different and are all right |
| 6 | `transfer` | A community they've never seen — find the reason and prove it twice |
| 7 | `clearance` | Five questions; four auto-scored, the fifth read by the teacher |

**Design notes worth keeping:**

- `openingFrame`'s first question ("are they a community yet?") has **no marked answer** — "not yet" and "it depends what they do next" are both good thinking. It's a discussion opener, not an item.
- `storyTeach`'s naming step is the hinge of the whole shape. The student picks which reason this was, and *that* is what writes the ledger line. Handing them the label is what made the old Field Brief feel like three facts.
- Each beat then does three more things, because one instance of a concept is not a first teach: defines the term at the moment it's been earned, gives one real-world instance so the idea isn't welded to one invented town, and asks a **near-transfer stretch question** that catches a student who has been pattern-matching.
- `synthesis` is the only phase whose demand isn't classification. That was the biggest single miss in v2.
- `transfer` works because **every reason has evidence in the new town but only one has two pieces.** A student asked for two proofs has to notice that. That property must hold in every lesson built on this shape.
- `clearance` item 5 is a `keepClaim`: *"I'd keep ___, because without it ___."* Which reason they keep is theirs; the sentence still has to hold together. One "because" option is deliberately self-contradicting, for the student who is tapping without reading.

---

## 5. Public pack contract

Top level: the usual `id, title, tagline, subject, subjectLabel, grade, teks, teksText, minutes, engine, objective, successCriteria, art, phases, engagement, samLines, samTips` — plus **`shape: "ssThinking"`**, which is what routes validation.

```
openingFrame:
  title, setup, isItPrompt
  isItOptions[]  { id, text, response }          // no correct answer
  traitsPrompt, traitsNeeded (2)
  traits[]       { text, isTrait, why? }         // why = feedback when wrong
  traitsReveal                                   // the definition of community
  predictSetup, predictPrompt
  predictOptions[] { id, label, hint }
  lockLabel, lockedNote

storyTeach:
  ledgerTitle, ledgerEmpty, namePrompt
  reasons[]      { id, label }                   // what the student picks from
  firstReasonId                                  // pays off the prediction
  predictionRight, predictionWrong               // {GUESS} is substituted
  finalLabel
  beats[]:
    id, title, tag, imageKey
    situation, ask, bestLead
    choices[]    { text, best?: true, whatIf?: string }
    did, ledgerLine
    vocabTerm, vocabMeaning
    realWorld
    stretch      { q, options[] { text, ok, why } }
    bridge       // REQUIRED except on the last beat — this is what makes it a sequence
    nextLabel

synthesis:
  title
  orderTag, orderPrompt, orderCards[] { id, text }
  causeTag, causes[] { id, q, options[] { text, ok, why } }
  removeTag, removePrompt
  removals[]     { id, label, q, options[] { text } }
  bigIdea

reasonSort:   (unchanged from v2 — title, kidPrompt, helpWrong, helpPass, bins[], items[])

opsChoice:    (v2 fields, plus)
  voices[]     { id, who, emoji, said }          // id must match a project's reasonId
  whosePrompt, whoseRight, whoseWrong
  continueLabel
  // projects[].improves IS now rendered on the THIS YEAR board
  // no distractor project in v3 — all options are real needs

transfer:
  title, kidPrompt, imageKey?, imageAlt
  spots[]      { id, label, x, y }               // x/y are % of image; one must be a non-reason decoy
  tapCount (2)
  claimFrame, claimOptions[] { id, label }
  submitLabel

clearance:
  hqTitle, hqIntro
  progressGates[] { id, label }                  // ids: opening, teach, together, sort, newtown
  items[] x5:
    - four of  { id, type, prompt, choices[] { id, text } }
    - one of   { id, type: "keepClaim", prompt, keepFrame,
                 keepOptions[] { id, label }, becauseOptions[] { id, label } }
  exitCard     { enabled, tag, forTeacher }
  (plus the usual clearedMessage, challengeCta, requireProgressGates, requireAllAnswers)
```

---

## 6. Server pack contract

```
openingFrame:  { lockMessage }                   // the prediction is NOT marked

storyTeach:    { beats: { <beatId>: { reason, rightMessage, nameWrong } } }

synthesis:
  correctOrder[]                                 // beat/problem ids in true order
  orderFirstHint, orderHint, orderNextMessage, orderDoneMessage
  removals: { <reasonId>: { correctIndex, rightMessage, wrongMessages[] } }
             // wrongMessages is index-aligned with the public options array

reasonSort:    { answers: { <itemId>: <binId> } }

opsChoice:     { requirePickCount, teksProjectIds[], distractorIds: [],
                 projectReasonIds{}, requireDeferredReason, chipsOnlyOk,
                 justificationKeywords[] }

transfer:
  spotReasons  { <spotId>: "security"|"religious"|"material"|"none" }
  bestClaim                                      // the one with TWO proofs
  decoyMessage, rightMessage, onlyOneProofMessage, mismatchMessage, splitMessage

clearance:
  answers      { c1..c4: "a"|..., c5: null }     // c5 null = teacher-read
  keepCoherence { <keepId>: <becauseId> }        // which ending follows from which reason
  keepSelfContradicting                          // the becauseId that argues with itself
  keepContradictionMessage, keepMismatchMessage, keepAcceptedMessage
  explanations { c1..c4 }
```

**Deliberate exception, stated openly:** the ungraded *teaching* steps — `storyTeach.beats[].stretch`, `synthesis.causes`, `openingFrame.traits` — carry their correctness flags (`ok`, `isTrait`) in the **public** pack. Their feedback is immediate and retries are unlimited, and a student who reads page source to learn that a school slow-down zone counts as security and laws has, in the process, learned it. Everything that scores goes through the server. Move them server-side if that trade stops being acceptable.

---

## 7. Player integration

**`app/briefing/[assignmentId]/BriefingClient.js`** (~3,900 lines, one big client component):

- `PHASE_LABELS` — add a label for any new phase id.
- `migratePhaseState(saved)` — every phase has an unconditional state slice, so a lesson can use any subset without extra migration code. v3 slices: `openingFrame, storyTeach, synthesis, transfer`, plus `ops.whoseAnswer`.
- `PHASES` is computed **per briefing** from `briefing.phases`. It used to be one module-level constant shared by every lesson, which is precisely why Science was stuck being a copy of the SS shape.
- Components `OpeningFrame`, `StoryTeach`, `Synthesis`, `Transfer`; dispatch near the bottom (`if (phaseId === …) body = <X />`).
- `useReadAloud()` + `collectSpeakable()` — Web Speech API. One "Read this to me" control walks the rendered card, so it covers prompts *and* answer choices, and works on phases written before it existed. Browser TTS rather than recorded voice because recorded audio would have to be re-cut every time a line changes, which batch generation cannot carry. Browsers block audio without a gesture, so a phase can never read itself on open.
- `pickBtn(on)` — selectable full-width option style. Note `choiceBtn` is a plain object, not a function.

**`app/api/briefing/grade/route.js`** — one `if (phase === …)` branch per phase. v3 adds `openingFrame`, `storyTeach`, `synthesis` (steps `order` and `break`), `transfer`, and keep-claim handling inside the existing `clearance` branch.

**Registries:** `lib/briefings/index.public.js` and `index.server.js`.

**Two bugs fixed during this work, worth knowing about:**

- Ops Choice's continue button was hardcoded to `goToPhase("evidenceDrop")`, which dead-ends any lesson whose next phase isn't Evidence Drop. It's `goNext()` now.
- `projects[].improves` was authored everywhere and rendered nowhere; it's on the THIS YEAR board now.

---

## 8. The quality audit — what a machine can enforce

`lib/briefings/schema/ssThinkingLesson.schema.js` exports two things:

- `validateSsThinkingShape(lesson)` — throws on structural problems (wrong phase order, a beat with no `best` choice, a distractor with no `whatIf`, a missing `bridge`, wrong item count).
- `auditThinkingQuality(lesson, { answers })` — returns an array of problem strings, empty when clean, so a generator can regenerate and retry.

What it checks, and why each one exists:

1. **No-giveaway.** A clue must not contain a word from its bin's label *or from that bin's vocabulary definition* — that second half matters, because the old pack defined *laws* as "**rules** a community agrees to", which made "rule" as much of a giveaway as "law".
2. **Length parity.** The correct option must not be the longest; students learn to pick the long one without reading. This caught two items Emily and I had both eyeballed and passed.
3. **Word budget per screen**, default 110. Flesch-Kincaid tells you the sentences are simple and says nothing about there being four hundred of them. Screens are derived structurally (a `storyTeach` beat is three reveals, `opsChoice` is three), and feedback strings count as the longest single branch rather than summed, since a student sees only the response to the option they picked.
4. **Nothing pre-answered** by earlier lesson text.

Run it against the current v2 pack and it returns ten problems, including *Field Brief carries ~326 student-facing words against a 90-word budget* — which is the number behind "it's a lot of reading".

**Two limits, stated plainly.** This is string matching, not meaning: a clue saying "chapel" still gives away religious freedom and nothing here will catch it, because "chapel" is in neither the label nor the definition. And the audit cannot tell whether a causal chain actually holds — a model will happily produce three events that sound sequential and aren't. Both stay human review.

---

## 9. What exists right now

**Built, building clean, delivered:**

- The four v3 phases in the player, their grading branches, read-aloud, the schema and the audit.
- `SS-3-2A-V3-BR` — a complete lesson on the new shape, passing the audit with **zero problems**, plus a full id-by-id trace confirming every beat, clue, project, spot and question maps to a real server key.
- `add_briefings_ss_3_2a_v3_br_migration.sql` — needed before it appears on the teacher assign screen.
- The clickable prototype of all nine screens, published as a Claude artifact titled **"Make Them Think"** (in Emily's artifact gallery).

**Deliberately a new briefing id, not a replacement.** `SS-3-2A-BR` (v2) stays live and untouched, so nothing resets for a student part-way through it and the two can be assigned to different groups and compared. Retiring the old one is one uncommented line in that migration plus two lines in the registries.

**Not done:**

- **Nothing has been runtime-tested.** Verified by `next build`, the audit, and hand-tracing only. The sandbox has placeholder Supabase credentials, so nobody has clicked through this in a browser yet. **Do this before assigning it to students.**
- Cedar Landing (the `transfer` town) **has no art**, so that phase runs as word chips. It works; the mechanic is much better with a picture, and the hotspot coordinates are already positioned for one.
- The three "this really happened" lines in `storyTeach` are **unsourced**. teksguide.org has no Social Studies coverage at all — confirmed directly, its subject list is ELPS/ELAR/Science/Spanish Language Arts/Tech Applications — so unlike Science there is no misconception or example bank behind them. They are roughly right and need a human check before a child reads them.
- 3.2B and SCI-3-6B are still on the v2 shapes.

---

## 10. Before batching thirty of these

The shape is **not one template**. It works for 3.2A because that content is genuinely causal. Force it onto 3.2B — *compare how two communities meet needs* — and it collapses, because a comparison is not a sequence. Expect a small set of teach shapes chosen per standard: **causal-sequence**, **comparison**, and the existing **Science light-review**. Assuming one spine fits everything is the mistake the earlier batch spec made, which is why `Claude outputs/Briefing_Pack_Spec_for_Batch_Generation.md` is marked superseded.

**Recommended proof before committing to volume:** generate three — 3.2A (fits the causal shape), 3.2B (deliberately doesn't, to test shape selection), and one Science review (to confirm the second shape survives alongside the new mechanics). If the audit catches the failures on those three, the rest is volume.

**Where human attention has to go, regardless of how good the audit gets:** whether a causal chain actually holds; whether distractors are real misconceptions or merely plausible wrong answers; the historical claims; and whether the art depicts what the screen needs it to.

**The open art question.** A prototype screen built picture-first ran 26 words against the current version's 65, and the student does more rather than less — finding a problem in a scene is a cognitive act, reading a description of one isn't. The cost is that art stops being decoration: every image needs a written spec of what it must depict, and something has to verify the finished art matches. The middle path is one sentence of prose under the picture — about forty words, still a large cut, and a weak illustration doesn't sink the screen. **Not yet decided.**

---

## 11. Working agreements

- **Emily is a curriculum developer with about ten years of classroom teaching**, no coding background. Explain in plain language; she makes the pedagogical calls and they are usually right. When she says something feels off but can't name it, offering concrete named hypotheses works far better than asking her to specify.
- **Show, don't describe.** Three separate times in this project a written description of a change was accepted and then turned out not to land; a clickable prototype settled each question in minutes.
- **Rejected, do not reintroduce:** confetti / celebration bursts on correct answers ("i dont like the little celebration"). There is a validator that throws if a lesson adds `engagement.celebrationBurst`.
- **Kept:** the progress trail (footprints) and the hidden S.A.M. bonus after Clearance.
- **Git workflow.** The cloud session has no push rights on `emily-clear-k12/clearcenters`. Files are delivered to the connected folder on her Windows machine (`C:\Users\emben\OneDrive\Desktop\clearcenters`) and **she commits and pushes via GitHub Desktop**. Nothing reaches the live Vercel site until she does — a real source of confusion once already, when a change looked "not new" because it hadn't been pushed.
- **Verification available in the sandbox:** `next build` (needs a placeholder `.env.local` — never commit it), the audit, the checker script, and hand-tracing. No browser, no Supabase.

---

## 12. Files

| Path | What |
|---|---|
| `lib/briefings/schema/ssThinkingLesson.schema.js` | v3 shape + quality audit |
| `lib/briefings/schema/index.js` | validation dispatch (`shape: "ssThinking"` routes here) |
| `lib/briefings/SS-3-2A-V3-BR.public.js` / `.server.js` | the v3 lesson |
| `lib/briefings/index.public.js` / `index.server.js` | registries |
| `app/briefing/[assignmentId]/BriefingClient.js` | the player |
| `app/api/briefing/grade/route.js` | grading |
| `add_briefings_ss_3_2a_v3_br_migration.sql` | makes it assignable |
| `scripts/briefings-checker.js` | older TEKS-coverage + readability checker (still useful) |
| `docs/briefings/teks-reference/` | per-standard research cache |
| `docs/briefings/BRIEFINGS-V2-FOUNDATION-PLAN.md` | the v2 foundation pass this builds on |
