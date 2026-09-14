# ClearCenters Briefings — The Four Lesson Types

**Written Sept 14, 2026. All four types are now built, with one Grade 3 baseline lesson
each — 3.2A, 3.2B, 3.1B and 3.7C. None are wired into the player yet.**

This is the map of what kinds of briefing lessons exist, decided before building
thirty of them rather than discovered one at a time. It is the document the earlier
batch spec should have been — that one assumed a single lesson shape fit every
standard, which is why it's marked superseded.

Read alongside `BRIEFINGS-V3-MASTER-BRIEF.md`, which explains why the v3 shape looks
the way it does. This document doesn't repeat that reasoning; it extends it to the
other three types.

---

## 1. How the standards actually sort

All Grade 3, 4 and 5 Social Studies TEKS, sorted by what kind of thinking the
standard asks for — not by topic, not by grade.

| Type of thinking | Roughly how many | Example standards |
|---|---|---|
| **Cause and effect** | ~45 | 3.2A why communities form · 4.3A causes and effects of the Texas Revolution · 5.4D how expanding slavery caused the Civil War |
| **Categories** | ~25 | 3.7C which level of government provides which service · 5.7A rural/urban/suburban · 5.19A which right the Bill of Rights covers |
| **People and what they did** | ~23 | 4.2E empresarios' motivations and impact · 5.2B Founding Fathers' motivations · 3.1B individuals who shaped communities |
| **Comparing two things** | ~15 | 3.2B how two communities meet needs · 4.6B comparing Texas's four regions · 5.13A colonial systems of government |
| *Map skills and recitation* | ~12 | *3.4B map scale · 4.14C the Pledge — **not briefing material**, exclude from the count* |

Counts are approximate — a few standards sit on a line between two types, and those
get assigned when the lesson is scoped, not now.

**One thing worth knowing:** the TEKS name these thinking moves themselves. Standard
3.14C (and its twins 4.19C and 5.23C) lists them out — *sequencing, categorizing,
cause and effect, compare and contrast*. Our four types match those words on purpose.
It means every briefing can cite a content standard **and** a thinking standard, the
way SS-3-2A-V3-BR already quietly does. That makes the types defensible to a district
instead of being our private filing system.

---

## 2. What all four types share

This matters more than the differences. **Four of the seven phases are the same in
every type.** Only the teach and the synthesis change.

| Phase | Same in all four? | What it does |
|---|---|---|
| 1 · opening frame | **Same** | Builds the concept from a decision, then takes a prediction that isn't settled for ten minutes |
| 2 · **the teach** | **Differs** | This is where the four types actually diverge |
| 3 · **synthesis** | **Differs** | Always asks for a demand the teach didn't — and always includes a "take one away" move |
| 4 · practice mechanic | Same | Any mechanic from the existing menu |
| 5 · ops choice | **Same** | A decision with three people who each want something different and are all right |
| 6 · transfer | **Same** | A case they've never seen, where the answer has to be proved twice |
| 7 · clearance | **Same** | Five questions — four marked, the fifth read by the teacher |

Practical consequence: **building type 2 is much less work than type 1 was.** The
player already renders the opening frame, ops choice, transfer and clearance. Each new
type needs two new phase components, two grading branches, and its own safety checks.

### The one structure every type shares — read this before building any lesson

All four teaches do the same thing in the same order, and it is not obvious from the
phase names:

> **Show a situation → make the student commit before they are told → reveal what
> actually happened → make the student NAME the idea themselves.**

That final naming step is the graded one in every type, and it is what writes the
ledger line. It is also the single thing that separates these lessons from the ones
they replaced, where the label was handed to the student and they were asked to
recognise it afterwards.

What gets named is the only thing that changes between types:

| Type | The student names… |
|---|---|
| 1 · Cause and effect | the **reason** the town did what it did |
| 2 · Comparison | the **cause** of the difference between two places |
| 3 · People | the **kind of contribution** the person made |
| 4 · Categories | the **rule** that decides which category it is |

Note what type 4 does *not* name: the category. Naming the category would be the sort
again with extra steps. Every one of these four is a level of abstraction ABOVE the
thing on screen — which is why the student can carry it to a case they've never seen,
and why the transfer phase works at all.

The rules from the v3 brief apply to all four without exception — no typing anywhere,
no distractor is a joke, some steps go to the teacher unmarked, the teach must build,
and no clue contains its own answer.

---

## 3. Type 1 — Cause and Effect

**Status: built and proven.** `SS-3-2A-V3-BR` runs on it, passes the audit clean.

**Thinking move:** sequencing and cause and effect.

**Use it when** the standard asks why something happened, what caused it, what
followed from it, or why people did something.

**The teach:** one place, three beats. Each beat's problem is *caused by the previous
beat's solution*. The student decides what to do before being told what happened, and
then **names the reason themselves** — that naming is what writes the ledger line.
Handing them the label is what made the old version feel like three facts in a row.

**The synthesis:** put the beats back in order → say what caused what → remove one
piece and reason about what breaks.

**Its safety checks:** every beat needs a bridge to the next one (no bridge means the
beats are shufflable, which is the original failure); the wrong answers on the cause
questions come from the wrong end of the timeline, because reaching for something that
hadn't happened yet is the characteristic mistake at this age.

**Where it doesn't fit — and this needs a decision.** There are really two flavors of
cause-and-effect standard:

- **Chain** — A caused B caused C. *The road to the Civil War. The Texas Revolution.*
  The current shape handles these directly.
- **Hub** — one thing changed many things at once. *"Explain how the railroad affected
  life in Texas" (4.4C). "Effects on American Indian life caused by the Red River War,
  forts, railroads, and loss of the buffalo" (4.4D).*

A hub isn't a chain, and the teach engine ("each problem caused by the last") has
nothing to run on. **My recommendation: treat hub as a variant of Type 1, not a fifth
type** — the other six phases are unchanged, only the way beats link together differs.
But it's a real difference and it should be decided deliberately rather than discovered
halfway through a build.

---

## 4. Type 2 — Comparison

**Status: BUILT.** `SS-3-2B-V3-BR` ("Two Towns, Five Needs") runs on it and passes
the shape check, the quality audit and the cross-check clean. Shape contract:
`lib/briefings/schema/ssComparisonLesson.schema.js`.

**Thinking move:** compare and contrast.

**Use it when** the standard says compare.

**The design problem:** a comparison has no sequence, so Type 1's engine has nothing to
run on. And the obvious version — a two-column chart of same and different — is the
old sorting trap wearing a new costume. Noticing that two things differ is not
thinking. Explaining *why* they differ is.

**The teach — one at a time, never side by side.** The student meets Place A properly.
Then, before meeting Place B, they **predict** what B will do about the same problem.
Then they meet B and find out. The prediction is the thinking, and it's only possible
because the places were introduced in sequence — you cannot predict a column in a
chart. Each round ends with the student naming *why* the difference exists, usually
from a short list the standard itself supplies (geography, resources, history).

**The synthesis:** sort features into *both* / *only A* / *only B* — then the move that
matters: **"change one thing about Place A. Which of these differences disappears?"**
That counterfactual is what separates a student who knows the differences from one who
knows what causes them.

**Its safety checks:** no feature can be sortable from its wording alone (the existing
no-giveaway rule); **at least one feature must genuinely be "both"** — if every item
splits cleanly, students learn the answer is always "different" and stop reading; and
at least one difference must be explainable by a cause the lesson actually taught.

**What building it actually taught us**, beyond the plan above:

- **Hiding the second place is doing real work.** In the player the away town is
  covered until the student commits to a guess, so nobody can read ahead to the
  answer. The prediction only carries a thought if the answer isn't already on
  screen. Any comparison lesson has to withhold the second case this way.
- **The wrong guesses are the lesson.** Each distractor's feedback teaches something
  the reveal alone wouldn't ("two thousand people in one room — the meeting would
  still be going at Christmas"). A student who guesses wrong should come away with
  more than one who guesses right first time.
- **One difference, one cause, and the causes must differ across rounds.** 3.2B's
  three are how many people, what the land does, and what was already there. A
  student who taps the same cause every round gets two wrong. Enforced in the audit.
- **The "both" column carries the standard.** Three of the seven sort items belong to
  both towns. If everything splits cleanly the lesson teaches that the two places
  share nothing, which is the opposite of what the standard says.

**Why this one was the sharpest test of the whole plan:** if it had ended up feeling
like 3.2A with new words, the theory that different standards need different shapes
would have been wrong. It doesn't. The four-type plan survives its first real test.

---

## 5. Type 3 — People and Decisions

**Status: BUILT.** `SS-3-1B-V3-BR` ("Three Ways to Build a Town" — L'Enfant,
Banneker, Franklin) runs on it and passes all three checks clean. Shape contract:
`lib/briefings/schema/ssPeopleLesson.schema.js`. It was the type flagged as least
certain, and it survived.

**Thinking move:** point of view, and drawing conclusions from evidence.

**Use it when** the standard asks students to identify individuals and explain their
motivations, contributions, or impact.

**The design problem:** on its face this is recall. "Who was Stephen F. Austin" has no
thinking in it, and twenty-three standards of that is a trivia deck. This is the
cluster most likely to quietly become the thing we tore down.

**The fix — don't ask who, ask what you would have done.** Every one of these people
faced a decision, under a real constraint, with people around them wanting different
things, and with consequences we know. That is exactly the ops-choice mechanic, which
already exists and already works — promoted from one phase into the spine of the
lesson.

**The teach:** the student is put in the person's position **before** being told what
that person did. Three or four options, all defensible, each with a real consequence.
They choose, they defend it with chips, and *then* they learn what actually happened
and what followed. The gap between their choice and the real one is the lesson.

Then the step that carries the standard: **"was it the right call?"** — with evidence
on both sides. Not marked. Goes to the teacher.

**The synthesis:** work backward from the outcome. Rank this person's three
contributions by which mattered most, and defend the ranking. Significance is a real
historical-thinking skill and it has no single right answer, which is the point.

**Its safety checks:** every option needs a real consequence, never a joke; **the
person's actual choice must not always be the best-sounding option**, or students learn
to pick the noble one without reading; and at least one wrong option should be
something a real contemporary actually did.

**What building it actually taught us:**

- **Grouped and biography are the same shape.** This was an open question — whether
  "here are three inventors" and "here is one person's big decision" needed two
  different types. They don't. A round is a round: 3.1B spends one round on each of
  three people, and a Grade 4 lesson on Stephen F. Austin would spend three rounds on
  three decisions in one life. Same fields, no schema change. **The assignment table
  stays at four types.**
- **The decision step having no right answer is what saves this type.** It's the one
  structural difference from Types 1 and 2, where one option is marked best. Here
  nothing is. L'Enfant's real answer — tear the man's house down — got him fired
  inside a year, and his drawing built the city anyway a century later. Marking any
  option "correct" would have taught that historical actors were always right.
- **Record what the decision cost, every time.** This is the specific way this type
  goes bad: three people whose choices all worked out perfectly is a hagiography, not
  history. Now audited — a lesson where no round carries a `cost` gets flagged.
- **Shuffle which option is the real one.** If what the person actually did is always
  the second option, students find it by position. Also audited.
- **The sensible-sounding option must sometimes be the one they didn't take.** In all
  three rounds the "ask the person in charge to sort it out" option is available and
  in none of them is it what happened. That one stays human review — no checker can
  tell whether an option merely sounds noble.

**Still open:** some of these twenty-three standards — the pure "identify four
inventors" ones — may not deserve a twenty-minute briefing at all, and might belong
in a lighter format like Science's. Worth deciding before forcing all twenty-three
through the same door.

---

## 6. Type 4 — Categories That Matter

**Status: BUILT.** `SS-3-7C-V3-BR` ("The Wrong Desk" — local, state and national
government services) runs on it and passes all three checks clean. Shape contract:
`lib/briefings/schema/ssCategoryLesson.schema.js`. It was built last on purpose,
because sorting is exactly what made the old lessons shallow.

**Thinking move:** categorizing.

**Use it when** the standard asks students to sort things into a fixed set of groups —
branches of government, levels of government, regions, types of settlement, rights.

**The design problem:** this is the exact trap the v3 rebuild exists to escape. The old
lesson was twenty-two interactions all asking "which of these three categories is
this?" A whole lesson built on sorting would be worse than what we replaced, and the
fact that the sorting mechanic already exists makes this type look far easier than it
is.

**The fix — the category has to have a consequence.** You don't sort in order to sort.
You sort because putting a thing in the wrong box **breaks something**. So the spine of
the lesson is *what goes wrong when the category is wrong.*

**The teach:** a problem shows up at the wrong place. A citizen takes a pothole
complaint to Congress. A case arrives at the branch that can't hear it. A family looks
for a protection in the amendment that doesn't contain it. The student routes it, sees
what happens when it's routed wrong, and names the rule that decides. Three rounds,
three categories, a real consequence each time.

**The synthesis:** the boundary cases — items that sit right on the line between two
categories, where the definition actually lives. Then the same take-one-away move that
works in Type 1: *"there is no judicial branch. What happens to this case now?"*

**Its safety checks:** the existing no-giveaway rule, plus three stronger ones — **at
least two items must be genuine boundary cases**, **every category must appear as a
wrong answer somebody would plausibly choose** (a category nobody is ever tempted to
pick isn't being tested), and every category must receive at least one item in the
sort.

**What building it actually taught us:**

- **The student names the RULE, not the category.** This is the single thing that stops
  this type collapsing back into sorting. Naming the category is just the sort again
  with extra steps. What generalises is the principle underneath — in 3.7C, *how far
  does this reach?* One street, or the whole state, or all fifty. A child who has the
  rule can place a service nobody taught them; a child who has only the three bins
  cannot.
- **The category has to cost something when it's wrong.** Every round is a problem
  arriving at the wrong desk: a neighbour writes to the Governor about a pothole, and
  four months later the letter reaches the city with the hole bigger. Sorting matters
  because misfiling has a price.
- **Don't teach a tidy falsehood.** Real government overlaps. Schools are run by the
  district *and* shaped and largely paid for by the state, and the honest answer to
  "who runs your school" is "both, and that's normal." That's the first boundary case
  in the lesson rather than something swept out of it. Clean examples go in the teach;
  the genuinely shared ones go at the edge, which is where a category's definition
  actually lives.

---

## 7. Decisions, settled and open

**Settled Sept 14:**

1. **Hub-style cause-and-effect** (one thing changes many, like "how the railroad
   changed Texas") is a **variant of Type 1**, not a fifth type. Same seven phases,
   only the way beats link together differs.
2. **The thin "identify these people" standards do get briefings.** At Grade 3 every
   one of them names a *set* of people rather than one person, so the grouped version
   is the natural fit there; single-biography treatment belongs to Grades 4 and 5,
   where standards name one person facing one real decision. Which version to use is
   decided by the standard, not by preference.
3. **Comparison was proved first**, and it worked — see §4.
4. **The public/server cross-check is built.** `crossCheckLesson(pub, srv)` in
   `lib/briefings/schema/crossCheck.schema.js`. Run it on every generated lesson.

**All four baselines are now built** — 3.2A (cause and effect), 3.2B (comparison),
3.1B (people), 3.7C (categories). Every one passes its shape check, its quality audit
and the cross-check clean.

**Still open:**

- Whether the pure "identify four inventors" standards deserve a full twenty minutes
  or a lighter format like Science's.
- Extending the no-giveaway rule to `matchPairs` and `labelPicture` (see §9).
- The standard-by-standard assignment table for all ~150 Grade 3-5 standards — the
  batch work order, not yet written.
- None of the four are wired into the player yet, and none are assignable.

---

## 8. What stays human, in every type

The safety checks catch structure: missing pieces, giveaway wording, too much reading,
an answer that's the longest option, an id that doesn't exist. They cannot catch
meaning. These stay a human read, every time:

- whether a causal chain actually holds, or just sounds like it does
- whether a wrong answer is a real misconception or merely a plausible-sounding one
- whether a historical claim is true
- whether the art shows what the screen needs it to show

---

## 9. Rules for building every lesson

**This section carries into the batch brief unchanged.** Everything here was learned
the expensive way — by building a lesson, or by finding a bug that had been sitting
there for weeks. None of it is obvious from the schemas alone.

### The checks are a floor, not a verdict

**A clean audit is not evidence that a lesson is good.** The old `SS-3-2B-BR` trips
only two checks. It has joke distractors ("toys, snacks, fame, naps, cartoons"), pairs
a student can match by keyword alone, and states the answer to a quiz question three
screens before asking it — and the checker sees almost none of that. The audit catches
**sloppiness**. It cannot catch **shallowness**. Thirty lessons coming back clean means
they are well-formed, not that they teach.

**Known gaps in the checks, as of Sept 14:**

- The no-giveaway rule only runs on `reasonSort`. `matchPairs` and `labelPicture` can
  still hand over their own answers — which is exactly how the old 3.2B's Match Pairs
  phase shipped. **Fix before any volume run.**
- The no-giveaway rule is string matching, not meaning. A clue saying "chapel" still
  gives away religious freedom and nothing will catch it.
- Nothing can tell whether a causal chain actually holds. A model will happily produce
  three events that sound sequential and aren't.

**What must run on every generated lesson:** the shape validator
(`validateSsThinkingShape` / `validateSsComparisonShape`), the matching
`audit…Quality`, and `crossCheckLesson(pub, srv)`. The third is newest and matters
most at volume — it catches the typo'd id that would otherwise fail silently in front
of a child.

### Rules that apply to every type

- **No typing, anywhere.** Third graders type about five words a minute. Every response
  is a tap — but options must combine into claims that can be false, rather than
  matching one to one.
- **No distractor is a joke.** Every wrong option is a mistake a student actually
  makes, and its feedback teaches instead of marking. If a student who learned nothing
  can eliminate their way to the answer, the item cannot tell you who understood.
- **Wrong answers should be worth getting wrong.** A student who picks the distractor
  should come away with something the correct answer alone wouldn't have taught them.
- **Something in the lesson has no right answer** and goes to the teacher. The opinion
  is never marked; only the logic is checked.
- **The teach must build.** If the beats can be shuffled without loss, it is a list of
  facts wearing a narrative costume.
- **A clue never contains its own answer.**
- **Nothing is pre-answered.** If earlier lesson text states the answer to a later
  question, that question is decoration.
- **Every screen stays inside the word budget** (110 student-facing words). This one
  bites constantly — it caught 3.2B's own sort phase at 123 during the build.
- **The correct option is never the longest one.** Students learn to pick the long one
  without reading.
- **Rejected, do not reintroduce:** confetti and celebration bursts. **Kept:** the
  footprint progress trail and the hidden S.A.M. bonus after Clearance.
- **If a field isn't rendered, either wire it or delete it.** `improves` sat authored
  and invisible in every pack for months.

### Per-type invariants

| Type | The property that must hold |
|---|---|
| **1 · Cause and effect** | Every beat has a bridge to the next. Wrong cause options come from the wrong end of the timeline. In the transfer town, **exactly one** reason has two proofs and every other has one, plus a "none" decoy. |
| **2 · Comparison** | The second place stays hidden until the student predicts. Causes vary across rounds. At least one sort item is "both". The counterfactual has a "nothing changes" option and must not key to it. |
| **3 · People** | The decision step marks NO option correct — exactly one is flagged as what the person really did. Every round records what the decision cost. The real choice does not sit in the same position every round. Every declared kind of contribution gets named at least once. |
| **4 · Categories** | The graded step names the RULE, not the category. Every round carries a real cost for routing it wrong. At least two genuine boundary cases. Every category appears as a wrong answer somewhere, and receives at least one item in the sort. |

### How to work

- **Show, don't describe.** A written description of a lesson change has been accepted
  and then failed to land three separate times on this project. A clickable prototype
  settles it in minutes. Prototype before wiring anything into the player.
- **A lesson is not assignable until it is wired AND migrated.** Files in the repo do
  nothing until they are in the registries, rendered by the player, and added by the
  migration — and nothing reaches the live site until it is pushed.
- **Claude drafts, Emily authors, her colleague approves.** A clean audit does not make
  something classroom-ready.
