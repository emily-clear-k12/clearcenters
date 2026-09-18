# CI2.0 Student · Activity Start stub

Branch: `ci2-sandbox` · Route: `/v2/student/activity/[id]`

## Click path
`/v2` → **Student · My Day** → **Start** on NOW (or unlocked NEXT) → activity shell → answer stub items → **Submit** → My Day with checkmark + NOW advanced.

## What it is
- Skeleton activity shell matching My Day vibe (warm lavender / cream)
- Mission title, subject color, product kid label
- Short directions + 1–2 demo items (multiple choice and/or short response)
- **SAM hint** button: 3-step stub (nudge → hint → example), positive “not yet” voice
- **Tools** stub: read-aloud placeholder · shell honors student text-size prefs (S/M/L)
- **Submit** writes `ci2.student.missionProgress` **and** queues a grading item in `ci2.grading.inbox` (Leo → teacher Grading), then returns to My Day
- Back link → My Day

## Demo mission stubs
| id | Title | Items |
|----|-------|-------|
| `stu-now-equiv` | Equivalent fractions | MC + short |
| `stu-next-pizza` | The Pizza Problem | MC + short |
| `stu-later-purpose` | Purpose match stations | MC + short |
| `from-teacher-*` | Teacher Add | Generic ready stub |

## Progress
- Key: `ci2.student.missionProgress` → `{ doneIds: string[], updatedAt }`
- My Day re-slots incomplete cards so first open = NOW
- Done cards show ✓ / DONE chip; Start disabled

## Grading bridge
See [GRADING-SUBMIT-BRIDGE.md](./GRADING-SUBMIT-BRIDGE.md). Submit → teacher `/v2/teacher/grading` via same-browser localStorage.

## Gaps (out of scope)
- No real content engines, AI grading, or Supabase
- Progress + grading bridge are same-browser only; no cross-device / class sync
- No “in progress” resume state — Start always opens full stub
- Teacher board edits (non-Add) still curated demo only
- Do not merge to main
