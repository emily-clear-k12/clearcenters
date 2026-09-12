/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Ecosystems (TEKS 5.12A - biotic/abiotic)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Ecosystems.biotic-abiotic",
  standard: "5.FR.Ecosystems",
  teks: "5.12A",
  title: "Biotic or Abiotic?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "biotic", label: "Biotic" },
    { id: "abiotic", label: "Abiotic" },
  ],

  rule:
    "Biotic factors are living (or once-living) parts of an ecosystem. Abiotic factors are nonliving parts.",

  items: [
    { id: "oak_tree", prompt: "An oak tree", correctBinId: "biotic" },
    { id: "deer", prompt: "A deer", correctBinId: "biotic" },
    { id: "mushroom", prompt: "A mushroom", correctBinId: "biotic" },
    { id: "bacteria", prompt: "Soil bacteria", correctBinId: "biotic" },
    { id: "grass", prompt: "Grass", correctBinId: "biotic" },
    { id: "fish", prompt: "A fish in a pond", correctBinId: "biotic" },
    { id: "insect", prompt: "A beetle", correctBinId: "biotic" },
    { id: "bird", prompt: "A nesting bird", correctBinId: "biotic" },
    { id: "algae", prompt: "Pond algae", correctBinId: "biotic" },
    { id: "earthworm", prompt: "An earthworm", correctBinId: "biotic" },
    { id: "fallen_leaf", prompt: "A fallen leaf (once living)", correctBinId: "biotic" },
    { id: "human", prompt: "A human hiker", correctBinId: "biotic" },

    { id: "sunlight", prompt: "Sunlight", correctBinId: "abiotic" },
    { id: "water", prompt: "Pond water", correctBinId: "abiotic" },
    { id: "rock", prompt: "A rock", correctBinId: "abiotic" },
    { id: "air", prompt: "Air / oxygen", correctBinId: "abiotic" },
    { id: "temperature", prompt: "Air temperature", correctBinId: "abiotic" },
    { id: "soil_minerals", prompt: "Minerals in soil", correctBinId: "abiotic" },
    { id: "rain", prompt: "Rain", correctBinId: "abiotic" },
    { id: "sand", prompt: "Beach sand", correctBinId: "abiotic" },
    { id: "wind", prompt: "Wind", correctBinId: "abiotic" },
    { id: "sunlight_heat", prompt: "Heat from the sun", correctBinId: "abiotic" },
    { id: "clay", prompt: "Clay soil particles", correctBinId: "abiotic" },
    { id: "ice", prompt: "Ice on a lake", correctBinId: "abiotic" },
  ],
};