// SERVER ONLY. Never import from a "use client" component — the keys and the
// decoy reasons would end up in the browser bundle.
// Assembly Deck — 3.6A-AD.

export const SERVER_CASE = {
  standard: "3.6A-AD",
  title: "The Sorting Bin Report",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "This is an opinion about the bolts, not something the magnet test showed.",
        r1p6: "The notes say the opposite — only the steel bolts and the iron washer were pulled.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about, so it opens it.",
        r1p2: "This is something Rios recorded — a detail.",
        r1p3: "This is something Rios recorded — a detail.",
        r1p4: "This is what the details add up to, so it closes the paragraph.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "Rios never tested heat, so the notes cannot show this.",
        r2p6: "This is an opinion about how easy science is, not a fact about the test.",
      },
      decoyReason: { r2p5: "unsupported", r2p6: "opinion" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about, so it opens it.",
        r2p2: "This explains what the test does measure — a detail.",
        r2p3: "This names what was never tested — a detail.",
        r2p4: "This says what the crew should do next, so it closes the paragraph.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "Nothing in the notes says those parts are useless — copper, aluminum, plastic, and rubber all have jobs.",
        r3p6: "True, but how long Rios has been here has nothing to do with storing the parts.",
      },
      decoyReason: { r3p5: "unsupported", r3p6: "offtopic" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about, so it opens it.",
        r3p2: "This is a step the test makes possible — a detail.",
        r3p3: "This is a step the test makes possible — a detail.",
        r3p4: "This says why it matters, so it closes the paragraph.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log has to say what the test showed before it can say what the test missed, and it can only recommend storage once both are on the record.",
  decoyProtest: {
    r1p5: "Useful! I said USEFUL! That's practically a measurement!",
    r1p6: "Every part? ...Fine. Most parts. Some parts. One part. I'll see myself out.",
    r2p5: "Heat, magnets, same energy, who's counting?",
    r2p6: "I'm encouraging! Science IS easy! ...That's not a fact either, is it.",
    r3p5: "Throw them out! They didn't stick! ...To a magnet. Only to a magnet. Hm.",
    r3p6: "Two whole years! That's relevant to something, surely.",
  },
  requester: { name: "Chief Okafor", emoji: "🛠️", replies: {
    great: "Log accepted, Cadet. You said what the test showed, what it missed, and what to do next — and you kept the guesses out of it. That is what a log is for.",
    good: "Log accepted. A couple of the sentences you let through were doing less work than you thought, but the report holds up. Read it once more before the next crate spills.",
    rough: "Log received. Come find me and we'll read it together — half of what you wrote is the test, and half is what somebody assumed. Learning to tell those apart is the whole job.",
  } },
  trap: { roundId: "r1", position: 2, text: "The bolts jumped to the magnet because they wanted to be sorted first.", why: "Objects do not want anything. That sentence explains a magnet with a feeling instead of a property." },
  mustInclude: [
    "Names at least two sentences that were left out.",
    "Gives a real reason for each — an opinion, the opposite of the notes, or something Rios never tested.",
    "Uses the word property, or describes being pulled by a magnet as a property of the material.",
  ],
  modelAnswer: "I left out the sentence about steel being the most useful part because that is an opinion. I left out the sentence about every part being pulled because the notes say only the bolts and washer were. Being pulled by a magnet is a property of the material, and the test only checked that one property.",
  aiContext: "Grade 3 science. Target idea: a magnet test classifies matter by ONE physical property and cannot tell you about other properties. Accept simple phrasing and do not require the word 'property' if the student clearly describes the idea in their own words. Do not penalize spelling.",
};
