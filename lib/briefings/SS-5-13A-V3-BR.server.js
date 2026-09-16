// Briefing SS-5-13A-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as every other v3 lesson. The ungraded TEACHING steps keep their
// flags in the public pack — openingFrame.traits, each round's `stretch`, each
// round's PREDICTION (`best`), and contrastSynthesis.causes.
//
// What lives here is the step that carries the standard: naming WHY the two
// systems differed. Three causes, one per round, and they have to be three
// different ones — which for a comparison of two SYSTEMS rather than two places
// was the hard part of building this lesson at all. See the public header.
//
// Clearance c5 has no key: whether colonial Virginians were loyal subjects or
// already governing themselves is a live argument and it goes to the teacher.

export const SERVER_BRIEFING = {
  id: "SS-5-13A-V3-BR",
  title: "Who Sends Who Home",

  openingFrame: {
    lockMessage: "Locked in. HQ is not saying. You will work it out by the third round.",
  },

  sideBySide: {
    rounds: {
      r1: {
        whyId: "founder",
        whyRight:
          "That is it. A trading company that could not get anybody to cross an ocean offered a say, because a say cost it nothing and wages cost it everything.",
        whyWrong:
          "Nobody was paying anybody yet in 1619 and no royal seal had come into it. Ask who wanted this colony to exist, and what they were short of.",
      },
      r2: {
        whyId: "purse",
        whyRight:
          "Yes. Same powers on paper, completely different man in the room — because one of them has to come back next spring and ask.",
        whyWrong:
          "Both governors held the King's commission and both colonies were founded by somebody. Look at what changed between the two, and it is a line in a ledger.",
      },
      r3: {
        whyId: "source",
        whyRight:
          "That is the whole thing. He could end them because his authority did not come from them. Theirs came from Virginians, and Virginians had no say in him at all.",
        whyWrong:
          "The other two answers were right in earlier rounds. This one is about where each side's right to act came from in the first place — and only one of them came from overseas.",
      },
    },
  },

  contrastSynthesis: {
    // "both" is load-bearing. A student who sorts everything into the outside
    // columns has learned these were two unrelated things, when in fact they
    // were two claims on the same jobs.
    sortAnswers: {
      chosen: "home",
      london: "away",
      tax: "both",
      law: "both",
      endit: "away",
      claims: "both",
      ownpay: "home",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      chosen: "Only one of these two was chosen by anybody in Virginia. The other was chosen by people who had never been there.",
      london: "The burgesses were elected in Virginia by Virginians. Nobody in London had a view on who they were.",
      tax: "Both of them took money off people. That is not what separated them.",
      law: "Both of them made rules everybody had to follow. The question this briefing asks is who could stop the other.",
      endit: "The burgesses never once dissolved a governor. Only one side of this could end the other.",
      claims: "Both of them said they were acting for the colony's good, and both of them meant it. Saying so is free.",
      ownpay: "The governor never voted on what the burgesses were paid. It only ran one way, and that was the assembly's one real lever.",
    },
    sortDoneMessage:
      "Seven filed — and three belonged to both. Two governments doing the same jobs is exactly the problem; who can end whom is the difference.",
    changeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. The yearly vote was the assembly's only real hold on him. Pay him from London and the hold is gone, and everything else it bought goes with it.",
      wrongMessages: [
        null,
        "His power to dissolve them came from the King's commission, not from his pay packet. Paying him differently does not touch it — if anything he would use it more freely.",
        "This is the one most agents pick. But the whole of round two was about what that yearly vote was worth. Take it away and see what the assembly has left.",
      ],
    },
  },

  reasonSort: {
    answers: {
      s_recruit: "founder",
      s_yearly: "purse",
      s_seal: "source",
      s_charter: "founder",
      s_withhold: "purse",
      s_proclaim: "source",
      s_arrears: "purse",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — colonial assemblies really did fight all three of these.
    teksProjectIds: ["charter_copy", "yearly_pay", "judges_tenure"],
    distractorIds: [],
    projectReasonIds: {
      charter_copy: "founder",
      yearly_pay: "purse",
      judges_tenure: "source",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "charter", "terms", "written", "promised", "paper", "filed",
      "pay", "salary", "vote", "yearly", "lever", "purse",
      "judge", "court", "ruling", "dismiss", "behaviour", "behavior",
      "wait", "next", "third", "session",
    ],
  },

  transfer: {
    // Every cause has one proof in the records; only "who set it up, and what
    // they were short of" has TWO — the company charter written when nobody
    // would cross the ocean, and the handbill offering a vote to anyone who
    // sails. Both say the same thing: this colony gave people a say because it
    // needed people.
    //
    // The cargo list is the decoy, and the misconception is a real one at this
    // age: a genuine old document feels like evidence of anything. A list of
    // barrels tells you the colony traded. It says nothing about who governed.
    spotReasons: {
      charter: "founder",
      handbill: "founder",
      ledger: "purse",
      seal: "source",
      cargo: "none",
    },
    bestClaim: "founder",
    decoyMessage:
      "A list of barrels tells you somebody was trading. It does not tell you who made the law. What else is in the box?",
    rightMessage:
      "Strong case. A charter written when nobody would sail, and a handbill offering a vote to anyone who would — the same fact twice, from two directions. Only one answer has two proofs and you found both.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but these records only show that one once. Is there a cause you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they do not show the cause you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different causes. Pick the one you can prove twice.",
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
      loyal: "loyal",
      ownrule: "ownrule",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: they were mostly one of those, because it makes no difference what anybody thought they were. If it makes no difference there is nothing to be mostly. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the side you picked, or with the other one?",
    keepAcceptedMessage:
      "Filed. There is no right answer to this one — historians argue about it and both sides have a century and a half of evidence — and HQ is not marking it. Your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "Both at once, for a hundred and fifty years. Neither replaced the other and neither could get rid of the other — the governor could dissolve an assembly, but a new one would be elected, and the assembly could withhold his pay but never remove him.",
      c2: "Because he has to come back and ask. That is the only lever the elected side ever really had, and it is why London spent a century trying to pay governors from London instead.",
      c3: "From the King. His commission came from overseas, which is exactly why the burgesses could not do it back — their authority came from Virginians, who had no say in him.",
      c4: "Adult men who owned land — written down that way by 1670. \"Representative government\" in 1619 Virginia was real and it was also a great deal narrower than the phrase sounds, and both of those are worth saying at once.",
    },
  },
};
