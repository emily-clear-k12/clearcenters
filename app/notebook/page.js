import { redirect } from "next/navigation";

// My Notebook merged into My Progress (Aug 27, 2026) — the finished/graded
// case files it used to show now live in the bottom half of /progress.
// This redirect just keeps any old bookmarks or links working.
export default function NotebookPage() {
  redirect("/progress");
}
