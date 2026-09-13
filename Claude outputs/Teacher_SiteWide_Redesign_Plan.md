# Teacher App Site-Wide Redesign — Plan & Progress

Started Sept 13, 2026, right after the Overview "Orbit Map" redesign shipped.
Emily wants the same sci-fi console look extended to the rest of the teacher
app — every other page still used the old light-cream theme (white
background, violet/teal, a 216px left sidebar) before this effort started.
This doc tracks the plan and which pages are actually done, since this spans
many sessions.

## The framework (confirmed with Emily Sept 13)

1. **Overview stays the one literal "scene."** Every other page becomes a
   themed **console interior** — same palette language, glow accents, fonts,
   and card style, but laid out as normal functional panels (tables, forms,
   lists) rather than more explorable scenes.
2. **Navigation moves from a permanent sidebar to a slim top bar.** The old
   216px `TeacherSidebar` is replaced on reskinned pages by
   `components/TeacherHUD.js`. Pages not yet reskinned keep `TeacherSidebar`
   as-is; the two coexist during the transition.
3. **Each destination page inherits its own Overview landmark's accent
   color.** Mission Control, Observatory, S.A.M., Messages, Resources each
   carry a distinct color (see `PAGE_ACCENTS` in `lib/teacherTheme.js`,
   mirroring the `accent` prop on each `<Landmark>` in `app/teacher/page.js`).
   **A page's decorative accent and a genuine semantic/status color are never
   merged** — see the Mission Control color history below for why this rule
   exists.
4. **Bright background art, never dark mode.** Every reskinned page gets a
   custom illustrated background image (same 1672×941 canvas as Overview's),
   with glass panels tinted to match the art's own ambient light — confirmed
   after an initial dark-navy "console" pass was rejected ("I don't like dark
   mode").

## Shared infrastructure

- **`lib/teacherTheme.js`** — single source of truth for the palette
  (`COLORS`), `PAGE_ACCENTS` (route → accent color), `PAGE_BACKGROUNDS`
  (route → background image), `BG_ASPECT`, `sceneWrapperStyle()` /
  `sceneCanvasStyle()` (full-bleed-cover helpers for pages with pinned
  coordinates), and `panelStyle(accent, extra)` (translucent light "glass
  card" look).
- **`components/TeacherHUD.js`** — the slim top bar. Light lavender glass
  bar, `title`/`subtitle`/`accent`/`teacherName`/`teacherEmail`/`actions`.
  Its nav dropdown reads `NAV_GROUPS`, exported from
  `components/TeacherSidebar.js` so both components share one destination
  list.
- **`public/teacher/console/`** — background art, one image per console page:
  `bg-platform-room.jpg` (My Classes), `bg-observatory.jpg` (Student
  Progress + all of Reports), `bg-messages.jpg` (mapped, page not yet
  built), `bg-bridge-console.jpg` (saved, still unassigned).

## Mission Control's color — corrected Sept 13 (later, cross-session)

Earlier notes in this doc claimed a same-day fix had given Mission Control
its own dedicated `COLORS.missionAmber` for decorative use, separate from
`COLORS.warning` (the real "needs review" alert color). **That fix never
actually made it into the code** — a later session checked both GitHub and
Emily's local folder and found `PAGE_ACCENTS["/teacher/assign"]` was still
literally `COLORS.warning`, so My Classes' whole page and its real alert
signal were still the same orange.

Resolved by giving Mission Control its own **pink** accent
(`COLORS.pink`, `#FF6FA0`) instead — teal was ruled out because it's already
S.A.M./Class Settings' color, and magenta because it's already Messages'.
Pink is now Mission Control's color in both `lib/teacherTheme.js` and the
Overview page's own (separately maintained) copy of `COLORS`, so the planet
on Overview and the My Classes page stay in sync. `COLORS.warning` is
untouched and still reserved purely for real urgency signals.

## Page-by-page status

Legend: ✅ done · 🚧 in progress · ⬜ not started

| Page | Route | Status | Accent | Background art | Notes |
|---|---|---|---|---|---|
| Overview | `/teacher` | ✅ | — (all 5) | `bg-orbit-map` (own art) | The literal scene. |
| My Classes | `/teacher/assign` | ✅ | pink | `bg-platform-room.jpg` | First console-interior page. Accent corrected from warning-orange to a dedicated pink (see above). |
| Student Progress | `/teacher/progress` | ✅ | aqua | `bg-observatory.jpg` | Second page. |
| Reports (hub, `[classId]`, `/standards`, `/student/[studentId]`) | `/teacher/reports/*` | ✅ | aqua | `bg-observatory.jpg` | Third page (this session). See below. |
| Challenge Library | `/teacher/assign/new` | ⬜ | pink | needed | Large page (817 lines) — assignment builder form. |
| Assign Briefing | `/teacher/assign/briefing` | ⬜ | pink | needed | |
| Present-to-Class display | `/teacher/assign/display` | ⬜ | pink | — | Projected for students — may want to stay closer to its current look; worth asking Emily before touching it. |
| Live Ops Board | `/teacher/live-ops-board` | ⬜ | pink? | — | Same open question as above. |
| Signal Ops Board | `/teacher/signal-ops-board` | ⬜ | pink? | — | Same. |
| Submissions / Grading (+ `[submissionId]`) | `/teacher/grade`, `/teacher/grade/[id]` | ⬜ | aqua? | needed | Not yet mapped to a landmark explicitly — Track section in nav, same family as Progress/Reports. |
| Badges & Rewards | `/teacher/badges` | ⬜ | success (green) | needed | Resources' family. |
| Resources | `/teacher/resources` | ⬜ | success (green) | needed | Currently a "Coming Soon" stub — lowest-risk place to establish patterns fresh. |
| Messages | `/teacher/messages` | ⬜ | magenta | `bg-messages.jpg` (mapped, page not built) | Currently a "Coming Soon" stub. |
| Class Settings | `/teacher/settings` | ⬜ | teal | needed | Partially touched already (S.A.M./planet pickers) but still on the old light-cream theme otherwise. |
| Roster (+ `[classId]`) | `/teacher/roster/*` | ⬜ | pink? | — (printable) | Print-oriented — may want to stay plain/printable rather than themed with background art; worth asking Emily. |
| Students (+ `[studentId]`) | `/teacher/students/*` | ⬜ | — | needed | Individual student detail page — not tied to one landmark. |

`bg-bridge-console.jpg` is saved under `public/teacher/console/` but not yet
assigned to any route — destination still unconfirmed with Emily.

Roughly 20 screens total; 3 done so far (My Classes, Student Progress,
Reports).

## Reports (`/teacher/reports/*`) — done Sept 13, this session

Third page moved over. Reports was already functionally rich before this
pass — this was a visual-layer-only port, same as My Classes and Student
Progress; **no query, calculation, or feature changed.**

What changed on all four screens (hub, class report, student report,
standards report): `TeacherSidebar` swapped for `TeacherHUD`, aqua accent
(Observatory's color, shared with Student Progress), the observatory
background art behind the page shell using the same "plain CSS
background-image, cover, fixed" technique as Student Progress (no pinned
coordinates needed here either). Decorative violet accents (buttons, eyebrow
labels, active-filter pills, the class-report trend line) became aqua;
proficiency-band colors — including violet for "Developing" — were left
exactly alone, same principle as every other console page.

**Deliberate exception to the "glass panel" look:** the actual report
content (the class report, student report, and standards report each render
a printable white card with stats, trend charts, band bars, assignment
history, etc.) stays a plain **opaque white card**, not the translucent
lavender glass panel used for cards elsewhere. These are documents meant to
be handed to a parent or printed for an admin, and needed to stay flatly
legible on paper as well as on screen — the existing print CSS (hide chrome,
force white background) was extended to also hide the new HUD and background
art when printing. The Reports **hub** page's own navigation tiles (class
picker cards, the "Standards Report" tile) did get the glass `panelStyle`
treatment, since those are navigation, not report content.

**Already existed, not new:** Emily asked for "click a student name and get
all their info, grades, assignments, everything" — this was already built.
The class report's Student Summary section expands each row in place (mini
trend chart + missing work) and links to `/teacher/reports/student/[id]`,
a full standalone page with score-over-time vs. class average, full
assignment history, standards mastery, and badges/Crystal Points. The
Reports hub's search box also jumps straight to that same student page. This
pass didn't add that functionality — it was already there — only the visual
skin changed.

Verified with a full `next build` (all 72 routes compiled clean) rather than
a Playwright screenshot pass this time, since these are data-driven report
pages without seed data available in this session — worth a visual pass with
real class/grade data before or shortly after this ships.

## Open questions to resolve before going further

- **Now that Reports is up and running, Emily wants to revisit "easy to read
  at a glance but still comprehensive"** for the class report → student
  report flow specifically. Not yet scoped — likely candidates: whether the
  class report's Student Summary rows need clearer visual hierarchy, whether
  the student report's sections should reorder or condense, and whether the
  expand-in-place vs. "View Full Report" split is still the right two-tier
  model. To be worked through together, not decided unilaterally.
- **Projected/display pages** (`assign/display`, `live-ops-board`,
  `signal-ops-board`) — render on a screen shown *to students*. Does the
  console theme make sense there too? Not yet asked.
- **Roster page** — currently used for printing. A photographic background
  behind printable content wastes ink/toner and can hurt contrast. Worth
  checking whether Emily wants this one to stay plain/print-friendly.
- **Grading/Submissions' landmark family** — Progress and Reports are both
  clearly "Observatory" (aqua); Grading isn't explicitly one of the 5
  landmarks. Defaulted to aqua in the table above, worth confirming.
- **`bg-bridge-console.jpg`'s destination** — saved but not yet mapped to a
  route.
