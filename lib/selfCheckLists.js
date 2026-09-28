// One list per activity. Placeholders until a colleague approves the wording.
// Group Chat and Signal Check stay per case. Mission Map and Simulation Lab
// use the list on the case itself.

export const REQUIRED_CHECKS = 3;

export const CONFIDENCE_LEVELS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

export const ACTIVITY_CHECKS = {
  assembly_deck: [
    "I read the notes before I picked sentences.",
    "Every sentence I kept matches the notes.",
    "I said why each leftover sentence didn't belong.",
    "My answer uses a detail from my report.",
  ],
  classification_lab: [
    "I read each group's rule before I sorted.",
    "Everything in Neither really fits no group.",
    "I put things in the middle of the Venn only if they fit both sides.",
    "I can say the rule I used.",
  ],
  exhibit_hall: [
    "Each piece I picked proves its spot's job.",
    "I left out the myth and the pieces from the wrong place.",
    "I read the late field note.",
    "My plaque answers the question.",
  ],
  expedition_station: [
    "I showed my thinking, not just the answer.",
    "I checked that my answer makes sense in the story.",
    "I tried before I used a hint.",
    "I could explain one step to a friend.",
  ],
  maker_studio: [
    "My piece answers the prompt.",
    "I used my own words.",
    "I included a fact or example that proves my idea.",
    "Someone could understand it without me explaining.",
  ],
  broadcast_booth: [
    "I said the big idea clearly.",
    "I gave an example or proof.",
    "I listened to my clips before I sent them.",
    "I spoke slowly and clearly.",
  ],
};
