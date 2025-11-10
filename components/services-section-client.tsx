"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { GetStartedForm } from './get-started-form';
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiDavinciresolve,
  SiAdobephotoshop,
  SiFigma,
  SiShopify,
  SiTailwindcss,
} from 'react-icons/si';

type ServicesSectionClientProps = {
  services: Array<{
    id: number;
    link?: string;
    acf?: {
      service_name?: string;
      service_description?: string;
      small_description?: string;
      service_icons?: string[]; // Array of icon names to use
      button_text?: string;
      button_link?: {
        title?: string;
        url?: string;
        target?: string;
      };
      gallery?: Array<{
        url?: string;
        sizes?: {
          large?: string;
          medium_large?: string;
          medium?: string;
        };
      }>;
    };
  }>;
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

// Icon mapping component
const IconComponent = ({ name }: { name: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'nextjs': <SiNextdotjs />,
    'react': <SiReact />,
    'nodejs': <SiNodedotjs />,
    'javascript': <SiJavascript />,
    'html5': <SiHtml5 />,
    'css3': <SiCss3 />,
    'premiere': <SiAdobepremierepro />,
    'aftereffects': <SiAdobeaftereffects />,
    'davinci': <SiDavinciresolve />,
    'photoshop': <SiAdobephotoshop />,
    'figma': <SiFigma />,
    'shopify': <SiShopify />,
    'tailwind': <SiTailwindcss />,
  };
  
  return iconMap[name.toLowerCase()] || null;
};

// Helper function to get icon names for a service
function getServiceIconNames(serviceName: string, customIcons?: string[]): string[] {
  if (customIcons && customIcons.length > 0) {
    return customIcons;
  }
  
  // Default icons based on service name
  const name = serviceName.toLowerCase();
  if (name.includes('web') || name.includes('development')) {
    return ['nextjs', 'react', 'tailwind', 'nodejs'];
  }
  if (name.includes('video') || name.includes('editing')) {
    return ['premiere', 'aftereffects', 'davinci'];
  }
  if (name.includes('mobile') || name.includes('app')) {
    return ['react'];
  }
  
  return [];
}

export function ServicesSectionClient({ 
  services,
  heading,
  subheading,
  description,
  buttonText,
  buttonLink
}: ServicesSectionClientProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-32 md:py-40 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
          {/* Left Column - Heading Section */}
          <div className="flex flex-col justify-center">
            {subheading && (
              <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-4">
                {subheading}
              </p>
            )}
            {heading && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[0.9]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
                {description}
              </p>
            )}
            {buttonText && (
              <button
                onClick={() => {
                  setSelectedService(undefined);
                  setFormOpen(true);
                }}
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 backdrop-blur-sm border border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-xl self-start"
                style={{ fontFamily: "SF Pro Display, var(--font-geist-sans), sans-serif" }}
              >
                {buttonText}
              </button>
            )}
          </div>

          {/* Right Column - Service Cards */}
          <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const serviceName = service.acf?.service_name || 'Service';
            const serviceDescription = service.acf?.service_description || '';
            const smallDescription = service.acf?.small_description || '';
            const buttonText = service.acf?.button_text || 'Learn more';
            const buttonLink = service.acf?.button_link?.url || service.link || '#';
            const buttonTarget = service.acf?.button_link?.target || '_self';
            const iconNames = getServiceIconNames(serviceName, service.acf?.service_icons);

            return (
              <div
                key={service.id}
                className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/2 border border-white/10 p-8 md:p-10 flex flex-col min-h-[400px]"
              >
                {/* Frosted glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/2 to-transparent pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Title */}
                  <p className="text-[10px] font-medium uppercase tracking-widest text-white/70 mb-3">
                    {serviceName.toUpperCase()}
                  </p>

                  {/* Icons */}
                  {iconNames.length > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      {iconNames.map((iconName, index) => (
                        <div key={index} className="text-white/60 hover:text-white/80 transition-colors text-xl">
                          <IconComponent name={iconName} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Headline */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {serviceDescription || 'Results that matter, Stories worth telling.'}
                  </h3>

                  {/* Small Description */}
                  {smallDescription && (
                    <p className="text-white/60 text-xs leading-relaxed mb-6 flex-grow">
                      {smallDescription}
                    </p>
                  )}

                  {/* Spacer */}
                  <div className="flex-grow" />

                  {/* Button */}
                  <button
                    onClick={() => {
                      setSelectedService(serviceName);
                      setFormOpen(true);
                    }}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500/20 via-purple-600/20 to-purple-500/20 hover:from-purple-500/30 hover:via-purple-600/30 hover:to-purple-500/30 backdrop-blur-sm border border-white/20 transition-all duration-300 self-start"
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
      <GetStartedForm 
        open={formOpen} 
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) {
            setSelectedService(undefined);
          }
        }} 
        defaultService={selectedService} 
      />
    </section>
  );
}
