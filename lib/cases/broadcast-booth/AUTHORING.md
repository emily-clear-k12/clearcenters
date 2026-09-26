# Broadcast Booth — authoring mold

Beats are **fixed by segment type** in `catalog.js` (`SEGMENT_TYPES`). Teachers/authors do **not** invent new beat ids; they supply case data that fills trays, stems, stimulus, and unlock rules.

Student UI keys off `segmentType` + `beats` + case fields. Keep Desert Radio `SCI.3.13A-BB` (Explain) unchanged when adding cases.

## Required case fields

| Field | Notes |
|-------|--------|
| `standard` | Unique id, usually `{TEKS}-BB` (e.g. `SCI.3.12B-BB`) |
| `title` | Kid-facing title |
| `engine` | Always `"broadcast_booth"` |
| `grade` | Number (3–5) |
| `subject` | `"Science"` / `"Social Studies"` / etc. |
| `teks` | Base TEKS code without `-BB` |
| `segmentType` | `"explain"` \| `"correspondent"` \| `"debate"` |
| `kicker` | Short header, e.g. `Broadcast Booth · Correspondent` |
| `prompt` | Live assignment prompt (grade-leveled) |
| `stimulus` | Grade-leveled left-column pack (see shapes below) |
| `brainstormChips` | Image-first chips for the Ideas bank (`id`, `label`, `source`, `imageId`, `imageUrl`) |
| `beatStems` | Map of beat id → stem chips (same chip shape) |
| `brainstormMin` | Unlock rule: `requiredBeatIds`, `minPerBeat`, `emptyHint` |

## Recommended / optional

| Field | Notes |
|-------|--------|
| `topic` | Short topic line |
| `cover` | `{ headline, line }` cover card before plan |
| `estimatedMinutes` | Default ~28 |
| `samOpen` | Sam tip |
| `learning_target` / `lesson_summary` / `misconception_note` | Teacher Assign + SQL |
| `sideALabel` / `sideBLabel` | **Debate only** — tray labels (also overridable on assign) |
| `overlayStills` | Optional map of beat id → `{ imageUrl, caption }` for optional still prompts |
| `teks` / `gradeBand` inside stimulus | Help authors keep reading level honest |

## Segment types (fixed beats)

### Explain — Hook → Big idea → Show me → Sign off
- Unlock default: ≥1 chip on **Big idea** and **Show me**
- Stimulus shape: `{ title, bullets[], readAloud?, gradeBand? }`

### Correspondent — Where → What I noticed → Why it matters → Sign off
- Unlock default: ≥1 on **What I noticed** and **Why it matters**
- Stimulus shape:
  ```js
  {
    gradeBand: "G3",
    title: "Creek field kit",
    readAloud: true,
    sceneSetter: "You are here…",          // you-are-here line
    placeStill: { imageUrl, caption },     // place photo
    artifactCard: { title, body, imageUrl? },
    bullets: ["…"],                        // optional extra notes
  }
  ```

### Debate — Side A → Side B → What I think now → Sign off
- Unlock default: ≥1 on **Side A** and **Side B**
- Set `sideALabel` / `sideBLabel` on the case (teacher may override via `broadcast_booth_config`)
- Stimulus shape:
  ```js
  {
    gradeBand: "G3",
    title: "Schoolyard meeting notes",
    readAloud: true,
    sharedContext: "The school has one empty lot…",
    sideBriefs: {
      sideA: { label: "More shade trees", bullets: ["…"] },
      sideB: { label: "More playground", bullets: ["…"] },
    },
  }
  ```

## Chip art

- Put photoreal PNGs under `public/maker/broadcast/` (prefix `bb-`).
- Chips are image-first with a **tiny caption** in the UI — no typing in the storyboard.
- Reuse existing desert chips for Explain; add new files for new cases.

## Wiring a new case (author checklist)

1. Add the case object to `CASES` in `catalog.js` (and export if needed).
2. Add an Assign fallback row in `assignFallback.js` + include it in `broadcastBoothLibraryRows()` on the teacher Assign page.
3. Insert/update the SQL row (`add_broadcast_booth_cases.sql`) — Emily runs it in Supabase.
4. Drop chip PNGs in `public/maker/broadcast/`.
5. Smoke: Assign → open as student → trays show segment labels → unlock blocks until required trays have chips → record still works for Explain.

## SQL

`cases` table only stores `standard, title, engine, grade, subject` (+ teacher blurb columns). **All playable content lives in the catalog JS.** SQL makes the case assignable in the library.
