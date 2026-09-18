# CI2.0 · Library browse stub

Branch: `ci2-sandbox`  
Route: `/v2/teacher/library`

## Why
Teachers need a light place to browse a few ready activities and drop them onto **Daily Focus** or **This Week** without a catalog rebuild. Glance-first glass cards — not a search engine.

## Click tour
1. Top nav **Library** (or Plan subnav **Library**)
2. See 4–6 demo cards (Briefing / Challenge / Practice / Project flavors)
3. **Add to Daily Focus** → writes `ci2.teacher.addedActivities` for today (`d=2`)
4. Open **Daily Focus** → tile appears (same browser)
5. **Add to This Week** → same planner extras key; open **This Week** to see it
6. Student My Day may surface teacher-added tiles when day matches

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.teacher.addedActivities` | Planner extras (same key as Add Activity / usePlanner) |

## Files
- `lib/v2/demoLibrary.js` — demo cards + add helpers
- `app/v2/teacher/library/` — page + `LibraryClient`
- `components/v2/V2TopBar.js` — Library href wired
- `components/v2/StationShell.js` — TeacherSubnav Library link

## Gaps (out of scope)
- No real catalog search, standards filter, or cross-device sync
- Not a full Library IA — stub browse only
- Do **not** merge to `main`
