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
| Present-to-Class display | `/teacher/assign/display` | ✅ (left as-is) | — | own art (`join_class_bg.jpg`) | Decided, not asked — see below. Fully student-facing, no sidebar to begin with; untouched. |
| Live Ops Board | `/teacher/live-ops-board` | ✅ | pink (chrome only) | none (chrome only; board unchanged) | Decided, not asked — see below. Chrome moved, projected board's own feature colors kept. |
| Signal Ops Board | `/teacher/signal-ops-board` | ✅ | pink (chrome only) | none (chrome only; board unchanged) | Decided, not asked — see below. Same treatment as Live Ops Board. |
| Submissions / Grading list | `/teacher/grade` | ✅ | aqua | `bg-observatory.jpg` (shared with Progress/Reports) | Sixth page. See below. Confirmed aqua/Observatory family per the open question below. |
| Grading detail (`[submissionId]`) | `/teacher/grade/[id]` | ✅ | aqua | `bg-observatory.jpg` (shared with the list page) | Seventh page — the big one. See below. |
| Badges & Rewards | `/teacher/badges` | ✅ | success (green) | none yet (canvas wash) | Eighth page. See below. |
| Resources | `/teacher/resources` | ✅ | success (green) | none yet (canvas wash) | Ninth page — still a "Coming Soon" stub. See below. |
| Messages | `/teacher/messages` | ✅ | magenta | `bg-messages.jpg` | Tenth page — still a "Coming Soon" stub, but now the first page to actually use this art. See below. |
| Class Settings | `/teacher/settings` | ✅ | teal | none yet (canvas wash) | Eleventh page. See below. |
| Roster (+ `[classId]`) | `/teacher/roster/*` | ✅ (left as-is) | — | — (printable) | Decided, not asked — see below. Left fully untouched. |
| Students (+ `[studentId]`) | `/teacher/students/*` | ✅ | aqua | `bg-observatory.jpg` (shared with Progress/Reports/Grading) | Twelfth page. See below. Not its own Overview landmark — assigned to the Observatory family since it's only ever reached from Grading/Reports. |

`bg-bridge-console.jpg` is saved under `public/teacher/console/` but not yet
assigned to any route — destination still unconfirmed with Emily.

Every teacher dashboard screen is now moved over. Roughly 20 screens total;
14 either reskinned or deliberately confirmed as staying as-is (My Classes,
Student Progress, Reports, Challenge Library, Assign Briefing,
Submissions/Grading list, Grading detail, Badges & Rewards, Resources,
Messages, Class Settings, Student detail, Live Ops Board, Signal Ops
Board), plus Present-to-Class display and Roster left untouched by design
(see below), plus Overview (the literal scene, done earlier). Emily said to
decide and proceed on the remaining open questions rather than pausing to
ask — see "Final calls" below for the reasoning behind each one; any of it
can still be revisited.

## Final calls on the pages that weren't a simple reskin

**Present-to-Class display (`/teacher/assign/display`)** — left completely
untouched. It never had a `TeacherSidebar` to begin with (it's a full-bleed
projected screen using its own dedicated art, `join_class_bg.jpg`) and it's
shown to students, not the teacher — so there's no old-dashboard chrome to
cut over here at all.

**Live Ops Board and Signal Ops Board** — split treatment. Both pages are
two things in one file: teacher-facing controls (pick a signal, start/end a
session, an explainer) and, below that, the actual board a teacher projects
for the class. The controls got the same treatment as every other page —
`TeacherSidebar`/`TeacherPageBanner` → `TeacherHUD`, Mission Control's pink
accent (both are reached from the Assign flow). The projected board itself
was left completely untouched on both pages, on purpose: Live Ops Board's
dark navy/teal look (Distress Call) and Signal Ops Board's own "Soft
Crystal Sci-Fi" lavender/violet/teal/gold palette (its code comment already
flagged this as a deliberate choice, not leftover generic styling) are each
that feature's own established identity — the same reasoning that keeps
Distress Call violet on Challenge Library regardless of that page's own
accent. Recoloring either board to match a page accent would be undoing
already-settled design work, not finishing this one.

**Roster (`/teacher/roster/[classId]`)** — left completely untouched. Like
the Present-to-Class display, it never had a `TeacherSidebar` (it's a
standalone print flow with its own small Back/Print bar), so there's no
navigation chrome to cut over. More importantly, this page exists to be
printed — a photographic background behind a page meant for a classroom
printer would waste ink and could hurt contrast on the printed page, so it
stays plain white on purpose rather than getting the console treatment.

With these decisions, every page Emily asked to "keep changing over" now
has either the console-interior look or a documented, deliberate reason it
doesn't.

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

Verified with a clean `next build`.

## Grading detail (`/teacher/grade/[submissionId]`) — done Sept 13, this session

Seventh page — the actual grading screen a teacher lands on after clicking
a student from the Grading list (attempt review, AI First Reader, rubric/
Signal Check/Newsroom content depending on challenge type, Final Grade
picker, release/send-back). This is the biggest, densest page reskinned so
far (625 lines, 131 kB compiled) — it was deliberately deferred out of the
Grading-list batch for its own separate pass rather than risked alongside
five other pages at once. Visual-layer-only port, same as every other page
in this redesign; every Supabase query, state variable, and handler
(`loadSubmission`, `handleRelease`, `handleSendBack`, `handleCancelSendBack`)
is untouched.

`TeacherSidebar` swapped for `TeacherHUD`. Reuses the aqua Observatory
`ACCENT`/`bg-observatory.jpg` already registered for the Grading list page
— same family, same destination. Every flat opaque-white, `boxShadow`-only
card (the top student-info bar, attempt cards, Signal Check and Newsroom
response cards, the AI First Reader panel, the Final Grade card, and the
reusable `ScorePill` component) became the shared translucent `panelStyle`
glass card. Decorative violet became aqua `ACCENT` on chrome elements: the
AI First Reader panel's icon/label/score badge, the Release-grade button in
`ReleaseConfirmModal`, and the error-state "Back to Submissions" button.

Three groups of color were deliberately left alone, same principle as
every other page in this redesign — a page's decorative accent never
doubles as a genuinely meaningful signal:
- **The gold Final Grade language** — the grade-picker buttons' selected
  gold border/fill and the "Your Grade" `ScorePill` are this page's own
  established grading-workflow color, unrelated to navigation branding.
- **Teal-mastered / amber-needs-work colors** — the "Suggested Next Step"
  box and the needs-work/incorrect-verdict text carry real submission
  signals, same as the amber/teal status colors kept on the Grading list
  page.
- **The Newsroom investigation log's Observation (green) vs. Inference
  (violet) tags** — a genuine content-type distinction, not decoration.

The student avatar circle in the top info bar also stays violet, matching
the precedent set on every other page that avatars are neutral, not
page-branded.

Verified with a clean `next build`.

## Badges & Rewards, Resources, Messages — done Sept 13, this session

Eighth, ninth, and tenth pages, shipped together. Resources and Messages
are still "Coming Soon" stubs — nothing to port there beyond the shell:
`TeacherSidebar`+`TeacherPageBanner` → `TeacherHUD`, decorative violet →
each page's own accent (green for Resources, magenta for Messages), the
flat white "Coming Soon" card → `panelStyle`. Messages is the first page
to actually use `bg-messages.jpg` (it existed and was mapped in
`lib/teacherTheme.js` since earlier in the day, just unused until now).
Resources and Badges have no dedicated art yet, so both fall back to the
plain canvas wash — same as any not-yet-illustrated page.

Badges & Rewards is real functionality (rename badge tiers, change their
Crystal Points thresholds, award bonus Crystal Points to a class or
student) so it got the full treatment: the tier-list card became a
`panelStyle` glass card, and decorative violet on the page's own chrome
(the tier row's default "Save" button state) became green `ACCENT`
(Resources' family, since badges live under that landmark).

**Left deliberately violet, on purpose:** everything in the Award Crystal
Points flow — the header button and the entire modal (title, mode toggle,
preset amounts, Award button). Crystal Points are the app's currency and
violet is their brand color everywhere they show up elsewhere in the app
(a student's Home screen counter, etc.), so this page's own green branding
shouldn't bleed into that — the same principle that keeps Distress Call
violet on Challenge Library regardless of that page's pink accent.

Verified with a clean `next build`.

## Class Settings (`/teacher/settings`) — done Sept 13, this session

Eleventh page. This one was already partially touched (the S.A.M. skin
picker and per-class planet picker both existed before this redesign
started) but still sat on the old `TeacherSidebar` + light-cream frame.
Inherits S.A.M.'s teal accent, since the S.A.M. skin picker already tied
this page to that landmark. No dedicated background art yet, so it falls
back to the plain canvas wash. `TeacherSidebar` + `TeacherPageBanner` →
`TeacherHUD`; the flat white S.A.M.-picker card, empty-state card, and each
per-class card became `panelStyle` glass cards; decorative violet (S.A.M.
skin selection, class-rename Save button, planet-picker selection ring) →
teal `ACCENT`. No save/query logic changed.

**Left alone, on purpose:** each planet button's own radial-gradient
fill — that's the individual planet's real color (the same hue used for it
on the Overview scene), not page decoration, so every planet keeps its own
look regardless of this page's teal accent.

Verified with a clean `next build`.

## Student detail (`/teacher/students/[studentId]`) — done Sept 13, this session

Twelfth page. Not one of the 5 Overview landmarks on its own — it's a
click-through from Grading and from Reports' Student Summary rows — so it
shares those pages' aqua Observatory family rather than getting its own
color (newly added to `PAGE_ACCENTS`/`PAGE_BACKGROUNDS` in
`lib/teacherTheme.js` under `/teacher/students`). `TeacherSidebar` swapped
for `TeacherHUD`; the flat white stat tiles and Assignments card became
`panelStyle` glass cards; decorative violet on chrome (nothing major here —
this page was already fairly neutral) became aqua `ACCENT`. No query or
status logic changed.

**Left alone, on purpose, same principle as Grading list/detail:** the
amber "Needs Review" and teal "graded"/"released" status pills on each
assignment row are real submission-status signals, not page branding. The
student avatar circle also stays violet, matching the precedent that
avatars are neutral, not page-branded, everywhere else in this redesign.

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
- **`bg-bridge-console.jpg`'s destination** — saved but not yet mapped to a
  route.

Resolved same day, decided rather than asked (Emily: "decide and proceed —
we can always go back and change/update little things"): the
projected/display pages and the Roster page. See "Final calls on the pages
that weren't a simple reskin" above for the reasoning on each — all of it
is easy to revisit if any of these calls don't feel right in practice.
