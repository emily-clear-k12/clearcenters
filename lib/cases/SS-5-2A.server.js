// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.2A, TEKS 5.2A).

export const SERVER_CASE = {
  standard: "SS.5.2A",
  title: "The Tea Party Blame Game",
  bigQuestion: "Did the Boston Tea Party start the conflict between Britain and the colonies, or was it one part of a bigger chain of causes and effects?",
  evidenceBank: [
    "The French and Indian War came before the Tea Party",
    "Colonists protested British policies before 1773",
    "Britain took new actions after the Tea Party"
  ],
  trapLine: "The Tea Party is what started all this. Before those men dumped the tea, Britain and the colonies weren't really fighting.",
  castNames: {
    ned: "Ned Turner",
    abigail: "Abigail Hart",
    samuel: "Samuel Reed",
    eliza: "Eliza Warren",
    thomas: "Thomas Bell"
  },
  distractors: "Treating the Boston Tea Party as the single beginning of the Revolution; saying Britain and the colonies were 'fine' before 1773; claiming colonists dumped tea simply because tea cost too much; reversing chronology by saying British taxes came after the Tea Party; listing events without explaining how one led to another; overcorrecting by saying the Tea Party was unimportant.",
  mustInclude: [
    "Connects the French and Indian War to Britain's revenue needs or later colonial taxes.",
    "Connects British taxes or policies to colonial resistance before the Tea Party.",
    "Explains that the Boston Tea Party was a response to earlier British taxation or authority.",
    "Connects Britain's response after the Tea Party to increased colonial conflict or cooperation.",
    "Rejects the Tea Party as the single cause and describes it as part of a larger chain of causes and effects."
  ],
};
