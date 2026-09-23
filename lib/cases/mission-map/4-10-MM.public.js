// Mission Map — "Fraction Comparison Castle" — Grade 4 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.6), per rule 11:
// **4.3D — "compare two fractions with different numerators and different
// denominators and represent the comparison using the symbols >, <, or =."**
//
// The case compares 5/8 and 3/4 — different numerators AND different
// denominators, which is what 4.3D requires and what rules out a same-
// numerator shortcut. 4.3F (benchmarks 0, 1/4, 1/2, 1) and 4.3C (equivalence)
// are secondary and are exercised at cp2 and cp3, but the graded comparison
// is 4.3D's.
//
// Deliberate design note: the benchmark gate does NOT settle the question.
// Both fractions are greater than 1/2, so a student who stops at the
// benchmark still has work to do. That is the difference between a case that
// teaches the strategy and a case that rewards guessing.

export const PUBLIC_CASE = {
  standard: "4.10-MM",
  teksLabel:
    "TEKS 4.3D — Comparing Fractions with Unlike Numerators & Denominators (Texas Grade 4 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Math",
  title: "Fraction Comparison Castle",
  tagline: "Two levers, two fractions. The castle opens for the bigger one — and bigger numbers are not the same as a bigger fraction.",

  mission: {
    briefText:
      "The castle gate has two levers, and each one is carved with a fraction. Pull the lever with the greater fraction and the gate swings open. Pull the other one and it locks for the night. A cadet ahead of you scratched a claim into the wall. The gate is still shut, so her reasoning went wrong somewhere.",
    goal: "Compare two fractions with different numerators and different denominators, using models or benchmarks rather than the size of the denominator.",
  },

  mapImage: "/mission-map/4-10-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Lever 1: Read the two carvings. What makes this comparison harder than usual?",
      evidence: {
        type: "data",
        label: "THE TWO LEVERS",
        text: "The left lever is carved 5/8. The right lever is carved 3/4. Neither the top numbers nor the bottom numbers match.",
      },
      choices: [
        { id: "a", text: "The numerators are different and so are the denominators, so you cannot compare them at a glance" },
        { id: "b", text: "The numerators match, so only the denominators matter" },
        { id: "c", text: "The denominators match, so only the numerators matter" },
        { id: "d", text: "Fractions with different denominators can never be compared" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "5/8 and 3/4 differ in both the numerator and the denominator, so neither number can be compared on its own.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Lever 2: Try the benchmark 1/2 first. What does it tell you?",
      evidence: {
        type: "data",
        label: "BENCHMARK CARD — 1/2",
        text: "Half of 8 is 4, so 4/8 equals 1/2. Half of 4 is 2, so 2/4 equals 1/2. The carvings read 5/8 and 3/4.",
      },
      choices: [
        { id: "a", text: "Both fractions are greater than 1/2, so the benchmark narrows it down but does not decide it" },
        { id: "b", text: "5/8 is less than 1/2, so 3/4 wins immediately" },
        { id: "c", text: "3/4 is less than 1/2, so 5/8 wins immediately" },
        { id: "d", text: "Both fractions are less than 1/2, so neither lever works" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "5/8 is past 4/8 and 3/4 is past 2/4, so both beat 1/2. The benchmark alone cannot pick a lever.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Lever 3: The fraction strips are cut in eighths. Rename 3/4 so you can compare the two directly.",
      evidence: {
        type: "data",
        label: "FRACTION STRIPS — EIGHTHS",
        text: "Each fourth on the strip lines up exactly with two eighths. Three fourths stretches across the same distance as six of the eighth pieces.",
      },
      choices: [
        { id: "a", text: "3/4 is the same as 3/8" },
        { id: "b", text: "3/4 is the same as 6/8" },
        { id: "c", text: "3/4 is the same as 7/8" },
        { id: "d", text: "3/4 cannot be written in eighths" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "3/4 = 6/8. Both fractions can now be measured in the same size piece.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Lever 4: Two claims are scratched into the castle wall. Only one of them holds up. Which should you trust?",
      evidenceA: {
        type: "passage",
        label: "CLAIM SCRATCHED HIGHER UP",
        text: "\"Eighths are cut from a bigger number than fourths, so 5/8 has to be greater than 3/4. Pull the left lever.\"",
        choiceLabel: "Trust this claim",
      },
      evidenceB: {
        type: "passage",
        label: "CLAIM SCRATCHED LOWER DOWN",
        text: "\"3/4 is the same as 6/8. Six eighth-pieces is more than five eighth-pieces, so 3/4 is greater. Pull the right lever.\"",
        choiceLabel: "Trust this claim",
      },
      correctSide: "B",
      evidenceLogEntry: "Once both are written in eighths, 6/8 beats 5/8. So 3/4 > 5/8, and the right lever is the one.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Lever 5: The first claim noticed something real — 8 is bigger than 4. So why does its conclusion fail?",
      evidence: {
        type: "data",
        label: "THE STRIPS, SIDE BY SIDE",
        text: "A whole cut into 8 pieces makes smaller pieces than the same whole cut into 4. One eighth is half the size of one fourth.",
      },
      choices: [
        { id: "a", text: "A larger denominator means the whole was cut into more pieces, so each piece is smaller" },
        { id: "b", text: "A larger denominator always means a larger fraction, so the claim was simply unlucky" },
        { id: "c", text: "The denominator has nothing at all to do with the size of a fraction" },
        { id: "d", text: "The claim used the wrong two fractions" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A bigger denominator cuts the whole into more and therefore smaller pieces. Bigger bottom number does not mean bigger fraction.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Lever: Write the comparison the way the castle wants it, with a symbol.",
      evidence: {
        type: "passage",
        label: "THE OPEN GATE",
        text: "The right lever moved. 3/4, which is 6/8, sits above 5/8 on the strip.",
      },
      choices: [
        { id: "a", text: "3/4 > 5/8, because 6/8 is more than 5/8" },
        { id: "b", text: "3/4 < 5/8, because 8 is greater than 4" },
        { id: "c", text: "3/4 = 5/8, because both are more than one half" },
        { id: "d", text: "5/8 > 3/4, because 5 is greater than 3" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "3/4 > 5/8. Fractions are compared by their value, not by the size of the denominator alone.",
    },
  ],

  finalResponsePrompt:
    "Leave a note on the wall so the next cadet does not repeat the mistake. Explain which lever opens the gate and how you know. Your answer should: (1) show how you compared 5/8 and 3/4 using a model or a benchmark, and (2) explain why a bigger denominator does not mean a bigger fraction.",

  responseStems: [
    "I compared 5/8 and 3/4 by ___.",
    "3/4 is the same as ___, so ___ is greater.",
    "A bigger denominator does not mean a bigger fraction because ___.",
  ],

  selfCheckQuestions: [
    "I said which fraction is greater and used a symbol to show it.",
    "I showed how I compared them, not just the answer.",
    "I renamed one fraction so both had the same size pieces, or used a benchmark.",
    "I explained what a bigger denominator actually does to the pieces.",
    "I said why the claim on the wall was wrong.",
  ],
};
