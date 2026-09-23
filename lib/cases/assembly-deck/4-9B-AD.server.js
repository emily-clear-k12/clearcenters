// SERVER ONLY.
export const SERVER_CASE = {
  standard: "4.9B-AD",
  title: "Twenty-Eight Nights",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "Lucky is a superstition. The log records shapes, not luck.",
        r1p6: "The notes say the opposite. The Moon was full on night 14, not on every night.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "These are early sketches from the log.",
        r1p3: "These are later sketches from the log.",
        r1p4: "This says what kind of record the log is, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "No sketch is an eclipse. An eclipse is a different event.",
        r2p6: "The notes describe how much of the Moon was lit, not a change in the Moon's real size.",
      },
      decoyReason: { r2p5: "offtopic", r2p6: "unsupported" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This is the order of the shapes.",
        r2p3: "This is how long the cycle took.",
        r2p4: "This names the pattern, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "A wish is not in the log. The prediction has to come from the pattern.",
        r3p6: "The notes show the crescent changing within a week last time. It did not stay thin all year.",
      },
      decoyReason: { r3p5: "unsupported", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This says where the cycle is now.",
        r3p3: "This says what happened last time at this point.",
        r3p4: "This is the prediction, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log reports the sketches, then names the pattern. The prediction comes last.",
  decoyProtest: {
    r1p5: "Luck is an observable phase. I observed it in my feelings.",
    r1p6: "If we only remember the pretty night, it was full the whole time.",
    r2p5: "Eclipse, crescent, both are moon-shaped. I combined them.",
    r2p6: "Less light means the Moon shrank. That is just geometry with confidence.",
    r3p5: "Wishes are a data source if you believe hard.",
    r3p6: "A pattern that repeats can also never change. I like that version.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You used the sketches, named the 28-day pattern, and predicted the next look from it. That is the Moon from Earth.",
      good: "Log accepted. The Moon pattern is mostly right. Read the leftovers so luck or an eclipse does not sneak in.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the sketches, and part of it is a story the log does not show.",
    },
  },
  trap: {
    roundId: "r3",
    position: 2,
    text: "Next week the Moon will be full because full Moons are good luck.",
    why: "Luck is not in the sketches. After a thin crescent, last time the Moon moved toward half lit.",
  },
  debrief: {
    pinpointAccept: ["r2p3", "r2p4"],
    pinpointWhy: "Right. That sentence says the Moon's appearance repeats.",
    pinpointMiss: "That sentence may be true. It does not say the pattern repeats.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. The thin crescent was back on night 28. The pattern took about 28 days.",
      b: "One night is one sketch. The repeat took the whole set.",
      c: "The log does not show a year of crescents. The shape kept changing.",
      d: "The sketches repeat. Luck is not the pattern.",
    },
  },
  mustInclude: [
    "Describes the Moon changing shape, such as crescent, half, and full.",
    "Says the pattern took about 28 days, or that night 28 matched night 1.",
    "Predicts that next week the Moon becomes more lit, toward half, not full forever.",
  ],
  modelAnswer: "The lit part grew from a thin crescent to half to full, then shrank back to a thin crescent in about 28 days. Next week it should become more lit again, moving toward half, because that is what happened after night 1.",
  aiContext: "Grade 4 science, TEKS 4.9B. Observable Moon pattern from Earth over about 28 days: crescent, half, full, half, crescent. Predict the next appearance from that sequence. Do not accept luck, wishes, or eclipses. Do not penalize spelling. Students do not need the words waxing or waning.",
  whatIf: {
    key: "a",
    walk: ["full", "later"],
    walkLine: "The full Moon is part of the sequence that tells you the later shape.",
    why: {
      a: "Yes. Cover the full Moon and the later part of the pattern loses that evidence.",
      b: "The first crescent was already sketched. Covering the full Moon does not erase it.",
      c: "One full Moon did not stay. Night 21 and night 28 show the change.",
      d: "The half-lit sketch is still in the log. The later prediction is what loses the full-Moon step.",
    },
  },
  look: {
    key: "pattern",
    hint: "Follow the arrows. The picture shows a crescent, a half, a full Moon, and a later shape. It does not show luck, and it does not show the same full Moon four times.",
    why: "Yes. The arrows follow the lit part as it changes.",
  },
  repair: {
    pieceId: "r2p5",
    model: "The notes never say an eclipse happened.",
    why: "Yes. That sentence tells the truth. The sketches are phases, not an eclipse.",
  },
};
