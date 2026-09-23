// Mission Map — "Data Clue Trail" — Grade 3 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.5), per rule 11:
// **3.8B — "solve one- and two-step problems using categorical data
// represented with a frequency table, dot plot, pictograph, or bar graph
// WITH SCALED INTERVALS."**
//
// That last phrase is why this case anchors to 3.8B rather than 3.8A
// (summarizing a data set). The library's trap is a cadet who counts bar
// segments as one vote each and ignores the scale — the scaled interval is
// the standard, and the trap is the standard's own failure mode. The final
// question is a two-step problem (read the scale, then compare two
// categories), which 3.8B names explicitly.

export const PUBLIC_CASE = {
  standard: "3.12-MM",
  teksLabel:
    "TEKS 3.8B — Solving Problems with Scaled Bar Graphs & Frequency Tables (Texas Grade 3 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Math",
  title: "Data Clue Trail",
  tagline: "Every square on this graph counts twice. Miss that, and every answer after it is wrong.",

  mission: {
    briefText:
      "Camp Ridge surveyed every cadet about trail snacks before the long hike. The cook needs one number before she packs: how many more cadets chose crackers than raisins. A cadet already wrote an answer on the claim card by the trail head. It is wrong, and the trail will not open until someone can say why.",
    goal: "Use a bar graph with a scale to answer a two-step question. Explain why the scale has to be read first.",
  },

  mapImage: "/mission-map/3-12-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Trail 1: Start with the key. What does one square on this graph stand for?",
      evidence: {
        type: "data",
        label: "SNACK SURVEY — BAR GRAPH",
        text: "The key at the bottom reads: each square = 2 cadets. Trail mix: 6 squares. Apples: 4 squares. Crackers: 7 squares. Raisins: 3 squares.",
      },
      choices: [
        { id: "a", text: "One square stands for 1 cadet" },
        { id: "b", text: "One square stands for 2 cadets" },
        { id: "c", text: "One square stands for every cadet at camp" },
        { id: "d", text: "The key does not say" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The key says each square = 2 cadets. Squares are not votes on this graph.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Trail 2: The cook asked about crackers and raisins. How many cadets chose crackers?",
      evidence: {
        type: "data",
        label: "CRACKERS BAR",
        text: "The crackers bar is 7 squares long. Each square = 2 cadets.",
      },
      choices: [
        { id: "a", text: "7 cadets, because the bar is 7 squares" },
        { id: "b", text: "14 cadets, because 7 squares x 2 = 14" },
        { id: "c", text: "9 cadets, because 7 + 2 = 9" },
        { id: "d", text: "2 cadets, because each square is 2" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Crackers: 7 squares x 2 cadets = 14 cadets.",
    },
    {
      id: "cp3",
      order: 3,
      type: "quickScan",
      position: { x: 42, y: 66 },
      prompt: "Trail 3: Quick check — how many cadets chose raisins?",
      evidence: {
        type: "data",
        label: "RAISINS BAR",
        text: "The raisins bar is 3 squares long. Each square = 2 cadets.",
      },
      choices: [
        { id: "a", text: "3 cadets" },
        { id: "b", text: "5 cadets" },
        { id: "c", text: "6 cadets" },
        { id: "d", text: "9 cadets" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Raisins: 3 squares x 2 cadets = 6 cadets.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Trail 4: Two claim cards are pinned at the trail head. Both answer the cook's question. Which claim holds up?",
      evidenceA: {
        type: "data",
        label: "CLAIM CARD — PINNED FIRST",
        text: "\"Crackers has 7 squares and raisins has 3 squares. 7 - 3 = 4. So 4 more cadets chose crackers.\"",
        choiceLabel: "Trust this claim",
      },
      evidenceB: {
        type: "data",
        label: "CLAIM CARD — PINNED SECOND",
        text: "\"Crackers is 14 cadets and raisins is 6 cadets. 14 - 6 = 8. So 8 more cadets chose crackers.\"",
        choiceLabel: "Trust this claim",
      },
      correctSide: "B",
      evidenceLogEntry: "The second card read the scale first, then subtracted. 14 - 6 = 8 cadets.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Trail 5: The first card subtracted correctly. 7 - 3 really is 4. So what went wrong?",
      evidence: {
        type: "passage",
        label: "COOK'S NOTE",
        text: "The cook packs snacks for cadets, not for squares.",
      },
      choices: [
        { id: "a", text: "It counted squares instead of cadets, so both numbers were half of what they should be" },
        { id: "b", text: "It subtracted when it should have added" },
        { id: "c", text: "It used the wrong two bars" },
        { id: "d", text: "It rounded the numbers" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Subtracting squares gives a square answer, not a cadet answer. The scale has to come first.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 30 },
      prompt: "Final Trail: The trail opens for the cadet who can say the rule.",
      evidence: {
        type: "passage",
        label: "THE COOK'S LIST",
        text: "Crackers, 14. Raisins, 6. Eight more cadets want crackers.",
      },
      choices: [
        { id: "a", text: "Read the key or scale first, then use the real amounts to make a claim" },
        { id: "b", text: "The tallest bar always answers the question" },
        { id: "c", text: "Count the squares, because squares are easier to see" },
        { id: "d", text: "A graph is only a picture, so any answer close to it works" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Graph evidence has to be read through the key or scale before it becomes a claim.",
    },
  ],

  finalResponsePrompt:
    "Write the answer the cook needs, and explain it. Your answer should: (1) say how many more cadets chose crackers than raisins and show how you got it, and (2) explain what the first claim card did wrong, even though its subtraction was correct.",

  responseStems: [
    "Each square on the graph stands for ___ cadets.",
    "Crackers is ___ cadets and raisins is ___ cadets, so ___ - ___ = ___.",
    "The first card was wrong because ___.",
  ],

  selfCheckQuestions: [
    "I said what one square stands for.",
    "I turned both bars into real numbers of cadets.",
    "I showed the subtraction I did.",
    "I answered the cook's actual question.",
    "I explained why counting squares gave the wrong answer.",
  ],
};
