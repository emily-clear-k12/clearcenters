(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.CrystalDiveQuestions = api;
})(typeof window !== "undefined" ? window : null, function () {
  function shuffle(items, random = Math.random) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function sentenceWithoutWord(sentence, word) {
    const start = sentence.toLowerCase().indexOf(word.toLowerCase());
    if (start < 0) return null;
    return sentence.slice(0, start) + "______" + sentence.slice(start + word.length);
  }

  function build(bank, random = Math.random) {
    const items = [];
    const sorts = Array.isArray(bank?.sortBins) ? bank.sortBins : [];
    for (const item of sorts) {
      if (!item?.id || !item.prompt || !Array.isArray(item.bins) || item.bins.length < 2 || item.correctBinId == null) continue;
      if (!item.bins.some((bin) => String(bin.id) === String(item.correctBinId))) continue;
      items.push({
        id: item.id, type: "sort_bins", prompt: item.prompt,
        choices: item.bins.map((bin) => ({ id: bin.id, label: bin.label })),
        answer: item.correctBinId, explanation: item.explanation || item.rule || "",
      });
    }

    const words = Array.isArray(bank?.words) ? bank.words.filter((w) => w?.id && w.word && w.definition) : [];
    const formats = Array.isArray(bank?.formats) ? bank.formats : ["lock_signal", "true_false", "frequency_fill"];
    if (words.length >= 4) {
      for (const word of words) {
        const distractors = shuffle(words.filter((candidate) => candidate.id !== word.id), random).slice(0, 3);
        if (formats.includes("lock_signal")) items.push({
          id: word.id, wordId: word.id, type: "lock_signal", prompt: "Which meaning matches “" + word.word + "”?",
          choices: [{ id: word.id, label: word.definition }, ...distractors.map((w) => ({ id: w.id, label: w.definition }))],
          answer: word.id, explanation: word.word + " means " + word.definition,
        });
        if (formats.includes("true_false")) {
          for (const truth of [true, false]) items.push({
            id: word.id, wordId: word.id, type: "true_false",
            prompt: word.word + " means: " + (truth ? word.definition : distractors[0].definition),
            choices: [{ id: true, label: "TRUE" }, { id: false, label: "FALSE" }],
            answer: truth, explanation: word.word + " means " + word.definition,
          });
        }
        const sentence = word.sentence || (Array.isArray(word.sentences) ? word.sentences[0] : "");
        const blanked = sentence && sentenceWithoutWord(sentence, word.word);
        if (formats.includes("frequency_fill") && blanked) items.push({
          id: word.id, wordId: word.id, type: "frequency_fill", prompt: blanked,
          choices: [{ id: word.id, label: word.word }, ...distractors.map((w) => ({ id: w.id, label: w.word }))],
          answer: word.id, explanation: sentence,
        });
      }
    }

    const classifications = Array.isArray(bank?.classifications) ? bank.classifications : [];
    for (const item of classifications) {
      if (!item?.id || !Array.isArray(item.items) || !item.items.length || !Array.isArray(item.categories) || !item.categories.length) continue;
      items.push({
        id: item.id, type: "classification", prompt: item.prompt || item.title || "Sort each item.",
        items: item.items.map((entry) => ({ id: entry.id, text: entry.text, categoryId: entry.categoryId ?? entry.correctCategoryId })),
        categories: item.categories.map((entry) => ({ id: entry.id, label: entry.label })),
        explanation: item.explanation || "",
      });
    }
    return items;
  }

  // Each item appears before the pool repeats; a format may be revisited in a later cycle.
  function nextPool(items, previousId, random = Math.random) {
    const pool = shuffle(items, random);
    if (pool.length > 1 && String(pool[pool.length - 1].id) === String(previousId)) {
      [pool[pool.length - 1], pool[pool.length - 2]] = [pool[pool.length - 2], pool[pool.length - 1]];
    }
    return pool;
  }

  function isCorrect(question, choice) {
    if (question.type === "classification") {
      return question.items.every((item) => String(choice?.[item.id]) === String(item.categoryId));
    }
    return String(choice) === String(question.answer);
  }

  return { build, isCorrect, nextPool };
});
