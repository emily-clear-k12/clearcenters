import { getSignalCheckPublicCase } from "./cases/signal-check/index.public";

function top(tally) {
  const best = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] > 0 ? best : null;
}

// One plain sentence from item-level work the activity already saved.
// Returns null when this activity does not record a missed item.
export function mistakeLine(standard, engine, rows) {
  if (engine === "classification_lab") {
    const tally = {};
    (rows || []).forEach((row) => {
      const pages = (row.classification_lab_data && row.classification_lab_data.pages) || {};
      Object.values(pages).forEach((page) => {
        (page && page.items || []).forEach((item) => {
          if (item && item.right === false && item.label) tally[item.label] = (tally[item.label] || 0) + 1;
        });
      });
    });
    const best = top(tally);
    return best ? `${best[1]} sorted “${best[0]}” into the wrong group.` : null;
  }
  if (engine === "fact_check_desk") {
    const pub = getSignalCheckPublicCase(standard);
    if (!pub || !Array.isArray(pub.statements)) return null;
    const tally = {};
    (rows || []).forEach((row) => {
      const answers = (row.signal_data && row.signal_data.statementAnswers) || {};
      pub.statements.forEach((statement) => {
        const answer = answers[statement.id] || {};
        const verdict = pub.stemMode === "open" ? answer.verdictText : answer.verdict;
        if (verdict && verdict !== statement.correctVerdict) {
          const name = statement.tag || "a signal";
          tally[name] = (tally[name] || 0) + 1;
        }
      });
    });
    const best = top(tally);
    return best ? `${best[1]} missed ${best[0]}.` : null;
  }
  return null;
}
