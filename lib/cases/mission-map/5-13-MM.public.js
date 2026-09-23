// Mission Map — "Inference Investigation" — Grade 5 ELAR.
//
// From the library concept ELAR 5.1. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 5), per rule 11: **5.6F — "make inferences and use evidence
// to support understanding."** Direct fit. The gates follow the library's
// order: what is the question actually asking, collect two text clues, combine
// them with background knowledge, reject a guess with no evidence, and state
// the inference.
//
// The trap (cp5 showdown) is the library's: a POSSIBLE explanation with no text
// behind it. "Marcus is getting sick" would explain shaking hands, which is
// what makes it a good trap — it is plausible, and the story simply never
// supports it. The correct side is the one that uses more of the evidence,
// including the worn notebook, which a student has to notice on their own.

export const PUBLIC_CASE = {
  standard: "5.13-MM",
  teksLabel:
    "TEKS 5.6F — Making Inferences with Evidence (Texas Grade 5 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "ELAR",
  title: "Inference Investigation",
  tagline: "The story never says how Marcus feels. The clues say it for him.",

  mission: {
    briefText:
      "The investigation board has one question pinned to the center: how does Marcus feel about today's robotics tryout? The story never tells you directly. Every clue you pin connects with a string. The board only unlocks when your strings lead to an answer the text can actually support.",
    goal: "Make an inference about a character by combining clues from the text with what you already know, and reject ideas the text does not support.",
  },

  mapImage: "/mission-map/5-13-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Board 1: Read the question pinned to the board. What kind of answer is it asking for?",
      evidence: {
        type: "passage",
        label: "THE QUESTION",
        text: "How does Marcus feel about today's robotics tryout? The author never names the feeling, so you will have to figure it out.",
      },
      choices: [
        { id: "a", text: "A fact the story states directly, word for word" },
        { id: "b", text: "An inference about Marcus's feelings, built from clues" },
        { id: "c", text: "An opinion about whether robotics is fun" },
        { id: "d", text: "A prediction about who wins the tryout" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The question asks for an inference about Marcus's feelings, because the story never names them.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Board 2: Pin your first clue. Which of Marcus's actions tells you the most about his feelings?",
      evidence: {
        type: "passage",
        label: "THE STORY, PART 1",
        text: "Marcus sat on the bench outside the robotics lab. He checked the clock above the door, then checked it again a minute later. His knee bounced up and down, and his hands shook as he unzipped his backpack.",
      },
      choices: [
        { id: "a", text: "He sat on a bench." },
        { id: "b", text: "He unzipped his backpack." },
        { id: "c", text: "He kept checking the clock while his knee bounced and his hands shook." },
        { id: "d", text: "There was a clock above the door." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Clue 1 (action): Marcus keeps checking the clock, his knee bounces, and his hands shake.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Board 3: Pin your second clue. What does Marcus's dialogue add?",
      evidence: {
        type: "passage",
        label: "THE STORY, PART 2",
        text: "His friend Dana sat down beside him. \"You okay?\" she asked. \"Totally fine,\" Marcus said, but his voice cracked in the middle of the word. He pulled out a notebook, its corners soft and bent from a month of daily practice notes.",
      },
      choices: [
        { id: "a", text: "He says he is fine, but his cracking voice suggests he is not." },
        { id: "b", text: "He really is totally fine, because he says so." },
        { id: "c", text: "He is angry at Dana for asking." },
        { id: "d", text: "His dialogue tells us nothing about his feelings." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Clue 2 (dialogue): Marcus says \"Totally fine,\" but his voice cracks. His words and his voice do not match.",
    },
    {
      id: "cp4",
      order: 4,
      type: "quickScan",
      position: { x: 58, y: 34 },
      prompt: "Board 4: Quick check. Combine the clues with what you already know. What do people usually feel when their hands shake and they insist they are fine?",
      evidence: {
        type: "passage",
        label: "BACKGROUND KNOWLEDGE",
        text: "Think about a time you, or someone you know, waited for something important to begin.",
      },
      choices: [
        { id: "a", text: "Bored" },
        { id: "b", text: "Nervous" },
        { id: "c", text: "Sleepy" },
        { id: "d", text: "Hungry" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Background knowledge: shaking hands and a forced \"I'm fine\" usually mean someone is nervous.",
    },
    {
      id: "cp5",
      order: 5,
      type: "showdown",
      position: { x: 74, y: 60 },
      prompt: "Board 5: Two investigators pinned their final inference. Only one is supported by the text. Whose string holds?",
      evidenceA: {
        type: "passage",
        label: "AVERY'S INFERENCE",
        text: "Marcus is getting sick. That is why his hands are shaking.",
        choiceLabel: "Avery's string holds",
      },
      evidenceB: {
        type: "passage",
        label: "JORDAN'S INFERENCE",
        text: "Marcus is nervous, but he cares a lot about making the team. His notebook is worn from a month of daily practice.",
        choiceLabel: "Jordan's string holds",
      },
      correctSide: "B",
      evidenceLogEntry: "Jordan's inference uses the clues, including the worn notebook. Avery's could be possible in real life, but nothing in the story mentions being sick.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Board: The board unlocks for an investigator who can say what an inference is.",
      evidence: {
        type: "passage",
        label: "THE STRINGS",
        text: "Action clue + dialogue clue + what you already know = a supported inference.",
      },
      choices: [
        { id: "a", text: "An inference is any guess that could be true." },
        { id: "b", text: "An inference combines clues from the text with what the reader already knows." },
        { id: "c", text: "An inference repeats exactly what the author wrote." },
        { id: "d", text: "An inference is the reader's opinion about the story." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "An inference combines text clues with what the reader already knows.",
    },
  ],

  finalResponsePrompt:
    "Write up your investigation. Your answer should: (1) state your inference about how Marcus feels and support it with at least two clues from the text, and (2) explain why \"Marcus is getting sick\" is not a supported inference, even though it could explain his shaking hands.",

  responseStems: [
    "I infer that Marcus feels ___.",
    "One clue is ___, which suggests ___.",
    "Another clue is ___.",
    "I know from my own experience that ___.",
    "\"Marcus is getting sick\" is not supported because ___.",
  ],

  selfCheckQuestions: [
    "I stated an inference, not just a fact from the story.",
    "I used at least two clues from the text.",
    "I explained how each clue supports my inference.",
    "I connected the clues to what I already know.",
    "I explained why a possible idea is not the same as a supported one.",
  ],
};
