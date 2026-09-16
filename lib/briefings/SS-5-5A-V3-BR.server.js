// Briefing SS-5-5A-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as every other v3 lesson. The ungraded TEACHING steps keep their
// flags in the public pack — openingFrame.traits, each beat's `stretch`,
// synthesis.causes, and the decision step's `best`.
//
// What lives here is the graded step: naming the KIND OF CHANGE.
//
// ONE HUB-SPECIFIC NOTE ON THE SYNTHESIS. In a chain lesson `correctOrder` is
// the causal order and getting it wrong means misunderstanding the causation.
// Here it is only the CHRONOLOGICAL order — these three did not cause each
// other, and a student who thinks they did has the wrong shape in their head.
// That is what synthesis.causes[1] exists to catch, and it is the single most
// important item in this lesson. See the public pack's header for why the hub
// variant leaves Type 1's usual protection switched off.

export const SERVER_BRIEFING = {
  id: "SS-5-5A-V3-BR",
  title: "One Machine, Three Changes",

  openingFrame: {
    lockMessage: "Locked in. HQ is not saying. You will have it by the third one.",
  },

  storyTeach: {
    beats: {
      b1: {
        reason: "where",
        rightMessage: "That is it — written into your ledger.",
        nameWrong:
          "Nobody in this one lost anything yet, and nobody was let into work they had been kept out of. Six million people picked up and went somewhere. What kind of change is that?",
      },
      b2: {
        reason: "risk",
        rightMessage: "That is it — written into your ledger.",
        nameWrong:
          "The moving had already happened — that was thirty years earlier. And no doors opened in 1932; they shut. Look at what a family had underneath them when the wage stopped.",
      },
      b3: {
        reason: "who",
        rightMessage: "That is it — written into your ledger.",
        nameWrong:
          "Nobody moved house for this one and nothing collapsed. The same plants, in the same towns, hiring from a different list. What changed?",
      },
    },
  },

  synthesis: {
    // CHRONOLOGICAL, not causal — see the header note.
    correctOrder: ["cities", "collapse", "shortage"],
    orderFirstHint:
      "Start with the one that took fifty years rather than four. Which of these was already well under way before either of the others existed?",
    orderHint: "Not next. Go by the calendar — these three did not cause each other.",
    orderNextMessage: "Yes. What came next?",
    orderDoneMessage:
      "That is the order they arrived in. Now the part that matters more: they are not a chain, so what are they?",
    removals: {
      where: {
        correctIndex: 0,
        rightMessage:
          "Right — and look what that does to the second beat for free. A family with land under it is a family the crash cannot empty out.",
        wrongMessages: [
          null,
          "Not quite. The crash would still come, but it would land on people who still had somewhere to go. That is the whole difference between a hard decade and a catastrophe.",
          "The war was won with factories, and this removal does not take the factories away — it only leaves them where the people already were.",
        ],
      },
      risk: {
        correctIndex: 0,
        rightMessage:
          "That is it. Nobody is saying 1929 would have been pleasant. They are saying a lost wage is not a lost dinner when there is a field behind the house.",
        wrongMessages: [
          null,
          "The banks would indeed still fail. Ask a different question: what happens to a family the week after, and does it depend on what they have underneath them?",
          "Cities do not empty because people can feed themselves. If anything they empty more slowly.",
        ],
      },
      who: {
        correctIndex: 0,
        rightMessage:
          "Yes. And note what that means about the beat you just read — the doors opened because of a shortage, so no shortage means no opening, for however long it took somebody to open them on purpose.",
        wrongMessages: [
          null,
          "The Depression ended because enormous wartime spending started, and that does not need a worker shortage to happen. This removal takes away the shortage, not the spending.",
          "This is the one most agents pick and it is the one the whole beat argues against. If those jobs were opening anyway, why did it take a threatened march of tens of thousands to get an order signed?",
        ],
      },
    },
  },

  matchPairs: {
    // r_cheap matches nothing. Four pairs and five cards means the last match is
    // still a decision rather than whatever is left over.
    answerKey: {
      mp_cities: "r_moved",
      mp_bread: "r_nofield",
      mp_women: "r_gone",
      mp_south: "r_friday",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor. All three were real choices in real mill towns in 1946.
    teksProjectIds: ["build_houses", "town_fund", "keep_hires"],
    distractorIds: [],
    projectReasonIds: {
      build_houses: "where",
      town_fund: "risk",
      keep_hires: "who",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "house", "housing", "live", "room", "family", "stay",
      "fund", "save", "cushion", "shutdown", "next time", "safe",
      "keep", "jobs", "skill", "trained", "bench", "line",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // The car is a second hub, which is the point — a student who has the idea
    // should be able to run it on a machine nobody taught them.
    //
    // Every kind of change has one proof; only "where people lived" has TWO —
    // the ten-mile suburb and the main street that emptied. Both are the same
    // fact from opposite ends: the car moved where things could be.
    //
    // The hood ornament is the decoy, and the misconception is real and common:
    // students reach for the object that IS the car. A hood ornament tells you
    // a car existed. It tells you nothing about what the car did.
    spotReasons: {
      suburb: "where",
      mainst: "where",
      deaths: "risk",
      teen: "who",
      ornament: "none",
    },
    bestClaim: "where",
    decoyMessage:
      "A hood ornament is a piece of a car. It is not a thing the car changed. What else is on the table?",
    rightMessage:
      "Strong case. A street of houses too far to walk from, and a shopping street that died when the road moved — the same change seen from both ends. Two proofs, and only one answer has two.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but there is only one of that here. Is there a kind of change you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they do not show the change you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different changes. Pick the one you can prove twice.",
  },

  clearance: {
    answers: {
      c1: "a",
      c2: "a",
      c3: "a",
      c4: "a",
      // c5 is the teacher-read item — no key. See the public pack's header.
      c5: null,
    },
    keepCoherence: {
      where: "where",
      risk: "risk",
      who: "who",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: that one was the biggest, because none of them changed anything much. That sentence argues with itself — try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending come from the change you picked, or from one of the other two?",
    keepAcceptedMessage:
      "Filed. There is no right answer to which one was biggest — historians argue about it — and HQ is not marking it. Your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "All three came out of the same change: the country moved its work into factories. They are not a chain. The cities filling up did not cause the crash, and the crash did not cause the war — that is exactly the mistake this briefing is built to prevent.",
      c2: "Because by 1932 most families had no land to retreat to. Earlier slumps were survived by going back to a farm, and the previous thirty years had removed that option for most people.",
      c3: "Because the work had to be done and sixteen million men were in uniform. Nobody's mind had changed — it took a threatened march of tens of thousands to get even the order signed. That is why what happened after the war happened.",
      c4: "Whether it changes where people have to be. That is the question that separates a useful gadget from something that rearranges a country. Price and country of origin tell you almost nothing about reach.",
    },
  },
};
