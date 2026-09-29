import { redirect } from "next/navigation";

// Sept 29, 2026: the old sandbox page is retired. The CI2.0 sandbox lives on
// its own branch (ci2-sandbox) and its own site. This folder can be deleted.
export default function RetiredSandbox() {
  redirect("/");
}
