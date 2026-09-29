import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSandboxHost, LIVE_URL, SANDBOX_URL } from "../../lib/demo/site";
import { DEMO_STUDENTS, DEMO_STUDENT_LOGINS } from "../../lib/demo/barrons";
import SandboxShell from "./SandboxShell";

// The sandbox's front page: a Live tab and a Sandbox tab in one window.
// On the live site's own address this sends you to the sandbox address,
// so sample data can never mix with the real class.
export default function SandboxPage() {
  if (!isSandboxHost(headers().get("host"))) redirect(`${SANDBOX_URL}/sandbox`);
  const students = DEMO_STUDENT_LOGINS.map(({ index, label }) => ({ index, label, name: DEMO_STUDENTS[index].name }));
  return <SandboxShell liveUrl={LIVE_URL} students={students} />;
}
