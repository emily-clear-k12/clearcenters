# CI2.0 Student · Preferences stub

Branch: `ci2-sandbox`  
Surface: Student **My Day** (`/v2/student`) — calm glass chip + panel · honored on Tools / activity / project shells

## Why
Kids need a tiny bit of control without leaving the glance-first shell — **display name**, **text size** (S/M/L), and **sound on/off**. Real accounts / sync / TTS come later; this is localStorage only so demos stay calm.

## Click tour
1. `/v2` → **Student · My Day**
2. See the **display name chip** under the day (e.g. `Leo · M · sound off`)
3. Tap chip → glass panel opens
4. Edit **Display name** → greeting + SAM use the new name
5. Tap **S / M / L** → page text scale softens up or down
6. Open **Tools** or **Start** an activity / project → same text size (`ci2-text-s|m|l` + font-size)
7. Tap **Sound on/off** → stub preference (no audio yet)
8. Switch demo kid **Leo → Kai** → prefs are per-kid (`ci2.student.prefs.{kid}`)
9. **Reset prefs** → back to that kid’s defaults

## Tone
- Student glass / warm lavender cream (matches My Day)
- Beauty first; quiet chip — not a settings maze
- Short SAM lines when prefs change

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.student.prefs.{kid}` | `{ displayName, textSize, soundOn }` per Leo / Kai / Riley |

## Files
- `lib/v2/demoStudentPrefs.js` — defaults + load/save/reset · `TEXT_SIZE_CLASS` / `textSizeFontPx`
- `app/v2/student/StudentMyDayClient.js` — chip + glass panel + scale
- `components/v2/StudentToolsPanel.js` — Tools panel honors text size
- `app/v2/student/tools/StudentToolsClient.js` — Tools page shell scale
- `app/v2/student/activity/[id]/StudentActivityClient.js` — activity shell scale
- `app/v2/student/project/[id]/StudentProjectClient.js` — project shell scale

## Gaps (out of scope)
- No real TTS / sound effects (toggle is preference only)
- No account sync, roster names, or teacher-controlled nicknames API
- No dark mode / full accessibility settings panel
- Do **not** merge to `main`
