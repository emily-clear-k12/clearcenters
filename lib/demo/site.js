// Where the live site and the sandbox live — Sept 28, 2026.
// The sandbox is its own Vercel project (its own address) built from the
// same code. Its address has "sandbox" in it, or NEXT_PUBLIC_DEMO_ENTRY=1.
// The demo only ever turns on at a sandbox address, so the live site can
// never show sample data, even if someone sets the demo cookie by hand.

export const LIVE_URL = (process.env.NEXT_PUBLIC_LIVE_URL || "https://clearcenters.vercel.app").replace(/\/$/, "");
export const SANDBOX_URL = (process.env.NEXT_PUBLIC_SANDBOX_URL || "https://clearcenters-sandbox.vercel.app").replace(/\/$/, "");

export function isSandboxHost(host) {
  if (process.env.NEXT_PUBLIC_DEMO_ENTRY === "1") return true;
  const name = String(host || "").toLowerCase();
  return name.includes("sandbox") || name.startsWith("localhost") || name.startsWith("127.0.0.1");
}
