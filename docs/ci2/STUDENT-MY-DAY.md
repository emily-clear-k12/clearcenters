# CI2.0 Student · My Day (skeleton)

Branch: `ci2-sandbox` · Route: `/v2/student`

## Click path
`/v2` → **Student · My Day** → Now / Next / Later → **Start** on Now → `/v2/student/activity/[id]` → Submit → My Day progress (checkmark + NOW advances). Optional: **Print** → glance-first paper sheet.

See also: [STUDENT-ACTIVITY-STUB.md](./STUDENT-ACTIVITY-STUB.md)

## Demo
- Students: **Leo · Kai · Riley** switcher on My Day (light chips — not a roster)
- Default: **Leo** (Room 12 · Mrs. Barrons); switch persists in `ci2.student.demoKid`
- Today: Wednesday (matches teacher Daily Focus `d=2`)
- Missions from teacher Wed: Equivalent fractions (ClearLesson), The Pizza Problem (Center), Purpose match stations (may-do)
- Per-kid namespaces so demos don’t collide: progress / Teacher checked / practice assigned

## Empty day
- When My Day has **no missions** → calm empty glass + one primary **Start first mission** (opens demo Now activity stub) — glance-first, not a gray void

## Demo student switcher
1. `/v2/student` → chips **Leo / Kai / Riley**
2. Complete a mission as Leo → checkmark sticks
3. Switch to Kai → empty progress (own namespace)
4. Switch back to Leo → Leo’s checkmarks return

## Teacher Add bridge
- Key: `ci2.teacher.addedActivities` (localStorage, same browser)
- `usePlanner` persists Add / suggestion tiles; Student My Day surfaces today’s extras near Now
- **Gap:** only works same browser/device; no publish, no Supabase, no cross-device
- **Gap:** base demo tiles (non-Add) are not mirrored live from teacher board edits — curated `DEMO_STUDENT_DAY` only
- Progress key: `ci2.student.missionProgress.{kid}` (activity Submit; Leo migrates legacy unscoped key)
- Active kid: `ci2.student.demoKid`
- Out of scope: auth, full SAM chat, game worlds, merge to main

## Practice from Teach live
- Teacher **Assign practice** on `/v2/teacher/live-teach/[id]` → key `ci2.practice.assigned.{kid}` (defaults to active/Leo)
- Student My Day shows a **Practice** card in Now / Next / Later (may-do by default)
- **Start** reuses the activity stub (`practice-[activityId]`)
- See also: [LIVE-TEACH-STUB.md](./LIVE-TEACH-STUB.md)

## Later · Project
- Teacher **Assign to My Day** → Later · Project card (evidence label · optional small group)
- **Open** → `/v2/student/project/[id]` — checkpoint chips, evidence product, Submit stub
- Submit marks progress + queues teacher grading (`ci2.grading.inbox`) like activity Submit
- See also: [PROJECT-ON-TEACH.md](./PROJECT-ON-TEACH.md) · [STUDENT-TOOLS.md](./STUDENT-TOOLS.md)


## Print My Day
- **Print** on My Day header → browser print dialog
- Print-friendly CSS (same spirit as lesson plan): `.ci2-myday-print` sheet · `.ci2-no-print` hides demo chips / prefs / Tools / Start CTAs / toast
- On screen stays glance-first (Now → Next → Later cards)
- No server PDF — `window.print` only

## Preferences stub
- Light prefs chip on My Day: display name · text size S/M/L · sound on/off
- Per-kid localStorage (`ci2.student.prefs.{kid}`) — see [STUDENT-PREFS-STUB.md](./STUDENT-PREFS-STUB.md)

## Teacher checked stamp
- Teacher **Confirm** in Grading stamps the matching mission/practice on My Day (`ci2.student.teacherChecked.{kid}` · namespace from submission `studentFirst`)
- Calm mint chip: **Teacher checked** — not a scary grade badge
- Live submits use `missionId`; demo rows may match by title (pizza / equivalent / purpose)
- Same-browser localStorage only

## SAM celebrate on Teacher checked
- When a **new** Teacher checked stamp appears (live event or on load), SAM glance line celebrates **once** (calm kid voice via `samTeacherChecked`)
- Uses existing `SamBubble` / `setSamMsg` pattern — not a full SAM chat
- Celebrated ids stored in `ci2.student.teacherCheckedCelebrated.{kid}` so refresh doesn’t re-cheer
- Same-browser only; clear site data to reset

## Files
- `app/v2/student/StudentMyDayClient.js` — My Day shell · Print + print CSS
- `lib/v2/demoStudentDay.js` — day model / teacher-add bridge
- `docs/ci2/STUDENT-MY-DAY.md` — this note

## Gaps (print)
- Print is `window.print` + CSS only (no server PDF / email-home pack)
- Demo switcher / prefs / Tools chrome hide on paper; mission CTAs hide so the sheet stays glance-first
- Do **not** merge to `main`
