# The TEKS blocker is cleared — and it found four errors

**Sept 16, 2026. Companion to `GRADE-4-PILOT-FINDINGS.md` §7.**

---

## What now exists

`lib/briefings/teks/ss-teks-3-5.js` — verbatim student-expectation text for
**every Grade 3, 4 and 5 Social Studies TEKS**, 151 expectations in all.

```js
import { teksTextFor, namesRequiredExamples } from "./teks/ss-teks-3-5.js";

teksTextFor("4.3A")
// "Analyze the causes, major events, and effects of the Texas Revolution,
//  including the Battle of the Alamo, the Texas Declaration of Independence,
//  the Runaway Scrape, and the Battle of San Jacinto."

namesRequiredExamples("4.3A")   // true  — those four events are REQUIRED
namesRequiredExamples("4.1B")   // false — "such as", so they are examples
```

A generator no longer has to invent, paraphrase or hand-type a `teksText`. All
four Grade 4 lessons now carry the real wording, and the `[PARAPHRASE]` markers
are gone.

**Source:** 19 TAC §113.14 / §113.15 / §113.16, retrieved from the Justia
verbatim TAC mirror — the same tie-breaker source your
`docs/briefings/teks-reference/README.md` already names, and for the same
reason it names it.

**Verification:** 34 Grade 3, 57 Grade 4 and 60 Grade 5 content expectations,
which matches TAC exactly. Every standard code the assignment table cites
resolves against it.

---

## The distinction that does the work

**"including" and "such as" are not interchangeable in the TEKS.**

- **including** — the named examples are **required**. Omit one and the
  standard is not covered.
- **such as** — the named examples are **illustrative**. Any comparable
  example will do.

**34 of the 151 expectations use "including."** That is the clause a paraphrase
destroys first, and it is the difference between a lesson that covers its
standard and one that only looks like it does. `namesRequiredExamples()` exposes
it so a generator can check.

---

## Four errors this surfaced

### 1. `3.17(B)` does not exist — and it is in your flagship lesson

Grade 3's skills strand ends at **3.16** under the 2022 TEKS. The analysis
standard — *sequencing, categorizing, identifying cause and effect, comparing,
contrasting* — is **3.14(C)**.

`3.17(B)` is pre-2022 numbering. It currently appears in:

- `docs/briefings/BRIEFINGS-V3-MASTER-BRIEF.md` — §2 and §4
- `lib/briefings/SS-3-2A-V3-BR.public.js` — the file header
- `docs/briefings/teks-reference/SS-3-2A.md`

The assignment table has it right. Three places to correct, one of them the
lesson the whole rebuild is built around. **I have not changed these** — the
master brief and the 3.2A lesson are yours, and editing a shipped lesson's
header on my own judgment seemed like the wrong call. Say the word.

### 2. `4.3A` required an event my lesson did not have

Real text: *"analyze the causes, major events, and effects of the Texas
Revolution, **including** the Battle of the Alamo, the Texas Declaration of
Independence, **the Runaway Scrape**, and the Battle of San Jacinto."*

The first draft's `sequenceIt` ordered Gonzales → Declaration → Alamo →
**Goliad** → San Jacinto. It **omitted the Runaway Scrape**, which the standard
requires, and **included Goliad**, which the standard never names. Also the verb
is *analyze*, not *identify and explain*.

**Fixed.** Goliad out, the Runaway Scrape in, all four required events present.
Gonzales stays because the teach ends there and it starts the shooting — it is
additional to the standard, not a substitute for anything in it.

Dropping Goliad is a call you may want to reverse. It is heavily taught and it
is genuinely part of the story. It is simply not in 4.3A, and the phase carrying
the standard's own list seemed like the wrong place to add to that list. If you
want it back it belongs in the teach or the clearance.

### 3. Your archived PDFs are not verbatim TAC

`05_REFERENCE/TEKS/Texas_Grade{3,4,5}_SocialStudies_TEKS.pdf` are headed
*"Current Student Expectations — Detailed Planning Reference."* They re-word.
Two confirmed at Grade 4:

| | TAC | your PDF |
|---|---|---|
| 4.1B | "…**such as** the Lipan Apache, Karankawa, Caddo, and Jumano" | "…**including** the Lipan Apache…" |
| 4.1C | "…**such as** Gulf, Plains, Puebloan, and Southeastern" | "…**including** the Gulf, Plains, Puebloan, and Southeastern regions" |

That turns optional examples into apparently mandatory ones. They are good
working documents and they are not citable standard text — anything authored
against them may be over-constrained. This is the same failure mode as the stale
mirror your teks-reference README already caught, wearing different clothes.

### 4. `5.3A` and `5.19A` are not real codes

TAC (3) and (19) at Grade 5 are single **unlettered** expectations. The
assignment table writes them with an `A`. Both spellings resolve in the
reference file so nothing breaks, but the bare `5.3` and `5.19` are correct.
(`3.12` is also unlettered and the table has that one right.)

---

## What changed in the lessons

| File | Change |
|---|---|
| `SS-4-3A-V3-BR` public + server | Real `teksText`; Goliad → the Runaway Scrape in `sequenceIt` and `correctOrder` |
| `SS-4-6B-V3-BR` public | Real `teksText`. The four regions are named **in the stem**, not in an "including" list — which makes the two-of-four coverage question harder to wave through, not easier |
| `SS-4-2E-V3-BR` public | Real `teksText`. The standard says **including** Austin and de León, so both are required — the standard's own word now backs the hybrid argument. TAC spells it "Martín de León", lowercase d |
| `SS-4-6A-V3-BR` public | Real `teksText`, which carries a second clause the paraphrase dropped: **including** their characteristics such as landforms, climate, vegetation, and economic activities. The lesson's three rules land on climate, landform and vegetation, with economic activities in the plans themselves — that is luck rather than design and worth checking |

All eight lessons still pass all three checks.

---

## Still open

- The three `3.17(B)` corrections — yours to make or to tell me to make.
- Goliad in or out of 4.3A.
- Whether 4.6B teaching two of four regions properly is enough (§1 of the
  pilot findings).
- Science TEKS. This file covers Social Studies only, because that is what the
  assignment table covers. The same build would take about an hour for Science,
  and it matters there too: your own teks-reference README records that Science
  was **renumbered** for 2024-25 — what this project calls `SCI-3-6B` is 3.5(B)
  under current numbering, and 3.6(B) now means forces and motion.
