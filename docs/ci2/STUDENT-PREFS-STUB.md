# CI2.0 Student · Preferences stub

Branch: `ci2-sandbox`  
Surface: Student **My Day** (`/v2/student`) — calm glass chip + panel

## Why
Kids need a tiny bit of control without leaving the glance-first shell — **display name**, **text size** (S/M/L), and **sound on/off**. Real accounts / sync / TTS come later; this is localStorage only so demos stay calm.

## Click tour
1. `/v2` → **Student · My Day**
2. See the **display name chip** under the day (e.g. `Leo · M · sound off`)
3. Tap chip → glass panel opens
4. Edit **Display name** → greeting + SAM use the new name
5. Tap **S / M / L** → page text scale softens up or down
6. Tap **Sound on/off** → stub preference (no audio yet)
7. Switch demo kid **Leo → Kai** → prefs are per-kid (`ci2.student.prefs.{kid}`)
8. **Reset prefs** → back to that kid’s defaults
9. Optional: **Tools** still opens helpers; prefs stay on My Day

## Tone
- Student glass / warm lavender cream (matches My Day)
- Beauty first; quiet chip — not a settings maze
- Short SAM lines when prefs change

## Storage (same browser only)
| Key | Role |
|-----|------|
| `ci2.student.prefs.{kid}` | `{ displayName, textSize, soundOn }` per Leo / Kai / Riley |

## Files
- `lib/v2/demoStudentPrefs.js` — defaults + load/save/reset
- `app/v2/student/StudentMyDayClient.js` — chip + glass panel + scale

## Gaps (out of scope)
- No real TTS / sound effects (toggle is preference only)
- No account sync, roster names, or teacher-controlled nicknames API
- No dark mode / full accessibility settings panel
- Do **not** merge to `main`
