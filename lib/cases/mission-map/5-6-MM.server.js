// Mission Map — "Branch Checkpoint Mission" — SERVER ONLY.
// Never import this from a client component. See 5-6-MM.public.js for the
// TEKS 5.15B alignment.

export const SERVER_CASE = {
  standard: "5.6-MM",
  title: "Branch Checkpoint Mission",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", type: "showdown", correctSide: "A" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The executive branch (the President) signed the new law, but the judicial branch checked it by reviewing whether the law was constitutional and striking it down because it conflicted with rights already protected by the Constitution. This check mattered because it kept the executive and legislative branches, which had already approved the law, from having the final say — no single branch, not even the one that signs laws, gets unlimited power. Checks and balances exist so that the legislative, executive, and judicial branches can each check the others' actions, keeping power balanced across the whole government instead of letting any one branch take over.",

  mustInclude: [
    "Names the executive branch as the branch that took the original action (signing the law)",
    "Names the judicial branch as the branch that checked it (reviewing/striking down the law)",
    "Explains why checks and balances exist — so no single branch gains unlimited power",
  ],
};
