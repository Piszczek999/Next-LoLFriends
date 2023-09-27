import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const serviceSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
