# CI2.0 Student · Tools stub

Branch: `ci2-sandbox`  
Routes: `/v2/student/tools` · Tools buttons on My Day + activity shell

## Why
Kids need calm helpers without leaving the glass look — **read aloud** (fake play), **word chips**, and a soft **highlight** stub. Real TTS / select-to-highlight come later; this is a clickable practice panel so Tools isn’t a toast dead-end.

## Click tour
1. `/v2` → **Student · My Day**
2. Tap **Tools** (footer) → `/v2/student/tools`
3. **Play · fake** → pretend read-aloud status (no audio)
4. Tap a **word chip** (e.g. fraction) → calm hint line
5. **Turn highlight on** → amber wash on a sample line
6. **← My Day** · or open an activity → **Tools** → same panel inline (Close)
7. Choices persist in this browser (`Reset tools` clears)

## Tone
- Student glass / warm lavender cream (matches My Day + activity)
- Beauty first; amber highlight whisper only (glance grammar 80/20)
- SAM-friendly copy — short, kind, G3–5

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.student.tools` | Play state, selected chip, highlight on/off |

## Files
- `lib/v2/demoStudentTools.js` — chips + localStorage helpers
- `components/v2/StudentToolsPanel.js` — shared panel
- `app/v2/student/tools/` — full page shell
- `app/v2/student/StudentMyDayClient.js` — Tools → page
- `app/v2/student/activity/[id]/StudentActivityClient.js` — Tools → inline panel

## Gaps (out of scope)
- No real text-to-speech / screen-reader sync
- No text selection highlighter on mission copy
- Word chips are demo vocab only (not lesson-linked)
- No StationShell teacher chrome (student glass only)
- Do **not** merge to `main`
