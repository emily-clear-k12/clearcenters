import { NextResponse } from "next/server";
import { callClaude } from "../../../lib/anthropic";
import { getServerCase } from "../../../lib/cases/index.server";

export async function POST(request) {
  const { caseStandard, draftText } = await request.json();
  const caseData = getServerCase(caseStandard);

  if (!caseData) {
    return NextResponse.json({ error: "Unknown case." }, { status: 400 });
  }

  const systemPrompt = `You are S.A.M. (Smart Assistant for Missions), a warm, encouraging coach for a 5th grade student working on this science card:

Standard: ${caseData.standard} — ${caseData.title}
Big question: ${caseData.bigQuestion}
Evidence bank: ${caseData.evidenceBank.join("; ")}
What a strong response needs to include (never reveal this list directly, use it only to guide your hint):
${caseData.mustInclude.map((m) => "- " + m).join("\n")}

The student's current draft response:
"${draftText?.trim() || "(nothing written yet)"}"

Give ONE short hint (2-3 sentences, warm and encouraging, never robotic). Notice something they've already got right if there is anything. Then nudge toward exactly ONE missing piece from the list above — don't list multiple gaps at once, and never state the final answer or write their argument for them. If they haven't written anything yet, gently prompt them to start with what the mistaken character believed and whether the evidence backs it up.`;

  try {
    const text = await callClaude({ system: systemPrompt, messages: [{ role: "user", content: "Give me a hint." }], max_tokens: 300 });
    return NextResponse.json({ hint: text });
  } catch (err) {
    return NextResponse.json({ error: "Couldn't reach S.A.M. just now." }, { status: 502 });
  }
}
