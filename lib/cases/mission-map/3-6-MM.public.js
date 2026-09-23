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

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "3.6-MM",
  teksLabel:
    "TEKS 3.4C — Map Elements (Texas Grade 3 Social Studies; cross-referenced with 3.4A cardinal/intermediate directions; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Social Studies",
  title: "Map Key Quest",
  tagline: "The route from school to the park is hidden in the map's symbols. Can you read it?",

  mission: {
    briefText:
      "This park map shows the best route from school to the playground. It has a title, a key, a compass rose, and a scale. But they only help if you use them. A shiny statue keeps pulling explorers off course. They never check if it is even on the route.",
    goal: "Use a map's key, compass rose, and direction words to find the right route.",
  },

  mapImage: "/mission-map/3-6-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: A small box of symbols sits in the map's corner. What is it called? What does it do?",
      evidence: {
        type: "data",
        label: "MAP CORNER",
        text: "A box in the corner shows a tree next to the word \"Park.\" It shows a book next to \"Library.\" It shows a bench next to \"Rest Stop.\"",
      },
      choices: [
        { id: "a", text: "It's just decoration and doesn't mean anything" },
        { id: "b", text: "It's the compass rose" },
        { id: "c", text: "It's the map key. It tells what each symbol on the map means." },
        { id: "d", text: "It shows how far apart places are" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The box of symbols is the map key. It tells what each symbol means.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: Use the map key. Which symbol shows the school, where the route starts?",
      evidence: {
        type: "data",
        label: "MAP KEY (CONTINUED)",
        text: "The key shows a small building labeled \"School.\" The same building symbol is in the bottom-left corner of the map.",
      },
      choices: [
        { id: "a", text: "The building symbol in the bottom-left corner, which the key calls \"School\"" },
        { id: "b", text: "The tree symbol, because it's the biggest one" },
        { id: "c", text: "Any symbol works as a starting point" },
        { id: "d", text: "The bench symbol, since it's closest to the edge" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The key shows the building symbol means \"School.\" That is the starting point.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: The compass rose shows North at the top. The park is below the school on the map. Which way is that?",
      evidence: {
        type: "data",
        label: "COMPASS ROSE",
        text: "The compass rose shows N at the top and S at the bottom. It shows E on the right and W on the left. The park is drawn below the school.",
      },
      choices: [
        { id: "a", text: "North. Everything on a map is North." },
        { id: "b", text: "East, because the park is a fun place" },
        { id: "c", text: "There's no way to tell direction from a map" },
        { id: "d", text: "South. The park is below the school, and South is at the bottom." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "The park is South of the school. It is drawn below the school, and South is at the bottom.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 30 },
      prompt: "Stop 4: A new explorer doesn't know which map tool to check first. Put the steps in the right order.",
      evidence: {
        type: "passage",
        label: "MAP-READING STEPS",
        text: "You have used the map's title, key, and compass rose. In what order should a map reader check them?",
      },
      items: [
        { id: "title", text: "Read the map's title to know what place the map shows" },
        { id: "key", text: "Check the map key to learn what each symbol means" },
        { id: "compass", text: "Use the compass rose to find North, South, East, and West" },
        { id: "route", text: "Trace the route between the symbols using directions" },
      ],
      correctOrder: ["title", "key", "compass", "route"],
      evidenceLogEntry: "A map reader checks the title, then the key, then the compass rose. Then they trace the route.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A shiny statue is drawn near the edge of the map. An explorer wants to go past it because it \"looks important.\" Is that a good reason?",
      evidence: {
        type: "passage",
        text: "The statue is not in the map key. It is not on the path between the school and the park.",
      },
      choices: [
        { id: "a", text: "Yes. Anything that looks important belongs on the route." },
        { id: "b", text: "No. The statue isn't in the key or on the route. It doesn't belong in the directions." },
        { id: "c", text: "It doesn't matter what the map key shows" },
        { id: "d", text: "The prettiest symbol is always the correct stop" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The statue is not in the key. It is not on the route. Looking important is not a reason to go there.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: What is the best way to tell the route from school to the park?",
      evidence: {
        type: "passage",
        text: "The school is in the bottom-left corner. The route goes South from the school. Then it goes a short way East to the park.",
      },
      choices: [
        { id: "a", text: "Head North to reach the park, since North is always correct" },
        { id: "b", text: "Follow the statue, since it's the biggest symbol" },
        { id: "c", text: "Head South from the school, then a short way East, to reach the park" },
        { id: "d", text: "There's no way to describe a route using a map" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The route goes South from the school, then a short way East to the park.",
    },
  ],

  finalResponsePrompt:
    "Explain the best route from the school to the park. Your answer should: (1) use direction words from the compass rose, and (2) explain why the statue was not part of the route.",

  responseStems: [
    "The map key told me that ___ means ___.",
    "Using the compass rose, I found that the park is ___ of the school.",
    "The statue wasn't part of the route because ___.",
  ],

  selfCheckQuestions: [
    "I explained what the map key is used for.",
    "I used a direction word from the compass rose.",
    "I explained why the statue was not part of the route.",
    "I told the steps in the order a map reader checks them.",
    "I read my answer back, and it makes sense.",
  ],
};
