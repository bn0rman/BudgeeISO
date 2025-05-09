import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Create a supabase client for server-side operations
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey);
};

// For direct usage in server components and API routes
export const supabaseServer = createServerClient(); 