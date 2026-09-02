// Mission Map — "Settlement Site Quest" — Grade 5 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **5.7B — Geographic Factors & Settlement.** "Explain geographic factors
// that influence settlement patterns and population distribution." Direct
// fit — the library's own gate order (water access, transportation/trade
// route, natural resources, avoid a pretty-place trap) is exactly the set
// of geographic factors 5.7B asks students to weigh when explaining a
// settlement choice. No re-anchor needed.
//
// Note: 5.7B is also used by Signal Check as "SS.5.7B-SC" (see
// lib/cases/TEKS_STANDARDS.md). Re-using the same base TEKS code across two
// different engines is an established pattern in this project (4.10B is
// reused the same way) — the "-MM" vs "-SC" suffix keeps the
// `cases.standard` primary key unique.
//
// Standard checkpoint type throughout — the multi-factor evidence-gate
// structure (water, trade routes, resources, reject the pretty-place trap)
// already matches this case's other Grade 5 evidence-trail siblings.

export const PUBLIC_CASE = {
  standard: "5.7-MM",
  teksLabel:
    "TEKS 5.7B — Geographic Factors & Settlement (Texas Grade 5 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Social Studies",
  title: "Settlement Site Quest",
  tagline: "The prettiest spot on the map isn't always the one that helps a settlement survive.",

  mission: {
    briefText:
      "A settlement map has three possible sites marked, and only one of them holds up once the water, trade route, and resource evidence is fully checked. A scenic mountain view keeps tempting explorers who never check whether the site can actually support people.",
    goal: "Use geographic evidence — water access, transportation, and resources — to choose and defend the best site for a settlement.",
  },

  mapImage: "/mission-map/5-7-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Site 1: A survey shows a wide river running right next to this location. Why does that matter for a settlement?",
      evidence: {
        type: "data",
        label: "SITE 1 — RIVER SURVEY",
        text: "The river provides fresh water for drinking, farming, and moving goods by boat.",
      },
      choices: [
        { id: "a", text: "Water access — a nearby river supplies drinking water, supports farming, and allows boat travel" },
        { id: "b", text: "Rivers make almost no difference to where people settle" },
        { id: "c", text: "A river only matters for its scenery" },
        { id: "d", text: "Rivers make a location worse for settlement" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Water access from the nearby river is a strong reason to settle at this site.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Site 2: A trade map shows an old trail connecting this site to several other towns. Why does that matter?",
      evidence: {
        type: "data",
        label: "SITE 2 — TRADE MAP",
        text: "The trail lets goods and people travel between this site and nearby towns for trading.",
      },
      choices: [
        { id: "a", text: "Transportation and trade — a connecting trail makes it easier to trade goods and travel to other towns" },
        { id: "b", text: "Trails have no effect on how a settlement grows" },
        { id: "c", text: "A trail only matters if it leads to a mountain view" },
        { id: "d", text: "Trade routes make a site harder to settle" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A connecting trade trail makes this site easier to trade from and travel to.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Site 3: A resource report shows fertile soil and nearby forests for lumber at this location. Why does that matter?",
      evidence: {
        type: "data",
        label: "SITE 3 — RESOURCE REPORT",
        text: "Fertile soil supports farming, and nearby forests provide lumber for building homes and tools.",
      },
      choices: [
        { id: "a", text: "Natural resources — fertile soil supports farming and nearby forests provide lumber for building" },
        { id: "b", text: "Soil and forests have nothing to do with settlement" },
        { id: "c", text: "Resources only matter for decoration, not survival" },
        { id: "d", text: "Fertile soil makes a site worse for settlers" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Fertile soil and nearby forests are valuable natural resources for a settlement.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Site 4: A fourth possible site has a stunning mountain view, but no nearby water, trade route, or resources. Should explorers choose it?",
      evidence: {
        type: "passage",
        text: "\"Look at that view — this has to be the best spot!\" an explorer says, ignoring that there's no water, trail, or farmland nearby.",
      },
      choices: [
        { id: "a", text: "No — a beautiful view doesn't provide water, resources, or trade access, all of which matter more for a settlement's survival" },
        { id: "b", text: "Yes — scenery should always be the deciding factor" },
        { id: "c", text: "Water, trade, and resources don't matter as long as the view is nice" },
        { id: "d", text: "Every site is equally good no matter the geography" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "A beautiful view isn't evidence of water, resources, or trade access — the factors that actually help a settlement survive and grow.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Site 5: Comparing all the evidence gathered so far, which single site actually combines water, trade access, and resources?",
      evidence: {
        type: "passage",
        text: "Site 1 has the river, Site 2 has the trade trail, and Site 3 has the fertile soil and forest — but the quest map shows these three sites are actually the same location, viewed from different survey angles.",
      },
      choices: [
        { id: "a", text: "The location combining the river, the trade trail, and the fertile soil and forest — not the site with only a view" },
        { id: "b", text: "The mountain-view site, since it looks the most impressive" },
        { id: "c", text: "Any site works equally well" },
        { id: "d", text: "The site with the least evidence should be chosen" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The best settlement site is the one combining water access, trade access, and natural resources together.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Site 6: The quest's final question — why do water, trade routes, and resources matter more than a view when choosing a settlement site?",
      evidence: {
        type: "passage",
        text: "Every strong settlement in history needed reliable water, a way to trade, and resources for building and farming to actually survive and grow.",
      },
      choices: [
        { id: "a", text: "Water, trade access, and resources are what actually let a settlement survive and grow — a view alone can't do that" },
        { id: "b", text: "A view is always more important than survival needs" },
        { id: "c", text: "Geography has no real effect on where settlements succeed" },
        { id: "d", text: "Only trade routes matter; water and resources don't" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Water, trade access, and resources are what let a settlement actually survive and grow, unlike a scenic view alone.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, defend which site should be chosen for the settlement. Your answer should: (1) use evidence about water, trade access, AND resources, and (2) explain why the mountain-view site should be rejected.",

  responseStems: [
    "The best site has water because ___, trade access because ___, and resources because ___.",
    "The mountain-view site should be rejected because ___.",
    "Geography influences settlement because ___.",
  ],

  selfCheckQuestions: [
    "I used evidence about water access, trade access, AND resources — not just one factor.",
    "I explained why the mountain-view site isn't a good choice.",
    "I made a clear recommendation for which site to choose.",
    "I explained why geography matters for a settlement's survival.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
