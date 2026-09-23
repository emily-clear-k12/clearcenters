// Mission Map — "Argument Aim Quest" — Grade 4 ELAR.
//
// From the library concept ELAR 4.3. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 4), per rule 11: **4.9E — "recognize characteristics and
// structures of argumentative text by: (i) identifying the claim; (ii)
// explaining how the author has used facts for an argument; and (iii)
// identifying the intended audience or reader."**
//
// The best fit of all twelve ELAR anchors. The checkpoints walk 4.9E's sub-parts
// in order: cp1 is (i), cp2 is (iii), cp3-cp5 are (ii). Sub-part (iii) is the
// reason this concept lives at grade 4 at all.
//
// The trap is the library's: a TRUE fact that simply does not matter to the
// audience the letter is written for. cp5 ("switch the audience") is the
// library's Push Angle, used as a checkpoint so a student has to re-aim
// evidence rather than just reject it.
//
// All in-story facts (the office referrals, the survey) are events inside the
// case's fictional school, not claims about the real world.

export const PUBLIC_CASE = {
  standard: "4.16-MM",
  teksLabel:
    "TEKS 4.9E — Argument: Claim, Facts & Intended Audience (Texas Grade 4 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "ELAR",
  title: "Argument Aim Quest",
  tagline: "A true fact can still miss its target. Aim your evidence at the reader.",

  mission: {
    briefText:
      "Class 4B wrote a letter asking for a longer recess. Before it can be sent, it has to pass the Aim Station. Each fact in the letter is an arrow. It only hits if it matters to the person reading the letter. Find the claim, find the reader, and aim the evidence.",
    goal: "Identify the claim and the intended audience of an argument. Explain which facts will persuade that audience and why.",
  },

  mapImage: "/mission-map/4-16-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Target 1: Read the first lines of the letter. What is the claim?",
      evidence: {
        type: "passage",
        label: "THE LETTER",
        text: "Dear Principal Ortiz, Our school should make afternoon recess fifteen minutes longer. We believe this change would help our whole school.",
      },
      choices: [
        { id: "a", text: "Recess is fun." },
        { id: "b", text: "Our school should make afternoon recess fifteen minutes longer." },
        { id: "c", text: "Principal Ortiz is in charge of the school." },
        { id: "d", text: "Class 4B likes to write letters." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Claim: Afternoon recess should be fifteen minutes longer.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Target 2: Who is the intended audience for this letter?",
      evidence: {
        type: "passage",
        label: "CLUE",
        text: "Look at who the letter is addressed to. That person can decide whether recess gets longer.",
      },
      choices: [
        { id: "a", text: "The students in Class 4B" },
        { id: "b", text: "Parents at home" },
        { id: "c", text: "Principal Ortiz" },
        { id: "d", text: "Anyone who likes recess" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Audience: Principal Ortiz, the person who can make the decision.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Target 3: A principal cares about learning and safe behavior. Which fact is aimed at Principal Ortiz?",
      evidence: {
        type: "passage",
        label: "FACT CARDS",
        text: "Last month, the school tried longer recess for two weeks. Class 4B collected facts about what happened.",
      },
      choices: [
        { id: "a", text: "During the two weeks, fewer students were sent to the office in the afternoon." },
        { id: "b", text: "The playground has three new swings." },
        { id: "c", text: "Most students said recess is their favorite time of day." },
        { id: "d", text: "The recess bell is very loud." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Aimed fact: During the trial, fewer students were sent to the office in the afternoon. A principal cares about that.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Target 4: Two cadets each want one more fact in the letter. Both facts are true. Which arrow hits the principal?",
      evidenceA: {
        type: "passage",
        label: "JAY'S ARROW",
        text: "Longer recess would give kids more time to trade snack cards.",
        choiceLabel: "Jay's arrow hits",
      },
      evidenceB: {
        type: "passage",
        label: "MIRA'S ARROW",
        text: "Teachers said students focused better on afternoon lessons during the trial.",
        choiceLabel: "Mira's arrow hits",
      },
      correctSide: "B",
      evidenceLogEntry: "Better focus in afternoon lessons hits the target. Trading snack cards is true, but a principal would not be persuaded by it.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Target 5: Quick check. Class 4B wants to send a new letter to parents. Which fact should they aim at parents?",
      evidence: {
        type: "passage",
        label: "NEW AUDIENCE",
        text: "Parents care about their children being healthy and happy.",
      },
      choices: [
        { id: "a", text: "Kids got more exercise and came home in a better mood." },
        { id: "b", text: "Fewer students were sent to the principal's office." },
        { id: "c", text: "The recess bell is very loud." },
        { id: "d", text: "The school has a new principal." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "For parents, aim at health and happiness: more exercise and a better mood.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Target: The letter is sent when you can say what makes evidence persuasive.",
      evidence: {
        type: "passage",
        label: "AIM STATION",
        text: "The same claim needed different facts for the principal and for parents.",
      },
      choices: [
        { id: "a", text: "Any true fact will persuade any reader." },
        { id: "b", text: "Evidence persuades when it connects to what the audience cares about." },
        { id: "c", text: "The longest fact is always the most persuasive." },
        { id: "d", text: "Evidence only matters if the writer likes it." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Evidence persuades when it connects to what the audience cares about.",
    },
  ],

  finalResponsePrompt:
    "Write the last paragraph of the letter to Principal Ortiz. Your answer should: (1) state the claim and use a fact that matters to a principal, and (2) explain why the snack-card fact would not persuade her even though it is true.",

  responseStems: [
    "Our claim is that ___.",
    "One reason you should agree is that ___.",
    "This matters to a principal because ___.",
    "The snack-card fact would not work because ___.",
  ],

  selfCheckQuestions: [
    "I stated the claim clearly.",
    "I used a fact from the trial that a principal cares about.",
    "I explained why that fact matters to her.",
    "I explained why a true fact can still be the wrong fact.",
    "I wrote to the principal, not to other kids.",
  ],
};
