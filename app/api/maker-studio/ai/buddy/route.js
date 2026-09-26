import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { callClaude, extractJSON } from "../../../../../lib/anthropic";

export const runtime = "nodejs";
export const maxDuration = 30;

const FALLBACK_QUESTIONS = [
  { question: "What is one important idea you explained?" },
  { question: "Why does that idea matter for today's topic?" },
];

const CLASSROOM_SYSTEM = `You are a friendly classroom helper for grades 3–5.
Rules (must follow):
- Classroom-safe only: no violence, romance, scary content, or asking for personal info (names, addresses, phone, school name).
- Do NOT grade, score, or say if the student is right or wrong.
- Write in simple words a 3rd–5th grader can read.
- Never browse the web or invent tools.
- Reply with ONLY a JSON object, no markdown fence.`;

function kidError(message) {
  return NextResponse.json(
    {
      ok: false,
      fallback: true,
      questions: FALLBACK_QUESTIONS,
      message: message || "Buddy is resting. Try these questions instead.",
    },
    { status: 200 }
  );
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const explanation = String(body.explanation || "").trim().slice(0, 2000);
  const topic = String(body.topic || "").trim().slice(0, 200);
  const prompt = String(body.prompt || "").trim().slice(0, 800);

  if (!explanation) {
    return NextResponse.json({ error: "Write your explanation first." }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return kidError("Buddy is resting. Try these questions instead.");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 22000);

  try {
    // callClaude doesn't take AbortSignal; race against timeout instead.
    const rawPromise = callClaude({
      system: CLASSROOM_SYSTEM,
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `Teacher topic: ${topic || "(none)"}
Teacher prompt: ${prompt || "(none)"}

Student explanation:
"""
${explanation}
"""

Return JSON shaped like:
{"questions":[{"question":"..."},{"question":"..."}]}

Make 1 or 2 short check questions about what the student wrote (not brand-new topics). Questions should help them think, not test them.`,
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
      return kidError("Buddy got confused. Try these questions instead.");
    }

    const questions = (Array.isArray(parsed.questions) ? parsed.questions : [])
      .map((q) => ({
        question: String((q && (q.question || q.text)) || "")
          .trim()
          .slice(0, 180),
      }))
      .filter((q) => q.question)
      .slice(0, 2);

    if (!questions.length) {
      return kidError("Buddy got confused. Try these questions instead.");
    }

    return NextResponse.json({
      ok: true,
      fallback: false,
      questions,
      message: null,
    });
  } catch (err) {
    const timedOut = err && (err.message === "timeout" || err.name === "AbortError");
    return kidError(
      timedOut
        ? "Buddy is taking too long. Try these questions instead."
        : "Buddy is resting. Try these questions instead."
    );
  } finally {
    clearTimeout(timer);
  }
}
