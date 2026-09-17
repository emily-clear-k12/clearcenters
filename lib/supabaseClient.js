import { createClient } from "@supabase/supabase-js";

// This client uses the PUBLIC anon key and is safe to use in the browser.
// It's what powers teacher email/password sign-in via Supabase Auth.
//
// CI2.0 sandbox: when NEXT_PUBLIC_SANDBOX is "true" (set only for Vercel
// Preview builds), this connects to the separate sandbox database using the
// NEXT_PUBLIC_SANDBOX_* settings instead. It never falls back to the live
// database: if the sandbox settings are missing, it stops with an error.
const IS_SANDBOX = process.env.NEXT_PUBLIC_SANDBOX === "true";

const url = IS_SANDBOX
  ? process.env.NEXT_PUBLIC_SANDBOX_SUPABASE_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = IS_SANDBOX
  ? process.env.NEXT_PUBLIC_SANDBOX_SUPABASE_ANON_KEY
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (IS_SANDBOX && (!url || !anonKey)) {
  throw new Error(
    "Sandbox mode is on, but NEXT_PUBLIC_SANDBOX_SUPABASE_URL or NEXT_PUBLIC_SANDBOX_SUPABASE_ANON_KEY is missing in Vercel (Preview)."
  );
}

export const supabase = createClient(url, anonKey);
