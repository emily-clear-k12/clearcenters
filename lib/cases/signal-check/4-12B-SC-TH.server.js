// SERVER ONLY — Thread rubric for 4.12B-SC-TH.

export const SERVER_CASE = {
  standard: "4.12B-SC-TH",
  title: 'Thread: Just Tidying?',
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
    "nutrients",
    "food web",
    "not just",
  ],
  modelAnswer:
    'Flag Soil + Grow + Loop helpful. Tidy + Skip misleading. Stick off-topic. Reply: decomposers return nutrients — they\'re part of the food web.',
};
