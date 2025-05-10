'use client';

import { createBrowserClient } from '@supabase/ssr';

// Create a singleton instance to prevent multiple client creations
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;
let clientCreationAttempts = 0;
const MAX_CREATION_ATTEMPTS = 3;

export const createClient = () => {
  // Return existing client if already created
  if (supabaseClient) return supabaseClient;
  
  try {
    // Check if environment variables are defined
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables are missing');
      throw new Error('Supabase environment variables are missing');
    }
    
    // Track creation attempts
    clientCreationAttempts++;
    
    if (clientCreationAttempts > MAX_CREATION_ATTEMPTS) {
      console.error(`Failed to create Supabase client after ${MAX_CREATION_ATTEMPTS} attempts`);
      // Return dummy client as last resort to prevent crashes
      return getDummyClient();
    }
    
    // Create new client
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Verify that the client is functional by making a test query
    setTimeout(async () => {
      try {
        const { error } = await supabaseClient!.from('_dummy_check').select('*').limit(1);
        if (error && error.code !== 'PGRST116') {
          // If error is not the "relation does not exist" error (which is expected for a dummy query)
          // then the client might not be working properly
          console.warn('Supabase client test query failed with unexpected error:', error);
          // Reset client to force recreation on next call
          supabaseClient = null;
        }
      } catch (e) {
        console.error('Supabase client verification failed:', e);
        // Reset client to force recreation on next call
        supabaseClient = null;
      }
    }, 500);
    
    return supabaseClient;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    // Return a dummy client that won't crash but won't work either
    return getDummyClient();
  }
};

// Helper function to create a dummy client that won't crash
function getDummyClient() {
  return {
    from: () => ({ 
      select: () => ({ data: null, error: new Error('Supabase client creation failed') }),
      insert: () => ({ data: null, error: new Error('Supabase client creation failed') }),
      update: () => ({ data: null, error: new Error('Supabase client creation failed') }),
      delete: () => ({ data: null, error: new Error('Supabase client creation failed') }),
      eq: () => getDummyClient().from()
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase client creation failed') }),
        download: () => Promise.resolve({ data: null, error: new Error('Supabase client creation failed') })
      })
    },
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase client creation failed') })
    }
  } as any;
} 