// Mission Map — "Inference Investigation" — SERVER ONLY.
// Never import this from a client component. See 5-13-MM.public.js for the
// TEKS 5.6F alignment and the design notes.

export const SERVER_CASE = {
  standard: "5.13-MM",
  title: "Inference Investigation",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", correctChoiceId: "c" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "quickScan", correctChoiceId: "b" },
    { id: "cp5", type: "showdown", correctSide: "B" },
    { id: "cp6", correctChoiceId: "b" },
  ],

  modelAnswer:
    "I infer that Marcus feels nervous about the tryout, but that he also cares a lot about making the team. One clue is that he keeps checking the clock while his knee bounces and his hands shake, which suggests he is anxious about what is coming. Another clue is that he tells Dana he is \"totally fine,\" but his voice cracks, so his words and his feelings do not match. His notebook is worn from a month of daily practice, which shows how much the tryout matters to him. I know from experience that people often get nervous right before something they have worked hard for. \"Marcus is getting sick\" is not supported because the story never mentions a fever, a cough, or feeling unwell. It could be true in real life, but an inference has to come from the text.",

  mustInclude: [
    "States an inference about Marcus's feelings (nervous/anxious, and ideally that he cares or has worked hard)",
    "Supports it with at least TWO specific text clues (checking the clock, bouncing knee, shaking hands, cracking voice, worn practice notebook) and explains what each suggests",
    "Explains that 'getting sick' is possible but unsupported because nothing in the text points to illness",
  ],
};
