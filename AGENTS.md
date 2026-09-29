# Agent guidance

## Broadcast Booth content

- Before creating Broadcast Booth activities, read `lib/cases/broadcast-booth/AUTHORING.md`.
- Reuse the approved shared studio; add content, not a new activity UI.
- Complete catalog registration, picture assets, matching SQL rows, and content-library regeneration. Distinguish committed content from database-applied and live content.

## Maker / image library

- New kid-facing ClearCenters product illustrations/photos belong under `public/maker/` (preferred) or `public/lab/`.
- Maker Studio’s student library is a living scan of those folders; new image files become searchable automatically. Do not hand-edit JSON or add a Maker-only step.
- Do not put Maker-usable art only in Downloads, chat attachments, or random paths.
- Exclude UI chrome, icons, and badges. `public/cases/` is case-card chrome, not kid library content unless the scanner roots are widened.

See `public/maker/README.md` for the drop-folder convention.

## Content library

- Every bank lives in `lib/cases`. Do not leave new content only in a chat, a download, or a side folder.
- After adding or moving banks, run `node tools/content-library.cjs`.
- That rewrites `content-library/CONTENT_LIBRARY.md` and `content-library/catalog.json`.
- A bank is not done until it is in that catalog and has a matching `cases` SQL row. The markdown lists anything on disk with no SQL row, and any SQL row with no file.

## Maker Studio content

- Read `lib/cases/maker-studio/AUTHORING.md` before adding Maker activities.
- Preserve the shared Inventor's Lab layout and the live image-library scanner. Content changes should not fork the student interface or hardcode library choices.
