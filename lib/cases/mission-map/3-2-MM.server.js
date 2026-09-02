// Mission Map — "Weather Station Lockdown" — SERVER ONLY.
// Never import this from a client component. See 3-2-MM.public.js for the
// TEKS 3.10A alignment and the same-time/two-locations reframing.

export const SERVER_CASE = {
  standard: "3.2-MM",
  title: "Weather Station Lockdown",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", type: "showdown", correctSide: "A" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Lake Camp and Ridge Camp had different weather at the same time today. At 2:00 PM, Lake Camp's thermometer read 61°F while Ridge Camp's read 54°F — a real difference measured at the exact same time. Their wind readings were different too: Lake Camp's wind sock was barely moving, while Ridge Camp's was gusting hard from the west. Ridge Camp's rain gauge also measured 0.4 inches of real rainfall, even though it wasn't raining at Lake Camp. Two places can have different weather at the same time even when they're close together, because things like elevation, nearby water, and wind patterns can be different from one spot to the next — being only four miles apart doesn't mean the weather has to match.",

  mustInclude: [
    "Uses at least two of the three tool readings (thermometer, wind sock, rain gauge) with specific numbers or descriptions to show the two stations were different",
    "Makes clear the comparison is between two locations at the same time (2:00 PM), not two different days",
    "Explains that nearby places can have different weather at the same time, not just asserts that they did",
  ],
};
