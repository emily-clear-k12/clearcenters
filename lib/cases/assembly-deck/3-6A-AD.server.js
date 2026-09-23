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
        r1p5: "This is an opinion about the bolts. The test did not show it.",
        r1p6: "The notes say the opposite. Only the bolts and the washer were pulled.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "Rios wrote this down. It is a detail.",
        r1p3: "Rios wrote this down. It is a detail.",
        r1p4: "This is what the details add up to, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "Rios never tested heat, so the notes cannot show it.",
        r2p6: "This is an opinion about science, not a fact about the test.",
      },
      decoyReason: { r2p5: "unsupported", r2p6: "opinion" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This tells what the test does measure.",
        r2p3: "This names what was never tested.",
        r2p4: "This says what to do next, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "Nothing says those parts are useless. Copper, plastic, and rubber all have jobs.",
        r3p6: "True, but this paragraph is about storing the parts.",
      },
      decoyReason: { r3p5: "unsupported", r3p6: "offtopic" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is a step the test makes possible.",
        r3p3: "This is a step the test makes possible.",
        r3p4: "This says why it matters, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log says what the test showed, then what it missed. Only then can it say where the parts go.",
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
  debrief: {
    // Two sentences carry the idea, so both are accepted.
    pinpointAccept: ["r2p1", "r2p2"],
    pinpointWhy: "Right. A magnet checks one property. Floating, bending, and heat are other properties. Each one needs its own test.",
    pinpointMiss: "That sentence is true. But it does not say the test checks only one thing. Read the middle paragraph again.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. Being pulled by a magnet is the one property this test can show.",
      b: "Weight is a property too. But a magnet does not weigh anything.",
      c: "Floating is a property too. Rios never put the parts in water.",
      d: "Holding heat is a property too. Rios never tested heat.",
    },
  },
  mustInclude: [
    "Says the magnet test sorts the parts by whether a magnet pulls them.",
    "Names at least one thing the test cannot tell the crew — bending, floating, or holding heat.",
    "Uses the word property, or describes being pulled by a magnet as one property of a material.",
  ],
  modelAnswer: "The magnet test splits the pile into parts a magnet pulls and parts it does not. That is one property of the material. It will not tell the crew which parts bend, float, or hold heat. Each of those needs its own test.",
  aiContext: "Grade 3 science, TEKS 3.6A. Target idea: a magnet test classifies matter by ONE physical property and cannot tell you about other properties. Accept simple phrasing and do not require the word 'property' if the student clearly describes the idea in their own words. Do not penalize spelling.",
};
