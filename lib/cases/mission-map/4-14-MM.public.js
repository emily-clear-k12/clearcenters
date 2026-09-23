// Mission Map — "Theme Vault" — Grade 4 ELAR.
//
// From the library concept ELAR 4.1. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 4), per rule 11: **4.8A — "infer basic themes supported by
// text evidence."** Direct fit. Theme is never stated in the story; the
// student infers it from how Theo changes, and every step of the vault
// collects the evidence the inference rests on — beginning, turning point,
// ending — in the library's own order.
//
// The trap (cp4 showdown) is the library's: a "theme" that is really a plot
// summary. It is the most common grade 4 theme error, so it sits as a head-to-
// head comparison against a real theme statement rather than as one wrong
// choice among four.
//
// Also covered by Signal Check (ELA.4.8A) — noted in the anchor doc as depth
// on the standard, not a conflict.

export const PUBLIC_CASE = {
  standard: "4.14-MM",
  teksLabel:
    "TEKS 4.8A — Inferring Themes with Text Evidence (Texas Grade 4 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "ELAR",
  title: "Theme Vault",
  tagline: "The vault dial turns from plot to theme. Retelling the story will not open it.",

  mission: {
    briefText:
      "The Theme Vault guards a story about Theo and a science fair robot. Its dial has two ends: PLOT and THEME. Each piece of evidence you collect turns the dial a little further. The vault opens only when you can name the lesson the story teaches, not just what happened.",
    goal: "Infer a theme from how a character changes. Support it with evidence from the beginning, turning point, and ending.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Dial 1: Read the beginning of the story. What is Theo's problem?",
      evidence: {
        type: "passage",
        label: "THE BEGINNING",
        text: "Theo wanted to build the best robot at the science fair, and he wanted to build it alone. When his sister Mia offered to help, he pushed her hand away. \"I don't need anybody,\" he said. That week, his robot's wheel fell off three times.",
      },
      choices: [
        { id: "a", text: "He wants to do everything alone, but his robot keeps breaking." },
        { id: "b", text: "He does not like science." },
        { id: "c", text: "His sister broke his robot." },
        { id: "d", text: "The science fair was canceled." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Problem: Theo refuses all help, and his robot keeps falling apart.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Dial 2: Collect beginning evidence. Which detail best shows how Theo acts at the start?",
      evidence: {
        type: "passage",
        label: "EVIDENCE CARDS",
        text: "The vault wants evidence that shows who Theo is BEFORE he changes.",
      },
      choices: [
        { id: "a", text: "The science fair was in the gym." },
        { id: "b", text: "Theo pushed Mia's hand away and said, \"I don't need anybody.\"" },
        { id: "c", text: "The robot had four wheels." },
        { id: "d", text: "Mia is Theo's sister." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Beginning: Theo pushes Mia away and says, \"I don't need anybody.\"",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Dial 3: Read the middle of the story. Which moment is the turning point for Theo?",
      evidence: {
        type: "passage",
        label: "THE MIDDLE",
        text: "The night before the fair, the wheel fell off again. Theo sat on the floor, ready to quit. Mia quietly showed him how she had fixed her bike wheel with a tiny washer. Theo tried it, and the wheel held. \"I guess two heads really are better than one,\" he said.",
      },
      choices: [
        { id: "a", text: "The wheel falls off again." },
        { id: "b", text: "Theo sits on the floor." },
        { id: "c", text: "Theo lets Mia help and says two heads are better than one." },
        { id: "d", text: "Mia has a bike." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Turning point: Theo accepts Mia's help and says, \"Two heads really are better than one.\"",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Dial 4: Two cadets typed a theme into the vault. Only one is a real theme. Which one turns the dial to THEME?",
      evidenceA: {
        type: "passage",
        label: "RIVER'S THEME",
        text: "Theo builds a robot and takes it to the science fair.",
        choiceLabel: "River's is the theme",
      },
      evidenceB: {
        type: "passage",
        label: "SAGE'S THEME",
        text: "Accepting help from others can make a hard job possible.",
        choiceLabel: "Sage's is the theme",
      },
      correctSide: "B",
      evidenceLogEntry: "A theme is a lesson about life. River's sentence only retells the plot. Sage's is a lesson the story teaches.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Dial 5: Quick check. Read the ending. Which choice shows what Theo learned?",
      evidence: {
        type: "passage",
        label: "THE ENDING",
        text: "At the fair, a new student named Sam stood alone by his table. His model volcano would not erupt. Theo walked over. \"Want some help? I know how that feels,\" he said.",
      },
      choices: [
        { id: "a", text: "Theo offers to help Sam." },
        { id: "b", text: "Sam's volcano will not erupt." },
        { id: "c", text: "The fair has many tables." },
        { id: "d", text: "Sam is new at school." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Ending: Theo now offers help to someone else. He changed from refusing help to giving it.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Dial: The vault opens for a cadet who can say what a theme is.",
      evidence: {
        type: "passage",
        label: "THE DIAL",
        text: "Beginning: \"I don't need anybody.\" Turning point: \"Two heads really are better than one.\" Ending: \"Want some help?\"",
      },
      choices: [
        { id: "a", text: "A theme is a lesson or message shown by how a character changes." },
        { id: "b", text: "A theme is a short retelling of what happened." },
        { id: "c", text: "A theme is the title of the story." },
        { id: "d", text: "A theme is the setting of the story." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A theme is a lesson or message, shown by what a character learns or how they change.",
    },
  ],

  finalResponsePrompt:
    "Write the vault's final code. Your answer should: (1) state a theme of the story and support it with evidence from the beginning, the turning point, and the ending, and (2) explain why \"Theo builds a robot and takes it to the science fair\" is not a theme.",

  responseStems: [
    "One theme of the story is ___.",
    "At the beginning, Theo ___.",
    "At the turning point, ___.",
    "By the end, Theo ___, which shows he learned ___.",
    "That sentence is not a theme because ___.",
  ],

  selfCheckQuestions: [
    "I wrote the theme as a lesson about life, not about Theo only.",
    "I used evidence from the beginning, the turning point, and the ending.",
    "I explained how Theo changed.",
    "I explained why a plot summary is not a theme.",
    "My evidence matches the theme I wrote.",
  ],
};
