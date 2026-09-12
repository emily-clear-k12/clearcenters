/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Money (TEKS 3.5A)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Money.earn-spend-save-donate",
  standard: "SS.3.FR.Money",
  teks: "3.5A",
  title: "Earn, Spend, Save, or Donate?",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "earn", label: "Earn" },
    { id: "spend", label: "Spend" },
    { id: "save", label: "Save" },
    { id: "donate", label: "Donate" }
  ],

  rule:
    "Earn means get money for work. Spend means use money to buy things. Save means keep money for later. Donate means give money to help others.",

  items: [
    { id: "mow_lawn", prompt: "Mowing a neighbor's lawn for pay", correctBinId: "earn" },
    { id: "bake_sale_job", prompt: "Working at a bake sale for tips", correctBinId: "earn" },
    { id: "lemonade_stand", prompt: "Selling lemonade on the sidewalk", correctBinId: "earn" },
    { id: "dog_walk", prompt: "Walking dogs for money", correctBinId: "earn" },
    { id: "chore_allowance", prompt: "Getting allowance for chores", correctBinId: "earn" },
    { id: "yard_sale_help", prompt: "Helping at a yard sale for pay", correctBinId: "earn" },
    { id: "buy_snack", prompt: "Buying a snack at the store", correctBinId: "spend" },
    { id: "pay_movie", prompt: "Paying for a movie ticket", correctBinId: "spend" },
    { id: "buy_book", prompt: "Buying a new book", correctBinId: "spend" },
    { id: "buy_toy", prompt: "Buying a toy with your money", correctBinId: "spend" },
    { id: "pay_game", prompt: "Paying to play an arcade game", correctBinId: "spend" },
    { id: "buy_lunch", prompt: "Buying lunch at school", correctBinId: "spend" },
    { id: "piggy_bank", prompt: "Putting coins in a piggy bank", correctBinId: "save" },
    { id: "bank_account", prompt: "Putting money in a bank account", correctBinId: "save" },
    { id: "jar_goal", prompt: "Saving for a bike in a jar", correctBinId: "save" },
    { id: "skip_candy", prompt: "Not buying candy to keep money", correctBinId: "save" },
    { id: "birthday_save", prompt: "Keeping birthday money for later", correctBinId: "save" },
    { id: "college_fund", prompt: "Adding money to a college fund", correctBinId: "save" },
    { id: "animal_shelter", prompt: "Giving money to an animal shelter", correctBinId: "donate" },
    { id: "food_drive", prompt: "Giving money for a food drive", correctBinId: "donate" },
    { id: "charity_box", prompt: "Dropping coins in a charity box", correctBinId: "donate" },
    { id: "disaster_relief", prompt: "Giving to disaster relief", correctBinId: "donate" },
    { id: "school_fundraiser", prompt: "Giving to a school fundraiser", correctBinId: "donate" },
    { id: "toy_drive_money", prompt: "Giving money for a toy drive", correctBinId: "donate" }
  ],
};
