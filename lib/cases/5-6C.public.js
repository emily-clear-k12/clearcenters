// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  sasha: { name: "Sasha the Syrup", emoji: "\ud83c\udf67", color: "#EF4444", hint: "Panicking that she disappeared into the ice." },
  iggy: { name: "Iggy the Ice", emoji: "\ud83e\uddca", color: "#4DD6FF", hint: "Points out he's just melting, still right there." },
  dilly: { name: "Dilly the Drip", emoji: "\ud83d\udca7", color: "#00C2C7", hint: "Noticed the mix still tastes like syrup." },
  scout: { name: "Scout the Scale", emoji: "\u2696\ufe0f", color: "#697386", hint: "Has the hard mass-before/mass-after numbers." },
  mia: { name: "Mia the Manager", emoji: "\ud83c\udfea", color: "#7B5DFF", hint: "Needs to know if the stand is really losing product." }
};

export const PUBLIC_CASE = {
  standard: "5.6C",
  title: "The Snow Cone Stand Mystery",
  bigQuestion: "When the syrup melts and mixes into the shaved ice, did some of it actually vanish?",
  trapLine: "I dissolved \u2014 I'm just gone. Poof. Not even a little bit of me is left.",
  evidenceBank: [
    "Mass of cup + shaved ice before adding syrup: 250 g",
    "Mass of syrup added: 10 g",
    "Mass of the mixed snow cone after stirring: 260 g (matches 250 + 10)",
    "Syrup is no longer visible as a separate layer, but the scale still reads 260 g"
  ],
  coldOpenMessages: [
    { who: "system", text: "Mia is closing up the snow cone stand and doing inventory when Sasha starts to panic." },
    { who: "sasha", text: "Mia, I think I'm disappearing! Once I hit the ice, I just vanish!" },
    { who: "iggy", text: "You're not gone, you're just melted in with me. I can still taste you." },
    { who: "dilly", text: "Yeah, this whole cup still tastes exactly like syrup and ice together." },
    { who: "mia", text: "Okay but if we're losing syrup every time, that's real money. I need to know for sure." },
    { who: "scout", text: "Let's weigh it. Cup and ice: 250 grams. Add the syrup: should be 260." },
    { who: "scout", text: "Stirred and mixed... still 260 grams." },
    { who: "sasha", text: "I dissolved \u2014 I'm just gone. Poof. Not even a little bit of me is left." }
  ],
  selfCheckQuestions: [
    "Did I use the actual mass readings from before and after mixing?",
    "Did I explain how the mass before compares to the mass after?",
    "Did I explain what really happens to syrup when it dissolves?",
    "Did I say whether Sasha's \"just gone\" claim is really true?",
    "Did I connect this to a rule about matter and mixing?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Sasha believe?", placeholder: "In your own words, what is Sasha's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Sasha's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students predict and test what happens with a different mixture (powdered drink mix in water), measuring mass before/after to prove conservation again.";
