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
        "r1p5": "The three branches come from the Constitution, not from this document.",
        "r1p6": "Kindest is an opinion about a person. The notes give the document's purpose."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This states the purpose.",
        "r1p2": "This gives the date.",
        "r1p3": "This says what the explanation was for.",
        "r1p4": "This says what kind of text it is, so it goes last."
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
        "r2p5": "The notes say people have rights a government should not destroy. They do not give the king every right.",
        "r2p6": "The notes say the Declaration did not end slavery."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This states the rights.",
        "r2p3": "This states where power comes from.",
        "r2p4": "This keeps the claim from being treated as a finished result, so it goes last."
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
        "r3p5": "The Bill of Rights was added to the Constitution later. This list is complaints against the king.",
        "r3p6": "Fame is not evidence. The notes say the list itself is the evidence."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says who is accused.",
        "r3p3": "This says what the list does.",
        "r3p4": "This says why the evidence matters, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the purpose, then the claims. The complaint list comes last.",
  "decoyProtest": {
    "r1p5": "Branches, complaints, both are lists.",
    "r1p6": "Kindness is in the handwriting.",
    "r2p5": "Kings need a win in the paragraph.",
    "r2p6": "I wanted the happy ending in the same year.",
    "r3p5": "Bill of Rights is the list I remember.",
    "r3p6": "Famous names are the evidence."
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
    "text": "The long list sets up Congress, the president, and the courts.",
    "why": "That list is complaints against the king. The three branches come from the Constitution, not from the Declaration."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says the list is the evidence for the break.",
    "pinpointMiss": "That sentence may belong. It does not say the complaint list is the evidence.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. It explains the break and supports it with complaints against the king.",
      "b": "The three branches are in the Constitution, not this document.",
      "c": "The Declaration stated ideas about rights. It did not end slavery.",
      "d": "The text argues the opposite. Rights are not the king's to take."
    }
  },
  "mustInclude": [
    "Says the Declaration explained a break with Britain, or gives July 4, 1776.",
    "States a claim about rights or about consent of the governed.",
    "Says the complaint list is evidence against the king, and does not treat the document as the Constitution."
  ],
  "modelAnswer": "The Declaration was adopted on July 4, 1776, to explain why the colonies were breaking from Britain. It says people have rights, and that government power comes from consent. The long list of complaints against the king is the evidence for that break.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.14A. Declaration adopted July 4, 1776, to explain the break with Britain. It is an argument, not a constitution. Claims: rights to life, liberty, and the pursuit of happiness; governments get power from the consent of the governed. Longest part is grievances against King George III, and that list is the evidence. It did not create the three branches and did not end slavery. The Constitution came later. Do not accept three-branches purpose, kindest-founder, king may take any right, freed every enslaved person in 1776, complaint list is the Bill of Rights, or fame as evidence. Do not penalize spelling.",
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
    "model": "The notes never say the Declaration created the three branches.",
    "why": "Yes. It announced a break. The Constitution set up the branches later."
  }
};
