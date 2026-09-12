// SERVER ONLY — Thread rubric for 4.10A-SC-TH.

export const SERVER_CASE = {
  standard: "4.10A-SC-TH",
  title: 'Thread: Water Gone Forever?',
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
    "vapor",
    "still",
    "not gone",
  ],
  modelAnswer:
    'Flag Cup + Lid + Cycle helpful. Gone + Erase misleading. Splash off-topic. Reply: water became vapor — it still exists in the cycle.',
};
