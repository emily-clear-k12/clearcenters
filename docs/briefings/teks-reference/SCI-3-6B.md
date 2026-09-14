# SCI-3-6B — Solid, Liquid, or Gas? (filed under the existing content ID
— see numbering note below)

## Standard text

> Describe and classify samples of matter as solids, liquids, and gases
> and demonstrate that solids have a definite shape and that liquids and
> gases take the shape of their container.

Confirmed identical across every current source checked (teksguide.org,
Twinkl, Teach Starter, SuperSTAAR, the lead4ward Grade 3 Science snapshot)
— the text itself isn't in question, only its number (see below). Matches
`lib/briefings/SCI-3-6B-BR.public.js`'s `teksText` verbatim.

## Numbering — flagged, decision made, kept on record

Texas revised the Science TEKS for the **2024-2025 school year**. Under
that revision this content's current official number is **3.5(B)**;
**3.6(B)** was reassigned to different content (position/motion —
pushing and pulling objects). teksguide.org's own page for this content
is still filed under the old number (`teksguide.org/teks/s36b-0`), so even
that source hasn't fully caught up.

Raised with Emily Sept 14, 2026. **Her decision: leave the content ID as
SCI-3-6B for now** rather than relabel immediately (options offered were
relabel now / check with district first / leave as-is — she chose leave
as-is). Revisit if this surfaces again — e.g. if other Science standards
in `lib/cases/TEKS_STANDARDS.md` turn out to have the same old-number
problem, or if a future batch pass into Grade 4/5 Science runs into it
again and it's worth fixing everywhere at once instead of piecemeal.

## Vocabulary (teksguide.org — glossary definitions, teacher-facing)

- **matter** — anything that has mass and takes up space
- **solid** — matter with a definite shape
- **liquid** — matter that takes the shape of its container
- **gas** — matter that spreads out to fill its container
- **physical property** — a characteristic of matter you can observe or
  measure

## Common misconceptions (teksguide.org)

- "Any substance that can be poured is a liquid" — students may
  incorrectly call small solid particles a liquid because they can be
  poured (e.g. rice, sand).
- Soft or flexible solids (cloth, a squeezable toy) get misclassified as
  liquids because they change shape when handled, even though they don't
  take the shape of a container the way a true liquid does.

## Grade-level scope note (teksguide.org — this is a real guardrail for
an AI generator, which will otherwise happily teach ahead of grade level)

Grade 3 stays at **observable properties only** — shape, whether it
pours, whether it fills a container. Explaining states of matter in terms
of particle behavior/spacing is Grade 5 content and should NOT appear
here.

## The checklist (per `scripts/briefings-checker.js`'s clause-splitting —
this standard doesn't use an "including" list, so it isn't a clean
3-item checklist the way the SS standards are; treat these as the
distinct claims a lesson needs to cover)

1. Solids — classify samples as solid
2. Liquids — classify samples as liquid
3. Gases — classify samples as gas
4. Solids have a definite (fixed) shape
5. Liquids and gases take the shape of their container

Running the checker against the existing `SCI-3-6B-BR.public.js` content
found: solids/liquids/gases are all taught, practiced, and tested; the
"liquids and gases take the shape of container" claim is taught and
practiced but not clearly hit in the Clearance quiz items specifically —
worth double-checking by eye when this gets rebuilt, not just trusting
the checker's keyword match on its own (see the checker's own code
comments on why literal/near-literal keyword matching has real limits
against deliberately kid-friendly paraphrasing).

## Notes for an AI generation pass

- This is the standard where reviewing the current content mattered most:
  it's structurally identical to the SS full-lesson template (6 phases,
  same Ops Choice mechanic, same depth) — i.e. it reads like a first-teach
  copy-pasted from the SS shape, not an actual review. That's the core
  evidence behind rebuilding Science against the new, deliberately
  lighter `scienceLightReview` schema instead of reusing the SS shape.
- Lean on the two supplied misconceptions directly in the practice phase
  content (e.g. a Match Pairs or True/False-with-Reason item built
  specifically around "if it pours, is it always a liquid?").
