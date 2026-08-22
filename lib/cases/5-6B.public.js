// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  ricky: { name: "Ricky the Raisin", emoji: "\ud83c\udf47", color: "#7B5DFF", hint: "Thinks mixing made him part of something brand new." },
  pippa: { name: "Pippa the Pretzel", emoji: "\ud83e\udd68", color: "#F2A93B", hint: "Keeps noticing they're still easy to tell apart." },
  chip: { name: "Chip the Chocolate Candy", emoji: "\ud83c\udf6b", color: "#8B5CF6", hint: "Backs up Pippa with his own experience." },
  sara: { name: "Sara the Sifter", emoji: "\ud83e\uddfa", color: "#00C2C7", hint: "Has the hard proof \u2014 physically sorts everyone back apart." },
  bea: { name: "Booth Boss Bea", emoji: "\ud83c\udfaa", color: "#22C55E", hint: "Needs a real answer for an allergy-conscious customer." }
};

export const PUBLIC_CASE = {
  standard: "5.6B",
  title: "The Trail Mix Bar",
  bigQuestion: "Once raisins and pretzels are mixed in the bag, are they still really raisins and pretzels \u2014 or something new?",
  trapLine: "We've been mixed together in this bag so long, we're basically one new snack now.",
  evidenceBank: [
    "Raisins picked out of the mix still look, taste, and feel exactly like raisins",
    "Pretzels picked out still look, taste, and feel exactly like pretzels",
    "A quick hand-sort separates the mix back into its original parts in under a minute",
    "Weighing the sorted parts: total mass matches the mass of the mixed bag"
  ],
  coldOpenMessages: [
    { who: "system", text: "Bea's fundraiser trail mix bar has been sitting mixed in the bag all afternoon." },
    { who: "ricky", text: "Honestly, after this long mixed in together, I feel like a whole new snack." },
    { who: "pippa", text: "Ricky, I can still tell exactly which pieces are you and which are me." },
    { who: "chip", text: "Same \u2014 nobody's had trouble picking me out either." },
    { who: "bea", text: "A customer just asked if I can pull the peanuts out for an allergy. Can I?" },
    { who: "sara", text: "Let's find out \u2014 hand me the bag and I'll sift it." },
    { who: "pippa", text: "Watch, it's going to separate right back into raisins, pretzels, and chips." },
    { who: "ricky", text: "We've been mixed together in this bag so long, we're basically one new snack now." }
  ],
  selfCheckQuestions: [
    "Did I name at least two substances that are actually in the mix?",
    "Did I explain whether each one still has its own properties after mixing?",
    "Did I describe a way to separate them back out?",
    "Did I say whether Ricky's \"one new snack\" claim is really true?",
    "Did I use the word mixture correctly?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Ricky believe?", placeholder: "In your own words, what is Ricky's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Ricky's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students design a plan to sort a brand-new mixture (like a recycling bin of paper, plastic, and metal) back into its separate materials, using the same reasoning.";
