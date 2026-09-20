# CI2.0 · Reports by standard (stub)

Branch: `ci2-sandbox`  
Route: `/v2/teacher/reports`

## Why
Teachers need a calm **glance** at a few standards — soft class ready cues and who may need a **Check-in** — without opening a spreadsheet. Skeleton only; demo bars + chips. One **live** spark: Check-ins waiting.

## Layout
- Honesty chip / banner: **Demo data · not live yet** (stub looks live — call it out)
- SAM one-liner names the **softest demo standard** (lowest classPct / needsYou, e.g. **5.6B**) + soft needs hint — not generic copy
- Summary chips (standards count · soft avg class % · softest code) + **live Check-ins waiting spark**
- 3–5 demo standard rows: TEKS · plain words · soft **~n% · demo** bar · **Demo · may need a look / looking clear** (no fake kid counts)
- Soft rows (needsYou / may need a look) are **clickable → Check-ins** (same period lens)
- Primary next-move CTA: **Open Check-ins for {softest code}** · secondary: Daily Focus / Check-ins / Family note
- Amber **only** when live Check-ins waiting > 0; honesty chip stays quiet lavender

## Honesty
| Surface | Real? |
|---------|-------|
| Class % bars / per-standard “may need” | **Demo** — soft labels only; not SIS / gradebook |
| Summary **Check-ins waiting · n · live** | **Real** same-browser `getWhoNeedsMeCount()` (period lens) |
| Spark click-through | Opens Check-ins; optional `?period=` syncs room filter |
| Do not invent precision beyond that count | — |

## Nav
| Spot | Behavior |
|------|----------|
| **V2TopBar · Grow** | Lands on `/v2/teacher/reports` |
| **TeacherSubnav · Reports** | Same stub (next to Grading) |
| **Grading · after Confirm** | Calm **See growth →** chip → Reports (nav only; no live analytics claim) |
| **Live Check-ins spark** | Click → `/v2/teacher/check-ins` (period-aware when class filter set) |

## Click tour
1. `/v2` → top bar **Grow** (or Daily Focus → subnav **Reports**)
2. See **Demo data · not live yet** chip first
3. Summary shows demo standards / soft avg % plus **Check-ins waiting · n · live** (period lens from `ci2.teacher.classFilter`)
4. Tap the live spark → Check-ins (same period when set)
5. Cards still show soft demo bars — **~n% · demo** / may need a look / looking clear
6. Footer **Check-ins →** · optional **Family note** → teacher one-pager stub (demo Kai)
7. **← Daily Focus** returns to teach today

## Files
- `lib/v2/demoReports.js` — demo rows + soft label helpers + `REPORTS_HREF`
- `app/v2/teacher/reports/` — page + `ReportsClient` (live spark · Family note entry)
- `app/v2/teacher/check-ins/CheckInsClient.js` — quiet `?period=` sync from Reports spark
- `docs/ci2/FAMILY-STUB.md` — Family note stub
- `components/v2/V2TopBar.js` — Grow → reports
- `components/v2/StationShell.js` — TeacherSubnav Reports
- `docs/ci2/REPORTS-STUB.md` — this note

## Gaps (out of scope)
- No live analytics, SIS roster %, or gradebook export
- Per-standard needs stay soft demo (only the summary Check-ins waiting spark is live)
- No filters / print / share
- Do **not** merge to `main`
