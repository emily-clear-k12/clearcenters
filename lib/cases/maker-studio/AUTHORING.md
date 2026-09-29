# Maker Studio content and shared design

Maker Studio uses the approved Inventor's Lab: blue space-station room, teal frame, a left picture/tool dock, central editor, and mission/assigned pieces on the right. Existing and future activities use `MakerStudioClient.js` and `MakerStudioFrame.js`; do not create a separate UI for each lesson.

## Add an activity

1. Read the root AGENTS.md and the existing `catalog.js`, `modes.js`, `assignFallback.js`, and `menus.js` here. Use the existing Quick Maker case as the data shape.
2. Add a unique case standard, grade, subject, title, topic, prompt and appropriate `enabledModes` to the catalog's `CASES`. Verify curriculum alignment instead of inventing standard codes.
3. Use only existing live mode IDs from `modes.js`. Students must finish **every assigned mode**; do not introduce a choose-any-N requirement. Assign a manageable subset for the lesson.
4. Follow the existing Assign fallback pattern and create matching idempotent `cases` SQL rows with `engine = 'maker_studio'` and teacher-facing metadata. SQL makes cases assignable; catalog/config data supplies the activity. Inspect the teacher Assign integration before changing fallbacks.
5. Run `node tools/content-library.cjs` after adding case banks and commit its generated output. A SQL file being committed does not mean it was applied to the database. Report application/deployment status accurately.

## Growing image library

Use the existing `components/maker/LibraryPicker.js` and `/api/maker-studio/library` flow. The server scans `public/maker/` and `public/lab/`; read `public/maker/README.md` before adding art. New images in these folders are searchable after deployment without editing a manifest. The library dock shares this same endpoint; do not replace it with fixed sample thumbnails or a separate image collection. UI backgrounds live in `public/maker/_chrome/` and are excluded from student search.

Pictures are placed into the active editor; comics and Before/after use explicit destination selectors. Existing poster behavior is one image/drawing plus title and caption, not an arbitrary layered collage editor. Do not promise collage layering unless it is separately implemented and verified.

## Validate

Build and check the new assignment's enabled modes, content requirements, image search and placement, drawing, saved work, completion, reflection submission, and teacher view. Use an authorized test assignment for database/microphone checks. The `/design-preview/maker-studio` route is available only in development and Vercel preview, uses the same image scanner and editors, and prevents student saves and AI requests. Its in-memory saves reset on reload; it does not prove real student persistence.

Suggested request for another coding bot:

> Read AGENTS.md and lib/cases/maker-studio/AUTHORING.md. Create Maker Studio content for [grade, subject, topic/standard], using [modes]. Preserve the shared Inventor's Lab and growing image library. Complete catalog, Assign integration, art and SQL registration; regenerate the content library, validate, and report what is actually applied and deployed.

### Visual reference constraints
Keep the approved Inventor's Lab console proportions: narrow tool rail, searchable picture dock alongside the artwork when open, large central work surface, mission and assigned pieces at right, and a persistent Save/Done footer. Desktop poster artwork must fit the available height without pushing the footer offscreen. Avoid adding duplicate poster headings or turning the editor into a long stack of cards. Picture selection keeps the dock open. The supplied poster references show both collage artwork and single photographs; the current data model remains one picture/drawing with a title and caption, not a draggable multilayer collage editor.
