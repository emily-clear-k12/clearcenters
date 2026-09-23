// Mission Map — "Paired Text Portal" — Grade 5 ELAR.
//
// From the library concept ELAR 5.2. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 5), per rule 11: **5.7B — "write responses that demonstrate
// understanding of texts, including comparing and contrasting ideas across a
// variety of sources."** Direct fit on "comparing and contrasting ideas across
// ... sources": two texts in two genres (an informational article and a short
// narrative) on one shared topic. And because 5.7B is a WRITING-in-response
// standard, the written final response carries the weight of this case more
// than usual, and its rubric asks for a real contrast, not two summaries.
//
// The trap is the library's: "same topic means same message." cp5 is the
// library's Push Angle — which text better supports a specific claim — used as
// a checkpoint.
//
// The reef facts in Text 1 are general and accurate: reefs are built by coral
// polyps, and water that stays too warm can cause bleaching. The narrative in
// Text 2 is original.

export const PUBLIC_CASE = {
  standard: "5.14-MM",
  teksLabel:
    "TEKS 5.7B — Comparing & Contrasting Ideas Across Texts (Texas Grade 5 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "ELAR",
  title: "Paired Text Portal",
  tagline: "Two texts, one topic, two different messages. The bridge appears when you can tell them apart.",

  mission: {
    briefText:
      "Two portals glow side by side. Each one holds a different text about the same subject: coral reefs. A cadet before you decided the texts say exactly the same thing, and the bridge between the portals never appeared. Read both carefully. The bridge only forms when you can explain how they are alike and how they are different.",
    goal: "Compare and contrast how two texts treat the same topic, including their different key ideas and purposes.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Portal 1: Skim both texts. What topic do they share?",
      evidence: {
        type: "passage",
        label: "TWO TITLES",
        text: "Text 1 is an article called \"Reefs Under Pressure.\" Text 2 is a short story called \"My First Look Beneath the Waves.\" Both describe coral reefs.",
      },
      choices: [
        { id: "a", text: "Coral reefs" },
        { id: "b", text: "Learning to swim" },
        { id: "c", text: "Fishing boats" },
        { id: "d", text: "Deep-sea volcanoes" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Shared topic: coral reefs.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Portal 2: Read Text 1. What is its key idea?",
      evidence: {
        type: "passage",
        label: "TEXT 1 — REEFS UNDER PRESSURE",
        text: "Coral reefs are built over hundreds of years by tiny animals called coral polyps. Reefs give shelter to thousands of kinds of fish. But reefs are fragile. When ocean water stays too warm for too long, corals can turn white and may die. Scientists say protecting reefs will take careful action from people around the world.",
      },
      choices: [
        { id: "a", text: "Coral reefs are fragile and need protection." },
        { id: "b", text: "Coral reefs are the best place to go on vacation." },
        { id: "c", text: "Fish are more important than coral." },
        { id: "d", text: "Coral reefs are made of rock that never changes." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Text 1's key idea: coral reefs are fragile and need people to protect them.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Portal 3: Read Text 2. What is its key idea?",
      evidence: {
        type: "passage",
        label: "TEXT 2 — MY FIRST LOOK BENEATH THE WAVES",
        text: "I pressed my mask to my face and slipped under. Suddenly the world exploded with color. Orange fish flickered through purple fans of coral, and a sea turtle drifted past like it owned the place. I forgot I was breathing through a tube. When I finally came up, I could not stop grinning.",
      },
      choices: [
        { id: "a", text: "Snorkeling equipment is uncomfortable." },
        { id: "b", text: "Seeing a reef for the first time can fill a person with wonder." },
        { id: "c", text: "Sea turtles are dangerous." },
        { id: "d", text: "Reefs are dying quickly." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Text 2's key idea: seeing a reef for the first time can fill a person with wonder.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Portal 4: Two cadets each describe how the texts compare. Whose comparison makes the bridge appear?",
      evidenceA: {
        type: "passage",
        label: "LUCA'S COMPARISON",
        text: "Both texts say the same thing, because they are both about coral reefs.",
        choiceLabel: "Luca's comparison works",
      },
      evidenceB: {
        type: "passage",
        label: "HANA'S COMPARISON",
        text: "Both texts are about coral reefs, but the article warns that reefs are in danger, while the story shares the wonder of seeing one.",
        choiceLabel: "Hana's comparison works",
      },
      correctSide: "B",
      evidenceLogEntry: "Same topic does not mean same message. The article informs and warns; the story shares a feeling of wonder.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Portal 5: Quick check. A classmate claims, \"Warm water can harm coral reefs.\" Which text supports that claim better?",
      evidence: {
        type: "passage",
        label: "CLAIM CHECK",
        text: "Look for the text that gives information about what harms reefs.",
      },
      choices: [
        { id: "a", text: "Text 1, because it explains that corals can turn white and die when water stays too warm" },
        { id: "b", text: "Text 2, because the narrator swims in the ocean" },
        { id: "c", text: "Both texts support it equally." },
        { id: "d", text: "Neither text mentions anything about reefs." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Text 1 supports the claim about warm water. Text 2 never mentions it.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Portal: The bridge opens for a cadet who can state the rule for comparing texts.",
      evidence: {
        type: "passage",
        label: "THE BRIDGE",
        text: "One topic. One text informs and warns. One text shares an experience and a feeling.",
      },
      choices: [
        { id: "a", text: "Texts on the same topic always share the same message." },
        { id: "b", text: "Texts can share a topic but develop different ideas, moods, or purposes." },
        { id: "c", text: "Only informational texts have key ideas." },
        { id: "d", text: "A story cannot be compared with an article." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Texts can share a topic but develop different ideas, moods, or purposes.",
    },
  ],

  finalResponsePrompt:
    "Write a response comparing the two texts. Your answer should: (1) explain one way the texts are alike and one important way they are different, using evidence from each, and (2) explain why sharing a topic does not mean sharing a message.",

  responseStems: [
    "Both texts are about ___.",
    "Text 1 mainly ___, for example ___.",
    "Text 2 mainly ___, for example ___.",
    "Sharing a topic is not the same as sharing a message because ___.",
  ],

  selfCheckQuestions: [
    "I named what the texts have in common.",
    "I named an important difference.",
    "I used evidence from BOTH texts.",
    "I explained each text's key idea, not just its details.",
    "I explained why same topic does not mean same message.",
  ],
};
