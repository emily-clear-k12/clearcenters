import { NextResponse } from "next/server";

// SERVER ONLY. This route is the only place that ever touches the real
// Anthropic API key. The browser calls this route; this route calls
// Anthropic. The key itself never reaches the browser at any point.
export async function POST(request) {
  const body = await request.json();
  const { system, messages, max_tokens } = body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Server is missing ANTHROPIC_API_KEY." }, { status: 500 });
  }
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Missing messages." }, { status: 400 });
  }

  try {
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
      return NextResponse.json({ error: data.error?.message || "Anthropic API error" }, { status: response.status });
    }

    const textBlock = (data.content || []).find((b) => b.type === "text");
    return NextResponse.json({ text: textBlock ? textBlock.text : "" });
  } catch (err) {
    return NextResponse.json({ error: "Couldn't reach the AI service." }, { status: 502 });
  }
}
