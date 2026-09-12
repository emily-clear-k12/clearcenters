/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.History (TEKS 5.2A)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.History.revolution-causes",
  standard: "SS.5.FR.History",
  teks: "5.2A",
  title: "Revolution Cause or Effect?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "cause", label: "Cause" },
    { id: "effect", label: "Effect" }
  ],

  rule:
    "Causes helped start the American Revolution. Effects happened because of the Revolution.",

  items: [
    { id: "stamp_act", prompt: "Parliament passes the Stamp Act", correctBinId: "cause" },
    { id: "tea_tax", prompt: "Taxes on tea anger colonists", correctBinId: "cause" },
    { id: "no_representation", prompt: "No taxation without representation", correctBinId: "cause" },
    { id: "quartering", prompt: "Soldiers quartered in colonial homes", correctBinId: "cause" },
    { id: "boston_massacre", prompt: "The Boston Massacre raises tensions", correctBinId: "cause" },
    { id: "intolerable_acts", prompt: "The Intolerable Acts punish Boston", correctBinId: "cause" },
    { id: "proclamation_1763", prompt: "Proclamation of 1763 limits western land", correctBinId: "cause" },
    { id: "townshend", prompt: "Townshend Acts tax imports", correctBinId: "cause" },
    { id: "boston_tea_party", prompt: "Boston Tea Party protests taxes", correctBinId: "cause" },
    { id: "writs_assistance", prompt: "Writs of assistance allow searches", correctBinId: "cause" },
    { id: "king_rejects", prompt: "The king rejects colonial petitions", correctBinId: "cause" },
    { id: "mercantilism", prompt: "Mercantilist rules limit colonial trade", correctBinId: "cause" },
    { id: "declaration", prompt: "The Declaration of Independence", correctBinId: "effect" },
    { id: "war_begins", prompt: "War begins at Lexington and Concord", correctBinId: "effect" },
    { id: "new_nation", prompt: "A new independent nation forms", correctBinId: "effect" },
    { id: "treaty_paris", prompt: "Treaty of Paris ends the war", correctBinId: "effect" },
    { id: "articles", prompt: "Articles of Confederation are written", correctBinId: "effect" },
    { id: "loyalists_leave", prompt: "Many Loyalists leave for Britain", correctBinId: "effect" },
    { id: "state_constitutions", prompt: "States write new constitutions", correctBinId: "effect" },
    { id: "military_leaders", prompt: "Washington becomes a national leader", correctBinId: "effect" },
    { id: "debt_after_war", prompt: "The new nation faces war debts", correctBinId: "effect" },
    { id: "inspire_others", prompt: "Other nations are inspired to seek liberty", correctBinId: "effect" },
    { id: "end_british_rule", prompt: "British rule ends in the 13 colonies", correctBinId: "effect" },
    { id: "continental_army_win", prompt: "The Continental Army wins independence", correctBinId: "effect" }
  ],
};
