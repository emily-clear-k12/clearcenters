// Mission Map — "Fraction Recipe Quest" — Grade 5 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.7), per rule 11:
// **5.3H — "represent and solve addition and subtraction of fractions with
// unequal denominators referring to the same whole using objects and
// pictorial models and properties of operations."**
//
// "Referring to the same whole" is the phrase this case is built on: both
// amounts are measured in the same cup, which is what makes the twelfths
// rename legitimate. The library's trap is adding across (3/4 + 2/3 = 5/7),
// and cp5 tests it with a reasonableness check rather than a rule — 5/7 is
// smaller than the 3/4 the cook started with, which is impossible when you
// have added something.
//
// 5.3K (add and subtract positive rational numbers fluently) is adjacent but
// is claimed by the Assembly Deck case map; 5.3H is the standard that names
// the unequal denominators this case turns on.

export const PUBLIC_CASE = {
  standard: "5.12-MM",
  teksLabel:
    "TEKS 5.3H — Adding & Subtracting Fractions with Unequal Denominators (Texas Grade 5 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Math",
  title: "Fraction Recipe Quest",
  tagline: "Add the tops, add the bottoms, and you end up with less than you started with.",

  mission: {
    briefText:
      "The galley at Wren Station is short one container. The cook must determine whether tomorrow's dry ration mix will fit inside a single one-cup jar. The recipe calls for two dry ingredients, both measured with the same cup. A crew member worked the arithmetic out on the board and arrived at a total the cook insists cannot possibly be correct.",
    goal: "Add two fractions with unequal denominators that refer to the same whole, and explain why adding numerators and denominators separately produces an impossible result.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 72 },
      prompt: "Station 1: Read the recipe. What is being added, and to what whole?",
      evidence: {
        type: "data",
        label: "RATION BAR RECIPE — DRY MIX",
        text: "3/4 cup rolled oats. 2/3 cup flour. Both are measured with the same one-cup measure.",
      },
      choices: [
        { id: "a", text: "Two fractions of the same whole — the same one-cup measure — with unequal denominators" },
        { id: "b", text: "Two fractions of different wholes, so they cannot be combined at all" },
        { id: "c", text: "Two whole numbers written in an unusual way" },
        { id: "d", text: "Two fractions with the same denominator, ready to add as they are" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Both amounts refer to the same one-cup whole, but the pieces are different sizes: fourths and thirds.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 44 },
      prompt: "Station 2: Why can these two amounts not be added exactly as written?",
      evidence: {
        type: "data",
        label: "MEASURING PIECES",
        text: "A fourth of a cup and a third of a cup are different sizes. Three fourths is three of the larger-cut pieces; two thirds is two of a different cut.",
      },
      choices: [
        { id: "a", text: "The pieces are different sizes, so counting them together would be counting unlike units" },
        { id: "b", text: "One of the two amounts is larger than a whole cup" },
        { id: "c", text: "Fractions can only be added when both numerators match" },
        { id: "d", text: "They can be added as written; nothing needs to change" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Fourths and thirds are pieces of genuinely different sizes. Both amounts require renaming in a common piece before they can legitimately be combined.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 68 },
      prompt: "Station 3: Rename both amounts in twelfths.",
      evidence: {
        type: "data",
        label: "TWELFTHS STRIP",
        text: "The strip cuts one cup into 12 equal parts. Each fourth covers 3 of them. Each third covers 4 of them.",
      },
      choices: [
        { id: "a", text: "3/4 = 9/12 and 2/3 = 8/12" },
        { id: "b", text: "3/4 = 3/12 and 2/3 = 2/12" },
        { id: "c", text: "3/4 = 8/12 and 2/3 = 9/12" },
        { id: "d", text: "3/4 = 12/9 and 2/3 = 12/8" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "3/4 is 9 of the 12 parts; 2/3 is 8 of them. Both are now measured in the same size piece.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 36 },
      prompt: "Station 4: Two totals are written on the galley board. Which one should the cook use?",
      evidenceA: {
        type: "data",
        label: "TOTAL WRITTEN IN CHALK",
        text: "\"3/4 + 2/3. Add the tops: 3 + 2 = 5. Add the bottoms: 4 + 3 = 7. The dry mix is 5/7 of a cup, so it fits in one jar easily.\"",
        choiceLabel: "Use this total",
      },
      evidenceB: {
        type: "data",
        label: "TOTAL WRITTEN IN PENCIL",
        text: "\"3/4 + 2/3 = 9/12 + 8/12 = 17/12 of a cup, which is 1 and 5/12 cups. That does not fit in a one-cup jar.\"",
        choiceLabel: "Use this total",
      },
      correctSide: "B",
      evidenceLogEntry: "9/12 + 8/12 = 17/12, or 1 5/12 cups. The dry mix needs more than one jar.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 60 },
      prompt: "Station 5: The cook says 5/7 cannot possibly be right, without doing any arithmetic. How does she know?",
      evidence: {
        type: "data",
        label: "COOK'S REASONING",
        text: "3/4 of a cup is already 0.75 of the jar. 5/7 of a cup is about 0.71 of it.",
      },
      choices: [
        { id: "a", text: "5/7 is less than the 3/4 she started with, and adding flour cannot leave her with less mix than the oats alone" },
        { id: "b", text: "5/7 is not a real fraction" },
        { id: "c", text: "Sevenths can never appear in a recipe" },
        { id: "d", text: "5/7 is greater than one cup, which the jar cannot hold" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Adding across shrank the total below one of the very amounts being combined, which is a result no correct addition could ever produce.",
    },
    {
      id: "cp6",
      order: 6,
      type: "quickScan",
      position: { x: 90, y: 30 },
      prompt: "Final Station: Quick check — the cook wants the total written the way she will read it on the shelf.",
      evidence: {
        type: "passage",
        label: "GALLEY LABEL",
        text: "The dry mix comes to 17/12 of a cup.",
      },
      choices: [
        { id: "a", text: "1 and 5/12 cups" },
        { id: "b", text: "1 and 7/12 cups" },
        { id: "c", text: "12/17 of a cup" },
        { id: "d", text: "17 cups" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "17/12 is one whole cup with 5/12 left over: 1 5/12 cups.",
    },
  ],

  finalResponsePrompt:
    "Write the note the cook will pin above the galley board. Your answer should: (1) give the total amount of dry mix and show how you found it, and (2) explain why adding the tops and the bottoms gave an answer that could not be true.",

  responseStems: [
    "In twelfths, 3/4 is ___ and 2/3 is ___.",
    "The total is ___, which is ___ cups.",
    "Adding across is wrong because ___.",
  ],

  selfCheckQuestions: [
    "I renamed both fractions so they had the same size pieces.",
    "I gave the total as a fraction and as a mixed number.",
    "I answered whether the mix fits in a one-cup jar.",
    "I explained why the pieces had to match before adding.",
    "I used the cook's check — the total cannot be smaller than one of the parts.",
  ],
};
