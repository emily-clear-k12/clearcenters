# CI2.0 · Project button on teach blocks

Branch: `ci2-sandbox`  
Routes: `/v2/teacher/day` → **Project** → `/v2/teacher/project/[id]`

## Why
Emily locked **Project button on teach blocks** — teach heart only, not every chip. Teachers need a calm path from Daily Focus into a lightweight multi-day / evidence-product shell without opening a full project builder (out of scope).

**Glance-first (locked preference):** chips + one SAM line; longer Why/TEKS / checkpoint beats live under **Details** (collapsed by default). Teachers need the info but won’t read essays.

**Thickened content (still behind glance):** checkpoints (Day 1 / 2 / 3), named **evidence product**, **Who it’s for** (whole class vs small group). Skipped: rubrics builders, standards pickers, analytics.

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. Agenda shows teach blocks first (Now / Next / Later). Find a **Teach** row (e.g. Wed · Equivalent fractions).
3. Tap **Project** on that teach card (or open the detail pane → **Project**).
4. Land on `/v2/teacher/project/act-8` (or matching id) — **lean default** (no scroll essay):
   - One **SAM** calm one-liner (e.g. “3-day fraction postcard — ready to assign.”)
   - **Summary strip**: title · evidence chip · “3 days” · audience chip
   - **Checkpoint strip**: Day 1 / 2 / 3 as short chips (Research / Draft / Share)
   - **Who it’s for** toggle only (Whole class | Small group) — tiny stub names if small group
   - **Details** collapsed — tap to expand Why/TEKS, longer beats, evidence body
5. Optional: toggle **Small group** → tiny demo names (Kai · Riley) + Who needs me link.
6. Expand **Details** when you want the essay bits.
7. **Assign to My Day** (primary CTA stays visible) → writes `ci2.project.assigned` + remembers audience in `ci2.project.audience`.
8. **← Daily Focus** / **Back to Daily Focus** returns to the teach day.
9. Optional: **This Week** teach tiles also show a compact **Project** (same shell).
10. Optional student: `/v2/student` shows a **Later · Project** card when assigned — evidence product name (and “small group” if chosen). Open = calm toast; no full player yet.

## Tone
- Assistant, not LMS — glass / StationShell, lavender primary.
- Glance-first over walls of text; Details on tap for the rest.

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

## Files
- `lib/v2/demoProject.js` — resolve activity, days-span chips, checkpoint chips + beats, SAM line, evidence, audience helpers, assign payload
- `app/v2/teacher/project/[id]/` — page + `ProjectShellClient` (glance-first shell)
- `app/v2/teacher/StationDayClient.js` — Project → route (was toast stub)
- `app/v2/teacher/StationWeekClient.js` — optional Project on teach tiles
- `app/v2/student/StudentMyDayClient.js` — Later · Project card; shows evidence product name when assigned
- `docs/ci2/PROJECT-ON-TEACH.md` — this note

## Gaps (out of scope)
- No full project builder, rubrics engine, or real multi-week planner
- Checkpoints + evidence product are stub copy (not live planner / grading)
- Small group is stub only — demo names + Who needs me link; no roster sync
- Student Open on Project does not launch a real activity player (toast only)
- No SIS / multi-device sync; localStorage only
- Assign does not create week tiles or publish to a roster
- Family one-liner / SAM draft not in this pass
- Do **not** merge to `main`
