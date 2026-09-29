# Broadcast Booth — content plan

**For any coding bot.** Updated Sept 29, 2026.
Read this file, then `AUTHORING.md` in this same folder, then `AGENTS.md`. Build **one** row unless Emily names more than one.

## How the library is built

Every content standard gets one Broadcast Booth. The three formats stay. The format follows the standard. Do not force a debate onto a math fact just to fill a quota.

- **Explain** — one idea the student can show with pictures. This is most of math, and most science that is not a choice.
- **Correspondent** — the student is somewhere, or is looking at a source: a place, a community, a document, a text, or something they observed.
- **Debate** — the standard really has two fair sides, a choice, or facts for and against. If it does not, it is an Explain.

The four-broadcast shelf was only for the first sample. It is not the goal anymore.

Do not repeat a story. Two neighboring standards still get two broadcasts, but not the same objects. Two fraction standards do not both use the trail. The exception: if a second standard is the same idea as one already built, do not make a twin. Mark it covered by the one that exists. Science 5.10A is covered by the Grade 4 water cycle. Do not build it.

Left out on purpose. These do not get a Broadcast Booth:

- Math process standards (the x.1 row).
- Science practices (x.1 through x.5).
- ELAR listening and speaking (x.1). The booth is already the speaking.
- ELAR decoding, spelling, and cursive (x.2). Reading Tools, later.
- ELAR fluency (x.4) and independent reading (x.5). Reading Tools, later.
- Social studies skills.

What that leaves, counted from `lib/teksWording.js` and `lib/briefings/teks/ss-teks-3-5.js` on Sept 28:

| Subject | Grade 3 | Grade 4 | Grade 5 | Total |
| --- | --- | --- | --- | --- |
| Science | 22 | 20 | 19 | 61 |
| ELAR | 54 | 54 | 54 | 162 |
| Math | 46 | 46 | 39 | 131 |
| Social Studies | 34 | 57 | 60 | 151 |
| **All** | | | | **505** |

Sixteen are built, including two Social Studies broadcasts. Leave those two as they are. Do not build another Social Studies broadcast until Science, ELAR, and Math are done.

## Build order

Emily, Sept 29: Social Studies goes last. Focus on science, reading, and math first.

1. The four planned rows below, when Emily says go.
2. The rest of Science. It is the smallest set, and the most is already built.
3. ELAR.
4. Math.
5. Social Studies last. The communities report and the lemonade report stay. Nothing new in Social Studies until then.

Do not generate a full grade list until Emily asks for that grade and subject.

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
7. Do not add a new Social Studies broadcast. Science, ELAR, and Math come first. The two Social Studies broadcasts already built stay as they are.
8. A SQL file in the repo is not the same as the database being updated. Say which is true.
9. Work on `main`.

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
| Built | SCI.4.11A-BB | Debate | 4 | Energy choice | Two fair ways to power a town: one renewable, one nonrenewable. | `wave1.js`. SQL in the chat. Not run. |
| Built | ELA.3.6F-BB | Explain | 3 | Inference | What a story shows about a character when it never says the feeling out loud. | `lib/cases/ELA-3-6F.public.js`. SQL in the chat. Not run. |
| Built | ELA.5.8A-BB | Explain | 5 | Theme | The theme of a story, with evidence from the text. | `lib/cases/ELA-5-8A.public.js`. SQL in the chat. Not run. |
| Built | ELA.5.9E-BB | Debate | 5 | Argument | Facts for a claim and facts against it, then which side the facts support. | `lib/cases/ELA-5-9E.public.js`. SQL in the chat. Not run. |
| Built | MA.3.5B-BB | Explain | 3 | Multiplication | One multiplication problem shown with an array. Numbers within 100. | `lib/cases/MA-3-5B.public.js`. SQL in the chat. Not run. |
| Built | MA.4.3E-BB | Explain | 4 | Fractions | How to add two fractions with the same denominator. | `lib/cases/MA-4-3E.public.js`. SQL in the chat. Not run. |
| Built | SS.3.2B-BB | Correspondent | 3 | Communities | Two communities that meet the same needs in different ways. | `lib/cases/SS-3-2B.public.js`. SQL in the chat. Not run. |
| Built | SS.4.10A-BB | Explain | 4 | Economics | How supply and demand change price and what is available. | `lib/cases/SS-4-10A.public.js`. SQL in the chat. Not run. |

The first wave is done. The water-cycle row is built. The canyon row is marked Next.

## Second wave — finish two science shelves

These four were chosen before the full-coverage rule. They still go first. After them, pick one grade and one subject and give every content standard in it a broadcast.

Grade 3 Science already has four broadcasts. The other Grade 3 Science standards still get their own later. Do not rewrite the cactus, the creek, or the schoolyard.

This wave is still the next four. It does not finish either science grade. The Moon is a different standard from day and night, so it gets its own broadcast later, when the rest of Grade 4 Science is built.

| Status | Code | Format | Grade | Topic | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- | --- | --- |
| Built | SCI.4.10A-BB | Explain | 4 | Water cycle | The one water-cycle broadcast. Water moves, and the Sun is the energy that lifts it. Not day and night, and not the creek food chain. | `lib/cases/broadcast-booth/wave2.js`. SQL in the chat. Not run. Grade 5 Sun-and-ocean (5.10A) is covered by this one. |
| Next | SCI.4.10B-BB | Correspondent | 4 | Canyon | Slow change: weathering, erosion, and deposition. Not the water cycle. Grade 5 landforms (5.10C) can be its own broadcast later, about the shapes, not this process. | `lib/teksWording.js` Science 4.10B. |
| Planned | SCI.5.11-BB | Debate | 5 | Using less | Two fair ways to cut harm from using resources: use less, or recycle. Not the wind-and-gas debate. | `lib/teksWording.js` Science 5.11. |
| Planned | ELA.5.9D-BB | Explain | 5 | Central idea | The central idea of an informational text, with evidence. Not the theme of the trumpet play. | `lib/teksWording.js` ELAR 5.9D. Confirm a short source text before writing. |

## Still waiting

- The Moon Explain, SCI.4.9B-BB. It gets its own broadcast with the rest of Grade 4 Science. It is not day and night.
- Grade 5 decimal money Explain, MA.5.3E-BB, from `lib/cases/MA-5-3E.public.js`. It joins the rest of Grade 5 Math when that grade is the one being filled.
- Do not build Science 5.10A. It is the same water-cycle idea as 4.10A. Mark it covered by that broadcast.
