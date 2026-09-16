// Briefing SS-4-3A-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as the Grade 3 v3 lessons. The ungraded TEACHING steps keep their
// correctness flags in the public pack — openingFrame.traits, each beat's
// `stretch`, synthesis.causes, and the decision step's `best`, which a student
// is meant to be able to reason to from the setup.
//
// What lives here is the step that carries the standard: naming the KIND OF
// CAUSE. That is this lesson's hinge, the same way naming the reason is 3.2A's.
//
// ONE DIFFERENCE FROM 3.2A WORTH KNOWING. In 3.2A the three reasons come from
// the TEKS. Here they do not — 4.3A names no categories, so the three below
// were authored for this lesson (see the public pack's header). That means the
// nameWrong messages have to do more work than 3.2A's: a student who has never
// heard these three labels before is not being reminded of a definition, they
// are being taught one. Each one below points at the evidence rather than
// restating the label.
//
// Clearance c5 has no key. Whether the war had to happen is a live historical
// argument and it goes to the teacher; only whether the sentence holds together
// is checked.

export const SERVER_BRIEFING = {
  id: "SS-4-3A-V3-BR",
  title: "Three Doors Closing",

  openingFrame: {
    lockMessage: "Locked in. HQ is not saying. You will find out by walking through it.",
  },

  storyTeach: {
    beats: {
      b1: {
        reason: "deal",
        rightMessage: "That is it — written into your ledger.",
        nameWrong:
          "Nobody had been ignored yet and no soldier had fired yet. Look at what those families had been told when they came, and what they were being told now.",
      },
      b2: {
        reason: "voice",
        rightMessage: "That is it — written into your ledger.",
        nameWrong:
          "They were not refused. They were not shot at. They were left standing there for two years with no answer at all. Which one is that?",
      },
      b3: {
        reason: "force",
        rightMessage: "That is it — written into your ledger.",
        nameWrong:
          "Nothing was promised and nothing was asked for in this one. A hundred soldiers rode into a town to take something. Which one is that?",
      },
    },
  },

  synthesis: {
    correctOrder: ["border", "petition", "cannon"],
    orderFirstHint:
      "Start where the trouble starts. Which of these happened while the settlers were still perfectly willing to be Mexican?",
    orderHint: "Not next. Each one is a reply to the one before it.",
    orderNextMessage: "Yes. What came next?",
    orderDoneMessage: "That is the order. Now the harder half — why each one followed the last.",
    removals: {
      deal: {
        correctIndex: 0,
        rightMessage:
          "That is it. The 1830 law is what there was to petition about. Take it away and the rider never sets off, so the man never goes to prison, so the second door never shuts either.",
        wrongMessages: [
          null,
          "The Alamo is six years and two other doors down the road from here. Nothing about it is fixed in place.",
          "Have another look at what you just removed. It is a law about immigration and taxes. It does not hand a war to anybody.",
        ],
      },
      voice: {
        correctIndex: 0,
        rightMessage:
          "Yes — and notice what that is worth. Not that everyone agrees, but that there is somewhere to take a disagreement. Gonzales fired because that place had stopped existing.",
        wrongMessages: [
          null,
          "A yes would have given Texas what it was asking for inside Mexico. Getting what you asked for is not usually how countries leave.",
          "Santa Anna moved against states that were defying him. A Texas that had just been given its own state government has far less to defy him about.",
        ],
      },
      force: {
        correctIndex: 0,
        rightMessage:
          "Right — and note how careful that is. It does not say the war never happens. Two doors are still shut. It says nobody has fired yet, which is a different thing.",
        wrongMessages: [
          null,
          "Mexico repealing the 1830 law is not something Gonzales staying quiet would cause. Look at what the cannon actually changed.",
          "This is the one most agents pick, and it is the one the whole synthesis argues against. If the shooting was always going to start that week, none of the three doors mattered — so why did people keep writing letters for five years?",
        ],
      },
    },
  },

  sequenceIt: {
    // Gonzales 2 Oct 1835 · Declaration 2 Mar 1836 · the Alamo falls 6 Mar 1836
    // · the Runaway Scrape, from Houston's retreat around 13 Mar 1836 until
    // after the battle · San Jacinto 21 Apr 1836.
    //
    // All four events TEKS 4.3A names as "including" are here. Goliad was in
    // the first draft and is out: the standard does not name it.
    //
    // The Declaration sitting four days BEFORE the fall of the Alamo is the
    // entire item. Almost every student puts the Alamo first, because it is the
    // part they arrive already knowing — and the order matters: the men in the
    // Alamo died defending a country that already existed.
    correctOrder: ["gonzales", "declaration", "alamo", "runaway", "sanjacinto"],
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor. All three are things the real Consultation argued about in
    // that room, which is what makes this a decision rather than a spot-the-joke.
    teksProjectIds: ["declare_1824", "provisional_gov", "pay_army"],
    distractorIds: [],
    projectReasonIds: {
      declare_1824: "deal",
      provisional_gov: "voice",
      pay_army: "force",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "constitution", "1824", "promise", "terms", "side", "allies",
      "government", "decide", "here", "answer", "wait", "listen",
      "army", "volunteers", "pay", "feed", "field", "winter",
      "later", "next", "third", "month",
    ],
  },

  transfer: {
    // Every kind of cause has evidence in the colonies, but only "nobody would
    // listen" has TWO pieces — the tax written by a parliament with no colonial
    // members, and the petition that was never answered. A student asked for
    // two matching proofs has to notice that, which is a different act from
    // recognising a familiar picture.
    //
    // The portrait is the decoy, and it is a real misconception: students read
    // "they were ruled by a king" as itself a cause. Plenty of places had the
    // portrait and never rebelled.
    spotReasons: {
      charter: "deal",
      taxes: "voice",
      petition: "voice",
      powder: "force",
      portrait: "none",
    },
    bestClaim: "voice",
    decoyMessage:
      "A picture of the king on a wall is just a picture. Colonies that never rebelled had one too. What else did you spot?",
    rightMessage:
      "Strong case. All three doors are here — but only having nowhere to be heard has two proofs, and you found both. That is what makes it the best answer rather than just an answer.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but this place only shows that one once. Is there a kind of cause you can prove twice?",
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
      // c5 is the teacher-read item — no key. See the header note.
      c5: null,
    },
    keepCoherence: {
      avoidable: "avoidable",
      coming: "coming",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: the war could have been avoided — or was always coming — because it makes no difference what anybody did. If it makes no difference, there is nothing to be avoided or not avoided. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending come from the side you picked, or from the other one?",
    keepAcceptedMessage:
      "Filed. There is no right answer to this one — historians are still arguing about it — and HQ is not marking it. Your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "A promise changed, nobody listening, soldiers sent in. Texas was far smaller than Mexico, not bigger. A harvest never came into it. And everybody wanting the same thing is the opposite of a cause — it is what a country looks like when nothing goes wrong.",
      c2: "Something was agreed and then one side moved it. Nobody has been ignored here and no soldier has arrived. That is the first door.",
      c3: "Silence. A government being argued with in the papers is a government people can still reach, and a tax everybody pays is a complaint, not a dead end. Two years of nothing is what tells you the door has shut.",
      c4: "Its own country. Texas was an independent republic with its own president, its own army and its own money for nearly ten years before it joined the United States in 1845.",
    },
  },
};
