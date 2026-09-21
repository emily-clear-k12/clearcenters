// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.4.2F. TEKS 4.2F — compare and order decimals using concrete and visual models to the hundredths.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  jordan: { name: "Jordan", emoji: "🏅", color: "#F59E0B", hint: "Already picked out a spot for the trophy." },
  ribbit: { name: "Ribbit", emoji: "🐸", color: "#22C55E", hint: "Felt like he flew. Landed past the other tape." },
  tenley: { name: "Tenley", emoji: "📊", color: "#3B82F6", hint: "A grid split into ten long strips." },
  centi: { name: "Centi", emoji: "🔢", color: "#8B5CF6", hint: "A grid split into a hundred tiny squares." },
  pete: { name: "Meter Pete", emoji: "📏", color: "#EF4444", hint: "Both tape marks are still stuck to him." },
  okafor: { name: "Judge Okafor", emoji: "⚖️", color: "#0D9488", hint: "Needs a winner before the next heat." }
};

export const PUBLIC_CASE = {
  standard: "MA.4.2F",
  title: "The Frog Jump Final",
  bigQuestion: "Hopper jumped 0.45 meters. Ribbit jumped 0.5 meters. Which frog really jumped farther, and how can you tell?",
  trapLine: "Hopper jumped 0.45 and Ribbit only jumped 0.5. Forty-five is way more than five, so Hopper wins.",
  evidenceBank: [
    "Ribbit's tape mark sits farther along Meter Pete than Hopper's",
    "Five of Tenley's ten strips cover the same space as fifty of Centi's squares",
    "Shading 0.45 on Centi fills 45 of the 100 squares",
    "0.5 and 0.50 name the same distance",
    "To compare decimals, line up the same places: tenths with tenths, hundredths with hundredths"
  ],
  coldOpenMessages: [
    { who: "system", text: "The Frog Jump Final. Two frogs, one meter stick, one trophy. Hopper jumped 0.45 meters. Ribbit jumped 0.5 meters." },
    { who: "okafor", text: "Scores are in. I need a winner before the next heat starts in five minutes." },
    { who: "jordan", text: "Easy. Hopper got 0.45. That's forty-five. Ribbit got 0.5. That's five." },
    { who: "ribbit", text: "Five? I felt like I flew. I landed right past Hopper's tape." },
    { who: "pete", text: "I can confirm that. Both tape marks are still stuck to me, and Ribbit's is farther down the line." },
    { who: "tenley", text: "I'm ten long strips. 0.5 means five of my strips. Shade them and I'm exactly half full." },
    { who: "centi", text: "I'm a hundred tiny squares. Shade 0.45 on me and you fill 45 squares. Shade half of me and you fill... well, count them." },
    { who: "jordan", text: "The tape could have slipped. Hopper jumped 0.45 and Ribbit only jumped 0.5. Forty-five is way more than five, so Hopper wins." }
  ],
  selfCheckQuestions: [
    "Did I use where the two tape marks landed on Meter Pete?",
    "Did I compare the same places — tenths with tenths, hundredths with hundredths?",
    "Did I explain why 0.5 is the same as 0.50?",
    "Did I say which frog really won?",
    "Did I give Judge Okafor a rule for comparing decimals?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Jordan believe?", placeholder: "In your own words, what is Jordan's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Jordan's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them put three more jumps in order — 0.6, 0.58, and 0.09 — and explain how they know without a meter stick.";
