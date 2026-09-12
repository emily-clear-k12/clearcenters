// SERVER ONLY — Thread rubric for 4.10B-SC-TH.

export const SERVER_CASE = {
  standard: "4.10B-SC-TH",
  title: 'Thread: New Rocks Appear?',
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
    "sediment",
    "upstream",
    "not new",
  ],
  modelAnswer:
    'Flag Source + Curve + Twin helpful. Create + Pop misleading. Raft off-topic. Reply: sediment moved from upstream — river didn\'t invent rocks.',
};
