import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_KEY || "";

let supabase = null;

if (supabaseUrl && serviceKey) {
  supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

export function getSupabase() {
  if (!supabase) {
    console.warn("Supabase no configurado: falta SUPABASE_URL o SUPABASE_SERVICE_KEY");
  }
  return supabase;
}
