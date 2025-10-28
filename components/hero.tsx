"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type HeroProps = {
  subHeading?: string;
  heading?: string;
  description?: string;
  backgroundImageUrl?: string;
};

export function Hero({ subHeading, heading, description, backgroundImageUrl }: HeroProps) {
  return (
    <section className="relative isolate h-dvh overflow-hidden rounded-2xl border">
      {backgroundImageUrl ? (
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="pointer-events-auto mx-auto w-full max-w-6xl px-4 pb-16 text-center text-white sm:px-6 sm:pb-24 md:pb-28">
          <div className="mx-auto max-w-3xl">
          {subHeading ? (
            <motion.p
              className="text-sm font-medium uppercase tracking-widest text-white/80"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {subHeading}
            </motion.p>
          ) : null}
          {heading ? (
            <motion.h1
              className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-[96px] lg:leading-[88px] lg:tracking-[-0.03em]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {heading}
            </motion.h1>
          ) : null}
          {description ? (
            <motion.p
              className="mt-5 text-base text-white/85 sm:text-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>
          ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


