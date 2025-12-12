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
          <div className="rounded-2xl overflow-hidden relative py-16 md:py-32 px-6 md:px-8">
            {/* Subtle gradient background matching homepage sections */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent pointer-events-none" />
            
            <div
              className={`text-center transition-all duration-700 ease-out relative z-10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {heading && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6 leading-tight">
                  {heading}
                </h2>
              )}
              
              {subheading && (
                <p className="text-lg md:text-xl text-white/90 mb-3 md:mb-6 font-medium">
                  {subheading}
                </p>
              )}
              
              {description && (
                <p className="text-base md:text-lg text-white/70 mb-5 md:mb-8 leading-relaxed max-w-2xl mx-auto">
                  {description}
                </p>
              )}
              
              {buttonText && (
                <div className="mb-3 md:mb-4">
                  <button
                    onClick={handleButtonClick}
                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 text-white px-8 py-4 md:px-10 md:py-4 text-base md:text-lg font-medium hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all duration-300 min-h-[56px] sm:min-h-[60px]"
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

