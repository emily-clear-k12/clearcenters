# CI2.0 · Who needs me (reteach / small-group stub)

Branch: `ci2-sandbox`  
Route: `/v2/teacher/who-needs-me`

## Why
SAM glance and grading already surface “needs you.” Teachers need a calm place to act — pick 1–3 kids for reteach or small group — without opening a spreadsheet. Analytics / time-on-task come later; this is **action from data** (demo + live inbox).

## Click tour
1. `/v2` → **Teacher · Daily Focus** (`/v2/teacher/day?d=2`)
2. See **Who needs me** chip (header) and SAM glance row (“N kids could use a quick look”)
3. Open **Who needs me** → 1–3 cards (Kai / Riley / Maya, or live Leo if just submitted)
4. Act: **Pull for small group**, **Reteach tomorrow**, or **Looks good / dismiss**
5. Card leaves the list; choice persists in this browser
6. Optional: Grading inbox header → **Who needs me**

## Tone
- Calm **ready** / **needs you** language (lavender / cream / mint — never scary red)
- Short G3-teacher voice; max 3 cards (matches SAM glance max-3)

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.whoNeedsMe.choices` | Per-kid action stubs (`small_group` / `reteach_tomorrow` / `dismiss`) |
| `ci2.grading.inbox` | Live submits (optional “just submitted” card) |
| `ci2.grading.confirmedIds` | Affects which inbox rows still count as pending |

## Files
- `lib/v2/demoWhoNeedsMe.js` — demo kids, merge with live inbox, choices helpers
- `app/v2/teacher/who-needs-me/` — page + client surface
- `components/v2/StationShell.js` — `WhoNeedsMeChip`
- `app/v2/teacher/StationDayClient.js` — chip + SAM glance entry
- `app/v2/teacher/StationWeekClient.js` — chip + SAM glance entry
- `app/v2/teacher/grading/GradingInboxClient.js` — header link

## Gaps (out of scope)
- No real standards analytics or AI grouping
- No live roster sync / multi-device
- Actions are stubs (toast + localStorage only — do not create week tiles yet)
- Do **not** merge to `main`
