const SURE = new Set(["shaky", "solid", "strong"]);

export function reflectionFrom(body) {
  const selfConfidence = String((body && body.selfConfidence) || "");
  const checklist = Array.isArray(body && body.checklist) ? body.checklist.map(Boolean) : [];
  if (!SURE.has(selfConfidence)) return { error: "Pick how sure you are." };
  if (checklist.filter(Boolean).length < 3) return { error: "Check at least 3 before you submit." };
  return { checklist, self_confidence: selfConfidence, revision_requested: false };
}

// Keep the original try. A later send-back must not overwrite it.
export function withFirstTry(nextData, priorData, summary, shouldKeep) {
  if (!shouldKeep) return nextData;
  if (priorData && priorData.firstTry) return { ...nextData, firstTry: priorData.firstTry };
  const prior = priorData && typeof priorData === "object" ? { ...priorData } : {};
  delete prior.firstTry;
  return { ...nextData, firstTry: { ...prior, summary: summary || "" } };
}
