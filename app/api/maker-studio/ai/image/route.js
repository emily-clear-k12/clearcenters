import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const maxDuration = 45;

/**
 * Maker Studio image generation (Paint what I said / Postcard).
 *
 * Storage choice (Vercel): return a data URL (or OpenAI temporary URL) for the
 * client to persist inside maker_studio_data JSONB. Writing under public/maker/
 * at request time is not durable on Vercel serverless, so we do NOT write files.
 *
 * Provider: optional OPENAI_API_KEY → OpenAI Images (gpt-image-1, then dall-e-3).
 * If the key is missing or the call fails, return { ok:false, fallback:true }
 * so the UI can offer LibraryPicker / draw.
 */

const CLASSROOM_PREFIX =
  "Classroom-safe illustration for elementary grades 3-5. No violence, no romance, no scary images, no real people's faces, no text overlays, no logos. Bright, clear, educational style. Scene: ";

function kidFallback(message) {
  return NextResponse.json({
    ok: false,
    fallback: true,
    imageDataUrl: null,
    message:
      message ||
      "Picture helper is resting. Pick from the library or draw instead.",
  });
}

async function openAiImage(prompt, signal) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    const err = new Error("missing_key");
    err.code = "missing_key";
    throw err;
  }

  const safePrompt = (CLASSROOM_PREFIX + prompt).slice(0, 1200);

  // Prefer gpt-image-1 (b64); fall back to dall-e-3 URL if model unavailable.
  const attempts = [
    {
      model: "gpt-image-1",
      body: {
        model: "gpt-image-1",
        prompt: safePrompt,
        size: "1024x1024",
        n: 1,
      },
    },
    {
      model: "dall-e-3",
      body: {
        model: "dall-e-3",
        prompt: safePrompt,
        size: "1024x1024",
        n: 1,
        response_format: "b64_json",
        quality: "standard",
      },
    },
  ];

  let lastErr = null;
  for (const attempt of attempts) {
    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(attempt.body),
        signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        lastErr = new Error(
          (data && data.error && data.error.message) || `OpenAI ${res.status}`
        );
        // Try next model on 404/model errors
        if (res.status === 404 || /model/i.test(lastErr.message)) continue;
        throw lastErr;
      }
      const item = data.data && data.data[0];
      if (!item) throw new Error("No image in response");
      if (item.b64_json) {
        return {
          imageDataUrl: `data:image/png;base64,${item.b64_json}`,
          model: attempt.model,
        };
      }
      if (item.url) {
        // Store remote URL (client persists in JSONB). Prefer data URL if small fetch works.
        try {
          const imgRes = await fetch(item.url, { signal });
          if (imgRes.ok) {
            const buf = Buffer.from(await imgRes.arrayBuffer());
            // Cap ~1.5MB to keep JSONB reasonable
            if (buf.length <= 1.5 * 1024 * 1024) {
              return {
                imageDataUrl: `data:image/png;base64,${buf.toString("base64")}`,
                model: attempt.model,
              };
            }
          }
        } catch (_) {
          /* use URL */
        }
        return { imageDataUrl: item.url, model: attempt.model };
      }
      throw new Error("No image payload");
    } catch (err) {
      if (err && err.name === "AbortError") throw err;
      lastErr = err;
    }
  }
  throw lastErr || new Error("Image generation failed");
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const promptText = String(body.promptText || body.prompt || "")
    .trim()
    .slice(0, 500);
  const topic = String(body.topic || "").trim().slice(0, 200);

  if (!promptText) {
    return NextResponse.json(
      { error: "Describe the picture first." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return kidFallback(
      "Picture helper needs a key. Pick from the library or draw instead."
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 40000);

  try {
    const full = topic ? `${promptText} (topic: ${topic})` : promptText;
    const result = await openAiImage(full, controller.signal);
    return NextResponse.json({
      ok: true,
      fallback: false,
      imageDataUrl: result.imageDataUrl,
      model: result.model,
      storage: "data_url_or_remote_in_jsonb",
      message: null,
    });
  } catch (err) {
    const timedOut = err && err.name === "AbortError";
    return kidFallback(
      timedOut
        ? "That picture took too long. Pick from the library or draw instead."
        : "Couldn't make that picture. Pick from the library or draw instead."
    );
  } finally {
    clearTimeout(timer);
  }
}
