// Mission Map — "Summary Lock Path" — Grade 4 ELAR.
//
// From the library concept ELAR 4.4. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 4), per rule 11: **4.7D — "retell, paraphrase, or summarize
// texts in ways that maintain meaning and logical order."** Direct fit, and the
// case tests both halves of that phrase: MEANING (keep key events, drop the
// small details and opinions that change or clutter it) and LOGICAL ORDER (cp2
// is a "sequence" checkpoint, items authored out of answer order).
//
// Two traps, the library's two: a minor detail (cp3) and an opinion that
// sounds like a summary sentence (cp4 showdown). The opinion trap is the
// harder one and gets the head-to-head.

export const PUBLIC_CASE = {
  standard: "4.17-MM",
  teksLabel:
    "TEKS 4.7D — Summarizing in Logical Order (Texas Grade 4 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "ELAR",
  title: "Summary Lock Path",
  tagline: "The summary box is small. Only the events that matter will fit.",

  mission: {
    briefText:
      "The Summary Lock is a small box with room for only a few sentences. Stuff it with tiny details or opinions and it overflows and jams. Read the story about Class 4B's garden. Choose what really matters, put it in order, and keep your own opinions out.",
    goal: "Summarize a story by keeping the key events in logical order and leaving out small details and opinions.",
  },

  mapImage: "/teacher/challenges/mission_map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Lock 1: Read the story. What is the central problem?",
      evidence: {
        type: "passage",
        label: "THE GARDEN STORY",
        text: "Class 4B planted lettuce in the school garden. Their watering cans were green and yellow. After a week, something was eating the lettuce every night. The class set up a camera and discovered rabbits. First they tried a scarecrow, but the rabbits ignored it. Then they built a short wire fence around the beds. The lettuce grew back, and in May the class served salad at the school lunch. It was the best class project ever.",
      },
      choices: [
        { id: "a", text: "The watering cans were the wrong color." },
        { id: "b", text: "Rabbits were eating the class's lettuce." },
        { id: "c", text: "The class did not like salad." },
        { id: "d", text: "The school lunch was too small." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Central problem: Rabbits were eating Class 4B's lettuce.",
    },
    {
      id: "cp2",
      order: 2,
      type: "sequence",
      position: { x: 26, y: 42 },
      prompt: "Lock 2: Put the key events in logical order. Tap them from first to last.",
      evidence: {
        type: "passage",
        label: "KEY EVENTS",
        text: "A summary keeps the most important events in the order they happened.",
      },
      items: [
        { id: "c", text: "The class builds a wire fence around the beds." },
        { id: "a", text: "The class plants lettuce in the school garden." },
        { id: "d", text: "The class serves salad at the school lunch." },
        { id: "b", text: "A camera shows that rabbits are eating the lettuce." },
      ],
      correctOrder: ["a", "b", "c", "d"],
      evidenceLogEntry: "Order: They plant lettuce. Rabbits eat it. They build a fence. They serve salad.",
    },
    {
      id: "cp3",
      order: 3,
      type: "quickScan",
      position: { x: 42, y: 66 },
      prompt: "Lock 3: Quick check. Which detail is too small to go in the summary?",
      evidence: {
        type: "passage",
        label: "DETAIL CHECK",
        text: "Ask: if I left this out, would a reader still understand the story?",
      },
      choices: [
        { id: "a", text: "Rabbits were eating the lettuce." },
        { id: "b", text: "The watering cans were green and yellow." },
        { id: "c", text: "The class built a fence." },
        { id: "d", text: "The lettuce grew back." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The watering can colors are a small detail. The story makes sense without them.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Lock 4: Two cadets wrote an ending sentence for the summary. Only one keeps the summary fair. Whose sentence fits in the box?",
      evidenceA: {
        type: "passage",
        label: "ZOE'S SENTENCE",
        text: "It was the best class project ever, and everyone should do one.",
        choiceLabel: "Zoe's sentence fits",
      },
      evidenceB: {
        type: "passage",
        label: "NICO'S SENTENCE",
        text: "The lettuce grew back, and the class served salad at the school lunch.",
        choiceLabel: "Nico's sentence fits",
      },
      correctSide: "B",
      evidenceLogEntry: "Nico's sentence tells how the story ended. Zoe's is an opinion. It sounds like an ending, but a summary leaves opinions out.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 60 },
      prompt: "Lock 5: The scarecrow part happened. Should it go in a short summary?",
      evidence: {
        type: "passage",
        label: "THE SCARECROW",
        text: "First they tried a scarecrow, but the rabbits ignored it.",
      },
      choices: [
        { id: "a", text: "Yes, because every event must go in a summary." },
        { id: "b", text: "It can be left out of a short summary, because the fence is what solved the problem." },
        { id: "c", text: "Yes, because scarecrows are interesting." },
        { id: "d", text: "No, because it never happened." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "A short summary can skip an attempt that did not work. The fence is the event that solved the problem.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Lock: The box locks shut for the strongest summary. Which one is it?",
      evidence: {
        type: "passage",
        label: "THE SUMMARY BOX",
        text: "Room for two sentences. Key events only. In order. No opinions.",
      },
      choices: [
        { id: "a", text: "Class 4B planted lettuce, but rabbits kept eating it. They built a fence, the lettuce grew back, and they served salad at lunch." },
        { id: "b", text: "Class 4B had green and yellow watering cans. It was the best project ever." },
        { id: "c", text: "They served salad at lunch. Then they planted lettuce, and rabbits came." },
        { id: "d", text: "Rabbits are cute, but they should not eat lettuce." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A strong summary keeps the key events in order and leaves out small details and opinions.",
    },
  ],

  finalResponsePrompt:
    "Write your own two-sentence summary of the garden story. Then explain your choices. Your answer should: (1) give the key events in logical order, and (2) explain why you left out the watering cans and the sentence \"It was the best class project ever.\"",

  responseStems: [
    "Class 4B ___, but ___.",
    "They ___, so ___.",
    "I left out the watering cans because ___.",
    "I left out \"the best class project ever\" because ___.",
  ],

  selfCheckQuestions: [
    "My summary has the problem and how it was solved.",
    "My events are in the order they happened.",
    "I left out small details.",
    "I left out opinions.",
    "I used my own words.",
  ],
};
