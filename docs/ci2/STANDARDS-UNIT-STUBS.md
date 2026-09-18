# CI2.0 · Standard info + Unit teaching guide stubs

Branch: `ci2-sandbox`  
Emily approved: skeleton pages so Project one-pager links (commit `deb96ed`) aren’t dead.

## Routes
| Page | Path | Accent |
|------|------|--------|
| **Standard info** | `/v2/teacher/standards?from={activityId}#{TEKS}` | Teach purple (`GLANCE.teach`) |
| **Unit teaching guide** | `/v2/teacher/unit-guide?from={activityId}#{activityId}` | Project indigo (`GLANCE.project`) |

Hash picks the standard / unit context; `?from=` keeps **← Back to Project** warm. Both also link **← Daily Focus**.

## Glance-first
- Chips + short SAM line on open
- Body fills the glass card (plain words / spine / tips)
- **Details · rare extras** for “not a real TEKS DB / PDF” notes
- Soft accents only — 80% beauty / 20% grammar

## Standard info (stub)
- TEKS code label
- Kid-friendly **in plain words**
- **3 mastery look-fors**
- Back → Project / Daily Focus

## Unit teaching guide (stub)
- Unit title (from `SUBJECTS[].unit`, e.g. Fractions)
- **3–5 day spine** (mirrors Project checkpoint beats when opened from a teach)
- Materials · time stub
- **3 teach tips** (chips / short lines)
- Back → Project / Daily Focus

## Click tour
1. Daily Focus → teach **Project** (e.g. `/v2/teacher/project/act-8`)
2. **Standard info** → plain words + look-fors → **← Back to Project**
3. **Unit teaching guide** → spine + tips → **← Back to Project** / Daily Focus

## Files
- `lib/v2/demoStandardsUnit.js` — stub copy + resolvers
- `lib/v2/demoProject.js` — `standardInfoHref` / `unitGuideHref` with `?from=` + hash
- `app/v2/teacher/standards/` — page + client
- `app/v2/teacher/unit-guide/` — page + client
- `docs/ci2/STANDARDS-UNIT-STUBS.md` — this note
- `docs/ci2/PROJECT-ON-TEACH.md` — parent Project one-pager

## Gaps (out of scope)
- Full TEKS database / official wording packs
- Real curriculum PDF import or district pacing
- Student-facing guides
- Merge to `main`
