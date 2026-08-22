// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  buzz: { name: "Buzz the Beekeeper", emoji: "🐝", color: "#F2A93B", hint: "Thinks it's just about the bees." },
  daisy: { name: "Daisy the Flower", emoji: "🌼", color: "#7B5DFF", hint: "The first one feeling the ripple effect." },
  frankie: { name: "Frankie the Farmer", emoji: "🌾", color: "#00C2C7", hint: "Wants to know how this hits his crops." },
  wren: { name: "Dr. Wren the Ecologist", emoji: "🔬", color: "#4DD6FF", hint: "Has the hard data on the whole food web." },
};

export const PUBLIC_CASE = {
  standard: "5.12B",
  title: "The Bee Disappearance Mystery",
  bigQuestion: "If the bees disappear, does that only hurt the bees — or does it ripple through the whole farm?",
  trapLine: "Losing the bees only hurts the bees — the rest of the farm is fine.",
  evidenceBank: [
    "The bee population dropped 60% in one season",
    "The flower fruit-set rate dropped at the same time the bee count dropped",
    "The farmer's crop yield data shows a decline the following season",
    "Bees connect flowers to fruit-eating animals in the food web",
  ],
  coldOpenMessages: [
    { who: "system", text: "The farm's bee population dropped 60% in one season. Now the farm crew is trying to figure out how bad things really are." },
    { charId: "frankie", text: "Okay everyone. My crop numbers are way down this year. Something is going on and I need answers." },
    { charId: "buzz", text: "I already know what happened. My hives lost more than half their bees this season. It's been rough." },
    { charId: "daisy", text: "Can I just say — it has been a very lonely season out here. Hardly any visitors." },
    { charId: "frankie", text: "Wait, Daisy, what do you mean? You're just a flower. How does that connect to my crops being down?" },
    { charId: "wren", text: "That's actually a really important question, Frankie. I've been watching the data. The timing of the bee drop and the fruit-set drop match almost exactly." },
    { charId: "daisy", text: "I tried to tell everyone! No bees means no pollination. And no pollination means... well. No fruit. No seeds." },
    { charId: "frankie", text: "No fruit?? That explains EVERYTHING. My yield data looked fine early in the season and then just crashed." },
    { charId: "wren", text: "Right. The ripple shows up downstream. I can walk you through the whole food web if that would help." },
    { charId: "buzz", text: "I hear you all, but let's not overreact. Losing the bees only hurts the bees. The rest of the farm is fine." },
  ],
  selfCheckQuestions: [
    "Did I explain at least two different things that are affected — not just the bees?",
    "Did I use real evidence from the chat to back up what I'm saying?",
    "Did I explain how those effects are connected, step by step?",
    "Did I clearly say whether I agree or disagree with Buzz's claim, and why?",
    "Did I explain where the whole food web's energy actually starts?",
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Buzz believe?", placeholder: "In your own words, what is Buzz's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Buzz's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE =
  "Have them pick a different organism from the same food web — a decomposer or a top predator — and predict the ripple effects of removing that one instead of the bees.";
