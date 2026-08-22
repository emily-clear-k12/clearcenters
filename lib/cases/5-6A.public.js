// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  marlow: { name: "Marlow the Magnet Wand", emoji: "\ud83e\uddf2", color: "#F2A93B", hint: "Thinks any metal has to stick to him." },
  benny: { name: "Benny the Beachcomber", emoji: "\ud83c\udfd6\ufe0f", color: "#4DD6FF", hint: "First to notice something's off." },
  cappy: { name: "Cappy the Bottle Cap", emoji: "\ud83e\udde2", color: "#7B5DFF", hint: "Stuck right on \u2014 an iron-based metal." },
  rusty: { name: "Rusty the Nail", emoji: "\ud83d\udccc", color: "#8B5CF6", hint: "Also stuck \u2014 another iron-based metal." },
  tabby: { name: "Tabby the Pull-Tab", emoji: "\ud83e\udd64", color: "#00C2C7", hint: "Metal, but didn't stick at all." },
  penny: { name: "Penny the Coin", emoji: "\ud83e\ude99", color: "#FFC44D", hint: "Also metal, also didn't stick." },
  ida: { name: "Inspector Ida", emoji: "\ud83d\udd75\ufe0f", color: "#22C55E", hint: "Needs the real rule for the lost-and-found." }
};

export const PUBLIC_CASE = {
  standard: "5.6A",
  title: "The Metal Detector Meltdown",
  bigQuestion: "Does a magnet really grab anything metal, or does it depend on the kind of metal?",
  trapLine: "If it's metal, I've got it \u2014 nothing metal can escape my pull!",
  evidenceBank: [
    "Magnet picks up: steel bottle cap, rusty nail (both iron-based)",
    "Magnet fails on: aluminum pull-tab, copper penny (both metal, both non-magnetic)",
    "All four objects test positive as \"metal\" by other properties (shiny, conducts electricity)",
    "Only certain metals \u2014 iron, nickel, cobalt \u2014 are magnetic; most other metals aren't"
  ],
  coldOpenMessages: [
    { who: "system", text: "Benny is sweeping the beach with Marlow the Magnet Wand, testing every scrap of metal he finds." },
    { who: "benny", text: "Found a bottle cap and an old nail \u2014 let's see what sticks, Marlow!" },
    { who: "cappy", text: "Ha! Snapped right on. Told you I'm no match for that pull." },
    { who: "rusty", text: "Same here. Stuck fast, no contest." },
    { who: "marlow", text: "See? Told you. Nothing gets past me." },
    { who: "benny", text: "Okay, now try this pull-tab and this old coin." },
    { who: "tabby", text: "Um... nothing's happening over here." },
    { who: "penny", text: "Same. I'm just sitting here, shiny and unbothered." },
    { who: "marlow", text: "If it's metal, I've got it \u2014 nothing metal can escape my pull!" }
  ],
  selfCheckQuestions: [
    "Did I name at least two metal objects that stuck to the magnet and two that didn't?",
    "Did I explain whether all metals act the same way around a magnet?",
    "Did I name which kind of metal actually responds to a magnet?",
    "Did I clearly say whether Marlow's claim is really true?",
    "Did I explain why you have to test an object instead of just guessing?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Marlow believe?", placeholder: "In your own words, what is Marlow's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Marlow's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students test a new batch of mystery objects, sort by magnetism, then compare that sort against a second property (like electrical conductivity) to see where the categories match and where they don't.";
