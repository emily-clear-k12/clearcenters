# Broadcast Booth — content plan

**For any coding bot.** Updated Sept 29, 2026 (evening): second wave finished; Science queue added.
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

The first wave is done. The second wave is done too (Sept 29). Next is the Science queue below.

## Second wave — finish two science shelves

These four were chosen before the full-coverage rule. They still go first. After them, pick one grade and one subject and give every content standard in it a broadcast.

Grade 3 Science already has four broadcasts. The other Grade 3 Science standards still get their own later. Do not rewrite the cactus, the creek, or the schoolyard.

This wave is still the next four. It does not finish either science grade. The Moon is a different standard from day and night, so it gets its own broadcast later, when the rest of Grade 4 Science is built.

| Status | Code | Format | Grade | Topic | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- | --- | --- |
| Built | SCI.4.10A-BB | Explain | 4 | Water cycle | The one water-cycle broadcast. Water moves, and the Sun is the energy that lifts it. Not day and night, and not the creek food chain. | `lib/cases/broadcast-booth/wave2.js`. SQL in the chat. Not run. Grade 5 Sun-and-ocean (5.10A) is covered by this one. |
| Built | SCI.4.10B-BB | Correspondent | 4 | Canyon | Slow change: weathering, erosion, and deposition. Not the water cycle. Grade 5 landforms (5.10C) can be its own broadcast later, about the shapes, not this process. | `lib/cases/broadcast-booth/wave3.js`. SQL in `add_broadcast_booth_wave3.sql`. Not run. Pictures requested in `image-prompts/broadcast-booth/wave3.md`; chips show words only until they are made. |
| Built | SCI.5.11-BB | Debate | 5 | Using less | Two fair ways to cut harm from using resources: use less, or recycle. Not the wind-and-gas debate. | `wave3.js`. SQL in `add_broadcast_booth_wave3.sql`. Not run. Pictures requested. |
| Built | ELA.5.9D-BB | Explain | 5 | Central idea | The central idea of an informational text, with evidence. Not the theme of the trumpet play. | `wave3.js`. Original article, "Where Did the Horned Lizards Go?" SQL in `add_broadcast_booth_wave3.sql`. Not run. Pictures requested. |

## Science queue — every remaining content standard

Emily, Sept 29: one Broadcast Booth per standard. Science goes first. This is the full list of Science standards that still need one, with a planned format and story. The format and story are suggestions a bot can improve, but keep them different from every other row (no repeated stories). Grade 4 first, then Grade 3, then Grade 5.

**Pictures:** a bot that cannot make pictures writes the requests in `image-prompts/broadcast-booth/` and ships the case with `ART_READY = false` (see `wave3.js`), so chips show words only. Never point at a picture file that does not exist.

| Status | Code | Format | Story (keep it different from every other row) |
| --- | --- | --- | --- |
| Built | SCI.4.9B-BB | Explain | The Moon's shape changes in a pattern over about a month. Not day and night. Built in `wave4.js`; pictures requested in `image-prompts/broadcast-booth/wave4.md`. |
| Built | SCI.4.6A-BB | Explain | Sorting a tray of objects by properties: temperature, mass, magnetism, sinking or floating, physical state. Built in `wave4.js`; pictures requested in `image-prompts/broadcast-booth/wave4.md`. |
| Built | SCI.4.6B-BB | Correspondent | Kitchen lab: trail mix and salad are mixtures; salt water and lemonade are solutions. Built in `wave4.js`; pictures requested in `image-prompts/broadcast-booth/wave4.md`. |
| Built | SCI.4.6C-BB | Explain | Soil and water weigh the same before and after mixing. Matter is conserved. Built in `wave4.js`; pictures requested in `image-prompts/broadcast-booth/wave4.md`. |
| Built | SCI.4.7-BB | Explain | Friction on the gym floor: sneakers grip, socks slide. Not a ramp. Built in `wave5.js`; pictures requested in `image-prompts/broadcast-booth/wave5.md`. |
| Built | SCI.4.8A-BB | Correspondent | At the lake: a rolling ball, a wave, and a sound all carry energy. Built in `wave5.js`; pictures requested in `image-prompts/broadcast-booth/wave5.md`. |
| Built | SCI.4.8B-BB | Explain | Conductors and insulators: a metal pot, an oven mitt, a copper wire in a plastic coat. Built in `wave5.js`; pictures requested in `image-prompts/broadcast-booth/wave5.md`. |
| Built | SCI.4.9A-BB | Correspondent | Seasons desk: daylight and temperature in Texas across a year. Built in `wave5.js`; pictures requested in `image-prompts/broadcast-booth/wave5.md`. |
| Built | SCI.4.10C-BB | Explain | One rainy week is weather; thirty years of rain is climate. Built in `wave6.js`; pictures requested in `image-prompts/broadcast-booth/wave6.md`. |
| Built | SCI.4.11B-BB | Correspondent | A power outage shows how much modern life needs energy, and how saving it helps. Not the use-less debate. Built in `wave6.js`; pictures requested in `image-prompts/broadcast-booth/wave6.md`. |
| Built | SCI.4.11C-BB | Explain | Porous rock stores water and oil like a sponge; solid rock does not. Built in `wave6.js`; pictures requested in `image-prompts/broadcast-booth/wave6.md`. |
| Built | SCI.4.12A-BB | Explain | A leaf makes food from sunlight, water, and carbon dioxide. Built in `wave6.js`; pictures requested in `image-prompts/broadcast-booth/wave6.md`. |
| Built | SCI.4.12B-BB | Correspondent | Forest floor food web, with decomposers. Not the creek food chain. Built in `wave7.js`; pictures requested in `image-prompts/broadcast-booth/wave7.md`. |
| Built | SCI.4.12C-BB | Correspondent | Dinosaur Valley tracks show this place was once a muddy shoreline. Built in `wave7.js`; pictures requested in `image-prompts/broadcast-booth/wave7.md`. |
| Built | SCI.4.13A-BB | Explain | Plant structures: a live oak's waxy leaves and a mesquite's deep roots. Not the cactus. Built in `wave7.js`; pictures requested in `image-prompts/broadcast-booth/wave7.md`. |
| Built | SCI.4.13B-BB | Explain | Inherited traits (fur color) versus acquired traits (a scar, strong muscles). Not behavior. Built in `wave7.js`; pictures requested in `image-prompts/broadcast-booth/wave7.md`. |
| Built | SCI.3.6A-BB | Explain | Testing objects: how hot, how heavy, magnetic or not, sink or float. Built in `wave8.js`; pictures requested in `image-prompts/broadcast-booth/wave8.md`. |
| Built | SCI.3.6B-BB | Explain | Solids keep their shape; juice and air take the shape of their container. Built in `wave8.js`; pictures requested in `image-prompts/broadcast-booth/wave8.md`. |
| Built | SCI.3.6D-BB | Correspondent | Maker table: combining clay, sticks, and paper to build a tower that stands. Built in `wave8.js`; pictures requested in `image-prompts/broadcast-booth/wave8.md`. |
| Built | SCI.3.7A-BB | Explain | A magnet pulls from a distance, gravity pulls down, a hand pushes by touching. Built in `wave8.js`; pictures requested in `image-prompts/broadcast-booth/wave8.md`. |
| Built | SCI.3.7B-BB | Correspondent | Playground: pushes and pulls change where things go and how they move. Not balanced forces. Built in `wave9.js`; pictures requested in `image-prompts/broadcast-booth/wave9.md`. |
| Built | SCI.3.8A-BB | Correspondent | Energy hunt at the fair: light, sound, heat, and motion. Built in `wave9.js`; pictures requested in `image-prompts/broadcast-booth/wave9.md`. |
| Built | SCI.3.8B-BB | Explain | A faster bowling ball has more energy and knocks down more pins. Built in `wave9.js`; pictures requested in `image-prompts/broadcast-booth/wave9.md`. |
| Built | SCI.3.9A-BB | Explain | The Moon orbits Earth, and Earth orbits the Sun. Not phases, not day and night. Built in `wave9.js`; pictures requested in `image-prompts/broadcast-booth/wave9.md`. |
| Built | SCI.3.9B-BB | Explain | The order of the planets from the Sun. Built in `wave10.js`; pictures requested in `image-prompts/broadcast-booth/wave10.md`. |
| Built | SCI.3.10A-BB | Correspondent | Weather desk: Amarillo and Houston on the same day. Built in `wave10.js`; pictures requested in `image-prompts/broadcast-booth/wave10.md`. |
| Built | SCI.3.10B-BB | Explain | Soil forms from broken rock and rotting leaves. Not the canyon. Built in `wave10.js`; pictures requested in `image-prompts/broadcast-booth/wave10.md`. |
| Built | SCI.3.10C-BB | Correspondent | A landslide closes a road: fast changes to the land. Built in `wave10.js`; pictures requested in `image-prompts/broadcast-booth/wave10.md`. |
| Next | SCI.3.11A-BB | Correspondent | Farm, road, and building site: how people use natural resources. |
| Planned | SCI.3.11C-BB | Explain | Reduce, reuse, recycle with one lunch box. Not bottles and paper. |
| Planned | SCI.3.12A-BB | Explain | Monarchs migrate, bats hibernate, trees go dormant. |
| Planned | SCI.3.12C-BB | Correspondent | A drought at a stock pond: some living things thrive, some move, some die. Not the creek. |
| Planned | SCI.3.12D-BB | Correspondent | Texas fossils (ammonites, shark teeth) show living things from long ago. |
| Planned | SCI.3.13B-BB | Explain | Compare the life cycle of a cricket and a lima bean. |
| Planned | SCI.5.6A-BB | Explain | Compare mystery solids by mass, magnetism, density, solubility, and conductivity. |
| Planned | SCI.5.6B-BB | Correspondent | Beach sand with iron filings: a magnet pulls them out because each keeps its properties. |
| Planned | SCI.5.6C-BB | Explain | Salt disappears in water but the mass stays the same. |
| Planned | SCI.5.6D-BB | Explain | Air in a balloon: particles too small to see still take up space. |
| Planned | SCI.5.7B-BB | Correspondent | Science fair: designing a fair test with a balloon rocket on a string. |
| Planned | SCI.5.8A-BB | Explain | A flashlight: chemical energy to electrical energy to light. |
| Planned | SCI.5.8B-BB | Explain | A complete circuit can run a fan or a buzzer: motion and sound. Not the light bulb. |
| Planned | SCI.5.8C-BB | Explain | Light travels straight, bounces off a mirror, bends in water, and is absorbed. |
| Planned | SCI.5.10B-BB | Correspondent | Rock layers and oil in the Permian Basin: how sedimentary rock and fossil fuels formed. |
| Planned | SCI.5.10C-BB | Correspondent | Monahans Sandhills and a river delta: how wind and water build landforms. Not the canyon. |
| Planned | SCI.5.12A-BB | Correspondent | Coastal prairie: living and nonliving parts working together. |
| Planned | SCI.5.12B-BB | Explain | A coastal marsh food web: what happens when one living thing disappears. Not the creek. |
| Planned | SCI.5.12C-BB | Debate | Build a boardwalk through the wetland, or leave it wild? Both sides fair. |
| Planned | SCI.5.13A-BB | Explain | Roadrunner, jackrabbit, and kangaroo rat survive in the same desert in different ways. Not the cactus. |

Covered, do not build: SCI.5.10A (by SCI.4.10A-BB).

## Still waiting

- The Moon Explain, SCI.4.9B-BB. It gets its own broadcast with the rest of Grade 4 Science. It is not day and night.
- Grade 5 decimal money Explain, MA.5.3E-BB, from `lib/cases/MA-5-3E.public.js`. It joins the rest of Grade 5 Math when that grade is the one being filled.
- Do not build Science 5.10A. It is the same water-cycle idea as 4.10A. Mark it covered by that broadcast.
