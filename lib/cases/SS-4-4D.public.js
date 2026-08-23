// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.4D, TEKS 4.4D).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  eli: { name: "Eli Food-Only", emoji: "🍖", color: "#F59E0B", hint: undefined },
  buffalo: { name: "Bree Buffalo File", emoji: "🦬", color: "#8B5CF6", hint: undefined },
  fort: { name: "Felix Fort File", emoji: "🏰", color: "#3B82F6", hint: undefined },
  rail: { name: "Rae Railroad File", emoji: "🚂", color: "#22C55E", hint: undefined },
  war: { name: "Wes Red River File", emoji: "⚠️", color: "#EF4444", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.4D",
  title: "What Happened When the Buffalo Disappeared?",
  bigQuestion: "How did forts, railroads, the Red River War, and the loss of buffalo change American Indian life in Texas?",
  trapLine: "The loss of buffalo was only a food problem.",
  evidenceBank: [
    "Buffalo provided food and also materials used for clothing, shelter, tools, and trade.",
    "U.S. forts and military campaigns increased pressure on American Indian groups in the Plains.",
    "Railroad expansion brought more settlers, hunters, and outside control into the region."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student says, 'The buffalo disappearing mainly meant there was less food.' The class must decide whether that explains the full impact." },
    { who: "eli", text: "If buffalo disappeared, the biggest problem was probably just having less food." },
    { who: "buffalo", text: "Buffalo were connected to many parts of Plains life, not just meals." },
    { who: "fort", text: "Forts changed control of land and movement across the Plains." },
    { who: "rail", text: "Railroads brought more people and made the region easier to enter and control." },
    { who: "war", text: "These changes did not happen one at a time. Their effects piled up." }
  ],
  selfCheckQuestions: [
    "Did I explain at least two uses of buffalo besides food?",
    "Did I explain an effect of U.S. forts or the Red River War?",
    "Did I explain how railroads increased outside pressure or access?",
    "Did I explain how several changes worked together?",
    "Did I avoid reducing the loss of buffalo to only a food shortage?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Eli claiming?", placeholder: "State the food-only claim..." },
  { key: "buffalo", label: "What did buffalo provide besides food?", placeholder: "Use at least two examples..." },
  { key: "forts", label: "How did forts or military conflict affect life?", placeholder: "Explain the change..." },
  { key: "rail", label: "How did railroads increase pressure?", placeholder: "Use settlement/hunting evidence..." },
  { key: "combined", label: "How did these changes work together?", placeholder: "Explain the combined effect..." }
];

export const PUSH_ANGLE = "Impact Web: connect buffalo loss, railroads, forts, and conflict to at least three changes in daily life.";
