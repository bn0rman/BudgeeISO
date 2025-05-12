'use client';

import { useState, useEffect } from 'react';

// This component ensures that the component is mounted before rendering children
export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Wait for mounting before rendering children
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // You can return a simple loading indicator or nothing
    return null;
  }

  // Once mounted, we can render children
  return <>{children}</>;
} 