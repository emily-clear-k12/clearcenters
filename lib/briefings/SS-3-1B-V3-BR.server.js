// Briefing SS-3-1B-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as the other two v3 lessons, and one shape-specific difference
// worth stating plainly:
//
// theDecision's CHOICE step has no key here, and no `best` flag in the public
// pack either. It is not graded, because it has no right answer — the student
// is deciding what they would have done, and then finding out what a real
// person actually did, which is sometimes the worse choice. L'Enfant's real
// answer got him fired. What IS keyed below is the step after it: naming the
// KIND of work the person did. That naming step is this shape's hinge, the
// same way naming the reason is in 3.2A and naming the cause is in 3.2B.
//
// Ungraded TEACHING steps keep their flags in the public pack as usual:
// openingFrame.traits, each round's `stretch`, contributionSynthesis's
// `attributions`.
//
// Clearance c5 has no key. Whether L'Enfant was right to have the house pulled
// down is a genuine historical argument, and it goes to the teacher — only
// whether the student's sentence holds together is checked.

export const SERVER_BRIEFING = {
  id: "SS-3-1B-V3-BR",
  title: "Three Ways to Build a Town",

  openingFrame: {
    lockMessage: "Locked in. HQ isn't saying yet — you'll know by the end.",
  },

  theDecision: {
    rounds: {
      d1: {
        kindId: "planned",
        kindRight:
          "That's it — written into your ledger. Nothing was built yet. What he made was the shape everything else had to fit into.",
        kindWrong:
          "Look at what actually existed when he was working: farmland, a river, some trees. He wasn't checking where anything was, and he wasn't getting anybody to work together. What was he doing?",
      },
      d2: {
        kindId: "measured",
        kindRight:
          "That's it — written into your ledger. Somebody had already decided the shape. His job was finding out exactly where on the earth to put it.",
        kindWrong:
          "He didn't decide what the city would look like — that was already drawn. And he worked mostly alone, at night, with a clock. What was he actually doing out there?",
      },
      d3: {
        kindId: "organized",
        kindRight:
          "That's it — written into your ledger. He didn't design anything and he didn't measure anything. He got thirty people to agree to something.",
        kindWrong:
          "Franklin drew no maps that night and measured nothing. Look at what the thirty men actually signed, and what it made them do.",
      },
    },
  },

  contributionSynthesis: {
    sortAnswers: {
      drewStreets: "planned",
      chainFence: "measured",
      nightWatch: "organized",
      emptyMap: "planned",
      sameStar: "measured",
      thirtyNeighbours: "organized",
      countedFamilies: "measured",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      drewStreets: "There was no neighbourhood yet — it was a field. She was deciding what it would be.",
      chainFence: "A chain and a notebook full of distances. Nothing is being decided and nobody is being gathered — something is being found out.",
      nightWatch: "Twelve families making a promise to each other. Nobody drew anything and nobody measured anything.",
      emptyMap: "An empty map and no spade in the ground yet. This is somebody deciding what the place will be.",
      sameStar: "Checking the same thing three times to be sure of it. That's not deciding and it isn't gathering people.",
      thirtyNeighbours: "Thirty people agreeing to turn up for each other — exactly what Franklin did in Philadelphia.",
      countedFamilies: "Counting is finding out what is true. Deciding how big the school should be comes after, and that's somebody else's job.",
    },
    sortDoneMessage: "Seven filed. Three kinds of work, and none of them does the others' job.",
    removeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. A town can be beautifully shaped and exactly placed and still have nobody who turns up when your house is on fire. That was Franklin's whole point.",
      wrongMessages: [
        null,
        "Crooked streets and unknown edges are what you get when the other two are missing. This town has both of those people — it's the third one it hasn't got.",
        "Try naming what the third person actually does, then take it away and see. No fire company. No library. Nobody taking turns at anything.",
      ],
    },
  },

  reasonSort: {
    answers: {
      s_drew: "planned",
      s_chain: "measured",
      s_signed: "organized",
      s_stakes: "measured",
      s_library: "organized",
      s_sketch: "planned",
      s_counted: "measured",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — all three are real jobs, which is what makes this a
    // decision rather than a spot-the-joke.
    teksProjectIds: ["hire_planner", "hire_surveyor", "hire_organizer"],
    distractorIds: [],
    projectReasonIds: {
      hire_planner: "planned",
      hire_surveyor: "measured",
      hire_organizer: "organized",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "shape", "decide", "layout", "streets", "square",
      "edges", "corners", "exact", "survey", "land",
      "people", "together", "neighbour", "neighbor", "count on", "fire",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // Every kind has one proof in the museum case; only "measured" has TWO —
    // the notebook and the chain. A student asked for two matching proofs has
    // to notice that. The medal is the decoy: being honoured for work is not
    // itself a kind of work.
    spotReasons: {
      notebook: "measured",
      chain: "measured",
      drawing: "planned",
      list: "organized",
      medal: "none",
    },
    bestClaim: "measured",
    decoyMessage:
      "A medal says somebody thought her work mattered. It doesn't tell you what the work was. What else is in the case?",
    rightMessage:
      "Strong case. There's a bit of every kind in Ada Pike's case — but only measuring it has two proofs, and you found both. That's what makes it the best answer rather than just an answer.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but the case only shows that one once. Is there a kind of work you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they don't show the kind of work you picked. Change one to match the other.",
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
      right: "right",
      wrong: "wrong",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: he was right — or wrong — because it doesn't matter what anybody does. If it doesn't matter, there's nothing to be right or wrong about. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the side you picked, or with the other one?",
    keepAcceptedMessage:
      "Filed. There's no right answer to this one — historians still argue about it — and HQ isn't marking it. Your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "Three completely different jobs, one thing in common: each made something that outlasted them. None of them was president, they were never all in the same city, and two of the three were in charge of nothing at all.",
      c2: "A chain and a notebook of distances is finding out exactly what is true, so that everything built afterwards can be trusted. Deciding where things go is a different job, and so is getting people working together.",
      c3: "Starting something that keeps going after you, and that changes how other people live. Being rich changes nothing for anybody else, and living somewhere a long time isn't the same as changing it.",
      c4: "It was built from his drawing anyway, about a hundred years later. Losing the job and losing the idea turned out to be two different things.",
    },
  },
};
