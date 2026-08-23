// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.2A, TEKS 5.2A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.2A, for example).

export const CAST = {
  ned: { name: "Ned Turner", emoji: "📰", color: "#F59E0B", hint: "Thinks one dramatic event explains the whole conflict." },
  abigail: { name: "Abigail Hart", emoji: "📦", color: "#22C55E", hint: "Knows why colonists were already protesting." },
  samuel: { name: "Samuel Reed", emoji: "⚓", color: "#3B82F6", hint: "Knows what led to the harbor protest." },
  eliza: { name: "Eliza Warren", emoji: "🗂️", color: "#8B5CF6", hint: "Keeps the timeline from getting scrambled." },
  thomas: { name: "Thomas Bell", emoji: "🖋️", color: "#0D9488", hint: "Won't print a headline that leaves out half the story." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.2A",
  title: "The Tea Party Blame Game",
  bigQuestion: "Did the Boston Tea Party start the conflict between Britain and the colonies, or was it one part of a bigger chain of causes and effects?",
  trapLine: "The Tea Party is what started all this. Before those men dumped the tea, Britain and the colonies weren't really fighting.",
  evidenceBank: [
    "The French and Indian War came before the Tea Party",
    "Colonists protested British policies before 1773",
    "Britain took new actions after the Tea Party"
  ],
  coldOpenMessages: [
    { who: "system", text: "Boston, 1774. Bell's Print Shop is preparing a broadside explaining how the conflict with Britain reached this point. The group needs a headline before the page can go to press." },
    { who: "thomas", text: "We need a headline that explains how things got this bad." },
    { who: "ned", text: "Easy. THE TEA PARTY STARTED IT ALL." },
    { who: "eliza", text: "All of it? The Tea Party was in 1773." },
    { who: "ned", text: "Exactly. The tea gets dumped, Britain gets furious, and now everything is falling apart." },
    { who: "abigail", text: "My father's shop was joining boycotts years before the tea ended up in the harbor." },
    { who: "ned", text: "People complain about taxes. That's different." },
    { who: "samuel", text: "You think that tea was dumped for no reason?" },
    { who: "eliza", text: "And my timeline starts with the French and Indian War, years before the Tea Party." },
    { who: "ned", text: "Then prove those things are actually connected." }
  ],
  selfCheckQuestions: [
    "Did I explain what happened after the French and Indian War that increased tension with the colonies?",
    "Did I explain at least one way colonists responded to British taxes or policies before the Tea Party?",
    "Did I explain why the Boston Tea Party happened instead of treating it as a random event?",
    "Did I explain what happened after the Tea Party and how it increased conflict?",
    "Did I clearly explain why the Tea Party was an important part of a larger chain, not the single cause?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Ned believe caused the conflict?", placeholder: "In your own words, what is Ned claiming?" },
  { key: "before", label: "What happened BEFORE the Boston Tea Party?", placeholder: "Record earlier events and evidence..." },
  { key: "after", label: "What happened AFTER the Boston Tea Party?", placeholder: "Record later effects and responses..." },
  { key: "connections", label: "How are the events connected?", placeholder: "Explain the cause-and-effect links you notice..." },
  { key: "judgment", label: "Does Ned's claim hold up? Why or why not?", placeholder: "Use the chain of evidence to evaluate his claim..." }
];

export const PUSH_ANGLE = "Headline Repair: revise 'THE TEA PARTY STARTED IT ALL' into a historically stronger headline, then add two sentences explaining what happened before the Tea Party and what changed after it.";
