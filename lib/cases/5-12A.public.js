// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  chirpy: { name: "Chirpy the Cardinal", emoji: "\ud83d\udc26", color: "#EF4444", hint: "Thinks more birds only helps the birds." },
  gia: { name: "Gia the Garden Plant", emoji: "\ud83c\udf31", color: "#22C55E", hint: "Feeling the ripple effect firsthand \u2014 fewer pests." },
  buggy: { name: "Buggy the Aphid", emoji: "\ud83d\udc1b", color: "#8B5CF6", hint: "Population dropping fast as the birds arrive." },
  whiskers: { name: "Whiskers the Cat", emoji: "\ud83d\udc08", color: "#F2A93B", hint: "Shows the ripple reaches even further up the chain." },
  sam: { name: "Sam the Backyard Kid", emoji: "\ud83e\uddd2", color: "#00C2C7", hint: "Just wanted to feed some birds, notices bigger changes." }
};

export const PUBLIC_CASE = {
  standard: "5.12A",
  title: "The Backyard Bird Feeder",
  bigQuestion: "If a new bird feeder brings in way more birds, does that only help the birds \u2014 or does it change the whole backyard food web?",
  trapLine: "More birds is just good for the birds \u2014 nothing else out here really changes.",
  evidenceBank: [
    "Bird population at the feeder roughly tripled within one month",
    "Local insect population (aphids, caterpillars) dropped noticeably as birds fed on them",
    "Garden plants that were being damaged by those insects showed new healthy growth",
    "A neighborhood cat's hunting activity near the feeder increased along with the bird traffic"
  ],
  coldOpenMessages: [
    { who: "system", text: "Sam hung a new bird feeder a month ago, and the whole backyard looks different now." },
    { who: "sam", text: "I just wanted to see more birds. Did I accidentally do something else too?" },
    { who: "chirpy", text: "More birds is just good for the birds \u2014 nothing else out here really changes." },
    { who: "gia", text: "Actually... I've been growing a lot better since you put that feeder up." },
    { who: "buggy", text: "Yeah, because a LOT more of us have been getting eaten lately. Rude." },
    { who: "whiskers", text: "And more birds hanging around means a lot more interesting mornings for me, if you know what I mean." },
    { who: "sam", text: "Wait, so this really did ripple out to the plants and even the cat?" },
    { who: "chirpy", text: "More birds is just good for the birds \u2014 nothing else out here really changes." }
  ],
  selfCheckQuestions: [
    "Did I explain at least two different things that changed, not just the birds?",
    "Did I use real evidence from the chat to back up what I'm saying?",
    "Did I explain how those effects are connected, step by step?",
    "Did I clearly say whether I agree or disagree with Chirpy's claim, and why?",
    "Did I explain where the ripple in this food web actually starts?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Chirpy believe?", placeholder: "In your own words, what is Chirpy's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Chirpy's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Have them pick a different organism in the same backyard food web (like the cat) and predict the ripple effects of removing it instead of adding birds.";
