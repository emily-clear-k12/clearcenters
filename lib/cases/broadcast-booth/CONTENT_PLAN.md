# Broadcast Booth — content plan

**For any coding bot.** Updated Sept 28, 2026.
Read this file, then `AUTHORING.md` in this same folder, then `AGENTS.md`. Build **one** row unless Emily names more than one.

## How the library is built

Finish one subject and one grade before starting the next. A finished shelf is **four broadcasts**: two Explain, one Correspondent, one Debate. Four subjects and three grades is 48 cases. That is the size of the library, not a reason to jump around.

Order:

1. Grade 5 Science
2. Grade 4 Science
3. Grade 3 Science (three are already built; add the one missing Explain)
4. ELAR, one grade at a time, starting at Grade 5
5. Math, one grade at a time, starting at Grade 5
6. Social Studies, one grade at a time, starting at Grade 5

Do not start ELAR, math, or social studies until every science row below is **Built**.

## Rules

1. Take the first row marked **Next**. When it is in the catalog, has its own pictures, has a SQL file, and the content library has been regenerated, change that row to **Built** and mark the next row **Next**.
2. Do not redesign the studio. Parts go across the top. The storyboard for that part is under them. The idea bank is at the bottom.
3. Every caption that says something different gets its own picture file. Never reuse one photo for two reasons. Paths live in `public/maker/broadcast/` and start with `bb-`.
4. The standard sentence must match the wording already used in this repo, or be checked against Emily's TEKS PDF. Do not guess a code. Do not replace the standard with an "I can" sentence. If you cannot find the sentence, stop and ask.
5. Keep the words on that grade's level. Clips are 2–20 seconds. Science stays true to Earth. This is a kid news desk, not an Expedition Station planet.
6. Do not change a row marked **Built**.
7. A SQL file in the repo is not the same as the database being updated. Say which is true.
8. Work on `main`.

## Paste this to any bot

> Read AGENTS.md, lib/cases/broadcast-booth/AUTHORING.md, and lib/cases/broadcast-booth/CONTENT_PLAN.md. Build the one Broadcast Booth row marked Next. Keep the approved studio. Use the standard sentence from the source named in that row. Give every different caption its own picture. Add the catalog case, pictures, Assign fallback, SQL file, and regenerate the content library. Then mark that row Built. Tell me the standard, the files, and whether the SQL has been run.

## Grade 5 Science — start here

| Status | Code | Format | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- |
| Next | SCI.5.9-BB | Explain | Explain why Earth has day and night. | Expedition roadmap: 5.9 Earth's rotation and day and night. Confirm the full TEKS sentence before writing. |
| | SCI.5.10A-BB | Explain | Explain how the Sun and the ocean make weather. | Expedition roadmap: 5.10A Sun and ocean in the water cycle. Confirm the full TEKS sentence before writing. |
| | SCI.5.10C-BB | Correspondent | Report from a place that water, wind, or ice has changed. | Expedition roadmap: 5.10C landforms. Confirm the full TEKS sentence before writing. |
| | SCI.5.12C-BB | Debate | Should the town build a dam on the river? Both sides stay fair. | Expedition roadmap: 5.12C human impact on ecosystems. Confirm the full TEKS sentence before writing. |

## Grade 4 Science — after Grade 5

| Status | Code | Format | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- |
| | SCI.4.10A-BB | Explain | Explain where one drop of water goes in the water cycle. | Expedition roadmap: 4.10A water cycle |
| | SCI.4.9B-BB | Explain | Explain how the Moon's appearance changes across the month. | Expedition roadmap: 4.9B the Moon's appearance |
| | SCI.4.10B-BB | Correspondent | Report from a canyon cut by weathering, erosion, and deposition. | Expedition roadmap: 4.10B weathering, erosion, deposition |
| | SCI.4.11A-BB | Debate | Two fair ways to power a town: one renewable, one nonrenewable. | Expedition roadmap: 4.11A renewable and nonrenewable resources |

## Grade 3 Science — three already built

| Status | Code | Format | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- |
| Built | SCI.3.13A-BB | Explain | Desert Radio: How does a cactus survive? | Built. Animal structures. Do not rewrite. |
| Built | SCI.3.12B-BB | Correspondent | Creek Desk: Reporting from a Texas creek | Built. Food chains. Do not rewrite. |
| Built | SCI.3.11B-BB | Debate | Schoolyard Debate: Shade trees or more playground? | Built. Conservation. Do not rewrite. |
| | SCI.3.6C-BB | Explain | Explain what heating and cooling do to water: ice, liquid, and vapor. | Expedition roadmap: 3.6C state changes from heating and cooling |

## After science

Do not add these rows until the science shelves are built. When Emily says to start a subject, add four rows for one grade only: two Explain, one Correspondent, one Debate. Use a standard that already has a checked sentence in `lib/cases`. If it does not, stop and ask.
