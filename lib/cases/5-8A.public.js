// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  zippy: { name: "Zippy the Sneaker", emoji: "\ud83d\udc5f", color: "#F2A93B", hint: "Proud that he thinks he runs on foot power alone." },
  benny: { name: "Benny the Button Battery", emoji: "\ud83d\udd0b", color: "#22C55E", hint: "The real chemical-energy source, hiding in the sole." },
  sparks: { name: "Sparks the Switch", emoji: "\ud83d\udd18", color: "#00C2C7", hint: "Just opens the path \u2014 doesn't make energy himself." },
  cole: { name: "Cole the Kid", emoji: "\ud83e\uddd2", color: "#7B5DFF", hint: "Made a bet with a friend and needs the real answer." }
};

export const PUBLIC_CASE = {
  standard: "5.8A",
  title: "The Self-Powered Sneakers",
  bigQuestion: "Do light-up sneakers really run on foot power, or is something else going on?",
  trapLine: "I run on foot power \u2014 no battery, just my own steps making the light.",
  evidenceBank: [
    "Sneaker still lights up when held still and the hidden button is pressed by hand (no footstep at all)",
    "Opening the sole reveals a coin-cell battery and a small switch",
    "Battery rating: 3 volts, chemical energy stored inside",
    "Bulb feels warm after lighting for a minute \u2014 some energy becomes heat, not just light"
  ],
  coldOpenMessages: [
    { who: "system", text: "Cole made a bet with a friend about how his light-up sneakers actually work." },
    { who: "cole", text: "My friend says there's a battery in here. That's not true, right, Zippy?" },
    { who: "zippy", text: "Nope! I run on foot power \u2014 no battery, just my own steps making the light." },
    { who: "cole", text: "Okay but watch this \u2014 I'm holding you totally still and pressing this little button..." },
    { who: "sparks", text: "Click. There it is. Lit up with zero footsteps involved." },
    { who: "cole", text: "What?! Let's open the sole and look." },
    { who: "benny", text: "Hi. I've been in here the whole time. 3 volts, ready to go." },
    { who: "zippy", text: "I run on foot power \u2014 no battery, just my own steps making the light." }
  ],
  selfCheckQuestions: [
    "Did I name all three energy forms in the right order?",
    "Did I identify what the true starting energy source actually is?",
    "Did I explain what the footstep's real job is?",
    "Did I mention that some energy turns into heat?",
    "Did I say whether Zippy's \"foot power\" claim is really true?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Zippy believe?", placeholder: "In your own words, what is Zippy's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Zippy's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students trace the energy chain in a different device (wind-up toy or solar calculator) from start to finish.";
