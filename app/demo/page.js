import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSandboxHost, SANDBOX_URL } from "../../lib/demo/site";
import { DEMO_STUDENTS, DEMO_STUDENT_LOGINS } from "../../lib/demo/barrons";
import DemoDoor from "./DemoDoor";

export default function DemoPage() {
  if (!isSandboxHost(headers().get("host"))) redirect(`${SANDBOX_URL}/sandbox`);
  const students = DEMO_STUDENT_LOGINS.map(({ index, label }) => ({ index, label, name: DEMO_STUDENTS[index].name, blurb: DEMO_STUDENTS[index].blurb }));
  return <DemoDoor students={students} />;
}
