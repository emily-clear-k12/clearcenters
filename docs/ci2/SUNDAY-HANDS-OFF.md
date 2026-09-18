# CI2.0 · Sunday preview · Hands-off · This Week bridge

Branch: `ci2-sandbox`  
Surfaces: Sunday preview modal · Hands-off dial · How my weeks run · This Week

## Why
Sunday preview / Hands-off should not be a **dead end**. **Apply to This Week** writes demo routine blocks into This Week localStorage so teachers can see the preview become plan tiles. **Undo** clears those minted Sunday tiles (same pattern as Library / Check-ins).

## Hands-off (dial)
| Level | Feel |
|-------|------|
| I'll plan | Teacher fills the week |
| Plan for me | Routines suggest / fill — Sunday preview is the safety net |
| Run it | Auto routine tiles · Sunday preview still your net |

Persists: `ci2.teacher.handsOffLevels` (per subject). Routines: `ci2.teacher.routines.[setupKey]`.

## Sunday preview
- **Here's what goes out** — outbound assigns by day / subject / period
- **Change** → Daily Focus for that day
- **Apply to This Week** → demo routine blocks → `ci2.teacher.addedActivities` (`added-sunday-*`)
- **Looks good** → ack only (no tiles)
- Banner on This Week when Plan for me / Run it and not yet acked

## Undo (Library / Check-ins pattern)
- Toast **Undo** after Apply removes all `fromSunday` / `added-sunday-*` tiles and clears applied meta
- Daily Focus Apply → navigates to This Week · session pending-undo re-shows the toast with Undo
- Inline **Undo** on the mint chip **From Sunday · on This Week** (works after toast fades)
- Same-browser only; no server restore

## Storage
| Key | Role |
|-----|------|
| `ci2.teacher.addedActivities` | Applied Sunday bridge tiles (+ other Add tiles) |
| `ci2.sunday.appliedToWeek` | Meta `{ at, count, ids }` for chip / Applied state |
| `ci2.sunday.pendingUndo` | Session flag so Day → Week can re-show Apply toast |
| `ci2.teacher.handsOffLevels` | Dial per subject |
| `ci2.teacher.routines.*` | Sentence routines |

## Click tour
1. `/v2/teacher` (This Week) · set Hands-off to **Plan for me** or **Run it**
2. Open **Sunday preview** (header or banner)
3. Tap **Apply to This Week** → toast with **Undo** · modal closes
4. See mint chip **From Sunday · on This Week** (+ inline **Undo**) and new **Routine · …** / **From Sunday · …** tiles on the week grid
5. Tap toast **Undo** (or chip Undo) → Sunday tiles removed · chip clears
6. From Daily Focus · Apply → lands on This Week with toast Undo still available
7. Open a minted tile → quiet **From Sunday** provenance (`plannerProvenanceLabel`); first time → **Tiles remember where they came from.** (dismissible)
8. Daily Focus Hands-off chip → **Preview what goes out** → same Apply
9. How my weeks run → **Apply to This Week** also available

## Provenance
Bridge tiles carry `fromSunday: true` + `added-sunday-*` ids. Daily Focus / This Week show quiet **From Sunday** via `plannerProvenanceLabel` (same helper as Library / Check-ins / live teach). Quiet only — sense-making full pass still deferred.

## Files
- `lib/v2/demoSundayBridge.js` — build blocks + applied meta + remove / pending undo
- `lib/v2/demoLibrary.js` — `plannerProvenanceLabel` (“From Sunday”)
- `lib/v2/usePlanner.js` — `applySundayToThisWeek` · `undoSundayToThisWeek`
- `components/v2/StationShell.js` — modal + banner Apply CTAs
- `components/v2/HowMyWeeksRun.js` — Apply chip
- `app/v2/teacher/StationWeekClient.js` — banner · chip + Undo · modal · provenance
- `app/v2/teacher/StationDayClient.js` — modal Apply → This Week · pending undo · provenance
- `docs/ci2/SUNDAY-HANDS-OFF.md` — this note

## Gaps (out of scope)
- No real assign / publish to students
- Bridge tiles are demo stubs (not live roster scheduling)
- Undo is toast + chip (same session / same browser)
- Do **not** merge to `main`
