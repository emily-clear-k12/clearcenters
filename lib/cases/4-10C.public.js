// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.10C).

export const CAST = {
  cast: { name: "Forecast", emoji: "📱", color: "#F59E0B", hint: "Can see exactly seven days." },
  alm: { name: "The Almanac", emoji: "📚", color: "#22C55E", hint: "Thirty years, no interest in this week." },
  lastyear: { name: "Last Year", emoji: "🗓️", color: "#8B5CF6", hint: "Same week, one rainy day." },
  shorts: { name: "The Shorts", emoji: "🩳", color: "#EF4444", hint: "Not in the box. Would like to be." },
  coat: { name: "The Rain Jacket", emoji: "🧥", color: "#3B82F6", hint: "Right for the week, not the years." },
  ada: { name: "Ada", emoji: "🧳", color: "#0D9488", hint: "One box, three years, can't reopen it." }
};

export const PUBLIC_CASE = {
  standard: "4.10C",
  title: "Packing on Seven Days of Evidence",
  bigQuestion: "Forecast is right about the next seven days. So why isn't that enough to pack a three-year box?",
  trapLine: "I can see seven days, so I can tell you what the place is like. It's a rainy place. Pack for rain, skip everything else.",
  evidenceBank: [
    "Six rainy days out of the next seven at the coast",
    "The coast averages 52 rainy days a year — about 1 in 7",
    "The same week last year had only one rainy day",
    "Coast summers average 88°F and winters rarely go below 45°F",
    "Seven days is not the same as thirty years"
  ],
  coldOpenMessages: [
    { who: "system", text: "One box left, shipping tonight, and it cannot be reopened for three years." },
    { who: "ada", text: "Okay. Last box. Somebody tell me what I actually need at the coast." },
    { who: "cast", text: "Already handled. Next seven days: rain, rain, rain, rain, cloud, rain, rain. Pack rain gear. Skip the rest." },
    { who: "coat", text: "I'm in the box already and I'd say that's fair for the week. I'm not sure it's fair for three years." },
    { who: "shorts", text: "It is absolutely not fair for three years. Coast summers average 88 degrees. I am still in a drawer." },
    { who: "alm", text: "May I. I have thirty years of coast records here. Fifty-two rainy days a year, on average." },
    { who: "ada", text: "Fifty-two out of three hundred and sixty-five. That's about one day in seven." },
    { who: "alm", text: "Correct. Wet for a Texas coast, certainly. Not six days in seven." },
    { who: "lastyear", text: "And I'm this exact calendar week, twelve months ago. One rainy day. Out of seven." },
    { who: "cast", text: "A statistical wobble. I can see seven days, so I can tell you what the place is like. It's a rainy place. Pack for rain, skip everything else." }
  ],
  selfCheckQuestions: [
    "Did I name what Forecast's seven days actually tell you?",
    "Did I name what the Almanac's thirty years tell you instead?",
    "Did I use an actual number from the long-run records?",
    "Did I use what the same week looked like last year?",
    "Did I tell Ada which source to pack from, and why?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Forecast believe?", placeholder: "In your own words, what is Forecast's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Forecast's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them decide which source they'd use for two different questions — whether to take an umbrella tomorrow, and whether a town should build storm drains — and say why the answers differ.";
