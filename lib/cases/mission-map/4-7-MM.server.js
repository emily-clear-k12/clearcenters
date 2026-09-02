// Mission Map — "Cause-and-Effect Chain Gate" — SERVER ONLY.
// Never import this from a client component. See 4-7-MM.public.js for the
// TEKS 4.4C alignment.

export const SERVER_CASE = {
  standard: "4.7-MM",
  title: "Cause-and-Effect Chain Gate",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "sequence", correctOrder: ["arrival", "travel", "growth", "business"] },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The railroad's arrival started a whole chain of effects for this Texas town. First, the railroad made travel and shipping goods much easier than before. That caused the town's population to grow quickly, as families and workers moved in for the new opportunities. The growing population then caused new stores and a lumber mill to open downtown, since more people meant more customers. A drought in a county two hundred miles away happened the same year, but it didn't belong on this chain — there was no evidence connecting it to this town's railroad or growth, and just happening in the same year isn't proof of a cause-and-effect connection. One event, the railroad's arrival, was able to branch into several real, connected effects on the town.",

  mustInclude: [
    "Describes at least two effects of the railroad's arrival in the correct order (easier travel/shipping, then population growth, then new businesses)",
    "Uses 'cause' and 'effect' correctly to connect the events",
    "Explains why the distant drought didn't belong on the chain (same year isn't proof of a connection)",
  ],
};
