# Grade 4 pilot — what four lessons found out about the handoff

**Written Sept 16, 2026. Four Grade 4 lessons, one per type, built from
`ClearCenters-Briefings-Handoff` with nothing else. All four pass all three
checks. This document is about what that does and does not mean.**

---

## 0. What was built

| Lesson | Type | TEKS | Chosen because it breaks | Practice mechanic |
|---|---|---|---|---|
| `SS-4-3A-V3-BR` · *Three Doors Closing* | 1 · cause and effect | 4.3A | A true **chain** — no TEKS-supplied category set | `sequenceIt` |
| `SS-4-6B-V3-BR` · *Fifty-Five Inches and Nine* | 2 · comparison | 4.6B | **Four** regions in a two-place shape | `matchPairs` |
| `SS-4-2E-V3-BR` · *The Year He Waited* | 3 · people | 4.2E | The untested **single-biography** variant | `reasonSort` |
| `SS-4-6A-V3-BR` · *The Wrong Call* | 4 · categories | 4.6A | A category with **no cost** for misfiling | `trueFalseReason` |

These were picked to fail, not to pass. The nearest-neighbour standards (4.2A,
4.12B, 4.3B, 4.13B) would have been near re-skins of the Grade 3 examples and
would have told you almost nothing.

Four of the five practice mechanics now have a lesson using them. Only
`labelPicture` is untried, because it is the one mechanic that cannot fall back
to word chips — it needs art that does not exist.

**All eight files pass `validateSs*Shape`, the matching `audit*Quality`, and
`crossCheckLesson`. So do the four Grade 3 examples, unchanged, after the
checker extension below.**

---

## 1. The finding that matters most

**Three of the four Grade 3 worked examples are set in invented places.** Maple
Crossing, Cloudreach, Kettle Bend, Orrin, Halloway, Ridgeway, Cedar Landing,
Ada Pike — all fiction. Only 3.1B is about real people.

Fiction can be bent to satisfy any constraint the shape imposes:

- Word budget trips → cut a sentence nobody will miss.
- `crossCheckLesson` says two reasons have two proofs each in the transfer
  town → delete a building.
- A clue gives away its bin → rename the thing it describes.
- The transfer needs exactly one reason with exactly two pieces of evidence and
  every other reason with exactly one → build the town that way.

**Grade 4 is almost entirely real Texas history and real Texas land, and none of
those moves are available.** You cannot add a fifth piece of evidence to Goliad.
You cannot move the Caprock. When the shape wanted an artifact and the record
did not supply one, something had to give — see §6.

This is the structural reason a clean Grade 3 run does not predict a clean
Grade 4 run, and nothing in the handoff says it. It is worth adding to the
README, because a session that reads only the worked examples will
systematically underestimate what Grades 4 and 5 cost.

---

## 2. What actually failed on the first run

Nine failures across four lessons, before any fixing:

| Check | Fired | On |
|---|---|---|
| Word budget (110/screen) | **5×** | `opsChoice` ×2, `transfer` ×2, `theDecision`, `matchPairs` |
| Length parity (correct is longest) | **4×** | clearance items |
| No-giveaway (`reasonSort`/`matchPairs`) | 0 | — |
| Shape validator | 0 | — |
| `crossCheckLesson` | 0 | — |

**The structural half of the pipeline is solid.** Eight files, several hundred
cross-referenced ids, zero mismatches. The cross-check is doing its job, and the
shapes are well enough documented to build against from cold.

**The writing half is where Grade 4 bites, and it bites in exactly one place:
the word budget.** Grade 4 content carries proper nouns, dates and place names
that invented towns do not — "the Law of April 6, 1830" is six words before you
have said anything. Every one of the five budget failures was 6–30 words over,
and every fix was trimming real content. That is survivable at four lessons. At
131 it is a tax on every single phase, and it will quietly push writers toward
vaguer history, because vague history is shorter.

**Recommendation:** consider raising the budget to 125 for Grades 4 and 5 and
leaving Grade 3 at 110. `auditThinkingQuality` already accepts
`opts.wordBudget`; `run-checks.mjs` just never passes one. That is a two-line
change and it should be a deliberate decision rather than a default nobody
chose. (I did **not** make this change — all four lessons pass at 110.)

---

## 3. Type 1's third flavour, and a cost nobody has counted

The handoff names two flavours of Type 1 — **chain** and **hub**. There is a
third split it does not name, and it is the one that actually matters:

- **Reasons flavour.** The standard hands you a closed category set. 3.2A gives
  you security / religious freedom / material well-being, and that one set feeds
  `storyTeach.reasons`, `openingFrame.predictOptions`, the practice bins and
  `transfer.claimOptions`. Four phases and the cross-check all lean on
  something the TEKS supplied for free. **The Type 1 worked example is this
  flavour.**
- **Chain flavour.** 4.3A, 5.2A, 5.4A–D, 4.3E. There is no set. Four phases and
  the cross-check still demand one.

`SS-4-3A-V3-BR` invents one — three **kinds of cause**: a promise got changed /
nobody would listen / soldiers settled it. It works, and the transfer to the
American colonies works *because* the categories are one level of abstraction
above the events. But those three categories are ours. Nothing in 4.3A names
them.

**The cost:** roughly 29 true chain standards, each needing its own authored and
approved taxonomy, before a single lesson can be generated. That is the largest
hidden cost in the assignment table and it is not in the 135 count.

**Recommendation:** author the taxonomies as a separate, reviewable pass — one
page listing each chain standard and its three kinds of cause — before any
volume run. They are the kind of thing that should be agreed once and reused,
not invented 29 times by a generator working alone.

---

## 4. Type 4: the fix works, and it is free

Type 4's engine is "putting a thing in the wrong box **breaks** something." That
works for 3.7C, branches of government, levels of government, the Bill of
Rights. It has nothing to run on for roughly **20 of the 35 Type 4 rows** —
physical regions, patriotic symbols, customs and celebrations, art periods,
leadership qualities, colonial industries, settlement patterns. Nobody misroutes
a painting to the wrong century and waits four months for it to be forwarded.

`SS-4-6A-V3-BR` proposes and proves a second variant, exactly as you already did
for hub-vs-chain:

> **WRONG DESK** — a request goes to the body that cannot act on it. The cost is
> delay.
> **WRONG CALL** — somebody makes a plan using the wrong category and the plan
> fails. The cost is the failure.

A rice plan copied from the Gulf coast to Amarillo. A courier timing the far
west with a ruler. A family told the country past Fort Worth is open prairie,
walking into the Cross Timbers.

**The good news is better than I expected: this needs no schema change at all.**
Every field `ssCategoryLesson.schema.js` requires is still doing honest work —
`routeOptions` becomes "which category was this really?", `whatWentWrong`
becomes what the failed plan cost, and the graded step still names the **rule**.
The file validates, audits and cross-checks clean against the existing contract
with nothing modified.

**What does need changing is one section of documentation.**
`BRIEFINGS-LESSON-TYPES-DRAFT` §6 describes only the desk. A generator handed
that section and told to build 4.6A will either invent a fake routing story or
quietly produce a sort — which is the failure the whole v3 rebuild exists to
stop.

---

## 5. Type 3: "single-biography" is really a hybrid

§5 of the types document settles that grouped and biography are the same shape,
and suggests a Grade 4 lesson on Austin would spend three rounds on three
decisions in one life. **It does not survive contact with the standard.** 4.2E
names *two* people, so a pure Austin lesson fails its own coverage.

What works is a hybrid: two rounds in one life, one round in another.
`SS-4-2E-V3-BR` is Austin 1821–23, Austin 1824, De León 1824.

Scanning the Type 3 rows, this is the rule rather than the exception — 4.3B
names nine people, 5.1B five, 5.22A eight. Standards naming exactly one person
are rare. The shape holds; the guidance needs one sentence added, because a
generator told "use the single-biography variant" will produce a lesson that
misses half its standard.

---

## 6. Where the shape bent real evidence — twice

Both are flagged in the file headers. Both generalise.

**The transfer invariant vs. the historical record.** `crossCheckLesson`
requires every claim option to have at least one proof and exactly one to have
two. Sterling C. Robertson's documented life supplies two proofs for "won the
permission", one for "chose the settlers", and **none** for "set how it ran". To
satisfy the invariant, the box contains a land register — true of how empresario
colonies worked in general, not sourced to Robertson's papers. That is the
invariant reaching into the evidence, and at 131 lessons it will happen
constantly and mostly unflagged.

**The transfer frame vs. region standards.** 3.7C's transfer works because one
town genuinely contains local, state and national government. **A place is in
exactly one region** and cannot carry proof of three. `SS-4-6A-V3-BR` solves it
with a truck driver's cab after a week crossing the state — which is legitimate,
and is not a trick a generator will find on its own. Every region, settlement-
pattern and cultural-region standard will hit this.

**Third, smaller:** `opsChoice` is locked by the cross-check to exactly three
projects, pick two, one deferred — and it is word-for-word the same shape in all
eight lessons now. For history it also requires an invented constraint: the
Consultation of 1835 really did all three things it is asked to choose two of,
and the file says so. A student doing ten briefings meets that identical screen
ten times.

---

## 7. Two things in the pipeline that are simply missing

**No source of exact TEKS wording.** Every `teksText` in the four Grade 3
examples is hand-typed. The handoff contains no standard text, and the project's
`TEKS_Quick_Reference_Grades_3-5.md` is explicit that it compresses each
standard to one line and that you must open the source PDF before locking a
label — which is the standing rule that exists *because* a Mission Map case once
shipped against no real standard at all. All four Grade 4 files therefore carry
a faithful paraphrase marked `[PARAPHRASE — replace with exact 2022 TEKS
wording before shipping]`. **This is a hard blocker for a volume run** and the
fix is cheap: one file of real standard text, extracted once from the PDFs.

**No research cache for Social Studies.** Verifying this set took eight source
lookups for four lessons — the Law of April 6, 1830; Austin's imprisonment and
release dates; De León's contract, colony and what happened to his family;
Robertson's contracts; the Consultation's 33–14 vote; Palo Duro and the Caprock;
the Cross Timbers; and the 1991–2020 rainfall normals. Every claim is cited in
the file headers. At 131 lessons that is several hundred claims against a
subject with no misconception bank and no `teksguide.org` coverage. It is the
largest *recurring* cost in the whole plan and it is currently budgeted as "a
human read."

---

## 8. The checker: what I changed, and what I found but did not change

### Shipped — the no-giveaway rule now runs on two more mechanics

`lib/briefings/schema/ssThinkingLesson.schema.js`, which the handoff flags as
**"fix before any volume run."** Delivered with this set, and the four Grade 3
examples still pass unchanged.

- **`matchPairs`** — flags a left item that shares a content word with its own
  keyed right item. This is the failure mode that shipped in the old 3.2B.
  Deliberately strict: one shared word is enough, because with five pairs on
  screen one shared word usually resolves the grid by elimination. Same limit as
  before — "Education" paired with "school" shares no word and still walks
  through.
- **`labelPicture`** — and here the honest answer is that **the text cannot
  leak**. A hotspot is `{id, x, y}` with no words on it. If this mechanic hands
  over its answer it does so *in the picture*, which no string check will ever
  see. So the check reads the one piece of the picture that exists as text: the
  **art spec**. A `wordBank` label whose words already appear in `imageAlt` is an
  instruction to draw the answer into the scene. Catching that before the art is
  commissioned is cheap; catching it after is not. It also flags a
  `labelPicture` with no `imageKey`, since unlike `transfer` this phase cannot
  degrade to word chips.

Both were positively tested — they fire on a leaky pack and stay silent on a
clean one.

### Found, not changed — the length-parity rule is stated universally, enforced narrowly

§9 says flatly: *"The correct option is never the longest one."* The audit
enforces it on `clearance` items only. I measured what extending it everywhere
would do:

| | would-be failures |
|---|---|
| The four Grade 3 worked examples | **15** |
| The four Grade 4 drafts | **24** |

So extending it naively fails every lesson in the library, including all four
that currently pass clean. That is not a reason to ignore it — it is a reason to
scope it properly. The distinction that matters is **what the student is doing
when they read the options**:

- On the **commit step** — `storyTeach.beats[].choices`,
  `sideBySide.rounds[].predictOptions`, `wrongDesk.rounds[].routeOptions` — the
  entire point is that the student commits by reasoning before being told. If
  the best option is reliably the longest, they can find it without reading, and
  the commitment is theatre. **Under a rule scoped to just these, the library
  has 8 hits total** (3.2A ×2, 4.3A ×2, 4.6B ×3, 4.6A ×1; 3.2B, 3.1B, 3.7C and
  4.2E are clean). That is a morning's work and it catches something real.
- On **two-option `stretch` questions** and the feedback-rich `causes`,
  `boundaries` and `attributions`, the correct answer is longer because it is
  the substantive one, feedback is immediate and retries are unlimited. Enforcing
  parity there would make the writing worse.

**Recommendation:** extend to the commit step, leave the teaching steps alone,
and say so in §9 so the rule stops reading as universal.

### Found, not changed — `imageAlt` counts against the student word budget

`transfer.imageAlt` is an accessibility string that no sighted student reads,
and it is counted in the 110-word screen budget. Both `transfer` budget failures
in this set were partly caused by writing a *good* art spec. The incentive is
backwards: the better you describe the picture an illustrator has to draw, the
more likely the phase trips. Three of the four Grade 4 files now carry a
deliberately thin `imageAlt` with the real spec moved into the file header,
which is worse for the illustrator and worse for a screen-reader user.

**Fix:** add `imageAlt` to `SKIP_KEYS` in `auditThinkingQuality`. One word.

---

## 9. What I would decide before any volume run

In rough order of how much they cost if left open:

1. **Get exact TEKS text into the pipeline.** One file. Blocks everything.
2. **Author the ~29 chain taxonomies** as a reviewable pass, not per-lesson.
3. **Document the Wrong Call variant** in the types draft — no code, ~20 of 35
   Type 4 standards depend on it.
4. **Decide the Grade 4/5 word budget** — 110 or 125 — deliberately.
5. **Scope the length-parity rule** to the commit step and fix the 8 hits.
6. **Add `imageAlt` to `SKIP_KEYS`** and restore the real art specs.
7. **Settle 135 vs bundling.** 4.6A and 4.6B, built back to back, are the
   clearest bundling candidate I have seen — same four regions, two lessons,
   and the Type 2 one can only teach two of the four regions properly anyway.
8. **Vary `opsChoice`,** or accept that ten briefings share one identical screen.

And the standing one: **a clean run means well-formed, not good.** These four
need the same human read the Grade 3 four did — the causal chain in 4.3A, the
distractors everywhere, the flagged content calls in 4.2E, and whether an
invented incident inside a history lesson is acceptable at all (§6, 4.6A's
rounds 1 and 2). Each file names its own uncertainties under a clear heading.
