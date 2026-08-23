// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.10B).

export const CAST = {
  bar: { name: "Bar", emoji: "🏖️", color: "#F59E0B", hint: "Thinks he's making his own sand." },
  hill: { name: "The Hill", emoji: "⛰️", color: "#8B5CF6", hint: "Three inches shorter than last year." },
  creek: { name: "The Creek", emoji: "🏞️", color: "#3B82F6", hint: "Carries it, then slows down." },
  gully: { name: "The Gully", emoji: "🪏", color: "#22C55E", hint: "Shows the material leaving." },
  grain: { name: "The Pale Grain", emoji: "🔍", color: "#EF4444", hint: "Matches the hill, not the creek bed." },
  rae: { name: "Rae", emoji: "🎣", color: "#0D9488", hint: "Won't shovel until she knows why." }
};

export const PUBLIC_CASE = {
  standard: "4.10B",
  title: "Where Is All This Sand Coming From?",
  bigQuestion: "The sandbar doubled since spring. Did it grow that material itself, or did the material come from somewhere else?",
  trapLine: "I've been growing. From the bottom up. Making my own sand, thank you.",
  evidenceBank: [
    "The sandbar doubled in width since spring",
    "The hillside upstream has lost about three inches of soil",
    "The sand on the bar matches the sand in the gully, not the creek bed",
    "The creek runs fast down the straight and slows sharply at the bend",
    "The sandbar sits exactly where the water slows down"
  ],
  coldOpenMessages: [
    { who: "system", text: "The fishing hole at the bend used to be waist-deep. Since spring it has been ankle-deep, and the sandbar across it has doubled." },
    { who: "rae", text: "I'm not shovelling it out until somebody tells me where it's coming from. I'll be back doing it next spring otherwise." },
    { who: "bar", text: "Coming from? Rae. I made it. I've been growing from the bottom up all season." },
    { who: "hill", text: "Have you. Because I'm about three inches shorter than I was this time last year." },
    { who: "gully", text: "And I wasn't here at all before last winter. I'm a channel now. Things come down me when it rains." },
    { who: "creek", text: "They come down you into me, is what happens. I run hard down that straight." },
    { who: "rae", text: "And then you slow right down at the bend. Which is where the bar is." },
    { who: "creek", text: "It is. And whatever I'm carrying, I put it down the moment I slow. I don't hold on to it." },
    { who: "grain", text: "Might I settle this. I'm pale and fine. I'm on the bar and I'm in the gully. The creek bed underneath the bar is dark and coarse. We are not the same sand." },
    { who: "bar", text: "That's a lovely coincidence. I've been growing. From the bottom up. Making my own sand, thank you." }
  ],
  selfCheckQuestions: [
    "Did I say where the sandbar's material actually came from?",
    "Did I use the fact that the sand on the bar matches the gully and not the creek bed?",
    "Did I say what carried the material down to the bend?",
    "Did I explain why it gets dropped at the bend and not somewhere else?",
    "Did I tell Bar directly whether he's making sand or collecting it?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Bar believe?", placeholder: "In your own words, what is Bar's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Bar's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what happens to the sandbar if the hillside upstream is replanted, and say which of the three processes — weathering, erosion, deposition — that would slow down first.";
