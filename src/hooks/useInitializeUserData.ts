'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { initializeUserData } from '@/services/initUserData';

export function useInitializeUserData() {
  const { user, isLoading } = useKindeBrowserClient();
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    // Prevent multiple initialization attempts
    if (hasAttempted) return;
    
    async function initialize() {
      if (!user?.id || isLoading || isInitializing || isInitialized) return;
      
      try {
        setIsInitializing(true);
        setHasAttempted(true); // Mark that we've attempted initialization
        
        const success = await initializeUserData(user.id);
        
        if (success) {
          setIsInitialized(true);
          setError(null);
        } else {
          setError('Failed to initialize user data');
        }
      } catch (err) {
        console.error('Error initializing user data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsInitializing(false);
      }
    }
    
    initialize();
  }, [user?.id, isLoading, isInitializing, isInitialized, hasAttempted]);

  return { isInitializing, isInitialized, error };
} 