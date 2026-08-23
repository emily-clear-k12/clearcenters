// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.9A).

export const CAST = {
  jules: { name: "Jules", emoji: "✂️", color: "#F59E0B", hint: "Tied the Moon to the Sun." },
  moon: { name: "Moon", emoji: "🌘", color: "#8B5CF6", hint: "Never gets left behind by Earth." },
  earth: { name: "Earth", emoji: "🌍", color: "#3B82F6", hint: "Takes the Moon along all year." },
  sun: { name: "The Sun", emoji: "☀️", color: "#EF4444", hint: "Earth goes around it. The Moon doesn't." },
  tam: { name: "Tam", emoji: "🎤", color: "#0D9488", hint: "Presenting the model tomorrow." }
};

export const PUBLIC_CASE = {
  standard: "3.9A",
  title: "The Moon Is Tied to the Wrong Thing",
  bigQuestion: "When the class walked the model, the Moon got left eight metres from Earth. What should it be tied to?",
  trapLine: "The Sun makes things bright, so the Moon hangs off the Sun.",
  evidenceBank: [
    "When they walked the model, the Moon got left 8 metres from Earth",
    "The Moon is seen from Earth every month of the year",
    "The Moon stays about the same size in the sky",
    "The Moon is much closer to Earth than to the Sun",
    "Earth hangs on its own string going around the Sun"
  ],
  coldOpenMessages: [
    { who: "system", text: "A mobile of the Sun, Earth and the Moon hangs over the reading corner. It gets presented to the class tomorrow." },
    { who: "tam", text: "Jules, I have to explain this in the morning. Walk me through the strings." },
    { who: "jules", text: "Sun in the middle. Earth on its own string. Moon tied to the Sun, because the Sun is what makes things bright." },
    { who: "sun", text: "Earth going round me is right. I'll take that. The Moon has never gone round me though." },
    { who: "earth", text: "It hasn't. It's been the same distance from me all year, wherever I've got to." },
    { who: "tam", text: "We walked it out in the hall this morning, remember. I carried Earth all the way round." },
    { who: "moon", text: "And I stayed by the Sun. Eight metres away from Earth, on the far side of the room. That has never happened in real life." },
    { who: "jules", text: "The hall's just small. The Sun makes things bright, so the Moon hangs off the Sun." }
  ],
  selfCheckQuestions: [
    "Did I say what the Moon goes around?",
    "Did I say what Earth goes around?",
    "Did I use what happened when the class walked the model in the hall?",
    "Did I use the Moon log?",
    "Did I say the whole thing in one line for Tam?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Jules believe?", placeholder: "In your own words, what is Jules's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Jules's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out where the Moon's string should go on a bigger mobile that also has Mars on it, and say how they would test whether they got it right.";
