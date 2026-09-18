# CI2.0 · Project button on teach blocks

Branch: `ci2-sandbox`  
Routes: `/v2/teacher/day` → **Project** → `/v2/teacher/project/[id]`

## Why
Emily locked **Project button on teach blocks** — teach heart only, not every chip. Teachers need a calm path from Daily Focus into a lightweight multi-day / evidence-product shell without opening a full project builder (out of scope).

**Teacher one-pager (locked):** glass card, **two columns**. Default feels complete — no need to open Details. Details only for rare extras (evidence body, non-teach note, span dates).

## Layout
| Column | Role |
|--------|------|
| **LEFT (narrow)** | SAM one-liner · title · chips (evidence / days / audience) · Who it’s for toggle · primary **Assign to My Day** + **← Back** |
| **RIGHT (wider)** | Condensed teacher notes — TEKS/standard one-liner · checkpoint beats (1–2 lines each) · materials/time stub · links **Standard info** + **Unit teaching guide** (skeleton pages) |

Small group → demo names + **Check-ins →** (not “Who needs me”).

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. Agenda shows teach blocks first (Now / Next / Later). Find a **Teach** row (e.g. Wed · Equivalent fractions).
3. Tap **Project** on that teach card (or open the detail pane → **Project**).
4. Land on `/v2/teacher/project/act-8` (or matching id) — **one-pager**:
   - Left: SAM · title · chips · Who it’s for · **Assign to My Day** / Back
   - Right: TEKS one-liner · Day 1/2/3 beats · materials/time · **Standard info** + **Unit teaching guide**
5. Tap **Standard info** → `/v2/teacher/standards?from=act-8#4.3C` — TEKS · plain words · 3 look-fors → **← Back to Project** (or Daily Focus).
6. Tap **Unit teaching guide** → `/v2/teacher/unit-guide?from=act-8#act-8` — unit title · 3–5 day spine · materials · teach tips → **← Back to Project** / Daily Focus.
7. Optional: toggle **Small group** → tiny demo names (Kai · Riley) + **Check-ins →**.
8. Details only if you want evidence body / extras.
9. **Assign to My Day** → writes `ci2.project.assigned` + remembers audience in `ci2.project.audience`.
10. **← Back** returns to the teach day.
11. Optional: **This Week** teach tiles also show a compact **Project** (same shell).
12. Student: `/v2/student` shows a **Later · Project** card when assigned — evidence product name (and “small group” if chosen).
13. **Open** → `/v2/student/project/[id]` light shell: checkpoint chips · evidence product · Submit stub (queues grading like activity Submit).


## Tone
- Assistant, not LMS — glass / StationShell, lavender primary, indigo Project glance cue.
- Beauty first; grammar whisper. One-pager over walls of text.

## Teach vs assignment
| Kind (`demoWeek.KINDS`) | Project button? |
|-------------------------|-----------------|
| `teach` | Yes — Daily Focus agenda + detail; This Week compact |
| `work` / `small` | No |

Demo teach examples (ids stable from `DEMO_ACTIVITIES` order): `act-8` Equivalent fractions (Wed), `act-1` Comparing fractions (Mon), `act-29` Mixtures & solutions (Wed science).

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.project.assigned` | Teacher “Assign to My Day” stubs → student Later · Project cards (includes `evidenceLabel`, `audienceId` / `audienceLabel`) |
| `ci2.project.audience` | Last Who-it’s-for choice per activity id |
| `ci2.teacher.addedActivities` | Existing Add tiles (shell can resolve by id if Project opened on an added teach) |
| `ci2.student.missionProgress` | Student Submit project marks mission done |
| `ci2.grading.inbox` | Project Submit enqueues like activity Submit (same browser) |

## Files
- `lib/v2/demoProject.js` — resolve activity, span, checkpoints, SAM, evidence, materials/standard stubs, assign payload, stub hrefs (`?from=` + hash)
- `lib/v2/demoStandardsUnit.js` — Standard info + Unit teaching guide stub models
- `app/v2/teacher/project/[id]/` — page + `ProjectShellClient` (two-column one-pager)
- `app/v2/teacher/standards/` — Standard info skeleton (teach purple whisper)
- `app/v2/teacher/unit-guide/` — Unit teaching guide skeleton (project indigo whisper)
- `app/v2/teacher/StationDayClient.js` — Project → route
- `app/v2/teacher/StationWeekClient.js` — optional Project on teach tiles
- `app/v2/student/StudentMyDayClient.js` — Later · Project card
- `docs/ci2/PROJECT-ON-TEACH.md` — this note
- `docs/ci2/STANDARDS-UNIT-STUBS.md` — Standard info + Unit guide stub note
- `docs/ci2/CHECK-INS.md` — Check-ins (display); route `/who-needs-me`
- `docs/ci2/GLANCE-GRAMMAR.md` — soft meaning cues

## Gaps (out of scope)
- No full project builder, rubrics engine, or real multi-week planner
- Checkpoints + evidence + materials are stub copy (not live planner / grading)
- Standard info / Unit teaching guide are **skeleton pages** (plain words / spine stubs) — not a TEKS DB or curriculum PDF import
- Small group is stub only — demo names + Check-ins link; no roster sync
- Student Open launches a **light project shell** (not a full multi-day player / rubric engine)
- No SIS / multi-device sync; localStorage only
- Assign does not create week tiles or publish to a roster
- Family one-liner / SAM draft not in this pass
- Do **not** merge to `main`