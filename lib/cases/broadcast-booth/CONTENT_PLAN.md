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
6. Do not repeat a story already on this list. One water-cycle broadcast. One "water shapes the land" broadcast. One food-chain broadcast. One plant-adaptation broadcast. Day and night is not the Moon, and neither one is the water cycle.
7. Do not change a row marked **Built**.
8. A SQL file in the repo is not the same as the database being updated. Say which is true.
9. Work on `main`.

## Paste this to any bot

> Read AGENTS.md, lib/cases/broadcast-booth/AUTHORING.md, and lib/cases/broadcast-booth/CONTENT_PLAN.md. Build the one Broadcast Booth row marked Next. Keep the approved studio. Use the standard sentence from the source named in that row. Give every different caption its own picture. Add the catalog case, pictures, Assign fallback, SQL file, and regenerate the content library. Then mark that row Built. Tell me the standard, the files, and whether the SQL has been run.

## Grade 5 Science — start here

| Status | Code | Format | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- |
| Next | SCI.5.9-BB | Explain | Explain why Earth has day and night. Not the Moon, and not the water cycle. | Expedition roadmap: 5.9 Earth's rotation and day and night. Confirm the full TEKS sentence before writing. |
| | SCI.5.7A-BB | Explain | Explain why an object starts moving, stops, or stays put. Balanced and unbalanced forces. | Expedition roadmap: 5.7A balanced and unbalanced forces. Confirm the full TEKS sentence before writing. |
| | SCI.5.13B-BB | Correspondent | Report on one animal behavior that is instinct and one a person taught it. Not a food chain, and not body parts. | Expedition roadmap: 5.13B instinct and learned behaviors. Confirm the full TEKS sentence before writing. |
| | SCI.5.12C-BB | Debate | Should the town build a dam? Argue what happens to the plants and animals. Do not turn it into a water-cycle lesson. | Expedition roadmap: 5.12C human impact on ecosystems. Confirm the full TEKS sentence before writing. |

## Grade 4 Science — after Grade 5

| Status | Code | Format | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- |
| | SCI.4.10A-BB | Explain | Explain where one drop of water goes in the water cycle. This is the only water-cycle broadcast. | Expedition roadmap: 4.10A water cycle |
| | SCI.4.9B-BB | Explain | Explain how the Moon's appearance changes across the month. Not day and night. | Expedition roadmap: 4.9B the Moon's appearance |
| | SCI.4.10B-BB | Correspondent | Report from a canyon cut by weathering, erosion, and deposition. This is the only "water shapes the land" broadcast. | Expedition roadmap: 4.10B weathering, erosion, deposition |
| | SCI.4.11A-BB | Debate | Two fair ways to power a town: one renewable, one nonrenewable. Not the dam debate. | Expedition roadmap: 4.11A renewable and nonrenewable resources |

## Grade 3 Science — three already built

| Status | Code | Format | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- |
| Built | SCI.3.13A-BB | Explain | Desert Radio: How does a cactus survive? | Built. Animal structures. Do not rewrite. |
| Built | SCI.3.12B-BB | Correspondent | Creek Desk: Reporting from a Texas creek | Built. Food chains. Do not rewrite. |
| Built | SCI.3.11B-BB | Debate | Schoolyard Debate: Shade trees or more playground? | Built. Conservation. Do not rewrite. |
| | SCI.3.6C-BB | Explain | Explain what heating and cooling do to water: ice, liquid, and vapor. This is a states-of-matter story, not the water cycle. | Expedition roadmap: 3.6C state changes from heating and cooling |

## After science

Do not add these rows until the science shelves are built. When Emily says to start a subject, add four rows for one grade only: two Explain, one Correspondent, one Debate. Use a standard that already has a checked sentence in `lib/cases`. If it does not, stop and ask.
