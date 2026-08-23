// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.4D, TEKS 5.4D).

export const SERVER_CASE = {
  standard: "SS.5.4D",
  title: "The Cause File",
  bigQuestion: "Were slavery, sectionalism, and states' rights three separate causes of the Civil War, or did conflict over the expansion of slavery connect them?",
  evidenceBank: [
    "New western territories reopened arguments over slavery",
    "Regional positions on slavery grew farther apart",
    "States’ rights arguments often involved laws protecting or limiting slavery"
  ],
  trapLine: "Slavery was one issue, states' rights was another, and sectionalism was a third. They were separate causes, so no one issue was central.",
  castNames: {
    evan: "Evan Brooks",
    maya: "Maya Torres",
    james: "James Carter",
    priya: "Priya Shah",
    reed: "Dr. Lena Reed"
  },
  distractors: "Treating slavery, sectionalism, and states’ rights as unrelated causes; saying the Civil War was only about a vague idea of states’ rights without identifying the issue involved; claiming every northerner opposed slavery or every southerner held the same view; saying slavery was irrelevant to sectionalism; overcorrecting by saying no other political or economic issues existed.",
  mustInclude: [
    "Explains why the expansion of slavery repeatedly increased national conflict.",
    "Connects disagreement over slavery to sectionalism.",
    "Connects states’ rights disagreements in this case to slavery.",
    "Explains the central role of slavery’s expansion in the conflicts that led to Civil War.",
    "Rejects the idea that slavery, sectionalism, and states’ rights were three unrelated boxes."
  ],
};
