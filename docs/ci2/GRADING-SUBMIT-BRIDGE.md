# CI2.0 · Student Submit → Teacher Grading bridge

Branch: `ci2-sandbox`  
Routes: `/v2/student/activity/[id]` → `/v2/teacher/grading`

## Why
Teacher plans, student Start/Submit, and grading inbox existed separately. This wires the basics loop in the **same browser** so a student Submit shows up as a pending item for the teacher.

## Click tour
1. `/v2` → **Student · My Day**
2. **Start** on NOW (e.g. Equivalent fractions)
3. Answer stub items → **Submit**
4. Open teacher **Check / Grading** (`/v2/teacher/grading`)
5. See **Leo**’s new item at the top (chip: Just in) · Needs you count includes it
5b. Optional: **Check-ins** → kid with pending work → **Open grading** → `/v2/teacher/grading?student=Kai` focuses/filters that student (Clear chip restores full inbox)
5c. When inbox is empty → calm glass empty state + primary **Open Daily Focus** (and **Check-ins**) — matches Check-ins empty tone
6. **Confirm** (or Skip) — confirmed IDs persist as before; Confirm also stamps matching My Day mission/practice as **Teacher checked** (calm chip) into the **demo kid namespace** matching `studentFirst` (Leo/Kai/Riley); switcher + SAM celebrate stay scoped
7. After Confirm, calm chip **See growth →** links to Reports (`/v2/teacher/reports`) — stub glance only; does **not** claim live analytics (Reports honesty: Demo data · not live yet)
8. Optional: Daily Focus SAM glance “N to grade” increments (same tab via `ci2-grading-updated`; cross-tab via `storage`)

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.student.missionProgress` | Student My Day done ids (unchanged) |
| `ci2.grading.inbox` | Live submits from student activity |
| `ci2.grading.confirmedIds` | Teacher Confirm persistence (demo + live ids) |
| `ci2.student.teacherChecked.{kid}` | Mission ids stamped when teacher Confirms (My Day calm chip · Leo/Kai/Riley namespace from `studentFirst`) |
| `ci2.student.teacherCheckedCelebrated.{kid}` | SAM celebrate-once ids per demo kid |

Live row shape mirrors demo grading items: `id` (`live-{missionId}`), `studentFirst` (Leo), `assignment`, `subject`, `product`, `submittedAt`, `workSnippet`, optional `samScore` / `samReason`.

## Files
- `lib/v2/demoGrading.js` — inbox helpers, pending merge, enqueue · `gradingInboxHref` · `findPendingForStudent`
- `app/v2/teacher/check-ins/CheckInsClient.js` — **Open grading** when pending matches kid
- `app/v2/student/activity/[id]/StudentActivityClient.js` — Submit → enqueue
- `app/v2/student/StudentMyDayClient.js` — Teacher checked chip
- `app/v2/teacher/grading/GradingInboxClient.js` — demo + live list · `?student=` focus · Confirm → **See growth →** Reports nudge · empty-state calm glass + Daily Focus / Check-ins CTAs
- `lib/v2/demoReports.js` — `REPORTS_HREF`
- `app/v2/teacher/StationDayClient.js` — SAM glance count listens to inbox key

## Gaps (out of scope)
- No real auth, class roster, or cross-device sync
- No Supabase / AI scoring API — SAM score is a stub suggestion
- Same-browser localStorage only; clearing site data resets the bridge
- Confirm stamps the kid namespace for Leo/Kai/Riley; other demo names fall back to the active demo kid so the stamp still lands
- **See growth →** is a calm nav nudge only — Reports stays demo; no live gradebook / SIS analytics
- Do **not** merge to `main`
