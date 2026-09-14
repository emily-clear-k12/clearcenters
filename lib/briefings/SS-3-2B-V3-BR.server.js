// Briefing SS-3-2B-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as SS-3-2A-V3-BR, and the same stated exception: the ungraded
// TEACHING steps carry their correctness flags in the public pack —
// openingFrame.traits, each round's `stretch`, and contrastSynthesis.causes.
// Their feedback is immediate, retries are unlimited, nothing is scored on
// them, and a student who reads the page source to find out that a bridge
// counts as transportation has, in the process, learned it.
//
// One shape-specific note. Each round's PREDICTION carries `best` in the
// public pack, matching how storyTeach's decision step already works in the
// 3.2A pack — a student is meant to be able to reason their way to it from
// the setup, and it isn't scored. What lives here instead is the step that
// actually carries the standard: WHY the two towns differ. That naming step
// is this shape's hinge, the same way naming the reason is 3.2A's.
//
// Clearance c5 has no key: which town a student's own is more like is their
// call and goes to the teacher. Only whether the sentence holds together is
// checked.

export const SERVER_BRIEFING = {
  id: "SS-3-2B-V3-BR",
  title: "Two Towns, Five Needs",

  openingFrame: {
    lockMessage: "Locked in. HQ isn't saying yet — you'll work it out by visiting both towns.",
  },

  sideBySide: {
    rounds: {
      r1: {
        whyId: "people",
        whyRight:
          "That's it. Three hundred people can argue it out in one room. Two thousand can't — so they pick seven to do it for them.",
        whyWrong:
          "Look at the one thing we actually know is different about these two towns. It's a number.",
      },
      r2: {
        whyId: "land",
        whyRight:
          "Yes. You can build the finest road in Texas and it still stops at the water. The river decides this one.",
        whyWrong:
          "Cloudreach would happily use a road. Something is stopping them, and it was in the first line about the place.",
      },
      r3: {
        whyId: "already",
        whyRight:
          "That's the whole idea. You don't build what you already have — and you do build what you haven't. Maple Crossing got lucky with the creek.",
        whyWrong:
          "Both answers you're looking at were true in an earlier need. This one is about what each town already had before anybody decided anything.",
      },
    },
  },

  contrastSynthesis: {
    // "both" is the load-bearing answer here. A student who puts every item in
    // one of the outside columns has learned that the two towns share nothing,
    // which is the opposite of what 3.2B says.
    sortAnswers: {
      school: "both",
      ferry: "away",
      oneRoom: "home",
      swim: "both",
      mayor: "away",
      decide: "both",
      creekSwim: "home",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      school: "Both towns have children, and both towns teach them. The way differs — six at a table, or a bus to a bigger school — but the need is the same.",
      ferry: "Only one of these towns has water to get across.",
      oneRoom: "Two thousand people don't fit in one room. That's the whole reason Cloudreach does it differently.",
      swim: "Careful — this says somewhere to swim, not a creek. One town has a creek. The other built a pool. Both have somewhere.",
      mayor: "Maple Crossing never elected anybody. Whoever turns up on the first Monday does the deciding.",
      decide: "Every town has to settle arguments somehow, or it stops being a town. Who does it is what changes.",
      creekSwim: "There's only one creek in this briefing, and it isn't on the bluff.",
    },
    sortDoneMessage: "Seven filed — and three of them belonged to both. That's the part worth keeping.",
    changeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. The ferry only exists because the water was in the way. Take the water out of the way and the ferry has no job.",
      wrongMessages: [
        null,
        "A bridge gets them across, but it doesn't make Cloudreach smaller. Two thousand people still don't fit in one room — that difference had nothing to do with the river.",
        "Try it the other way round: why does the ferry exist at all? Take away the reason and see whether it survives.",
      ],
    },
  },

  reasonSort: {
    answers: {
      ferryman: "transportation",
      bellTower: "communication",
      longTable: "education",
      creekClosed: "government",
      saturdayField: "recreation",
      flourWagon: "transportation",
      storeBoard: "communication",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor project — all three are real needs, which is what makes
    // this a decision instead of a spot-the-joke. The old 3.2B offered a giant
    // welcome statue and accepted any two of the remaining three.
    teksProjectIds: ["second_ferry", "print_shop", "shared_field"],
    distractorIds: [],
    projectReasonIds: {
      second_ferry: "transportation",
      print_shop: "communication",
      shared_field: "recreation",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "across", "ferry", "river", "get", "travel",
      "word", "news", "tell", "reach", "message",
      "play", "together", "somewhere", "field",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // Every need has one proof in Ridgeway; only transportation has TWO (the
    // ramp and the wagon yard). A student asked for two matching proofs has to
    // notice that, which is a different act from spotting a keyword.
    spotReasons: {
      ramp: "transportation",
      wagonYard: "transportation",
      bellPost: "communication",
      benches: "education",
      statue: "none",
    },
    bestClaim: "transportation",
    decoyMessage:
      "A stone horse is somebody being proud of their town. That's not one of the five needs. What else did you spot?",
    rightMessage:
      "Strong case. Ridgeway does a bit of everything — but only moving things has two proofs, and you found both. That's what makes it the best answer rather than just an answer.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but Ridgeway only shows that one once. Is there a need you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they don't show the need you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different needs. Pick the one you can prove twice.",
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
    // Which ending actually follows from which town. A mismatch comes back for
    // the logic; which town they picked is never marked.
    keepCoherence: {
      maple: "maple",
      cloud: "cloud",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: our town is more like that one, because it's nothing like either one. That sentence argues with itself — try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the town you picked — or with the other one?",
    keepAcceptedMessage:
      "Filed. There's no right answer to which town yours is more like, and HQ isn't marking it — your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "Government, education, communication, transportation, recreation. Being big isn't a need, good weather isn't one, and a town where everybody believes the same thing isn't one either.",
      c2: "A rule the town agreed and everybody follows. Whoever is strongest getting their way isn't government — it's just strength. And everyone happening to agree isn't government either; nobody decided anything.",
      c3: "Same need, different way — which is the whole point of comparing two towns. Neither one is doing it better, and neither one needs more than the other.",
      c4: "Numbers. Two thousand people can't all fit in one room and still get anything settled, so Cloudreach elects seven to do it. The river has nothing to do with this one.",
    },
  },
};
