# Broadcast Booth — authoring mold

The content queue is [CONTENT_PLAN.md](CONTENT_PLAN.md). Read that file and take one row. Do not invent a new list of cases.

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
| `sideALabel` / `sideBLabel` | **Debate only** — tray labels (case-level labels) |
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
- Set `sideALabel` / `sideBLabel` on the case (author these in the case; the student route currently does not load assignment overrides)
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
- Each different reason or caption gets its own picture file. Do not reuse one photo under several captions. The studio hides a repeated image URL in the idea bank, so a shared URL shows up once and the other caption loses its picture.
- Reuse an existing picture only when it is the same thing, not a similar one.

## Wiring a new case (author checklist)

1. Add the case object to `CASES` in `catalog.js` (and export if needed).
2. Add an Assign fallback row in `assignFallback.js` + include it in `broadcastBoothLibraryRows()` on the teacher Assign page.
3. Insert/update the SQL row (`add_broadcast_booth_cases.sql`) — Emily runs it in Supabase.
4. Drop chip PNGs in `public/maker/broadcast/`.
5. Smoke: Assign → open as student → trays show segment labels → unlock blocks until required trays have chips → record still works for Explain.

## SQL

`cases` table only stores `standard, title, engine, grade, subject` (+ teacher blurb columns). **All playable content lives in the catalog JS.** SQL makes the case assignable in the library.

---

## Coding-assistant workflow

This guide is for any coding assistant working in this repository. The owner wants to request new activities in chat and have them work in the existing Broadcast Booth studio. A separate content editor is not required.

## Start here

1. Read the root `AGENTS.md`, this guide, and `catalog.js` in this folder.
2. Ask for missing grade, subject/standard, topic, or activity format only if necessary. Use the supplied curriculum or verify curriculum claims against authoritative sources; do not invent standard alignments.
3. Inspect the matching seed: `DESERT_EXPLAIN`, `CREEK_CORRESPONDENT`, or `SCHOOLYARD_DEBATE`.
4. Add a new case object to `catalog.js` and register it in the `CASES` map by its unique `standard`. Do not overwrite an existing standard or change its beat IDs: saved assignments refer to them.

## Case fields

Use the existing seed objects as the executable templates. Include:

- Identity: `id`, unique `standard` (existing examples end in `-BB`), `engine: "broadcast_booth"`, `grade`, `subject`, and verified `teks` when applicable.
- Presentation: `title`, `kicker`, `topic`, `estimatedMinutes`, `segmentType`, `prompt`, `cover`, and `samOpen`.
- Teacher information: `learning_target`, `lesson_summary`, and `misconception_note`.
- Evidence: `stimulus` with a title and age-appropriate facts. Explain uses `bullets`; Correspondent uses `sceneSetter`, `placeStill`, `artifactCard`, and supporting bullets; Debate uses `sharedContext` and `sideBriefs.sideA/sideB` with labels and bullets. Both debate sides must have fair, supportable evidence.
- Planning: `brainstormChips` containing unique IDs, concise labels, `source: "stimulus"`, and optional `imageId`/`imageUrl`; `beatStems` keyed by the exact beat IDs, with unique stem IDs and `source: "stem"`.
- Requirements: the corresponding existing `BRAINSTORM_MIN_*` constant, or an intentional compatible `brainstormMin` definition. Optional `overlayStills` must use valid beat IDs and real image paths.
- Debate: `sideALabel` and `sideBLabel` define the visible side names.

Do not author new segment IDs for a normal content request. The shared formats are:

| Format | Beat IDs, in order | Required planning trays |
| --- | --- | --- |
| `explain` | `hook`, `big_idea`, `show_me`, `sign_off` | `big_idea`, `show_me` |
| `correspondent` | `where`, `what_noticed`, `why_matters`, `sign_off` | `what_noticed`, `why_matters` |
| `debate` | `side_a`, `side_b`, `what_i_think`, `sign_off` | `side_a`, `side_b` |

Each required tray normally needs one idea. Clips currently allow 2–20 seconds. Write prompts that fit that limit. Preserve teacher listening/review; do not invent automatic grading of recordings.

## Pictures and design

- Read `public/maker/broadcast/README.md` and the parent Maker README before adding art.
- Reuse suitable existing pictures; place new classroom-safe documentary photos/illustrations under `public/maker/broadcast/` with meaningful `bb-` names. In content, paths start `/maker/broadcast/` (omit `public`). Never ship broken placeholder image paths.
- Use a different picture file for every chip whose caption says something different. Never point two reasons at the same image URL. The planning view shows a repeated URL only once and drops the picture from the later chip.
- Keep text as real labels, not baked into pictures. Preserve accessibility/read-aloud.
- Do not redesign `BroadcastBoothClient.js`, `BroadcastStudioUI.js`, or `broadcast-booth.css` for a content request. The approved plan screen is top to bottom: the topic, then the part buttons (Hook, Big idea, and so on), then that part's storyboard, then the idea bank for that part. Do not go back to a long left-and-right column. Recording is the only place the ON AIR indicator appears.

## Make it assignable

The JavaScript catalog supplies playable content; a database `cases` row makes it available for assignment. Both are necessary.

1. Add the case’s Assign fallback row to `assignFallback.js` and include it in `broadcastBoothLibraryRows()` in `app/teacher/assign/new/page.js`, following the existing three cases.
2. Add an idempotent root SQL file named `add_broadcast_booth_<topic>.sql`, following `add_broadcast_booth_cases.sql`.
2. Insert/upsert `standard`, `title`, `engine` (`broadcast_booth`), `grade`, and `subject`. Update learning target, lesson summary, and misconception note for the exact new standard. Quote SQL apostrophes correctly.
3. Do not rerun or change unrelated cases. `add_broadcast_booth.sql` contains the initial schema setup; only apply it if that setup is actually missing.
4. Run `node tools/content-library.cjs` and commit the generated `content-library/CONTENT_LIBRARY.md` and `content-library/catalog.json` changes. Confirm the new standard has both a bank and an SQL row.
5. Apply the new SQL using the project's authorized database workflow when requested and access is available. A committed SQL file is NOT proof it ran. If database access is unavailable, report the exact file that remains to be applied.

The student route `app/activity/[assignmentId]/page.js` chooses this center when the assigned case row has `engine: "broadcast_booth"`; `index.public.js` resolves its standard through the catalog. Do not claim that a database row alone creates playable content. Assignment-level prompt overrides are not currently loaded by that route; author the actual prompt in the case.

## Validate and deliver

- Check unique case/chip/stem IDs, valid segment type, required tray IDs, complete evidence, and existing local image files.
- Run the repository build in the configured environment. Never insert real credentials into code or commit `.env` files.
- Use `/design-preview/broadcast-booth` on a development or Vercel preview deployment to inspect the new case. This route automatically lists registered cases and intentionally does not write student data; it is unavailable in production.
- Check Plan, Record, Review, long labels, pictures, and narrow-screen layout. For a release involving flow changes, also test an authorized test assignment: planning unlock, microphone permission, record/stop, reload/resume, self-check submission, and teacher playback. Preview test tones do not verify real recording or database persistence.
- Report the case standards added, modified files, build/check results, database application status, and deployment status. Keep content, database availability, and production deployment distinct.

## A prompt the owner can give any coding bot

> Read AGENTS.md and lib/cases/broadcast-booth/AUTHORING.md. Create [number] Broadcast Booth activities for [grade, subject, standards/topics], using [Explain, Correspondent, or Debate]. Keep the approved studio design. Add the full evidence, idea cards, sentence starters, appropriate pictures, catalog registrations, and matching SQL rows. Regenerate the content library, validate the activities, and tell me exactly what is deployed and whether the SQL has been applied.
