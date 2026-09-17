import { notFound } from "next/navigation";

// Every CI2.0 page lives under /v2. This layout makes all of them disappear
// (404) unless the sandbox flag is on, so unfinished CI2.0 pages can never
// show up on the live site.
export default function V2Layout({ children }) {
  if (process.env.NEXT_PUBLIC_SANDBOX !== "true") notFound();
  return children;
}
