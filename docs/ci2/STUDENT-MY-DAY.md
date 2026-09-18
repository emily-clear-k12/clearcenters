# CI2.0 Student · My Day (skeleton)

Branch: `ci2-sandbox` · Route: `/v2/student`

## Click path
`/v2` → **Student · My Day** → Now / Next / Later → **Start** on Now (stub screen + toast).

## Demo
- Student: **Leo** (Room 12 · Ms. Rivera)
- Today: Wednesday (matches teacher Daily Focus `d=2`)
- Missions from teacher Wed: Equivalent fractions (ClearLesson), The Pizza Problem (Center), Purpose match stations (may-do)

## Teacher Add bridge
- Key: `ci2.teacher.addedActivities` (localStorage, same browser)
- `usePlanner` persists Add / suggestion tiles; Student My Day surfaces today’s extras near Now
- **Gap:** only works same browser/device; no publish, no Supabase, no cross-device
- **Gap:** base demo tiles (non-Add) are not mirrored live from teacher board edits — curated `DEMO_STUDENT_DAY` only
- **Gap:** must-do lock is client stub; no real progress sync
- Out of scope: auth, full SAM chat, game worlds, merge to main
