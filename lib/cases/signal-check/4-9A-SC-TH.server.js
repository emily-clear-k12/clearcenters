// SERVER ONLY — Thread rubric for 4.9A-SC-TH.

export const SERVER_CASE = {
  standard: "4.9A-SC-TH",
  title: 'Thread: Cold Causes Sunset?',
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
    "tilt",
    "not cold",
    "before",
  ],
  modelAnswer:
    'Flag Ahead + Warm + Tilt helpful. Chill + Freeze misleading. Cocoa off-topic. Reply: cold doesn\'t cause earlier sunset — tilt/orbit does.',
};
