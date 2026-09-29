import { redirect } from "next/navigation";

// Sept 29, 2026: the old demo door is retired. Demo classes now live on the
// real site (Demo · Math & Science, Demo · ELAR & Social Studies). This
// folder can be deleted.
export default function RetiredDemo() {
  redirect("/");
}
