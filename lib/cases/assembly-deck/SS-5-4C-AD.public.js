// Safe to import from client components.
// Assembly Deck — SS.5.4C-AD. TEKS 5.4C — the Lewis and Clark expedition
// (verified code, already in use by SS.5.4C-SC).
// Three rounds of four slots, then assembly. Runs about 22 minutes.

export const PUBLIC_CASE = {
  standard: "SS.5.4C-AD",
  mode: "paragraph",
  grade: 5,
  subject: "Social Studies",
  title: "What the Expedition Was For",
  estimatedMinutes: 20,
  brief: [
    "A museum is replacing the placard beside its Lewis and Clark map. The old one said only: 'They explored the West.'",
    "Write the new placard in three paragraphs: why the expedition was sent, what it actually did, and how history should judge it.",
    "Build each paragraph, sort out the sentences the museum will not print, then set the order.",
  ],
  source: {
    title: "MUSEUM RESEARCH CARD",
    lines: [
      "1803: the United States buys the Louisiana Territory from France, roughly doubling the size of the country.",
      "Jefferson's written instructions: find a water route across the continent, record plants, animals, and landforms, and establish relations with American Indian nations.",
      "1804-1806: the Corps of Discovery travels from St. Louis to the Pacific and back.",
      "No all-water route across the continent exists.",
      "The expedition returned with journals, maps, and descriptions of hundreds of plants and animals new to the young United States.",
      "Sacagawea, a Shoshone woman, interpreted and guided for the expedition.",
      "The nations the expedition met had lived on and mapped this land for generations.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "Why the expedition was sent",
      goal: "Build the paragraph on the purchase and the orders that followed it.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "evidence", label: "Evidence from the research card", hint: "Two things the record shows", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "Why a government sends an expedition like this", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What the orders amounted to", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The Corps of Discovery was sent west in 1804 with a specific list of tasks, not a general invitation to explore." },
        { id: "r1p2", text: "The year before, the United States had bought the Louisiana Territory from France, roughly doubling the size of the country." },
        { id: "r1p3", text: "Jefferson's written instructions were to find a water route across the continent, record plants, animals, and landforms, and establish relations with American Indian nations." },
        { id: "r1p4", text: "A government that has just bought land it has never seen needs to know what is on it, how to cross it, and who already lives there." },
        { id: "r1p5", text: "Those three orders — a route, a record, and relations — are the measuring stick for everything that followed." },
        { id: "r1p6", text: "The Louisiana Purchase was the greatest deal in the history of the world." },
        { id: "r1p7", text: "Jefferson sent the expedition mainly to find gold." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "What the expedition actually did",
      goal: "Build the paragraph on the journey and what came back from it.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "evidence", label: "Evidence from the research card", hint: "Two things the record shows", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "Who made the journey possible", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What came home with them", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "From 1804 to 1806 the Corps traveled from St. Louis to the Pacific Ocean and back." },
        { id: "r2p2", text: "They found no all-water route across the continent, because no such route exists." },
        { id: "r2p3", text: "They returned with journals, maps, and descriptions of hundreds of plants and animals that were new to the young United States." },
        { id: "r2p4", text: "They crossed that country with help: Sacagawea, a Shoshone woman, interpreted and guided, and the nations they met had lived on and mapped this land for generations." },
        { id: "r2p5", text: "What came home was not a shortcut but a record — the first detailed American account of land the country had bought sight unseen." },
        { id: "r2p6", text: "The expedition found the all-water route Jefferson was hoping for." },
        { id: "r2p7", text: "Lewis and Clark were the bravest Americans who ever lived." },
      ],
      rejectPrompt: "Two more sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "How history should judge it",
      goal: "Build the paragraph that weighs the expedition against its own orders.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is being judged, and by what standard?", accepts: 1 },
        { id: "evidence", label: "Evidence", hint: "Two results to weigh", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "How to weigh a mission that failed at its main goal", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "The judgment the placard lands on", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "Judged against Jefferson's own three orders, the expedition's record is mixed." },
        { id: "r3p2", text: "It failed completely at the first order: there was no water route to find." },
        { id: "r3p3", text: "It succeeded at the second and third: it brought back a detailed record and made contact with nations across the territory." },
        { id: "r3p4", text: "A mission that fails its headline goal can still matter, if what it learned along the way answered questions the country could not otherwise answer." },
        { id: "r3p5", text: "The expedition is remembered less for the route it did not find than for the map it drew of a country that was already inhabited." },
        { id: "r3p6", text: "The expedition proves that exploring is always worth the cost." },
        { id: "r3p7", text: "Because it missed its main goal, the expedition accomplished nothing of value." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one placard. Set the order a museum visitor should read them in.",
    hint: "You cannot judge a mission before the reader knows what it was ordered to do and what it did.",
    slots: [
      { id: "first", label: "Opens the placard" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the placard" },
    ],
  },
  explain: {
    prompt: "The curator asks: why did you reject those six sentences?",
    criteria: [
      "Names at least two rejected sentences.",
      "Explains what is wrong with each — an opinion stated as fact, a claim the record contradicts, or a conclusion the evidence does not support.",
      "States one thing the expedition was actually instructed to do.",
    ],
  },
  board: null,
};
