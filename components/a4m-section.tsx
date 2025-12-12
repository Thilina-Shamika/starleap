"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GetStartedForm } from "@/components/get-started-form";

type A4MSectionProps = {
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: { title?: string; url?: string; target?: string } | string;
  textLinkText?: string;
  textLink?: { title?: string; url?: string; target?: string } | string;
};

export function A4MSection({
  heading,
  subheading,
  description,
  buttonText,
  buttonLink,
  textLinkText,
  textLink,
}: A4MSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const cameraRef1 = useRef<HTMLDivElement>(null);
  const cameraRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Parallax effect for camera icons with scaling
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !cameraRef1.current || !cameraRef2.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1 as section enters and exits viewport)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      
      // Parallax offset - icons move at different speeds
      const parallaxOffset = scrollProgress * 50;
      
      // Scale effect - icons grow as you scroll (1.0 to 1.3 scale)
      const scale = 1 + (scrollProgress * 0.3);
      
      // Apply transform to camera icons with both parallax and scale
      if (cameraRef1.current) {
        cameraRef1.current.style.transform = `translateY(${parallaxOffset * 0.5}px) rotate(-8deg) scale(${scale})`;
      }
      if (cameraRef2.current) {
        cameraRef2.current.style.transform = `translateY(${-parallaxOffset * 0.3}px) rotate(8deg) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle button click - open form instead of navigating if buttonText exists
  const handleButtonClick = (e: React.MouseEvent) => {
    if (buttonText) {
      e.preventDefault();
      setFormOpen(true);
    }
  };

  // Handle text link - can be string or object
  const textUrl = typeof textLink === "string" ? textLink : textLink?.url || "#";
  const textTarget = typeof textLink === "string" ? "_self" : textLink?.target || "_self";

  return (
    <>
      <section
        ref={sectionRef}
        className="relative my-8 md:my-12 px-4"
      >
        {/* Container matching hero section width and radius */}
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden relative py-16 md:py-32 px-6 md:px-8 lg:px-12">
            {/* Enhanced gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/8 via-purple-600/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/3 to-transparent pointer-events-none" />
            
            {/* Subtle border glow effect */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            
            {/* Video camera watermark icon - 3D style with parallax */}
            <div 
              ref={cameraRef1}
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8 lg:-top-12 lg:-right-12 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] transition-transform duration-75 ease-out"
            >
              <svg
                className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rotate-[-12deg] md:rotate-[-8deg]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 3D Video Camera Icon */}
                <defs>
                  <linearGradient id="cameraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
                  </filter>
                </defs>
                
                {/* Camera Body */}
                <rect x="20" y="30" width="50" height="40" rx="4" fill="url(#cameraGradient)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" filter="url(#shadow)" />
                <rect x="22" y="32" width="46" height="36" rx="3" fill="rgba(255,255,255,0.05)" />
                
                {/* Lens */}
                <circle cx="45" cy="50" r="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" filter="url(#shadow)" />
                <circle cx="45" cy="50" r="8" fill="rgba(255,255,255,0.08)" />
                <circle cx="45" cy="50" r="5" fill="rgba(255,255,255,0.12)" />
                
                {/* Viewfinder */}
                <rect x="55" y="35" width="12" height="8" rx="1" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                
                {/* Flash */}
                <circle cx="30" cy="40" r="3" fill="rgba(255,255,255,0.15)" />
                
                {/* Top Handle/Grip */}
                <rect x="35" y="20" width="20" height="12" rx="2" fill="url(#cameraGradient)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <rect x="37" y="22" width="16" height="8" rx="1" fill="rgba(255,255,255,0.05)" />
              </svg>
            </div>
            
            {/* Optional: Additional smaller icon in opposite corner for balance with parallax */}
            <div 
              ref={cameraRef2}
              className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 lg:-bottom-12 lg:-left-12 pointer-events-none z-0 opacity-[0.05] md:opacity-[0.08] hidden md:block transition-transform duration-75 ease-out"
            >
              <svg
                className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rotate-[8deg]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="cameraGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
                  </linearGradient>
                  <filter id="shadowSmall">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
                  </filter>
                </defs>
                <rect x="20" y="30" width="50" height="40" rx="4" fill="url(#cameraGradientSmall)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" filter="url(#shadowSmall)" />
                <circle cx="45" cy="50" r="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx="45" cy="50" r="6" fill="rgba(255,255,255,0.1)" />
                <rect x="55" y="35" width="10" height="6" rx="1" fill="rgba(255,255,255,0.08)" />
              </svg>
            </div>
            
            <div
              className={`text-center transition-all duration-700 ease-out relative z-10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {subheading && (
                <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/70 mb-4 md:mb-5">
                  {subheading}
                </p>
              )}
              
              {heading && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight max-w-4xl mx-auto">
                  {heading.includes('(') ? (
                    <>
                      <span className="block">{heading.split('(')[0].trim()}</span>
                      <span className="block mt-1 md:mt-2">({heading.split('(')[1]}</span>
                    </>
                  ) : (
                    <span className="block">{heading}</span>
                  )}
                </h2>
              )}
              
              {description && (
                <p className="text-base md:text-lg text-white/75 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">
                  {description}
                </p>
              )}
              
              {buttonText && (
                <div className="mb-4 md:mb-5">
                  <button
                    onClick={handleButtonClick}
                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 text-white px-8 py-4 md:px-10 md:py-4 text-base md:text-lg font-medium hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all duration-300 min-h-[56px] sm:min-h-[60px] backdrop-blur-sm"
                    style={{ fontFamily: "SF Pro Display, var(--font-geist-sans), sans-serif" }}
                  >
                    {buttonText}
                    <span className="ml-2 hidden sm:inline">✨</span>
                  </button>
                </div>
              )}
              
              {textLinkText && (
                <p className="text-sm md:text-base text-white/60">
                  <Link
                    href={textUrl}
                    target={textTarget}
                    className="hover:text-white/80 transition-colors underline underline-offset-2"
                  >
                    {textLinkText}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <GetStartedForm 
        open={formOpen} 
        onOpenChange={setFormOpen}
        defaultService="A4M"
      />
    </>
  );
}

