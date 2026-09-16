// Briefing SS-4-6A-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as SS-3-7C-V3-BR, the Type 4 worked example. The ungraded TEACHING
// steps keep their flags in the public pack — openingFrame.traits, each round's
// `stretch`, boundarySynthesis's `boundaries`, and the routing choice itself
// (`best`), which a student is meant to be able to reason to from the setup.
//
// What lives here is the step that carries the standard: naming the RULE that
// decided the region. Naming the REGION would be the sort again with a story on
// top; naming the rule is what lets a child place a region nobody taught them —
// which is exactly what the transfer phase then asks for.
//
// ONE VARIANT NOTE. This lesson is the WRONG CALL variant of Type 4 (see the
// public pack's header). Nothing in this file is shaped differently because of
// it: `wrongDesk.rounds` still keys a ruleId, ruleRight and ruleWrong per
// round, exactly as 3.7C does. The variant changes what the story is about, not
// what the server has to know. That is the finding.
//
// Clearance c5 has no key. How many regions Texas "really" has is a real
// argument — plenty of maps show seven or twelve — and it goes to the teacher.
// Only whether the student's sentence holds together is checked.

export const SERVER_BRIEFING = {
  id: "SS-4-6A-V3-BR",
  title: "The Wrong Call",

  openingFrame: {
    lockMessage: "Locked in. You will find out three times over.",
  },

  wrongDesk: {
    rounds: {
      w1: {
        ruleId: "water",
        ruleRight:
          "That is it — written into your ledger. Nothing about the ground stopped them and nothing was growing in the way. What was missing simply never fell on them.",
        ruleWrong:
          "The Panhandle is flatter than the Gulf coast, and there was nothing standing in that field. Look at what the pump was for, and what it was replacing.",
      },
      w2: {
        ruleId: "ground",
        ruleRight:
          "That is it — written into your ledger. A ruler measures distance across a map. It has no way of knowing the road has to climb and bend to cover it.",
        ruleWrong:
          "The parcels were not thirsty and nothing grew across the road. The whole mistake was a flat line on a map meeting land that is not flat.",
      },
      w3: {
        ruleId: "grows",
        ruleRight:
          "That is it — written into your ledger. The rain was fine and the land was not steep. What stopped them was standing there long before they arrived.",
        ruleWrong:
          "The ground through there rolls gently and there was water enough. Look at what the wagons actually had to be cut through.",
      },
    },
  },

  boundarySynthesis: {
    sortAnswers: {
      paddy: "coastal",
      turbines: "greatplains",
      gap: "west",
      dwarfoak: "northcentral",
      shrimp: "coastal",
      pivot: "greatplains",
      highest: "west",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      paddy:
        "Standing water all summer, with nobody pumping it. There is exactly one corner of Texas where the sky supplies that.",
      turbines:
        "Turbines need wind that nothing interrupts. Ask which region has nothing tall in it for hundreds of miles.",
      gap: "A town with no room to spread, because there are ranges on both sides of it.",
      dwarfoak:
        "Knee-high oak in a belt is not a forest and it is not open prairie. It is the thing that sits between them.",
      shrimp: "Shrimp boats need somewhere to put out from, and only one of these four touches the sea.",
      pivot:
        "A green circle in a brown square is a machine walking water round a field — dry country, flat enough for the machine to walk, and water far underground.",
      highest: "The highest ground in Texas is a peak, and peaks live in only one of these four.",
    },
    sortDoneMessage:
      "Seven filed, and every one came down to the same three questions: how much arrives, what the ground does, and what is already growing.",
    removeOne: {
      correctIndex: 0,
      rightMessage:
        "Right. That is the whole job a region does. It is not a label — it is the reason the same plan works in one place and empties somebody's bank account in another.",
      wrongMessages: [
        null,
        "Texas would still be exactly where it is. Regions are not what put it on the map; counties and borders do that, and they are not going anywhere.",
        "This is the one most agents pick. It IS all one state — and a state where a rice plan and a ranching plan and a trucking plan all need different answers depending on where you stand. Calling it one thing does not make it one thing.",
      ],
    },
  },

  trueFalseReason: {
    // Every answer — right or wrong — surfaces the reason, so this doubles as a
    // short re-teach rather than a bare check mark. Two of the five are false
    // on purpose, and both are the exact misconception the teach was built
    // against: that high must mean mountainous, and that dry must mean barren.
    answerKey: {
      t_sixtimes: {
        isTrue: true,
        reason: "Houston averages about fifty-five inches a year and El Paso under nine. That is more than six times over.",
      },
      t_peak: {
        isTrue: false,
        reason: "Guadalupe Peak is in the Mountains and Basins. The Great Plains is high ground, but it is flat-high, not peaked.",
      },
      t_highflat: {
        isTrue: true,
        reason: "Amarillo sits above three thousand feet. High and flat at the same time is exactly what a high plain is.",
      },
      t_cotton: {
        isTrue: false,
        reason: "Cotton grows out around Pecos and El Paso too — on irrigated fields, watered by somebody rather than by the sky.",
      },
      t_edge: {
        isTrue: true,
        reason: "That is what a physical region is. The Caprock Escarpment is exactly that kind of ending, which is why it belongs to neither side.",
      },
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — three real asks from three real regions.
    teksProjectIds: ["storm_gates", "plains_water", "pass_lane"],
    distractorIds: [],
    projectReasonIds: {
      storm_gates: "coastal",
      plains_water: "greatplains",
      pass_lane: "west",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "port", "channel", "storm", "surge", "coast", "shut",
      "well", "water", "irrigate", "grow", "field", "plains",
      "pass", "gap", "lane", "road", "mountain", "through",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // The cab is a legitimate way for evidence of three regions to sit in one
    // place — a driver crosses several in a week, which a town cannot do. That
    // is not a flourish: for a REGION standard the usual transfer frame breaks,
    // because a single place is in exactly one region and cannot carry proof of
    // three. Worth knowing before generating the other region lessons.
    //
    // Every region has one proof; only the Great Plains has TWO — the grain
    // elevator that is the tallest thing for forty miles, and the centre-pivot
    // circle. Both say the same thing: high, flat, dry, farmed with lifted
    // water.
    //
    // The sticker is the decoy, and the misconception is real and specific:
    // students reach for the most Texan-looking object. A state flag sticker
    // narrows the location to the whole state.
    spotReasons: {
      elevator: "greatplains",
      pivot: "greatplains",
      receipt: "coastal",
      postcard: "west",
      sticker: "none",
    },
    bestClaim: "greatplains",
    decoyMessage:
      "A Texas flag on a dashboard tells you she was in Texas. You knew that. What else is in the cab?",
    rightMessage:
      "Strong case. An elevator that is the tallest thing for forty miles and a circle of irrigated green both say the same place — high, flat, dry, and farmed with water that had to be lifted. Two proofs, and only one answer has two.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but the cab only shows that one once. Is there somewhere you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they do not show the place you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different places. Pick the one you can prove twice.",
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
      enough: "enough",
      toofew: "toofew",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: four is enough — or too few — because it makes no difference how anybody divides anything. If it makes no difference, there is nothing to be enough or too few of. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the side you picked, or with the other one?",
    keepAcceptedMessage:
      "Filed. There is no right answer to this one — geographers draw the lines differently and argue about it — and HQ is not marking it. Your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "The far west corner is both the driest and the highest. The Coastal Plains is the wettest and the lowest, the Great Plains is dry rather than wet so no rice grows there, and the North Central Plains is landlocked — it touches no ocean at all.",
      c2: "What the ground does. Road that has to climb, curve and cut costs far more per mile than road laid across flat. Rain does not build a road, and nothing was growing in the way.",
      c3: "Because the land itself changes. That is what makes a physical region different from a county or a country — nobody chose where it ends, and a river is only sometimes the place it happens.",
      c4: "Because the same plan can fail somewhere else. That is the whole point of knowing which region you are in. The laws are the same right across Texas — it is the land that is not.",
    },
  },
};
