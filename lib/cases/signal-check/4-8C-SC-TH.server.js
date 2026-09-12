// SERVER ONLY — Thread rubric for 4.8C-SC-TH.

export const SERVER_CASE = {
  standard: "4.8C-SC-TH",
  title: 'Thread: Power Used Up?',
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
    "same",
    "loop",
    "not",
  ],
  modelAnswer:
    'Flag Twin + Pull + Path helpful. First + Empty misleading. Glow off-topic. Reply: power isn\'t used up by the first bulb — full loop, same glow.',
};
