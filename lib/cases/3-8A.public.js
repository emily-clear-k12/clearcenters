// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.8A).

export const CAST = {
  nara: { name: "Nara", emoji: "🔌", color: "#F59E0B", hint: "Thinks energy means plugging in." },
  drum: { name: "The Drum", emoji: "🥁", color: "#EF4444", hint: "Heard across the room. No plug." },
  window: { name: "The Window", emoji: "🪟", color: "#F59E0B", hint: "Lights the corner and warms the sill." },
  door: { name: "The Swinging Door", emoji: "🚪", color: "#8B5CF6", hint: "Only knocks things over while moving." },
  kit: { name: "Kit", emoji: "📄", color: "#0D9488", hint: "Handing in both sheets in ten minutes." }
};

export const PUBLIC_CASE = {
  standard: "3.8A",
  title: "Nothing Here Is Plugged In",
  bigQuestion: "Nothing on this wall plugs in. So does that mean nothing on this wall has energy?",
  trapLine: "If it doesn't plug in, it doesn't have energy. I'm not making things up to fill a sheet.",
  evidenceBank: [
    "The drum can be heard across the room and felt buzzing",
    "The sunny sill is 31°C and the shaded sill is 22°C",
    "The swinging door knocks the cup off, but only while it's moving",
    "The wall clock runs all day on a battery with no plug",
    "None of these things plug into a socket"
  ],
  coldOpenMessages: [
    { who: "system", text: "Energy hunt, ten minutes left. One sheet is full. One sheet is completely blank." },
    { who: "kit", text: "Nara. Ten minutes. Your sheet is empty." },
    { who: "nara", text: "Because there's nothing here. No sockets on this wall. I'm not inventing things." },
    { who: "drum", text: "You can hear me from the far side of the room. Put your hand on me and I buzz." },
    { who: "nara", text: "That's just noise, though. That isn't energy." },
    { who: "window", text: "Then measure my sill. The sunny end is 31 degrees. The shaded end is 22." },
    { who: "door", text: "And I knocked a cup off the table this morning. Only while I was swinging, mind. I do nothing standing still." },
    { who: "nara", text: "None of you are plugged into anything. If it doesn't plug in, it doesn't have energy. I'm not making things up to fill a sheet." }
  ],
  selfCheckQuestions: [
    "Did I name at least two different kinds of energy?",
    "Did I use the two numbers from the window sill?",
    "Did I say what kind of energy the swinging door has?",
    "Did I answer Nara's rule about things needing to plug in?",
    "Did I give Kit a rule for checking the next thing on the sheet?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Nara believe?", placeholder: "In your own words, what is Nara's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Nara's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them find one example of each of the four kinds of energy outside on the playground, where there are no sockets at all.";
