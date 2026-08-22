// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  gus: { name: "Gus the Goalpost", emoji: "\ud83e\udd45", color: "#F2A93B", hint: "Confused about why his own shadow keeps changing." },
  sol: { name: "Sol the Sun", emoji: "\u2600\ufe0f", color: "#FFC44D", hint: "The real cause \u2014 his apparent path across the sky." },
  tessa: { name: "Tessa the Teammate", emoji: "\u26bd", color: "#7B5DFF", hint: "First to notice the shadow's pattern." },
  riley: { name: "Riley the Referee", emoji: "\ud83e\uddd1\u200d\u2696\ufe0f", color: "#00C2C7", hint: "Logs the shadow length and direction at set times." },
  tam: { name: "Coach Tam", emoji: "\ud83c\udfc3", color: "#22C55E", hint: "Wants to know the best shaded practice times." }
};

export const PUBLIC_CASE = {
  standard: "5.9",
  title: "The Tournament-Day Shadow",
  bigQuestion: "If the goalpost never moves, why does its shadow crawl across the field all day and change length?",
  trapLine: "The goalpost's shadow just moves randomly \u2014 or maybe the goalpost is secretly moving.",
  evidenceBank: [
    "8:00 AM: shadow is long, pointing west",
    "12:00 PM (noon): shadow is shortest, pointing nearly straight down",
    "4:00 PM: shadow is long again, pointing east",
    "The goalpost itself never physically moves position on the field"
  ],
  coldOpenMessages: [
    { who: "system", text: "Tournament day. The team notices the goalpost's shadow keeps changing throughout the morning." },
    { who: "tessa", text: "Wait, look \u2014 the shadow was pointing that way at warmups, now it's totally different!" },
    { who: "gus", text: "The goalpost's shadow just moves randomly \u2014 or maybe I'm secretly moving?" },
    { who: "tam", text: "You haven't budged an inch, Gus. But I do want to know the best shaded times to practice." },
    { who: "riley", text: "Let me log it properly. 8 AM: long shadow, pointing west." },
    { who: "riley", text: "Noon: shortest shadow, pointing almost straight down." },
    { who: "sol", text: "I've just been making my usual trip across the sky this whole time." },
    { who: "gus", text: "The goalpost's shadow just moves randomly \u2014 or maybe the goalpost is secretly moving." }
  ],
  selfCheckQuestions: [
    "Did I use shadow readings from at least two or three different times of day?",
    "Did I explain what's actually causing the day/night cycle?",
    "Did I connect the sun's apparent path to the shadow changes?",
    "Did I say whether the goalpost is really the one moving?",
    "Did I identify which time of day has the shortest shadow?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Gus believe?", placeholder: "In your own words, what is Gus's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Gus's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students predict shadow length and direction for a new object at a new time of day, using the same rotation-based reasoning.";
