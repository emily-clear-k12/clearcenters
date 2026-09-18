# CI2.0 · Project button on teach blocks

Branch: `ci2-sandbox`  
Routes: `/v2/teacher/day` → **Project** → `/v2/teacher/project/[id]`

## Why
Emily locked **Project button on teach blocks** — teach heart only, not every chip. Teachers need a calm path from Daily Focus into a lightweight multi-day / evidence-product shell without opening a full project builder (out of scope).

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. Agenda shows teach blocks first (Now / Next / Later). Find a **Teach** row (e.g. Wed · Equivalent fractions).
3. Tap **Project** on that teach card (or open the detail pane → **Project**).
4. Land on `/v2/teacher/project/act-8` (or matching id): title, TEKS stub, days span, evidence product stub.
5. Optional: **Assign to My Day** → writes `ci2.project.assigned` (same browser).
6. **← Daily Focus** / **Back to Daily Focus** returns to the teach day.
7. Optional: **This Week** teach tiles also show a compact **Project** (same shell).
8. Optional student: `/v2/student` shows a **Later · Project** card when assigned (Open = calm toast; no full player yet).

## Tone
- Assistant, not LMS — glass / StationShell, lavender primary, cream soft notes.
- Ready / needs-you language elsewhere; here: “skeleton only,” “when you’re ready.”

## Teach vs assignment
| Kind (`demoWeek.KINDS`) | Project button? |
|-------------------------|-----------------|
| `teach` | Yes — Daily Focus agenda + detail; This Week compact |
| `work` / `small` | No |

Demo teach examples (ids stable from `DEMO_ACTIVITIES` order): `act-8` Equivalent fractions (Wed), `act-1` Comparing fractions (Mon), `act-29` Mixtures & solutions (Wed science).

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.project.assigned` | Teacher “Assign to My Day” stubs → student Later · Project cards |
| `ci2.teacher.addedActivities` | Existing Add tiles (shell can resolve by id if Project opened on an added teach) |

## Files
- `lib/v2/demoProject.js` — resolve activity, days-span / evidence stubs, assign helpers
- `app/v2/teacher/project/[id]/` — page + `ProjectShellClient`
- `app/v2/teacher/StationDayClient.js` — Project → route (was toast stub)
- `app/v2/teacher/StationWeekClient.js` — optional Project on teach tiles
- `app/v2/student/StudentMyDayClient.js` — Later · Project card when assigned
- `docs/ci2/PROJECT-ON-TEACH.md` — this note

## Gaps (out of scope)
- No full project builder, rubrics engine, or real multi-week planner
- Days span + evidence product are copy stubs only
- Student Open on Project does not launch a real activity player (toast only)
- No SIS / multi-device sync; localStorage only
- Assign does not create week tiles or publish to a roster
- Do **not** merge to `main`