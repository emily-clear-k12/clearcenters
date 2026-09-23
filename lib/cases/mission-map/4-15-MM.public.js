// Mission Map — "Author's Choice Labyrinth" — Grade 4 ELAR.
//
// From the library concept ELAR 4.2. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 4), per rule 11: **4.10A — "explain the author's purpose and
// message within a text."**
//
// Emily's call, made in advance (claude/MissionMap_MathELAR_Anchors_v1.md):
// grade 4's craft standard 4.10D names imagery, figurative language and sound
// devices but NOT repetition, so the case keeps the library's repetition
// concept and anchors to 4.10A. To make that anchor honest rather than
// convenient, the case ends on the MESSAGE the repetition builds (cp5) and on
// the author's PURPOSE in repeating it (cp4, cp6) — the two things 4.10A names.
// Repetition is the evidence; purpose and message are what is graded.
//
// The trap is the library's: "it is just there" — treating a repeated detail
// as an accident of the plot rather than an author's choice.

export const PUBLIC_CASE = {
  standard: "4.15-MM",
  teksLabel:
    "TEKS 4.10A — Author's Purpose & Message (Texas Grade 4 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "ELAR",
  title: "Author's Choice Labyrinth",
  tagline: "The same blue scarf keeps showing up. That is not an accident.",

  mission: {
    briefText:
      "The labyrinth has three rooms, and the same object waits in every one: an old blue scarf. A cadet ahead of you decided it was just there by chance and got lost. Follow the scarf through the story about Lena and her grandmother. Figure out why the author keeps bringing it back.",
    goal: "Track a detail an author repeats. Explain how its meaning changes and what message the author wants readers to take away.",
  },

  mapImage: "/mission-map/4-15-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Room 1: Read all three parts of the story. What detail does the author repeat?",
      evidence: {
        type: "passage",
        label: "THE STORY",
        text: "Part 1: Grandma gave Lena a blue scarf she had knitted. Lena thought it was itchy and old-fashioned, so she stuffed it in a drawer. Part 2: That spring, Grandma moved to a town far away. Cleaning her room, Lena found the blue scarf and held it for a long time. Part 3: On the first cold morning of winter, Lena wrapped the blue scarf around her neck. It smelled like Grandma's kitchen. It did not feel itchy at all.",
      },
      choices: [
        { id: "a", text: "Lena's drawer" },
        { id: "b", text: "The blue scarf" },
        { id: "c", text: "The cold morning" },
        { id: "d", text: "Grandma's new town" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The author repeats the blue scarf in all three parts of the story.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Room 2: What does the scarf mean to Lena at the beginning?",
      evidence: {
        type: "passage",
        label: "PART 1",
        text: "Lena thought it was itchy and old-fashioned, so she stuffed it in a drawer.",
      },
      choices: [
        { id: "a", text: "It is her favorite thing." },
        { id: "b", text: "It reminds her of winter." },
        { id: "c", text: "It is an itchy, old gift she does not want." },
        { id: "d", text: "It belongs to her friend." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "At first, the scarf is an itchy, old gift that Lena hides away.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Room 3: What does the scarf mean to Lena at the end?",
      evidence: {
        type: "passage",
        label: "PART 3",
        text: "Lena wrapped the blue scarf around her neck. It smelled like Grandma's kitchen. It did not feel itchy at all.",
      },
      choices: [
        { id: "a", text: "It is still itchy and annoying." },
        { id: "b", text: "It is a way to feel close to Grandma." },
        { id: "c", text: "It is a new scarf from a store." },
        { id: "d", text: "It is something she plans to give away." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "At the end, the scarf helps Lena feel close to Grandma. The scarf did not change. Lena did.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Room 4: Two cadets explain why the scarf shows up three times. Whose reason finds the way out?",
      evidenceA: {
        type: "passage",
        label: "OWEN'S REASON",
        text: "The scarf is just there because Lena needed something to wear in the story.",
        choiceLabel: "Follow Owen's reason",
      },
      evidenceB: {
        type: "passage",
        label: "TESS'S REASON",
        text: "The author repeats the scarf so readers can see how Lena's feelings about Grandma change.",
        choiceLabel: "Follow Tess's reason",
      },
      correctSide: "B",
      evidenceLogEntry: "The author chose to repeat the scarf on purpose. Each time it appears, it shows how Lena's feelings have changed.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Room 5: Quick check. What message does the author want readers to take from the scarf?",
      evidence: {
        type: "passage",
        label: "THE CHANGE",
        text: "Beginning: itchy, stuffed in a drawer. Middle: held for a long time. End: warm, and smells like Grandma's kitchen.",
      },
      choices: [
        { id: "a", text: "Scarves are the best winter clothes." },
        { id: "b", text: "Knitting is hard to learn." },
        { id: "c", text: "Something we ignore can become precious when we miss the person who gave it." },
        { id: "d", text: "It is important to keep your room clean." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Message: Something we ignore can become precious when we miss the person who gave it.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Room: The labyrinth opens for a cadet who can explain why authors repeat details.",
      evidence: {
        type: "passage",
        label: "THE MAP OUT",
        text: "The scarf was in every room. Its meaning changed every time.",
      },
      choices: [
        { id: "a", text: "Authors repeat details by accident." },
        { id: "b", text: "Authors repeat details on purpose to show changes and build a message." },
        { id: "c", text: "Authors repeat details to make a story longer." },
        { id: "d", text: "Authors repeat details only in poems." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Authors repeat details on purpose to show how characters change and to build a message.",
    },
  ],

  finalResponsePrompt:
    "Leave directions for the next cadet in the labyrinth. Your answer should: (1) explain how the meaning of the scarf changes from the beginning to the end, using evidence, and (2) explain the author's purpose in repeating it and the message it builds.",

  responseStems: [
    "At the beginning, the scarf ___.",
    "At the end, the scarf ___.",
    "The author repeats the scarf to show ___.",
    "The message is ___.",
  ],

  selfCheckQuestions: [
    "I named the repeated detail.",
    "I used evidence from the beginning and the end.",
    "I explained that the author repeated it on purpose.",
    "I stated the author's message in my own words.",
    "I did not say the scarf is \"just there.\"",
  ],
};
