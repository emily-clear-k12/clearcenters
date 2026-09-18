# CI2.0 · Family note stub (teacher one-pager)

Branch: `ci2-sandbox`  
Routes: Check-ins kid card → **Family note** → `/v2/teacher/family/[id]` (optional `?period=`)

## Why
Teachers need a calm **family one-pager** — kid name, today’s focus in plain language, one celebration + one ask-at-home chip, copy message, and a **Send to family** demo queue — without building a parent portal. Skeleton only. Deep-linked from each Check-ins kid row.

## Layout
- Label · SAM line · **kid name**
- Chips: day · subject / TEKS · assignment · **Period** (when deep-linked / card has `periodId`)
- **Today’s focus** (plain language)
- Two chips: **Celebrate** (teal) · **Ask at home** (amber)
- Message stub + **Copy message** + **Send to family** (demo)
- Links: ← Check-ins · Reports · Daily Focus

Not a parent login. Teacher share sheet only.

## Click tour
1. `/v2` → **Check-ins** (`/v2/teacher/check-ins`)
2. Setup → departmentalized · pick a period (e.g. Period 1 → Kai)
3. On the kid card tap clear **Family note** → `/v2/teacher/family/wnm-kai?period=A`
4. Glance: focus · celebrate · ask-at-home · Period chip · copy message
5. **Copy message** → clipboard stub (toast “Copied ✓”)
6. **Send to family** → calm “Queued for family · demo only” + **Sent · demo ✓** (localStorage `ci2.family.sentDemo`)
7. **← Check-ins** → same period still selected (`ci2.teacher.classFilter` synced)
8. Optional: **Reports** → footer **Family note** (demo Kai) → same stub (no period query)

## Tone
- Assistant, glass / StationShell — 80% beauty / 20% glance grammar
- Calm ready / needs-you whispers on celebrate / ask chips
- G3-teacher voice; short home sentences

## Files
- `lib/v2/demoFamilyNote.js` — stub model + `FAMILY_NOTE_HREF(id, { periodId })` + sent-demo helpers
- `app/v2/teacher/family/[id]/` — page + `FamilyNoteClient` (period query sync)
- `app/v2/teacher/check-ins/CheckInsClient.js` — clear Family note on each kid card
- `app/v2/teacher/reports/ReportsClient.js` — one clear Family note link
- `docs/ci2/FAMILY-STUB.md` — this note · `docs/ci2/CHECK-INS.md`

## Gaps (out of scope)
- No parent portal / auth / real SMS / email send
- Send is a queued-demo confirmation only (same browser)
- Copy is browser clipboard only (same device)
- Period chip shows class key (A/B/C), not fancy room titles
- Demo kids only (Check-ins roster)
- Do **not** merge to `main`
