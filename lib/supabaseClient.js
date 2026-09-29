import { createClient } from "@supabase/supabase-js";

// This client uses the PUBLIC anon key and is safe to use in the browser.
// It's what powers teacher email/password sign-in via Supabase Auth.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
