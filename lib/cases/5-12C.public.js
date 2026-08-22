// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  dev: { name: "Councilman Dev", emoji: "\ud83c\udfdb\ufe0f", color: "#F2A93B", hint: "Pushing the parking lot, thinks the garden barely matters." },
  gigi: { name: "Gigi the Garden", emoji: "\ud83c\udf3b", color: "#22C55E", hint: "Supports way more of the neighborhood than people realize." },
  bee: { name: "Bee the Bee", emoji: "\ud83d\udc1d", color: "#FFC44D", hint: "Visits yards well beyond just the garden." },
  rain: { name: "Rain the Rainfall", emoji: "\ud83c\udf27\ufe0f", color: "#4DD6FF", hint: "Behaves very differently on dirt versus pavement." },
  mrs_p: { name: "Mrs. Patel", emoji: "\ud83e\udd55", color: "#00C2C7", hint: "Actually relies on the garden's produce." }
};

export const PUBLIC_CASE = {
  standard: "5.12C",
  title: "The Parking Lot Town Hall",
  bigQuestion: "Does paving over the community garden for a parking lot really have \"no effect\" on the neighborhood?",
  trapLine: "It's just dirt and plants \u2014 paving it over won't really affect anything else around here.",
  evidenceBank: [
    "The garden currently supports pollinators (bees, butterflies) that also visit nearby yards",
    "Garden soil absorbs rainwater; a paved lot causes runoff to increase measurably nearby",
    "Local families use the garden produce, reducing their grocery costs",
    "A butterfly count dropped sharply in a similar neighborhood after a comparable garden was paved"
  ],
  coldOpenMessages: [
    { who: "system", text: "Councilman Dev proposes paving the community garden for extra parking." },
    { who: "dev", text: "It's just dirt and plants \u2014 paving it over won't really affect anything else around here." },
    { who: "mrs_p", text: "I actually feed my family from that garden. That's a real cost if it's gone." },
    { who: "bee", text: "And I don't just visit the garden \u2014 I'm all over the yards nearby too. This is my home base." },
    { who: "gigi", text: "Plus I soak up a lot of rain that would otherwise just run off somewhere." },
    { who: "rain", text: "Yeah, on pavement I don't soak in anywhere \u2014 I just rush off wherever the slope takes me." },
    { who: "dev", text: "I hadn't thought about all that, honestly." },
    { who: "dev", text: "It's just dirt and plants \u2014 paving it over won't really affect anything else around here." }
  ],
  selfCheckQuestions: [
    "Did I explain at least two different effects, not just \"it's just a garden\"?",
    "Did I use real evidence from the chat to back up what I'm saying?",
    "Did I explain how those effects connect to each other?",
    "Did I clearly say whether I agree or disagree with Dev's claim, and why?",
    "Did I explain how this affects living things beyond just plants?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Councilman believe?", placeholder: "In your own words, what is Councilman's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Councilman's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Have them research a real local land-use change and predict its ripple effects using the same reasoning about pollinators, water, and food access.";
