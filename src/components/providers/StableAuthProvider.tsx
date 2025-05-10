'use client';

import { ReactNode, createContext, useContext, useState, useEffect, useRef } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

// Context to store stable auth state
const StableAuthContext = createContext({
  isAuthenticated: false,
  isStabilized: false,
  userId: null as string | null
});

// A provider that prevents excessive auth setup calls
export function StableAuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoading } = useKindeBrowserClient();
  const [isStabilized, setIsStabilized] = useState(false);
  
  // Use a ref to track if we've already patched fetch
  const hasPatchedFetch = useRef(false);
  const stabilizationTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Debug logs in development
  const logDebug = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[StableAuth] ${message}`);
    }
  };
  
  // Patch fetch to prevent excessive setup calls
  useEffect(() => {
    if (hasPatchedFetch.current) return;
    
    // Original fetch function
    const originalFetch = window.fetch;
    
    // Keep track of recent setup calls
    const setupCalls: {time: number, url: string}[] = [];
    const THROTTLE_MS = 2000; // Only allow one setup call every 2 seconds
    
    logDebug('Patching fetch to prevent excessive auth calls');
    
    // Override fetch to intercept Kinde setup calls
    window.fetch = function(input, init) {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
      
      // If this is a Kinde setup call
      if (url.includes('/api/auth/setup')) {
        // Filter out old calls older than throttle time
        const now = Date.now();
        const recentCalls = setupCalls.filter(call => now - call.time < THROTTLE_MS);
        
        // If we have a recent call, block this one
        if (recentCalls.length > 0) {
          logDebug('Blocking duplicate Kinde setup call');
          // Return an empty successful response to satisfy the Kinde client
          return Promise.resolve(new Response(JSON.stringify({ message: "NOT_LOGGED_IN" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        }
        
        // Otherwise record this call and let it through
        setupCalls.push({ time: now, url });
        logDebug('Allowing Kinde setup call');
      }
      
      // Call original fetch for all other requests
      return originalFetch.apply(window, [input, init as RequestInit]);
    };
    
    hasPatchedFetch.current = true;
  }, []);
  
  // Mark as stabilized once user data has loaded or after a timeout
  useEffect(() => {
    // Clear any existing timer
    if (stabilizationTimer.current) {
      clearTimeout(stabilizationTimer.current);
      stabilizationTimer.current = null;
    }
    
    if (!isLoading) {
      logDebug(`Auth loading complete. User authenticated: ${!!user}`);
      setIsStabilized(true);
      return;
    }
    
    // Set a fallback timer to force stability after a reasonable time
    // This prevents UI from being stuck in loading state indefinitely
    stabilizationTimer.current = setTimeout(() => {
      logDebug('Forcing auth stabilization after timeout');
      setIsStabilized(true);
    }, 3000); // 3 seconds max wait time
    
    // Cleanup on unmount
    return () => {
      if (stabilizationTimer.current) {
        clearTimeout(stabilizationTimer.current);
      }
    };
  }, [isLoading, user]);
  
  // Log provider state changes in development
  useEffect(() => {
    logDebug(`Provider state: authenticated=${!!user}, stabilized=${isStabilized}`);
  }, [user, isStabilized]);
  
  return (
    <StableAuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        isStabilized,
        userId: user?.id || null
      }}
    >
      {children}
    </StableAuthContext.Provider>
  );
}

// Hook to use the stable auth context
export function useStableAuth() {
  return useContext(StableAuthContext);
} 