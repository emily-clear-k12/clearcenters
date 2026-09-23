// Mission Map — "Past and Present Doorway" — Grade 3 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **3.1A — How Communities Change.** "Describe how individuals, events, and
// ideas have changed communities in the past and present." Direct fit —
// the library's own gate order (identify a past clue, identify a present
// clue, match what changed, avoid a same-place/same-time trap) already
// tests exactly this: sorting evidence to describe change over time. No
// re-anchor needed.
//
// Uses the new "showdown" checkpoint type at cp3 — an old street photo and
// a current street photo compete directly as evidence, which makes the
// library's own "past clue vs. present clue" gate literal instead of
// hidden inside a multiple-choice question.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "3.7-MM",
  teksLabel:
    "TEKS 3.1A — How Communities Change (Texas Grade 3 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Social Studies",
  title: "Past and Present Doorway",
  tagline: "A doorway opens only for someone who can prove how this street changed.",

  mission: {
    briefText:
      "An old doorway on Main Street shows the same block two ways. One view is from long ago. The other is from today. Look at the photos and clues. Find out what changed and what stayed the same. Then the doorway will open.",
    goal: "Compare clues from the past and the present. Tell how a community has changed over time.",
  },

  mapImage: "/mission-map/3-7-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: An old, faded photograph shows Main Street. What does it tell you?",
      evidence: {
        type: "data",
        label: "OLD PHOTOGRAPH",
        text: "The faded photo shows a dirt road and a wagon pulled by a horse. Small wooden buildings line Main Street.",
      },
      choices: [
        { id: "a", text: "This shows what Main Street looks like today" },
        { id: "b", text: "Photographs can't show information about time" },
        { id: "c", text: "It is a clue about the past. The dirt road and wagon are from long ago." },
        { id: "d", text: "This photo could be from any time period, including today" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The dirt road, the wagon, and the wooden buildings show this photo is from the past.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: A bright, clear photograph also shows Main Street. What does it tell you?",
      evidence: {
        type: "data",
        label: "CURRENT PHOTOGRAPH",
        text: "The clear photo shows a paved road, cars, and traffic lights. Taller brick buildings line the same street.",
      },
      choices: [
        { id: "a", text: "This photo is also from long ago" },
        { id: "b", text: "Both photos must show the exact same time period" },
        { id: "c", text: "It is a clue about the present. The paved road, cars, and traffic lights are from today." },
        { id: "d", text: "Cars and traffic lights tell you nothing about time" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The paved road, cars, and traffic lights show this photo is from the present.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 64 },
      prompt: "Stop 3: The two photos are side by side. Which one shows how travel on Main Street changed?",
      evidenceA: {
        type: "data",
        label: "OLD PHOTOGRAPH (TRAVEL)",
        text: "The old photo shows a wagon pulled by a horse on a dirt road. That is how people traveled long ago.",
        choiceLabel: "Travel used to be by wagon on a dirt road",
      },
      evidenceB: {
        type: "data",
        label: "CURRENT PHOTOGRAPH (TRAVEL)",
        text: "The new photo shows cars on a paved road with traffic lights. That is how people travel today.",
        choiceLabel: "Travel is now by car on a paved road",
      },
      correctSide: "B",
      evidenceLogEntry: "Travel changed from wagons on dirt roads to cars on paved roads.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: The old brick church looks almost the same in both photos. Does that mean nothing on Main Street changed?",
      evidence: {
        type: "passage",
        text: "The church looks the same in both photos. The road, the vehicles, and the other buildings around it changed a lot.",
      },
      choices: [
        { id: "a", text: "No. One building stayed the same, but other things clearly changed." },
        { id: "b", text: "Yes. If one building is the same, nothing else changed." },
        { id: "c", text: "The church proves both photos are from the same year" },
        { id: "d", text: "Buildings can never stay the same over time" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The church stayed the same, but other things changed. A community can change in some ways and not others.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A town record says a new library was built on an empty lot. What kind of change is this?",
      evidence: {
        type: "data",
        label: "TOWN RECORD",
        text: "Long ago, this spot was an empty lot. Now it is the town library. It was built because more people moved to town.",
      },
      choices: [
        { id: "a", text: "A change caused by a new need. The town built a library for more people." },
        { id: "b", text: "It isn't a change, since there is still a building there" },
        { id: "c", text: "Empty lots can never become anything else" },
        { id: "d", text: "This has nothing to do with how communities change" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The town grew and needed a library. So the empty lot became a library.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: The doorway asks one last question. How has this community changed?",
      evidence: {
        type: "passage",
        text: "The road and the vehicles changed. An empty lot became a library. The church stayed the same.",
      },
      choices: [
        { id: "a", text: "Some things changed, like roads, vehicles, and new buildings. Other things, like the church, stayed the same." },
        { id: "b", text: "Nothing ever changes in a community" },
        { id: "c", text: "Everything in a community changes at the same time" },
        { id: "d", text: "Photos and records can't show change over time" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A community can change in some ways, like roads and buildings. Other things can stay the same.",
    },
  ],

  finalResponsePrompt:
    "Explain how Main Street changed from the past to the present. Your answer should: (1) tell two changes using the photos or records, and (2) explain why the church staying the same does not mean nothing changed.",

  responseStems: [
    "In the past, Main Street had ___, but today it has ___.",
    "One thing that stayed the same is ___.",
    "The church staying the same doesn't mean nothing changed because ___.",
  ],

  selfCheckQuestions: [
    "I told two changes, using evidence from the case file.",
    "I told what stayed the same, as well as what changed.",
    "I explained why one thing staying the same doesn't mean the whole street stayed the same.",
    "I used the words \"past\" and \"present\" correctly.",
    "I read my answer back, and it makes sense.",
  ],
};
