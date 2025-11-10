"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.05,
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    const id = requestAnimationFrame(raf);

    // Handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (link && link.hash) {
        e.preventDefault();
        const targetId = link.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            duration: 2.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            offset: 0,
          });
        }
      }
    };

    // Handle hash changes (e.g., browser back/forward)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            duration: 2.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            offset: 0,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', handleHashChange);

    // Scroll to hash on initial load if present
    if (window.location.hash) {
      setTimeout(() => {
        handleHashChange();
      }, 100);
    }
    
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', handleHashChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}


