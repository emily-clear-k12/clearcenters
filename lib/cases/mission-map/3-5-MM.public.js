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

export const PUBLIC_CASE = {
  standard: "3.5-MM",
  teksLabel:
    "TEKS 3.7C — Government Services (Texas Grade 3 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Social Studies",
  title: "Community Helper Route",
  tagline: "Four problems, three levels of government — who actually fixes each one?",

  mission: {
    briefText:
      "The town dispatcher's board is lit up with problems, but every call has to go to the right place before it can get fixed. Walk the route, look at the evidence for each problem, and figure out whether it's a job for the local, state, or national government — or a completely different kind of helper.",
    goal: "Match community problems to the government service or level that actually provides help, using evidence instead of guessing.",
  },

  mapImage: "/mission-map/3-5-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: A traffic light on Main Street has been stuck on red all morning. Who handles this?",
      evidence: {
        type: "data",
        label: "DISPATCH TICKET #1",
        text: "Main Street is a city street inside town limits. The light is owned and maintained by the city's public works department.",
      },
      choices: [
        { id: "a", text: "The local (city) government — it maintains city streets and traffic lights" },
        { id: "b", text: "The national government — traffic lights are a national issue" },
        { id: "c", text: "No government handles this; only a private company can fix it" },
        { id: "d", text: "The state government, since all roads are state roads" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "City streets and their traffic lights are maintained by the local (city) government.",
    },
    {
      id: "cp2",
      order: 2,
      type: "showdown",
      position: { x: 26, y: 40 },
      prompt: "Stop 2: A deep pothole is reported. Two crews both say it isn't theirs. Which one is actually responsible?",
      evidenceA: {
        type: "data",
        label: "CITY STREET CREW",
        text: "\"The pothole is on Oak Lane, a small neighborhood street inside town limits. That's a city street.\"",
        choiceLabel: "The local city street crew should fix it",
      },
      evidenceB: {
        type: "data",
        label: "STATE HIGHWAY DEPARTMENT",
        text: "\"We maintain the state highway that runs past the edge of town, not neighborhood streets inside it.\"",
        choiceLabel: "The state highway department should fix it",
      },
      correctSide: "A",
      isTrap: true,
      evidenceLogEntry: "Oak Lane is a neighborhood street inside town limits, so it's the local city crew's job — not the state highway department's, which only maintains the highway.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: A family just moved to the country and wants to visit a national park two states away. Who runs that park?",
      evidence: {
        type: "passage",
        label: "TRAVEL BROCHURE",
        text: "The brochure explains that national parks are set aside and cared for by the national government so people from every state can visit them.",
      },
      choices: [
        { id: "a", text: "The national government — national parks are a national government service" },
        { id: "b", text: "The local government of whichever town is closest" },
        { id: "c", text: "Each visitor's home state government" },
        { id: "d", text: "No government is involved in national parks" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "National parks are cared for by the national government, which is why people from any state can visit them.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: The dispatcher board also shows a new dog park idea — it looks fun, but is it the actual problem that was reported?",
      evidence: {
        type: "passage",
        text: "The original complaint was about a broken swing at the existing playground. The new dog park suggestion showed up later and is unrelated to that complaint.",
      },
      choices: [
        { id: "a", text: "Fix the broken swing — that's the actual problem that was reported" },
        { id: "b", text: "Build the new dog park instead, since it sounds more exciting" },
        { id: "c", text: "Do both at the same time no matter what was reported" },
        { id: "d", text: "Ignore the swing since a dog park was suggested" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The dog park is a nice idea, but it isn't the problem that was actually reported — the broken swing is.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A driver's license needs to be renewed. Which level of government handles that in Texas?",
      evidence: {
        type: "data",
        label: "DISPATCH TICKET #5",
        text: "Driver's licenses in Texas are issued and renewed through a state government office, not a city office or a national one.",
      },
      choices: [
        { id: "a", text: "The state government — it issues and renews driver's licenses" },
        { id: "b", text: "The local government, since it's close to home" },
        { id: "c", text: "The national government, since driving happens everywhere" },
        { id: "d", text: "A private company handles all driver's licenses" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Driver's licenses are a state government service in Texas.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: The route is almost done. Why does it matter which level of government you ask for help?",
      evidence: {
        type: "passage",
        text: "Every stop on the route needed a different level of government — local, state, or national — and asking the wrong one wastes time without solving the problem.",
      },
      choices: [
        { id: "a", text: "Each level of government provides different services, so knowing which one to ask saves time and actually solves the problem" },
        { id: "b", text: "It doesn't matter — any level of government can fix any problem" },
        { id: "c", text: "Only the national government actually does anything" },
        { id: "d", text: "Only local government matters; state and national governments don't provide services" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Local, state, and national governments each provide different services — knowing which one to ask is what actually gets a problem solved.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how you matched at least three community problems on the route to the right government service. Your answer should: (1) name the local, state, or national government for at least three stops, and (2) explain why asking the wrong level wouldn't have solved the problem.",

  responseStems: [
    "The [problem] at Stop ___ needed the ___ government because ___.",
    "I knew it wasn't the ___ government because ___.",
    "Asking the wrong level of government matters because ___.",
  ],

  selfCheckQuestions: [
    "I matched at least three problems to the correct level of government (local, state, or national).",
    "I used evidence from the case file, not just a guess.",
    "I explained why the pothole was a local (not state) responsibility.",
    "I explained why asking the wrong government level doesn't solve the problem.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
