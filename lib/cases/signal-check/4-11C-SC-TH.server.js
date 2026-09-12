// SERVER ONLY — Thread rubric for 4.11C-SC-TH.

export const SERVER_CASE = {
  standard: "4.11C-SC-TH",
  title: 'Thread: Solid Rock Only?',
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
    "gaps",
    "sandstone",
    "not",
  ],
  modelAnswer:
    'Flag Soak + Zoom + Pore helpful. Brick + Fake misleading. Tray off-topic. Reply: sandstone has gaps that hold water — not all rock is solid through.',
};
