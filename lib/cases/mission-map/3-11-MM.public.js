// Mission Map — "Fraction Path Unlock" — Grade 3 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.5), per rule 11:
// **3.7A — "represent fractions of halves, fourths, and eighths as distances
// from zero on a number line."**
//
// The case uses fourths, which 3.7A names directly. Its trap — a number line
// partitioned into uneven spaces — is the equal-parts idea that 3.3C states
// ("the unit fraction 1/b ... one part of a whole that has been partitioned
// into b EQUAL parts"), so 3.3C is the secondary anchor and is named in the
// reasoning rather than in the code. The primary is 3.7A because the action
// the student performs is PLACING a fraction as a distance from zero.

export const PUBLIC_CASE = {
  standard: "3.11-MM",
  teksLabel:
    "TEKS 3.7A — Fractions as Distances from Zero on a Number Line (Texas Grade 3 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Math",
  title: "Fraction Path Unlock",
  tagline: "The planks only hold if they sit on equal parts. Guess, and the bridge shakes you off.",

  mission: {
    briefText:
      "A rope bridge crosses the canyon at Marker Station. The planks are missing. To put one back, you mark exactly where it goes. The line runs from 0 to 1. The bridge keeper left two lines behind. One of them will hold a plank. The other one will not.",
    goal: "Place a fraction on a number line as a distance from 0. Explain why the parts have to be equal.",
  },

  mapImage: "/mission-map/3-11-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Plank 1: Before you place anything — what is the whole on this bridge?",
      evidence: {
        type: "data",
        label: "BRIDGE LINE",
        text: "A line runs from a post marked 0 to a post marked 1. The canyon gap is the space between them.",
      },
      choices: [
        { id: "a", text: "The whole is the distance from 0 to 1" },
        { id: "b", text: "The whole is the post marked 1 by itself" },
        { id: "c", text: "The whole is every number on every bridge" },
        { id: "d", text: "There is no whole on a number line" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The whole is the distance from 0 to 1. Every fraction on this bridge is part of that distance.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Plank 2: The keeper has cut the line into parts. How many parts, and what are they called?",
      evidence: {
        type: "data",
        label: "PARTITION MARKS",
        text: "Three marks sit between 0 and 1. Every space between marks is exactly the same width. That makes 4 spaces in all.",
      },
      choices: [
        { id: "a", text: "3 parts, called thirds" },
        { id: "b", text: "4 equal parts, called fourths" },
        { id: "c", text: "4 parts, but they are not equal" },
        { id: "d", text: "8 parts, called eighths" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Three marks cut the line into 4 equal spaces. Each space is one fourth of the whole.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Plank 3: Your card says 3/4. Where does that plank go?",
      evidence: {
        type: "data",
        label: "FRACTION CARD — 3/4",
        text: "The card shows 3/4. The line is already cut into 4 equal spaces.",
      },
      choices: [
        { id: "a", text: "At the third mark, 3 equal spaces away from 0" },
        { id: "b", text: "At the first mark, because 3 is one number" },
        { id: "c", text: "Past the post marked 1, because 3 is bigger than 1" },
        { id: "d", text: "Right on 0, because you start counting there" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "3/4 sits 3 equal spaces from 0. The bottom number says how many spaces; the top says how many to travel.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Plank 4: The keeper left two lines behind. Both are cut into 4 parts, and both have a plank at the third mark. Only one will hold. Which line holds up?",
      evidenceA: {
        type: "data",
        label: "LINE ON THE LEFT",
        text: "This line is cut into 4 parts, but the spaces are different sizes. The first space is tiny. The third space is very wide. A plank sits at the third mark.",
        choiceLabel: "This line will hold the plank",
      },
      evidenceB: {
        type: "data",
        label: "LINE ON THE RIGHT",
        text: "This line is cut into 4 parts, and every space is exactly the same width. A plank sits at the third mark.",
        choiceLabel: "This line will hold the plank",
      },
      correctSide: "B",
      evidenceLogEntry: "Only the line with equal spaces holds. Counting 4 parts is not enough if the parts are different sizes.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 58 },
      prompt: "Plank 5: Quick check — the left line also had 4 parts. Why does it still fail?",
      evidence: {
        type: "passage",
        label: "KEEPER'S RULE",
        text: "The keeper's rule is short: fourths means four parts that match.",
      },
      choices: [
        { id: "a", text: "Its parts are not equal, so no space on it is really one fourth" },
        { id: "b", text: "It has too few marks" },
        { id: "c", text: "Its plank is at the wrong mark" },
        { id: "d", text: "It starts at 0 instead of 1" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Uneven parts are not fourths. A fraction name only works when the parts match.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Plank: The bridge asks one last question before it lets you cross.",
      evidence: {
        type: "passage",
        label: "THE FINISHED BRIDGE",
        text: "The plank sits 3 equal spaces from 0, on a line cut into 4 matching parts.",
      },
      choices: [
        { id: "a", text: "A fraction is a distance from 0, counted in equal parts of the whole" },
        { id: "b", text: "A fraction on a number line is whichever mark looks closest" },
        { id: "c", text: "A fraction on a number line is the number of marks you can see" },
        { id: "d", text: "A fraction on a number line always sits halfway" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A fraction is a distance from 0. It is measured in equal parts of the whole.",
    },
  ],

  finalResponsePrompt:
    "The bridge keeper wants your reasoning before the next cadet crosses. Explain where 3/4 goes and why. Your answer should: (1) tell how far 3/4 is from 0 and how you counted, and (2) explain why a line with uneven parts cannot hold the plank.",

  responseStems: [
    "The whole is the distance from ___ to ___.",
    "3/4 goes ___ equal spaces from 0 because ___.",
    "A line with uneven parts does not work because ___.",
  ],

  selfCheckQuestions: [
    "I said what the whole is on this number line.",
    "I said how many equal parts the line is cut into.",
    "I explained how far 3/4 is from 0.",
    "I used the words equal parts.",
    "I said why uneven spaces cannot be fourths.",
  ],
};
