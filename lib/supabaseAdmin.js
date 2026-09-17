import { createClient } from "@supabase/supabase-js";

// SERVER ONLY. This uses the secret service role key, which can bypass
// row-level security. It must never be imported into a "use client"
// component or sent to the browser. Student PIN login goes through this,
// inside an API route (see app/api/student-login/route.js), specifically
// so a student's PIN is checked on the server, not exposed to the browser.
//
// CI2.0 sandbox: when NEXT_PUBLIC_SANDBOX is "true" (set only for Vercel
// Preview builds), this connects to the separate sandbox database using the
// SANDBOX_* settings instead, and never falls back to the live database.
const IS_SANDBOX = process.env.NEXT_PUBLIC_SANDBOX === "true";

const url = IS_SANDBOX
  ? process.env.NEXT_PUBLIC_SANDBOX_SUPABASE_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = IS_SANDBOX
  ? process.env.SANDBOX_SUPABASE_SERVICE_ROLE_KEY
  : process.env.SUPABASE_SERVICE_ROLE_KEY;

if (IS_SANDBOX && (!url || !serviceKey)) {
  throw new Error(
    "Sandbox mode is on, but NEXT_PUBLIC_SANDBOX_SUPABASE_URL or SANDBOX_SUPABASE_SERVICE_ROLE_KEY is missing in Vercel (Preview)."
  );
}

export const supabaseAdmin = createClient(url, serviceKey);
