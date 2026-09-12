// SERVER ONLY — Thread rubric for 4.9B-SC-TH.

export const SERVER_CASE = {
  standard: "4.9B-SC-TH",
  title: 'Thread: Moon Shrinks?',
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
    "same size",
    "lit",
    "not",
  ],
  modelAnswer:
    'Flag Ruler + Crater + Orbit helpful. Melt + Rebuild misleading. Howl off-topic. Reply: Moon doesn\'t shrink — lit part changes as it orbits.',
};
