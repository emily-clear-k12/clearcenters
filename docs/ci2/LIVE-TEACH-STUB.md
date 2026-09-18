# CI2.0 · Live teach shell (present mode stub)

Branch: `ci2-sandbox`  
Routes: Daily Focus teach block → **Teach live** → `/v2/teacher/live-teach/[id]`

## Why
Teachers need a **calm present mode** from Daily Focus teach blocks — big objective, beat 1/2/3, next/back, **Assign practice** — without opening a slide deck builder. Glance-first skeleton only.

## Layout
- Teach purple whisper · title · TEKS / day / time chips
- **Big objective** card
- Beat chips (1 · 2 · 3) + large beat title / detail
- **← Back** / **Next →** · **Assign practice**
- Footer: Daily Focus · Lesson plan · Project

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. Find a **Teach** row (e.g. Wed · Equivalent fractions)
3. Tap **Teach live** → `/v2/teacher/live-teach/act-8`
4. Glance big objective · advance Beat 1 → 2 → 3
5. (Optional) Setup → departmentalized · select a period (sets `ci2.teacher.classFilter`)
6. **Assign practice** → “Practice on My Day ✓” (writes `ci2.practice.assigned`) **and** mints a planner tile (`added-live-*` · `fromLiveTeach`) stamped with current period (`resolveLibraryClasses` — same pattern as Library Add)
7. Open **Daily Focus** / **This Week** (same period) → quiet **From live teach** provenance; switch room filter → tile follows stamped period; first time → **Tiles remember where they came from.** (dismissible)
8. Open `/v2/student` (same browser) → practice card under Now / Next / Later
9. **Start** → `/v2/student/activity/practice-[id]` (activity stub) · Submit marks progress
10. Optional: **Lesson plan** / **Project** · **← Daily Focus**

## Tone
- Calm glass present mode — 80% beauty / 20% teach purple grammar
- Not PowerPoint, not a pacing guide, not an authoring tool

## Provenance + period stamp
Assign practice also writes `ci2.teacher.addedActivities` (`added-live-*`, `fromLiveTeach: true`). Daily Focus / This Week show quiet **From live teach** via `plannerProvenanceLabel` (same helper as Library / Check-ins / Sunday).

Minted tiles get `classes: [currentFilter]` from `ci2.teacher.classFilter` via `resolveLibraryClasses` (or `"all"` when filter is all / unset) — same period stamp as Library Add. Provenance stays **From live teach**; period stamp only affects which room sees the tile. My Day practice entries also carry `periodId` / `classes` for quiet continuity.

## Files
- `lib/v2/demoLiveTeach.js` — stub model + `LIVE_TEACH_HREF` + practice assign + `mintLiveTeachPracticeToPlanner` (period stamp via `resolveLibraryClasses`)
- `lib/v2/demoLibrary.js` — `plannerProvenanceLabel` (“From live teach”)
- `app/v2/teacher/live-teach/[id]/` — page + `LiveTeachClient`
- `app/v2/student/StudentMyDayClient.js` — reads practice into Now/Next/Later
- `lib/v2/demoStudentActivity.js` — resolves `practice-*` missions
- `app/v2/teacher/StationDayClient.js` — Teach live on agenda + detail · provenance chips
- `app/v2/teacher/StationWeekClient.js` — compact Live on teach tiles · provenance chips
- `docs/ci2/LIVE-TEACH-STUB.md` — this note

## Gaps (out of scope)
- No real slides / media / timers / roster display
- Practice / planner bridges are same-browser localStorage only (no roster push / Supabase)
- Period stamp reads `ci2.teacher.classFilter` at assign time (not live SIS membership)
- Spine copy shared with Lesson plan stub
- Do **not** merge to `main`
