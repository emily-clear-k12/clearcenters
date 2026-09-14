# ClearCenters Briefings — The Four Lesson Types

**Draft for Emily's review. Written Sept 14, 2026. Nothing here is built yet except Type 1.**

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

**Status: proposed, not built.**

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

**Why this one is the sharpest test of the whole plan:** if this lesson ends up feeling
like 3.2A with new words, then the theory that different standards need different
shapes is wrong, and we find that out on one lesson instead of thirty.

---

## 5. Type 3 — People and Decisions

**Status: proposed, not built. Least certain of the four.**

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

**Two honest cautions.** This is the type I'm least sure about, and it may take two
attempts to get right. And some of these twenty-three standards — the pure "identify
four inventors" ones — may not deserve a twenty-minute briefing at all. They might
belong in a lighter format, the way Science already has one. That's worth deciding
before we force all twenty-three through the same door.

---

## 6. Type 4 — Categories That Matter

**Status: proposed, not built. Build this one last, on purpose.**

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

**Its safety checks:** the existing no-giveaway rule, plus two stronger ones — **at
least two items must be genuine boundary cases**, and **every category must appear as a
wrong answer somebody would plausibly choose.** A category that's never mistakenly
picked isn't being tested.

---

## 7. What still needs deciding

1. **Hub-style cause-and-effect** — variant of Type 1, or its own type? (My
   recommendation: variant.)
2. **The thin "identify these people" standards** — do they get a full briefing, a
   lighter format, or nothing?
3. **Which type to prove first.** All four definitions above are untested. The earlier
   batch spec failed precisely because it was written and never tested, so the next
   step is building **one** lesson, not four.
4. **The public/server cross-check** — nothing currently verifies that every id a
   lesson references actually exists in its answer key. At one lesson that's a
   five-minute bug. At thirty, generated by a model, it's the failure most likely to
   reach a student. Worth adding before any batch run, for all four types.

## 8. What stays human, in every type

The safety checks catch structure: missing pieces, giveaway wording, too much reading,
an answer that's the longest option, an id that doesn't exist. They cannot catch
meaning. These stay a human read, every time:

- whether a causal chain actually holds, or just sounds like it does
- whether a wrong answer is a real misconception or merely a plausible-sounding one
- whether a historical claim is true
- whether the art shows what the screen needs it to show
