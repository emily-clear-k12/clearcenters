// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.12B).

export const CAST = {
  arrow: { name: "Arrow", emoji: "➡️", color: "#F59E0B", hint: "Drew the map and won't redraw it." },
  sunny: { name: "Ray the Sun", emoji: "☀️", color: "#EF4444", hint: "Says he's the actual starting line." },
  grass: { name: "Grass", emoji: "🌱", color: "#22C55E", hint: "Makes her own food." },
  rabbit: { name: "Rabbit", emoji: "🐰", color: "#3B82F6", hint: "Has been running the wrong way." },
  hawk: { name: "Kestrel", emoji: "🦅", color: "#8B5CF6", hint: "Assumed she was leading off." },
  muncher: { name: "Muncher", emoji: "🍄", color: "#0D9488", hint: "Runs the return route with the matter." },
  starter: { name: "The Starter", emoji: "🏁", color: "#6B7280", hint: "Won't fire the gun until the map is right." }
};

export const PUBLIC_CASE = {
  standard: "4.12B",
  title: "Who Passes the Baton?",
  bigQuestion: "In a relay where the baton is energy, which runner hands off to which — and who was never given a lane?",
  trapLine: "Each runner hands off to what they eat. Rabbit eats grass, so rabbit hands to grass. It's on the map. Next question.",
  evidenceBank: [
    "Grass makes her own food from sunlight, water, and carbon dioxide",
    "Rabbit gets his energy by eating the grass",
    "Kestrel gets her energy by eating the rabbit",
    "Ray and Muncher were never given lanes",
    "New grass grows thickest where the old log rotted away"
  ],
  coldOpenMessages: [
    { who: "system", text: "The Meadow Relay was supposed to start ten minutes ago. The baton is energy. Nobody has moved." },
    { who: "rabbit", text: "I want it on record that I have been sprinting in circles this entire time and my legs are done." },
    { who: "hawk", text: "I'm listed at the top of the map so I assumed I was leading off. Was I not leading off?" },
    { who: "arrow", text: "Nobody is leading off, because nobody has started. The map is perfectly clear." },
    { who: "rabbit", text: "The map says I run TOWARD Grass and hand her the baton. But she's the one who GAVE it to me." },
    { who: "grass", text: "That is true. I build my own food out of sunlight and water and carbon dioxide. It comes from me first." },
    { who: "sunny", text: "Comes from you? Grass. Sweetheart. Where do you think the sunlight came from." },
    { who: "sunny", text: "I am the actual starting line of this entire race and I was not given a lane. Neither was Muncher." },
    { who: "muncher", text: "I'm not fussed. I run the return route anyway — I break the finished runners down and carry the matter back to Grass. Matter loops. The baton doesn't." },
    { who: "arrow", text: "This is a lot of opinions for a race that isn't running. Each runner hands off to what they eat. Rabbit eats grass, so rabbit hands to grass. It's on the map. Next question." }
  ],
  selfCheckQuestions: [
    "Did I say which direction the baton actually gets handed?",
    "Did I trace the baton all the way back to where it started?",
    "Did I explain how Grass gets the baton into the race in the first place?",
    "Did I explain what job Muncher does and why he needs a lane?",
    "Did I say whether the baton ever gets handed back the other way?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Arrow believe?", placeholder: "In your own words, what is Arrow's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Arrow's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them add a second consumer to the meadow — a mouse that also eats grass — and redraw the whole handoff order with the new runner included.";
