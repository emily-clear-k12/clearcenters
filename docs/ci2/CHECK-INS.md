# CI2.0 · Check-ins (reteach / small-group stub)

**Doc rename:** was `WHO-NEEDS-ME.md` → **`CHECK-INS.md`** (calm display; no guilt).

**Display name:** Check-ins · **Route (kept):** `/v2/teacher/who-needs-me`

Branch: `ci2-sandbox`  
Route: `/v2/teacher/who-needs-me`

## Why
SAM glance and grading already surface “needs you.” Teachers need a calm place to act — pick 1–3 kids for reteach or small group — without opening a spreadsheet. Analytics / time-on-task come later; this is **action from data** (demo + live inbox).

Departmentalized teachers also need the **same period/class lens** as Daily Focus / This Week — filter kid cards to the room they’re standing in.

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. **Setup** → departmentalized (e.g. Math only · 3 periods)
3. See **Check-ins** chip (header) and SAM glance row — counts match the **selected period**
4. Open **Check-ins** → RoomCards (Period 1 / 2 / 3); switch period → list filters
   - Period 1 → Kai (demo)
   - Period 2 → Riley
   - Period 3 → Maya (or live Leo inheriting that room)
5. Act: **Pull for small group**, **Reteach tomorrow**, or **Looks good / dismiss**
6. Switch Setup back to **Self-contained** → filter hides; single room label only
7. Optional: Grading inbox header → **Check-ins**

## Tone
- Calm **ready** / **needs you** language (lavender / cream / mint — never scary red)
- Short G3-teacher voice; max 3 cards **per selected period** (matches SAM glance max-3)

## Period / class filter
| Setup | UI | Sync |
|-------|----|------|
| Self-contained (1 class) | `SingleRoomLabel` only — no RoomCards | `ci2.teacher.classFilter` still set to `A` |
| Departmentalized (2–3 periods) | Same `RoomCards` + `SetupSwitcher` as Daily Focus | Shared `usePlanner` → `ci2.teacher.setupKey` + `ci2.teacher.classFilter` |

- Demo kids carry `periodId` (`A` / `B` / `C` = class keys in `TEACHER_SETUPS`).
- Live inbox rows (Leo) use `periodId` / `classKey` when present; otherwise **inherit the currently selected room**.
- SAM glance + `WhoNeedsMeChip` on Day/Week use the **filtered** count for the selected period (assistant lens — not all-rooms).
- RoomCards “needs you” badges include Check-ins counts **per period** (plus existing suggestion counts).

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.whoNeedsMe.choices` | Per-kid action stubs (`small_group` / `reteach_tomorrow` / `dismiss`) |
| `ci2.grading.inbox` | Live submits (optional “just submitted” card) |
| `ci2.grading.confirmedIds` | Affects which inbox rows still count as pending |
| `ci2.teacher.setupKey` | Self vs departmentalized (shared with planner) |
| `ci2.teacher.classFilter` | Selected period/room (shared — Day ↔ Week ↔ Check-ins) |

## Files
- `lib/v2/demoWhoNeedsMe.js` — demo kids + `periodId`, period filter helpers, merge with live inbox
- `app/v2/teacher/who-needs-me/` — page + client (SetupSwitcher / RoomCards / SingleRoomLabel)
- `components/v2/StationShell.js` — `WhoNeedsMeChip`, `RoomCards`, `SetupSwitcher`
- `lib/v2/usePlanner.js` — shared setup + `classFilter` persistence
- `app/v2/teacher/StationDayClient.js` — chip + SAM glance (period-filtered count)
- `app/v2/teacher/StationWeekClient.js` — chip + SAM glance (period-filtered count)
- `app/v2/teacher/grading/GradingInboxClient.js` — header link

## Gaps (out of scope)
- No real standards analytics or AI grouping
- No live roster sync / multi-device / real period membership from SIS
- Live submits do not yet write `periodId` at enqueue time (inherit selected room on Check-ins / glance)
- Actions are stubs (toast + localStorage only — do not create week tiles yet)
- 2-period setups (e.g. ELAR + SS): demo Maya is `periodId: C` so she won’t appear until a 3-period setup or live inherit
- Do **not** merge to `main`