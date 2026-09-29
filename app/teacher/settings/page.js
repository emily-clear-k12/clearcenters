import { redirect } from "next/navigation";

// Sept 29, 2026: the old Settings page is retired. Nothing linked to it, and
// its S.A.M. skins and class picture live on the Class page now.
export default function OldSettings() {
  redirect("/teacher/class");
}
