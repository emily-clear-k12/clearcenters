/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Ecosystems (TEKS 4.12B - producer/consumer/decomposer)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Ecosystems.roles",
  standard: "4.FR.Ecosystems",
  teks: "4.12B",
  title: "Producer, Consumer, or Decomposer?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "producer", label: "Producer" },
    { id: "consumer", label: "Consumer" },
    { id: "decomposer", label: "Decomposer" },
  ],

  rule:
    "Producers make their own food (usually plants). Consumers eat other organisms. Decomposers break down dead material.",

  items: [
    { id: "grass", prompt: "Grass in a field", correctBinId: "producer" },
    { id: "oak_tree", prompt: "An oak tree", correctBinId: "producer" },
    { id: "algae", prompt: "Algae in a pond", correctBinId: "producer" },
    { id: "sunflower", prompt: "A sunflower", correctBinId: "producer" },
    { id: "cactus", prompt: "A desert cactus", correctBinId: "producer" },
    { id: "seaweed", prompt: "Seaweed in the ocean", correctBinId: "producer" },
    { id: "corn_plant", prompt: "A corn plant", correctBinId: "producer" },
    { id: "moss", prompt: "Moss on a rock", correctBinId: "producer" },

    { id: "rabbit", prompt: "A rabbit eating grass", correctBinId: "consumer" },
    { id: "hawk", prompt: "A hawk hunting mice", correctBinId: "consumer" },
    { id: "deer", prompt: "A deer browsing leaves", correctBinId: "consumer" },
    { id: "shark", prompt: "A shark", correctBinId: "consumer" },
    { id: "butterfly", prompt: "A butterfly sipping nectar", correctBinId: "consumer" },
    { id: "human", prompt: "A human eating lunch", correctBinId: "consumer" },
    { id: "frog", prompt: "A frog catching insects", correctBinId: "consumer" },
    { id: "cow", prompt: "A cow grazing", correctBinId: "consumer" },

    { id: "mushroom", prompt: "A mushroom on a log", correctBinId: "decomposer" },
    { id: "earthworm", prompt: "An earthworm in soil", correctBinId: "decomposer" },
    { id: "bacteria", prompt: "Bacteria breaking down leaves", correctBinId: "decomposer" },
    { id: "fungi_mold", prompt: "Mold on a fallen apple", correctBinId: "decomposer" },
    { id: "millipede", prompt: "A millipede eating dead plants", correctBinId: "decomposer" },
    { id: "dung_beetle", prompt: "A dung beetle", correctBinId: "decomposer" },
    { id: "bracket_fungus", prompt: "Bracket fungus on a dead tree", correctBinId: "decomposer" },
    { id: "soil_microbes", prompt: "Soil microbes recycling nutrients", correctBinId: "decomposer" },
  ],
};