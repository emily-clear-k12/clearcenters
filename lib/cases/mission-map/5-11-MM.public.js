// Mission Map — "Graph Scale Escape" — Grade 5 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.7), per rule 11:
// **5.9C — "solve one- and two-step problems using data from a frequency
// table, dot plot, bar graph, stem-and-leaf plot, or scatterplot."**
//
// The case uses a STEM-AND-LEAF PLOT on purpose. 5.9C names it, grade 5 is
// where it appears, and it keeps this case from repeating the scaled bar
// graph that `3.12-MM` already uses — the two cases would otherwise teach
// the same reading move at two grade levels.
//
// The question is genuinely two-step, as 5.9C allows: count one group, count
// the whole set, then compare. The library's trap — treating the tallest row
// as a majority — only bites on a two-step question, which is why the case
// asks about "more than half" rather than "which is most common."

export const PUBLIC_CASE = {
  standard: "5.11-MM",
  teksLabel:
    "TEKS 5.9C — Solving Problems from a Stem-and-Leaf Plot & Other Data Displays (Texas Grade 5 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Math",
  title: "Graph Scale Escape",
  tagline: "The tallest row is not a majority. The data room stays locked until someone proves it.",

  mission: {
    briefText:
      "The data room at Ellery Station logs every qualifying score from the cadet field exam. A notice posted on the door claims that most of the class scored in the eighties. The room will not unlock while an unverified claim hangs on it. The plot is on the wall. Check the claim against it.",
    goal: "Interpret a stem-and-leaf plot and use its counts to evaluate a claim about the data. Explain why the largest single group does not automatically constitute a majority.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Room 1: Before anything else — what does a single row of this plot mean?",
      evidence: {
        type: "data",
        label: "FIELD EXAM SCORES — STEM AND LEAF",
        text: "6 | 2 8        7 | 0 5 5 9        8 | 1 3 4 4 6        9 | 0 2        Key: 8 | 1 means a score of 81.",
      },
      choices: [
        { id: "a", text: "The stem is the tens digit and each leaf is a ones digit, so the row 6 | 2 8 means two scores: 62 and 68" },
        { id: "b", text: "The row 6 | 2 8 means one score of 628" },
        { id: "c", text: "The stem counts how many cadets scored, and the leaves are their names" },
        { id: "d", text: "The row 6 | 2 8 means the scores went from 6 up to 28" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Each leaf is one score. The row 6 | 2 8 holds two scores, 62 and 68.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Room 2: How many cadets scored in the eighties?",
      evidence: {
        type: "data",
        label: "THE EIGHTIES ROW",
        text: "8 | 1 3 4 4 6. Two cadets scored 84; the plot records each score separately.",
      },
      choices: [
        { id: "a", text: "4, because 84 appears twice and should only be counted once" },
        { id: "b", text: "5, because there are five leaves in the row" },
        { id: "c", text: "8, because that is the stem" },
        { id: "d", text: "16, because the leaves add to 18 minus the repeat" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Five leaves means five cadets scored in the eighties: 81, 83, 84, 84 and 86.",
    },
    {
      id: "cp3",
      order: 3,
      type: "quickScan",
      position: { x: 42, y: 66 },
      prompt: "Room 3: Quick check — how many cadets took the exam in all?",
      evidence: {
        type: "data",
        label: "EVERY ROW",
        text: "6 | 2 8  (two leaves).  7 | 0 5 5 9  (four leaves).  8 | 1 3 4 4 6  (five leaves).  9 | 0 2  (two leaves).",
      },
      choices: [
        { id: "a", text: "4 cadets, one for each row" },
        { id: "b", text: "11 cadets" },
        { id: "c", text: "13 cadets" },
        { id: "d", text: "30 cadets, because the stems add to 30" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "2 + 4 + 5 + 2 = 13 cadets took the exam.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Room 4: Two cadets have tested the notice on the door. Which test holds up?",
      evidenceA: {
        type: "passage",
        label: "TEST TAPED TO THE NOTICE",
        text: "\"The eighties row is the longest row on the plot. No other score range has as many cadets in it. So most of the class scored in the eighties, and the notice is correct.\"",
        choiceLabel: "Trust this test",
      },
      evidenceB: {
        type: "passage",
        label: "TEST SLID UNDER THE DOOR",
        text: "\"Five of the 13 cadets scored in the eighties. Half of 13 is 6.5, and 5 is less than that, so fewer than half the class scored in the eighties. The notice is wrong.\"",
        choiceLabel: "Trust this test",
      },
      correctSide: "B",
      evidenceLogEntry: "Five of thirteen falls short of half. The eighties row is the largest single group without ever amounting to a majority.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Room 5: The first test was right that the eighties row is the longest. Why does that not settle the claim?",
      evidence: {
        type: "data",
        label: "THE FOUR GROUPS",
        text: "Sixties: 2.  Seventies: 4.  Eighties: 5.  Nineties: 2.  The other three groups together hold 8 cadets.",
      },
      choices: [
        { id: "a", text: "Being the largest group only beats each other group one at a time; a majority has to beat all of them combined" },
        { id: "b", text: "The longest row is never the largest group" },
        { id: "c", text: "The claim would be right if the plot had fewer rows" },
        { id: "d", text: "Stem-and-leaf plots cannot be used to test claims about groups" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The eighties outnumber every other group individually. Yet those five cadets are outnumbered by the eight remaining, which is why largest and most are not interchangeable.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Room: Write the rule the data room is waiting for.",
      evidence: {
        type: "passage",
        label: "THE CORRECTED NOTICE",
        text: "Five of 13 cadets scored in the eighties — the largest single group, and fewer than half the class.",
      },
      choices: [
        { id: "a", text: "Test a claim against the actual counts in the data, not against how a display looks" },
        { id: "b", text: "The tallest row on any plot answers any question about the data" },
        { id: "c", text: "A claim about data is true if nobody has disproved it yet" },
        { id: "d", text: "Counts only matter when the groups are the same size" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A claim has to be tested against the counts the data actually supplies, rather than against the shape a particular display happens to take.",
    },
  ],

  finalResponsePrompt:
    "Write the correction that replaces the notice on the door. Your answer should: (1) say whether the claim is true and show the counts you used, and (2) explain the difference between the largest group and more than half.",

  responseStems: [
    "___ of the ___ cadets scored in the eighties.",
    "The claim is ___ because ___.",
    "The largest group is not the same as more than half because ___.",
  ],

  selfCheckQuestions: [
    "I said how many cadets scored in the eighties.",
    "I said how many cadets took the exam in all.",
    "I compared those two numbers to decide about the claim.",
    "I said clearly whether the notice was right or wrong.",
    "I explained why the longest row did not settle it.",
  ],
};
