# CI2.0 · Live teach shell (present mode stub)

Branch: `ci2-sandbox`  
Routes: Daily Focus teach block → **Teach live** → `/v2/teacher/live-teach/[id]`

## Why
Teachers need a **calm present mode** from Daily Focus teach blocks — big objective, beat 1/2/3, next/back, assign-practice stub — without opening a slide deck builder. Glance-first skeleton only.

## Layout
- Teach purple whisper · title · TEKS / day / time chips
- **Big objective** card
- Beat chips (1 · 2 · 3) + large beat title / detail
- **← Back** / **Next →** · **Assign practice (stub)**
- Footer: Daily Focus · Lesson plan · Project

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. Find a **Teach** row (e.g. Wed · Equivalent fractions)
3. Tap **Teach live** → `/v2/teacher/live-teach/act-8`
4. Glance big objective · advance Beat 1 → 2 → 3
5. **Assign practice (stub)** → “Practice queued ✓”
6. Optional: **Lesson plan** / **Project** · **← Daily Focus**
7. Optional: teach detail panel also shows **Teach live**

## Tone
- Calm glass present mode — 80% beauty / 20% teach purple grammar
- Not PowerPoint, not a pacing guide, not an authoring tool

## Files
- `lib/v2/demoLiveTeach.js` — stub model + `LIVE_TEACH_HREF`
- `app/v2/teacher/live-teach/[id]/` — page + `LiveTeachClient`
- `app/v2/teacher/StationDayClient.js` — Teach live on agenda + detail
- `app/v2/teacher/StationWeekClient.js` — compact Live on teach tiles
- `docs/ci2/LIVE-TEACH-STUB.md` — this note

## Gaps (out of scope)
- No real slides / media / timers / roster display
- Assign practice does not write student My Day yet
- Spine copy shared with Lesson plan stub
- Do **not** merge to `main`
