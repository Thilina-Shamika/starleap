import SiteHeaderServer from "@/components/site-header-server";
import FooterServer from "@/components/footer-server";
import { getPageBySlug } from "@/lib/wordpress";
import { A4MSection } from "@/components/a4m-section";

export default async function A4MPage() {
  const page = await getPageBySlug("home");
  const acf = page?.acf ?? {};

  return (
    <div className="flex min-h-screen flex-col font-sans bg-transparent">
      <SiteHeaderServer />
      <main className="flex-1">
        <div className="pt-20 md:pt-32 pb-20">
          <A4MSection
            heading={acf?.a4m_heading}
            subheading={acf?.a4m_subheading}
            description={acf?.a4m_description}
            buttonText={undefined}
            buttonLink={acf?.a4m_link}
            textLinkText={acf?.text_link_text}
            textLink={acf?.text_link}
          />
        </div>
      </main>
      <FooterServer />
    </div>
  );
}

