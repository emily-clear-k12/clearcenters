// Mission Map — "Unlock the Character Clue Door" — SERVER ONLY.
// Never import this from a client component. See 3-13-MM.public.js for the
// TEKS 3.7C alignment and the design notes.

export const SERVER_CASE = {
  standard: "3.13-MM",
  title: "Unlock the Character Clue Door",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", correctChoiceId: "c" },
    { id: "cp3", type: "showdown", correctSide: "B" },
    { id: "cp4", correctChoiceId: "c" },
    { id: "cp5", type: "quickScan", correctChoiceId: "b" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Rosa is kind. One clue is that she gave Ben two pencils and her best eraser when he forgot his pencil box. Another clue is that she sat with a new girl who was eating alone and asked her to trade cookies. Both clues show things Rosa chose to do to help someone. The rainy day does not prove the trait because it is about the weather, not about Rosa. It happened in the story, but it does not tell what she is like.",

  mustInclude: [
    "Names a character trait (kind, caring, generous, helpful, friendly) — not a physical description or a one-time feeling",
    "Supports it with TWO specific details from the text that show what Rosa says or does (sharing pencils/eraser; sitting with the new girl; offering to trade cookies)",
    "Explains why the rainy-day detail does not prove the trait — it happened in the story but is not something Rosa said, did, or thought",
  ],
};
