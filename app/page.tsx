import SiteHeaderServer from "@/components/site-header-server";
import FooterServer from "@/components/footer-server";
import { Hero } from "@/components/hero";
import { LogoCarousel } from "@/components/logo-carousel";
import ServicesSection from "@/components/services-section";
import WhatYouGet from "@/components/what-you-get";
import Packages from "@/components/packages";
import CallToAction from "@/components/call-to-action";
import AboutSection from "@/components/about-section";
import { A4MSection } from "@/components/a4m-section";
import { getAcfOptions, getPageBySlug } from "@/lib/wordpress";

export default async function Home() {
  const [options, page] = await Promise.all([
    getAcfOptions(),
    getPageBySlug("home"),
  ]);

  const acf = page?.acf ?? {};
  const heroBackgroundImage = acf?.hero_background_image;
  const bgImageUrl =
    (heroBackgroundImage && typeof heroBackgroundImage === 'object' && heroBackgroundImage.sizes?.["2048x2048"] as string | undefined) ||
    (heroBackgroundImage && typeof heroBackgroundImage === 'object' && heroBackgroundImage.sizes?.["1536x1536"] as string | undefined) ||
    (heroBackgroundImage && typeof heroBackgroundImage === 'object' && heroBackgroundImage.url as string | undefined) ||
    undefined;
  const heroBackgroundVideo = acf?.hero_background_video;
  const bgVideoUrl = (heroBackgroundVideo && typeof heroBackgroundVideo === 'object' && heroBackgroundVideo.url) as string | undefined;

  return (
    <div className="flex min-h-screen flex-col font-sans bg-transparent">
      <SiteHeaderServer />
      <main className="flex-1">
        <Hero
          subHeading={acf?.hero_sub_heading}
          heading={acf?.hero_heading}
          description={acf?.hero_description}
          backgroundImageUrl={bgImageUrl}
          backgroundVideoUrl={bgVideoUrl}
          buttonText={acf?.button_text}
        />
        <A4MSection
          heading={acf?.a4m_heading}
          subheading={acf?.a4m_subheading}
          description={acf?.a4m_description}
          buttonText={acf?.a4m_button_text}
          buttonLink={acf?.a4m_link}
          textLinkText={acf?.text_link_text}
          textLink={acf?.text_link}
        />
        <ServicesSection />
        <AboutSection />
        <WhatYouGet />
        <Packages />
        <CallToAction />
      </main>
      <FooterServer />
    </div>
  );
}
