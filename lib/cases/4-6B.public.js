// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.6B).

export const CAST = {
  whisk: { name: "Whisk", emoji: "🥄", color: "#F59E0B", hint: "Thinks anything dissolves eventually." },
  sugar: { name: "Sugar", emoji: "🍬", color: "#8B5CF6", hint: "Dissolved in 20 seconds and stayed." },
  oil: { name: "Oil", emoji: "🫒", color: "#22C55E", hint: "Comes back to the top every time." },
  vin: { name: "Vinegar", emoji: "🧴", color: "#3B82F6", hint: "Sits underneath, still herself." },
  tongue: { name: "Taste Test", emoji: "👅", color: "#EF4444", hint: "Can tell top from bottom." },
  chef: { name: "Chef Bo", emoji: "👩‍🍳", color: "#0D9488", hint: "Six minutes to service." }
};

export const PUBLIC_CASE = {
  standard: "4.6B",
  title: "Whisk Will Not Give Up",
  bigQuestion: "The sugar disappeared into the tea in twenty seconds. Why won't the oil do the same thing, no matter how long you stir?",
  trapLine: "Anything will combine if you stir it long enough. I've never failed and I'm not failing now.",
  evidenceBank: [
    "The sugar vanished into the tea in 20 seconds and stayed gone",
    "The dressing separates back into two layers within a minute",
    "The tea tastes the same at the top and the bottom",
    "The dressing tastes like oil on top and vinegar underneath",
    "Whisk has been stirring the dressing for 11 minutes"
  ],
  coldOpenMessages: [
    { who: "system", text: "Two jars on the prep counter. One took twenty seconds. The other has been going for eleven minutes and the lunch rush starts in six." },
    { who: "chef", text: "Whisk. Whisk, look at me. Is the dressing broken or is that just what dressing does? I need an answer, not more stirring." },
    { who: "sugar", text: "For the record, I took twenty seconds. I spread all the way through the tea and I have not moved since." },
    { who: "tongue", text: "Confirmed. The tea is the same sweetness at the top and at the bottom. I checked twice." },
    { who: "oil", text: "Good for her, honestly. Me, I go back up. I've gone back up eleven times this morning." },
    { who: "vin", text: "And I stay down here. Neither of us has changed one bit — we're both still completely ourselves." },
    { who: "chef", text: "So there's a line across the middle of the jar. That's what I'm looking at right now." },
    { who: "tongue", text: "Oil on top, vinegar underneath. Two totally different tastes depending where I go in. Nothing like the tea." },
    { who: "chef", text: "Whisk, that's eleven minutes. Eleven. The sugar took twenty seconds." },
    { who: "whisk", text: "Which is why I simply need more time. Anything will combine if you stir it long enough. I've never failed and I'm not failing now." }
  ],
  selfCheckQuestions: [
    "Did I say what kind of mixture the sweet tea is?",
    "Did I describe what the dressing does after the stirring stops?",
    "Did I use the timing or the taste test as evidence?",
    "Did I answer whether more stirring would actually fix the dressing?",
    "Did I compare the two jars so Chef Bo knows the rule, not just this one dressing?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Whisk believe?", placeholder: "In your own words, what is Whisk's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Whisk's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict which of three new pairs will form a solution and which will separate — salt in water, sand in water, food colouring in water — and say what evidence would settle each one.";
