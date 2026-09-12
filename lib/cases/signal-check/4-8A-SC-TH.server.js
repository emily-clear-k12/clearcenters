// SERVER ONLY — Thread rubric for 4.8A-SC-TH.

export const SERVER_CASE = {
  standard: "4.8A-SC-TH",
  title: 'Thread: Energy Skips?',
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
    "contact",
    "middle",
    "not skip",
  ],
  modelAnswer:
    'Flag Gap + Wiggle + Touch helpful. Skip + Teleport misleading. Band off-topic. Reply: energy passes through middle bells by contact — no jump.',
};
