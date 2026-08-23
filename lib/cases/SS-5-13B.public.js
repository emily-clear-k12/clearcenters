// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.13B, TEKS 5.13B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.13B, for example).

export const CAST = {
  owen: { name: "Owen Pike", emoji: "🪶", color: "#F59E0B", hint: "Thinks British rule cancels out colonial representation." },
  compact: { name: "Mara Compact", emoji: "📜", color: "#8B5CF6", hint: "Knows what the Mayflower Compact established." },
  burgess: { name: "Elias Burgess", emoji: "🗳️", color: "#3B82F6", hint: "Knows how the House of Burgesses worked." },
  limits: { name: "Nora Fields", emoji: "🔎", color: "#22C55E", hint: "Keeps the historical limits accurate." },
  curator: { name: "Ms. Vale", emoji: "🏛️", color: "#0D9488", hint: "Needs an exhibit label that explains both examples." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.13B",
  title: "The Meeting Nobody Asked For",
  bigQuestion: "What makes the Mayflower Compact and the Virginia House of Burgesses examples of representative government in the colonies?",
  trapLine: "If Britain still ruled the colonies, colonial meetings and assemblies were not really representative government.",
  evidenceBank: [
    "The Mayflower Compact created an agreement for self-government",
    "Virginia colonists elected representatives to the House of Burgesses",
    "The colonies were still under British authority"
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum team is writing a display about representative government in the colonies." },
    { who: "owen", text: "I think this exhibit is misleading. Britain ruled the colonies, so these meetings were not really representative government." },
    { who: "compact", text: "The Mayflower settlers still agreed on rules for governing their own community." },
    { who: "burgess", text: "And Virginia colonists elected people to speak and make laws in an assembly." },
    { who: "owen", text: "But neither one made the colonies independent." },
    { who: "limits", text: "Independence and representation are not the same question." },
    { who: "curator", text: "Exactly. Our label needs to explain what made each example representative — and what its limits were." }
  ],
  selfCheckQuestions: [
    "Did I identify the Mayflower Compact as an example of colonial self-government?",
    "Did I identify the Virginia House of Burgesses as an elected representative assembly?",
    "Did I explain what makes each example representative instead of only naming it?",
    "Did I explain that representative practices could exist while the colonies were still under British authority?",
    "Did I avoid claiming that colonial representative government included everyone equally?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Owen believe about colonial representative government?", placeholder: "Put his claim in your own words..." },
  { key: "compact", label: "What representative feature appears in the Mayflower Compact?", placeholder: "What did settlers agree to do? Why does that matter?" },
  { key: "burgesses", label: "What representative feature appears in the House of Burgesses?", placeholder: "Who chose representatives, and what did they do?" },
  { key: "limits", label: "What historical limits should your explanation include?", placeholder: "Who was not fully included in political participation?" },
  { key: "judgment", label: "Why can both examples count even though Britain still had authority?", placeholder: "Explain the difference between colonial representation and full independence..." }
];

export const PUSH_ANGLE = "Exhibit Label Repair: write one museum label that names both examples and explains the different representative feature in each.";
