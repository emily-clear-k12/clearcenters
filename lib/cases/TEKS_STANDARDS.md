# TEKS reference — locked to Emily's official documents

**Source of truth:** the 6 official Texas TEKS PDFs Emily provided (Grade 3/4/5
Science, Grade 3/4/5 Social Studies — Science adopted 2021 / effective
2024–2025, Social Studies adopted 2022 / effective 2024–2025). Copies live in
the Masters archive under `05_REFERENCE/TEKS/`. **Do not invent or guess a
TEKS code for new case content — look it up in those PDFs (or this file, once
a code has already been verified here) first.**

This file is a running log of codes that have been checked against the real
documents while building case content. It is not a full transcription of the
TEKS — for the complete standard text, use the source PDFs.

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
- **5.9** and **5.11** also have no sub-letters — just "5.9" (Earth's
  rotation/day-night/shadows) and "5.11" (natural resource conservation).
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
