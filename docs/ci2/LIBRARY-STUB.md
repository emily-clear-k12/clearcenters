# CI2.0 · Library browse stub

Branch: `ci2-sandbox`  
Route: `/v2/teacher/library`

## Why
Teachers need a light place to browse a few ready activities and drop them onto **Daily Focus** or **This Week** without a catalog rebuild. Glance-first glass cards — not a search engine.

## Click tour
1. Top nav **Library** (or Plan subnav **Library**)
2. See 4–6 demo cards (Briefing / Challenge / Practice / Project flavors)
3. Each card shows a small **TEKS / standard chip** (e.g. TEKS 4.3C)
4. Tap a chip when it matches a Standard info stub → `/v2/teacher/standards#{code}`; unknown codes stay a plain chip
5. **Filter chips** — All / Briefing / Challenge / Practice / Project (type only)
6. **Filter by title…** — simple text match on card title (stub, not catalog search)
7. **Add to Daily Focus** → writes `ci2.teacher.addedActivities` for today (`d=2`); toast offers **Undo**
8. Open **Daily Focus** → tile appears (same browser)
9. **Add to This Week** → same planner extras key; toast **Undo** removes the minted tile; open **This Week** to see it
10. Student My Day may surface teacher-added tiles when day matches

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.teacher.addedActivities` | Planner extras (same key as Add Activity / usePlanner) |

## Files
- `lib/v2/demoLibrary.js` — demo cards (+ `standard`) + add / `removeAddedActivity` Undo helper + `libraryStandardChip`
- `lib/v2/demoStandardsUnit.js` — `hasStandardStub` / `STANDARDS_HREF` for linkable chips
- `app/v2/teacher/library/` — page + `LibraryClient` (chip + title filters + TEKS chips)
- `components/v2/V2TopBar.js` — Library href wired
- `components/v2/StationShell.js` — TeacherSubnav Library link

## Gaps (out of scope)
- No real catalog search, standards filter, or cross-device sync
- Title filter is client-side on demo cards only
- TEKS chips are demo labels only — not a full TEKS DB (see STANDARDS-UNIT-STUBS)
- Not a full Library IA — stub browse only
- Do **not** merge to `main`