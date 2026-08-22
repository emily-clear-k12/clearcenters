// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  freddy: { name: "Freddy the Fast-Forward Geologist", emoji: "\ud83c\udfa5", color: "#F2A93B", hint: "Claims he made real rock in 5 minutes." },
  lenny: { name: "Lenny the Layer", emoji: "\ud83e\udea8", color: "#8B5CF6", hint: "Layers stack up slowly over time." },
  pearl: { name: "Pearl the Pressure", emoji: "\ud83d\udddc\ufe0f", color: "#697386", hint: "Does her squeezing job over long spans." },
  faye: { name: "Faye the Fact-Checker", emoji: "\ud83d\udd0d", color: "#00C2C7", hint: "Needs the truth before reposting or debunking." }
};

export const PUBLIC_CASE = {
  standard: "5.10B",
  title: "The Viral Rock Video",
  bigQuestion: "Could a viral video really show \"real sedimentary rock\" made in 5 minutes with a hydraulic press?",
  trapLine: "Watch this \u2014 dirt plus a good squish, and BAM, instant rock! Didn't even need a lunch break.",
  evidenceBank: [
    "A real rock sample shows 5 distinct visible layers (bands) of compacted sediment",
    "Coal sample: compressed plant material, geologic record shows millions of years",
    "Compacting loose sediment into solid rock requires sustained pressure over long spans, not a single squeeze",
    "Side-by-side comparison: a real layered model builds gradually vs. the video's \"instant\" claim"
  ],
  coldOpenMessages: [
    { who: "system", text: "Freddy just posted a viral video claiming he made real sedimentary rock in five minutes." },
    { who: "freddy", text: "Watch this \u2014 dirt plus a good squish, and BAM, instant rock! Didn't even need a lunch break." },
    { who: "faye", text: "This is getting thousands of shares. Before I debunk it or repost it, I need the real story." },
    { who: "lenny", text: "I can tell you it doesn't work like that. I take my time stacking up, layer by layer." },
    { who: "pearl", text: "And I don't do my squeezing in five minutes either \u2014 I work on things over long, long spans." },
    { who: "faye", text: "Show me a real sample. What am I actually looking at?" },
    { who: "lenny", text: "Five distinct layers, right here, each one laid down over serious time." },
    { who: "freddy", text: "Watch this \u2014 dirt plus a good squish, and BAM, instant rock! Didn't even need a lunch break." }
  ],
  selfCheckQuestions: [
    "Did I name at least two things rock formation actually needs?",
    "Did I use the layers or the time evidence to challenge the video's claim?",
    "Did I explain what's wrong with Freddy's claim specifically?",
    "Did I connect coal to compressed plant material over time?",
    "Did I say whether rock formation is really a fast process?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Freddy believe?", placeholder: "In your own words, what is Freddy's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Freddy's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students design a simple layered model (sand/clay) to demonstrate how sediment and pressure build rock over simulated \"fast-forward\" time.";
