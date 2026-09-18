# CI2.0 Student · My Day (skeleton)

Branch: `ci2-sandbox` · Route: `/v2/student`

## Click path
`/v2` → **Student · My Day** → Now / Next / Later → **Start** on Now → `/v2/student/activity/[id]` → Submit → My Day progress (checkmark + NOW advances).

See also: [STUDENT-ACTIVITY-STUB.md](./STUDENT-ACTIVITY-STUB.md)

## Demo
- Student: **Leo** (Room 12 · Ms. Rivera)
- Today: Wednesday (matches teacher Daily Focus `d=2`)
- Missions from teacher Wed: Equivalent fractions (ClearLesson), The Pizza Problem (Center), Purpose match stations (may-do)

## Teacher Add bridge
- Key: `ci2.teacher.addedActivities` (localStorage, same browser)
- `usePlanner` persists Add / suggestion tiles; Student My Day surfaces today’s extras near Now
- **Gap:** only works same browser/device; no publish, no Supabase, no cross-device
- **Gap:** base demo tiles (non-Add) are not mirrored live from teacher board edits — curated `DEMO_STUDENT_DAY` only
- Progress key: `ci2.student.missionProgress` (activity Submit)
- Out of scope: auth, full SAM chat, game worlds, merge to main

## Practice from Teach live
- Teacher **Assign practice** on `/v2/teacher/live-teach/[id]` → key `ci2.practice.assigned`
- Student My Day shows a **Practice** card in Now / Next / Later (may-do by default)
- **Start** reuses the activity stub (`practice-[activityId]`)
- See also: [LIVE-TEACH-STUB.md](./LIVE-TEACH-STUB.md)

## Later · Project
- Teacher **Assign to My Day** → Later · Project card (evidence label · optional small group)
- **Open** → `/v2/student/project/[id]` — checkpoint chips, evidence product, Submit stub
- Submit marks progress + queues teacher grading (`ci2.grading.inbox`) like activity Submit
- See also: [PROJECT-ON-TEACH.md](./PROJECT-ON-TEACH.md) · [STUDENT-TOOLS.md](./STUDENT-TOOLS.md)
