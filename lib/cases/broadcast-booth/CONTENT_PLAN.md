# Broadcast Booth — content plan

**For any coding bot.** Updated Sept 28, 2026.
Read this file, then `AUTHORING.md` in this same folder, then `AGENTS.md`. Build **one** row unless Emily names more than one.

## How the library is built

The first wave is a **wide example**: different subjects and different kinds of ideas, not twelve versions of weather and water. After it is built, finish one subject and one grade at a time. A finished shelf is four broadcasts: two Explain, one Correspondent, one Debate.

Do not repeat a story. In particular:

- One water-cycle broadcast, and it is not in the first wave.
- Day and night is not the Moon.
- The canyon is the only "water shapes the land" story, and it is not in the first wave.
- The cactus is the only plant-adaptation story. The creek is the only food-chain story. Do not write those again.
- The dam debate is not the renewable-energy debate.

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

## Already built

Leave these Grade 3 Science cases alone.

| Status | Code | Format | Title |
| --- | --- | --- | --- |
| Built | SCI.3.13A-BB | Explain | Desert Radio: How does a cactus survive? |
| Built | SCI.3.12B-BB | Correspondent | Creek Desk: Reporting from a Texas creek |
| Built | SCI.3.11B-BB | Debate | Schoolyard Debate: Shade trees or more playground? |

## First wave — wide example

| Status | Code | Format | Grade | Topic | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- | --- | --- |
| Built | SCI.5.9-BB | Explain | 5 | Space | Why Earth has day and night. Not the Moon. | `lib/cases/broadcast-booth/wave1.js`. SQL file written, not run. |
| Built | SCI.5.7A-BB | Explain | 5 | Forces | Why an object starts moving, stops, or stays put. | `lib/cases/broadcast-booth/wave1.js`. SQL file written, not run. |
| Built | SCI.4.8C-BB | Explain | 4 | Electricity | How a closed circuit lights a bulb. | `lib/cases/broadcast-booth/wave1.js`. SQL file written, not run. |
| Built | SCI.3.6C-BB | Explain | 3 | Matter | What heating and cooling do to water: ice, liquid, and vapor. Not the water cycle. | `lib/cases/broadcast-booth/wave1.js`. SQL file written, not run. |
| Built | SCI.5.13B-BB | Correspondent | 5 | Animal behavior | One behavior an animal is born knowing, and one a person taught it. Not a food chain, and not body parts. | `lib/cases/broadcast-booth/wave1.js`. SQL is in the chat and in `add_broadcast_booth_instinct.sql`. Not run. |
| Next | SCI.4.11A-BB | Debate | 4 | Energy choice | Two fair ways to power a town: one renewable, one nonrenewable. | Expedition roadmap: 4.11A renewable and nonrenewable resources. |
| | ELA.3.6F-BB | Explain | 3 | Inference | What a story shows about a character when it never says the feeling out loud. | `lib/cases/ELA-3-6F.public.js` |
| | ELA.5.8A-BB | Explain | 5 | Theme | The theme of a story, with evidence from the text. | `lib/cases/ELA-5-8A.public.js` |
| | ELA.5.9E-BB | Debate | 5 | Argument | Facts for a claim and facts against it, then which side the facts support. | `lib/cases/ELA-5-9E.public.js` |
| | MA.3.5B-BB | Explain | 3 | Multiplication | One multiplication problem shown with an array. Numbers within 100. | `lib/cases/MA-3-5B.public.js` |
| | MA.4.3E-BB | Explain | 4 | Fractions | How to add two fractions with the same denominator. | `lib/cases/MA-4-3E.public.js` |
| | SS.3.2B-BB | Correspondent | 3 | Communities | Two communities that meet the same needs in different ways. | `lib/cases/SS-3-2B.public.js` |
| | SS.4.10A-BB | Explain | 4 | Economics | How supply and demand change price and what is available. | `lib/cases/SS-4-10A.public.js` |

## Later

Do not build these until the first wave is done, and do not let them repeat a first-wave story.

- The one water-cycle Explain: SCI.4.10A-BB
- The one Moon Explain: SCI.4.9B-BB
- The one canyon Correspondent: SCI.4.10B-BB
- Grade 5 decimal money Explain: MA.5.3E-BB, from `lib/cases/MA-5-3E.public.js`

Then fill one grade and one subject at a time until each shelf has four broadcasts.
