// SERVER ONLY — Thread rubric for 4.6B-SC-TH.

export const SERVER_CASE = {
  standard: "4.6B-SC-TH",
  title: 'Thread: One New Liquid?',
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
    "separate",
    "layers",
    "not",
  ],
  modelAnswer:
    'Flag Layer + Repeat + Drop helpful. Stir + Forever misleading. Snack off-topic. Reply: claim is false — oil and water separate again, not one new liquid.',
};
