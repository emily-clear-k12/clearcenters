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
5. **Filter chips** — All / Briefing / Challenge / Practice / Project · **♥ Favorites**
6. **Filter by title…** — simple text match on card title (stub, not catalog search); no matches → calm empty + **Browse Library**
7. **Add to Daily Focus** → writes `ci2.teacher.addedActivities` for today (`d=2`); stamps current period (`ci2.teacher.classFilter`) on the minted tile so departmentalized room filters show it in the right room; toast offers **Undo**
8. Open **Daily Focus** (same period) → tile appears (same browser); switch room filter → tile follows the stamped period
9. **Add to This Week** → same planner extras key + period stamp; toast **Undo** removes the minted tile; open **This Week** / Daily Focus → quiet **From Library** provenance on the tile
10. **♡ / ♥** on a card → saves to Favorites (`ci2.teacher.libraryFavorites`); **♥ Favorites** chip filters hearted cards (Mrs. Barrons demo, same browser)
11. First time a minted provenance tile appears → calm one-liner **Tiles remember where they came from.** · **Got it** → `ci2.provenance.helperDismissed` (not a tour modal)
12. Student My Day may surface teacher-added tiles when day matches

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.teacher.addedActivities` | Planner extras (same key as Add Activity / usePlanner) |
| `ci2.teacher.libraryFavorites` | Hearted Library card ids (Mrs. Barrons demo) |

## Files
- `lib/v2/demoLibrary.js` — demo cards (+ `standard`) + add / `removeAddedActivity` + `resolveLibraryClasses` (period stamp) + `libraryStandardChip` + `plannerProvenanceLabel` + provenance helper dismiss helpers
- `components/v2/StationShell.js` — `ProvenanceHelperLine`
- `lib/v2/demoStandardsUnit.js` — `hasStandardStub` / `STANDARDS_HREF` for linkable chips
- `app/v2/teacher/library/` — page + `LibraryClient` (chip + Favorites + title filters + TEKS chips + hearts)
- `components/v2/V2TopBar.js` — Library href wired
- `components/v2/StationShell.js` — TeacherSubnav Library link

## Empty filter
- When chips / title filter match nothing → calm ready glass (not a gray void) + one primary **Browse Library** (clears to All + empty search)

## Period stamp (planner)
- Minted tiles get `classes: [currentFilter]` from `ci2.teacher.classFilter` (or `"all"` when filter is all / unset)
- Provenance stays **From Library** — period stamp only affects which room sees the tile
- Same write path as Add Activity / `usePlanner` extras

## Gaps (out of scope)
- No real catalog search, standards filter, or cross-device sync
- Favorites are same-browser only (no roster / cloud sync)
- Title filter is client-side on demo cards only
- TEKS chips are demo labels only — not a full TEKS DB (see STANDARDS-UNIT-STUBS)
- Not a full Library IA — stub browse only
- Do **not** merge to `main`