// Mission Map — "Operation Key Quest" — Grade 4 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.6), per rule 11:
// **4.5A — "represent multi-step problems involving the four operations with
// whole numbers using strip diagrams and equations with a letter standing for
// the unknown quantity."**
//
// The letter is not decoration here — 4.5A names it, so the final gate asks
// for the equation with a letter in it rather than just the answer. The
// library's trap is a student who picks an operation off a keyword ("left"
// means subtract), which is exactly the habit that breaks on a multi-step
// problem: the word "left" IS in this problem, and subtraction IS the second
// step, but doing it first gives nonsense.
//
// The problem also carries one number the question does not need (the crew
// count), per the library's "word problem with extra number" evidence clue.

export const PUBLIC_CASE = {
  standard: "4.13-MM",
  teksLabel:
    "TEKS 4.5A — Multi-Step Problems with Strip Diagrams & Equations Using a Letter (Texas Grade 4 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Math",
  title: "Operation Key Quest",
  tagline: "One word in the problem says subtract. Do that first and you get an answer that cannot be true.",

  mission: {
    briefText:
      "The supply lock at Halden Station opens only for a cadet who can explain the plan before solving it. The quartermaster's note is on the door, and one number in it has nothing to do with the question. A cadet ahead of you grabbed the first operation word she saw and got a number the quartermaster called impossible.",
    goal: "Plan a multi-step problem by matching operations to the situation. Write it as one equation with a letter for the unknown.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Key 1: Read the note. What is the question actually asking for?",
      evidence: {
        type: "passage",
        label: "QUARTERMASTER'S NOTE",
        text: "The station received 6 crates. Each crate holds 24 ration packs. The crew has already eaten 35 packs. There are 9 crew members. How many ration packs are left?",
      },
      choices: [
        { id: "a", text: "The number of ration packs still remaining" },
        { id: "b", text: "The number of crates still unopened" },
        { id: "c", text: "The number of packs each crew member gets" },
        { id: "d", text: "The number of packs the crew ate" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The question asks how many ration packs are left, not how many crates or how many per person.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Key 2: The note has four numbers. Which one does this question not need?",
      evidence: {
        type: "data",
        label: "NUMBERS IN THE NOTE",
        text: "6 crates.  24 packs in each crate.  35 packs eaten.  9 crew members.",
      },
      choices: [
        { id: "a", text: "9, because the question never asks about splitting packs between people" },
        { id: "b", text: "35, because packs that were eaten are gone" },
        { id: "c", text: "24, because it only describes one crate" },
        { id: "d", text: "None of them — every number in a problem gets used" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The 9 crew members is extra. Nothing in the question depends on how many people there are.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Key 3: Before any arithmetic — what has to happen first, and why?",
      evidence: {
        type: "data",
        label: "STRIP DIAGRAM",
        text: "The strip shows 6 equal sections, each labeled 24. A piece at one end is marked 35, and the rest of the strip is marked with a question mark.",
      },
      choices: [
        { id: "a", text: "Multiply 6 by 24, because you need the total number of packs before you can take any away" },
        { id: "b", text: "Subtract 35 from 24, because the word 'left' means subtract" },
        { id: "c", text: "Divide 24 by 6, because there are 6 crates" },
        { id: "d", text: "Add 6 and 24, because both numbers describe crates" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "First find the total: 6 crates of 24 packs. You cannot subtract what was eaten until you know what there was.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Key 4: Two cadets wrote plans on the door. Which plan holds up?",
      evidenceA: {
        type: "data",
        label: "PLAN SCRATCHED FIRST",
        text: "\"The problem says 'left,' and left means subtract. 24 - 35 = a negative number of packs. Something is wrong with the problem.\"",
        choiceLabel: "Trust this plan",
      },
      evidenceB: {
        type: "data",
        label: "PLAN SCRATCHED SECOND",
        text: "\"First the total: 6 x 24 = 144 packs. Then take away what was eaten: 144 - 35 = 109 packs left.\"",
        choiceLabel: "Trust this plan",
      },
      correctSide: "B",
      evidenceLogEntry: "6 x 24 = 144, then 144 - 35 = 109 packs left. Multiplication has to come before the subtraction.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Key 5: The word 'left' really is in the problem, and subtraction really is part of the answer. So what did the first plan get wrong?",
      evidence: {
        type: "passage",
        label: "QUARTERMASTER'S REPLY",
        text: "\"You subtracted from one crate. We opened six.\"",
      },
      choices: [
        { id: "a", text: "It used the keyword to pick both the operation and the order, so it subtracted before finding the total" },
        { id: "b", text: "It should not have subtracted at all" },
        { id: "c", text: "It used the wrong keyword — the problem really means add" },
        { id: "d", text: "It forgot to include the 9 crew members" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A keyword can suggest an operation, but it cannot tell you the order. The situation does that.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Key: Write the whole plan as one equation, using a letter for what you do not know yet.",
      evidence: {
        type: "data",
        label: "THE LOCK PANEL",
        text: "The panel accepts one equation. Let p stand for the number of ration packs left.",
      },
      choices: [
        { id: "a", text: "(6 x 24) - 35 = p" },
        { id: "b", text: "6 x (24 - 35) = p" },
        { id: "c", text: "6 + 24 - 35 = p" },
        { id: "d", text: "(6 x 24) - 35 - 9 = p" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "(6 x 24) - 35 = p, and p = 109. The equation shows the order, and the letter holds the unknown.",
    },
  ],

  finalResponsePrompt:
    "The quartermaster wants the plan in writing before she signs off. Explain how you solved it. Your answer should: (1) give your equation and your answer, and say why the multiplication had to come first, and (2) explain why picking an operation from a keyword did not work here.",

  responseStems: [
    "My equation is ___, and p = ___.",
    "I multiplied first because ___.",
    "Choosing an operation from the word 'left' did not work because ___.",
  ],

  selfCheckQuestions: [
    "I wrote one equation with a letter for the unknown.",
    "I gave the final number of packs left.",
    "I explained why the total had to come before the subtraction.",
    "I said which number in the note I did not use, and why.",
    "I explained what goes wrong when you pick an operation from one word.",
  ],
};
