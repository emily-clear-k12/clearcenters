// Mission Map — "Area and Perimeter Labyrinth" — Grade 4 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.6), per rule 11:
// **4.5D — "solve problems related to perimeter and area of rectangles where
// dimensions are whole numbers."**
//
// 4.5C (using models to derive the perimeter formulas) is the secondary and
// is exercised at cp3, but 4.5D is the anchor because the case's whole point
// is deciding WHICH measurement a situation calls for before computing
// anything. The library's trap is right numbers with the wrong measurement,
// which is a 4.5D failure, not a formula failure.

export const PUBLIC_CASE = {
  standard: "4.11-MM",
  teksLabel:
    "TEKS 4.5D — Perimeter & Area Problems with Whole-Number Dimensions (Texas Grade 4 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Math",
  title: "Area and Perimeter Labyrinth",
  tagline: "Two doors, same room. One asks how far around. One asks how much space. Pick wrong and you buy the wrong thing twice.",

  mission: {
    briefText:
      "The community garden shed is being rebuilt. The volunteer coordinator has two orders to place. One is edging, to run around the new garden bed. The other is mulch, to cover the ground inside it. Both orders use the same two measurements. A volunteer filled out one form with the right arithmetic and the wrong measurement. The supplier sent back a question instead of a delivery.",
    goal: "Decide whether a situation calls for perimeter or area, solve it, and label the answer with the correct unit.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 72 },
      prompt: "Corridor 1: Start with the plan. What are you working with?",
      evidence: {
        type: "data",
        label: "GARDEN BED PLAN",
        text: "The bed is a rectangle. It measures 12 feet along the long side and 8 feet along the short side.",
      },
      choices: [
        { id: "a", text: "A rectangle 12 feet by 8 feet" },
        { id: "b", text: "A square with sides of 12 feet" },
        { id: "c", text: "A rectangle 12 feet by 12 feet" },
        { id: "d", text: "A shape with only two sides" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The garden bed is a rectangle, 12 feet by 8 feet.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 44 },
      prompt: "Corridor 2: The edging runs along the outside of the bed. Which measurement does that order need?",
      evidence: {
        type: "passage",
        label: "EDGING ORDER",
        text: "The edging is a strip that borders the bed. It is laid end to end along every side, with no gaps and no overlap.",
      },
      choices: [
        { id: "a", text: "Perimeter, because edging follows the distance around the outside" },
        { id: "b", text: "Area, because edging touches the whole bed" },
        { id: "c", text: "Either one, because both use 12 and 8" },
        { id: "d", text: "Neither — edging is ordered by weight" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Edging borders the bed, so it is ordered by perimeter — the distance around.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 68 },
      prompt: "Corridor 3: Work out the edging order.",
      evidence: {
        type: "data",
        label: "PERIMETER MODEL",
        text: "A rectangle has two long sides and two short sides. The model shows l + w + l + w, which can also be written as 2l + 2w.",
      },
      choices: [
        { id: "a", text: "12 + 8 = 20 feet" },
        { id: "b", text: "12 + 8 + 12 + 8 = 40 feet" },
        { id: "c", text: "12 x 8 = 96 feet" },
        { id: "d", text: "12 x 8 x 2 = 192 feet" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Perimeter: 12 + 8 + 12 + 8 = 40 feet of edging.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 36 },
      prompt: "Corridor 4: Now the mulch. Two forms came back from the volunteers, and both did their arithmetic correctly. Which form should the supplier fill?",
      evidenceA: {
        type: "data",
        label: "FORM ON THE CLIPBOARD",
        text: "\"Mulch to cover the bed: 12 + 8 + 12 + 8 = 40. Please send 40 square feet of mulch.\"",
        choiceLabel: "Fill this form",
      },
      evidenceB: {
        type: "data",
        label: "FORM IN THE FOLDER",
        text: "\"Mulch to cover the bed: 12 x 8 = 96. Please send 96 square feet of mulch.\"",
        choiceLabel: "Fill this form",
      },
      correctSide: "B",
      evidenceLogEntry: "Mulch covers the space inside, so it is ordered by area: 12 x 8 = 96 square feet.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 60 },
      prompt: "Corridor 5: The clipboard form added the sides correctly and still asked for the wrong thing. What went wrong?",
      evidence: {
        type: "passage",
        label: "SUPPLIER'S QUESTION",
        text: "\"You have ordered a distance and asked us to send a covering. Which did you mean?\"",
      },
      choices: [
        { id: "a", text: "It found the distance around when the job needed the space inside" },
        { id: "b", text: "It used the wrong two numbers from the plan" },
        { id: "c", text: "It should have multiplied all four sides together" },
        { id: "d", text: "It forgot to round the answer" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The arithmetic was fine. The form measured around the bed when the mulch had to cover inside it.",
    },
    {
      id: "cp6",
      order: 6,
      type: "quickScan",
      position: { x: 90, y: 30 },
      prompt: "Final Corridor: Quick check — label both orders before they go out.",
      evidence: {
        type: "data",
        label: "THE TWO ORDERS",
        text: "Edging: 40. Mulch: 96. The supplier needs a unit on each one.",
      },
      choices: [
        { id: "a", text: "40 feet of edging and 96 square feet of mulch" },
        { id: "b", text: "40 square feet of edging and 96 feet of mulch" },
        { id: "c", text: "40 feet of edging and 96 feet of mulch" },
        { id: "d", text: "40 square feet of edging and 96 square feet of mulch" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Perimeter is a distance, measured in feet. Area is a covering, measured in square feet.",
    },
  ],

  finalResponsePrompt:
    "Write the note that goes back to the supplier with both orders. Your answer should: (1) give both amounts with their correct units and show how you found each one, and (2) explain how you decided which job needed perimeter and which needed area.",

  responseStems: [
    "The edging order is ___ because ___.",
    "The mulch order is ___ because ___.",
    "I knew which measurement to use by asking ___.",
  ],

  selfCheckQuestions: [
    "I gave both amounts, not just one.",
    "I put feet on the perimeter and square feet on the area.",
    "I showed the work for each order.",
    "I explained how I decided which measurement each job needed.",
    "I said what went wrong on the form that came back.",
  ],
};
