// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.13B",
  title: "The Pet Talent Scout",
  bigQuestion: "Is a dog's \"talent\" for tricks something it's born knowing, or something it actually has to learn?",
  evidenceBank: [
    "Video log shows weeks of repeated practice sessions before the dog performed the trick reliably",
    "Puppy showed zero trick behavior at 8 weeks old, before any training began",
    "Instinctive behaviors (like a dog's nose-sniffing or tail-wagging) show up with no training at all, for comparison",
    "A second, untrained dog of the same breed does not perform the trick"
  ],
  trapLine: "My dog was just born knowing all these tricks \u2014 total natural talent, no training at all.",
  castNames: {
    biscuit: "Biscuit the Dog",
    scout: "Scout the Talent Scout",
    nose: "Nosey the Nose",
    rookie: "Rookie the Untrained Dog"
  },
  distractors: "Thinking all animal behaviors within a species are automatically instinctive; not recognizing that a controlled comparison (the untrained dog) is what actually proves the point.",
  mustInclude: [
    "Names at least one learned behavior and one instinctive behavior",
    "Uses the training-footage evidence",
    "Uses the untrained-dog comparison as a control",
    "Rejects the \"born knowing\" claim",
    "States the real difference between instinct and learned behavior"
  ],
};
