'use client';

import { ReactNode, memo, useState, useEffect, useRef } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { initializeUserData } from '@/services/initUserData';
import { useStableAuth } from './StableAuthProvider';

interface UserDataProviderProps {
  children: ReactNode;
}

// Use memo to prevent unnecessary rerenders
const UserDataProvider = memo(function UserDataProvider({ children }: UserDataProviderProps) {
  const { user, isLoading } = useKindeBrowserClient();
  const { isStabilized } = useStableAuth();
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  
  // Debug logs in development
  const logDebug = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[UserData] ${message}`);
    }
  };
  
  // Single-time initialization effect
  useEffect(() => {
    // Skip if no user, still loading, already initializing/initialized, or already attempted max retries
    if (!user?.id || isLoading || !isStabilized || isInitializing || isInitialized || retryCount.current >= maxRetries) {
      return;
    }
    
    async function initializeUserDataWithRetry() {
      try {
        setIsInitializing(true);
        setHasAttempted(true);
        
        logDebug(`Initializing user data (attempt ${retryCount.current + 1}/${maxRetries})`);
        const success = await initializeUserData(user.id);
        
        if (success) {
          logDebug('User data initialization successful');
          setIsInitialized(true);
        } else {
          logDebug('User data initialization failed');
          // Increment retry count for next attempt
          retryCount.current += 1;
          
          // Reset attempted flag to allow for retry
          if (retryCount.current < maxRetries) {
            setHasAttempted(false);
          }
        }
      } catch (err) {
        console.error('Error initializing user data:', err);
        // Increment retry count for next attempt
        retryCount.current += 1;
        
        // Reset attempted flag to allow for retry
        if (retryCount.current < maxRetries) {
          setHasAttempted(false);
        }
      } finally {
        setIsInitializing(false);
      }
    }
    
    // Initialize data for signed-in users
    initializeUserDataWithRetry();
  }, [user?.id, isLoading, isStabilized, isInitializing, isInitialized, hasAttempted]);
  
  // Log provider state in development
  useEffect(() => {
    logDebug(`Provider state: userId=${user?.id || 'none'}, initialized=${isInitialized}, initializing=${isInitializing}, attempted=${hasAttempted}, retries=${retryCount.current}`);
  }, [user?.id, isInitialized, isInitializing, hasAttempted]);
  
  // Just render children without loading indicators to prevent rendering cycles
  return <>{children}</>;
});

export { UserDataProvider }; 