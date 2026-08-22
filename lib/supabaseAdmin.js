import { createClient } from "@supabase/supabase-js";

// SERVER ONLY. This uses the secret service role key, which can bypass
// row-level security. It must never be imported into a "use client"
// component or sent to the browser. Student PIN login goes through this,
// inside an API route (see app/api/student-login/route.js), specifically
// so a student's PIN is checked on the server, not exposed to the browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
