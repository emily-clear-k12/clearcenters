// Mission Map — "Region Evidence Trail" — Grade 4 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **4.6A — Four Physical Regions of Texas.** "Identify, locate, and
// describe Texas's four physical regions — Mountains and Basins, Great
// Plains, North Central Plains, and Coastal Plains — including landforms,
// climate, vegetation, and economic activities." Direct fit — the
// library's own gate order (landform clues, climate/resource clues,
// connect geography to settlement/work, reject a single-clue trap)
// exactly matches 4.6A's own list of what identifies a region: landforms,
// climate, vegetation, AND economic activities together, not just one.
// No re-anchor needed.
//
// Standard checkpoint type throughout — this concept's own trap ("the trap
// uses one picture as the whole answer") is already a strong multi-clue
// evidence-gate case without needing a special mechanic layered on top.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "4.6-MM",
  teksLabel:
    "TEKS 4.6A — Four Physical Regions of Texas (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Social Studies",
  title: "Region Evidence Trail",
  tagline: "One photo isn't enough to name a whole region. What other evidence is out there?",

  mission: {
    briefText:
      "A mapmaker's trail through Texas has four stops with no labels. Each stop has clues about landforms, climate, and resources. To name the region, you have to read all the evidence, not just the prettiest photo.",
    goal: "Use landform, climate, and resource evidence together to identify a Texas region. Explain how geography shapes where people live and work there.",
  },

  mapImage: "/mission-map/4-6-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: A trail marker shows flat, open land stretching to the horizon. There are very few trees. What landform is this?",
      evidence: {
        type: "data",
        label: "STOP 1 — LANDFORM CLUE",
        text: "The land is flat and open as far as the camera can see. Grasses grow instead of forests.",
      },
      choices: [
        { id: "a", text: "Steep mountains" },
        { id: "b", text: "Flat plains — wide, open land with few trees" },
        { id: "c", text: "A deep river canyon" },
        { id: "d", text: "A coastline" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The flat, open land with few trees at Stop 1 is a plains landform.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: The weather log for the same stop shows little rain and hot, dry summers. What does this clue add?",
      evidence: {
        type: "data",
        label: "STOP 2 — CLIMATE CLUE",
        text: "The log shows little rain each year and long, hot, dry summers. The grasses there grow well in dry places.",
      },
      choices: [
        { id: "a", text: "A rainy, humid climate" },
        { id: "b", text: "Climate has nothing to do with what grows or what people do" },
        { id: "c", text: "A dry climate, which fits grazing land better than farmland that needs lots of rain" },
        { id: "d", text: "This climate only exists on the coast" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The dry climate at Stop 2 fits land used for grazing, not land that needs lots of rain.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: A rancher's log shows big cattle ranches on this same flat, dry land. How does this connect to Stops 1 and 2?",
      evidence: {
        type: "data",
        label: "STOP 3 — ECONOMIC ACTIVITY CLUE",
        text: "The rancher's log describes wide cattle ranches. They need lots of flat, dry grazing land.",
      },
      choices: [
        { id: "a", text: "Ranching could happen anywhere, no matter the land or climate" },
        { id: "b", text: "Ranching fits this region's flat land and dry climate. People's work matches the geography." },
        { id: "c", text: "This clue has nothing to do with the region's geography" },
        { id: "d", text: "Cattle ranches only exist in mountain regions" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Big cattle ranches fit here because they need the flat, dry land found at Stops 1 and 2.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: An explorer wants to name the region from the ranching photo alone. She skips the landform and climate clues. Is that enough evidence?",
      evidence: {
        type: "passage",
        text: "\"It's clearly ranching country. That's all I need to know!\" the explorer says. She ignores the flat land and dry climate already logged.",
      },
      choices: [
        { id: "a", text: "Yes. One photo is always enough to name a region." },
        { id: "b", text: "Ranching photos always mean the same region" },
        { id: "c", text: "No. Naming a region needs landform, climate, and work evidence together, not just one clue." },
        { id: "d", text: "Landform and climate don't matter if you have a good photo" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "One photo is not enough. Naming a region takes landform, climate, and work evidence together.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: Use all three kinds of clues together. Which Texas region best matches this stop?",
      evidence: {
        type: "passage",
        text: "The log now shows flat, open land, a hot and dry climate, and wide cattle ranches, all at one stop.",
      },
      choices: [
        { id: "a", text: "The Mountains and Basins region, known for steep peaks" },
        { id: "b", text: "The Coastal Plains, known for beaches and wetlands" },
        { id: "c", text: "The North Central Plains or Great Plains — flat, dry land that suits big ranches" },
        { id: "d", text: "None of Texas's regions match flat, dry ranching land" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Flat, dry land used for big ranches matches Texas's plains regions, not the mountains or the coast.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: The last marker asks a question. Why does geography matter for where people live and work in Texas?",
      evidence: {
        type: "passage",
        text: "Every stop connected a landform and a climate to the kind of work people do there.",
      },
      choices: [
        { id: "a", text: "Geography has no effect on where people live or work" },
        { id: "b", text: "People settle in random places, with no link to the land" },
        { id: "c", text: "Only climate matters. Landforms have no effect." },
        { id: "d", text: "Geography — landforms, climate, and resources — shapes what work is possible and where people settle" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "Geography shapes where people settle and what work they do. Every stop showed this.",
    },
  ],

  finalResponsePrompt:
    "Explain how the evidence from this trail points to a Texas region. Your answer should: (1) use at least two kinds of evidence (landform, climate, or the work people do), and (2) explain why one photo alone was not enough to identify the region.",

  responseStems: [
    "The landform evidence showed ___, and the climate evidence showed ___.",
    "This matches the ___ region because ___.",
    "One photo wasn't enough evidence because ___.",
  ],

  selfCheckQuestions: [
    "I used two kinds of evidence: landform, climate, or the work people do.",
    "I connected the geography to why people ranch there.",
    "I explained why one clue, like one photo, isn't enough.",
    "I named which Texas region the evidence points to.",
    "I read my answer back, and it makes sense to someone who wasn't there.",
  ],
};
