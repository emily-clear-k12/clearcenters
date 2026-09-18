# CI2.0 · This Week (StationWeek)

Branch: `ci2-sandbox` · Route: `/v2/teacher` (This Week)

## Why
Plan & publish the week board — then teach from Daily Focus. Print gives a glance-first paper sheet without LMS chrome.

## Click tour
1. `/v2` → **Teacher · This Week**
2. Glance: Hands-off dial · Check-ins chip · SAM suggestions · day columns
3. Drag tiles · **Add** · **Sunday preview** · **Publish week**
4. **Print** → browser print dialog · print-friendly CSS (`.ci2-week-print` / `.ci2-no-print` hides subnav, dials, Add/Sunday/Publish/Live/Lesson chrome)
5. On screen stays the full plan board (Mrs. Barrons demo)

## Print This Week
- Same spirit as Lesson plan / My Day Print — `window.print` + CSS only
- Paper keeps week title · label · day columns · tile titles
- No server PDF / email pack

## Files
- `app/v2/teacher/StationWeekClient.js` — This Week board · Print stub
- `lib/v2/usePlanner.js` — setup + period/room restore (shared with Daily Focus)
- `components/v2/StationShell.js` — SetupSwitcher
- `app/v2/teacher/ThisWeekClient.js` — thin wrapper
- `docs/ci2/THIS-WEEK.md` — this note
- See also: [SUNDAY-HANDS-OFF.md](./SUNDAY-HANDS-OFF.md) · [LESSON-PLAN-STUB.md](./LESSON-PLAN-STUB.md)


## Last setup / room memory
- `ci2.teacher.setupKey` + `ci2.teacher.classFilter` persist the last Setup + period/room (Mrs. Barrons demo)
- `ci2.teacher.classFilterBySetup` remembers the last room **per setup** so switching Math ↔ ELAR+SS restores the right period
- Daily Focus / This Week hydrate from the same keys via `usePlanner` — departmentalized teachers don’t reset to Period 1 every visit
- Soft toast once per session: **Back in Period 2 · Math only.** (sessionStorage gate; quiet on Day↔Week remounts). Private mode → no toast
- See also: SetupSwitcher in `StationShell.js`

## Gaps (out of scope)
- Print is `window.print` + CSS only (no server PDF)
- Chrome hide list is stub-level (modals stay out of print via `.ci2-no-print` wrap)
- Do **not** merge to `main`
