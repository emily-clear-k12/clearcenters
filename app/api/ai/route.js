import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// SERVER ONLY. This route is the only place that ever touches the real
// Anthropic API key. The browser calls this route; this route calls
// Anthropic. The key itself never reaches the browser at any point.
//
// This is the generic test route behind /test-ai (a leftover connection-check
// page from when the app was first wired up). It used to have no login check
// at all — anyone who found the URL could fire arbitrary, unlimited calls on
// the API key. Locked to logged-in students for now; if /test-ai isn't needed
// anymore, both this file and app/test-ai/page.js can be deleted outright.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

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
