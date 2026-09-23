// Mission Map — "Array Door Challenge" — Grade 3 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.5), per rule 11:
// **3.4D — "determine the total number of objects when equally-sized groups
// of objects are combined or arranged in arrays up to 10 by 10."**
//
// Deliberately 3.4D and not 3.5B. Both standards mention arrays, but this
// case's trap is a story with the SAME DIGITS and UNEQUAL groups, and
// "equally-sized" is the exact word 3.4D turns on — so 3.4D is the standard
// the trap actually tests. It also keeps the project from stacking a third
// case on 3.5B, which Signal Check already covers (`MA.3.5B`) and which the
// Assembly Deck case map claims as well.

export const PUBLIC_CASE = {
  standard: "3.10-MM",
  teksLabel:
    "TEKS 3.4D — Total Objects in Equal Groups & Arrays (Texas Grade 3 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "Math",
  title: "Array Door Challenge",
  tagline: "The door counts. Same numbers, wrong shape, and it stays shut.",

  mission: {
    briefText:
      "The supply room door has an array lock on it. To open the lock, a cadet has to prove how many bolts are on the shelf. Counting them one at a time will not do it. The lock wants the shape they are stored in. Two stories are taped to the door. Only one of them matches the shelf.",
    goal: "Match an array to its equation and to a story about equal groups. Explain how the array proves the total.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 12, y: 72 },
      prompt: "Door 1: Look at the shelf. What does the array show?",
      evidence: {
        type: "data",
        label: "SUPPLY SHELF",
        text: "The bolts sit in a neat block. There are 6 rows. Each row holds 4 bolts. No row is short and no row is extra.",
      },
      choices: [
        { id: "a", text: "6 rows with 4 bolts in every row" },
        { id: "b", text: "4 rows with 6 bolts in every row" },
        { id: "c", text: "6 bolts in one long line" },
        { id: "d", text: "10 rows, because 6 and 4 make 10" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The shelf holds 6 rows. Each row has 4 bolts, and no row is different.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 28, y: 44 },
      prompt: "Door 2: Which equation matches the shelf?",
      evidence: {
        type: "data",
        label: "EQUATION CARDS",
        text: "Card A: 6 + 4 = 10.  Card B: 6 x 4 = 24.  Card C: 6 - 4 = 2.  Card D: 24 x 6 = 144.",
      },
      choices: [
        { id: "a", text: "6 + 4 = 10" },
        { id: "b", text: "6 x 4 = 24" },
        { id: "c", text: "6 - 4 = 2" },
        { id: "d", text: "24 x 6 = 144" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "6 rows of 4 is written 6 x 4 = 24. There are 24 bolts on the shelf.",
    },
    {
      id: "cp3",
      order: 3,
      type: "quickScan",
      position: { x: 44, y: 68 },
      prompt: "Door 3: Quick check — which addition matches the same shelf?",
      evidence: {
        type: "data",
        label: "ADDITION CARDS",
        text: "One cadet wants to add instead of multiply.",
      },
      choices: [
        { id: "a", text: "4 + 4 + 4 + 4 + 4 + 4 = 24" },
        { id: "b", text: "6 + 6 + 6 + 6 + 6 + 6 = 36" },
        { id: "c", text: "6 + 4 + 6 + 4 = 20" },
        { id: "d", text: "24 + 24 = 48" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Adding 4 six times gives 24, the same as 6 x 4. Each row adds one more group of 4.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 60, y: 36 },
      prompt: "Door 4: Two stories are taped to the door. Both use the numbers 6 and 24. Only one of them matches the shelf. Which story holds up?",
      evidenceA: {
        type: "passage",
        label: "STORY ON THE LEFT",
        text: "\"Mia packed 24 bolts into 6 trays. She put 9 in the first tray and 2 in the next. The rest went wherever they fit.\"",
        choiceLabel: "This story matches the shelf",
      },
      evidenceB: {
        type: "passage",
        label: "STORY ON THE RIGHT",
        text: "\"Mia packed 24 bolts into 6 trays. She put the same number in every tray, so each tray got 4.\"",
        choiceLabel: "This story matches the shelf",
      },
      correctSide: "B",
      evidenceLogEntry: "The story on the right uses equal groups, like the shelf. The left story has the same numbers but uneven trays.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 76, y: 62 },
      prompt: "Door 5: The left story used the numbers 6 and 24 too. Why does it still not match?",
      evidence: {
        type: "passage",
        label: "LOCK NOTE",
        text: "The array lock reads the shape of the groups, not the digits in the story.",
      },
      choices: [
        { id: "a", text: "Its groups are not equal, and an array needs every row to be the same" },
        { id: "b", text: "It uses the wrong numbers" },
        { id: "c", text: "It has too many trays" },
        { id: "d", text: "It adds instead of multiplying" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Same digits is not the same structure. An array only works when the groups are equal.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 30 },
      prompt: "Final Door: The lock asks one last thing — how does the array prove the total?",
      evidence: {
        type: "passage",
        label: "THE OPEN SHELF",
        text: "6 equal rows. 4 bolts in each row. 24 bolts in all.",
      },
      choices: [
        { id: "a", text: "An array has equal rows and columns, so you can multiply instead of counting" },
        { id: "b", text: "An array is just a neat stack, and you still count each one" },
        { id: "c", text: "An array proves the total only when the rows are different sizes" },
        { id: "d", text: "An array works for adding but never for multiplying" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "An array has equal rows and columns. Multiplication gives the total without counting one by one.",
    },
  ],

  finalResponsePrompt:
    "The supply officer wants a note explaining how you opened the door. Your answer should: (1) say how many bolts are on the shelf and how you knew, and (2) explain why the story about uneven trays did not match, even though it used the same numbers.",

  responseStems: [
    "The shelf holds ___ bolts because there are ___ rows of ___.",
    "The equation that matches is ___.",
    "The uneven story does not match because ___.",
  ],

  selfCheckQuestions: [
    "I said how many rows there are and how many are in each row.",
    "I wrote the multiplication equation that matches the shelf.",
    "I said the total number of bolts.",
    "I explained why equal groups matter.",
    "I said why the same numbers were not enough to match.",
  ],
};
