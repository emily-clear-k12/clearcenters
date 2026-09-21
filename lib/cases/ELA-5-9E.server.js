// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.5.9E. TEKS 5.9E(ii) — recognize characteristics and structures of argumentative text by explaining how the author has used facts for or against an argument.

export const SERVER_CASE = {
  standard: "ELA.5.9E",
  title: "The Loudest Evidence",
  bigQuestion: "Marisol's speech gives three reasons for a class pet. Which one is the strongest evidence?",
  evidenceBank: [
    "Marisol's claim is that the class should get a class pet",
    "'Pets are AMAZING and everyone LOVES them' is an opinion",
    "Caring for a pet every day means feeding it, cleaning its cage, and checking on it",
    "People in ancient Egypt kept cats, but that has nothing to do with this classroom",
    "The best evidence connects most directly to the claim"
  ],
  trapLine: "'Pets are AMAZING and everyone LOVES them!' is the best evidence. It's the most exciting line in the whole speech.",
  castNames: {
    jade: "Jade",
    marisol: "Marisol",
    blaze: "Blaze",
    bridget: "Bridget",
    cleo: "Cleo",
    diaz: "Mr. Diaz"
  },
  distractors: "Picking the most exciting or emotional line as the best evidence; thinking any true fact is good evidence; confusing opinion with evidence; judging evidence by how it sounds instead of how it connects to the claim.",
  mustInclude: [
    "It names the claim: the class should get a class pet.",
    "It explains that the loud line is an opinion, not evidence.",
    "It explains that the ancient Egypt fact is true but does not connect to this classroom.",
    "It says the strongest evidence is the reason about responsibility, and explains how it connects to the claim.",
    "It gives a rule: the best evidence connects most directly to the claim, not the one that sounds strongest."
  ],
};
