// Briefing SS-5-20A-V3-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Same split as SS-3-7C-V3-BR and SS-4-6A-V3-BR. The ungraded TEACHING steps
// keep their flags in the public pack — openingFrame.traits, each round's
// `stretch`, boundarySynthesis's `boundaries`, and the routing choice (`best`).
//
// What lives here is the step that carries the standard: naming the RULE that
// decided the period. Naming the PERIOD would be a sort with a story on top.
//
// THE SECOND WRONG-CALL LESSON, and worth recording: like SS-4-6A-V3-BR this
// file needed no schema change at all. `routeOptions` is "which period was this
// really", `whatWentWrong` is what somebody ends up believing, and the graded
// step still names a rule. Two lessons at two ends of the Type 4 range now run
// on the existing contract with nothing modified. The variant is a writing
// convention, not a new type — that is now tested rather than asserted.
//
// Clearance c5 has no key: whether a label should lead with the date a work was
// made or with what it shows is a real argument among real curators.

export const SERVER_BRIEFING = {
  id: "SS-5-20A-V3-BR",
  title: "When It Was Made",

  openingFrame: {
    lockMessage: "Locked in. You will find out three times over.",
  },

  wrongDesk: {
    rounds: {
      w1: {
        ruleId: "made",
        ruleRight:
          "That is it — written into your ledger. Nobody paid Longfellow to write it and nobody was mocking anybody. There is simply a date on the magazine, and it is not 1775.",
        ruleWrong:
          "No money changed hands here and there is no other side to this one. There is a poem, and there is the year somebody sat down and wrote it. Which of those two years is the poem evidence of?",
      },
      w2: {
        ruleId: "for",
        ruleRight:
          "That is it — written into your ledger. The date is not really the problem; 1872 is roughly the right era. The problem is that somebody ordered it, and what he was selling is why the land looks empty.",
        ruleWrong:
          "The date is about right for once, so that is not what went wrong. Nobody is mocking anybody either. Ask who wanted this picture to exist, and what he was hoping you would buy.",
      },
      w3: {
        ruleId: "whose",
        ruleRight:
          "That is it — written into your ledger. The period is right and nobody commissioned it. What is missing is that the song started in the mouths of the other side.",
        ruleWrong:
          "The class has the century right, and nobody paid for this one — its author is not even known. What they have wrong is who was singing it first, and at whom.",
      },
    },
  },

  boundarySynthesis: {
    sortAnswers: {
      gast: "expansion",
      longfellow: "civilwar",
      doodle: "revolution",
      migrant: "depression",
      uncletom: "civilwar",
      grapes: "depression",
      common: "revolution",
    },
    sortRightMessage: "Filed.",
    sortWrongMessages: {
      gast: "A telegraph wire and a railway put this well after the Civil War, and the whole picture is about a journey west.",
      longfellow: "The date it was printed is in the clue. That is the year it belongs to, whatever night it describes.",
      doodle: "British regiments were playing this marching to Lexington. That places it before anything else on this board.",
      migrant: "A tent, a mother and 1936. The date is doing all the work here and it is right there in the clue.",
      uncletom: "A novel about slavery selling in those numbers only happened in one decade, and the war followed it.",
      grapes: "Dust driving a family off a farm is one particular decade, and it is the same one as the photograph.",
      common: "Arguing that a king is a bad idea was a live and dangerous thing to publish in exactly one of these periods.",
    },
    sortDoneMessage:
      "Seven filed. Every one of them came down to the same question: when did somebody actually make this?",
    removeOne: {
      correctIndex: 0,
      rightMessage:
        "Right — and that is not a hypothetical. It is what the first round of this briefing was about, and it is on real museum labels now.",
      wrongMessages: [
        null,
        "The subject would still be on the label; that is the one thing this removal keeps. What goes is the ability to tell a witness from a storyteller.",
        "This is the one most agents pick. The whole briefing argues against it: the subject is a story the work is telling, and the date is the only part the work can prove.",
      ],
    },
  },

  sequenceIt: {
    // "Yankee Doodle" 1750s–60s · Common Sense Jan 1776 · Uncle Tom's Cabin
    // 1852 · "Paul Revere's Ride" written Apr 1860, printed Jan 1861 ·
    // American Progress 1872.
    //
    // The poem sits FOURTH while being about the earliest event on the list.
    // That inversion is the entire item and it is the lesson's rule in one move.
    correctOrder: ["doodle", "common", "uncletom", "longfellow", "gast"],
  },

  opsChoice: {
    requirePickCount: 2,
    // No distractor — museums argue about all three of these, and the third one
    // really is the one that usually waits.
    teksProjectIds: ["add_dates", "add_payers", "add_sides"],
    distractorIds: [],
    projectReasonIds: {
      add_dates: "made",
      add_payers: "for",
      add_sides: "whose",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "date", "made", "when", "century", "year", "wrong period",
      "paid", "commissioned", "ordered", "selling", "money", "why",
      "side", "other", "missing", "corner", "whose", "told",
      "wait", "next year", "third", "later",
    ],
  },

  transfer: {
    // The film leans on the 1800s: a painting made in 1872 and the travel guide
    // printed in 1873 by the same publisher who commissioned it. Two proofs,
    // pointing at the same period AND at the same sales pitch.
    //
    // A film's source list is a legitimate way for several periods to sit
    // together in one place — which the region and settlement standards cannot
    // do, and which is why the Grade 4 file needed a driver's cab. Worth
    // knowing: for any standard whose categories are mutually exclusive in
    // space, the transfer frame has to be a COLLECTION rather than a place.
    //
    // The undated map is the decoy, and this misconception is specific and
    // good: an old document with no date on it feels neutral and authoritative,
    // and for this question it is worth nothing at all.
    spotReasons: {
      painting: "expansion",
      guidebook: "expansion",
      poem: "civilwar",
      photo: "depression",
      map: "none",
    },
    bestClaim: "expansion",
    decoyMessage:
      "A map with no date is the one source here that cannot answer this question. It could be from any of them. What else is on the list?",
    rightMessage:
      "Strong case. A painting from 1872 and the travel guide from 1873 that the same publisher put out — the same period and the same sales pitch, twice. Only one answer has two proofs and you found both.",
    onlyOneProofMessage:
      "Both your proofs point the same way, but the list only shows that one once. Is there a period you can prove twice?",
    mismatchMessage:
      "Careful — your two proofs agree with each other, but they do not show the period you picked. Change one to match the other.",
    splitMessage: "Your two proofs point at two different periods. Pick the one you can prove twice.",
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
      made: "made",
      about: "about",
    },
    keepSelfContradicting: "none",
    keepContradictionMessage:
      "Read it back to yourself: a label should lead with that, because labels make no difference to what anybody thinks. If they make no difference there is nothing to lead with. Try the ending again.",
    keepMismatchMessage:
      "Read it back. Does that ending go with the one you picked, or with the other one?",
    keepAcceptedMessage:
      "Filed. There is no right answer to this one — curators argue about it in real museums — and HQ is not marking it. Your teacher reads your reason. What HQ checked is that your sentence holds together, and it does.",
    explanations: {
      c1: "When it was made. That is the one fact a work can prove about itself. What it shows is a story somebody was telling, how old it looks is a guess, and what most people say is how the poem about 1775 ended up filed under 1775.",
      c2: "1955. It is evidence of what people in 1955 thought and felt about the Depression, which is a genuinely useful thing to know and is not the same as evidence of the 1930s.",
      c3: "What he hoped people would do after seeing it — buy a ticket west. Once you know a picture was ordered by somebody selling something, the empty land in it stops being a fact and starts being an argument.",
      c4: "Because the colonists took an insult and made it their own, which is the interesting half of the story and the half that gets lost. It does not mean nobody should sing it; it means the singing is the point.",
    },
  },
};
