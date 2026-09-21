// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// ELAR Group Chat — ELA.4.9E. TEKS 4.9E(ii) — recognize characteristics and structures of argumentative text by explaining how the author has used facts for an argument.

export const SERVER_CASE = {
  standard: "ELA.4.9E",
  title: "One True Fact",
  bigQuestion: "A letter says Oakwood should switch to a four-day week, and one of its facts is true. Does that prove the argument?",
  evidenceBank: [
    "Some Texas school districts already use a four-day week",
    "Some of those districts say students missed fewer days after switching",
    "The letter's claim is that a four-day week would make Oakwood a better school",
    "A fact can be true and still not prove the claim",
    "The letter never explains how fewer missed days would make Oakwood better"
  ],
  trapLine: "Some Texas schools already have four-day weeks. That's TRUE. So the argument is proved. Case closed.",
  castNames: {
    diego: "Diego",
    tired: "Tired on Tuesdays",
    frank: "Frank Fact",
    fiona: "Fiona Fact",
    hale: "Principal Hale"
  },
  distractors: "Thinking any true fact proves an argument; confusing that something is possible with that it is better; judging an argument by how confident it sounds; thinking more facts always make a stronger argument, whether they connect to the claim or not.",
  mustInclude: [
    "It names the claim: Oakwood should switch to a four-day week.",
    "It explains that Frank Fact only shows a four-day week is possible, not that it is better.",
    "It explains that Fiona Fact connects more closely to why the claim might be true.",
    "It says the argument is not proved just because one fact is true.",
    "It gives a rule: a fact helps an argument only when the author connects it to the claim."
  ],
};
