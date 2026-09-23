// Mission Map — "Unlock the Character Clue Door" — Grade 3 ELAR.
//
// From the library concept ELAR 3.1. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 3), per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **3.7C — "use text evidence to support an appropriate response."**
//
// Emily's call, made in advance (claude/MissionMap_MathELAR_Anchors_v1.md):
// grade 3 ELAR has NO character-traits student expectation, so the case is
// anchored to 3.7C, because what it actually grades is evidence selection. The
// trait is the claim; the graded skill is choosing clues that prove it.
//
// Two traps, two different kinds of wrong evidence. cp3's showdown is the
// library's own trap — a detail that happened (the rain) but proves nothing
// about Rosa. cp5 is harder: a detail ABOUT Rosa (she forgot her homework) that
// is still not evidence for THIS trait. A detail being about the character is
// not the same as a detail proving the claim.

export const PUBLIC_CASE = {
  standard: "3.13-MM",
  teksLabel:
    "TEKS 3.7C — Using Text Evidence to Support a Response (Texas Grade 3 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "ELAR",
  title: "Unlock the Character Clue Door",
  tagline: "The door only opens for clues that prove what a character is like.",

  mission: {
    briefText:
      "The Clue Door has a lock shaped like a key. Only true trait keys fit it. A trait key is a clue from the story that proves what a character is like. Read the story about Rosa. Collect the clues that fit. Leave the ones that do not.",
    goal: "Choose a trait for a character. Prove it with clues from the story, not just things that happened.",
  },

  mapImage: "/mission-map/3-13-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Door 1: Read the start of the story. Who is the main character?",
      evidence: {
        type: "passage",
        label: "STORY, PART 1",
        text: "It was a rainy Monday. Rosa got to class early. Her friend Ben rushed in late. \"I forgot my pencil box,\" he said. Rosa opened her bag right away.",
      },
      choices: [
        { id: "a", text: "Ben, because he talks first" },
        { id: "b", text: "Rosa, because the story follows what she does" },
        { id: "c", text: "The teacher, because the story is in a classroom" },
        { id: "d", text: "There is no main character yet" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Rosa is the main character. The story follows what she does.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Door 2: The lock asks for one trait. A trait tells what a person is like inside. Which one is a trait?",
      evidence: {
        type: "passage",
        label: "TRAIT CARDS",
        text: "The lock shows four cards. Only one card names what Rosa is like inside.",
      },
      choices: [
        { id: "a", text: "Tall" },
        { id: "b", text: "Early" },
        { id: "c", text: "Kind" },
        { id: "d", text: "Wet from the rain" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "My trait claim: Rosa is kind. A trait is what someone is like inside, not how they look.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 66 },
      prompt: "Door 3: Two cadets each picked a key to prove Rosa is kind. Which key fits the lock?",
      evidenceA: {
        type: "passage",
        label: "MILO'S KEY",
        text: "\"It was a rainy Monday.\"",
        choiceLabel: "Use Milo's key",
      },
      evidenceB: {
        type: "passage",
        label: "JUNE'S KEY",
        text: "\"She gave Ben two pencils and her best eraser.\"",
        choiceLabel: "Use June's key",
      },
      correctSide: "B",
      evidenceLogEntry: "Clue 1: Rosa gave Ben two pencils and her best eraser. That is what a kind person does. The rain happened, but it proves nothing about Rosa.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 34 },
      prompt: "Door 4: You need a second key. Read this part. Which clue also proves Rosa is kind?",
      evidence: {
        type: "passage",
        label: "STORY, PART 2",
        text: "At lunch, the room was loud. Rosa saw a new girl sitting alone. She picked up her tray and sat next to her. \"Want to trade cookies?\" Rosa asked with a smile.",
      },
      choices: [
        { id: "a", text: "The lunchroom was loud." },
        { id: "b", text: "Rosa had cookies in her lunch." },
        { id: "c", text: "Rosa sat with a new girl who was alone." },
        { id: "d", text: "The new girl had a tray." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Clue 2: Rosa sat with a new girl who was alone. She chose to help someone feel welcome.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Door 5: Quick check. A cadet says, \"Rosa forgot her homework. That proves she is kind.\" Does that key fit?",
      evidence: {
        type: "passage",
        label: "STORY, PART 3",
        text: "After lunch, Rosa looked in her bag. Her homework was not there. She had left it on the kitchen table.",
      },
      choices: [
        { id: "a", text: "Yes. It is about Rosa, so it proves she is kind." },
        { id: "b", text: "No. It happened to Rosa, but it does not show kindness." },
        { id: "c", text: "Yes. Kind people always forget things." },
        { id: "d", text: "No. Rosa never forgot anything in the story." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Forgetting homework is about Rosa, but it does not prove she is kind. A clue has to fit the trait.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Door: What makes a clue a real trait key?",
      evidence: {
        type: "passage",
        label: "THE TRAIT KEYS",
        text: "Rosa shared her pencils. Rosa sat with the new girl. Rosa said, \"Want to trade cookies?\"",
      },
      choices: [
        { id: "a", text: "A trait is proved by what a character says, does, or thinks." },
        { id: "b", text: "A trait is proved by the weather in the story." },
        { id: "c", text: "Any detail from the story proves any trait." },
        { id: "d", text: "A trait is proved by what a character looks like." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A trait is proved by what a character says, does, or thinks.",
    },
  ],

  finalResponsePrompt:
    "Explain what kind of person Rosa is. Your answer should: (1) name one trait and give two clues from the story, and (2) explain why the rainy day does not prove the trait.",

  responseStems: [
    "Rosa is ___.",
    "One clue is ___. This shows she is ___ because ___.",
    "Another clue is ___.",
    "The rainy day does not prove the trait because ___.",
  ],

  selfCheckQuestions: [
    "I named a trait, not a look or a feeling.",
    "I used two clues from the story.",
    "Each clue shows something Rosa said or did.",
    "I explained why the rainy day is not a trait key.",
    "I read my answer back, and it makes sense.",
  ],
};
