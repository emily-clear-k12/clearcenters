// Mission Map — "Open the Water Cycle Vault" — SERVER ONLY.
// Never import this from a client component. See 4-2-MM.public.js for the
// TEKS 4.10A alignment.

export const SERVER_CASE = {
  standard: "4.2-MM",
  title: "Open the Water Cycle Vault",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "sequence", correctOrder: ["evap", "cond", "precip", "collect"] },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Water moves through the cycle in order: first evaporation, when the Sun's heat gives water energy to rise as vapor; then condensation, when that rising vapor cools and clumps into clouds; then precipitation, when the water falls back down as rain or snow; and finally collection, when it gathers in rivers, lakes, and puddles again. The Sun's role is to provide the energy that drives evaporation in the first place — without the Sun's heat, water wouldn't rise into the air to start the cycle. The cycle keeps repeating because the Sun keeps providing that same energy every day, over and over, so the same water evaporates, condenses, falls, and collects again and again instead of the process ever really stopping.",

  mustInclude: [
    "Names all four stages of the water cycle (evaporation, condensation, precipitation, collection) in the correct order",
    "Explains the Sun's specific role — providing the energy that drives evaporation — not just mentioning the Sun in passing",
    "Explains why the cycle keeps repeating (the Sun's energy keeps driving it) rather than just stating that it does",
  ],
};
