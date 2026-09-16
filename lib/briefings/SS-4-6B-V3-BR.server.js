// Briefing SS-4-6B-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as the Grade 3 v3 lessons. The ungraded TEACHING steps keep their
// flags in the public pack — openingFrame.traits, each round's `stretch`, each
// round's PREDICTION (`best`), and contrastSynthesis.causes.
//
// What lives here is the step that carries the standard: naming WHY the two
// corners differ. Three causes, one per round, and they have to be three
// different ones or a student can tap the same answer every time. That is
// enforced by auditComparisonQuality and it is the reason round 2 exists at
// all — a lesson about wet Texas and dry Texas could easily blame rain three
// times and feel complete.
//
// Clearance c5 has no key: which corner a student's own home is more like is
// their call and goes to the teacher.

export const SERVER_BRIEFING = {
  id: "SS-4-6B-V3-BR",
  title: "Fifty-Five Inches and Nine",

  openingFrame: {
    lockMessage: "Locked in. HQ is not saying. You will work it out by visiting both.",
  },

  sideBySide: {
    rounds: {
      r1: {
        whyId: "rain",
        whyRight:
          "That is it. Fifty-five inches against under nine. Nobody builds a pipe to a field the sky is already filling.",
        whyWrong:
          "Both corners have people who want to grow something. Look at the one number that is wildly different between them.",
      },
      r2: {
        whyId: "edge",
        whyRight:
          "Yes. One corner runs into the sea and the other runs into another country. What is at the far side decides how things leave.",
        whyWrong:
          "El Paso would happily load a ship if it could. Something about where it sits means it never will. What is at the end of the road in each place?",
      },
      r3: {
        whyId: "shape",
        whyRight:
          "That is the whole idea. On flat you build wherever you like. On a mountainside you build where the mountain lets you.",
        whyWrong:
          "Both of the other two answers were right in an earlier round. This one is about what is underneath the towns, not what falls on them or what is past them.",
      },
    },
  },

  contrastSynthesis: {
    // "both" is the load-bearing answer. A student who puts every item in one
    // of the outside columns has learned that the two corners share nothing,
    // which is the opposite of what a comparison standard is for.
    sortAnswers: {
      cattle: "both",
      shipChannel: "home",
      pumped: "away",
      hot: "both",
      storms: "home",
      peak: "away",
      cotton: "both",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      cattle: "Both corners run cattle. The far west needs far more land per animal, but the animals are there.",
      shipChannel: "Only one of these corners has anywhere for an ocean ship to go.",
      pumped: "On the Coastal Plains a great deal of what grows is never piped at all. It rains.",
      hot: "Nobody in either corner enjoys August. This one is shared.",
      storms: "Storms off the water need water to come off. The far corner is six hundred miles from any.",
      peak: "The highest ground on the Coastal Plains would not get you out of breath.",
      cotton:
        "This is the tricky one. Cotton grows in both — rain-grown near the coast, irrigated out around Pecos and El Paso. Same crop, two completely different ways of getting it.",
    },
    sortDoneMessage: "Seven filed — and three of them belonged to both. That is the half people forget.",
    changeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. The pipes exist because the sky was not delivering. Start the deliveries and the pipes have no job.",
      wrongMessages: [
        null,
        "Rain does not flatten a mountain. That difference was never about water, and it would still be there the day after.",
        "Try it the other way round: why does anybody run a pipe to a field at all? Take away the reason and see whether the pipe survives.",
      ],
    },
  },

  matchPairs: {
    // r_bayou matches nothing. With four pairs and five cards the last match is
    // still a decision rather than whatever is left over.
    answerKey: {
      mp_ships: "r_channel",
      mp_wind: "r_flat",
      mp_ranch: "r_dry",
      mp_clear: "r_timbers",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — three real asks from three real regions.
    teksProjectIds: ["water_line", "pass_road", "deeper_channel"],
    distractorIds: [],
    projectReasonIds: {
      water_line: "rain",
      pass_road: "shape",
      deeper_channel: "edge",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "water", "well", "dry", "grow", "crop", "irrigate",
      "pass", "gap", "mountain", "road", "through", "truck",
      "ship", "channel", "port", "trade", "border", "out",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // The box is from the Great Plains — the High Plains, specifically, which
    // this lesson never taught. Every answer has one proof; only "how much
    // water arrives on its own" has TWO — the centre-pivot circle seen from the
    // air and the broken pump blade. Both of them are about water being lifted
    // rather than falling.
    //
    // The pennant is the decoy, and it is a real misconception: students reach
    // for the most human, most vivid object in the box. A football pennant
    // tells you a town exists. It tells you nothing about the land.
    spotReasons: {
      circle: "rain",
      blade: "rain",
      rails: "edge",
      horizon: "shape",
      pennant: "none",
    },
    bestClaim: "rain",
    decoyMessage:
      "A pennant tells you there is a town and the town has a team. Every corner of Texas has those. What else is in the box?",
    rightMessage:
      "Strong case. A green circle in a brown square is a machine walking water round a field, and the blade is off the pump that lifted it. Two proofs, both about water that had to be fetched — and only one answer has two.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but the box only shows that one once. Is there an answer you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they do not show the answer you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different answers. Pick the one you can prove twice.",
  },

  clearance: {
    answers: {
      c1: "a",
      c2: "a",
      c3: "a",
      c4: "a",
      // c5 is the teacher-read item — no key. See the header note.
      c5: null,
    },
    keepCoherence: {
      coastal: "coastal",
      west: "west",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: where I live is more like that one, because where you live makes no difference to anything. That sentence argues with itself — try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the corner you picked, or with the other one?",
    keepAcceptedMessage:
      "Filed. There is no right answer to which corner yours is more like, and HQ is not marking it — your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "Coastal Plains, North Central Plains, Great Plains, Mountains and Basins. The Hill Country and the Piney Woods are real places, but they sit inside these four rather than beside them — and Texas has no region called a desert on this map.",
      c2: "Same job, different way. Neither corner is doing it better and neither needs more than the other; the land just hands them different problems to solve.",
      c3: "Because the gap is the only way through. Rain has nothing to do with it — the far west is dry on both sides of that gap — and the ocean is six hundred miles away.",
      c4: "The far west. The High Plains is dry enough that the water has to be lifted, which is exactly what happens around El Paso. The crop is not the point; where the water comes from is.",
    },
  },
};
