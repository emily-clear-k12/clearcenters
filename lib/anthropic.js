// SERVER ONLY. Shared helper used by every API route that talks to Claude.
export async function callClaude({ system, messages, max_tokens }) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Server is missing ANTHROPIC_API_KEY.");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: max_tokens || 500,
      ...(system ? { system } : {}),
      messages,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Anthropic API error");
  }
  const textBlock = (data.content || []).find((b) => b.type === "text");
  if (!textBlock) {
    // A 200 response with no text block is unusual enough that swallowing
    // it to "" just hides the real cause (every grading failure used to
    // look identical: "AI scoring wasn't available"). Throw with the
    // actual stop_reason and a snippet of the raw content array so the
    // next failure surfaces something diagnosable in the teacher grading
    // UI's red error box instead of a generic "Empty response".
    throw new Error(
      "No text block in Claude response (stop_reason: " + (data.stop_reason || "unknown") + "). content: " + JSON.stringify(data.content || data).slice(0, 500)
    );
  }
  return textBlock.text;
}

// SERVER ONLY. Every AI-grading route asks Claude to reply with "ONLY a
// JSON object" but Claude sometimes wraps it in a ```json code fence (or
// adds a stray sentence) anyway — a plain JSON.parse(raw.trim()) then
// throws and grading silently falls back to null ("AI scoring wasn't
// available for this submission"). This strips a code fence if present and
// falls back to slicing out the {...} substring before parsing, so grading
// survives the extra formatting instead of quietly giving up.
export function extractJSON(raw) {
  if (!raw) throw new Error("Empty response");
  let text = raw.trim();
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) text = fenceMatch[1].trim();
  const braceStart = text.indexOf("{");
  const braceEnd = text.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd !== -1 && braceEnd > braceStart) {
    text = text.slice(braceStart, braceEnd + 1);
  }
  return JSON.parse(text);
}
