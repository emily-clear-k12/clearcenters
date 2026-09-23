// Mission Map — "Decimal Tenths Treasure" — Grade 4 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.6), per rule 11:
// **4.2B — "represent the value of the digit in whole numbers through
// 1,000,000,000 and decimals to the hundredths using expanded notation and
// numerals."**
//
// Deliberately 4.2B and not 4.2G. The library's own Final Unlock is "the
// position of a digit after the decimal tells its value," and its trap is
// 0.4 against 0.04 — the same digit in two positions. That is place value,
// which is 4.2B. 4.2G (relating decimals to fractions) is the secondary and
// is exercised at cp2, but it is also already covered by a Signal Check case
// (`MA.4.2G`), so anchoring here would have stacked coverage rather than
// added it.

export const PUBLIC_CASE = {
  standard: "4.12-MM",
  teksLabel:
    "TEKS 4.2B — Value of a Digit in Decimals to the Hundredths (Texas Grade 4 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Math",
  title: "Decimal Tenths Treasure",
  tagline: "Both tags show a 4. Only one of them opens the chest.",

  mission: {
    briefText:
      "The survey chest at Ridgeline Station is locked with a decimal dial. The tag on the lid gives the amount. A shaded grid inside the lid shows that same amount as a picture. Two cadets have already tried the dial. They read the same digit off the tag and set two different numbers, and the chest is still shut.",
    goal: "Match a decimal to its fraction and its model. Explain how a digit's position after the decimal point sets its value.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Dial 1: Read the grid in the lid. How much of it is shaded?",
      evidence: {
        type: "data",
        label: "GRID MODEL IN THE LID",
        text: "The grid is one whole square divided into 10 equal columns. Four of the ten columns are shaded.",
      },
      choices: [
        { id: "a", text: "Four of ten equal parts of the whole" },
        { id: "b", text: "Four of one hundred equal parts of the whole" },
        { id: "c", text: "Ten of four equal parts of the whole" },
        { id: "d", text: "Four whole squares" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The grid shows 4 out of 10 equal columns shaded — four tenths of the whole.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Dial 2: Write that shaded amount as a fraction.",
      evidence: {
        type: "data",
        label: "FRACTION CARDS",
        text: "Card A: 4/10.  Card B: 4/100.  Card C: 10/4.  Card D: 4/1.",
      },
      choices: [
        { id: "a", text: "4/10" },
        { id: "b", text: "4/100" },
        { id: "c", text: "10/4" },
        { id: "d", text: "4/1" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Four of ten equal parts is 4/10.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Dial 3: Now write 4/10 as a decimal, and say what the 4 is worth.",
      evidence: {
        type: "data",
        label: "PLACE VALUE CHART",
        text: "The first place after the decimal point is tenths. The second place after the decimal point is hundredths.",
      },
      choices: [
        { id: "a", text: "0.4 — the 4 sits in the tenths place and is worth four tenths" },
        { id: "b", text: "0.04 — the 4 sits in the hundredths place and is worth four hundredths" },
        { id: "c", text: "4.0 — the 4 sits in the ones place and is worth four wholes" },
        { id: "d", text: "0.410 — the 4 and the 10 both go after the point" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "4/10 is written 0.4. The 4 sits in the tenths place, so it is worth four tenths.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Dial 4: Two cadets set the dial. Both of them read a 4 off the tag. Which setting matches the grid?",
      evidenceA: {
        type: "data",
        label: "FIRST CADET'S SETTING",
        text: "\"The tag has one digit, a 4, and it goes after the point. I set the dial to 0.04.\" On the hundredths grid, 0.04 shades 4 tiny squares out of 100.",
        choiceLabel: "Trust this setting",
      },
      evidenceB: {
        type: "data",
        label: "SECOND CADET'S SETTING",
        text: "\"Four of ten columns is four tenths, so the 4 belongs in the first place after the point. I set the dial to 0.4.\" On the hundredths grid, 0.4 shades 40 tiny squares out of 100.",
        choiceLabel: "Trust this setting",
      },
      correctSide: "B",
      evidenceLogEntry: "0.4 shades 40 of 100 small squares; 0.04 shades only 4. The grid shows four tenths, so 0.4 is the setting.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Dial 5: Both settings used the digit 4. Why is 0.04 so much smaller?",
      evidence: {
        type: "data",
        label: "THE TWO GRIDS SIDE BY SIDE",
        text: "0.4 covers 40 of the 100 small squares. 0.04 covers 4 of them. One is ten times the other.",
      },
      choices: [
        { id: "a", text: "In 0.04 the 4 sits one place further right, in the hundredths, so it is worth one tenth as much" },
        { id: "b", text: "0.04 is smaller because it has more digits in it" },
        { id: "c", text: "The two numbers are actually equal, because both use a 4" },
        { id: "d", text: "0.04 is smaller because zeros always make a number smaller wherever they go" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Moving the 4 one place to the right drops its value to one tenth. The digit did not change; its position did.",
    },
    {
      id: "cp6",
      order: 6,
      type: "quickScan",
      position: { x: 90, y: 28 },
      prompt: "Final Dial: Quick check — the chest asks for the rule before it opens.",
      evidence: {
        type: "passage",
        label: "THE OPEN CHEST",
        text: "The dial reads 0.4. The grid in the lid shows four of ten columns shaded.",
      },
      choices: [
        { id: "a", text: "The position of a digit after the decimal point tells you its value" },
        { id: "b", text: "The digit itself tells you the value, no matter where it sits" },
        { id: "c", text: "The number with more digits is always the larger one" },
        { id: "d", text: "Decimals and fractions can never show the same amount" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The position of a digit after the decimal point tells its value.",
    },
  ],

  finalResponsePrompt:
    "Leave a note in the chest for the survey team. Explain what the dial should read and why. Your answer should: (1) connect the grid, the fraction, and the decimal to each other, and (2) explain why 0.4 and 0.04 are not the same, even though both are written with a 4.",

  responseStems: [
    "The grid shows ___ of ___ equal parts, which is the fraction ___.",
    "As a decimal that is ___, because the 4 sits in the ___ place.",
    "0.4 and 0.04 are different because ___.",
  ],

  selfCheckQuestions: [
    "I said what the grid shows in words.",
    "I wrote the amount as a fraction and as a decimal.",
    "I named the place the 4 sits in.",
    "I explained why 0.04 is smaller than 0.4.",
    "I made the point about position, not about the digit.",
  ],
};
