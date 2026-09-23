// Mission Map — "Author's Purpose Control Room" — Grade 5 ELAR.
//
// From the library concept ELAR 5.4. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 5), per rule 11: **5.10A — "explain the author's purpose and
// message within a text."** Direct fit. The case goes from topic, to purpose
// (what the author wants readers to DO), to the specific choices that serve it
// — a loaded word, a statistic, a neutral sentence that does little work.
//
// The library's evidence clues are used exactly: headline, loaded word,
// fact/statistic, neutral sentence. The trap is the library's "because it is
// interesting" (cp5 showdown).
//
// The statistic is real and stated conservatively: a 2016 world atlas of
// artificial night-sky brightness (Falchi et al.) estimated that nearly 80
// percent of North Americans cannot see the Milky Way from where they live.
// The town and its council are fictional.

export const PUBLIC_CASE = {
  standard: "5.16-MM",
  teksLabel:
    "TEKS 5.10A — Author's Purpose & Message (Texas Grade 5 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "ELAR",
  title: "Author's Purpose Control Room",
  tagline: "Every word in an argument is a switch. Figure out what each one is wired to do.",

  mission: {
    briefText:
      "The control room runs on one opinion article from a town newspaper. The purpose meter on the wall is stuck at zero. It only climbs when you can identify what the author wants readers to think, feel, or do. You must also find the choices in the writing that make that happen. Watch out for the easy answer that a detail is there just because it is interesting.",
    goal: "Identify an author's purpose and message, and explain how specific word choices and facts help achieve that purpose.",
  },

  mapImage: "/mission-map/5-16-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Switch 1: Read the headline and the first paragraph. What is the topic?",
      evidence: {
        type: "passage",
        label: "THE ARTICLE",
        text: "Give Us Back Our Stars. Every night in Cedar Falls, bright streetlights blaze until sunrise. Bright lights have stolen the stars from our children. Scientists estimate that nearly 80 percent of people in North America cannot see the Milky Way from where they live. The town council meets on the first Tuesday of each month. Please come to the next meeting and ask the council to dim our streetlights after midnight.",
      },
      choices: [
        { id: "a", text: "How streetlights are built" },
        { id: "b", text: "Losing the view of the night sky because of bright town lights" },
        { id: "c", text: "The history of Cedar Falls" },
        { id: "d", text: "Why children should go to bed early" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Topic: bright town lights are hiding the night sky.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Switch 2: What does the author most want readers to DO?",
      evidence: {
        type: "passage",
        label: "THE LAST LINE",
        text: "\"Please come to the next meeting and ask the council to dim our streetlights after midnight.\"",
      },
      choices: [
        { id: "a", text: "Buy a telescope" },
        { id: "b", text: "Learn the names of the stars" },
        { id: "c", text: "Go to the council meeting and ask for dimmer streetlights" },
        { id: "d", text: "Stay indoors after dark" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Purpose: to persuade readers to ask the council to dim the streetlights after midnight.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Switch 3: Find a word choice that pushes readers to FEEL something. Which one is it?",
      evidence: {
        type: "passage",
        label: "WORD SCAN",
        text: "\"Bright lights have stolen the stars from our children.\"",
      },
      choices: [
        { id: "a", text: "\"stolen,\" because it makes the lights sound like a thief taking something that belongs to kids" },
        { id: "b", text: "\"bright,\" because it describes the color of the lights" },
        { id: "c", text: "\"the,\" because it appears often" },
        { id: "d", text: "\"children,\" because it is a long word" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The loaded word \"stolen\" makes readers feel something unfair has been taken from children.",
    },
    {
      id: "cp4",
      order: 4,
      type: "quickScan",
      position: { x: 58, y: 34 },
      prompt: "Switch 4: Quick check. How does the 80 percent statistic help the author's purpose?",
      evidence: {
        type: "passage",
        label: "THE STATISTIC",
        text: "\"Scientists estimate that nearly 80 percent of people in North America cannot see the Milky Way from where they live.\"",
      },
      choices: [
        { id: "a", text: "It shows the problem is big and real, so action feels necessary." },
        { id: "b", text: "It teaches readers how to find the Milky Way." },
        { id: "c", text: "It proves that Cedar Falls has the brightest lights anywhere." },
        { id: "d", text: "It has nothing to do with the purpose." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The statistic shows the problem is big and backed by scientists, which makes the request feel important.",
    },
    {
      id: "cp5",
      order: 5,
      type: "showdown",
      position: { x: 74, y: 60 },
      prompt: "Switch 5: Two cadets explain why the author included the Milky Way statistic. Whose explanation moves the purpose meter?",
      evidenceA: {
        type: "passage",
        label: "GIDEON'S EXPLANATION",
        text: "The author included it because it is an interesting fact about space.",
        choiceLabel: "Gideon's explanation",
      },
      evidenceB: {
        type: "passage",
        label: "ROSALIND'S EXPLANATION",
        text: "The author included it to show how much night sky people have already lost. That makes the call to dim the lights feel urgent.",
        choiceLabel: "Rosalind's explanation",
      },
      correctSide: "B",
      evidenceLogEntry: "Rosalind connects the fact to the purpose. \"It is interesting\" never explains why an author chose a detail.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Switch: One sentence does the least work for the purpose. Which is it, and what does that show about how authors write?",
      evidence: {
        type: "passage",
        label: "LOW-POWER SENTENCE",
        text: "Three sentences push readers toward action. One mostly gives information.",
      },
      choices: [
        { id: "a", text: "\"The town council meets on the first Tuesday of each month.\" It gives needed information, but the persuasion comes from word choice and facts chosen for effect." },
        { id: "b", text: "\"Bright lights have stolen the stars from our children.\" It is the weakest because it is short." },
        { id: "c", text: "\"Give Us Back Our Stars.\" Headlines never matter." },
        { id: "d", text: "Every sentence does exactly the same amount of work." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The meeting-date sentence is neutral information. Authors choose words and facts on purpose to move readers toward their goal.",
    },
  ],

  finalResponsePrompt:
    "Write a report for the control room. Your answer should: (1) state the author's purpose and message, (2) explain how two specific choices, such as the word \"stolen\" and the 80 percent statistic, help achieve that purpose, and (3) explain why \"because it is interesting\" is not a good explanation for why an author includes a detail.",

  responseStems: [
    "The author's purpose is to ___.",
    "The author's message is that ___.",
    "The word \"stolen\" helps because ___.",
    "The statistic helps because ___.",
    "\"Because it is interesting\" is not enough because ___.",
  ],

  selfCheckQuestions: [
    "I stated what the author wants readers to think, feel, or do.",
    "I explained two specific choices from the article.",
    "I connected each choice to the purpose.",
    "I explained why \"it is interesting\" is not a real reason.",
    "I used quotes from the article.",
  ],
};
