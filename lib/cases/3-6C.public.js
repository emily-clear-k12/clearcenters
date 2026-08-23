// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.6C).

export const CAST = {
  marta: { name: "Marta", emoji: "☕", color: "#F59E0B", hint: "Thinks the glasses leak." },
  glass: { name: "The Glass", emoji: "🥤", color: "#3B82F6", hint: "Has no crack and no hole." },
  jar: { name: "The Sealed Jar", emoji: "🫙", color: "#22C55E", hint: "Empty, sealed, and soaking wet." },
  mist: { name: "Mist", emoji: "💨", color: "#8B5CF6", hint: "Is in the air the whole time." },
  sami: { name: "Sami", emoji: "🧹", color: "#0D9488", hint: "Carries the box out at four." }
};

export const PUBLIC_CASE = {
  standard: "3.6C",
  title: "The Leaky Glasses",
  bigQuestion: "The sealed empty jar got just as wet as the glasses. So where is the water actually coming from?",
  trapLine: "The water is coming through the glass. They leak, and the set is going in the bin.",
  evidenceBank: [
    "The sealed empty jar got wet on the outside too",
    "There was nothing inside the sealed jar to leak",
    "The juice is purple but every drop outside is clear",
    "The same glasses stay dry with room-temperature water in them",
    "The drops only show up when what's inside is cold"
  ],
  coldOpenMessages: [
    { who: "system", text: "Twenty-four café glasses, boxed up by the back door. They go out at four o'clock." },
    { who: "sami", text: "Marta, before I carry these out — are they definitely broken?" },
    { who: "marta", text: "Soaking wet after ten minutes. Every one. That's a leak." },
    { who: "glass", text: "I'd just like to say I have no crack. No chip. No hole. I've checked myself over quite carefully." },
    { who: "jar", text: "Could I come in here. I'm empty. My lid is screwed on tight. I came out of the freezer an hour ago." },
    { who: "jar", text: "And I am absolutely dripping. There was nothing inside me to leak." },
    { who: "sami", text: "...the juice is purple, isn't it. And all the drops on the outside are clear." },
    { who: "marta", text: "That's a coincidence. The water is coming through the glass. They leak, and the set is going in the bin." }
  ],
  selfCheckQuestions: [
    "Did I use the sealed empty jar?",
    "Did I use the colour of the drops?",
    "Did I say where the water on the outside came from?",
    "Did I say why it only happens with cold drinks?",
    "Did I say what happens to the water in the air when it gets cooled?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Marta believe?", placeholder: "In your own words, what is Marta's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Marta's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what happens to a cold can left out on a hot day versus a cold day, and say which one gets wetter and why.";
