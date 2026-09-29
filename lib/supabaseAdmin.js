import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { demoSupabase } from "./demo/client";

// SERVER ONLY. This uses the secret service role key, which can bypass
// row-level security. It must never be imported into a "use client"
// component or sent to the browser. Student PIN login goes through this,
// inside an API route (see app/api/student-login/route.js), specifically
// so a student's PIN is checked on the server, not exposed to the browser.
//
// The demo cookie never touches the live database. Mrs. Barrons's class
// and Maya's student pages are answered from the sample class instead.
let client;

function demoRequest() {
  try {
    return cookies().get("cc_demo")?.value === "1";
  } catch (err) {
    return false;
  }
}

function getSupabaseAdmin() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "demo-placeholder-service-key",
    );
  }
  return client;
}

export const supabaseAdmin = new Proxy(
  {},
  {
    get(_target, prop) {
      const real = demoRequest() ? demoSupabase : getSupabaseAdmin();
      const value = real[prop];
      return typeof value === "function" ? value.bind(real) : value;
    },
  }
);
