import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSandboxHost } from "../lib/demo/site";

export default function Index() {
  const host = headers().get("host") || "";
  if (isSandboxHost(host) && !host.startsWith("localhost")) redirect("/sandbox");
  redirect("/login");
}
