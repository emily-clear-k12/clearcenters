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

export const PUBLIC_CASE = {
  standard: "4.6-MM",
  teksLabel:
    "TEKS 4.6A — Four Physical Regions of Texas (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Social Studies",
  title: "Region Evidence Trail",
  tagline: "One photo isn't enough evidence to name a whole region. What else is out there?",

  mission: {
    briefText:
      "A mapmaker's trail through Texas has gone cold at four unlabeled stops, each one scattered with landform, climate, and resource clues. Only someone who reads ALL the evidence — not just the prettiest photo — can figure out which physical region each stop belongs to.",
    goal: "Use landform, climate, and resource evidence together to identify a Texas physical region and explain how geography shapes where people settle and work there.",
  },

  mapImage: "/mission-map/4-6-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: A trail marker shows flat, wide-open land stretching to the horizon with very few trees. What kind of landform is this?",
      evidence: {
        type: "data",
        label: "STOP 1 — LANDFORM CLUE",
        text: "The land is extremely flat and open for as far as the marker's camera can see, with grasses instead of forests.",
      },
      choices: [
        { id: "a", text: "Flat plains — wide, open land with few trees" },
        { id: "b", text: "Steep mountains" },
        { id: "c", text: "A deep river canyon" },
        { id: "d", text: "A coastline" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The flat, open, tree-sparse land at Stop 1 is a plains landform.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: A weather log for the same stop shows very little rainfall and hot, dry summers. What does this climate clue add?",
      evidence: {
        type: "data",
        label: "STOP 2 — CLIMATE CLUE",
        text: "The weather log shows low yearly rainfall and long, hot, dry summers, with grasses suited to dry conditions.",
      },
      choices: [
        { id: "a", text: "A dry climate, which matches grazing land more than farmland needing heavy rain" },
        { id: "b", text: "A rainy, humid climate" },
        { id: "c", text: "Climate has no connection to what grows or what people do there" },
        { id: "d", text: "This climate only exists on the coast" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The dry climate at Stop 2 matches land used for grazing more than land needing heavy rainfall.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: A rancher's log shows large cattle ranches spread across this same flat, dry land. How does this connect to Stops 1 and 2?",
      evidence: {
        type: "data",
        label: "STOP 3 — ECONOMIC ACTIVITY CLUE",
        text: "The rancher's log describes wide cattle ranches that depend on large amounts of flat, dry grazing land.",
      },
      choices: [
        { id: "a", text: "Ranching fits this region's flat land and dry climate — people's work matches the geography" },
        { id: "b", text: "Ranching could happen anywhere no matter the landform or climate" },
        { id: "c", text: "This clue has nothing to do with the region's geography" },
        { id: "d", text: "Cattle ranches only exist in mountain regions" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Large cattle ranches make sense in this region because they need the flat, dry land already identified at Stops 1 and 2.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: An explorer wants to name this region using only the ranching photo, skipping the landform and climate clues. Is that enough evidence?",
      evidence: {
        type: "passage",
        text: "\"It's obviously ranching country — that's all I need to know!\" the explorer says, ignoring the flat-land and dry-climate evidence already logged.",
      },
      choices: [
        { id: "a", text: "No — identifying a region needs landform, climate, AND economic activity evidence together, not just one clue" },
        { id: "b", text: "Yes — one photo is always enough to identify a whole region" },
        { id: "c", text: "Ranching photos always mean the exact same region every time" },
        { id: "d", text: "Landform and climate clues don't matter if you have a good photo" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "A single photo isn't enough — identifying a region takes landform, climate, and economic activity evidence together.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: Using all three clue types together, which of Texas's physical regions best matches this trail stop?",
      evidence: {
        type: "passage",
        text: "The evidence log now shows: flat, open land; a dry, hot climate; and wide cattle ranches, all at the same stop.",
      },
      choices: [
        { id: "a", text: "The North Central Plains or Great Plains — flat, dry land suited to large-scale ranching" },
        { id: "b", text: "The Mountains and Basins region, known for steep peaks" },
        { id: "c", text: "The Coastal Plains, known for beaches and wetlands" },
        { id: "d", text: "None of Texas's regions match flat, dry ranching land" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Flat, dry land suited to large-scale ranching matches Texas's plains regions (Great Plains / North Central Plains), not the mountains or the coast.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: The trail's final marker asks — why does geography actually matter for where people settle and work in Texas?",
      evidence: {
        type: "passage",
        text: "Every stop on this trail connected a landform and climate to the specific kind of work people do there.",
      },
      choices: [
        { id: "a", text: "Geography (landforms, climate, and resources) shapes what work is possible and where people choose to settle" },
        { id: "b", text: "Geography has no effect on where people live or work" },
        { id: "c", text: "People settle randomly with no connection to the land" },
        { id: "d", text: "Only climate matters; landforms have no effect on settlement" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Geography shapes where people settle and what kind of work they do, as shown across every stop on this trail.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how the evidence from this trail stop points to a specific Texas region. Your answer should: (1) use at least two types of evidence (landform, climate, or economic activity), and (2) explain why one photo alone wasn't enough evidence to identify the region.",

  responseStems: [
    "The landform evidence showed ___, and the climate evidence showed ___.",
    "This matches the ___ region because ___.",
    "One photo wasn't enough evidence because ___.",
  ],

  selfCheckQuestions: [
    "I used at least two types of evidence: landform, climate, or economic activity.",
    "I connected the geography to why people ranch or work there.",
    "I explained why a single clue (like one photo) isn't enough to identify a region.",
    "I named which Texas region the evidence points to.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
