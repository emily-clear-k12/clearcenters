import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { callClaude } from "../../../lib/anthropic";
import { getServerCase } from "../../../lib/cases/index.server";
import { MAX_DISCUSS_TURNS } from "../../../lib/constants";

export async function POST(request) {
  // Only a logged-in student can reach the AI characters — this route used
  // to be reachable by anyone who knew the URL, logged in or not.
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { caseStandard, messages } = await request.json();
  const caseData = getServerCase(caseStandard);

  if (!caseData) {
    return NextResponse.json({ error: "Unknown case." }, { status: 400 });
  }
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Missing messages." }, { status: 400 });
  }

  // Belt-and-suspenders: the UI stops a student at MAX_DISCUSS_TURNS
  // messages, but that's just JavaScript in the browser — enforce the same
  // cap here so it can't be skipped from dev tools.
  const studentTurns = messages.filter((m) => m.role === "user").length;
  if (studentTurns > MAX_DISCUSS_TURNS) {
    return NextResponse.json({ error: "You've reached the most questions allowed for this investigation." }, { status: 429 });
  }

  const castList = Object.values(caseData.castNames).join(", ");

  const systemPrompt = `You are running an in-character educational role-play for a 5th grade student, based on this case:

Standard: ${caseData.standard} — ${caseData.title}
Big question: ${caseData.bigQuestion}
Evidence bank (only reveal these facts gradually, don't dump them all at once):
${caseData.evidenceBank.map((e) => "- " + e).join("\n")}

Cast (you play ALL of these characters, one at a time, staying strictly in voice): ${castList}.
One character starts by mistakenly believing: "${caseData.trapLine}"

Common student misconceptions to actively raise as real distractors during the conversation (don't just wait for the student to bring these up — have a character float one of these as a competing theory at least once, and make the student reason through why it's wrong before moving on):
${caseData.distractors}

Rules:
- Reply as ONE character at a time. Start your reply with "CharacterName:" so the student knows who's talking.
- Never write the student's answer for them.
- Keep replies short (2-4 sentences), age-appropriate for a 10-11 year old, in character.
- Only have the mistaken character fully concede once the student has surfaced at least two pieces of real evidence AND reasoned through at least one distractor.
- If the student asks for the answer directly, gently redirect in character.`;

  try {
    const raw = await callClaude({
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
      max_tokens: 1000,
    });

    const match = raw.match(/^([A-Za-z .]+):\s*([\s\S]*)$/);
    let charId = null;
    let text = raw;
    if (match) {
      const spoken = match[1].trim().toLowerCase();
      const foundId = Object.keys(caseData.castNames).find((id) => spoken.includes(caseData.castNames[id].split(" ")[0].toLowerCase()));
      if (foundId) charId = foundId;
      text = match[2].trim();
    }

    return NextResponse.json({ charId, text });
  } catch (err) {
    return NextResponse.json({ error: "Couldn't reach the AI characters just now." }, { status: 502 });
  }
}
