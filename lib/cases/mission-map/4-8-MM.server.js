// Mission Map — "Primary Source Lockbox" — SERVER ONLY.
// Never import this from a client component. See 4-8-MM.public.js for the
// TEKS 4.19A alignment.

export const SERVER_CASE = {
  standard: "4.8-MM",
  title: "Primary Source Lockbox",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", type: "showdown", correctSide: "A" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The settler's diary is a primary source because it's a firsthand, handwritten account written by the settler herself about her own day. The diary can prove what this one settler experienced and felt, but it cannot prove that every settler in Texas felt exactly the same way — that would be overclaiming what one person's account can show. The same is true of the photograph, which can only prove what the camera captured in that one moment, and the survey map, which can only prove what route was planned, not what settlers actually did afterward. Using a source honestly means understanding both what it can prove and what it can't, instead of stretching one source to speak for everyone.",

  mustInclude: [
    "Identifies the diary as a primary source and explains why (firsthand, written by the person who experienced it)",
    "States what the diary can prove (one settler's own experience)",
    "Explains why the diary cannot prove what every settler in Texas felt, without overclaiming",
  ],
};
