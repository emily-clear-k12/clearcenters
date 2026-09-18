# CI2.0 Student · Tools stub

Branch: `ci2-sandbox`  
Routes: `/v2/student/tools` · Tools buttons on My Day + activity shell

## Why
Kids need calm helpers without leaving the glass look — **read aloud** (fake play), **word chips**, and a soft **highlight** stub. Real TTS / select-to-highlight come later; this is a clickable practice panel so Tools isn’t a toast dead-end.

## Click tour
1. `/v2` → **Student · My Day**
2. Set **text size** S/M/L in prefs chip (optional)
3. Tap quiet **Tools** on a mission/practice card → inline panel (prefs/text-size honored)
4. Or tap **Tools** (footer) → `/v2/student/tools` · panel uses same text size
5. **First Tools open this session for this kid** → one calm **SAM** line (not spammy); later opens stay quiet. Sound on → calm click (already wired); sound off → silent
6. **Play · fake** → pretend read-aloud status (no audio)
7. Tap a **word chip** (e.g. fraction) → calm hint line
8. **Turn highlight on** → amber wash on a sample line
9. **← My Day** · or open an activity → **Tools** → same panel inline (Close) · text size still honored
10. Switch demo kid → tip may show once for the new kid (session key is per-kid)
11. Choices persist in this browser (`Reset tools` clears)

## SAM tip (Tools open)
- First open per **browser session** + **demo kid** → one calm SAM bubble (`TOOLS_SAM_TIP_LINE`)
- Tracked in `sessionStorage` (`ci2.session.toolsSamTip.{kid}`) — clears when the tab session ends; never localStorage spam
- Reuses the quiet SamBubble look (lavender SAM chip + short G3–5 line)
- Respects sound pref via existing `playCalmClick` on open

## Tone
- Student glass / warm lavender cream (matches My Day + activity)
- Beauty first; amber highlight whisper only (glance grammar 80/20)
- SAM-friendly copy — short, kind, G3–5
- Text size from `ci2.student.prefs.{kid}` (CSS class `ci2-text-*` + font-size)

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.student.tools` | Play state, selected chip, highlight on/off |
| `ci2.student.prefs.{kid}` | Text size (and name/sound) — Tools reads size only |
| `ci2.session.toolsSamTip.{kid}` | Session flag — SAM tip already shown for this kid |

## Files
- `lib/v2/demoStudentTools.js` — chips + localStorage helpers · `shouldShowToolsSamTip` / `markToolsSamTipSeen` (session)
- `lib/v2/demoStudentPrefs.js` — text size scale / class · `playCalmClick`
- `components/v2/StudentToolsPanel.js` — shared panel (honors prefs) · first-open SAM tip
- `app/v2/student/tools/` — full page shell
- `app/v2/student/StudentMyDayClient.js` — Tools → page + quiet per-card inline Tools
- `app/v2/student/activity/[id]/StudentActivityClient.js` — Tools → inline panel + shell scale

## Gaps (out of scope)
- No real text-to-speech / screen-reader sync
- No text selection highlighter on mission copy
- Word chips are demo vocab only (not lesson-linked)
- No StationShell teacher chrome (student glass only)
- Do **not** merge to `main`
