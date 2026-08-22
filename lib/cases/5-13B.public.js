// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  biscuit: { name: "Biscuit the Dog", emoji: "\ud83d\udc15", color: "#F2A93B", hint: "Owner insists his tricks are pure natural talent." },
  scout: { name: "Scout the Talent Scout", emoji: "\ud83c\udfa5", color: "#7B5DFF", hint: "Reviewing the training footage for real proof." },
  nose: { name: "Nosey the Nose", emoji: "\ud83d\udc43", color: "#00C2C7", hint: "An actual instinct, for comparison \u2014 no training needed." },
  rookie: { name: "Rookie the Untrained Dog", emoji: "\ud83d\udc36", color: "#4DD6FF", hint: "Same breed, no training, no tricks \u2014 the key control case." }
};

export const PUBLIC_CASE = {
  standard: "5.13B",
  title: "The Pet Talent Scout",
  bigQuestion: "Is a dog's \"talent\" for tricks something it's born knowing, or something it actually has to learn?",
  trapLine: "My dog was just born knowing all these tricks \u2014 total natural talent, no training at all.",
  evidenceBank: [
    "Video log shows weeks of repeated practice sessions before the dog performed the trick reliably",
    "Puppy showed zero trick behavior at 8 weeks old, before any training began",
    "Instinctive behaviors (like a dog's nose-sniffing or tail-wagging) show up with no training at all, for comparison",
    "A second, untrained dog of the same breed does not perform the trick"
  ],
  coldOpenMessages: [
    { who: "system", text: "A talent scout is reviewing dogs for a commercial, starting with Biscuit's trick reel." },
    { who: "scout", text: "Impressive tricks, Biscuit. How long did it take to teach you these?" },
    { who: "biscuit", text: "My dog was just born knowing all these tricks \u2014 total natural talent, no training at all." },
    { who: "scout", text: "Huh. Let me pull up the footage archive real quick." },
    { who: "scout", text: "There's weeks of practice sessions in here before he ever nailed it." },
    { who: "nose", text: "Now ME, on the other hand \u2014 nobody ever taught me to sniff things. I just do it." },
    { who: "rookie", text: "And I'm the same breed as Biscuit, zero training, zero tricks. Just saying." },
    { who: "biscuit", text: "My dog was just born knowing all these tricks \u2014 total natural talent, no training at all." }
  ],
  selfCheckQuestions: [
    "Did I name at least one behavior that's learned and one that's instinctive?",
    "Did I use the training footage as evidence?",
    "Did I use the untrained dog as a comparison point?",
    "Did I say whether Biscuit's \"born knowing\" claim is really true?",
    "Did I explain the real difference between an instinct and a learned behavior?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Biscuit believe?", placeholder: "In your own words, what is Biscuit's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Biscuit's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students design a simple experiment to test whether a new behavior (in a pet or even a person) is learned or instinctive, including what a fair control comparison would look like.";
