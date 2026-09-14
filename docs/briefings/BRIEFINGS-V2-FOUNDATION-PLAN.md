# ClearCenters — Briefings v2 Foundation Plan

**Context:** v1 shipped 3 lessons (SS-3-2A, SS-3-2B, SCI-3-6B) as proof of
concept. Emily's assessment after living with them: she wants to scrap and
rebuild all three, and she's now thinking 3/4/5 × Social Studies/Science —
a real production catalog, generated with AI batching rather than
hand-authored. This doc locks the foundation that has to exist *before*
any of that content gets (re)written, per her own instinct: "build the
foundation now... precisely because manual quality control doesn't scale."

**Status (Sept 14, 2026):** foundation built, mechanics wired into the
real player, and all 3 pilot lessons rebuilt and passing the checker (with
known, disclosed limitations — see §7). Not yet runtime-tested in an
actual browser against live Supabase — see §8 before assigning these to
real students.

---

## 0. What was wrong with v1 (the honest assessment)

Both SS lessons and the one Science lesson used the *identical* 6-phase,
full-first-teach structure and the same bespoke Ops Choice mechanic. That
was right for Social Studies (it's often the only lesson time a student
gets on the topic at all), but wrong for Science: Science is already
taught in class, so a briefing there should refresh, not re-teach.
SCI-3-6B was effectively the SS template with different words in it —
same depth, same length, same mechanic. That's the concrete problem this
plan fixes, not just "make it prettier."

## 1. Two locked lesson shapes

`lib/briefings/schema/ssFullLesson.schema.js` and
`.../scienceLightReview.schema.js`. Both target **20 minutes** — Emily's
call after going back and forth between 15 and 20 ("stations are on
average about 20 minutes... yes i think that sounds right").

**SS full lesson** (first-teach) — 6 phases, unchanged spine from v1:
intelDrop (hook, 2 min) → fieldBrief (teach, 7 min) → ONE practice
mechanic (5 min) → opsChoice (apply, 4 min) → evidenceDrop (evidence,
2 min) → clearance (assess, 4 min).

**Science light review** — 5 phases, deliberately lighter: intelDrop
(hook, 2 min) → quickReview (short recap, 4 min — NOT full first-teach
beats) → TWO different practice-mechanic reps (5 min each) → clearance
(4 min). No opsChoice/evidenceDrop — cut on purpose to stay "light touch."

## 2. The practice-mechanic library — built AND wired into the real player

`lib/briefings/schema/mechanics.schema.js` defines the data contracts;
`app/briefing/[assignmentId]/BriefingClient.js` and
`app/api/briefing/grade/route.js` now actually render and grade all five:

- **reasonSort** — kept from v1 (drag/tap clues into bins)
- **matchPairs** — connect two related things (now live in SS-3-2B)
- **sequenceIt** — put 3-5 steps/events in order (built, not yet used by a pilot lesson)
- **labelPicture** — tap a hotspot, place the right label (now live in SCI-3-6B)
- **trueFalseReason** — true/false where every answer surfaces a one-line reason (now live in SCI-3-6B)

**A real architectural fix, found while wiring this up, not assumed
up front:** `BriefingClient.js`'s phase list (`PHASES`) used to be a
single module-level constant shared by every lesson — which is exactly
why Science couldn't be structured differently from SS; the player
itself could only render one fixed 6-phase shape. `PHASES` is now
computed per-briefing from `briefing.phases`, and a phase id is used
directly at runtime (e.g. a lesson picking Match Pairs lists
`"matchPairs"` in `phases`, with its content at `lesson.matchPairs` —
the same convention `"reasonSort"` already used, not a generic
`"practice"` wrapper). The original version of this schema modeled
practice as a generic wrapper; it was corrected to match this once the
real integration made the mismatch obvious.

Same public/server split as v1's Reason Sort throughout: the public pack
never ships an answer key.

## 3. Engagement — decided, and now actually rendered

`lib/briefings/schema/engagement.schema.js`, wired into
`BriefingClient.js`:

- **Progress trail** — a footprint/walker strip above the phase nav,
  reading `briefing.engagement.progressTrail`, replacing the old bare
  phase-count implication.
- **Hidden bonus** — a "🎁 One more thing from S.A.M...." reveal button on
  the Clearance "cleared" screen, showing `engagement.hiddenBonus.samLine`
  once tapped. Local-only state (not persisted) since it's ungraded and
  re-showing it on a later visit is harmless.
- **Rejected, and guarded against regressing:** a confetti/celebration
  burst on every correct tap. `validateEngagement()` throws if a lesson
  adds `engagement.celebrationBurst` — Emily's words: "i dont like the
  little celebration."

## 4. The TEKS-alignment + readability checker

`scripts/briefings-checker.js` — run it against any `*.public.js` pack:

```
node scripts/briefings-checker.js lib/briefings/SS-3-2A-BR.public.js
```

Two checks: (1) **TEKS coverage** — splits the standard's wording into
sub-parts (handles both "including A, B, C" list standards and
compound-clause standards like Science's), checks each is taught,
practiced, AND tested, using bag-of-words + light stemming so deliberate
kid-friendly paraphrasing isn't wrongly flagged; (2) **readability** —
real Flesch-Kincaid scoring (ceiling 3.5) on kid-facing prose only, with
a vocab exemption for terms defined in `fieldBrief.vocab`.

**Known, disclosed limitations** (found by actually running it, not
assumed): it's keyword/bag-of-words matching, not semantic understanding
— a true synonym with zero shared words can slip past as a false gap
(SCI-3-6B's rebuilt content still shows one: "solids have a definite
shape" flags as a gap because the lesson deliberately says "keeps its own
shape" instead of the standard's legal wording "definite shape" — that's
the right authoring choice for grade 3, and a false gap, not a real one).
It also only recognizes ONE of this codebase's two existing vocabulary-
authoring conventions (`fieldBrief.vocab` as a flat term list) for the
readability exemption — SS-3-2B's paged `vocabSentences` format isn't
recognized, which is why it shows more readability flags than SS-3-2A
despite being comparably good content. Treat every flag as "go
double-check this by eye," never as proven ground truth.

## 5. The TEKS reference cache

`docs/briefings/teks-reference/` — one file per standard, researched from
teksguide.org + lead4ward per Emily's instruction, meant to ground a
future AI generation step instead of live-scraping. Built for the 3 pilot
standards; see that folder's `README.md` for the method and its own
limitations (teksguide.org has no Social Studies coverage at all; a
lead4ward mirror was found stale on SS-3-2B and had to be cross-checked
against the official Texas Administrative Code text; Science TEKS
renumbering — SCI-3-6B is 3.5(B) under the current standards, kept as-is
per Emily's Sept 14 decision).

## 6. The 3 pilot lessons — rebuilt

- **SS-3-2A** (Why Communities Form): kept on Reason Sort (already fit
  well), minutes 30→20, engagement block added. TEKS coverage: clean, 0
  gaps. Readability: 39 flags remain (mostly borderline titles/labels —
  not chased to zero; see §7).
- **SS-3-2B** (How Communities Meet Needs): mechanic swapped from Reason
  Sort to **Match Pairs** — this standard's tested verb is "compare," and
  pairing each need with how both towns handle it fits that better than a
  5-bin sort. Reused her existing example phrasing almost verbatim,
  recombined into 5 pairs. TEKS coverage: clean, 0 gaps.
- **SCI-3-6B** (Solid, Liquid, or Gas?): genuinely rebuilt against the
  light-review shape — quickReview replaces the 4-page first-teach, and
  two new mechanics (**True/False-with-Reason**, built directly from
  teksguide.org's documented misconceptions, then **Label the Picture**)
  replace the single Reason Sort + Ops Choice + Evidence Drop. Clearance
  item c4 now directly tests "liquids and gases take the shape of their
  container" — the checker had flagged that claim as under-tested in the
  original version; this closes it. TEKS coverage: 4 of 5 sub-parts
  clean; the "definite shape" false gap from §4 remains (real content,
  checker limitation).

## 7. What's honestly still rough

- **39-51 readability flags remain across the SS lessons**, mostly
  borderline (grade 3.6-6.6) titles, proper nouns ("Founders' Council —
  Maple Crossing"), and labels — not chased to zero. A couple of the more
  severe Science ones were tightened as a real test of the checker
  (recap paragraph and one clearance explanation, both brought under the
  3.5 ceiling); a full prose copyedit pass against every flag was not
  done and would be a separate, sizeable editing task.
- **Label the Picture's hotspot coordinates in SCI-3-6B are placeholders**
  (`x`/`y` as % of image width/height), written without being able to see
  the actual `04-sort-samples.png` art file. Worth a quick eyeball-and-
  nudge pass against the real image before this ships.
- **`Claude outputs/Briefing_Pack_Spec_for_Batch_Generation.md`** (an
  older spec that assumed one fixed 6-phase shape for everything) has
  been marked superseded with a pointer to this doc, not rewritten
  in full — a real update covering the Science shape and the mechanic
  menu is part of the future AI-pipeline work in §9.

## 8. Before this goes anywhere near real students

- **Not runtime-tested.** Everything here was verified with `next build`
  (full production build, zero errors) and the checker script — neither
  exercises the actual click-through gameplay against a live Supabase
  backend, and this sandbox only has placeholder Supabase credentials, so
  that wasn't possible from here. Please click through all 3 lessons
  yourself (or have someone do it) before assigning them.
- **A new SQL migration is needed**: `update_briefings_v2_minutes_migration.sql`
  (delivered alongside this doc) updates the `briefings` catalog table's
  `minutes` column to 20 for all three IDs — the teacher assign screen
  reads that table directly, not the lesson packs, so without this it
  will keep showing the old 30/30/25-minute badges.
- **Any student with an in-progress (not yet cleared) submission on
  these 3 lesson IDs may get reset to the first phase on resume.** The
  player gracefully falls back to phase 1 rather than crashing when a
  saved `currentPhase` no longer exists in the lesson's (changed) phase
  list — but that student's progress on the old shape is effectively
  lost. Worth checking whether any real students have in-progress saves
  on `SS-3-2A-BR`, `SS-3-2B-BR`, or `SCI-3-6B-BR` before this ships, given
  it's early in the school year.

## 9. What's next

1. **Runtime-test the 3 rebuilt lessons** (see §8) before assigning them.
2. Run the SQL migration and confirm the DB-driven parts (teacher assign
   screen minutes, in-progress-submission check) are handled.
3. Build **Sequence It** into an actual lesson (built, not yet proven out
   by a pilot — worth doing before trusting it for a full batch run).
4. Revisit the AI-generation pipeline itself (reusing the existing Case
   Builder tool's upload/stage/review pattern was the working idea), now
   grounded in a real reference-cache format and a real checker, plus an
   honest sense of where both still need a human's eyes (readability
   flags, the coverage checker's synonym-blindness, hotspot placement).
