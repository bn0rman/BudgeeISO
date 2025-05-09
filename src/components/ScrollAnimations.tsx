'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => {
        // Reset the visibility state when reinitializing
        el.classList.remove('visible');
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isClient, pathname]); // Re-run when pathname changes

  return null;
} 