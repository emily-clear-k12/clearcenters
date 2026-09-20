# CI2.0 · Reports (class story)

Branch: `ci2-sandbox`  
Route: `/v2/teacher/reports`

## Why
Teachers need a **memorable class story** — who needs a look, on which skill, from which work — not a demo chip wall or gradebook. Soft story language + named sandbox clusters. One **live** spark: Check-ins waiting.

## Signature move
**SAM · story card** leads the glance and the standard drill-in: one paragraph that names the softest skill, the soft cluster (who), and the evidence work. Drill-ins feel like a **paper report**, not another glass list.

## Glance (MAP)
- Quiet honesty once: **Sample class · not live yet** (small, not shouting DEMO)
- Soft readiness as words: **Mostly clear / Mixed / Needs a look** — not `~55% · demo`
- Needs hints without `Demo ·` prefix
- **Skill ↔ evidence** trail: each standard row nests its lead assignment (one connected narrative)
- Soft clusters show kid names (Kai · Riley · Diego) from sandbox roster
- Primary next-move → softest **standard** report; Check-ins secondary
- Amber **only** when live Check-ins waiting > 0

## Drill-ins (distinct layouts)
1. **Standard** `/v2/teacher/reports/standard/[code]` — accent paper · SAM story · named soft cluster · numbered evidence trail · one calm next · Check-ins secondary
2. **Assignment** `/v2/teacher/reports/assignment/[id]` — what-happened lead · soft clusters with names (not 12/8/5 chrome) · skill trail back to standards · calm next

## Honesty
| Surface | Real? |
|---------|-------|
| Soft readiness / who clusters / band stories | **Sample** — demo kids (Kai, Riley, Maya, Leo, …) |
| Summary **Check-ins waiting · n · live** | **Real** same-browser `getWhoNeedsMeCount()` (period lens) |

## Gaps
- No live analytics / SIS % / gradebook export
- Do **not** merge to `main`; do not touch live Crystal Instruction or kid grading

## Files
- `lib/v2/demoReports.js` — story helpers, clusters, `getReportsStub` / `getStandardDetail` / `getAssignmentDetail`
- `app/v2/teacher/reports/ReportsClient.js` — glance MAP + SAM story card
- `app/v2/teacher/reports/standard/[code]/` — standard report
- `app/v2/teacher/reports/assignment/[id]/` — assignment report

## Loop seams (Focus ↔ Check-ins ↔ Reports)
Shared story labels + soft who live in `lib/v2/demoLoopSeams.js` (wraps `demoReports`).
Daily Focus SAM watch/win and Check-ins story band use the same softest cluster (Sofia · Noah · Diego on 5.6B) so Reports is not an island.
