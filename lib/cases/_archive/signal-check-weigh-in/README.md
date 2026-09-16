# Signal Check — Weigh-In cases (archived Sept 16, 2026)

These are the 86 Weigh-In cases (public + server rubric for each) that used to
run as a second Signal Check format. Nothing in the app imports this folder, so
these files don't ship and don't show up anywhere for teachers or students.
They're parked here rather than deleted because the format may come back.

## Why it was pulled

The idea was sound — two cadets disagree, the student sorts the evidence and
picks the side it actually supports. The execution wasn't:

1. **There was nothing to weigh.** Across all 86 cases the correct side had an
   average of 4.7 supporting evidence readings and the opposing side had 0.1.
   In every single case the right answer was simply the side with more chips,
   so a student could win by counting instead of reading.
2. **The evidence picks weren't graded.** `gradeWeighIn` gave full marks for the
   correct side plus *any* two evidence selections. Whether those two readings
   had anything to do with the claim was never checked.
3. **Teachers saw a JSON dump.** The grading page had no real view for this
   format — just `{"sideId": "B", "reasonEvidenceIds": [...]}` with raw ids.

## What it would take to bring it back

The code side is small — a grading function that actually checks the evidence
ids against the rubric, and a teacher-facing view like the one Verdict cases
get. The real work is content: every case needs genuine, plausible evidence
supporting *both* sides, so that picking the right one requires judgment. That
means rewriting the `evidence` array in all 86 public files, not just
rebalancing the `supports` labels on the ones that are there.

The `rulingMustInclude` lists in the server files were written for a typed
ruling that never got built, so they'd need revisiting too.
