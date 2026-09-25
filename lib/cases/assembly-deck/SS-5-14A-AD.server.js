// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.5.14A-AD",
  "title": "What the Document Actually Says",
  "rounds": {
    "r1": {
      "key": {
        "topic": [
          "r1p1"
        ],
        "details": [
          "r1p2",
          "r1p3"
        ],
        "conclusion": [
          "r1p4"
        ]
      },
      "decoys": {
        "r1p5": "The notes say the Declaration did not set up the three branches. The Constitution did that later.",
        "r1p6": "Calling someone the kindest and wisest is an opinion about a person. The notes give the document's purpose instead."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This states the purpose, so it opens the paragraph.",
        "r1p2": "This tells who drafted it and when it was adopted, so it is a detail.",
        "r1p3": "This explains what the document was meant to do, so it is a detail.",
        "r1p4": "This names what kind of writing it is, so it goes last."
      }
    },
    "r2": {
      "key": {
        "topic": [
          "r2p1"
        ],
        "details": [
          "r2p2",
          "r2p3"
        ],
        "conclusion": [
          "r2p4"
        ]
      },
      "decoys": {
        "r2p5": "The notes say these rights cannot be taken away. The text does not give the king power to take them.",
        "r2p6": "The notes say plainly that the Declaration did not end slavery."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This introduces the claims, so it opens the paragraph.",
        "r2p2": "This names the rights, so it is a detail.",
        "r2p3": "This explains where a government's power comes from, so it is a detail.",
        "r2p4": "This keeps the ideas from being treated as a finished result, so it goes last."
      }
    },
    "r3": {
      "key": {
        "topic": [
          "r3p1"
        ],
        "details": [
          "r3p2",
          "r3p3"
        ],
        "conclusion": [
          "r3p4"
        ]
      },
      "decoys": {
        "r3p5": "The notes say the Bill of Rights came later, with the Constitution. This list is complaints against the king.",
        "r3p6": "This is a judgment, not evidence. The notes say the list itself is the evidence, whoever wrote it."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This introduces the list of complaints, so it opens the paragraph.",
        "r3p2": "This tells who is accused and gives an example, so it is a detail.",
        "r3p3": "This explains the job the list does, so it is a detail.",
        "r3p4": "This explains why the evidence matters, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the purpose first, then the claims. The complaint list comes last because it is the evidence for those claims.",
  "decoyProtest": {
    "r1p5": "Branches, complaints... they're both lists, so I figured they were the same thing.",
    "r1p6": "I could tell he was kind from his handwriting. That counts, right?",
    "r2p5": "I felt sorry for the king, so I gave him a win in the paragraph.",
    "r2p6": "I wanted the happy ending to arrive in the same year.",
    "r3p5": "The Bill of Rights is the only famous list I remember!",
    "r3p6": "I trusted the famous names, so I skipped the evidence."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Reading accepted. You kept the purpose, the rights claim, and the complaint list in the right document.",
      "good": "Reading accepted. The document is mostly clear. Read the leftovers so a Constitution fact does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this is the Declaration, and part of it is a different document."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The long list of complaints sets up Congress, the president, and the courts.",
    "why": "That list is made of complaints against the king. The three branches come from the Constitution, which was written later."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says the complaints are the evidence for the break with Britain.",
    "pinpointMiss": "That sentence may belong in the piece, but it does not say the complaints are the evidence.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. It explains the break and supports it with evidence: complaints against the king.",
      "b": "The three branches were set up by the Constitution, not by this document.",
      "c": "The Declaration stated ideas about rights, but it did not end slavery.",
      "d": "The text argues the opposite: these rights cannot be taken away, even by a king."
    }
  },
  "mustInclude": [
    "Says the Declaration explained a break with Britain, or gives July 4, 1776.",
    "States a claim about rights or about consent of the governed.",
    "Says the complaint list is evidence against the king, and does not treat the document as the Constitution."
  ],
  "modelAnswer": "The Declaration was adopted on July 4, 1776, to explain to the world why the colonies were breaking from Britain. It says people have rights to life, liberty, and the pursuit of happiness, and that a government's power comes from the consent of the governed. The long list of complaints against King George III is the evidence that supports that break.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.14A. Thomas Jefferson wrote the first draft; the Continental Congress adopted the Declaration July 4, 1776, to explain to the world the break with Britain. It is an argument, not a constitution. Claims: rights to life, liberty, and the pursuit of happiness that cannot be taken away; governments get power from the consent of the governed. Longest part is grievances against King George III (for example, taxes without consent), and that list is the evidence. It did not create the three branches and did not end slavery. The Constitution and its Bill of Rights came later. Do not accept three-branches purpose, kindest-founder, king may take any right, freed every enslaved person in 1776, complaint list is the Bill of Rights, or fame as evidence. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "rights",
      "list"
    ],
    "walkLine": "The rights claim is what the complaint list is trying to prove.",
    "why": {
      "a": "Yes. Without the claim, the list has no idea to support.",
      "b": "The purpose is still there. The document was still written to announce a break.",
      "c": "Fame is not evidence. The list needs the claim.",
      "d": "Removing the claim does not turn the list into the Bill of Rights."
    }
  },
  "look": {
    "key": "page",
    "hint": "Follow the arrows. A quill on a page, a person showing it to a crowd, then a long scroll.",
    "why": "Yes. The page, the public claim, then the long list."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes say the Declaration did not set up the three branches.",
    "why": "Yes. It announced a break, and the Constitution set up the branches later."
  }
};
