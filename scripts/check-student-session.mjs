import { createHmac } from "crypto";
import { createStudentSession, readStudentIdFromValue } from "../lib/studentSession.js";

const secret = "test-secret-for-student-sessions";
process.env.STUDENT_SESSION_SECRET = secret;
const id = "11111111-1111-4111-8111-111111111111";

function fail(message) {
  console.error(message);
  process.exit(1);
}

const token = createStudentSession(id);
if (readStudentIdFromValue(token) !== id) fail("valid session was rejected");

const tampered = token.replace(id.slice(0, 8), "22222222");
if (readStudentIdFromValue(tampered) !== null) fail("changed id was accepted");

if (readStudentIdFromValue(id) !== null) fail("unsigned id was accepted");

const expiredPayload = `${id}.${Date.now() - 1000}`;
const expiredSig = createHmac("sha256", secret).update(expiredPayload).digest("hex");
if (readStudentIdFromValue(`${expiredPayload}.${expiredSig}`) !== null) fail("expired session was accepted");

delete process.env.STUDENT_SESSION_SECRET;
if (readStudentIdFromValue(token) !== null) fail("session was accepted without a secret");
let threw = false;
try { createStudentSession(id); } catch { threw = true; }
if (!threw) fail("login token was created without a secret");

console.log("student session checks passed");
