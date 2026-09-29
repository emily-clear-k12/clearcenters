# Broadcast Booth — content plan

**For any coding bot.** Written Sept 28, 2026.
Read this file, then `AUTHORING.md` in this same folder, then `AGENTS.md`. Build **one** row unless Emily names more than one.

## Rules

1. Take the first row marked **Next**. When it is in the catalog, has its own pictures, has a SQL file, and the content library has been regenerated, change that row to **Built** and mark the next row **Next**.
2. Do not redesign the studio. Parts go across the top. The storyboard for that part is under them. The idea bank is at the bottom.
3. Every caption that says something different gets its own picture file. Never reuse one photo for two reasons. Paths live in `public/maker/broadcast/` and start with `bb-`.
4. The standard sentence must be the official wording already used in this repo, or checked against Emily's TEKS PDF. Do not guess a code. Do not swap in an "I can" sentence and call it the standard. If you cannot find the sentence, stop and ask.
5. Keep the words on grade level. Clips are 2–20 seconds, so the prompt has to fit that.
6. Do not change the three cases already built.
7. A SQL file in the repo is not the same as the database being updated. Say which is true.
8. Work on `main`.

## Paste this to any bot

> Read AGENTS.md, lib/cases/broadcast-booth/AUTHORING.md, and lib/cases/broadcast-booth/CONTENT_PLAN.md. Build the one Broadcast Booth row marked Next. Keep the approved studio. Use the standard sentence from the source named in that row. Give every different caption its own picture. Add the catalog case, pictures, Assign fallback, SQL file, and regenerate the content library. Then mark that row Built. Tell me the standard, the files, and whether the SQL has been run.

## Already built

These three are Grade 3 Science. Leave them alone.

| Status | Code | Format | Title |
| --- | --- | --- | --- |
| Built | SCI.3.13A-BB | Explain | Desert Radio: How does a cactus survive? |
| Built | SCI.3.12B-BB | Correspondent | Creek Desk: Reporting from a Texas creek |
| Built | SCI.3.11B-BB | Debate | Schoolyard Debate: Shade trees or more playground? |

## Queue

One case per row. The story is a broadcast, not a worksheet. Science stays true to Earth. Both sides of a debate must be fair.

| Status | Code | Format | Grade | Subject | What the broadcast is | Standard source |
| --- | --- | --- | --- | --- | --- | --- |
| Next | ELA.3.9D-BB | Explain | 3 | ELAR | Explain the central idea of a short informational page, and two facts that support it. | `lib/cases/ELA-3-9D.public.js` |
| | SS.3.2B-BB | Correspondent | 3 | Social Studies | Report from two communities that meet the same needs in different ways. | `lib/cases/SS-3-2B.public.js` |
| | MA.4.3E-BB | Explain | 4 | Math | Explain how to add two fractions with the same denominator, using a picture the student can point to. | `lib/cases/MA-4-3E.public.js` |
| | SCI.3.6C-BB | Explain | 3 | Science | Explain what heating and cooling do to water: ice, liquid, vapor. | Expedition roadmap: 3.6C state changes from heating and cooling |
| | SCI.4.10A-BB | Explain | 4 | Science | Explain one drop of water going through the water cycle. | Expedition roadmap: 4.10A water cycle |
| | SCI.4.11A-BB | Debate | 4 | Science | Two fair ways to power a town: a renewable source and a nonrenewable source. | Expedition roadmap: 4.11A renewable and nonrenewable resources |
| | ELA.4.9E-BB | Explain | 4 | ELAR | Explain what makes a text argumentative, using a short kid-written example. | `lib/cases/ELA-4-9E.public.js` |
| | ELA.5.9E-BB | Debate | 5 | ELAR | Show facts for a claim and facts against it, then say which side the facts support. | `lib/cases/ELA-5-9E.public.js` |
| | MA.3.5B-BB | Explain | 3 | Math | Explain one multiplication problem with an array. Keep the numbers within 100. | `lib/cases/MA-3-5B.public.js` |
| | MA.5.4F-BB | Explain | 5 | Math | Explain how to simplify a numerical expression in order, including the grouping. No exponents. | `lib/cases/MA-5-4F.public.js` |
| | SS.3.1C-BB | Correspondent | 3 | Social Studies | Report how one person can help a community grow or help start a new one. | `lib/cases/SS-3-1C.public.js` |
| | SS.4.4D-BB | Correspondent | 4 | Social Studies | Report how forts, railroads, the Red River War, and the loss of the buffalo changed American Indian life in Texas. Use only the facts in the source file. | `lib/cases/SS-4-4D.public.js` |

## After this queue

Do not add a thirteenth case until Emily asks. The next wave should fill gaps she names, still one main standard per case, still no repeated titles.
