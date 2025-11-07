"use client";

import Orb from './Orb';
import Link from 'next/link';
import { Video, Users, MessageCircle, Presentation } from 'lucide-react';

type AboutSectionClientProps = {
  subheading?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonTarget?: string;
};

export function AboutSectionClient({
  subheading,
  heading,
  description,
  buttonText,
  buttonLink,
  buttonTarget
}: AboutSectionClientProps) {
  if (!heading && !description) {
    return null;
  }

  return (
    <section className="pt-8 md:pt-12 pb-32 md:pb-40 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Orb + Content in one centered container */}
        <div className="relative mx-auto w-full max-w-5xl h-[600px]">
          {/* Orb background */}
          <div className="absolute inset-0 -z-10">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>

          {/* Absolutely centered content inside the circle */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center max-w-3xl mx-auto">
              {subheading && (
                <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-3">
                  {subheading}
                </p>
              )}

              {heading && (
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {heading}
                </h2>
              )}

              {description && (
                <div className="text-white/70 text-[16px] leading-relaxed">
                  {description.split('\r\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {(buttonText || buttonLink) && (
                <div className="mt-6">
                  {buttonLink ? (
                    <Link
                      href={buttonLink}
                      target={buttonTarget === '_blank' ? '_blank' : undefined}
                      rel={buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 backdrop-blur-sm border border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {buttonText ?? 'Schedule a Meeting'}
                    </Link>
                  ) : (
                    <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 backdrop-blur-sm border border-purple-500/30">
                      {buttonText ?? 'Schedule a Meeting'}
                    </button>
                  )}

                  {/* Meeting platform icons */}
                  <div className="mt-4 flex items-center justify-center gap-4 text-white/70">
                    <span className="sr-only">Available on</span>
                    <Presentation aria-label="Google Meet" className="h-5 w-5" />
                    <Video aria-label="Zoom" className="h-5 w-5" />
                    <Users aria-label="Microsoft Teams" className="h-5 w-5" />
                    <MessageCircle aria-label="WhatsApp" className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

