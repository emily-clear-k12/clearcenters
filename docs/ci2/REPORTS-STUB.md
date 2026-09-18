# CI2.0 · Reports by standard (stub)

Branch: `ci2-sandbox`  
Route: `/v2/teacher/reports`

## Why
Teachers need a calm **glance** at a few standards — class ready % and who may need a **Check-in** — without opening a spreadsheet. Skeleton only; demo bars + chips.

## Layout
- SAM one-liner + summary chips (standards count · avg class % · Check-ins needing)
- 3–5 demo standard cards: TEKS · plain words · **class %** bar · **Check-ins · n / clear** chip
- Soft ready (teal) / needs-you (amber) washes — 80% beauty / 20% grammar
- Links: **Check-ins →** · **← Daily Focus**

## Nav
| Spot | Behavior |
|------|----------|
| **V2TopBar · Grow** | Lands on `/v2/teacher/reports` |
| **TeacherSubnav · Reports** | Same stub (next to Grading) |

## Click tour
1. `/v2` → top bar **Grow** (or Daily Focus → subnav **Reports**)
2. See 5 demo standards with bars + Check-ins chips
3. Tap **Check-ins →** → `/v2/teacher/check-ins`
4. **← Daily Focus** returns to teach today

## Files
- `lib/v2/demoReports.js` — demo rows + `REPORTS_HREF`
- `app/v2/teacher/reports/` — page + `ReportsClient`
- `components/v2/V2TopBar.js` — Grow → reports
- `components/v2/StationShell.js` — TeacherSubnav Reports
- `docs/ci2/REPORTS-STUB.md` — this note

## Gaps (out of scope)
- No live analytics, SIS roster %, or gradebook export
- Counts are demo stubs (not wired to Check-ins localStorage yet)
- No filters / print / share
- Do **not** merge to `main`
