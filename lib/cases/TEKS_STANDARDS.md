# TEKS reference — locked to Emily's official documents

**Source of truth:** the official Texas TEKS PDFs Emily provided. As of
**Sept 22, 2026 every subject is covered**: Grade 3/4/5 Science (adopted 2021,
effective 2024–2025), Grade 3/4/5 Social Studies (adopted 2022, effective
2024–2025), **ELAR Grades 3–5**, and **Mathematics Grades 3–5**. Copies live in
the Masters archive under `05_REFERENCE/TEKS/`. **Do not invent or guess a
TEKS code for new case content — look it up in those PDFs (or this file, once
a code has already been verified here) first.**

This file is a running log of codes that have been checked against the real
documents while building case content. It is not a full transcription of the
TEKS — for the complete standard text, use the source PDFs.

**Read §"Not yet logged" at the bottom before assuming a code is safe.** A code
being *used by live content* is not the same fact as a code being *checked
against a PDF*, and this file now separates the two.

## Verified codes currently used by real case content

### Signal Check (`fact_check_desk` engine)

| Standard (with suffix) | TEKS code | Grade | Subject | Topic |
|---|---|---|---|---|
| `3.6A-SC` | 3.6A | 3 | Science | Physical properties of matter incl. magnetism |
| `4.10B-SC` | 4.10B | 4 | Science | Weathering, erosion & deposition |
| `5.13B-SC` | 5.13B | 5 | Science | Instinctual vs. learned behavior |
| `SS.3.6A-SC` | 3.6A | 3 | Social Studies | Supply and demand (SS pilot) |
| `SS.4.3A-SC` | 4.3A | 4 | Social Studies | Texas Revolution causes (SS pilot) |
| `SS.5.4C-SC` | 5.4C | 5 | Social Studies | Lewis and Clark expedition (SS pilot) |
| `SS.3.2B-SC` | 3.2B | 3 | Social Studies | Meeting community needs |
| `SS.3.3A-SC` | 3.3A | 3 | Social Studies | Physical environments |
| `SS.3.3C-SC` | 3.3C | 3 | Social Studies | Human impact on landscapes |
| `SS.3.5B-SC` | 3.5B | 3 | Social Studies | Creating a budget |
| `SS.3.6B-SC` | 3.6B | 3 | Social Studies | Scarcity |
| `SS.3.6C-SC` | 3.6C | 3 | Social Studies | Costs, prices, and profit |
| `SS.3.7C-SC` | 3.7C | 3 | Social Studies | Matching services to government level |
| `SS.3.8A-SC` | 3.8A | 3 | Social Studies | Purposes of founding documents |
| `SS.3.9E-SC` | 3.9E | 3 | Social Studies | Voting for group decisions |
| `SS.4.1B-SC` | 4.1B | 4 | Social Studies | American Indian ways of life in Texas |
| `SS.4.2A-SC` | 4.2A | 4 | Social Studies | European exploration motives |
| `SS.4.2C-SC` | 4.2C | 4 | Social Studies | Spanish mission site selection |
| `SS.4.3D-SC` | 4.3D | 4 | Social Studies | Challenges of the Republic of Texas |
| `SS.4.4B-SC` | 4.4B | 4 | Social Studies | Growth of the cattle industry |
| `SS.4.6B-SC` | 4.6B | 4 | Social Studies | Comparing Texas's physical regions |
| `SS.4.9A-SC` | 4.9A | 4 | Social Studies | Early economic activity in Texas |
| `SS.4.11C-SC` | 4.11C | 4 | Social Studies | Factors in Texas's economic growth |
| `SS.4.17B-SC` | 4.17B | 4 | Social Studies | Texas cultural contributions |
| `SS.5.2A-SC` | 5.2A | 5 | Social Studies | Causes/effects leading to the American Revolution |
| `SS.5.4A-SC` | 5.4A | 5 | Social Studies | Causes/effects of the War of 1812 |
| `SS.5.4D-SC` | 5.4D | 5 | Social Studies | Causes/effects of the Civil War |
| `SS.5.4E-SC` | 5.4E | 5 | Social Studies | Effects of Reconstruction and the 13th Amendment |
| `SS.5.7B-SC` | 5.7B | 5 | Social Studies | Geographic factors in settlement patterns |
| `SS.5.8B-SC` | 5.8B | 5 | Social Studies | Consequences of modifying the physical environment |
| `SS.5.13B-SC` | 5.13B | 5 | Social Studies | Colonial governments and representative institutions |
| `SS.5.14B-SC` | 5.14B | 5 | Social Studies | Purposes of government in the Constitution's Preamble |
| `SS.5.15A-SC` | 5.15A | 5 | Social Studies | Powers of the three branches of government |

Note the `-SC` suffix: several of these TEKS roots (e.g. `3.6A`) are already
used by an existing Group Chat case with the bare code. The suffix keeps the
`cases.standard` primary key unique across engines — same convention as
Newsroom's `-BN` suffix (e.g. `5.6D-BN`).

## Known trouble spots (real code shape, so no one re-guesses these)

- **4.7** has no sub-letter in the real TEKS — it's just "4.7" (Forces:
  gravity, friction, magnetism, contact/at-a-distance forces). There is no
  `4.7B`.
- ⚠️ **5.9 — THIS NOTE WAS WRONG, corrected Sept 16, 2026.** It used to say
  5.9 has no sub-letter. It does: **5.9A**. TEA's own *2024–2025 STAAR Grade 5
  Science TEKS comparison* lists "5.9A — demonstrate that Earth rotates on its
  axis once approximately every 24 hours" as a **Readiness** standard, and
  teksguide.org agrees. Two existing cases were built on the bare code while
  this note said otherwise — `5.9-SC` (Signal Check) and `5.9-SL` (Simulation
  Lab). Their *content* is fine; it's the code that's short a letter.
  Renaming them means changing `cases.standard`, which existing assignments
  point at, so that's a deliberate migration and not a quiet fix — it has NOT
  been done. New content should use **5.9A**.
- **5.11** — still unconfirmed. The old note claimed no sub-letter here
  either; given 5.9 was wrong, don't trust it. Check the real PDF before
  authoring against 5.11 or 5.11A.
- **5.10** only goes up to **5.10C** (water cycle → 5.10A, sedimentary rocks
  & fossil fuels → 5.10B, landform formation → 5.10C). There is no `5.10D`.
- **3.6** only goes up to **3.6D** (matter properties → states → heating/
  cooling → combining materials). There is no `3.6E`.
- Physical inherited/acquired traits (fur color, ear shape, etc.) are the
  **grade 4** standard **4.13B** — not grade 5. Grade 5's **5.13B** is about
  instinctual vs. learned *behavior*, not physical traits. Don't mix these
  two concepts into one case.

## Corrected from an earlier draft

An earlier pass at these 3 Signal Check cases used placeholder codes that
were invented (not sourced from the real TEKS) and turned out to be invalid:
`3.6E-SC`, `4.7B-SC`, `5.10D-SC`. The grade 5 case also mixed the grade 4
physical-trait concept into a grade 5 behavior standard. All three were
corrected to `3.6A-SC`, `4.10B-SC`, and `5.13B-SC` (grade 5 content fully
rewritten to be behavior-only) after checking the real PDFs. The old,
now-unused files are still in the repo but nothing imports them anymore.

### Signal Defense (`signal_defense` engine)

| Standard (with suffix) | TEKS code | Grade | Subject | Topic |
|---|---|---|---|---|
| `3.6A-SD` | 3.6A | 3 | Science | Physical properties of matter (mass, magnetism, floating/sinking) |
| `3.6B-SD` | 3.6B | 3 | Science | States of matter (solid / liquid / gas) |
| `3.6C-SD` | 3.6C | 3 | Science | Changes of state (melting, freezing, evaporation) |
| `3.6D-SD` | 3.6D | 3 | Science | Material properties & combining materials |
| `3.7A-SD` | 3.7A | 3 | Science | Types of forces (push/pull, contact forces) |
| `3.7B-SD` | 3.7B | 3 | Science | Forces and motion (speed, effects of force) |
| `3.8A-SD` | 3.8A | 3 | Science | Forms of energy (light, heat, sound) |
| `3.8B-SD` | 3.8B | 3 | Science | Mechanical energy |
| `3.9A-SD` | 3.9A | 3 | Science | Earth's rotation (day & night) |
| `3.9B-SD` | 3.9B | 3 | Science | The solar system |
| `3.10A-SD` | 3.10A | 3 | Science | Weather tools & measurement |
| `3.10B-SD` | 3.10B | 3 | Science | Soil composition |
| `3.10C-SD` | 3.10C | 3 | Science | Rapid vs. slow changes to Earth's surface |
| `3.11A-SD` | 3.11A | 3 | Science | Natural resources & their uses |
| `3.11B-SD` | 3.11B | 3 | Science | Conservation of natural resources |
| `3.11C-SD` | 3.11C | 3 | Science | Reduce, reuse, recycle |
| `3.12A-SD` | 3.12A | 3 | Science | Animal behaviors & adaptation (migration, hibernation, instinct) |
| `3.12B-SD` | 3.12B | 3 | Science | Food chains & energy flow |
| `3.12C-SD` | 3.12C | 3 | Science | Environmental changes (floods/droughts) affecting organisms |
| `3.12D-SD` | 3.12D | 3 | Science | Fossils as evidence of past life/environments |
| `3.13A-SD` | 3.13A | 3 | Science | External structures & survival adaptations |
| `3.13B-SD` | 3.13B | 3 | Science | Life cycles (complete/incomplete metamorphosis, plant life cycle) |

Note the `-SD` suffix: these bare TEKS roots (e.g. `3.6A`) are already used by
an existing Group Chat case, so the suffix keeps `cases.standard` unique —
same convention as `-SC` / `-SL` / `-MM` / `-BN` / `-CL`. All 22 are the whole-
group review-question banks Emily authored in
`FrequencyRush_ReviewQuestions_<standard>_v1.md` (Grade 3 Science, complete
set), converted into `lib/cases/signal-defense/<standard>-SD.public.js`.
Logged Sept 11, 2026 alongside the content-pipeline layered pass — `3.6B-SD`
was the original pilot case; the other 21 were added in the same pass.

### Mission Map (`mission_map` engine)

Mission Map is the one engine whose case code is **not** a TEKS code — it
numbers cases sequentially as internal concept numbers (`3.1-MM`, `3.2-MM`),
so the real standard lives in each case's own `teksLabel` and in
`lib/cases/mission-map/teksLabels.js`. 23 of the 25 do not line up with their
own number; `4.6-MM` and `5.7-MM` match only by coincidence. Logged here so
the mapping exists in one place a person can read.

| Case code | TEKS code | Grade | Subject | Topic |
|---|---|---|---|---|
| `3.1-MM` | 3.12B | 3 | Science | Food chains & ecosystem changes |
| `3.2-MM` | 3.10A | 3 | Science | Weather |
| `3.3-MM` | 3.7A | 3 | Science | Forces |
| `3.4-MM` | 3.12C | 3 | Science | Environmental changes |
| `3.5-MM` | 3.7C | 3 | Social Studies | Government services |
| `3.6-MM` | 3.4C | 3 | Social Studies | Map elements |
| `3.7-MM` | 3.1A | 3 | Social Studies | How communities change |
| `3.8-MM` | 3.6A | 3 | Social Studies | Supply & demand |
| `4.1-MM` | 4.9B | 4 | Science | Moon patterns |
| `4.2-MM` | 4.10A | 4 | Science | Water cycle |
| `4.3-MM` | 4.10B | 4 | Science | Weathering, erosion & deposition |
| `4.4-MM` | 4.12B | 4 | Science | Food webs |
| `4.5-MM` | 4.10C | 4 | Science | Weather vs. climate |
| `4.6-MM` | 4.6A | 4 | Social Studies | Four physical regions of Texas |
| `4.7-MM` | 4.4C | 4 | Social Studies | Railroads in Texas |
| `4.8-MM` | 4.19A | 4 | Social Studies | Primary & secondary sources |
| `4.9-MM` | 4.22A | 4 | Social Studies | Democratic decision making |
| `5.1-MM` | 5.7A & 5.7B | 5 | Science | Equal & unequal forces / force investigation |
| `5.2-MM` | 5.8B | 5 | Science | Electrical circuits & energy transformations |
| `5.3-MM` | 5.6A | 5 | Science | Physical properties of matter |
| `5.4-MM` | 5.12B | 5 | Science | Changes in food webs |
| `5.5-MM` | 5.19A | 5 | Social Studies | Rights guaranteed by the Bill of Rights |
| `5.6-MM` | 5.15B | 5 | Social Studies | Checks & balances |
| `5.7-MM` | 5.7B | 5 | Social Studies | Geographic factors & settlement |
| `5.8-MM` | 5.23E | 5 | Social Studies | Point of view |

Four of these were re-anchored after failing verification — `3.1-MM` (built
outside any real standard, rewritten to 3.12B), `3.4-MM` ("basic needs" →
3.12C), `4.5-MM` (weather vs. climate moved down from grade 5), `3.8-MM`
("Goods and Services Market Map" → 3.6A) and `4.9-MM` (civic participation →
4.22A). **Mission Map's Math and ELAR concepts (24) are not authored yet.**

### Assembly Deck (`assembly_deck` engine) — live cases

Verified Sept 22, 2026 against the real PDFs before any content was written.

| Standard (with suffix) | TEKS code | Grade | Subject | Topic |
|---|---|---|---|---|
| `3.6A-AD` | 3.6A | 3 | Science | Classifying matter by physical properties incl. magnetism |
| `4.10B-AD` | 4.10B | 4 | Science | Erosion & deposition at a stream bend |
| `SS.4.6B-AD` | 4.6B | 4 | Social Studies | Comparing two Texas physical regions |
| `SS.5.4C-AD` | 5.4C | 5 | Social Studies | The Lewis and Clark expedition |
| `ELA.3.12B-AD` | 3.12B (+ 3.11B(i)) | 3 | ELAR | Compose informational texts |
| `ELA.5.12C-AD` | 5.12C (+ 5.11B(i)) | 5 | ELAR | Compose argumentative texts |

**These are the first ELAR codes in this log.** `ELA.3.12B` and `ELA.5.12C`
were checked against Emily's ELAR PDF on Sept 22 while it was in hand.

### Assembly Deck — the 48-case map (checked, not yet authored)

`claude/AssemblyDeck_CaseMap_v1.md` names 48 more cases, all checked against
the real PDFs in the Sept 22 session. They are **verified but unauthored** —
safe to build against without re-opening a PDF.

- **Science** — G3: 3.12B, 3.11B, 3.13A, 3.10C · G4: 4.8B, 4.9B, 4.12B, 4.11B · G5: 5.6B, 5.8C, 5.12B, 5.10C
- **Social Studies** — G3: 3.5B, 3.7C, 3.9A, 3.14B · G4: 4.2C, 4.3D, 4.4B, 4.11C · G5: 5.2A, 5.14A, 5.15B, 5.12B
- **ELAR** — G3: 3.12A, 3.12C, 3.12D, 3.7D · G4: 4.12B, 4.12C, 4.12D, 4.7D · G5: 5.12B, 5.12D, 5.7D, 5.13D
- **Math** — G3: 3.5A, 3.5B, 3.4K, 3.8B · G4: 4.5A, 4.4H, 4.5B, 4.9B · G5: 5.4B, 5.3K, 5.3L, 5.9C

**This is the only verified Math list anywhere in the project**, and the only
broad ELAR one. Anything authoring Math or ELAR content should start here.

### Mission Map — the Math batch (authored Sept 22, 2026)

The first verified Math codes in this project. Every one was checked against
Emily's real **Texas Mathematics TEKS** PDF (19 TAC §§111.5–111.7) before any
content was written. The reasoning for each anchor, including the three that
deliberately avoid a more obvious code, is in
`claude/MissionMap_MathELAR_Anchors_v1.md`.

Remember Mission Map's own rule: the case code is an internal concept number,
**not** a TEKS code.

| Case code | TEKS code | Grade | Topic |
|---|---|---|---|
| `3.9-MM` | 3.7B | 3 | Perimeter of a polygon & a missing side length |
| `3.10-MM` | 3.4D | 3 | Total objects in equally-sized groups and arrays |
| `3.11-MM` | 3.7A | 3 | Fractions as distances from zero on a number line |
| `3.12-MM` | 3.8B | 3 | Problems from a bar graph with scaled intervals |
| `4.10-MM` | 4.3D | 4 | Comparing fractions with unlike numerators and denominators |
| `4.11-MM` | 4.5D | 4 | Perimeter and area problems with whole-number dimensions |
| `4.12-MM` | 4.2B | 4 | Value of a digit in decimals to the hundredths |
| `4.13-MM` | 4.5A | 4 | Multi-step problems, strip diagrams, a letter for the unknown |
| `5.9-MM` | 5.2B | 5 | Comparing and ordering decimals to the thousandths |
| `5.10-MM` | 5.6B | 5 | Volume of a rectangular prism as layers times the base |
| `5.11-MM` | 5.9C | 5 | Problems from a stem-and-leaf plot and other displays |
| `5.12-MM` | 5.3H | 5 | Adding fractions with unequal denominators, same whole |

**Three anchors that are not the obvious choice, and why:**

- **`3.9-MM` is 3.7B, not 3.6C.** 3.6C is the AREA of rectangles. 3.7B is
  perimeter, and it is the only code that names finding "a missing length when
  given perimeter and remaining side lengths," which is the case's second gate.
- **`3.10-MM` is 3.4D, not 3.5B.** Both mention arrays. 3.4D says
  *equally-sized* groups, and the case's trap is a story with the same digits
  and unequal groups — so 3.4D is the standard the trap tests. It also avoids a
  third case on 3.5B, which `MA.3.5B` (Signal Check) and the Assembly Deck case
  map already claim.
- **`4.12-MM` is 4.2B, not 4.2G.** The case's own final idea is "the position
  of a digit after the decimal point tells its value," and its trap is 0.4
  against 0.04. That is place value. 4.2G is the secondary skill and is already
  covered by `MA.4.2G` (Signal Check).

**Useful confirmations from the Math PDF while it was open:**

- **5.5 and 5.7 genuinely have no lettered subparts.** The document says so in
  its own "How the codes work" note. `MA.5.5` in the Signal Check list below is
  therefore a correctly-formed code, not a missing letter — the opposite of the
  `5.9`/`5.9A` Science problem recorded above.
- **3.8B ends with "with scaled intervals."** The scale is part of the standard,
  not an authoring choice.

## Not yet logged — used by live content, never checked against a PDF *in this file*

These codes are in shipped case files. They may well be correct — several were
authored in sessions that had the PDFs open — but **this log has never verified
them**, and the distinction matters after `3.1-MM`, `3.6E-SC`, `4.7B-SC`,
`5.10D-SC` and the `5.9`/`5.9A` correction. Treat them as candidates, not
facts, until someone checks them off against the real documents.

**Signal Check Math (12 cases, authored Sept 21–22, 2026)**
`MA.3.3H` · `MA.3.5B` · `MA.3.5C` · `MA.3.6C` · `MA.4.2F` · `MA.4.2G` ·
`MA.4.3E` · `MA.4.6B` · `MA.5.3E` · `MA.5.3I` · `MA.5.4F` · `MA.5.5`

*(`MA.5.5`'s bare code is confirmed correct — see the Mission Map Math section
above. The other eleven still want a read against the PDF.)*

**Signal Check ELAR (12 cases, authored Sept 21–22, 2026)**
`ELA.3.3C` · `ELA.3.6F` · `ELA.3.7C` · `ELA.3.9D` · `ELA.4.8A` · `ELA.4.9E` ·
`ELA.4.10A` · `ELA.4.11D` · `ELA.5.8A` · `ELA.5.9E` · `ELA.5.10B` · `ELA.5.10D`

**Engines with no entry in this file at all:** Simulation Lab (10 cases),
Relay Station (94 lessons), Frequency Rush, Group Chat, Newsroom. Their
standards live only in their own case files.
