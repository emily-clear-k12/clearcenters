// Briefing SS-3-2A-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Two things are deliberately NOT in here, and both are choices rather
// than omissions:
//
// 1. openingFrame's prediction has no key. It isn't marked at all — it's
//    settled at the end of storyTeach by the town itself, and that delay
//    is the entire pedagogical point of asking it.
//
// 2. Clearance c5 has no key. Which reason a student would keep is their
//    opinion and goes to the teacher; only the LOGIC of the sentence is
//    checked (see clearance.keepCoherence below), so "I'd keep security
//    and laws because without it families wouldn't have enough to eat"
//    comes back for the mismatch, not for the opinion.
//
// Known and accepted: the ungraded *teaching* steps — storyTeach's stretch
// questions, synthesis's cause questions, openingFrame's trait picks —
// carry their correctness flags in the PUBLIC pack, because their feedback
// is immediate, they can be retried freely, and nothing is scored on them.
// A student who reads the page source to discover that a school slow-down
// zone counts as security and laws has, in the process, learned it. Every
// step that actually scores goes through this file.

export const SERVER_BRIEFING = {
  id: "SS-3-2A-V3-BR",
  title: "Why Communities Form",

  openingFrame: {
    lockMessage: "Locked in. HQ isn't telling you yet — you'll find out by watching the town get built.",
  },

  storyTeach: {
    beats: {
      b1: {
        reason: "security",
        rightMessage: "That's it — written into your ledger.",
        nameWrong: "Look at what was missing that first winter: nobody had said whose field ends where, and nobody was watching the road at night. Which reason is that?",
      },
      b2: {
        reason: "religious",
        rightMessage: "That's it — written into your ledger.",
        nameWrong: "Look at the three families who had just arrived, and what they were watching to see. Which reason is that?",
      },
      b3: {
        reason: "material",
        rightMessage: "That's it — written into your ledger.",
        nameWrong: "Look at what ran short that winter: food, work, and everything they couldn't grow themselves. Which reason is that?",
      },
    },
  },

  synthesis: {
    correctOrder: ["watch", "worship", "food"],
    orderFirstHint: "Start at the beginning. Which of these could four families have had, before anybody else arrived?",
    orderHint: "Not next. Each problem arrives because of what the last one fixed.",
    orderNextMessage: "Yes. What came next?",
    orderDoneMessage: "That's the order. Now the harder half — why each one followed the last.",
    removals: {
      security: {
        correctIndex: 0,
        rightMessage:
          "That's it. The market only ever worked because there was a way to settle who owed what. Pull the rules out and the market goes with them.",
        wrongMessages: [
          null,
          "Try it as a story: two families disagree about a price, there's no rule, and nobody to ask. Who trades there next week?",
          "The river does what it likes either way. Think about what people stop doing when nothing can be settled.",
        ],
      },
      religious: {
        correctIndex: 0,
        rightMessage:
          "Yes — and a smaller town has fewer hands for the harvest and fewer people for the night watch. It doesn't stop at one thing.",
        wrongMessages: [
          null,
          "This is the one most people pick. But they already walked away from one town that told them that. They'd walk away from this one too.",
          "Not straight away. Follow the people first — who would leave, and what goes with them?",
        ],
      },
      material: {
        correctIndex: 0,
        rightMessage:
          "That's the whole idea. Take away what people need to live and the other two reasons have nobody left to serve.",
        wrongMessages: [
          null,
          "Maybe eventually. But start earlier: what does a family do first when there isn't enough to eat?",
          "That was true when there were four families. It stopped being true at fifteen — which is exactly why they built the mill.",
        ],
      },
    },
  },

  reasonSort: {
    answers: {
      left_good_harvest: "religious",
      wrote_boundary: "security",
      froze_nothing_trade: "material",
      old_songs: "religious",
      nothing_missing: "security",
      wagon_road: "material",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor project in v3 — all three are real needs, which is
    // what makes the choice a decision instead of a spot-the-joke.
    teksProjectIds: ["town_hall", "worship_land", "market_road"],
    distractorIds: [],
    projectReasonIds: {
      town_hall: "security",
      worship_land: "religious",
      market_road: "material",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "safe", "safety", "rule", "law", "believe", "belief", "faith", "worship",
      "food", "home", "job", "goods", "material", "well-being", "wellbeing",
      "later", "next year", "third", "free",
    ],
  },

  transfer: {
    // Every reason has proof in Cedar Landing, but only material
    // well-being has TWO pieces — so a student asked for two proofs has to
    // notice that, which is a different act from recognising a keyword.
    spotReasons: {
      sign: "security",
      meeting: "religious",
      market: "material",
      dock: "material",
      play: "none",
    },
    bestClaim: "material",
    decoyMessage:
      "A playground is a good time, but having fun isn't one of the reasons people form a community. What else did you spot?",
    rightMessage:
      "Strong case. Cedar Landing has a little of every reason — but only material well-being has two proofs, and you found both. That's why it's the best answer, not just an answer.",
    onlyOneProofMessage:
      "Both your proofs point that way — but this town only has one of them, and you've used it twice over. Is there a reason you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they don't show the reason you picked. Change one to match the other.",
    splitMessage: "Your two proofs are pointing at two different reasons. Pick the reason you can prove twice.",
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
    // Which endings actually follow from which kept reason. A mismatch is
    // handed back for the logic; the choice itself is never marked.
    keepCoherence: {
      security: "security",
      religious: "religious",
      material: "material",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: you'd keep it because the town doesn't need it. That sentence argues with itself — try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending come from the reason you kept — or from one of the other two?",
    keepAcceptedMessage:
      "Filed. There's no right answer to which one you'd keep, and HQ isn't marking it — your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "All three, and nothing extra. A town being bigger, or having good weather, isn't why anybody built one together.",
      c2: "Agreed rules, written down, so everybody knows what's fair. It isn't about who has the most soldiers — and a town nothing has happened to yet is lucky, not lawful.",
      c3: "Different ways, nobody stopping them. Everybody doing the same thing isn't freedom, and a rule of silence is the opposite of it.",
      c4: "Food and work are things a family needs. Nicer isn't the same as needed — and not everything a town builds is about what people need.",
    },
  },
};
