# ClearCenters — Briefings Build Plan (v1)

**Goal:** Ship Social Studies teach-first **Briefings** as a separate product surface from the Challenge Library / My Missions, using the content + art already authored for Grade 3 (`SS-3-*-BR`).

**Locked product rules**
- Student Home: **My Briefings** button at bottom of dashboard → `/briefings`
- Data: **Option A** parallel `briefings*` tables (not `cases`)
- Briefings ≠ Challenges (separate hub door)
- Spine: Intel Drop → Field Brief → Ops Choice → Evidence Drop → Clearance
- After clearance: teacher-controlled “Assign related Challenge” (no auto-unlock)
- IDs stay `SS-3-*-BR` (never collide with science `3.x-MM` / group chat `3.6A` science cases)
- Art: painterly storybook under `/public/briefings/...`

---

## 1. Where it lives in the app

### Student
| Today | Add |
|-------|-----|
| Home dashboard action buttons | **My Briefings** button at the **bottom of the student dashboard/Home** → `/briefings` (Emily’s ask) |
| Sidebar: Home, My Missions, Progress, Badges, Gear Locker | Optional matching **Briefings** sidebar item (nice-to-have; Home button is required) |
| My Missions = assigned Challenges | Briefings stay out of My Missions |

**Student flows**
1. Home → **My Briefings** (bottom dashboard button)
2. `/briefings` — browse/assigned list by subject/grade (start: Social Studies · Grade 3); status Not started / In progress / Cleared
3. `/briefing/[assignmentId]` — player (5 phases)
4. Progress — show Briefing clearances separately from Challenge grades (or a Briefings tab)

### Teacher
| Today | Add |
|-------|-----|
| Assign Challenges | Assign Briefings (+ optional related Challenge after clear) |
| Grade / Live Ops for Challenges | Briefing completion + Evidence Drop AI scores |

**Teacher flows**
1. Assign Briefing to class/group (mirror existing assignment_students targeting)
2. After student Cleared → CTA **Assign related Challenge** (if `relatedChallengeIds` set; empty for now)

---

## 2. Data model (recommended)

**Do not** dump Briefings into the science Challenge `cases` catalog as another engine-only row without a subject fence — teachers would mix them.

### Option A (recommended): parallel tables
```text
briefings
  id (text PK)              -- SS-3-2A-BR
  title, tagline
  subject                   -- social_studies
  grade                     -- 3
  teks                      -- 3.2A
  minutes
  related_challenge_ids     -- text[] / jsonb, default []
  engine                    -- 'briefing'
  published                 -- bool

briefing_assignments        -- mirror assignments
  id, class_id, briefing_id, due_date, created_at

briefing_assignment_students
  assignment_id, student_id

briefing_submissions
  id, assignment_id, student_id
  phase_state (jsonb)       -- progress through 5 phases
  scores (jsonb)            -- intel/ops/evidence/clearance
  status                    -- in_progress | cleared
  cleared_at
```

### Option B: reuse `cases` + hard filters
- `cases.engine = 'briefing'` AND `cases.subject = 'social_studies'`
- Filter Challenge Library to `engine != 'briefing'`
- Faster to stand up, easier to accidentally leak into Challenge UI — only if we audit every list query

**LOCKED: Option A** — Emily chose separate Briefings shelf (2026-09-10). Do not use Option B.

---

## 3. Content packaging in the repo

Mirror Mission Map’s pattern (separate registry, public vs server):

```text
lib/briefings/
  index.public.js
  index.server.js
  SS-3-2A-BR.public.js
  SS-3-2A-BR.server.js
  ... (34 Grade 3 packs)

public/briefings/
  ss-3-2a-br/
    01-intel-....png
    ...
```

**Conversion job (one-time):** turn the markdown drafts in `/workspace/clearcenters/SS-3-*-BR-*.md` into `.public.js` / `.server.js` objects matching the Briefing schema (intelDrop, fieldBrief, opsChoice, evidenceDrop, clearance).

**Pilot content first:** wire **SS-3-2A-BR** end-to-end before bulk-importing all 34.

---

## 4. Player (new engine)

New client: `app/briefing/[assignmentId]/BriefingClient.js`  
Router: either dedicated route or extend `app/activity/[assignmentId]/page.js` with `engine === 'briefing'` branch (same pattern as mission_map / simulation_lab).

### Phase machine
```text
intelDrop → fieldBrief → opsChoice → evidenceDrop → clearance → cleared
```

Reuse product patterns already in ClearCenters:
- S.A.M. stage / reactions
- Self-check gate (3 of 5)
- Confidence emoji on submit
- AI grade Evidence Drop via existing `/api/ai` patterns with `mustInclude` from server pack
- Auto-grade QCs / clearance items client→API with server keys

### Dual launch
- **Center:** student runs solo on device
- **Whole-group:** same player; teacher projects; students respond on devices at claim / ops / evidence

---

## 5. Build phases (ship order)

### Phase 0 — Foundations (½–1 day)
- [ ] Confirm Option A vs B with Emily
- [ ] SQL migration: briefings tables (or cases columns if B)
- [ ] Seed row for `SS-3-2A-BR`
- [ ] Copy pilot art into `public/briefings/ss-3-2a-br/`

### Phase 1 — Skeleton UI (1 day)
- [ ] Student sidebar **Briefings**
- [ ] `/briefings` list (hardcoded pilot card OK)
- [ ] Teacher assign Briefing (clone assign/new patterns)
- [ ] Empty player shell with phase tabs

### Phase 2 — Player v1 for SS-3-2A-BR (2–3 days)
- [ ] Convert 3.2A markdown → public/server JS
- [ ] Implement all 5 phases + save progress
- [ ] AI Evidence Drop grading
- [ ] Cleared screen + teacher “Ready for Challenge” flag (no related Challenge yet)

### Phase 3 — Polish & Progress (1 day)
- [ ] Progress integration
- [ ] Teacher grade/completion view for Evidence Drop
- [ ] Whole-group notes in teacher resources

### Phase 4 — Content pipeline (ongoing)
- [ ] Scripted markdown→JS importer for remaining 33
- [ ] Bulk art upload to `public/briefings/`
- [ ] Publish strand-by-strand (History → Geo → …)

### Phase 5 — Challenge handoff (later)
- [ ] Author SS Challenges or link existing when ready
- [ ] Teacher one-click assign related Challenge after clear

---

## 6. Explicit non-goals for v1

- Not migrating science Challenges into Briefings
- Not auto-unlocking Challenges
- Not building skills-only Briefings (3.14–3.16) yet
- Not Grade 4/5 Briefings yet
- Not inventing a second S.A.M. personality

---

## 7. Recommended first code PR

**Title:** `Briefings: scaffold + SS-3-2A-BR pilot`  
**Includes:** migration, nav link, list page, assign stub, player with 5 phases for 3.2A only, art assets for 3.2A.

---

## 8. Decision needed from Emily

1. **Data model:** Option A (parallel `briefings` tables) vs Option B (reuse `cases` with filters)?  
2. **Start coding now** on the pilot PR, or refine the plan first?

