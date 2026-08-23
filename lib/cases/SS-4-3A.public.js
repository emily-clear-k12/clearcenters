// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.3A, TEKS 4.3A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  max: { name: "Max Alamo", emoji: "🏰", color: "#F59E0B", hint: undefined },
  cause: { name: "Clara Cause File", emoji: "⚠️", color: "#3B82F6", hint: undefined },
  decl: { name: "Diego Declaration File", emoji: "📜", color: "#22C55E", hint: undefined },
  scrape: { name: "Ruby Runaway Scrape", emoji: "🏃", color: "#8B5CF6", hint: undefined },
  san: { name: "Sam San Jacinto", emoji: "⭐", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.3A",
  title: "What Really Pushed Texas to Revolution?",
  bigQuestion: "How did several causes and events connect to the Texas Revolution and its effects?",
  trapLine: "The Battle of the Alamo is what caused the Texas Revolution.",
  evidenceBank: [
    "Tensions between Texas settlers and the Mexican government had already grown before the Alamo.",
    "The Texas Declaration of Independence was adopted during the revolution.",
    "The Runaway Scrape and Battle of San Jacinto happened after the Alamo."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student writes a headline: 'THE ALAMO STARTED THE TEXAS REVOLUTION.' The class must test whether that headline fits the timeline." },
    { who: "max", text: "The Alamo happened, then the Revolution happened. So the Alamo started it." },
    { who: "cause", text: "The conflict had causes before the Alamo." },
    { who: "decl", text: "The declaration shows the conflict had become a fight for independence." },
    { who: "scrape", text: "Families fled east during the Runaway Scrape as the Mexican army advanced." },
    { who: "san", text: "San Jacinto belongs near the end of the revolution story, not the beginning." }
  ],
  selfCheckQuestions: [
    "Did I explain that causes existed before the Alamo?",
    "Did I include at least two major events from the Texas Revolution?",
    "Did I place events in a logical sequence?",
    "Did I explain an effect of the Battle of San Jacinto?",
    "Did I explain why the Alamo was important but not the single cause of the revolution?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Max claiming?", placeholder: "State the Alamo-only claim..." },
  { key: "before", label: "What happened before the Alamo?", placeholder: "Use cause evidence..." },
  { key: "during", label: "What major events happened during the revolution?", placeholder: "Use two events..." },
  { key: "after", label: "What effect followed San Jacinto?", placeholder: "Explain the result..." },
  { key: "conclusion", label: "Why is the Alamo not the single cause?", placeholder: "Use chronology + cause/effect..." }
];

export const PUSH_ANGLE = "Timeline Repair: place four major events in order and add one cause/effect sentence between them.";
