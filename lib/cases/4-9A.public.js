// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.9A).

export const CAST = {
  chill: { name: "Chill", emoji: "❄️", color: "#3B82F6", hint: "Takes credit for early sunsets." },
  log: { name: "The Sunset Log", emoji: "📋", color: "#22C55E", hint: "Four seasons of times on a door frame." },
  daylight: { name: "Daylight", emoji: "🌤️", color: "#F59E0B", hint: "Counts her own hours." },
  nov: { name: "The Warm Week", emoji: "🍂", color: "#8B5CF6", hint: "Warm — and sunset still slid earlier." },
  porch: { name: "The Porch Light", emoji: "💡", color: "#EF4444", hint: "Has been coming on earlier since August." },
  devi: { name: "Devi", emoji: "🚲", color: "#0D9488", hint: "Needs a time for March 20th." }
};

export const PUBLIC_CASE = {
  standard: "4.9A",
  title: "Chill Takes Credit for Sunset",
  bigQuestion: "Sunset moved from 8:40 in June to 5:31 in December. Is the cold making that happen, or is something else?",
  trapLine: "The cold makes the sun clock off early. Short days are my doing.",
  evidenceBank: [
    "Sunset was 8:40 in June and 5:31 in December",
    "Sunset had already been getting earlier for eight weeks before the first cold day",
    "During the warm week in November, sunset kept getting earlier anyway",
    "June has about 14 hours of daylight and December about 10",
    "The same sequence repeats in the same order every year"
  ],
  coldOpenMessages: [
    { who: "system", text: "Home before dark. The rule has not changed all year. What counts as dark has moved by more than three hours." },
    { who: "devi", text: "I need a time for March 20th. Not a guess — I want to work it out, because then I can do it for any date." },
    { who: "log", text: "I have four points for you. June 21st, 8:40. September 21st, 7:22. December 21st, 5:31. March 21st, 7:38." },
    { who: "devi", text: "So it goes down and then back up. That's not random, that's a shape." },
    { who: "daylight", text: "It's a shape I keep. Fourteen hours in June, ten in December. Same stretch, same shrink, same order, every year." },
    { who: "chill", text: "And who do you suppose arranges the December end of that, hmm?" },
    { who: "porch", text: "I'd query that, actually. I've been switching on earlier and earlier since August. Nobody had a coat out in August." },
    { who: "log", text: "That matches. Sunset had been sliding earlier for about eight weeks before the first cold day." },
    { who: "nov", text: "And there was that warm week in November. I was lovely. Sunsets kept getting earlier every single day of me." },
    { who: "chill", text: "A minor scheduling overlap. The cold makes the sun clock off early. Short days are my doing." }
  ],
  selfCheckQuestions: [
    "Did I describe the pattern the sunset times make across the year?",
    "Did I use how many hours of daylight there are, not just the sunset time?",
    "Did I use the fact that sunsets were already sliding earlier before the cold arrived?",
    "Did I use the warm week in November?",
    "Did I tell Chill directly what's wrong with her claim about causing short days?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Chill believe?", placeholder: "In your own words, what is Chill's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Chill's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them use the pattern to predict the sunset time for a date the log doesn't cover — mid-May — and say which two log entries they reasoned between.";
