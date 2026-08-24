import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { callClaude } from "../../../../lib/anthropic";
import { getNewsroomBNServerCase } from "../../../../lib/cases/newsroom-bn/index.server";
import { MAX_DISCUSS_TURNS } from "../../../../lib/constants";

// Newsroom's "Call the Source" chat — unlike Group Chat's single shared
// system prompt covering a whole cast, each Newsroom voice has its own
// fully self-contained system prompt (persona + fixed facts + a critical
// boundary they hold under pressure), so one call here always talks to
// exactly one character, chosen by voiceId.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { caseStandard, voiceId, messages } = await request.json();
  const caseData = getNewsroomBNServerCase(caseStandard);

  if (!caseData) {
    return NextResponse.json({ error: "Unknown case." }, { status: 400 });
  }
  const voice = caseData.voices[voiceId];
  if (!voice) {
    return NextResponse.json({ error: "Unknown source." }, { status: 400 });
  }
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Missing messages." }, { status: 400 });
  }

  // Same server-side belt-and-suspenders cap as Group Chat's /api/discuss —
  // the UI already stops a student well short of this, this just guards
  // against someone calling the route directly from dev tools.
  const studentTurns = messages.filter((m) => m.role === "user").length;
  if (studentTurns > MAX_DISCUSS_TURNS * 2) {
    return NextResponse.json({ error: "You've reached the most questions allowed for this interview." }, { status: 429 });
  }

  try {
    const text = await callClaude({
      system: voice.systemPrompt,
      messages: messages.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
      max_tokens: 400,
    });
    return NextResponse.json({ text: text.trim() });
  } catch (err) {
    return NextResponse.json({ error: "Couldn't reach this source just now." }, { status: 502 });
  }
}
