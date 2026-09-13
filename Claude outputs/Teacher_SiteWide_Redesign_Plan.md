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
| Challenge Library | `/teacher/assign/new` | ✅ | pink | `challenge_library_bg.jpg` (own art, kept) | Fourth page. See below. |
| Assign Briefing | `/teacher/assign/briefing` | ✅ | pink | `bg-platform-room.jpg` (shared with My Classes) | Fifth page. See below. |
| Present-to-Class display | `/teacher/assign/display` | ⬜ | pink | — | Projected for students — may want to stay closer to its current look; worth asking Emily before touching it. |
| Live Ops Board | `/teacher/live-ops-board` | ⬜ | pink? | — | Same open question as above. |
| Signal Ops Board | `/teacher/signal-ops-board` | ⬜ | pink? | — | Same. |
| Submissions / Grading list | `/teacher/grade` | ✅ | aqua | `bg-observatory.jpg` (shared with Progress/Reports) | Sixth page. See below. Confirmed aqua/Observatory family per the open question below. |
| Grading detail (`[submissionId]`) | `/teacher/grade/[id]` | ⬜ | aqua | needed | NOT done yet — a much bigger, more complex page (132 kB), deliberately kept as its own separate pass rather than risked in this batch. |
| Badges & Rewards | `/teacher/badges` | ⬜ | success (green) | needed | Resources' family. |
| Resources | `/teacher/resources` | ⬜ | success (green) | needed | Currently a "Coming Soon" stub — lowest-risk place to establish patterns fresh. |
| Messages | `/teacher/messages` | ⬜ | magenta | `bg-messages.jpg` (mapped, page not built) | Currently a "Coming Soon" stub. |
| Class Settings | `/teacher/settings` | ⬜ | teal | needed | Partially touched already (S.A.M./planet pickers) but still on the old light-cream theme otherwise. |
| Roster (+ `[classId]`) | `/teacher/roster/*` | ⬜ | pink? | — (printable) | Print-oriented — may want to stay plain/printable rather than themed with background art; worth asking Emily. |
| Students (+ `[studentId]`) | `/teacher/students/*` | ⬜ | — | needed | Individual student detail page — not tied to one landmark. |

`bg-bridge-console.jpg` is saved under `public/teacher/console/` but not yet
assigned to any route — destination still unconfirmed with Emily.

Roughly 20 screens total; 6 done so far (My Classes, Student Progress,
Reports, Challenge Library, Assign Briefing, Submissions/Grading list).

## Overview scene fitting — fixed twice, same day (Sept 13)

The Overview "scene" (the literal console + planets view, not a console-
interior page) went through two rounds of fixing on the same day. First
pass: the console's own base was getting cropped off the bottom of the
screen on short/wide windows, fixed by anchoring the crop to the bottom
instead of the center. That traded one problem for another — anchoring to
the bottom meant ALL the crop came off the top instead, which is exactly
where the class planets live, so they started getting clipped instead on
the same kind of window. Second pass fixed it properly: switched from
"crop to fill the screen" (cover) to "always show the whole scene, sized to
fit" (contain) — nothing in the art is ever cropped now, planets or
console, on any window shape. The trade-off is a thin strip of plain
starfield background on the left/right edges on unusually wide-and-short
windows instead of the art touching every edge — a much smaller cost than
losing content. Verified with a clean `next build` both times.

## Challenge Library (`/teacher/assign/new`) — done Sept 13, this session

Fourth page moved over — the assignment-builder flow reached from Mission
Control's "New Assignment" button (challenge type → grade/subject → case →
class/students/due date/Distress Call → assign). Same visual-layer-only
port as the previous three pages — no query, calculation, or
assignment-flow logic changed.

`TeacherSidebar` + `TeacherPageBanner` swapped for `TeacherHUD`. This page
already had its own dedicated background art (`challenge_library_bg.jpg`,
made back on Aug 27, before the console-theme initiative existed) — kept
it rather than switching to My Classes' `bg-platform-room.jpg`, since it's
good custom art made specifically for this page; it's now registered in
`PAGE_BACKGROUNDS` under its own route (`/teacher/assign/new`) while still
sharing Mission Control's pink `ACCENT` (same family as My Classes, since
this page is one level into that flow). This page had already solved its
own version of the crop problem described above (a "contain" background
technique with a matching fallback color) before Overview did — that
existing fix was kept as-is, just modernized to sit under the new HUD
layout instead of the old sidebar.

The page's local `COLORS` object (with three extra pastel tokens —
`violetSoft`, `tealSoft`, `cream` — that don't exist in the shared
`lib/teacherTheme.js` palette) was replaced by the shared import; those
three pastels are now computed as tints of shared colors instead
(`${ACCENT}22`, `${COLORS.aqua}18`, etc.) rather than kept as separate
hardcoded hex.

Two things were deliberately left violet instead of becoming pink
`ACCENT`, matching the same principle used everywhere else in this
redesign (a page's decorative accent never doubles as a different,
meaningful signal):
- **Distress Call** — the whole feature section (checkbox, target/deadline
  fields, crystal-reward presets) keeps its own violet identity throughout,
  the same way My Classes keeps the "📡 Live" Distress Call badge violet
  rather than pink. Distress Call is a distinct feature signature across
  the app, not this page's branding.
- **Learning Target callout** — was a one-off `tealSoft` box on this page;
  changed to match the aqua used for the *identical* Learning Target
  callout on My Classes' case-detail modal, since it's the same UI concept
  in both places and they should look the same, not accidentally different
  colors that mean nothing.

Verified with a clean `next build`.

## Assign Briefing (`/teacher/assign/briefing`) — done Sept 13, this session

Fifth page — the Social Studies "teach-first" shelf, a separate simpler
flow from Challenge Library reached the same way (from My Classes). Same
visual-layer-only port; no query or assignment logic changed. No dedicated
art existed for this page, so it now reuses My Classes' `bg-platform-room.jpg`
(same Mission Control family/room) rather than staying on the old
light-cream look while its sibling pages moved on. Decorative violet
(selected-briefing card, chips, Assign button) became pink `ACCENT`.
Verified with a clean `next build`.

## Submissions / Grading list (`/teacher/grade`) — done Sept 13, this session

Sixth page — resolves one of the open questions below: Grading now
officially shares Progress/Reports' aqua Observatory family (added to
`PAGE_ACCENTS`/`PAGE_BACKGROUNDS` in `lib/teacherTheme.js` under
`/teacher/grade`) rather than staying unmapped. Decorative violet (the
"Grade Next" banner, class tabs, per-class badge on each assignment group)
became aqua `ACCENT`. The amber "needs review" / teal "handled" submission
status colors on each student tile are genuine status signals, not page
branding, so — same principle as every other page in this redesign —
those were deliberately left alone.

**Not done yet, on purpose:** the actual grading screen you land on when
you click a student (`/teacher/grade/[submissionId]`) is a much bigger,
more complex page (132 kB compiled — likely well over a thousand lines,
probably with rubric/scoring UI, AI-suggested grades, etc.) and was
deliberately left for its own separate pass rather than risked inside this
batch alongside five other pages. It's next in line specifically because
it's the natural next step after the list page, not because it was
forgotten.

Verified with a clean `next build`.

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
- **`bg-bridge-console.jpg`'s destination** — saved but not yet mapped to a
  route.
