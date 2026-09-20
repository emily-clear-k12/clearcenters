# CI2.0 · Daily Focus · Connected layout

Branch: `ci2-sandbox` · Route: `/v2/teacher/day` (Daily Focus) · Demo teacher: **Mrs. Barrons**

## Why
Too many yellow/green tiles felt jumbled. Daily Focus needed **design + connection**: columns, different-size tiles, less vertical scroll, clear top hierarchy. **80% beauty / 20% glance** — amber only for real needs; mute decorative green/yellow. Glass/calm dominates.

## Layout (desktop bento)
1. **Top full width (short):** SAM morning **|** SAM glance **side-by-side** (md+; stack on narrow) · max 3 needs · period/subject switcher (+ RoomCards when multi-class) · soft lavender/cream/white chrome (amber only for real needs)
2. **Left ~60% hero:** teach/agenda spine — From Check-ins (amber when present) · Now → Next → Later · Teach live / Lesson plan / Project
3. **Right ~40% stacked:** Today loop (Plan · Teach · Check) · compact Check-ins / Grading peeks · Add + light routines (Sunday preview chip, How my weeks run / Hands-off stay compact chips — not giant colored tiles)
4. Below ~960px the bento stacks to one column

## Color
| Cue | When |
|-----|------|
| Amber | Real needs only (Check-ins waiting, focus blocks, glance needs) |
| Soft purple | Teach / Now spine |
| Glass / white | Plan · clear Check · grading peek · win · ready rooms · auto tiles |
| Coral | Grading in SAM glance only (still a need cue) |

Decorative mint/teal “ready” chips stripped from Daily Focus chrome (loop Plan, clear Check-ins chip, room “ready”).

## Click tour (Mrs. Barrons)
1. `/v2` → **Teacher · Daily Focus** (or `/v2/teacher/day?d=2`)
2. **Top band:** SAM morning | SAM glance side-by-side (Dismiss today) · ≤3 glance · period chips · Setup switcher
3. **Left spine:** open a teach row → **Teach live** / **Lesson plan** / **Project**
4. **Right rail:** Today **Plan · Teach · Check** → This Week / live teach / Check-ins or Grading; peeks → Check-ins / Grading; **Add** · **This Week · plan** · **Sunday preview**
5. Compact **Weeks: …** / **How my weeks run** chips open drawers — not giant tiles
6. Amber appears when Check-ins wait or From Check-ins blocks exist; otherwise glass stays quiet

## Files
- `app/v2/teacher/StationDayClient.js` — connected bento layout
- `components/v2/StationShell.js` — SamGlance · MorningCard · TodayLoopStrip · WhoNeedsMeChip · RoomCards · HandsOffChip (quiet colors)
- `lib/v2/glanceGrammar.js` — meaning tokens (unchanged; Daily Focus uses amber sparingly)
- `docs/ci2/DAILY-FOCUS-LAYOUT.md` — this note
- See also: [GLANCE-GRAMMAR.md](./GLANCE-GRAMMAR.md) · [SUNDAY-HANDS-OFF.md](./SUNDAY-HANDS-OFF.md) · [THIS-WEEK.md](./THIS-WEEK.md)

## Gaps (out of scope)
- This Week redesign · student My Day · new features
- No Cloud Agents · do **not** merge to `main`
- Mobile is a single-column stack of the same blocks (not a separate mobile IA)
- Subject filter pills still show a quiet color dot (identity, not glance grammar)

## Loop seams
SAM morning win/watch use `demoLoopSeams` story voice (Mostly clear / Needs a look) + soft who from Reports softest. Rail peeks Reports class story. Amber still only for live Check-ins waiting > 0.
