import { createClient } from "@supabase/supabase-js";
import { demoIsOn, demoSupabase } from "./demo/client";

// The public anon key. Safe in the browser. The demo never uses it:
// Mrs. Barrons's class lives in the browser so the live school data stays put.
let realClient = null;

function liveClient() {
  if (!realClient) {
    realClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-placeholder-key",
    );
  }
  return realClient;
}

export const supabase = new Proxy({}, {
  get(_target, prop) {
    const client = demoIsOn() ? demoSupabase : liveClient();
    const value = client[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
