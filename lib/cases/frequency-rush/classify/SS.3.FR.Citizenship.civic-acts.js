/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Citizenship (TEKS 3.9C)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Citizenship.civic-acts",
  standard: "SS.3.FR.Citizenship",
  teks: "3.9C",
  title: "What Kind of Civic Act?",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "obeying_laws", label: "Obeying Laws" },
    { id: "serving_community", label: "Serving Community" },
    { id: "jury", label: "Jury" },
    { id: "voting", label: "Voting" }
  ],

  rule:
    "Sort each civic act: obeying laws, serving the community, serving on a jury, or voting.",

  items: [
    { id: "stop_sign", prompt: "Stopping at a red light", correctBinId: "obeying_laws" },
    { id: "wear_seatbelt", prompt: "Wearing a seat belt", correctBinId: "obeying_laws" },
    { id: "no_litter", prompt: "Not littering in the park", correctBinId: "obeying_laws" },
    { id: "speed_limit", prompt: "Driving the speed limit", correctBinId: "obeying_laws" },
    { id: "pay_taxes", prompt: "Paying required taxes", correctBinId: "obeying_laws" },
    { id: "crosswalk", prompt: "Using the crosswalk", correctBinId: "obeying_laws" },
    { id: "food_bank", prompt: "Volunteering at a food bank", correctBinId: "serving_community" },
    { id: "park_cleanup", prompt: "Cleaning up a neighborhood park", correctBinId: "serving_community" },
    { id: "tutor_kids", prompt: "Tutoring younger students", correctBinId: "serving_community" },
    { id: "blood_drive", prompt: "Helping at a blood drive", correctBinId: "serving_community" },
    { id: "plant_trees", prompt: "Planting trees on Earth Day", correctBinId: "serving_community" },
    { id: "senior_visit", prompt: "Visiting seniors at a care home", correctBinId: "serving_community" },
    { id: "jury_duty", prompt: "Serving on a jury when called", correctBinId: "jury" },
    { id: "listen_trial", prompt: "Listening carefully during a trial", correctBinId: "jury" },
    { id: "decide_case", prompt: "Deciding a case with other jurors", correctBinId: "jury" },
    { id: "fair_verdict", prompt: "Giving a fair verdict based on facts", correctBinId: "jury" },
    { id: "court_summons", prompt: "Answering a jury summons", correctBinId: "jury" },
    { id: "jury_room", prompt: "Discussing evidence in the jury room", correctBinId: "jury" },
    { id: "vote_mayor", prompt: "Voting for mayor", correctBinId: "voting" },
    { id: "ballot_box", prompt: "Casting a ballot on election day", correctBinId: "voting" },
    { id: "vote_bond", prompt: "Voting on a school bond", correctBinId: "voting" },
    { id: "register_vote", prompt: "Registering to vote when old enough", correctBinId: "voting" },
    { id: "vote_president", prompt: "Voting for President", correctBinId: "voting" },
    { id: "early_voting", prompt: "Using early voting at the library", correctBinId: "voting" }
  ],
};
