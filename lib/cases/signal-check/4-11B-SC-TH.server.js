// SERVER ONLY — Thread rubric for 4.11B-SC-TH.

export const SERVER_CASE = {
  standard: "4.11B-SC-TH",
  title: 'Thread: Just One Battery?',
  caseShape: "thread",
  stemMode: "dropdown-open",
  commentFlags: {
    c1: "misleading",
    c2: "helpful",
    c3: "helpful",
    c4: "off_topic",
    c5: "helpful",
    c6: "misleading",
  },
  mustFlagIds: ["c1", "c2", "c3", "c4", "c5", "c6"],
  replyMustInclude: [
    "adds up",
    "200",
    "recycle",
  ],
  modelAnswer:
    'Flag Tally + Path + Math helpful. Shrug + Free misleading. Zap off-topic. Reply: one battery adds up — class hit 200+; recycle them.',
};
