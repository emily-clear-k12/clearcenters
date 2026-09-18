# CI2.0 · Glance grammar (soft meaning cues)

Branch: `ci2-sandbox`  
Token: `lib/v2/glanceGrammar.js`

## 80 / 20 rule (Emily)

- **80% beauty / atmosphere** — glass, room art, SAM voice, calm layout.
- **20% glance grammar** — quiet color + same-spot cues so the eye knows what something *means* without reading.
- Grammar is **never louder than SAM or the art**. Soft pastels, glass-friendly — not neon, not corporate chrome.
- Prefer extending existing classes / chips over new panels. No loud on-screen legend key (docs + optional one-line collapsed hint only).

## Meaning table

| Meaning | Feel | Color | Typical spot |
|---------|------|-------|--------------|
| **Needs you** | Warm attention | Soft **amber** | Check-ins chips, SAM glance rows, room “needs you”, morning WATCH |
| **Ready / good** | Calm clear | Soft **teal-green** | Clear chips, dismiss / looks good, empty “all clear”, morning WIN |
| **Teach** | Soft focus | Soft **purple** | Teach agenda / morning TODAY (stays behind existing lavender) |
| **Project** | Deeper mark | Soft **indigo** | Project button (right edge of teach row), project header + evidence chip |
| **To grade** | Gentle queue | Soft **coral / rose** | Grading subnav count, SAM “to grade” glance row |

Icon name hints live on the token (`amber-soft`, `teal-check`, `soft-purple`, `indigo-mark`, `coral-count`) for later marks — do not invent loud icons in this pass.

## Spatial (same-spot)

| Spot | Rule |
|------|------|
| SAM strip | Always **top** (under title / after morning when shown) |
| Check-ins | **Left / stack** (header chip + glance + Check-ins page cards). Route `/v2/teacher/check-ins` |
| Check-ins nav | **Plan subnav** (TeacherSubnav Check-ins + soft **amber** count when period-filtered who-needs > 0 · same lens as Daily Focus / Check-ins) |
| Grading | **Right / nav** (TeacherSubnav Grading + coral count when pending) |
| Morning card | **Under** title row, above or with SAM glance · always **Open Check-ins** CTA; amber shell when Check-ins needs > 0 |
| Today loop strip | **Under** Daily Focus title chips · quiet **Plan · Teach · Check** counts (blocks today / teach rows / check-ins or grading) · amber only on Check when needs |
| SAM morning tip | **Beside / under** morning card when Check-ins wait · one calm SamBubble line · session+day key (no spam) |
| Provenance helper | Quiet one-liner above glance when minted tiles appear · dismiss → localStorage · not a tour |
| Project | **Right edge** of teach agenda row; indigo accent |
| Primary CTA | Consistent corner (Assign / Looks good — existing patterns) |

## Applied (whisper)

- `components/v2/StationShell.js` — CSS vars on shell; SamGlance / MorningCard (Open Check-ins CTA · amber when needs > 0) / SamBubble / ProvenanceHelperLine / RoomCards / WhoNeedsMeChip (label **Check-ins**) / TeacherSubnav **Check-ins** link + **period-filtered** amber who-needs count + coral grade count
- `app/v2/teacher/StationDayClient.js` — glance `meaning` keys; **TodayLoopStrip** (Plan · Teach · Check); Project indigo; `gradeCount` on subnav; morning `checkInsCount`; SAM Check-ins tip (session+day); provenance helper
- `components/v2/StationShell.js` — `TodayLoopStrip` (quiet 20% glance; amber Check only when needs)
- `app/v2/teacher/check-ins/CheckInsClient.js` — Check-ins title; amber cards; teal dismiss / clear
- `app/v2/teacher/project/[id]/ProjectShellClient.js` — two-column one-pager; indigo header + evidence chip; right notes fill the glass

## Click tour

1. Daily Focus → quiet **Today** strip under title chips · **Plan · Teach · Check** tiny counts (amber Check only when needs)
1a. Daily Focus → **SAM morning** card under title · always **Open Check-ins** (amber + “n waiting” when needs > 0)
1b. When Check-ins wait → calm **SamBubble** once per session/day (“n Check-ins ready when you are”) near morning card — not every render
1c. First minted tile with From Library / Check-ins / Sunday / live teach → quiet **Tiles remember where they came from.** · Got it dismisses (localStorage)
2. Daily Focus → SAM glance amber for Check-ins; coral for to-grade; Project indigo on teach row right
2b. TeacherSubnav → **Check-ins** item; soft **amber** count when period-filtered who-needs > 0 (self-loads with `ci2.teacher.classFilter`; same glance as morning card)
3. Check-ins → amber cards; teal “Looks good / dismiss”; period filter unchanged
3. Project → **two-column one-pager** — left Assign · right teacher notes; indigo “Project ·” + evidence chip; Details only for rare extras

## Gaps (out of scope)

- Full visual redesign / new illustrations
- Student screens
- V2TopBar Check coral count (Check-ins amber lives on TeacherSubnav)
- Loud on-screen color key
- Full sense-making / nav tours (provenance stays a one-liner; Today loop is a light strip only)
- (Done) Route rename → `/v2/teacher/check-ins`; legacy `/who-needs-me` redirects
- Analytics
- Merge to `main`