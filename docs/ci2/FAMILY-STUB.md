# CI2.0 · Family note stub (teacher one-pager)

Branch: `ci2-sandbox`  
Routes: Check-ins / Reports → **Family note** → `/v2/teacher/family/[id]`

## Why
Teachers need a calm **family one-pager** — kid name, today’s focus in plain language, one celebration + one ask-at-home chip, copy message, and a **Send to family** demo queue — without building a parent portal. Skeleton only.

## Layout
- Label · SAM line · **kid name**
- Chips: day · subject / TEKS · assignment
- **Today’s focus** (plain language)
- Two chips: **Celebrate** (teal) · **Ask at home** (amber)
- Message stub + **Copy message** + **Send to family** (demo)
- Links: ← Check-ins · Reports · Daily Focus

Not a parent login. Teacher share sheet only.

## Click tour
1. `/v2` → **Check-ins** (`/v2/teacher/check-ins`)
2. On a kid card (e.g. Kai) tap **Family note** → `/v2/teacher/family/wnm-kai`
3. Glance: focus · celebrate · ask-at-home · copy message
4. **Copy message** → clipboard stub (toast “Copied ✓”)
5. **Send to family** → calm “Queued for family · demo only” + **Sent · demo ✓** (localStorage `ci2.family.sentDemo`)
6. Optional: **Reports** → footer **Family note** (demo Kai) → same stub
7. **← Check-ins** or **Daily Focus** returns

## Tone
- Assistant, glass / StationShell — 80% beauty / 20% glance grammar
- Calm ready / needs-you whispers on celebrate / ask chips
- G3-teacher voice; short home sentences

## Files
- `lib/v2/demoFamilyNote.js` — stub model + `FAMILY_NOTE_HREF` + sent-demo helpers
- `app/v2/teacher/family/[id]/` — page + `FamilyNoteClient`
- `app/v2/teacher/check-ins/CheckInsClient.js` — Family note on kid cards
- `app/v2/teacher/reports/ReportsClient.js` — one clear Family note link
- `docs/ci2/FAMILY-STUB.md` — this note

## Gaps (out of scope)
- No parent portal / auth / real SMS / email send
- Send is a queued-demo confirmation only (same browser)
- Copy is browser clipboard only (same device)
- Demo kids only (Check-ins roster)
- Do **not** merge to `main`
