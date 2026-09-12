# My Briefings — Content Pack Spec (for batch generation)

This describes the exact shape of a "Briefing" — the mini-lesson-before-the-Challenge format live at `/briefing/[assignmentId]` — so a bot can generate new ones for other standards (grade 3/4/5, Science and Social Studies) without a developer touching app code. Two Briefings exist today as reference examples: `SS-3-2A-BR` (Why Communities Form) and `SS-3-2B-BR` (How Communities Meet Needs).

## What a Briefing is for

Social studies (and often science) frequently gets zero whole-group instruction time in elementary. A Briefing is meant to **be the lesson**, not just review one — a kid who has never heard this content before should be able to open it cold in a center and come out having actually been taught the standard, before they're ever handed a Challenge on it. That changes what "good enough" means: every vocabulary term / category the standard names has to get real instruction and real practice, not just a mention.

**The one rule that matters most, learned the hard way:** if the standard names N categories (reasons, needs, forces, cycles, whatever), the pack needs N worked explanations AND N practice slots in Reason Sort — never "teach 5, practice 3." A term that only appears in a one-line definition and is never sorted, matched, or worked through again is a term the kid hasn't actually practiced, no matter how good the definition sentence is. (This happened in `SS-3-2B-BR` — 5 needs were taught but only 3 got Reason Sort practice — and had to be patched after the fact.)

## The six phases (always this order, always all six)

1. **Intel Drop** — cold-open guess. Kid picks a chip guess before any teaching happens (pure engagement hook), then gets an immediate reveal that states the real learning target in plain language.
2. **Field Brief** — the actual direct instruction. One explanation + one concrete example + one quick-check question **per category** the standard names.
3. **Reason Sort** — drag-to-bin practice. One bin per category, 2 new example clues per bin (not the same examples used in Field Brief — force transfer to new scenarios).
4. **Ops Choice** — an applied decision task. Student picks exactly 2 of the real categories to prioritize (plus 1 obvious non-example/distractor card), then justifies the pick and names which real category is left waiting.
5. **Evidence Drop** — a "postcard": pick a scene, pick the matching reason, pick matching evidence text. Reinforces the reason↔evidence link one more time before the summative check.
6. **Clearance** — 4-question summative check (list-all-categories multiple choice, apply-to-new-example, true/false misconception check, and one dynamic question that reuses whatever the student picked in Ops Choice/Evidence Drop).

## File deliverables per standard

For a new standard, e.g. `SCI-4-6B-BR`, generate exactly these two files:

- `lib/briefings/SCI-4-6B-BR.public.js` — everything the student sees. **No correct answers live here, ever.**
- `lib/briefings/SCI-4-6B-BR.server.js` — answer keys and grading rubrics only. Never imported by any client-facing file.

Then two small registration edits (not content generation, just wiring — a human/script step, not the bot's job to invent structure for):

- Add one import + one registry line to `lib/briefings/index.public.js`
- Add one import + one registry line to `lib/briefings/index.server.js`

And one SQL insert (metadata only — title/tagline/subject/grade/teks/minutes — no lesson content) into the `briefings` table, same shape as `add_briefings_ss_3_2b_br_migration.sql`, so it shows up in the teacher's assign screen.

## Naming conventions

- Briefing id: `SS-{grade}-{TEKS}-BR` for social studies, `SCI-{grade}-{TEKS}-BR` for science. Example: `SCI-4-6B-BR`.
- File names match the id exactly: `SCI-4-6B-BR.public.js` / `SCI-4-6B-BR.server.js`.
- Every item/bin/project/choice id inside a pack is `snake_case`, short, and content-descriptive (`fire_safety`, `walk_school`, `wagon_road`) — never `item1`/`item2`. These ids are the join key between the public pack and the server answer key, so they must match exactly between the two files.
- Art paths: `/briefings/{id-lowercase}/NN-description.png`, numbered in the order they appear (01-intel, 02/03/04-beat art per category, 05-ops scene). Images themselves are generated separately, batched at the end — the bot only needs to invent the path strings, not the images.

## PUBLIC_BRIEFING schema (student-facing, `.public.js`)

```js
export const PUBLIC_BRIEFING = {
  id: "SCI-4-6B-BR",
  title: "...",                    // short kid-facing title
  tagline: "...",                  // one sentence, sets the scenario
  subject: "science" | "social_studies",
  subjectLabel: "Science" | "Social Studies",
  grade: 3 | 4 | 5,
  teks: "6B",                      // bare TEKS code, no grade prefix
  teksText: "...",                 // the actual standard language, full sentence
  minutes: 30,                     // estimated completion time
  engine: "briefing",
  relatedChallengeIds: [],         // always empty — Briefings never auto-unlock Challenges
  objective: "I can ...",          // kid-voice "I can" statement
  successCriteria: "...",          // names every category by name + what counts as done

  art: { intel: "...", beatX: "...", beatY: "...", ops: "..." }, // one key per category + intel + ops

  phases: ["intelDrop", "fieldBrief", "reasonSort", "opsChoice", "evidenceDrop", "clearance"], // always all 6, always this order

  samLines: { intelDrop: "...", fieldBrief: "...", reasonSort: "...", opsChoice: "...", evidenceDrop: "...", clearance: "...", cleared: "..." },
  samTips:  { intelDrop: "...", fieldBrief: "...", reasonSort: "...", opsChoice: "...", evidenceDrop: "...", clearance: "..." },
  // samLines = what the guide says on arrival at a phase. samTips = the short nudge shown on tap. Keep both under ~15 words, plain kid language, no jargon.

  intelDrop: {
    title: "...",
    kidPrompt: "...",
    kidParagraph: "...",           // 2-3 sentences, sets up the guess, never gives away the answer
    samOpener: "...",              // usually same as samLines.intelDrop
    claimFrame: "I think __________.",   // fill-in-the-blank frame the chosen chip drops into
    claimChips: [ /* 5-6 short chip strings, one is closest to the real answer, others are plausible-but-wrong guesses a kid this age would actually make */ ],
    claimMode: "chipsOnly",
    reveal: "...",                 // states what today is REALLY about, in bold-markdown-able plain language
    learningTarget: "...",         // names every category by bolded name — this is the one sentence a kid could screenshot and know the whole target
  },

  fieldBrief: {
    vocab: [ { term: "...", meaning: "...", icon: "emoji", color: "#hex" }, /* one entry per key vocab word, including the umbrella term */ ],
    beats: [
      // ONE BEAT PER CATEGORY THE STANDARD NAMES. Do not shortcut this into fewer beats than categories.
      {
        id: "beat1",
        title: "...",             // the category name as a kid-friendly heading
        body: "...",              // 2-4 sentences of real explanation, bolded key term, grade-appropriate reading level
        example: "...",           // ONE concrete, visual, single-sentence example a kid can picture
        imageKey: "beatX",        // matches an art key
        qcId: "qc1",              // matches a quickChecks entry below
        teacherNote: "..."        // optional — only for sensitive topics needing a content guardrail (religion, etc.)
      },
      // ...repeat once per category
    ],
    quickChecks: [
      // one per beat, same order, each with a prompt that reuses the beat's own example (not a new one) and 3 short choices
      { id: "qc1", prompt: "...", choices: [{id:"a",text:"..."},{id:"b",text:"..."},{id:"c",text:"..."}] },
    ],
    trapLine: "...",              // optional — states + corrects the most common misconception for this standard, feeds Clearance's true/false question
    requireQcBeforeNext: true,
  },

  reasonSort: {
    title: "...",
    kidPrompt: "Sort each example under the ... that fits best.",
    helpWrong: "...",             // shown on an incorrect placement
    helpPass: "...",              // shown once fully correct
    bins: [
      // ONE BIN PER CATEGORY — same count as fieldBrief.beats, always. This is the step that got shortcut before; don't shortcut it again.
      { id: "category_id", label: "Category Name", emoji: "...", color: "#hex" },
    ],
    items: [
      // EXACTLY 2 PER BIN: one obvious clue, one "stretch" clue that doesn't contain the category's own keyword (forces real transfer, not word-matching)
      { id: "snake_case_id", text: "6-12 word concrete scene, grounded in the same setting/characters used elsewhere in the pack" },
    ],
  },

  opsChoice: {
    title: "...",                 // a named "council/signal/vote" scenario, consistent with the pack's running narrative
    pickHeader: "Pick exactly 2 ... this year",
    constraint: "...",            // states the limit + that one card is fake/not-a-real-category
    scenario: "...",              // optional longer framing paragraph
    projects: [
      // one entry per real category (3-5) PLUS exactly one distractor. Distractor is clearly off-topic (fun/vanity), never a plausible 4th category.
      { id: "...", label: "...", reason: "Display Name", shortReasonLabel: "2-3 word chip version", reasonId: "category_id", sceneId: "...", emoji: "...", teks: true, improves: "..." },
      { id: "distractor_id", label: "...", reason: "...", reasonId: null, sceneId: null, emoji: "...", teks: false, distractor: true, improves: null },
    ],
    pickCount: 2,
    justificationChips: [ /* one plain-language justification per real category, plus a "we'll do the rest later" chip */ ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [ { id: "category_id", label: "We're waiting on ..." } /* one per real category */ ],
    deferredPrompt: "Name the real ... that waits until next year:",
    fundMeterLabel: "...", waitingLabel: "Waiting until next year",
    consequenceTitle: "...", boardTitle: "THIS YEAR / NEXT YEAR", boardThisYearLabel: "THIS YEAR", boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW", nextSlotLabel: "WAITING",
    debriefSamLine: "...",
    distractorFailMessage: "...",  // shown if the distractor gets picked — names why it doesn't count
    debrief: "...",
  },

  evidenceDrop: {
    title: "...",
    frontHint: "Pick a scene that clearly shows **one** ... .",
    frontScenes: [ /* one per real category, reusing imageKeys from `art` */ { id: "...", label: "...", reason: "category_id", imageKey: "beatX", sticker: "emoji" } ],
    carryForwardOps: true,
    carryForwardPrompt: "You funded/compared {X} & {Y} — pick one to show on your postcard",
    backFrame: "...",              // fill-in-the-blank sentence frame for the postcard back — MUST match how many blanks this standard's comparison actually needs (one category+evidence, or category+two-way-compare — see note below)
    reasonOptions: [ /* category ids, real categories only */ ],
    evidenceChips: [ /* short evidence phrases, one per real category, reused from Reason Sort/Ops Choice items where possible */ ],
    transmitLabel: "Transmit postcard to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "...",
    progressGates: [ {id:"claim",label:"Claim locked"}, {id:"field",label:"..."}, {id:"sort",label:"..."}, {id:"postcard",label:"..."} ],
    items: [
      { id: "c1", type: "multi", prompt: "What ... does TEKS ... name?", choices: [/* one correct option listing ALL real categories by name, 3 wrong options */] },
      { id: "c2", type: "single", prompt: "...", choices: [...], reuseFrom: "intel" },
      { id: "c3", type: "tf", prompt: "True/False: ...", choices: [{id:"true",text:"True"},{id:"false",text:"False"}] },
      { id: "c4", type: "single", prompt: "...", dynamicReuse: true, choices: [...] },
    ],
    selfCheck: [], selfCheckRequired: 0,
    requireProgressGates: true, requireAllAnswers: true,
    clearedMessage: "Briefing cleared: {Title}. Ask your teacher when you're ready for a Challenge.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
    postcardReceivedLabel: "...",
    // only needed if c4 or c2 dynamically reuse student choices:
    dynamicDeferredPrompt: "...", dynamicFallbackPrompt: "...", reasonIdToChoice: { category_id: "a" }, evidenceToReasonChoice: { "evidence phrase": "a" },
  },
};
```

**Important note on Evidence Drop's `backFrame`:** match the number of blanks to what the standard actually asks the kid to show. A "name the reason + give one piece of evidence" standard needs 2 blanks. A "compare how two things each meet the same need differently" standard needs 3 blanks (the shared category, then how each side does it). Whichever it is, `evidenceDrop`'s generated transmit sentence must actually fill in that same frame — don't reuse one pack's 2-blank sentence logic for another pack's 3-blank frame. (This was the other bug found in `SS-3-2B-BR` — worth a generation-time sanity check: does the transmit sentence text match `backFrame`'s blank count?)

## SERVER_BRIEFING schema (answer keys, `.server.js`)

```js
export const SERVER_BRIEFING = {
  id: "SCI-4-6B-BR",
  title: "...",

  intelDrop: {
    minMeaningfulWords: 1, acceptChipOnly: true,
    passKeywords: [ /* every keyword across every chip + every category name, lowercase */ ],
    chipKeywords: { "chip text": ["keyword", "keyword"], /* one entry per claimChip */ },
  },

  fieldBrief: { quickChecks: { qc1: "a", qc2: "b", /* correct choice id per quick check, same ids as public pack */ } },

  reasonSort: {
    answers: { item_id: "category_id", /* every single item id from the public pack's reasonSort.items, mapped to its correct bin id — counts must match exactly */ },
  },

  opsChoice: {
    requirePickCount: 2,
    teksProjectIds: [ /* the real category project ids, not the distractor */ ],
    distractorIds: [ "distractor_id" ],
    projectReasonIds: { project_id: "category_id" },
    requireDeferredReason: true, chipsOnlyOk: true,
    justificationKeywords: [ /* words that would appear in a valid free-text justification, if ever unlocked */ ],
  },

  evidenceDrop: {
    mustInclude: [ "Names one category accurately", "...", "Evidence matches that category" ],
    reasonMatch: { category_id: [ "keyword", "keyword" ] },
    scoreGuide: { 2: "...", 1: "...", 0: "..." },
  },

  clearance: {
    answers: { c1: "a", c2: "a", c3: "false", c4: null },
    c4AcceptAnyReason: true,
    evidenceToReasonId: { "evidence phrase": "a" },
    reasonIdToChoice: { category_id: "a" },
  },
};
```

**Hard rule:** `reasonSort.answers` in the server file must have exactly one entry per item in the public file's `reasonSort.items` — same count, same ids. This is the single easiest place for a generated pack to silently drop a category's practice reps, so it's worth a scripted check after generation: item count in public.js === answer count in server.js === bins.length × 2.

## Voice and content guardrails

- Grade-3-6 reading level, short sentences, bold the vocabulary term the first time it's defined.
- Every Reason Sort item is a **concrete scene** (something happening, 6-12 words), never an abstract restatement of the definition.
- Per category, the 2 sort items should be "one obvious, one stretch" — the stretch item should NOT contain the category's own keyword, so a kid has to reason about it rather than pattern-match a word.
- Keep a consistent running narrative/setting across all six phases of one pack (a town, a mission, two comparison sites) — it's what makes Ops Choice and Evidence Drop feel connected instead of like a new quiz each screen.
- Ops Choice's distractor should be obviously off-topic (vanity/fun), never a plausible near-miss category — its job is testing "can you spot what's NOT a real answer," not adding a trick question.
- The `trapLine` / true-false Clearance question should target the single most common kid misconception for that standard (e.g., "material well-being just means toys" → false).

## Registration checklist (after the bot generates the two files)

1. Add the pack to `lib/briefings/index.public.js` (import + registry line).
2. Add the pack to `lib/briefings/index.server.js` (import + registry line).
3. Write the metadata-only SQL insert into the `briefings` table (id/title/tagline/subject/grade/teks/minutes/related_challenge_ids/engine/published) — same shape as the existing `add_briefings_*_migration.sql` files.
4. Generate/commission the art for each `art` key once a batch of standards is ready (batched at the end, per usual).
5. Sanity-check: item count in `reasonSort.items` === entry count in server `reasonSort.answers` === `bins.length * 2`, and every category named in `fieldBrief.beats`/`learningTarget` also appears in `reasonSort.bins`. No category gets taught without also getting sorted.
