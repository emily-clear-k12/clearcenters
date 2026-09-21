// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.5.8A. TEKS 5.8A — infer multiple themes within a text using text evidence.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  noah: { name: "Noah", emoji: "🎬", color: "#F59E0B", hint: "Can retell anything in perfect detail." },
  lucia: { name: "Lucia", emoji: "🎺", color: "#EF4444", hint: "From the play. Is a person, not a summary." },
  stage: { name: "Stage Directions", emoji: "🎭", color: "#8B5CF6", hint: "Speaks only in brackets." },
  question: { name: "Question", emoji: "❓", color: "#3B82F6", hint: "Keeps pointing at the S on 'themes.'" },
  grant: { name: "Ms. Grant", emoji: "🎤", color: "#0D9488", hint: "The drama club director." }
};

export const PUBLIC_CASE = {
  standard: "ELA.5.8A",
  title: "That's Just the Plot",
  bigQuestion: "The question asks for the themes of 'Lucia Plays Solo.' What are they?",
  trapLine: "The theme is that Lucia moved to a new town, joined the band, and played at the concert.",
  evidenceBank: [
    "In Scene One, Lucia sits alone and says she is not ready for tryouts",
    "In Scene Two, Lucia plays her first solo even though her hands are shaking",
    "At the end, the band stands and cheers for Lucia",
    "The question asks for themes — more than one",
    "A theme is a lesson that could apply outside the story"
  ],
  coldOpenMessages: [
    { who: "system", text: "The drama club is reading a two-scene play called 'Lucia Plays Solo.'" },
    { who: "system", text: "SCENE ONE. [A school cafeteria. Lucia, new this year, sits alone with her trumpet case.] BAND KID: \"Band tryouts are after school today.\" LUCIA: \"I'm new. I don't think I'm ready.\"" },
    { who: "system", text: "SCENE TWO. [Months later. The spring concert. Lucia steps out of the band's row to the microphone for her first solo. Her hands are shaking.] LUCIA (quietly): \"Okay.\" [She plays. When she finishes, the whole band stands up and cheers.]" },
    { who: "stage", text: "[Lucia alone at a table.] [Lucia alone at the microphone.] [The whole band standing.] I'd notice how those change." },
    { who: "lucia", text: "I'm not a plot summary. I'm a person. I went from eating alone to having a whole band stand up for me." },
    { who: "question", text: "Excuse me. Look at my last letter. THEMES. With an S." },
    { who: "grant", text: "Noah, what are the themes of the play?" },
    { who: "noah", text: "The theme is that Lucia moved to a new town, joined the band, and played at the concert." }
  ],
  selfCheckQuestions: [
    "Did I explain the difference between a plot summary and a theme?",
    "Did I find more than one theme?",
    "Did I write each theme as a lesson, without Lucia's name?",
    "Did I use evidence from both scenes?",
    "Did I use the stage directions?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Noah believe?", placeholder: "In your own words, what is Noah's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Noah's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them which of the two themes they think matters more in the play, and to defend it with one line of evidence.";
