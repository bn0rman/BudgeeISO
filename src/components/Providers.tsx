"use client";

import { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render children without theme provider to avoid hydration issues
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      {children}
    </ThemeProvider>
  );
} 