'use client';

import { useEffect } from 'react';
import { signOutClient } from '@/lib/supabase-client';

export default function SignOutPage() {
  useEffect(() => {
    async function signOut() {
      try {
        // Use the enhanced signout function
        await signOutClient();
        
        // Force hard reload to clear any in-memory state
        window.location.href = '/?signout=true';
      } catch (error) {
        console.error('Error signing out:', error);
        window.location.href = '/';
      }
    }
    
    signOut();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-xl">Signing out...</h2>
    </div>
  );
} 