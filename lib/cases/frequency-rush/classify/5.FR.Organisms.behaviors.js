/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Organisms (TEKS 5.13B - instinctual/learned behaviors)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Organisms.behaviors",
  standard: "5.FR.Organisms",
  teks: "5.13B",
  title: "Instinctual or Learned?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "instinctual", label: "Instinctual" },
    { id: "learned", label: "Learned" },
  ],

  rule:
    "Instinctual behaviors are inborn and do not need to be taught. Learned behaviors are gained from experience or teaching.",

  items: [
    { id: "baby_cry", prompt: "A newborn baby crying when hungry", correctBinId: "instinctual" },
    { id: "spider_web", prompt: "A spider spinning a web", correctBinId: "instinctual" },
    { id: "bird_migration", prompt: "Birds migrating in season", correctBinId: "instinctual" },
    { id: "turtle_nest", prompt: "A sea turtle returning to nest on a beach", correctBinId: "instinctual" },
    { id: "blink", prompt: "Blinking when something nears your eye", correctBinId: "instinctual" },
    { id: "suckling", prompt: "A mammal pup suckling milk", correctBinId: "instinctual" },
    { id: "bee_dance_innate", prompt: "A honeybee building honeycomb cells", correctBinId: "instinctual" },
    { id: "salmon_swim", prompt: "Salmon swimming upstream to spawn", correctBinId: "instinctual" },
    { id: "goose_imprint_startle", prompt: "A kitten arching its back when startled", correctBinId: "instinctual" },
    { id: "yawn", prompt: "Yawning when tired", correctBinId: "instinctual" },
    { id: "ant_trail_build", prompt: "Ant nest-building patterns", correctBinId: "instinctual" },
    { id: "sneeze", prompt: "Sneezing when dust enters the nose", correctBinId: "instinctual" },

    { id: "dog_sit", prompt: "A dog sitting on command", correctBinId: "learned" },
    { id: "ride_bike", prompt: "Riding a bicycle", correctBinId: "learned" },
    { id: "read", prompt: "Reading a book", correctBinId: "learned" },
    { id: "bird_song_dialect", prompt: "A songbird copying its local song dialect", correctBinId: "learned" },
    { id: "tie_shoes", prompt: "Tying shoelaces", correctBinId: "learned" },
    { id: "bear_open_bin", prompt: "A bear opening a campsite food bin", correctBinId: "learned" },
    { id: "dolphin_trick", prompt: "A dolphin doing a trained flip", correctBinId: "learned" },
    { id: "write_name", prompt: "Writing your name", correctBinId: "learned" },
    { id: "chimps_tools", prompt: "Chimpanzees using sticks as tools (taught by group)", correctBinId: "learned" },
    { id: "speak_language", prompt: "Speaking a human language", correctBinId: "learned" },
    { id: "cat_litter", prompt: "A house cat using a litter box after training", correctBinId: "learned" },
    { id: "maze_rat", prompt: "A lab rat finding food in a maze", correctBinId: "learned" },
  ],
};