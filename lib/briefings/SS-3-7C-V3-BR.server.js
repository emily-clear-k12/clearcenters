// Briefing SS-3-7C-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as the other three v3 lessons. The ungraded TEACHING steps keep
// their flags in the public pack — openingFrame.traits, each round's `stretch`,
// boundarySynthesis's `boundaries`, and the routing choice itself (`best`),
// which a student is meant to be able to reason to from the setup.
//
// What lives here is the step that carries the standard: naming the RULE that
// decided the desk. That is this shape's hinge, the same way naming the reason
// is 3.2A's, naming the cause is 3.2B's, and naming the kind of work is 3.1B's.
// Naming the LEVEL would just be the sort again; naming the rule is what lets a
// child place a service nobody taught them.
//
// Clearance c5 has no key. Which desk ought to run a shared service is a real
// argument adults have, and it goes to the teacher — only whether the
// student's sentence holds together is checked.

export const SERVER_BRIEFING = {
  id: "SS-3-7C-V3-BR",
  title: "The Wrong Desk",

  openingFrame: {
    lockMessage: "Locked in. You'll find out at all three desks.",
  },

  wrongDesk: {
    rounds: {
      w1: {
        ruleId: "here",
        ruleRight:
          "That's it — written into your ledger. One street, one town, nobody else affected. That's as far as it reaches, so that's whose job it is.",
        ruleWrong:
          "Ask how far the hole in Mabel Street reaches. Does anybody in Dallas need a say in it? Does anybody in Maine?",
      },
      w2: {
        ruleId: "statewide",
        ruleRight:
          "That's it — written into your ledger. A licence that only worked in Nadia's town would be no use the moment she drove out of it.",
        ruleWrong:
          "Think about where Nadia's licence has to work. Not just her street — but not Maine either. How far exactly?",
      },
      w3: {
        ruleId: "everywhere",
        ruleRight:
          "That's it — written into your ledger. It starts somewhere Texas controls and ends somewhere Texas doesn't. Only one desk covers both ends.",
        ruleWrong:
          "Follow the parcel. It leaves Texas about a day in. Who is in charge of it after that?",
      },
    },
  },

  boundarySynthesis: {
    sortAnswers: {
      binTruck: "local",
      sixteen: "state",
      parkDusk: "local",
      letterMaine: "national",
      cityHighway: "state",
      printMoney: "national",
      kitchenFire: "local",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      binTruck: "How far does a bin lorry reach? One town's worth of bins, and no further.",
      sixteen: "It can't be one town — the licence has to work in the next one. And it isn't all fifty either, or moving states wouldn't mean a new test.",
      parkDusk: "One park, one town. Nobody two hundred miles away has a view about when its gates shut.",
      letterMaine: "That letter leaves Texas. Whoever is in charge has to be in charge at both ends.",
      cityHighway: "It starts in one town and ends in another, so it can't belong to either. But it never leaves Texas.",
      printMoney: "Money from Texas has to be worth exactly the same in Maine, or it stops being money.",
      kitchenFire: "A fire engine that reaches you in four minutes is parked very close by. That tells you whose it is.",
    },
    sortDoneMessage: "Seven filed. Every one of them came down to the same question: how far does it reach?",
    removeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. That's what the state desk is for — the things that have to be the same across every town, so they still work when you leave yours.",
      wrongMessages: [
        null,
        "The post is the national desk's job, and it would carry on regardless. Look for something that stops working the moment every town decides for itself.",
        "Try it: your town's licence, your town's speed limits, your town's school rules. Now drive twenty miles. Which of them still works?",
      ],
    },
  },

  reasonSort: {
    answers: {
      r_bins: "local",
      r_sixteen: "state",
      r_dusk: "local",
      r_maine: "national",
      r_between: "state",
      r_money: "national",
      r_fire: "local",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — all three are real requests at three real desks.
    teksProjectIds: ["bin_routes", "highway_exit", "post_office"],
    distractorIds: [],
    projectReasonIds: {
      bin_routes: "local",
      highway_exit: "state",
      post_office: "national",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "here", "town", "ours", "street", "lane", "local",
      "austin", "texas", "state", "highway", "between",
      "country", "national", "post", "fifty", "everywhere",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // Every desk has one proof in Orrin; only the state desk has TWO — the
    // department sign and the highway shield. The car-lot billboard is the
    // decoy: a business is not a government, however official the sign looks.
    spotReasons: {
      tdotSign: "state",
      highwayShield: "state",
      mailbox: "national",
      poolNotice: "local",
      carLot: "none",
    },
    bestClaim: "state",
    decoyMessage:
      "A car lot is somebody's business, not anybody's government. A big sign doesn't make it official. What else did you spot?",
    rightMessage:
      "Strong case. Orrin has a bit of all three — but only the state desk has two proofs, and you found both. That's what makes it the best answer rather than just an answer.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but Orrin only shows that desk once. Is there one you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they don't show the desk you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different desks. Pick the one you can prove twice.",
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
      town: "town",
      texas: "texas",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back: somebody should run the parks, because it makes no difference who runs anything. If it makes no difference, there's nothing to argue for. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the desk you picked, or with the other one?",
    keepAcceptedMessage:
      "Filed. There's no right answer to this one — grown-ups argue about it in real meetings — and HQ isn't marking it. Your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "Bins are the town's, licences are Texas's, the post is the country's — one from each desk. The other lists are all one desk, or include a fence, which is nobody's government.",
      c2: "Because the licence has to work in every Texas town. One town can't be the one to decide that, and all fifty states don't need to agree on it either — which is why moving states means a new one.",
      c3: "Both, and that's normal. Your district runs the school day; Texas decides a great deal of what must be taught and pays a large share of it. Plenty of jobs are shared like this.",
      c4: "The wrong desk can't act — it can only pass the letter along, and that takes months. The Governor has never sent a crew to fix one street.",
    },
  },
};
