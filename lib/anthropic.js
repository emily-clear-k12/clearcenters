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
      model: "claude-sonnet-4-6",
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
  return textBlock ? textBlock.text : "";
}
