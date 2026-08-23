// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.8C, TEKS 4.8C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  zoe: { name: "Zoe All-Good", emoji: "👍", color: "#F59E0B", hint: undefined },
  benefit: { name: "Ben Benefit File", emoji: "💧", color: "#3B82F6", hint: undefined },
  habitat: { name: "Hana Habitat File", emoji: "🐟", color: "#22C55E", hint: undefined },
  community: { name: "Cora Community File", emoji: "🏘️", color: "#8B5CF6", hint: undefined },
  judge: { name: "Jace Tradeoff Judge", emoji: "⚖️", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.8C",
  title: "Worth the Tradeoff?",
  bigQuestion: "How can one change to the Texas environment create both positive and negative consequences?",
  trapLine: "If a modification helps people, then it is a good change with no real downside.",
  evidenceBank: [
    "A dam can store water, help control floods, create electricity, and support recreation.",
    "A dam can flood land, change habitats, and affect plants, animals, or nearby communities.",
    "A strong decision weighs benefits and costs instead of looking at only one side."
  ],
  coldOpenMessages: [
    { who: "system", text: "A town is debating a new dam. One student says that if the dam provides water and electricity, the decision is obviously good." },
    { who: "zoe", text: "If the dam gives us water and power, why keep looking for problems?" },
    { who: "benefit", text: "There are real benefits, and we should count them." },
    { who: "habitat", text: "Changing a river can also change habitats and wildlife." },
    { who: "community", text: "Flooding land can affect homes, farms, or places people use." },
    { who: "judge", text: "A good decision needs both sides of the evidence." }
  ],
  selfCheckQuestions: [
    "Did I explain at least one positive consequence?",
    "Did I explain at least one negative consequence?",
    "Did I consider effects on both people and the environment?",
    "Did I compare benefits and costs instead of choosing a side immediately?",
    "Did I support my final judgment with evidence?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "benefit", label: "What is one positive consequence?", placeholder: "Use the benefit evidence..." },
  { key: "cost1", label: "What is one negative consequence?", placeholder: "Use habitat evidence..." },
  { key: "cost2", label: "What is another negative or community consequence?", placeholder: "Use a different source..." },
  { key: "compare", label: "Who benefits and who or what could be harmed?", placeholder: "Compare perspectives..." },
  { key: "decision", label: "Does the modification seem worth the tradeoff? Why?", placeholder: "Use both benefits and costs..." }
];

export const PUSH_ANGLE = "Council Vote: cast a yes/no vote on the dam and defend it with one benefit and one cost.";
