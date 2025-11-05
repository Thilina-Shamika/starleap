"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type HeroProps = {
  subHeading?: string;
  heading?: string;
  description?: string;
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
};

export function Hero({ subHeading, heading, description, backgroundImageUrl, backgroundVideoUrl }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

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
  }, []);

  return (
    <section ref={heroRef} className="relative isolate h-dvh overflow-hidden rounded-2xl">
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
              className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-[96px] lg:leading-[88px] lg:tracking-[-0.03em]"
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
          </div>
        </div>
      </div>
    </section>
  );
}


