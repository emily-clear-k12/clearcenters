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
| Grading | **Right / nav** (TeacherSubnav Grading + coral count when pending) |
| Morning card | **Under** title row, above or with SAM glance |
| Project | **Right edge** of teach agenda row; indigo accent |
| Primary CTA | Consistent corner (Assign / Looks good — existing patterns) |

## Applied (whisper)

- `components/v2/StationShell.js` — CSS vars on shell; SamGlance / MorningCard / RoomCards / WhoNeedsMeChip (label **Check-ins**) / TeacherSubnav grade count
- `app/v2/teacher/StationDayClient.js` — glance `meaning` keys; Project indigo; `gradeCount` on subnav
- `app/v2/teacher/check-ins/CheckInsClient.js` — Check-ins title; amber cards; teal dismiss / clear
- `app/v2/teacher/project/[id]/ProjectShellClient.js` — two-column one-pager; indigo header + evidence chip; right notes fill the glass

## Click tour

1. Daily Focus → SAM glance amber for Check-ins; coral for to-grade; Project indigo on teach row right
2. Check-ins → amber cards; teal “Looks good / dismiss”; period filter unchanged
3. Project → **two-column one-pager** — left Assign · right teacher notes; indigo “Project ·” + evidence chip; Details only for rare extras

## Gaps (out of scope)

- Full visual redesign / new illustrations
- Student screens
- V2TopBar Check coral count (subnav only this pass)
- Loud on-screen color key
- (Done) Route rename → `/v2/teacher/check-ins`; legacy `/who-needs-me` redirects
- Analytics
- Merge to `main`