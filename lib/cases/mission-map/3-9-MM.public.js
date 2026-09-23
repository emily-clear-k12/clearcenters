// Mission Map — "Open the Perimeter Gate" — Grade 3 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.5), per the standing rule
// (ClearCenters_STATE.md §9 rule 11):
// **3.7B — "determine the perimeter of a polygon or a missing length when
// given perimeter and remaining side lengths."**
//
// Deliberately 3.7B and not 3.6C. 3.6C is the AREA of rectangles; this case
// never asks for area, and its unit gate exists precisely to keep feet and
// square feet apart. 3.7B is also the only standard that names the missing-
// length move, which is the library's own Gate 2.
//
// The trap gate is a "showdown": two cadets' worked answers side by side, one
// adding only length + width. The library's trap is a wrong procedure rather
// than a wrong fact, and a showdown puts two procedures next to each other —
// a better fit than a choice list of statements.

export const PUBLIC_CASE = {
  standard: "3.9-MM",
  teksLabel:
    "TEKS 3.7B — Perimeter of a Polygon & Missing Side Lengths (Texas Grade 3 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Math",
  title: "Open the Perimeter Gate",
  tagline: "The fence company needs one number. Get it wrong and the playground stays locked.",

  mission: {
    briefText:
      "Rockdale Elementary is getting a new fence around its playground. The fence company will not start until someone sends them the total distance around. One side of the plan is smudged. Two cadets already sent in answers that do not match. Walk the fence line, check every side, and send the right number.",
    goal: "Find the perimeter of a rectangle, including a side that is not labeled. Say what perimeter means.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Gate 1: Here is the playground plan. Which numbers are side lengths?",
      evidence: {
        type: "data",
        label: "PLAYGROUND PLAN",
        text: "The playground is a rectangle. The top side is 40 feet. The right side is 25 feet. The bottom side is 40 feet. The left side has no label.",
      },
      choices: [
        { id: "a", text: "40 feet, 25 feet, 40 feet, and one side with no label" },
        { id: "b", text: "Only 40 feet and 25 feet. The other sides do not count." },
        { id: "c", text: "Only the two 40-foot sides." },
        { id: "d", text: "The plan does not show any side lengths." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The plan labels three sides: 40 feet, 25 feet, and 40 feet. One side is blank.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Gate 2: The left side is smudged. How long is it?",
      evidence: {
        type: "passage",
        label: "SHAPE NOTE",
        text: "A rectangle has two pairs of matching sides. The right side measures 25 feet.",
      },
      choices: [
        { id: "a", text: "25 feet, because the left side matches the right side" },
        { id: "b", text: "40 feet, because it matches the top side" },
        { id: "c", text: "65 feet, because you add 40 and 25" },
        { id: "d", text: "There is no way to know without measuring it." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The left side is 25 feet. In a rectangle, sides across from each other match.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 66 },
      prompt: "Gate 3: Two cadets sent the fence company an answer. Only one of them added the fence correctly. Whose work holds up?",
      evidenceA: {
        type: "data",
        label: "LEO'S WORK",
        text: "40 + 25 = 65. Leo wrote: \"The fence needs 65 feet.\"",
        choiceLabel: "Trust Leo's work",
      },
      evidenceB: {
        type: "data",
        label: "ROSA'S WORK",
        text: "40 + 25 + 40 + 25 = 130. Rosa wrote: \"The fence needs 130 feet.\"",
        choiceLabel: "Trust Rosa's work",
      },
      correctSide: "B",
      evidenceLogEntry: "Rosa added every side one time. Leo added only two sides, so his fence stops halfway.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 34 },
      prompt: "Gate 4: Leo's numbers are both correct. So why is 65 feet the wrong answer?",
      evidence: {
        type: "passage",
        label: "FENCE ORDER NOTE",
        text: "A fence runs along every side of the playground. It does not stop partway around.",
      },
      choices: [
        { id: "a", text: "65 feet covers only two sides. The fence has to go all the way around." },
        { id: "b", text: "65 feet is too much fence for this playground." },
        { id: "c", text: "He should have multiplied 40 and 25 instead of adding." },
        { id: "d", text: "The plan gave him the wrong numbers." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Adding two sides covers only part of the way around. Perimeter needs every side.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Gate 5: Quick check — the fence company needs a unit. Which one goes with 130?",
      evidence: {
        type: "data",
        label: "UNIT CHOICES",
        text: "The order form offers two units: feet (ft) and square feet (sq ft).",
      },
      choices: [
        { id: "a", text: "Square feet, because a playground is a flat space" },
        { id: "b", text: "Feet, because perimeter is a distance around" },
        { id: "c", text: "Either one works here" },
        { id: "d", text: "No unit is needed on the order form" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Perimeter is a distance, so the answer is 130 feet, not 130 square feet.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Gate: The gate opens for the cadet who can say what perimeter is.",
      evidence: {
        type: "passage",
        label: "THE FINISHED FENCE",
        text: "The fence is 130 feet long. It runs along all four sides of the playground, one time each.",
      },
      choices: [
        { id: "a", text: "Perimeter is the distance all the way around a shape. You add every side one time." },
        { id: "b", text: "Perimeter is the space inside a shape." },
        { id: "c", text: "Perimeter is the longest side of a shape." },
        { id: "d", text: "Perimeter is the two longest sides added together." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Perimeter is the distance around a shape, found by adding every side one time.",
    },
  ],

  finalResponsePrompt:
    "The fence company wants your answer in writing. Explain how you found the perimeter of the playground. Your answer should: (1) tell how you found the side that had no label, and (2) explain why adding two sides is not enough.",

  responseStems: [
    "The side with no label is ___ feet because ___.",
    "I added ___ + ___ + ___ + ___ and got ___ feet.",
    "Adding only two sides is wrong because ___.",
  ],

  selfCheckQuestions: [
    "I named all four side lengths.",
    "I explained how I found the side that had no label.",
    "I added every side one time.",
    "I used feet, not square feet.",
    "I said what perimeter means in my own words.",
  ],
};
