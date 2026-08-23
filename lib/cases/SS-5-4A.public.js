// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.4A, TEKS 5.4A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.4A, for example).

export const CAST = {
  caleb: { name: "Caleb Pierce", emoji: "📰", color: "#F59E0B", hint: "Wants one cause and one headline." },
  jonah: { name: "Jonah Reed", emoji: "⚓", color: "#3B82F6", hint: "Knows why sailors were furious with Britain." },
  ruth: { name: "Ruth Mercer", emoji: "🧭", color: "#22C55E", hint: "Knows why western conflict mattered." },
  lydia: { name: "Lydia Brooks", emoji: "🧵", color: "#8B5CF6", hint: "Saw the war change what American businesses made." },
  cole: { name: "Henry Cole", emoji: "✒️", color: "#0D9488", hint: "Won't publish until causes and effects are sorted." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.4A",
  title: "The One-Reason War",
  bigQuestion: "Was the War of 1812 mainly caused by a fight over territory, or did several problems push the United States toward war — and what changed because of it?",
  trapLine: "The War of 1812 was basically a fight over land. That's the reason the United States went to war.",
  evidenceBank: [
    "Territorial disputes were part of the tension",
    "American sailors faced problems at sea",
    "American production changed during the war"
  ],
  coldOpenMessages: [
    { who: "system", text: "Baltimore, 1815. The fighting has ended, and the Gazette is preparing a special issue explaining the War of 1812. The staff has one problem: everyone seems to give a different reason for why the war happened." },
    { who: "cole", text: "We need a headline that actually explains this war." },
    { who: "caleb", text: "Already have it: AMERICA FIGHTS FOR THE WEST." },
    { who: "ruth", text: "Territory mattered. I'll give you that." },
    { who: "jonah", text: "But I spent years hearing sailors talk about British ships stopping Americans at sea." },
    { who: "caleb", text: "That was a shipping problem. Wars are about bigger things." },
    { who: "jonah", text: "Being taken off your own ship and forced into another navy sounds pretty big." },
    { who: "lydia", text: "And while you two argue about causes, my shop shelves look completely different than they did before the war." },
    { who: "caleb", text: "What does your shop have to do with why we fought Britain?" },
    { who: "cole", text: "Maybe that's the question we need answered." }
  ],
  selfCheckQuestions: [
    "Did I explain how impressment increased conflict between the United States and Britain?",
    "Did I explain why territorial conflict also mattered?",
    "Did I make clear that the war had more than one cause?",
    "Did I explain how the war contributed to increased U.S. manufacturing?",
    "Did I clearly distinguish causes of the war from effects of the war?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Caleb believe caused the war?", placeholder: "State Caleb's one-reason explanation..." },
  { key: "sea", label: "What evidence shows a problem at sea?", placeholder: "Record what Jonah tells you about impressment..." },
  { key: "territory", label: "What evidence shows conflict involving territory?", placeholder: "Record what Ruth tells you about western conflict..." },
  { key: "effect", label: "What changed in the U.S. economy because of the war?", placeholder: "Record Lydia's evidence about trade and production..." },
  { key: "judgment", label: "Does Caleb's explanation account for all the evidence? Why or why not?", placeholder: "Separate the causes from the effects in your explanation..." }
];

export const PUSH_ANGLE = "Fix the Headline: revise 'AMERICA FIGHTS FOR THE WEST' into a headline that reflects more than one cause, then add a short note identifying one effect of the war on U.S. manufacturing.";
