import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import ServicesSection from "@/components/services-section";
import { getAcfOptions, getPageBySlug } from "@/lib/wordpress";

export default async function Home() {
  const [options, page] = await Promise.all([
    getAcfOptions(),
    getPageBySlug("home"),
  ]);

  const acf = page?.acf ?? {};
  const bgUrl =
    (acf?.hero_background_image?.sizes?.["2048x2048"] as string | undefined) ||
    (acf?.hero_background_image?.sizes?.["1536x1536"] as string | undefined) ||
    (acf?.hero_background_image?.url as string | undefined);

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <SiteHeader siteName={options.siteName ?? "Website"} />
      <main className="flex-1">
        <Hero
          subHeading={acf?.hero_sub_heading}
          heading={acf?.hero_heading}
          description={acf?.hero_description}
          backgroundImageUrl={bgUrl}
        />
        <ServicesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
