// Briefing SS-5-2B-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as SS-3-1B-V3-BR and SS-4-2E-V3-BR: theDecision's CHOICE step has
// no key here and no `best` flag in the public pack. It is not graded, because
// it has no right answer. What is keyed is the step after — naming the KIND of
// contribution.
//
// Round one is the strongest case in the library for that rule. Defending the
// soldiers was right AND it was genuinely costly, and a student who says they
// would have turned it down is not getting it wrong — they are being honest
// about what it would have taken. Marking that wrong would teach the opposite
// of what the round is for.
//
// Clearance c5 has no key. Which kind of contribution mattered most is a real
// argument the lesson deliberately refuses to settle.

export const SERVER_BRIEFING = {
  id: "SS-5-2B-V3-BR",
  title: "Three Ways to Start a Country",

  openingFrame: {
    lockMessage: "Locked in. HQ is not saying — and HQ does not think there is a right answer.",
  },

  theDecision: {
    rounds: {
      d1: {
        kindId: "line",
        kindRight:
          "That is it — written into your ledger. He wrote nothing anybody quotes and he was not in a crowd. He stood on one rule at the moment it was most expensive to stand on.",
        kindWrong:
          "Nothing he said that year got repeated, and there was no crowd — the crowd was on the other side of the courtroom door. Look at what he refused to let go of.",
      },
      d2: {
        kindId: "hands",
        kindRight:
          "That is it — written into your ledger. No speech, no document. Several hundred people doing one thing on one night, which is the only way that thing could be done at all.",
        kindWrong:
          "Nobody wrote anything down that night — rather deliberately. And nobody was defending a rule; they were breaking one. What is left?",
      },
      d3: {
        kindId: "words",
        kindRight:
          "That is it — written into your ledger. He did not stand in a street and he did not risk anything that evening. He chose how wide to make a sentence, and the width is the whole contribution.",
        kindWrong:
          "He was alone at a desk, so there was no crowd, and nothing about the evening cost him anything. What he actually decided was how big to make a claim.",
      },
    },
  },

  contributionSynthesis: {
    sortAnswers: {
      si_blank: "words",
      si_hated: "line",
      si_night: "hands",
      si_paris: "words",
      si_spectacles: "line",
      si_pamphlet: "words",
      si_nonimport: "hands",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      si_blank: "Turning a complaint into a claim about everybody is a decision about language. Nobody is standing firm and nobody is in a street.",
      si_hated: "His own town wanted them convicted and he took the case anyway. That is a rule being held against pressure, not an argument being made.",
      si_night: "Several hundred people, one night, nobody talking afterwards. No document survives because no document was the point.",
      si_paris: "Persuading a foreign court to fund somebody else's war is an argument — made in another language, over two years, at dinner.",
      si_spectacles: "He talked armed men out of doing something they badly wanted to do, by holding to a rule about who an army answers to.",
      si_pamphlet: "Forty-seven pages any farmer could read is the case being put into language people can pick up. That is what this kind is.",
      si_nonimport: "One shop refusing is a principle. Every shop refusing on the same day is something only a group can do.",
    },
    sortDoneMessage: "Seven filed. Three kinds, and none of them doing another's job.",
    removeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. That is the country where the words are on the wall and nobody defends them the first week they are inconvenient — which is a country with decoration instead of rules.",
      wrongMessages: [
        null,
        "Read the setup again: this country HAS the people who made the argument. It is the third kind that is missing.",
        "This is the one most agents pick, and the whole phase argues against it. Adams's contribution is the least visible of the three and it is the one that makes the other two worth anything.",
      ],
    },
  },

  trueFalseReason: {
    // Two of the five are false, and both are the exact misconception the
    // rounds were built against: that defending somebody means believing them,
    // and that the Tea Party was a robbery.
    answerKey: {
      t_adams: {
        isTrue: false,
        reason: "He thought anybody accused deserves a lawyer. That is a different claim from thinking they did nothing, and it is the one he actually made.",
      },
      t_tea: {
        isTrue: false,
        reason: "They destroyed it, and by most accounts took nothing. Selling it would have made it robbery, and every newspaper in London would have said so.",
      },
      t_franklin: {
        isTrue: false,
        reason: "He spent it in Paris, persuading France to pay for the war. The money, the fleet and the troops at Yorktown came out of that.",
      },
      t_washington: {
        isTrue: true,
        reason: "They did, at Newburgh in March 1783, over years of unpaid wages — and he talked them out of it in a single afternoon.",
      },
      t_jefferson: {
        isTrue: true,
        reason: "Both are true at once. Frederick Douglass quoted the sentence back at the country in 1852, and it worked — which is the strongest thing anybody has said about it.",
      },
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — committees of correspondence really did all three of
    // these, and really did fund the counsel least often.
    teksProjectIds: ["the_press", "the_counsel", "the_boycott"],
    distractorIds: [],
    projectReasonIds: {
      the_press: "words",
      the_counsel: "line",
      the_boycott: "hands",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "print", "paper", "explain", "why", "case", "word",
      "lawyer", "counsel", "trial", "fair", "rule", "principle",
      "shops", "together", "boycott", "stop buying", "coast", "town",
      "wait", "next", "third", "season",
    ],
  },

  transfer: {
    // Every kind has one proof in the box; only "making the argument" has TWO —
    // the anonymous 1772 play and the 1805 history. Both are her putting the
    // case into language other people could use, forty years apart.
    //
    // The 1790 signed poems are the `line` proof: after eighteen years of
    // publishing political writing without a name on it, putting her own name
    // to it was the costly thing, not the writing.
    //
    // The portrait is the decoy and the misconception is the same one as in
    // SS-4-2E-V3-BR's box: students read "somebody painted her" as evidence she
    // mattered. Being honoured is not a kind of contribution.
    //
    // NOTE — see flag 4 in the public header. The play and the history are
    // documented. The non-importation list is the kind of document that
    // survives for this period generally rather than one of hers, and it is
    // there because the invariant needs `hands` to have exactly one proof.
    spotReasons: {
      play: "words",
      history: "words",
      signed: "line",
      shoplist: "hands",
      portrait: "none",
    },
    bestClaim: "words",
    decoyMessage:
      "A portrait says somebody thought she was worth painting. It does not say what she did. What else is in the box?",
    rightMessage:
      "Strong case. A play in 1772 and a history in 1805 — thirty-three years apart, the same job both times: putting the case where other people could pick it up. Only one kind has two proofs and you found both.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but the box only shows that one once. Is there a kind you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they do not show the kind you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different kinds. Pick the one you can prove twice.",
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
      words: "words",
      line: "line",
      hands: "hands",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: that kind mattered most, because none of them made any difference. If none of them made a difference there is no most. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the kind you picked, or with one of the other two?",
    keepAcceptedMessage:
      "Filed. There is no right answer to this one, and this briefing refused to pick one on purpose. HQ is not marking it — your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "Three different kinds of contribution. Only one of the three held office in this period, none of them fought as a soldier in these episodes, and the Sons of Liberty were nowhere near the writing of the Declaration.",
      c2: "Because he thought anybody accused deserves a lawyer, however certain the town is. He never argued the soldiers were blameless — two of them were convicted, and he had said from the start that the law would decide it and not the crowd.",
      c3: "France. He spent the war in Paris and came back with money, a fleet and an army — most of how Yorktown was won. He commanded nothing and he did not write the Declaration.",
      c4: "Because it set the habit: the army answers to the government. The officers were not paid in full for years afterwards, and the fighting was already over — which is exactly what made 1783 the dangerous moment rather than a safe one.",
    },
  },
};
