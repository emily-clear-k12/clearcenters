// SERVER ONLY — Thread rubric for 4.12C-SC-TH.

export const SERVER_CASE = {
  standard: "4.12C-SC-TH",
  title: 'Thread: Dropped Shell?',
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
    "embedded",
    "sea",
    "not dropped",
  ],
  modelAnswer:
    'Flag Stuck + Layer + Sea helpful. Drop + Pocket misleading. Boot off-topic. Reply: shell is embedded from an ancient sea — not dropped.',
};
