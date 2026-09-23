// Mission Map — "Theme Evidence Escape" — SERVER ONLY.
// Never import this from a client component. See 5-15-MM.public.js for the
// TEKS 5.8A alignment and the design notes.

export const SERVER_CASE = {
  standard: "5.15-MM",
  title: "Theme Evidence Escape",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "c" },
    { id: "cp3", correctChoiceId: "b" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", type: "quickScan", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "b" },
  ],

  modelAnswer:
    "The story shows that caring about your teammates matters more than winning when Priya writes in her journal, \"Winning felt good last year. Helping Ava felt better.\" This is strong evidence because Priya directly compares the two and decides that helping mattered more. Another strong piece is the moment she thinks, \"She feels even worse than I do,\" because that is when her anger turns into care. A second theme is that a mistake can become a chance to grow, shown when Priya promises to practice handoffs with Ava every day until they get it right. \"The team finished fourth\" is weak evidence because it only tells what happened in the race. It does not show anyone learning or changing.",

  mustInclude: [
    "Supports the given theme with strong evidence that shows a realization or lesson (the journal entry and/or 'She feels even worse than I do'), and explains why it is strong",
    "Names a SECOND theme the text supports (e.g., mistakes can be chances to grow) and supports it with evidence (the promise to practice handoffs together)",
    "Explains that 'The team finished fourth' is true but only retells plot and shows no lesson or change",
  ],
};
