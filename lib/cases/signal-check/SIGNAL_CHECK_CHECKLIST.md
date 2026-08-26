# Signal Check case checklist

Every new Signal Check case (`lib/cases/signal-check/*.public.js` + `.server.js`)
needs ALL of the following before it's considered done and ready to push.
This exists because several of these got missed in earlier passes — lesson
summaries, S.A.M. hints — so treat this as the actual definition of "done,"
not a nice-to-have.

## 0. Is this standard even a good fit?

Not every TEKS standard should get a Signal Check case. Before writing
anything, check that the standard supports:
- A believable claim a student could actually walk in already believing —
  not arbitrary trivia.
- Evidence that can be concretely shown or stated (a photo, a data log, a
  primary source) — not a purely abstract/procedural concept.
- Ideally, room for a "Misleading" verdict, not just a flat True/False —
  that's what forces real reasoning instead of a 50/50 guess.

If a standard doesn't clear this bar, leave it as Group Chat only. We are
not trying to cover every standard, just most of the ones this format
actually suits.

## 1. TEKS verification

Never invent or guess a TEKS code. Look it up in Emily's official Texas
TEKS PDFs first — see `lib/cases/TEKS_STANDARDS.md` for the naming
convention (bare code + `-SC` for Science, `SS.` prefix + `-SC` for Social
Studies, to avoid collisions with Science TEKS sharing the same number).

## 2. Case content (`.public.js`)

- `claim`/`tagline` + `transmission` claim headline.
- 3-4 `statements` ("signals"), each with a verdict from
  `["True", "Misleading", "False"]` — use Misleading where the standard
  supports real nuance, not just as a rare third option.
- `evidenceReadings` — including exactly one `kind: "distractor"` reading
  that doesn't belong to any signal.
- `sortBins` labeled by signal only (never "prove"/"disprove" — that
  spoils the verdict before the student gets there).
- `echo` flavor lines for each screen transition.
- 5 `selfCheckQuestions`.
- `fieldReport` (image + caption + notes) — prose length and vocabulary
  scaled to the grade's `stemMode` band. Before finalizing, compare
  against the sibling case at the same grade/stemMode (e.g. a new 3rd
  grade case should read about as simply as the existing 3rd grade
  cases) — don't just write to a fixed word count.

## 3. Grading rubric (`.server.js`)

- `stemMode: "dropdown"` (grade 3): `modelAnswer` + `mustInclude` array.
- `stemMode: "dropdown-open"` (grade 4) / `"open"` (grade 5): per-statement
  `{ correctVerdict, mustInclude }`.

## 4. Database fields

Every case needs all three, written together in the same INSERT/UPDATE —
not learning_target alone:
- `learning_target`
- `lesson_summary`
- `misconception_note`

SQL always goes to Emily as plain text in chat — never as a `.sql` file
attachment (standing rule, a file caused a real error once).

Before sending, verify every apostrophe inside a single-quoted string is
doubled (`''`), not a plain `'` — a plain apostrophe (e.g. "mole's",
"doesn't") silently closes the string early and throws a syntax error
several lines later, at whatever token happens to follow next. Eyeballing
it once isn't enough; write the SQL to a local file and run a
character-by-character quote-balance check (track whether you're inside
a string literal, treat `''` as an escaped pair, confirm you end outside
any string) before pasting it into chat. This caused a real failure in
Batch 2's SQL (3.13A-SC's misconception_note had two unescaped
apostrophes: "mole's" and "aren't").

## 5. S.A.M. hints

S.A.M. (ClearCenters Assistant for Missions) is app-wide, not specific to
any one activity type. Add exactly 2 case-specific hints to
`lib/hints.js`'s `CASE_HINTS`, keyed by the exact standard string
(with the `-SC` suffix). Same rule as every other hint in that file: nudge
toward one unused piece of evidence, never state the verdict.

## 6. Registry

Add the case to both `lib/cases/signal-check/index.public.js` and
`index.server.js`.

## 7. Image prompt

Lead with "what specific, changeable fact does this need to show" before
writing the scene — a static/generic photo doesn't work as evidence a
student can point to. A crossed-out price, a document-shaped composition,
numbered/labeled details all work better than a "pretty" establishing
shot. See the lemonade stand / Alamo roster / expedition journal prompts
from the first Social Studies batch as the reference bar.

## 8. Group Chat is a reference, never a source to copy

`COVERAGE_MAP.md` (next to this file) uses each standard's existing Group
Chat `trapLine` to judge whether the standard is fertile ground for a
Signal Check case — that's ALL it's for. The actual claim, scenario, and
evidence for a new Signal Check case must be freshly written, not the
Group Chat trap line reworded into a new wrapper. Same underlying
misconception is fine (that's the point of the candidacy check); same
story, characters, or specific scenario is not — a student who did Group
Chat for a standard should not feel like Signal Check is the identical
question in a different costume.

## 9. Process

- Hold all code and content locally once written; batch images together;
  one combined push once everything in a batch is ready — not a push per
  case.
- Every new case gets an outline sent for approval first — claim headline
  + signals + verdicts, freshly framed per rule 8 above, no full evidence
  prose yet. Cheap to redirect at the outline stage, expensive after
  evidence and an image already exist.
