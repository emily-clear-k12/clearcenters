# Grade 5 pilot — the hub works, and one problem is now a pattern

**Sept 16, 2026. Four Grade 5 lessons, one per type, chosen to break things.
All four pass. Companion to `GRADE-4-PILOT-FINDINGS.md`.**

---

## What was built

| Lesson | Type | TEKS | Chosen to break | Mechanic |
|---|---|---|---|---|
| `SS-5-5A-V3-BR` · *One Machine, Three Changes* | 1 · **hub** | 5.5A | The hub variant — untested in any grade | `matchPairs` |
| `SS-5-13A-V3-BR` · *Who Sends Who Home* | 2 · comparison | 5.13A | Two **systems**, not two places | `reasonSort` |
| `SS-5-2B-V3-BR` · *Three Ways to Start a Country* | 3 · people | 5.2B | **Five required names**, one of them a group | `trueFalseReason` |
| `SS-5-20A-V3-BR` · *When It Was Made* | 4 · wrong call | 5.20A | The hardest no-cost category standard | `sequenceIt` |

**All twelve lessons in the library — four Grade 3, four Grade 4, four Grade 5 —
now pass all three checks.**

---

## 1. The hub works, and it turns off a safety check

This is the first hub lesson in the project. Ten standards wait on it.

**It works.** One cause — the country moving its work into factories — fanning
out into where people lived, what could go wrong, and who got to do the work.
Urbanization, the Depression and the wartime labour shortage, all out of one
room rather than in a line.

**And it quietly disables Type 1's main protection.** `validateSsThinkingShape`
requires a `bridge` on every beat but the last, and the schema says why in as
many words: *"without it the beats are shufflable, which is the v2 problem."* In
a chain the bridge carries real causation. **In a hub there is no causation
between beats to carry** — they are siblings, not a line. The field still has to
be filled, so it gets filled, and the check passes while protecting nothing.

The lesson mitigates it by ordering beats by **time** — 1900–1920, 1929–1933,
1941–1945 — with the bridges carrying the clock. You cannot shuffle them because
the dates forbid it. That is a real constraint. It is not the same constraint,
and no checker can tell the difference.

**Recommendation for §9:** *a hub's beats must sit in a fixed real-world order
(time, or scale), and each bridge must say what fixes it.* Checkable by a human
in ten seconds; stops a generator producing three interchangeable paragraphs
with connective tissue pasted between them. I did not change the schema —
"bridge must contain a date" is easy to satisfy and hard to satisfy honestly.

---

## 2. The recurring problem, now confirmed twice

**The shape has three slots. Grade 5 standards routinely require five or six.**

- **4.6B** named four regions; the teach has room for two.
- **5.2B** says *including* Adams, Franklin, Jefferson, the Sons of Liberty and
  Washington. Five required. Three rounds.

5.2B handles it by putting Adams, the Sons of Liberty and Jefferson in the
rounds, and Franklin and Washington in the synthesis attributions ("suppose this
person had not existed — what is missing?"), the practice phase and the
clearance. All five are met and reasoned about; two are never a decision.

This will recur roughly twenty times. **Three honest options:**

1. **Accept it.** Three decisions, the rest through synthesis and clearance.
   Cheapest, and what these files do.
2. **Four rounds at 24 minutes.** The schema allows any number of rounds, and
   `minutes` may go to 24. Counter-intuitively this gives you *more* word
   budget, not less, because the budget is per screen. Costs four minutes of
   station time.
3. **Split the standard across two briefings.** Real coverage, double the build
   and review cost, and it collides with the 135-vs-90 question.

This is the decision I would most like your answer on, because it changes the
shape of every dense standard in Grades 4 and 5.

---

## 3. Three things that worked better than expected

**A group fits the person shape.** `personName` is a required string and nothing
says it must be an individual. Round two of 5.2B is the Sons of Liberty, the
round behaves exactly like the other two, and the naming step is arguably
sharper for it — "acted in a crowd" is a contribution only a group can make.

**Type 2 survives comparing two systems**, not just two places. 5.13A puts the
House of Burgesses against the King's governor — who sat in the same colony,
arguing, for a century and a half. The prediction step still works because you
genuinely can predict what a man who answers to London will do that a man who
answers to voters will not.

But it nearly broke, and the reason generalises. Type 2's graded step is *name
why the two differ*. Two places differ because of rain or rock — external causes
a student can point at. **Two systems look like they differ by definition**,
which leaves the naming step with nothing to name. It works here only because
these two didn't differ by definition: they differed over who founded each
colony and what they were short of, who paid the man in charge, and whose
authority he held. **If you cannot find three external causes for a system
comparison, that standard is a Type 4 and not a Type 2** — which is exactly what
the assignment table already suspects about 5.15C, and I now think it is right.

**The Wrong Call variant is proven at both ends of Type 4.** 4.6A tested it
where a wrong call has an obvious price (a rice farm near Amarillo dies). 5.20A
is the hard end — art and music by period, where nothing breaks. It survives,
because **the cost is that somebody believes something false**: a documentary
opens with an 1860 poem as if it were an eyewitness to 1775; a textbook uses a
commissioned painting as a photograph of empty land; a class sings as its own a
song written to mock it. Both lessons needed **no schema change at all**. The
variant is a writing convention, not a new type — now tested rather than
asserted.

---

## 4. A new structural rule for the transfer phase

`crossCheckLesson` requires the transfer scene to hold evidence of every claim
option, with exactly one having two proofs. **That is impossible when the
categories are mutually exclusive in space.** A place is in exactly one region.
A work of art is from exactly one period.

4.6A solved it with a truck driver's cab after a week crossing Texas. 5.20A
solves it with a film's source list. Both work, and neither is a trick a
generator finds on its own.

**The rule, worth adding to the types document:** *when a standard's categories
cannot coexist in one place, the transfer frame must be a COLLECTION — a box, a
cab, a source list, a museum case — rather than a place.* That covers every
region, settlement-pattern, cultural-region and period standard in the table.

---

## 5. The invariant bent real evidence a second time

4.2E's transfer needed a land register for Sterling C. Robertson that is true of
empresario colonies generally and not sourced to his papers. 5.2B's needs a
non-importation list for Mercy Otis Warren on the same basis.

Both are flagged in their file headers. **Twice is a pattern, not an accident.**
The transfer invariant demands a specific distribution of evidence — every
category represented, exactly one doubled — and real historical records do not
supply it on request. At 131 lessons this will happen constantly and mostly
unflagged, because a generator under pressure will simply invent the missing
artifact and say nothing.

---

## 6. The failure profile is identical, and that is the most useful number here

First-pass failures, before any fixing:

| | Grade 4 | Grade 5 | Total |
|---|---|---|---|
| Word budget (110/screen) | 5 | 9 | **14** |
| Length parity (correct is longest) | 4 | 3 | **7** |
| Shape validator | 0 | 0 | **0** |
| `crossCheckLesson` | 0 | 0 | **0** |
| No-giveaway (incl. the extended `matchPairs` rule) | 0 | 0 | **0** |

**Twenty-one failures across eight lessons, and every single one was word budget
or answer length.** The structural checks have never fired once on generated
work — across eight lessons and several hundred cross-referenced ids.

Two conclusions:

- **The shapes and the cross-check are doing their job and are not the
  bottleneck.** They are well enough specified to build against from cold.
- **The two checks that actually fire are the two the handoff treats as minor.**
  That argues for settling both deliberately rather than fighting them lesson by
  lesson: raise the budget to 125 for Grades 4–5 (a two-line change —
  `auditThinkingQuality` already accepts `opts.wordBudget`, `run-checks.mjs`
  just never passes one), and scope the parity rule to the commit step as the
  Grade 4 findings proposed.

---

## 7. The TEKS reference earned itself immediately

Every `teksText` in these four was real from the first draft. More usefully, the
`including` / `such as` distinction did real work:

- **5.5A says "such as"** — so selecting industrialization, urbanization, the
  Depression and the world wars from its list of six is legal. On an
  "including" standard it would not have been.
- **5.2B says "including"** — which is precisely what makes five-names-in-three-
  rounds a real problem rather than a stylistic one.
- **5.13A says "including"** representative government and monarchy, so neither
  can be background to the other. Each gets equal rounds.

That distinction would have been invisible in a paraphrase, and it changed the
design of two of these four lessons.

---

## 8. Still open, in the order I would take them

1. **Three slots vs. five required names** (§2). Changes every dense standard.
2. **Your review of the Grade 4 four** — still the number that decides 135 vs
   bundling vs prioritising, and still the only thing here I cannot produce.
3. **The word budget for Grades 4–5.** 110 or 125, decided once.
4. **Three documentation additions:** the hub ordering rule (§1), the collection
   rule for transfers (§4), and the Wrong Call variant from the Grade 4 notes.
5. **The stale `3.17(B)` citation** in the master brief and the 3.2A lesson.
6. **Nothing has ever run in a browser**, and eleven of twelve lessons are not
   wired to the player.

And the standing one: twelve clean lessons means twelve well-formed lessons. The
causal chains, the distractors, the historical claims and the flagged content
calls in every file still need a person. Each file names its own uncertainties
under a clear heading — 5.2B's Jefferson round and 5.5A's third beat hardest
among them.
