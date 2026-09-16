// Briefing SS-4-2E-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as SS-3-1B-V3-BR, and the same shape-specific difference: the
// CHOICE step in theDecision has no key here and no `best` flag in the public
// pack. It is not graded, because it has no right answer — the student decides
// what they would have done, then finds out what somebody actually did, which
// is sometimes the worse option. Austin making himself judge and lawmaker at
// once is not obviously right, and this lesson does not pretend it was.
//
// What IS keyed below is the step after: naming the KIND of work. That is this
// shape's hinge.
//
// Ungraded TEACHING steps keep their flags in the public pack as usual:
// openingFrame.traits, each round's `stretch`, contributionSynthesis's
// `attributions`.
//
// Clearance c5 has no key. Whether one man should hold all three jobs is a real
// argument — it is the argument that produced separated powers — and it goes to
// the teacher. Only whether the sentence holds together is checked.

export const SERVER_BRIEFING = {
  id: "SS-4-2E-V3-BR",
  title: "The Year He Waited",

  openingFrame: {
    lockMessage: "Locked in. HQ is not saying. You will find out at the end.",
  },

  theDecision: {
    rounds: {
      d1: {
        kindId: "terms",
        kindRight:
          "That is it — written into your ledger. Nothing was built that year and nobody was picked. He was making it legal for anyone to be there at all.",
        kindWrong:
          "He was a thousand miles from the land the whole time. He met no families and settled no arguments. What was he actually doing in that waiting room?",
      },
      d2: {
        kindId: "order",
        kindRight:
          "That is it — written into your ledger. The grant already existed and the families were already there. What was missing was any way to end a disagreement.",
        kindWrong:
          "The permission was already won — he had spent a year on that. And these families had already arrived. Look at what the two men arguing over the Brazos actually needed.",
      },
      d3: {
        kindId: "people",
        kindRight:
          "That is it — written into your ledger. The contract was granted either way. What he decided was who would be standing on the land when it was done.",
        kindWrong:
          "He got his contract approved in five days — that part was easy for him. And nothing here is about courts or codes. The whole decision is about one question: who?",
      },
    },
  },

  contributionSynthesis: {
    sortAnswers: {
      waited: "terms",
      fenceLaw: "order",
      wentHome: "people",
      stamped: "terms",
      character: "people",
      porch: "order",
      turnedAway: "people",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      waited: "A year in a capital and not a spade in the ground. Nobody is being picked and nothing is being settled — somebody is waiting to be allowed.",
      fenceLaw: "Writing down in advance how an argument ends. Nobody is being let in and nobody is being chosen.",
      wentHome: "He is not asking a government for anything and he is not writing anything down. He is deciding who the place will be made of.",
      stamped: "A stamp from a government is permission. It says you may — it does not say who, and it does not say how.",
      character: "Reading a letter about somebody before letting them in is how you decide who comes. That is a choice about people, not about paper or courts.",
      porch: "Somebody's word being final is a court, however plain the porch. That is how a place runs once everyone is there.",
      turnedAway: "Turning families away is the same decision as letting families in, made the other way round.",
    },
    sortDoneMessage: "Seven filed. Three kinds of work, and none of them does another's job.",
    removeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. Everyone is legally there and everyone was chosen on purpose, and the first real disagreement has nowhere to go. That is exactly what Austin wrote the code to stop.",
      wrongMessages: [
        null,
        "Being allowed to be there is the first kind of work, and this colony has it. Read the setup again — it is the third one that is missing.",
        "This is the one most agents pick, and the whole synthesis argues against it. People do sort themselves out — usually in favour of whoever is strongest, which is what a code exists to prevent.",
      ],
    },
  },

  reasonSort: {
    answers: {
      s_capital: "terms",
      s_boundary: "order",
      s_notice: "people",
      s_stamp: "terms",
      s_porch: "order",
      s_letter: "people",
      s_south: "people",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — all three are real jobs, which is what makes this a
    // decision rather than a spot-the-joke.
    teksProjectIds: ["send_capital", "send_recruit", "hire_order"],
    distractorIds: [],
    projectReasonIds: {
      send_capital: "terms",
      send_recruit: "people",
      hire_order: "order",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "paper", "contract", "signed", "legal", "title", "grant", "permission",
      "families", "bring", "trust", "move", "recruit", "who",
      "code", "quarrel", "argument", "settle", "court", "fair",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // Every kind of work has one proof in the box; only "winning the
    // permission" has TWO — the 1830 subcontract and the 1834 contract in his
    // own name. Robertson spent four years fighting over whether he had a
    // grant at all, which is exactly what those two pieces of paper are.
    //
    // The portrait is the decoy, and the misconception is real: students read
    // "somebody painted him" as evidence he was important, and importance is
    // not a kind of work.
    //
    // NOTE — see flag 3 in the public pack's header. The land register is true
    // of how empresario colonies worked; it is not sourced to Robertson's own
    // papers. It is here because the transfer invariant requires the third kind
    // of work to have exactly one proof and his documented life supplies none.
    spotReasons: {
      subcontract: "terms",
      ownName: "terms",
      handbill: "people",
      register: "order",
      portrait: "none",
    },
    bestClaim: "terms",
    decoyMessage:
      "A portrait says somebody thought he mattered. It does not say what he did. What else is in the box?",
    rightMessage:
      "Strong case. Two contracts four years apart is a man spending four years proving he was allowed to be there at all — and only one kind of work has two proofs. You found both.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but the box only shows that one once. Is there a kind of work you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they do not show the kind of work you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different kinds of work. Pick the one you can prove twice.",
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
      necessary: "necessary",
      toomuch: "toomuch",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: that was necessary — or too much — because it makes no difference who decides anything. If it makes no difference, there is nothing to be necessary or too much. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the side you picked, or with the other one?",
    keepAcceptedMessage:
      "Filed. There is no right answer to this one and HQ is not marking it — your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "Both brought families onto granted land — that is what an empresario is. Neither was a general, neither was elected to run Texas, and De León's families came from Tamaulipas, not Tennessee.",
      c2: "Two years on one contract is winning the permission. Nobody has been chosen yet and nothing has been written about how the place will run.",
      c3: "It was the only predominantly Mexican colony in Texas. Every empresario had a grant and nearly every colony had a town — that is not what made his different.",
      c4: "They were driven off anyway. His sons were arrested, the family fled to Louisiana and then to Mexico, and when they came back most of what they had owned was gone. Being on the winning side did not protect them.",
    },
  },
};
