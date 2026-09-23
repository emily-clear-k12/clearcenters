// Mission Map — "Sequence Story Gate" — Grade 3 ELAR.
//
// From the library concept ELAR 3.3. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 3), per rule 11: **3.8C — "analyze plot elements, including
// the sequence of events, the conflict, and the resolution."** Direct fit: the
// checkpoints name the first event, the conflict (the problem), the turning
// point, the resolution, and the cause/effect chain that links them.
//
// cp3 is a "sequence" checkpoint — the library's own "stepping stones across a
// story river" — and its items are authored out of answer order.
//
// The trap is the library's: a vivid descriptive detail (the kite's colors)
// that sounds important but changes nothing. It is set against a failed
// attempt (the busy worker), which DOES move the plot, because it is the reason
// Jada has to think of another way. That pairing is the point: an event that
// goes nowhere for the character still moves the story.

export const PUBLIC_CASE = {
  standard: "3.15-MM",
  teksLabel:
    "TEKS 3.8C — Plot: Sequence, Conflict & Resolution (Texas Grade 3 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "ELAR",
  title: "Sequence Story Gate",
  tagline: "Put the story stones in order. One wrong stone and the bridge falls.",

  mission: {
    briefText:
      "A river blocks the path. The only way across is a bridge of story stones. Each stone is an event from a story about Jada and her kite. Put the events in order and find the problem. Then show how one event leads to the next.",
    goal: "Put the events of a story in order. Find the problem, the turning point, and how it gets solved.",
  },

  mapImage: "/mission-map/3-15-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Stone 1: Read the story. What happens first?",
      evidence: {
        type: "passage",
        label: "THE KITE STORY",
        text: "Jada took her new kite to the park. The kite was bright red with a long yellow tail. It flew high over the trees. Then the string snapped! The kite landed on the roof of the snack stand. Jada asked the snack stand worker for help. He was too busy with a long line. Jada sat down and thought. Then she remembered the park ranger's long flag pole. She ran to find the ranger. The ranger used the pole to lift the kite down.",
      },
      choices: [
        { id: "a", text: "The string snaps." },
        { id: "b", text: "Jada takes her new kite to the park." },
        { id: "c", text: "The ranger lifts the kite down." },
        { id: "d", text: "Jada asks the worker for help." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "First event: Jada takes her new kite to the park.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Stone 2: Every story has a problem. What is the problem in this story?",
      evidence: {
        type: "passage",
        label: "STORY NOTE",
        text: "The problem is the thing the main character has to fix.",
      },
      choices: [
        { id: "a", text: "The kite is red with a yellow tail." },
        { id: "b", text: "The park has tall trees." },
        { id: "c", text: "The string snaps, and the kite gets stuck on a roof." },
        { id: "d", text: "Jada likes kites." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Problem: The string snaps, and the kite gets stuck on the snack stand roof.",
    },
    {
      id: "cp3",
      order: 3,
      type: "sequence",
      position: { x: 42, y: 66 },
      prompt: "Stone 3: Build the bridge. Tap the four events into the order they happen.",
      evidence: {
        type: "passage",
        label: "STORY STONES",
        text: "The bridge only holds if the stones go from first to last.",
      },
      items: [
        { id: "c", text: "Jada remembers the ranger's long flag pole." },
        { id: "a", text: "Jada flies her new kite at the park." },
        { id: "d", text: "The ranger lifts the kite down." },
        { id: "b", text: "The string snaps, and the kite lands on the roof." },
      ],
      correctOrder: ["a", "b", "c", "d"],
      evidenceLogEntry: "Order: Jada flies the kite. The string snaps. She remembers the flag pole. The ranger lifts the kite down.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 34 },
      prompt: "Stone 4: The turning point is when things start to change. Which event is the turning point?",
      evidence: {
        type: "passage",
        label: "STORY NOTE",
        text: "Before the turning point, Jada is stuck. After it, she has a plan.",
      },
      choices: [
        { id: "a", text: "Jada remembers the ranger's long flag pole." },
        { id: "b", text: "The kite flies high over the trees." },
        { id: "c", text: "The worker has a long line." },
        { id: "d", text: "Jada takes her kite to the park." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Turning point: Jada remembers the ranger's flag pole. Now she has a plan.",
    },
    {
      id: "cp5",
      order: 5,
      type: "showdown",
      position: { x: 74, y: 60 },
      prompt: "Stone 5: Two cadets each say their stone moves the story. Only one is right. Whose stone moves the story forward?",
      evidenceA: {
        type: "passage",
        label: "KAI'S STONE",
        text: "\"The kite was bright red with a long yellow tail.\"",
        choiceLabel: "Kai's stone moves the story",
      },
      evidenceB: {
        type: "passage",
        label: "LILA'S STONE",
        text: "\"Jada asked the worker for help. He was too busy.\"",
        choiceLabel: "Lila's stone moves the story",
      },
      correctSide: "B",
      evidenceLogEntry: "The busy worker moves the story. It is why Jada has to think of another plan. The kite's colors do not change what happens.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Stone: Why did Jada go looking for the ranger?",
      evidence: {
        type: "passage",
        label: "CAUSE AND EFFECT",
        text: "One event can cause the next one to happen.",
      },
      choices: [
        { id: "a", text: "Because her kite was red" },
        { id: "b", text: "Because the kite was stuck, and the worker could not help" },
        { id: "c", text: "Because she wanted a snack" },
        { id: "d", text: "Because it was a sunny day" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The stuck kite and the busy worker caused Jada to find the ranger. Important events cause later events.",
    },
  ],

  finalResponsePrompt:
    "Retell Jada's story for the bridge keeper. Your answer should: (1) tell the problem, the turning point, and how it was solved, and (2) explain why the kite's colors do not move the story.",

  responseStems: [
    "The problem was ___.",
    "The turning point was when ___.",
    "The problem was solved when ___.",
    "The kite's colors do not move the story because ___.",
  ],

  selfCheckQuestions: [
    "I told the events in order.",
    "I named the problem.",
    "I named the turning point.",
    "I told how the problem was solved.",
    "I explained why the colors do not change what happens.",
  ],
};
