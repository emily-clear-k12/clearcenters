// SERVER ONLY.
// Assembly Deck — ELA.5.12C-AD.

export const SERVER_CASE = {
  standard: "ELA.5.12C-AD",
  title: "The Case for Later Practice",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], evidence: ["r1p2", "r1p3"], reasoning: ["r1p4"], conclusion: ["r1p5"] },
      decoys: {
        r1p6: "This insults the other side instead of arguing against it. A reader who disagrees stops here.",
        r1p7: "The survey says the opposite — 61 of 84 students eat nothing. One false claim makes a reader doubt the rest.",
      },
      decoyReason: { r1p6: "opinion", r1p7: "contradicts" },
      misplacementNotes: {
        r1p1: "This is the claim, so it opens the argument.",
        r1p2: "This is data from the packet — evidence.",
        r1p3: "This is data from the packet — evidence.",
        r1p4: "This explains why the data supports the claim, so it is the reasoning.",
        r1p5: "This states what the paragraph has established, so it closes it.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], evidence: ["r2p2", "r2p3"], reasoning: ["r2p4"], conclusion: ["r2p5"] },
      decoys: {
        r2p6: "This attacks the motives of people who disagree. It is an opinion, and it loses exactly the reader you are trying to persuade.",
        r2p7: "The packet says the opposite — four families raised a pickup concern. Pretending otherwise gets caught immediately.",
      },
      decoyReason: { r2p6: "opinion", r2p7: "contradicts" },
      misplacementNotes: {
        r2p1: "This names the objection, so it opens the paragraph.",
        r2p2: "This is a fact that makes the objection real — evidence.",
        r2p3: "This is a fact that makes the objection real — evidence.",
        r2p4: "This answers the objection, so it is the reasoning.",
        r2p5: "This says where the objection lands, so it closes the paragraph.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], evidence: ["r3p2", "r3p3"], reasoning: ["r3p4"], conclusion: ["r3p5"] },
      decoys: {
        r3p6: "One story about a cousin's school is not evidence that this change would work here.",
        r3p7: "If everyone already agreed, there would be no decision to make. The claim is also not in the packet.",
      },
      decoyReason: { r3p6: "anecdote", r3p7: "unsupported" },
      misplacementNotes: {
        r3p1: "This is the specific ask, so it opens the paragraph.",
        r3p2: "This shows the ask is workable — evidence.",
        r3p3: "This shows the ask answers the families' concern — evidence.",
        r3p4: "This explains the payoff, so it is the reasoning.",
        r3p5: "This closes with a low-risk way to decide, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "Claim and evidence first, then the objection answered, then the ask — an argument that asks before it answers the objection invites the reader to refuse.",
  decoyProtest: {
    r1p6: "Worst idea ever! That's rhetoric! That's persuasive! ...That's an insult, isn't it.",
    r1p7: "A full breakfast! Cereal! Eggs! ...Sixty-one of eighty-four said nothing. I know.",
    r2p6: "They don't care about kids! Prove they do! ...That's not how arguing works, is it.",
    r2p7: "No concerns! Zero! ...Four families. It's in the packet. Anyone can check.",
    r3p6: "My cousin's school WON. With a trophy. That has to count for something.",
    r3p7: "Everyone agrees! ...If everyone agreed, nobody would need to read this.",
  },
  requester: { name: "The athletic director", emoji: "🏟️", replies: {
    great: "You've convinced me to try it. You brought the numbers, you took the gym conflict and the pickup problem seriously instead of pretending they weren't real, and you asked for something specific. That's why I'm saying yes to one season.",
    good: "This is a real argument and I'm considering it. A couple of lines leaned on feeling rather than the packet, and the other side will notice that — but the ask is clear.",
    rough: "I can tell what you want, but a few sentences in here would hand the other side an easy win. Let's tighten it before I take this to the coaches.",
  } },
  trap: { roundId: "r2", position: 2, text: "Anyone who really cared about the team would have moved practice already.", why: "This turns a scheduling disagreement into an accusation. The paragraph's whole job is to answer the objection without insulting the person making it." },
  debrief: {
    // Either sentence is a defensible answer: r2p1 names the objection, r2p5
    // concedes it is real. Both are the move the question is asking about.
    pinpointAccept: ["r2p1", "r2p5"],
    pinpointWhy: "Right. Naming the objection, then answering it, is what makes the case hold. An argument that pretends the other side has nothing reads like it never checked.",
    pinpointMiss: "That sentence argues your side. Look for the one that states the objection before answering it.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. 68 percent against 91 percent is a number the athletic director can look up. \"Attendance is better\" is a claim they have to take on trust.",
      b: "Length is not evidence. A number is shorter than the sentence that avoids it.",
      c: "Being on the team is a reason to care, not a reason to believe. The reader still needs proof.",
      d: "It shows one scheduling choice is not working. That is a much narrower claim, and a narrower claim is easier to defend.",
    },
  },
  mustInclude: [
    "Names the objection the report takes seriously — the gym is booked until 4:30, or the pickup problem for four families.",
    "Says how the report answers it — a 4:30 start on two days, a carpool, or scheduling answers to scheduling problems.",
    "Says what a reader would think if the objection had been left out, such as that the writer had not considered it or was hiding it.",
  ],
  modelAnswer: "My report takes the crowded-afternoon objection seriously: the gym is booked by middle school teams until 4:30 on Tuesdays and Thursdays, and four families raised a pickup problem. I answer both with a schedule — a 4:30 start on those two days and a carpool for those families. If I had left that paragraph out, the athletic director would have thought of the gym booking himself and assumed I either had not checked or was hoping he would not notice.",
  aiContext: "Grade 5 ELAR argumentative writing, TEKS 5.12C. Target idea: addressing the counterargument honestly strengthens a case, because the reader who disagrees is the reader you have to convince. Accept plain-word versions of the credibility idea, such as 'he would think I did not know about it.' Either objection counts.",
};
