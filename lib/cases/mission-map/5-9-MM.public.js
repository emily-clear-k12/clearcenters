// Mission Map — "Decimal Dungeon Escape" — Grade 5 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.7), per rule 11:
// **5.2B — "compare and order two decimals to thousandths and represent
// comparisons using the symbols >, <, or =."**
//
// All four readings run to the thousandths, which is the ceiling 5.2B names,
// and the final gate asks for the comparison written with a symbol because
// the standard asks for that explicitly.
//
// cp4 is the engine's "sequence" checkpoint type — the student orders all
// four readings rather than picking one. Ordering is half of 5.2B and cannot
// be tested by a choice list without giving the order away in the options.

export const PUBLIC_CASE = {
  standard: "5.9-MM",
  teksLabel:
    "TEKS 5.2B — Comparing & Ordering Decimals to the Thousandths (Texas Grade 5 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Math",
  title: "Decimal Dungeon Escape",
  tagline: "The longest number on the wall is not the largest. Trust the digits and you stay down here.",

  mission: {
    briefText:
      "The sensor vault at Deepwell Station seals itself whenever a reading drifts. The release panel will not respond until the four archived readings are ranked from greatest to least. The numbers are etched into the wall beside the panel. One reading is written with more decimal places than the others. The cadet before you assumed that made it the largest, and the door has not moved since.",
    goal: "Compare and order decimals to the thousandths by reasoning about place value rather than digit count, then express the comparison using the correct symbol.",
  },

  mapImage: "/mission-map/5-9-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Chamber 1: Four readings are etched on the wall. What is the first move that makes them comparable?",
      evidence: {
        type: "data",
        label: "SENSOR READINGS",
        text: "Reading A: 0.5.  Reading B: 0.45.  Reading C: 0.405.  Reading D: 0.4.  Each one is a fraction of a full tank.",
      },
      choices: [
        { id: "a", text: "Line up the decimal points and fill the short ones with zeros, so every reading runs to the thousandths" },
        { id: "b", text: "Count the digits in each reading and rank them by length" },
        { id: "c", text: "Drop the decimal points and compare 5, 45, 405 and 4 as whole numbers" },
        { id: "d", text: "Round every reading to the nearest whole number first" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Written out to the thousandths, the readings become 0.500, 0.450, 0.405 and 0.400. Every place value can finally be compared directly against its counterpart.",
    },
    {
      id: "cp2",
      order: 2,
      type: "quickScan",
      position: { x: 26, y: 42 },
      prompt: "Chamber 2: Quick check — compare readings B and C. Which place settles it?",
      evidence: {
        type: "data",
        label: "B AND C, ALIGNED",
        text: "B reads 0.450. C reads 0.405. Both have a 4 in the tenths place.",
      },
      choices: [
        { id: "a", text: "The hundredths place: B has 5 there and C has 0, so B is greater" },
        { id: "b", text: "The thousandths place: C has 5 there and B has 0, so C is greater" },
        { id: "c", text: "The tenths place, which is the same for both, so the readings are equal" },
        { id: "d", text: "Neither — a number with three decimal places always outranks one with two" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "B and C tie in the tenths. The hundredths decide it: 5 beats 0, so 0.45 > 0.405.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 66 },
      prompt: "Chamber 3: Two cadets left their reasoning on the wall. Which one holds up?",
      evidenceA: {
        type: "passage",
        label: "REASONING CARVED HIGHER",
        text: "\"Reading C is 0.405, which has three digits after the point. The others have one or two. More digits means a bigger number, so C is the greatest.\"",
        choiceLabel: "Trust this reasoning",
      },
      evidenceB: {
        type: "passage",
        label: "REASONING CARVED LOWER",
        text: "\"Written to the thousandths they are 0.500, 0.450, 0.405 and 0.400. Compare the tenths first: 5 beats 4, so 0.500 is the greatest no matter how many digits follow.\"",
        choiceLabel: "Trust this reasoning",
      },
      correctSide: "B",
      evidenceLogEntry: "Place value settles the ranking, and it settles it from the left. That makes 0.5 the greatest reading, regardless of how many digits its competitors carry.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 34 },
      prompt: "Chamber 4: The release panel wants all four readings, greatest to least. Tap them into order.",
      evidence: {
        type: "data",
        label: "RELEASE PANEL",
        text: "The panel accepts the four readings in one order only: greatest first, least last.",
      },
      items: [
        { id: "c", text: "0.405" },
        { id: "a", text: "0.5" },
        { id: "d", text: "0.4" },
        { id: "b", text: "0.45" },
      ],
      correctOrder: ["a", "b", "c", "d"],
      evidenceLogEntry: "Greatest to least: 0.5, 0.45, 0.405, 0.4.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Chamber 5: The first cadet noticed something true — 0.405 does have the most digits. Why did that lead her wrong?",
      evidence: {
        type: "data",
        label: "PLACE VALUE PANEL",
        text: "0.4 and 0.400 mark the same point. Adding zeros on the right of a decimal does not add value to it.",
      },
      choices: [
        { id: "a", text: "Extra decimal places describe smaller and smaller pieces, so they can never outweigh a larger digit further left" },
        { id: "b", text: "The number of digits does decide the size, but she counted them wrong" },
        { id: "c", text: "Decimals with different numbers of digits cannot be compared at all" },
        { id: "d", text: "She should have compared the readings from right to left instead" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Digits further right describe progressively smaller pieces, so a decimal's length reveals nothing about its magnitude. The leftmost place where two numbers differ decides between them.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Chamber: Write the comparison the panel needs, using a symbol.",
      evidence: {
        type: "passage",
        label: "THE OPEN DOOR",
        text: "The panel holds the two closest readings: 0.45 and 0.405.",
      },
      choices: [
        { id: "a", text: "0.45 > 0.405" },
        { id: "b", text: "0.45 < 0.405" },
        { id: "c", text: "0.45 = 0.405" },
        { id: "d", text: "0.405 > 0.5" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "0.45 > 0.405. The hundredths place settles it.",
    },
  ],

  finalResponsePrompt:
    "Leave your reasoning on the wall so the next cadet does not repeat the mistake. Your answer should: (1) give the four readings in order from greatest to least and explain how you compared them, and (2) explain why having more digits after the decimal point does not make a number larger.",

  responseStems: [
    "In order from greatest to least, the readings are ___.",
    "I compared them by ___.",
    "More digits after the decimal point does not mean a larger number because ___.",
  ],

  selfCheckQuestions: [
    "I listed all four readings in the right order.",
    "I explained how I lined up the place values.",
    "I named the place that decided the closest pair.",
    "I used a symbol to show at least one comparison.",
    "I explained why digit count is not the same as size.",
  ],
};
