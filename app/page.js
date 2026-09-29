import { redirect } from "next/navigation";

export default function Index() {
  if (process.env.NEXT_PUBLIC_DEMO_ENTRY === "1") redirect("/demo");
  redirect("/login");
}