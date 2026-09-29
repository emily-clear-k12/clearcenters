import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Index() {
  const host = headers().get("host") || "";
  if (host.includes("sandbox") || process.env.NEXT_PUBLIC_DEMO_ENTRY === "1") redirect("/sandbox");
  redirect("/login");
}
