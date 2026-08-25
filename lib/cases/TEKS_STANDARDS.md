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
