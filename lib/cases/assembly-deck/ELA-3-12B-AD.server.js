// SERVER ONLY.
// Assembly Deck — ELA.3.12B-AD.

export const SERVER_CASE = {
  standard: "ELA.3.12B-AD",
  title: "The Lunchroom Recycling Report",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "This is a story about you. It does not tell readers how the bins work.",
        r1p6: "The notes say the opposite. Every bin has a label.",
      },
      decoyReason: { r1p5: "story", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells readers what the paragraph is about.",
        r1p2: "This is a true detail from the notes.",
        r1p3: "This is a true detail from the notes.",
        r1p4: "This wraps it up, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "This is an opinion. Informational writing gives readers facts.",
        r2p6: "The garden is real, but this article is about the bins.",
      },
      decoyReason: { r2p5: "opinion", r2p6: "offtopic" },
      misplacementNotes: {
        r2p1: "This tells readers what the paragraph is about.",
        r2p2: "This is a true detail from the notes.",
        r2p3: "This is a true detail from the notes.",
        r2p4: "This ends the article, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "This is an opinion about punishment. The article tells readers how to help.",
        r3p6: "The notes say the helpers are there at lunch, not just Fridays.",
      },
      decoyReason: { r3p5: "opinion", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells readers what the paragraph is about.",
        r3p2: "A reader can actually do this.",
        r3p3: "A reader can actually do this.",
        r3p4: "This ends the article, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "First tell readers what the bins are. Then what changed. Then how to help.",
  decoyProtest: {
    r1p5: "But the banana peel story is GOOD. Everybody laughed. Ask anyone.",
    r1p6: "No labels! ...There are labels. I can see them from here.",
    r2p5: "Most important thing EVER. I stand by it. Loudly. With no evidence.",
    r2p6: "The garden is lovely though. Doesn't the garden get a paragraph?",
    r3p5: "Lose their recess! Sorting is serious! ...That's me being bossy, not informative.",
    r3p6: "Only Fridays! ...The notes say lunch. Every lunch. I made Fridays up.",
  },
  requester: { name: "Ms. Alvarez", emoji: "📰", replies: {
    great: "This is going in the newsletter exactly as you built it. You told readers what the bins are, what changed, and how to help — and you kept the opinions and the funny stories out. That is informational writing.",
    good: "Nice work — this is printable. A sentence or two crept in that was more your opinion than information, but readers will learn what they need to know.",
    rough: "Good start. Right now some of it is telling readers facts and some of it is telling them what you think. Let's read it together and sort out which is which.",
  } },
  trap: { roundId: "r2", position: 2, text: "Everyone in the school loves the new bins.", why: "Nobody counted. \"Everyone loves it\" sounds like information but it is an opinion wearing a fact's coat." },
  debrief: {
    pinpointAccept: ["r2p2"],
    pinpointWhy: "Right. A number is proof a reader can check. \"The bins help\" is only a claim until a number backs it up.",
    pinpointMiss: "That sentence sounds good, but it has no number in it. Look for the one that counts something.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. A fact with a number is something a reader can go and check.",
      b: "Length does not make writing true. A short fact beats a long guess.",
      c: "Feelings belong in an opinion piece. This article reports what happened.",
      d: "Making a reader laugh is a fine goal, but it is not what this article is for.",
    },
  },
  mustInclude: [
    "Names one thing a student can do at lunch — match trash to the picture, or ask a fifth-grade helper.",
    "Says which paragraph tells them, or names it as the last paragraph.",
    "Gives a reason the how-to-help part comes last, such as that the reader needs to know about the bins first.",
  ],
  modelAnswer: "My article tells students to match their trash to the picture on the bin, and to ask a fifth-grade helper if they are not sure. That is the last paragraph. It comes last because a reader has to know what the bins are and that they are working before they will want to help.",
  aiContext: "Grade 3 ELAR, TEKS 3.12B. Target idea: informational writing is organized on purpose, and the call to action lands after the reader has the facts. Accept simple phrasing like \"you have to know about it first.\" Accept 'the last one' or 'the third paragraph' for the paragraph. Do not penalize spelling.",
};
