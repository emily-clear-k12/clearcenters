import { notFound } from "next/navigation";

// Version C (the bold concept) lives under /v2c. Same guard as /v2: every
// page here disappears (404) unless the sandbox flag is on, so concept pages
// can never appear on the live site.
export default function V2CLayout({ children }) {
  if (process.env.NEXT_PUBLIC_SANDBOX !== "true") notFound();
  return children;
}
