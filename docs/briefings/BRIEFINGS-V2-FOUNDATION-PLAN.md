# ClearCenters — Briefings v2 Foundation Plan

**Context:** v1 shipped 3 lessons (SS-3-2A, SS-3-2B, SCI-3-6B) as proof of
concept. Emily's assessment after living with them: she wants to scrap and
rebuild all three, and she's now thinking 3/4/5 × Social Studies/Science —
a real production catalog, generated with AI batching rather than
hand-authored. This doc locks the foundation that has to exist *before*
any of that content gets (re)written, per her own instinct: "build the
foundation now... precisely because manual quality control doesn't scale."

**Status:** foundation built and verified Sept 14, 2026. Pilot rebuild
(SS-3-2A, SS-3-2B, SCI-3-6B against this foundation) is the next phase,
not yet started.

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
`.../scienceLightReview.schema.js`. Both target **20 minutes** (range
18-23 for SS, 17-22 for Science) — Emily's call after going back and forth
between 15 and 20 ("stations are on average about 20 minutes... yes i
think that sounds right"). The lightness of Science is about phase
count/depth, not a shorter clock.

**SS full lesson** (first-teach) — 6 phases, unchanged from v1's spine:

| Phase | Role | Minutes | Purpose |
|---|---|---|---|
| intelDrop | hook | 2 | Concrete mystery/scene, chip-only claim |
| fieldBrief | teach | 7 | Real first-teach: vocab + beats + quick checks |
| practice | practice | 5 | ONE mechanic from the fixed menu (§2) |
| opsChoice | apply | 4 | Scenario trade-off decision |
| evidenceDrop | evidence | 2 | Small produced artifact (postcard-style) |
| clearance | assess | 4 | Explained quiz, gated on progress |

**Science light review** — 5 phases, deliberately lighter:

| Phase | Role | Minutes | Purpose |
|---|---|---|---|
| intelDrop | hook | 2 | "Remember when..." retrieval hook, not a fresh mystery |
| quickReview | review | 4 | Short recap + vocab refresh — NOT full first-teach beats |
| practice | practice | 5 | First mechanic rep |
| practice | practice | 5 | Second rep, a DIFFERENT mechanic — carries the "apply" weight SS gets from Ops Choice |
| clearance | assess | 4 | Same explained-quiz requirement as SS |

No separate opsChoice/evidenceDrop in Science — cut on purpose to stay
"light touch," per Emily's own framing.

## 2. The practice-mechanic library (fixed menu)

`lib/briefings/schema/mechanics.schema.js`. Every `practice` phase in
either shape picks ONE of these — a lesson never invents new UI:

- **reasonSort** — kept from v1 (drag/tap clues into bins)
- **matchPairs** — connect two related things (term ↔ meaning, clue ↔ reason)
- **sequenceIt** — put 3-5 steps/events in order
- **labelPicture** — tap a hotspot on an image, place the right label (prior art: `Claude outputs/hotspot_check_new.png`)
- **trueFalseReason** — true/false where every answer surfaces a one-line reason, right or wrong

Same public/server split as v1's Reason Sort: the public pack never ships
an answer key (correct pairing, order, or hotspot label lives in the
paired `.server.js` file). This is also exactly what an AI generator
needs — a closed set of shapes to fill in, not a blank canvas, and the
same shape a checker can validate mechanically.

## 3. Engagement — decided, not just brainstormed

`lib/briefings/schema/engagement.schema.js`. From the "how do we make
this fun without being a boring paragraph" discussion:

- **Keep:** a footprints/stepping-stone progress trail instead of a bare
  "Phase 3 of 5" label.
- **Keep:** a hidden, ungraded bonus fact/joke from S.A.M. after
  Clearance — a "worth finishing" payoff separate from Crystal Points.
- **Rejected:** a confetti/celebration burst on every correct tap.
  Emily's words: "i dont like the little celebration." The schema file
  has an explicit comment (and the validator throws) if this gets
  re-added without raising it with her again first.

## 4. The TEKS-alignment + readability checker

`scripts/briefings-checker.js` — run it against any `*.public.js` pack:

```
node scripts/briefings-checker.js lib/briefings/SS-3-2A-BR.public.js
```

Two checks, per the "not just a gut call" conversation:

1. **TEKS coverage** — splits the standard's own wording into its
   sub-parts (handles both "including A, B, and C" list-style standards
   and compound-clause standards like Science's, which needed a smarter
   clause-boundary heuristic than a flat comma split), then checks each
   sub-part is taught, practiced, AND tested somewhere in the lesson. Uses
   bag-of-words + light stemming, not exact-phrase matching, so
   deliberate kid-friendly paraphrasing ("keeps its own shape" for the
   standard's "definite shape") doesn't get wrongly flagged as missing.
2. **Readability** — real Flesch-Kincaid grade-level scoring (ceiling
   3.5 for grade 3) on actual kid-facing prose fields only (ids/enums/keys
   are excluded — an early version of this script was scoring strings
   like `"chipsOnly"` and flagging them at grade 20+, which was noise, not
   signal). TEKS vocabulary terms are excused from the score as long as
   they're in `fieldBrief.vocab` with their own definition — the agreed
   exception, since "material well-being" is legitimately above grade
   level but fine with a definition card.

**Verified against real content**, not just written and trusted:
SS-3-2A and SS-3-2B both come back with full TEKS coverage and zero (or
near-zero) readability flags — genuinely clean. SCI-3-6B comes back with
full solid/liquid/gas coverage but a real, worth-double-checking gap:
the "liquids and gases take the shape of their container" claim isn't
clearly hit in the Clearance quiz specifically. That's a concrete, useful
finding for the rebuild, not a hypothetical.

**Known limitation, stated plainly rather than papered over:** this is
keyword/bag-of-words matching, not semantic understanding. A true
synonym with zero shared words (e.g. "law" reworded as "rule" with no
overlap) can still slip past as a false gap or false pass. Treat every
flag as "go double-check this by eye," not as proven ground truth — which
is also why "even a clean checker pass deserves a teacher's eyes" stays
true for AI-generated content, not just hand-written content.

## 5. The TEKS reference cache (the AI's research, done once)

`docs/briefings/teks-reference/` — one file per standard, researched from
teksguide.org + lead4ward per Emily's explicit instruction, meant to be
what a future AI generation step reads instead of live-scraping those
sites on every run (her call, and the right one: lead4ward blocks direct
fetching outright, and live-scraping at generation time is slow and
fragile). Built and reviewed for the 3 pilot standards now
(`SS-3-2A.md`, `SS-3-2B.md`, `SCI-3-6B.md`) — see that folder's `README.md`
for the full method and its own list of limitations found along the way,
most importantly:

- **teksguide.org has no Social Studies coverage at all** (confirmed
  directly against its subject list) — for SS standards, lead4ward and
  the official Texas Administrative Code text have to carry the research,
  not teksguide.
- **A lead4ward mirror can be stale.** The first Grade 3 SS snapshot
  found still had 3.2B's pre-2022 wording. Caught by cross-checking the
  official current TAC text (regulations.justia.com / law.cornell.edu —
  not robots-blocked). Any future research pass should treat the TAC
  text as the tie-breaker for exact wording, and lead4ward/teksguide as
  the source for vocabulary, misconceptions, and STAAR classification.
- **Science TEKS numbering**: this project's SCI-3-6B is 3.5(B) under the
  standards that took effect in the 2024-2025 school year. Flagged to
  Emily Sept 14; her call was to leave the content ID as-is for now — on
  record in `SCI-3-6B.md` in case it needs revisiting once the batch
  scales past these 3 pilot standards.

## 6. What's next

1. **Rebuild the 3 pilot lessons** against this foundation — SS-3-2A and
   SS-3-2B into the full-lesson shape (mostly a re-structure/mechanic-swap
   of solid existing content), SCI-3-6B into the light-review shape (a
   genuine rebuild, not a re-structure, since v1's version was really a
   first-teach in disguise). Run each through the checker before calling
   it done.
2. **Build the 4 new mechanic components** (Match Pairs, Sequence It,
   Label the Picture, True/False-with-Reason) as generic, data-driven
   React components conforming to `mechanics.schema.js`'s public/server
   contracts, and wire them into the phase player alongside the existing
   Reason Sort.
3. Once the pilot proves the shapes + mechanics + checker work together
   end to end, revisit the AI-generation pipeline itself (reusing the
   existing Case Builder tool's upload/stage/review pattern was the
   working idea) — now with a real reference-cache format and a real
   checker to gate its output, instead of designing that pipeline against
   a hypothetical.
