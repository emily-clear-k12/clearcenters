// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.9B).

export const CAST = {
  luna: { name: "Luna", emoji: "🌙", color: "#8B5CF6", hint: "Thinks she's shrinking." },
  halo: { name: "Halo", emoji: "✨", color: "#F59E0B", hint: "Has been exactly half this whole time." },
  beam: { name: "Beam", emoji: "☀️", color: "#EF4444", hint: "Never takes a night off." },
  terra: { name: "Terra", emoji: "🌍", color: "#3B82F6", hint: "Explains why the view is misleading." },
  ari: { name: "Ari", emoji: "🔭", color: "#22C55E", hint: "Has 28 nights of drawings." },
  devon: { name: "Devon", emoji: "📌", color: "#0D9488", hint: "Has to seal the prediction today." }
};

export const PUBLIC_CASE = {
  standard: "4.9B",
  title: "Luna Thinks She Is Shrinking",
  bigQuestion: "If the Moon looks like a sliver some nights and whole on others, is she actually changing size?",
  trapLine: "I shrink away to almost nothing every month and grow back. It's just my life. You get used to it.",
  evidenceBank: [
    "The same phase order repeats about every 28 nights",
    "The Sun lights exactly half of Luna at all times",
    "At full moon Luna is the same size she always was",
    "Luna's position relative to Earth changes every night",
    "We see different amounts of the lit half from Earth"
  ],
  coldOpenMessages: [
    { who: "system", text: "The prediction envelope gets sealed today and opened on the 14th. Whatever the group writes, the whole class will see whether it was right." },
    { who: "devon", text: "So we have to commit. What does the Moon look like on the 14th? I'm not guessing on something that gets checked out loud." },
    { who: "ari", text: "I've got 28 nights of drawings right here. Sliver, then bigger, then whole, then smaller, then sliver again. Same order every single time." },
    { who: "devon", text: "Ari that's a pattern. If it repeats we can predict it." },
    { who: "luna", text: "You can't predict me, Devon. I'm afraid that's just not how I work." },
    { who: "halo", text: "Excuse me. Before this goes further — I have been exactly one half of Luna every night since the beginning. No more. No less." },
    { who: "beam", text: "Correct. I light half of her at every moment. No exceptions, no nights off, no dimmer switch. I've never taken a piece of her anywhere." },
    { who: "terra", text: "The trouble is me, honestly. From down here I only ever get to see part of Halo, and how much depends on where Luna is that night." },
    { who: "ari", text: "Luna, on the full moon nights you looked completely normal sized. Nothing had to grow back." },
    { who: "luna", text: "That's sweet of you. But I shrink away to almost nothing every month and grow back. It's just my life. You get used to it." }
  ],
  selfCheckQuestions: [
    "Did I use the pattern in Ari's 28 nights of drawings?",
    "Did I say how much of Luna is lit at any given moment?",
    "Did I answer Luna's actual belief about getting smaller?",
    "Did I explain what IS changing from one night to the next?",
    "Did I give Devon a rule he could use to predict a night he hasn't seen?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Luna believe?", placeholder: "In your own words, what is Luna's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Luna's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them use the same reasoning to predict what an astronaut standing on the Moon would see Earth doing, and whether Earth would appear to have phases too.";
