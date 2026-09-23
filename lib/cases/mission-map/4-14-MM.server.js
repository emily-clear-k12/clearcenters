// Mission Map — "Theme Vault" — SERVER ONLY.
// Never import this from a client component. See 4-14-MM.public.js for the
// TEKS 4.8A alignment and the design notes.

export const SERVER_CASE = {
  standard: "4.14-MM",
  title: "Theme Vault",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", correctChoiceId: "c" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", type: "quickScan", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "One theme of the story is that accepting help from others can make a hard job possible. At the beginning, Theo pushes Mia's hand away and says, \"I don't need anybody,\" and his robot keeps breaking. At the turning point, he lets Mia show him the washer trick, and the wheel finally holds, so he says two heads are better than one. By the end, Theo offers to help Sam, which shows he learned that help makes hard things easier. \"Theo builds a robot and takes it to the science fair\" is not a theme because it only tells what happened. A theme is a lesson a reader could use in their own life.",

  mustInclude: [
    "States a theme as a general lesson (accepting/asking for help, working together) — not a sentence about Theo's robot",
    "Supports it with evidence from all three points: the beginning (refusing help), the turning point (accepting Mia's fix), and the ending (offering help to Sam)",
    "Explains that the plot-summary sentence is not a theme because it retells events instead of stating a lesson",
  ],
};
