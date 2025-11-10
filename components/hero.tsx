"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GetStartedForm } from "@/components/get-started-form";

type HeroProps = {
  subHeading?: string;
  heading?: string;
  description?: string;
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  buttonText?: string;
};

export function Hero({ subHeading, heading, description, backgroundImageUrl, backgroundVideoUrl, buttonText }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (subHeadingRef.current) {
      tl.fromTo(subHeadingRef.current, 
        { opacity: 0, y: 6 }, 
        { opacity: 1, y: 0, duration: 0.4 }
      );
    }
    
    if (headingRef.current) {
      tl.fromTo(headingRef.current, 
        { opacity: 0, y: 8 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        0.05
      );
    }
    
    if (descriptionRef.current) {
      tl.fromTo(descriptionRef.current, 
        { opacity: 0, y: 8 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        0.1
      );
    }
    
    if (buttonRef.current && buttonText) {
      tl.fromTo(buttonRef.current, 
        { opacity: 0, y: 8 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        0.15
      );
    }
  }, [buttonText]);

  return (
    <section id="home" ref={heroRef} className="relative isolate h-dvh overflow-hidden rounded-2xl">
      {backgroundVideoUrl ? (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>
      ) : backgroundImageUrl ? (
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="pointer-events-auto mx-auto w-full max-w-6xl px-4 pb-16 text-center text-white sm:px-6 sm:pb-24 md:pb-28">
          <div className="mx-auto max-w-3xl">
          {subHeading ? (
            <p
              ref={subHeadingRef}
              className="text-sm font-medium uppercase tracking-widest text-white/80"
            >
              {subHeading}
            </p>
          ) : null}
          {heading ? (
            <h1
              ref={headingRef}
              className="mt-3 text-5xl font-semibold leading-tight tracking-tight sm:text-7xl md:text-6xl lg:text-[96px] lg:leading-[88px] lg:tracking-[-0.03em]"
            >
              {heading}
            </h1>
          ) : null}
          {description ? (
            <p
              ref={descriptionRef}
              className="mt-5 text-base text-white/85 sm:text-lg"
            >
              {description}
            </p>
          ) : null}
          {buttonText && (
            <button
              ref={buttonRef}
              onClick={() => setFormOpen(true)}
              className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 text-white px-6 py-3 text-base font-medium hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all"
            >
              {buttonText}
            </button>
          )}
          </div>
        </div>
      </div>
      <GetStartedForm open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
}


