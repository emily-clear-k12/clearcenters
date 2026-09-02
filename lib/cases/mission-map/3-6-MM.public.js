// Mission Map — "Map Key Quest" — Grade 3 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **3.4C — Map Elements.** "Identify, create, and interpret maps containing
// a title, compass rose, legend, scale, and grid system." Direct fit — the
// library's own gate order (read the map key, find the start point, use
// direction words, avoid a picture-only trap) already walks through using
// a map's real elements together to navigate, which is exactly 3.4C's
// "interpret maps" skill. Cross-referenced with 3.4A (cardinal/intermediate
// directions), which the direction-word gate also touches.
//
// Uses the new "sequence" checkpoint type at cp4 — the order a map-reader
// actually checks a map's elements (title, then legend, then compass rose,
// then scale) is itself a real, teachable skill, and it's the cleanest
// sequence-shaped moment in this case.

export const PUBLIC_CASE = {
  standard: "3.6-MM",
  teksLabel:
    "TEKS 3.4C — Map Elements (Texas Grade 3 Social Studies; cross-referenced with 3.4A cardinal/intermediate directions; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Social Studies",
  title: "Map Key Quest",
  tagline: "The route from school to the park is hidden in the map's own symbols. Can you read it?",

  mission: {
    briefText:
      "A folded park map has everything you need to find the best route from school to the playground — a title, a legend, a compass rose, and a scale — but only if you actually use them. A shiny statue keeps distracting explorers who never even check whether it's on the route at all.",
    goal: "Use a map's key, compass rose, and direction words to find and explain the correct route.",
  },

  mapImage: "/mission-map/3-6-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: The map has a small box of symbols in the corner. What is that box called, and what does it do?",
      evidence: {
        type: "data",
        label: "MAP CORNER",
        text: "A box in the corner shows a picture of a tree next to the word \"Park,\" a picture of a book next to \"Library,\" and a picture of a bench next to \"Rest Stop.\"",
      },
      choices: [
        { id: "a", text: "It's the map key (legend) — it explains what each symbol on the map means" },
        { id: "b", text: "It's just decoration and doesn't mean anything" },
        { id: "c", text: "It's the compass rose" },
        { id: "d", text: "It shows how far apart places are" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The box of symbols in the corner is the map key (legend) — it explains what each symbol means.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: Using the map key from Stop 1, which symbol shows the starting point at the school?",
      evidence: {
        type: "data",
        label: "MAP KEY (CONTINUED)",
        text: "The map key also shows a picture of a small building labeled \"School,\" matching a building symbol printed at the bottom-left corner of the map.",
      },
      choices: [
        { id: "a", text: "The building symbol at the bottom-left, matching \"School\" in the map key" },
        { id: "b", text: "The tree symbol, because it's the biggest one" },
        { id: "c", text: "Any symbol works as a starting point" },
        { id: "d", text: "The bench symbol, since it's closest to the edge" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The map key shows the building symbol matches \"School,\" which marks the starting point.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: The compass rose shows North at the top of the map. If the park is below the school on the map, which direction is that?",
      evidence: {
        type: "data",
        label: "COMPASS ROSE",
        text: "The compass rose shows N at the top, S at the bottom, E to the right, and W to the left. The park symbol is drawn below the school symbol.",
      },
      choices: [
        { id: "a", text: "South — the park is below the school, and South is at the bottom" },
        { id: "b", text: "North — anything on a map is North" },
        { id: "c", text: "East, because the park is a fun place" },
        { id: "d", text: "There's no way to tell direction from a map" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Using the compass rose, the park is South of the school because it's drawn below the school on the map.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 30 },
      prompt: "Stop 4: A new explorer is confused about which map tool to check first. Put the steps for reading this map in the right order.",
      evidence: {
        type: "passage",
        label: "MAP-READING STEPS",
        text: "You've already used the map's title, its key, and its compass rose in this quest — but in what order does a map-reader actually need to check them to find a route?",
      },
      items: [
        { id: "title", text: "Read the map's title to know what place the map shows" },
        { id: "key", text: "Check the map key to learn what each symbol means" },
        { id: "compass", text: "Use the compass rose to know which way is North, South, East, and West" },
        { id: "route", text: "Trace the route between the symbols using directions" },
      ],
      correctOrder: ["title", "key", "compass", "route"],
      isTrap: false,
      evidenceLogEntry: "A map-reader checks the title first, then the key, then the compass rose, and only then traces the actual route.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A shiny statue is drawn near the edge of the map. An explorer wants to route through it because it \"looks important.\" Is that a good reason?",
      evidence: {
        type: "passage",
        text: "The statue symbol doesn't appear in the map key at all, and it isn't on the straight route between the school and the park.",
      },
      choices: [
        { id: "a", text: "No — the statue isn't in the map key or on the actual route, so it shouldn't be part of the directions" },
        { id: "b", text: "Yes — anything that looks important belongs on the route" },
        { id: "c", text: "It doesn't matter what the map key shows" },
        { id: "d", text: "The prettiest symbol is always the correct stop" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The statue isn't in the map key or on the route between school and park — looking important isn't a reason to include it.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: Using everything from this quest, what's the best way to describe the route from school to the park?",
      evidence: {
        type: "passage",
        text: "The school is at the bottom-left. The route goes South from the school, then a short distance East, ending at the park symbol shown in the map key.",
      },
      choices: [
        { id: "a", text: "Head South from the school, then a short way East, to reach the park" },
        { id: "b", text: "Head North to reach the park, since North is always correct" },
        { id: "c", text: "Follow the statue, since it's the biggest symbol" },
        { id: "d", text: "There's no way to describe a route using a map" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The route from school to the park is South, then a short distance East, using the map's key, compass rose, and symbols together.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain the best route from the school to the park. Your answer should: (1) use direction words from the compass rose, and (2) explain why the statue wasn't part of the actual route.",

  responseStems: [
    "The map key told me that ___ means ___.",
    "Using the compass rose, I found that the park is ___ of the school.",
    "The statue wasn't part of the route because ___.",
  ],

  selfCheckQuestions: [
    "I explained what the map key is used for.",
    "I used at least one direction word (North, South, East, or West) from the compass rose.",
    "I explained why the statue wasn't part of the actual route.",
    "I described the route in the order a map-reader would actually check it.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
