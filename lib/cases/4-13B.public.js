// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.13B).

export const CAST = {
  deshawn: { name: "Deshawn", emoji: "🎓", color: "#F59E0B", hint: "Already said it out loud to a little kid." },
  nell: { name: "Nell", emoji: "🖍️", color: "#0D9488", hint: "Telling her whole class tomorrow." },
  pumpkin: { name: "Pumpkin", emoji: "🐹", color: "#8B5CF6", hint: "Knows what she arrived with." },
  pups: { name: "The Pups", emoji: "🐾", color: "#EC4899", hint: "Three weeks old and full of evidence." },
  kale: { name: "The Kale", emoji: "🥬", color: "#22C55E", hint: "Takes credit for the green chin." },
  gene: { name: "Gene", emoji: "🧬", color: "#3B82F6", hint: "Explains what actually gets handed down." }
};

export const PUBLIC_CASE = {
  standard: "4.13B",
  title: "What Nell Is About to Tell Her Class",
  bigQuestion: "Pumpkin has four things you can see on her. Which ones will her pups have, and how would you know?",
  trapLine: "Anything you can see on the mom, the babies get too. That's just how it works.",
  evidenceBank: [
    "The pups were born with patches and the rump swirl",
    "All the pups have clean chins and no flat patch",
    "Pumpkin's chin was white in her first-week photo",
    "Pumpkin has eaten kale every day for two years",
    "The flat patch is exactly where she sleeps against the bottle"
  ],
  coldOpenMessages: [
    { who: "system", text: "Deshawn has been showing his kindergarten buddy around the class pet corner. She has been writing none of it down and remembering all of it." },
    { who: "nell", text: "deshawn showed me EVERYTHING. pumpkin has orange and white patches and a swirl on her bottom and a green chin and a flat spot" },
    { who: "pumpkin", text: "The flat spot is from the water bottle. I sleep pressed against it. I'm aware it's not my best angle." },
    { who: "nell", text: "and deshawn says her babies will have ALL of it when they grow up!!" },
    { who: "pups", text: "Hi!! We have the patches!! And the swirl!! And an ENORMOUS amount of fluff!!" },
    { who: "pups", text: "Our chins are clean though. Very clean. We checked." },
    { who: "kale", text: "As they should be. Those pups have not eaten one leaf of me. That chin of Pumpkin's took two years of daily meals and I'd like the credit." },
    { who: "pumpkin", text: "There's a photo of me from my first week in the tub by the window. My chin is white in it." },
    { who: "gene", text: "That is the sort of thing worth noticing before anyone explains it to a five-year-old." },
    { who: "deshawn", text: "I mean I already explained it though. Anything you can see on the mom, the babies get too. That's just how it works." }
  ],
  selfCheckQuestions: [
    "Did I name a trait the pups already had the day they were born?",
    "Did I name a trait Pumpkin picked up somewhere along the way?",
    "Did I use what the pups actually have — and what they don't?",
    "Did I say plainly what's wrong with Deshawn's rule?",
    "Did I explain the difference between the two kinds of traits in a way Nell could repeat?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Deshawn believe?", placeholder: "In your own words, what is Deshawn's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Deshawn's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them sort a new set: a guinea pig with a chewed-short whisker, a black stripe down her back, and a patch of fur worn thin from squeezing under the hutch door.";
