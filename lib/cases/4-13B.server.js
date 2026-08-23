// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.13B).

export const SERVER_CASE = {
  standard: "4.13B",
  title: "What Nell Is About to Tell Her Class",
  bigQuestion: "Pumpkin has four things you can see on her. Which ones will her pups have, and how would you know?",
  evidenceBank: [
    "The pups were born with patches and the rump swirl",
    "All the pups have clean chins and no flat patch",
    "Pumpkin's chin was white in her first-week photo",
    "Pumpkin has eaten kale every day for two years",
    "The flat patch is exactly where she sleeps against the bottle"
  ],
  trapLine: "Anything you can see on the mom, the babies get too. That's just how it works.",
  castNames: {
    deshawn: "Deshawn",
    nell: "Nell",
    pumpkin: "Pumpkin",
    pups: "The Pups",
    kale: "The Kale",
    gene: "Gene"
  },
  distractors: "Treating any visible feature of a parent as automatically inherited; confusing a physical trait with a behaviour the animal learned; assuming a trait counts as acquired only if a person deliberately caused it, missing ones that come from diet, habit, or where an animal sleeps.",
  mustInclude: [
    "The chat names a trait Pumpkin passed down.",
    "It names a trait Pumpkin picked up herself.",
    "It uses what the pups actually have.",
    "It corrects Deshawn's rule directly.",
    "It gives Nell the difference in one line."
  ],
};
