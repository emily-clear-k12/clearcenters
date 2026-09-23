// Mission Map — "Summary Lock Path" — SERVER ONLY.
// Never import this from a client component. See 4-17-MM.public.js for the
// TEKS 4.7D alignment and the design notes.

export const SERVER_CASE = {
  standard: "4.17-MM",
  title: "Summary Lock Path",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", type: "sequence", correctOrder: ["a", "b", "c", "d"] },
    { id: "cp3", type: "quickScan", correctChoiceId: "b" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "b" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Class 4B planted lettuce in the school garden, but rabbits kept eating it at night. They built a wire fence, the lettuce grew back, and they served salad at the school lunch. I left out the watering cans because they are a small detail, and the story makes sense without them. I left out \"It was the best class project ever\" because that is an opinion. A summary tells what happened without adding what the writer thinks about it.",

  mustInclude: [
    "Summarizes the key events — planting, rabbits eating the lettuce, the fence, serving salad — in logical order",
    "Explains that the watering-can colors are a minor detail the story does not need",
    "Explains that 'the best class project ever' is an opinion and a summary stays neutral",
  ],
};
