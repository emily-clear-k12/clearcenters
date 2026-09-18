# CI2.0 · Check-ins (reteach / small-group stub)

**Doc rename:** was `WHO-NEEDS-ME.md` → **`CHECK-INS.md`** (calm display; no guilt).

**Display name:** Check-ins · **Route:** `/v2/teacher/check-ins`

Branch: `ci2-sandbox`  
Route: `/v2/teacher/check-ins` (legacy `/v2/teacher/who-needs-me` redirects)

## Why
SAM glance and grading already surface “needs you.” Teachers need a calm place to act — pick 1–3 kids for reteach or small group — without opening a spreadsheet. Analytics / time-on-task come later; this is **action from data** (demo + live inbox).

Departmentalized teachers also need the **same period/class lens** as Daily Focus / This Week — filter kid cards to the room they’re standing in.

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. **Setup** → departmentalized (e.g. Math only · 3 periods)
3. See **Check-ins** chip (header) and SAM glance row — counts match the **selected period**
4. Open **Check-ins** (`/v2/teacher/check-ins`) → RoomCards (Period 1 / 2 / 3); switch period → list filters
   - Period 1 → Kai (demo)
   - Period 2 → Riley
   - Period 3 → Maya (or live Leo inheriting that room)
5. Act: **Pull for small group** or **Reteach tomorrow** → writes an amber block onto **today’s Daily Focus** (kid names stub; merges same period)
6. **Looks good / dismiss** → clears from list only (no Focus block)
7. Optional: **Family note** on a kid card → teacher one-pager stub (celebrate + ask-at-home · copy message)
8. Open **← Daily Focus** → see **FROM CHECK-INS · TODAY** amber cards (period filter still applies)
9. Switch Setup back to **Self-contained** → filter hides; single room label only
10. Optional: Grading inbox header → **Check-ins**

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
| `ci2.checkins.focusBlocks` | Small-group / reteach blocks pulled onto Daily Focus (day · periodId · names) |
| `ci2.grading.inbox` | Live submits (optional “just submitted” card) |
| `ci2.grading.confirmedIds` | Affects which inbox rows still count as pending |
| `ci2.teacher.setupKey` | Self vs departmentalized (shared with planner) |
| `ci2.teacher.classFilter` | Selected period/room (shared — Day ↔ Week ↔ Check-ins) |

## Files
- `lib/v2/demoWhoNeedsMe.js` — demo kids + `periodId`, period filter, Check-ins → Daily Focus blocks
- `app/v2/teacher/check-ins/` — page + `CheckInsClient` (SetupSwitcher / RoomCards / SingleRoomLabel; Family note link)
- `app/v2/teacher/family/[id]/` — Family note stub (see FAMILY-STUB.md)
- `app/v2/teacher/who-needs-me/` — redirect → `/v2/teacher/check-ins`
- `components/v2/StationShell.js` — `WhoNeedsMeChip`, `RoomCards`, `SetupSwitcher`
- `lib/v2/usePlanner.js` — shared setup + `classFilter` persistence
- `app/v2/teacher/StationDayClient.js` — chip + SAM glance + amber From Check-ins blocks
- `app/v2/teacher/StationWeekClient.js` — chip + SAM glance (period-filtered count)
- `app/v2/teacher/grading/GradingInboxClient.js` — header link

## Gaps (out of scope)
- No real standards analytics or AI grouping
- No live roster sync / multi-device / real period membership from SIS
- Live submits do not yet write `periodId` at enqueue time (inherit selected room on Check-ins / glance)
- Small group / reteach write **Daily Focus** blocks (`ci2.checkins.focusBlocks`) — not week planner tiles
- Focus blocks are stub only (no auto scheduling, no roster sync, no tomorrow-day jump yet)
- 2-period setups (e.g. ELAR + SS): demo Maya is `periodId: C` so she won’t appear until a 3-period setup or live inherit
- Do **not** merge to `main`