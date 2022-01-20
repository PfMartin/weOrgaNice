import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.VUE_APP_SUPABASE_URL
  ? process.env.VUE_APP_SUPABASE_URL
  : '';

const supabaseAnonKey: string = process.env.VUE_APP_SUPABASE_ANON_KEY
  ? process.env.VUE_APP_SUPABASE_ANON_KEY
  : '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
