import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { callClaude, extractJSON } from "../../../../../lib/anthropic";

export const runtime = "nodejs";
export const maxDuration = 30;

const CLASSROOM_SYSTEM = `You are a friendly classroom story helper for grades 3–5.
Rules (must follow):
- Classroom-safe only: no violence, romance, scary content, or asking for personal info.
- Do NOT grade or score the student.
- Keep language simple for ages 8–11.
- Never browse the web.
- Reply with ONLY a JSON object, no markdown fence.`;

function fallbackBeats(twist) {
  const t = (twist || "that change").trim().slice(0, 80);
  return [
    `First, imagine what happens when ${t}.`,
    "Next, notice what stays the same and what is different.",
    "Then, think about one new problem or surprise that shows up.",
  ];
}

function kidOk(beats, message) {
  return NextResponse.json({
    ok: false,
    fallback: true,
    beats,
    message: message || "AI is resting. Write your own 2–3 story beats below.",
  });
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const twist = String(body.twist || "").trim().slice(0, 400);
  const topic = String(body.topic || "").trim().slice(0, 200);
  const prompt = String(body.prompt || "").trim().slice(0, 800);

  if (!twist) {
    return NextResponse.json({ error: "Add your What if… twist first." }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return kidOk(fallbackBeats(twist));
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 22000);

  try {
    const rawPromise = callClaude({
      system: CLASSROOM_SYSTEM,
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Teacher topic: ${topic || "(none)"}
Teacher prompt: ${prompt || "(none)"}

Student twist: What if ${twist}?

Return JSON:
{"beats":["...","...","..."]}

Give 2 or 3 short kid-friendly story beats (1 sentence each) that explore the twist. Not an endless chat. Leave room for the student to invent the ending.`,
        },
      ],
    });

    const raw = await Promise.race([
      rawPromise,
      new Promise((_, reject) => {
        controller.signal.addEventListener("abort", () =>
          reject(new Error("timeout"))
        );
      }),
    ]);

    let parsed;
    try {
      parsed = extractJSON(raw);
    } catch (_) {
      return kidOk(fallbackBeats(twist), "AI got confused. Write your own beats.");
    }

    const beats = (Array.isArray(parsed.beats) ? parsed.beats : [])
      .map((b) => String(b || "").trim().slice(0, 220))
      .filter(Boolean)
      .slice(0, 3);

    if (beats.length < 2) {
      return kidOk(fallbackBeats(twist), "AI got confused. Write your own beats.");
    }

    return NextResponse.json({
      ok: true,
      fallback: false,
      beats,
      message: null,
    });
  } catch (err) {
    const timedOut = err && (err.message === "timeout" || err.name === "AbortError");
    return kidOk(
      fallbackBeats(twist),
      timedOut
        ? "That took too long. Write your own 2–3 beats."
        : "AI is resting. Write your own 2–3 beats."
    );
  } finally {
    clearTimeout(timer);
  }
}
