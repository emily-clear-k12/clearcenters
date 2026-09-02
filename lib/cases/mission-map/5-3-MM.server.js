// Mission Map — "Matter Mystery Lockbox" — SERVER ONLY.
// Never import this from a client component. See 5-3-MM.public.js for the
// TEKS 5.6A alignment.

export const SERVER_CASE = {
  standard: "5.3-MM",
  title: "Matter Mystery Lockbox",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", type: "quickScan", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The lockbox's material has a lower density than water, since it floated instead of sinking. It isn't magnetic — a magnet held right against it didn't pull it at all. It also conducts heat poorly, staying cool to the touch much longer than a typical metal would when touched to a warm surface. Even though the sample looks shiny like metal, its shiny appearance wasn't enough to identify it, because none of its actual tested properties match what a typical metal would show — a real metal would usually be denser, often magnetic, and a much better heat conductor. Based on these properties, it would make more sense as a pot handle, which needs to stay cool near heat, than as something like a frying pan surface.",

  mustInclude: [
    "Uses at least three tested properties (density/floating, magnetism, heat conductivity) as evidence with specific results",
    "Explains why the shiny appearance alone wasn't enough to identify the material as metal",
    "Connects the properties to a logical real-world use (or explicitly rules metal out), not just listing test results",
  ],
};
