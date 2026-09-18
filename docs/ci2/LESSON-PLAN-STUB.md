# CI2.0 · Lesson plan stub (teacher one-pager)

Branch: `ci2-sandbox`  
Routes: `/v2/teacher/day` → **Lesson plan** → `/v2/teacher/lesson-plan/[id]`

## Why
Teachers need a calm glance-first **lesson one-pager** from Daily Focus teach blocks (and This Week) — objective, TEKS, materials, 3-beat teach spine, exit ticket stub — without opening a full planner. Same spirit as the Project one-pager; **skeleton only**.

## Layout
| Column | Role |
|--------|------|
| **LEFT** | Lesson plan label · SAM · title · TEKS / day / time chips · objective · materials · **← Daily Focus** + **Project →** |
| **RIGHT** | 3-beat teach spine · exit ticket stub · links **Standard info** + **Unit teaching guide** · Details rare extras |

Teach purple whisper (`GLANCE.teach`) — 80% beauty / 20% glance grammar.

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. Find a **Teach** row (e.g. Wed · Equivalent fractions)
3. Tap **Lesson plan** → `/v2/teacher/lesson-plan/act-8` (or matching id)
4. Glance: objective · TEKS chip · materials · 3-beat spine · exit ticket stub
5. **Standard info** → plain words / look-fors → back via browser or Daily Focus
6. **Unit teaching guide** → spine / tips
7. Optional: **Project →** for the multi-day evidence shell
8. **← Daily Focus** returns to the teach day
9. Optional: **This Week** teach tiles show compact **Lesson** + **Project**

## Tone
- Assistant, not LMS — glass / StationShell, soft teach purple
- Not a pacing guide, district PDF, or full lesson builder

## Files
- `lib/v2/demoLessonPlan.js` — stub model + `LESSON_PLAN_HREF`
- `app/v2/teacher/lesson-plan/[id]/` — page + `LessonPlanClient`
- `app/v2/teacher/StationDayClient.js` — Lesson plan on teach agenda + detail
- `app/v2/teacher/StationWeekClient.js` — compact Lesson on teach tiles
- `docs/ci2/LESSON-PLAN-STUB.md` — this note

## Gaps (out of scope)
- No full planner / pacing / print pack
- Spine + exit ticket are stub copy (not live curriculum)
- Standard info / Unit guide remain skeleton pages
- No SIS / multi-device sync
- Do **not** merge to `main`
