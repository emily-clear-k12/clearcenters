// Mission Map — "Author's Choice Labyrinth" — SERVER ONLY.
// Never import this from a client component. See 4-15-MM.public.js for the
// TEKS 4.10A alignment and the design notes.

export const SERVER_CASE = {
  standard: "4.15-MM",
  title: "Author's Choice Labyrinth",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", correctChoiceId: "c" },
    { id: "cp3", correctChoiceId: "b" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", type: "quickScan", correctChoiceId: "c" },
    { id: "cp6", correctChoiceId: "b" },
  ],

  modelAnswer:
    "At the beginning, the scarf is an itchy, old-fashioned gift that Lena stuffs in a drawer. At the end, after Grandma moves away, Lena wraps it around her neck, and it smells like Grandma's kitchen and does not feel itchy at all. The scarf itself never changed, so the change is in Lena. The author repeats the scarf to show how Lena's feelings about Grandma grow once she misses her. The message is that something we ignore can become precious when we miss the person who gave it to us.",

  mustInclude: [
    "Contrasts the scarf's meaning at the beginning (itchy, unwanted, hidden) with its meaning at the end (comfort, closeness to Grandma), using details from the text",
    "Explains that the author repeated the scarf ON PURPOSE to show how Lena's feelings change — not that it is just there",
    "States a message the story conveys (e.g., we value people and things more when we miss them)",
  ],
};
