# TEKS reference cache

Built Sept 14, 2026, per Emily's instruction to have the AI research grounding
sources itself ("have the ai research -- use sites like teksguide.org,
lead4ward") — and her follow-up decision to build this as a **local,
one-time cache** rather than live-scraping those sites during generation
("Yes, build a local reference cache (recommended)").

## What this is

One markdown file per TEKS standard, researched once from public sources,
meant to be the input a future AI lesson-generation step reads instead of
fetching the web live. This is the concrete stand-in for the "authoring
brief" idea from the Sept 14 foundation conversation — instead of Emily
spending ~5 minutes per standard jotting misconceptions/vocabulary notes,
the AI does that research up front and it gets reviewed once, here, as a
file, before any lesson content gets generated from it.

## What's in each file

- The standard's **official, current** verbatim text — cross-checked
  against the actual Texas Administrative Code text (Justia/Cornell Law
  mirrors), not just a third-party snapshot, after finding a stale
  snapshot mid-research (see SS-3-2B's notes below).
- STAAR classification (Readiness/Supporting) and reporting category, from
  lead4ward's TEKS Snapshot PDFs.
- Vocabulary, common misconceptions, and grade-level scope notes, from
  teksguide.org where it covers the subject.
- Any caveats worth a human catching before this gets used to generate
  content.

## Known limitations, found while building this

- **teksguide.org does not cover Social Studies at all.** Its subject
  list (checked directly) is ELPS, ELAR, Science, Spanish Language Arts,
  and Technology Applications — no Social Studies. For SS-3-2A and
  SS-3-2B, teksguide.org contributed nothing; lead4ward + the official TAC
  text carried the full weight. Don't design the generation pipeline
  assuming both sources always contribute to every standard.
- **lead4ward's own PDFs block direct fetching** (robots.txt) — every
  lead4ward citation below was actually retrieved through a third-party
  mirror hosting the same PDF (a district's finalsite CDN), not
  lead4ward.com directly. A real pipeline should expect to do the same,
  or download once by hand and store the PDF/extract locally.
- **A third-party mirror can be stale.** The first Grade 3 Social Studies
  snapshot mirror found still had 3.2(B)'s old "identify" wording instead
  of the current "compare" — Texas re-adopted Social Studies TEKS in 2022
  and this particular re-hosted PDF hadn't caught up. Caught by
  cross-checking against the official Texas Administrative Code text
  (regulations.justia.com / law.cornell.edu mirror the current TAC
  verbatim and aren't robots-blocked) — that should be the tie-breaker
  source whenever a snapshot's exact wording matters, not just its
  vocabulary/category metadata.
- **Science TEKS were renumbered for the 2024-2025 school year.** The
  states-of-matter content this project calls SCI-3-6B is 3.5(B) under
  the current numbering; 3.6(B) now means something else (forces/motion).
  Emily's decision on Sept 14: leave the existing content ID as-is for
  now. This file keeps the current-numbering fact on record so it doesn't
  get lost if that decision is revisited later.
