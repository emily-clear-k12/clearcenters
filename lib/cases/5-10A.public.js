// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  foggy: { name: "Foggy the Fog", emoji: "\ud83c\udf2b\ufe0f", color: "#8B5CF6", hint: "Shrugs off why he shows up at all." },
  sunny: { name: "Sunny the Sun", emoji: "\u2600\ufe0f", color: "#FFC44D", hint: "The energy source that starts the whole chain." },
  ola: { name: "Ola the Ocean", emoji: "\ud83c\udf0a", color: "#00C2C7", hint: "Releases vapor as she warms." },
  vera: { name: "Vera the Vapor", emoji: "\ud83d\udca8", color: "#4DD6FF", hint: "Rises, cools, and becomes the fog \u2014 the middle step." },
  dax: { name: "Dax the Surfer", emoji: "\ud83c\udfc4", color: "#7B5DFF", hint: "Just wants to know if the waves will be clear today." }
};

export const PUBLIC_CASE = {
  standard: "5.10A",
  title: "The Marine Fog Mystery",
  bigQuestion: "Why does a thick fog roll in over the beach some mornings and not others?",
  trapLine: "I just show up every morning, no reason.",
  evidenceBank: [
    "Ocean surface temperature logged warmer in the late afternoon than early morning",
    "Warm ocean air holds more water vapor; overnight cooling causes that vapor to condense near the surface",
    "Foggy mornings follow warm, humid afternoons; clear mornings follow cooler, drier afternoons",
    "Fog burns off by mid-morning once the Sun warms the air again"
  ],
  coldOpenMessages: [
    { who: "system", text: "Dax paddles out for an early surf and finds the whole beach socked in with fog." },
    { who: "dax", text: "Foggy, why do you show up some mornings and not others? Kind of ruins the view." },
    { who: "foggy", text: "I just show up every morning, no reason." },
    { who: "dax", text: "That can't be it. There's gotta be a pattern." },
    { who: "sunny", text: "Well, I was heating the ocean pretty hard yesterday afternoon..." },
    { who: "ola", text: "And once I warm up, I let off a lot more water vapor than usual." },
    { who: "vera", text: "I rise up off her, then the night air cools me back down \u2014 that's when I start clumping together." },
    { who: "foggy", text: "I just show up every morning, no reason." }
  ],
  selfCheckQuestions: [
    "Did I identify what actually provides the energy for this whole process?",
    "Did I explain how the ocean is involved in making water vapor rise?",
    "Did I explain what fog actually is made of?",
    "Did I say whether Foggy's \"no reason\" claim is really true?",
    "Did I connect this cycle to the resulting weather pattern?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Foggy believe?", placeholder: "In your own words, what is Foggy's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Foggy's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students predict what would happen to morning fog patterns if the ocean stayed unusually cool all week, tracing the effect through evaporation and condensation.";
