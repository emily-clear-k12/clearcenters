// Mission Map — "Community Helper Route" — Grade 3 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **3.7C — Government Services.** "Identify services commonly provided by
// local, state, and national governments." Direct fit — the library's own
// gate order (identify the need, choose the helper/service, use evidence,
// avoid a popular-but-wrong choice) already tests exactly this: matching a
// community problem to the government LEVEL that actually handles it, not
// just naming a nice-sounding place. No re-anchor needed.
//
// Uses the new "showdown" checkpoint type at cp2 — two real government
// services compete for the same road problem (a city street crew vs. the
// state highway department), which makes the local-vs-state jurisdiction
// line the library's gates were already testing completely literal.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "3.5-MM",
  teksLabel:
    "TEKS 3.7C — Government Services (Texas Grade 3 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Social Studies",
  title: "Community Helper Route",
  tagline: "Four problems. Three levels of government. Who fixes each one?",

  mission: {
    briefText:
      "The town dispatcher's board is full of problems. Each call has to go to the right place to get fixed. Walk the route and look at the evidence for each problem. Is it a job for the local, state, or national government? Or is it something else?",
    goal: "Match each town problem to the right government service. Use evidence, not guesses.",
  },

  mapImage: "/mission-map/3-5-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: A traffic light on Main Street has been stuck on red all morning. Who fixes it?",
      evidence: {
        type: "data",
        label: "DISPATCH TICKET #1",
        text: "Main Street is a city street inside the town. The city owns the light and takes care of it.",
      },
      choices: [
        { id: "a", text: "The local city government. It takes care of city streets and lights." },
        { id: "b", text: "The national government. Traffic lights are a national job." },
        { id: "c", text: "No government. Only a company can fix it." },
        { id: "d", text: "The state government, since all roads are state roads" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The local city government takes care of city streets and their traffic lights.",
    },
    {
      id: "cp2",
      order: 2,
      type: "showdown",
      position: { x: 26, y: 40 },
      prompt: "Stop 2: Someone reports a deep pothole. Two crews both say it isn't their job. Which crew should fix it?",
      evidenceA: {
        type: "data",
        label: "CITY STREET CREW",
        text: "\"The pothole is on Oak Lane. That is a small street inside the town. It's a city street.\"",
        choiceLabel: "The local city street crew should fix it",
      },
      evidenceB: {
        type: "data",
        label: "STATE HIGHWAY DEPARTMENT",
        text: "\"We take care of the state highway at the edge of town. We don't fix streets inside the town.\"",
        choiceLabel: "The state highway department should fix it",
      },
      correctSide: "A",
      evidenceLogEntry: "Oak Lane is a city street, so the city crew fixes it. The state crew only takes care of the highway.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: A family wants to visit a national park two states away. Who runs that park?",
      evidence: {
        type: "passage",
        label: "TRAVEL BROCHURE",
        text: "The brochure says the national government takes care of national parks. People from every state can visit them.",
      },
      choices: [
        { id: "a", text: "The town closest to the park" },
        { id: "b", text: "Each visitor's home state government" },
        { id: "c", text: "No government is involved in national parks" },
        { id: "d", text: "The national government. National parks are a national service." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "The national government takes care of national parks. That is why people from every state can visit.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: The board also shows an idea for a new dog park. It sounds fun. But is it the problem someone reported?",
      evidence: {
        type: "passage",
        text: "The first call was about a broken swing at the playground. The dog park idea came later. It is a different thing.",
      },
      choices: [
        { id: "a", text: "Build the dog park instead, since it's more exciting" },
        { id: "b", text: "Fix the broken swing. That's the problem that was reported." },
        { id: "c", text: "Do both, no matter what was reported" },
        { id: "d", text: "Ignore the swing since a dog park was suggested" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The dog park is a nice idea. But the problem people reported is the broken swing.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A driver's license needs to be renewed. Which level of government does that in Texas?",
      evidence: {
        type: "data",
        label: "DISPATCH TICKET #5",
        text: "In Texas, a state office gives out and renews driver's licenses. It is not a city office or a national one.",
      },
      choices: [
        { id: "a", text: "The local government, since it's close to home" },
        { id: "b", text: "The national government, since driving happens everywhere" },
        { id: "c", text: "A private company handles all driver's licenses" },
        { id: "d", text: "The state government. It gives out and renews driver's licenses." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "In Texas, the state government handles driver's licenses.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: Why does it matter which level of government you ask for help?",
      evidence: {
        type: "passage",
        text: "Each stop needed a different level of government. Asking the wrong one wastes time. The problem doesn't get fixed.",
      },
      choices: [
        { id: "a", text: "It doesn't matter. Any level can fix any problem." },
        { id: "b", text: "Only the national government actually does anything" },
        { id: "c", text: "Each level does different jobs. Asking the right one gets the problem fixed." },
        { id: "d", text: "Only the local government matters" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Each level of government does different jobs. Asking the right one gets the problem fixed.",
    },
  ],

  finalResponsePrompt:
    "Explain how you matched problems to the right government service. Your answer should: (1) name the local, state, or national government for at least three stops, and (2) explain why asking the wrong level would not fix the problem.",

  responseStems: [
    "The problem at Stop ___ needed the ___ government because ___.",
    "I knew it wasn't the ___ government because ___.",
    "Asking the wrong level of government matters because ___.",
  ],

  selfCheckQuestions: [
    "I matched three problems to the right level of government.",
    "I used evidence from the case file, not just a guess.",
    "I explained why the pothole was a local job, not a state job.",
    "I explained why asking the wrong level doesn't fix the problem.",
    "I read my answer back, and it makes sense.",
  ],
};
