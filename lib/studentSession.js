import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

// Signed student session. The cookie name stays cc_student_id so logout
// still clears it, but the value is no longer the raw student id.
// Format: studentId.expiresAt.signature
// signature is HMAC-SHA256 over "studentId.expiresAt".

export const STUDENT_COOKIE = "cc_student_id";
export const STUDENT_COOKIE_MAX_AGE = 60 * 60 * 8;

export const STUDENT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: STUDENT_COOKIE_MAX_AGE,
};

function sessionSecret() {
  const secret = process.env.STUDENT_SESSION_SECRET;
  if (!secret) return null;
  return secret;
}

export function createStudentSession(studentId) {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error("STUDENT_SESSION_SECRET is not set");
  }
  const expiresAt = Date.now() + STUDENT_COOKIE_MAX_AGE * 1000;
  const payload = `${studentId}.${expiresAt}`;
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function readStudentIdFromValue(value) {
  const secret = sessionSecret();
  if (!secret || typeof value !== "string" || !value) return null;
  const sigDot = value.lastIndexOf(".");
  if (sigDot <= 0) return null;
  const signature = value.slice(sigDot + 1);
  const payload = value.slice(0, sigDot);
  const expDot = payload.lastIndexOf(".");
  if (expDot <= 0) return null;
  const studentId = payload.slice(0, expDot);
  const expiresAt = payload.slice(expDot + 1);
  if (!studentId || !/^\d+$/.test(expiresAt) || !/^[a-f0-9]{64}$/i.test(signature)) return null;
  if (Number(expiresAt) <= Date.now()) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const given = Buffer.from(signature.toLowerCase());
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) return null;
  return studentId;
}

export function readStudentId() {
  return readStudentIdFromValue(cookies().get(STUDENT_COOKIE)?.value);
}
