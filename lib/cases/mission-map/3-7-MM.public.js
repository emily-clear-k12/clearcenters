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

export const PUBLIC_CASE = {
  standard: "3.7-MM",
  teksLabel:
    "TEKS 3.1A — How Communities Change (Texas Grade 3 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Social Studies",
  title: "Past and Present Doorway",
  tagline: "A doorway only opens for someone who can prove how this street really changed.",

  mission: {
    briefText:
      "An old doorway on Main Street shows two different versions of the same block — one from long ago, and one from today. Sort through the photographs and clues to figure out what actually changed, and what stayed the same, before the doorway will open.",
    goal: "Compare past and present evidence about a community to describe how it has changed over time.",
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
        text: "The faded photo shows a dirt road, a horse-drawn wagon, and small wooden buildings along Main Street.",
      },
      choices: [
        { id: "a", text: "This is a clue about the past — the dirt road and wagon are from long ago" },
        { id: "b", text: "This shows what Main Street looks like today" },
        { id: "c", text: "Photographs can't show information about time" },
        { id: "d", text: "This photo could be from any time period, including today" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The dirt road, wagon, and wooden buildings are clues that this photograph shows Main Street in the past.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: A bright, clear photograph also shows Main Street. What does it tell you?",
      evidence: {
        type: "data",
        label: "CURRENT PHOTOGRAPH",
        text: "The clear photo shows a paved road, cars, traffic lights, and taller brick buildings along the same street.",
      },
      choices: [
        { id: "a", text: "This is a clue about the present — the paved road, cars, and traffic lights are from today" },
        { id: "b", text: "This photo is also from long ago" },
        { id: "c", text: "Both photos must show the exact same time period" },
        { id: "d", text: "Cars and traffic lights tell you nothing about time" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The paved road, cars, and traffic lights are clues that this photograph shows Main Street in the present.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 64 },
      prompt: "Stop 3: Both photographs are laid side by side. Which one shows how people traveled on Main Street changed?",
      evidenceA: {
        type: "data",
        label: "OLD PHOTOGRAPH (TRAVEL)",
        text: "The old photo shows a horse-drawn wagon on a dirt road — the way people traveled in the past.",
        choiceLabel: "Travel used to be by horse-drawn wagon on a dirt road",
      },
      evidenceB: {
        type: "data",
        label: "CURRENT PHOTOGRAPH (TRAVEL)",
        text: "The current photo shows cars on a paved road with traffic lights — the way people travel today.",
        choiceLabel: "Travel is now by car on a paved road",
      },
      correctSide: "B",
      isTrap: false,
      evidenceLogEntry: "Comparing both photos shows travel on Main Street changed from horse-drawn wagons on dirt roads to cars on paved roads.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: One building in both photographs — the old brick church — looks almost exactly the same. Does that mean nothing on Main Street changed?",
      evidence: {
        type: "passage",
        text: "The church building has stayed the same in both photographs, even though the road, vehicles, and other buildings around it changed a lot.",
      },
      choices: [
        { id: "a", text: "No — one unchanged building doesn't mean the whole street stayed the same; other things clearly changed" },
        { id: "b", text: "Yes — if one building is the same, nothing else could have changed" },
        { id: "c", text: "The church proves the photos are actually from the same year" },
        { id: "d", text: "Buildings can never stay the same over time" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The unchanged church doesn't prove nothing changed — communities can change in some ways while other features stay the same.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A town record shows a new library was built where an empty lot used to be. What kind of change is this?",
      evidence: {
        type: "data",
        label: "TOWN RECORD",
        text: "The record states that an empty lot from decades ago is now the site of the town's public library, built to serve a growing population.",
      },
      choices: [
        { id: "a", text: "A change caused by a new idea or need — the community built a library to serve more people" },
        { id: "b", text: "This isn't really a change since a building is still there" },
        { id: "c", text: "Empty lots can never become anything else" },
        { id: "d", text: "This has nothing to do with how communities change" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The empty lot becoming a library is a change caused by the community's growing need for services.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: The doorway asks one last question — how would you explain how this community has changed, using real evidence?",
      evidence: {
        type: "passage",
        text: "The road, vehicles, and an empty lot all changed over time, while the church building stayed the same.",
      },
      choices: [
        { id: "a", text: "The community changed in some ways (roads, vehicles, new buildings) while other features (like the church) stayed the same" },
        { id: "b", text: "Nothing ever changes in a community" },
        { id: "c", text: "Everything about a community always changes at the exact same time" },
        { id: "d", text: "Change over time can't be shown using photographs or records" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Communities can change over time in some ways (like roads and buildings) while other features stay the same.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how Main Street changed from the past to the present. Your answer should: (1) describe at least two specific changes using evidence from the photographs or records, and (2) explain why the unchanged church doesn't mean nothing else changed.",

  responseStems: [
    "In the past, Main Street had ___, but today it has ___.",
    "One thing that stayed the same is ___.",
    "The church staying the same doesn't mean nothing changed because ___.",
  ],

  selfCheckQuestions: [
    "I described at least two specific changes using evidence from the case file.",
    "I explained what stayed the same (the church) as well as what changed.",
    "I explained why one unchanged thing doesn't mean the whole street stayed the same.",
    "I used the words \"past\" and \"present\" correctly.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
