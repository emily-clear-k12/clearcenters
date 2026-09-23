// SERVER ONLY. Never import from a client component.
// Assembly Deck — 3.11B-AD.

export const SERVER_CASE = {
  standard: "3.11B-AD",
  title: "The Water Bill",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "This blames the kids. The notes never say how anyone feels.",
        r1p6: "The notes say the opposite. The meter went up, not down.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "The custodian wrote this number down. It is a detail.",
        r1p3: "This compares the two readings. It is a detail.",
        r1p4: "This is what the numbers add up to, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "No note mentions a pool. That claim has no evidence.",
        r2p6: "Recycling cans is a different kind of saving. These notes are about water.",
      },
      decoyReason: { r2p5: "unsupported", r2p6: "offtopic" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This is one fact the custodian wrote.",
        r2p3: "This is the next fact the custodian wrote.",
        r2p4: "This names the use that matches, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "Yelling is an opinion about what people deserve. The notes name a hose.",
        r3p6: "The notes say the bathrooms looked normal. The hose is the big use.",
      },
      decoyReason: { r3p5: "opinion", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is the fix the notes support.",
        r3p3: "This says why a different fix is not first.",
        r3p4: "This says what to do next, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log says the meter went up, then where the water went. Only then does it say what to shut off.",
  decoyProtest: {
    r1p5: "Feelings are data if I feel them loudly enough.",
    r1p6: "Down, up, the meter is shy. It depends how you hold it.",
    r2p5: "Every school has a secret pool. I have decided this.",
    r2p6: "Cans are basically water. If you squint. And care about cans.",
    r3p5: "A good yell saves at least forty units. Trust me.",
    r3p6: "Bathrooms are mysterious. They must be guilty.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You used the meter, found the hose, and said to shut that first. That is conservation with evidence.",
      good: "Log accepted. The water story is mostly right. Read the leftovers so a guess does not sneak into the next bill.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the meter, and part of it is a guess about who to blame.",
    },
  },
  trap: {
    roundId: "r2",
    position: 2,
    text: "The hose ran because the gardeners are lazy and wasteful.",
    why: "Lazy and wasteful is a feeling. The notes only show that the hose was left running.",
  },
  debrief: {
    pinpointAccept: ["r1p1", "r1p2", "r1p3"],
    pinpointWhy: "Right. That sentence says the school used more water.",
    pinpointMiss: "That sentence may be true. It does not say the school used more water.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. The hose ran all week. Shut that first.",
      b: "The fountain was already off. It is not the extra use.",
      c: "The bathrooms looked the same. The notes do not blame them.",
      d: "The meter went up, from 40 to 90. It did not go down.",
    },
  },
  mustInclude: [
    "Says the meter went up, or that the school used more water.",
    "Names the hose that was left running.",
    "Says to shut the hose first, or to stop that waste.",
  ],
  modelAnswer: "The bill jumped because the meter went from 40 units to 90. The hose was left running, and the fountain was already off. The school should shut the hose first.",
  aiContext: "Grade 3 science, TEKS 3.11B. Conservation of a natural resource, water. The evidence is a meter increase and a hose left running. The fountain was off and the bathrooms looked normal, so they are not the first fix. Accept simple words. Do not penalize spelling.",
  whatIf: {
    key: "a",
    walk: ["hose", "garden", "puddle"],
    walkLine: "The hose feeds the garden. The extra water ends in the puddle.",
    why: {
      a: "Yes. Shut the hose and the garden stops getting that extra water. The puddle goes too.",
      b: "The puddle would go. The soaked garden would stop first, because the hose feeds it.",
      c: "The meter does not pour water by itself. The hose does.",
      d: "The garden would dry. The puddle is the same extra water, so it goes too.",
    },
  },
  look: {
    key: "hose",
    hint: "Follow the arrows. The picture shows a hose, a wet garden, and a puddle. It does not show a fountain using the water, and it does not say anyone is bad.",
    why: "Yes. The arrows go from the hose to the soaked garden to the puddle.",
  },
  repair: {
    pieceId: "r2p5",
    model: "The notes never say there is a pool under the gym.",
    why: "Yes. That sentence tells the truth. The notes never showed a pool.",
  },
};
