// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.8C).

export const CAST = {
  pilar: { name: "Pilar", emoji: "🧤", color: "#F59E0B", hint: "Explains a working glove incorrectly." },
  coil: { name: "The Coil", emoji: "🌡️", color: "#EF4444", hint: "The only part that gets warm." },
  wireout: { name: "Wire Out", emoji: "🟠", color: "#3B82F6", hint: "The wire Pilar keeps mentioning." },
  wireback: { name: "Wire Back", emoji: "🟣", color: "#8B5CF6", hint: "The wire nobody mentions." },
  switch: { name: "The Switch", emoji: "🔘", color: "#22C55E", hint: "Stops the glove from the return side." },
  judge: { name: "Judge Amara", emoji: "📋", color: "#0D9488", hint: "Scoring the explanation, not the glove." }
};

export const PUBLIC_CASE = {
  standard: "4.8C",
  title: "The Warming Glove Demo",
  bigQuestion: "The glove works. So why does it go completely cold when the second wire — the one nobody mentions — is disconnected?",
  trapLine: "The electricity leaves the battery, goes into the coil, and gets used up making heat. You only really need the one wire.",
  evidenceBank: [
    "Disconnecting the second wire makes the glove go completely cold",
    "The glove has two wires, not one",
    "The switch is on the return side and it still turns the glove off",
    "The coil gets warm but the wires stay cool",
    "Electrical energy needs a closed path all the way round"
  ],
  coldOpenMessages: [
    { who: "system", text: "Showcase table, late afternoon. The warming glove has run all day without a fault. The judging starts in ten minutes." },
    { who: "judge", text: "I'll be back round in ten. I've seen it work — what I'm scoring is whether you can describe how." },
    { who: "pilar", text: "Easy. Battery, wire, coil, heat. The electricity goes in and gets used up warming the coil." },
    { who: "wireback", text: "Sorry — quick question. If it gets used up in the coil, what am I for?" },
    { who: "pilar", text: "You're... a backup. Structural, mostly." },
    { who: "coil", text: "I'd push back on that. I only ever warm up when both my ends are connected to something. Never once managed it with one." },
    { who: "wireback", text: "They unhooked me this morning to check. Everything else left exactly as it was." },
    { who: "coil", text: "Stone cold. I did nothing for four minutes. They hooked him back up and I was warm again straight away." },
    { who: "switch", text: "And I'm on the return side, for what it's worth. I'm nowhere near the battery, and I can still shut the whole thing off from here." },
    { who: "pilar", text: "Okay but the glove WORKS, that's the important part. The electricity leaves the battery, goes into the coil, and gets used up making heat. You only really need the one wire." }
  ],
  selfCheckQuestions: [
    "Did I describe the whole path the energy takes, all the way round?",
    "Did I use what happened when the second wire was disconnected?",
    "Did I answer Pilar's claim that the electricity gets used up?",
    "Did I name what kind of energy the coil is producing?",
    "Did I explain what the switch is actually doing when it turns the glove off?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Pilar believe?", placeholder: "In your own words, what is Pilar's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Pilar's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them describe the path in a second device that produces light instead of heat, and say which parts of their glove explanation stay exactly the same.";
