import type { Metadata } from "next";
import SiteHeaderServer from "@/components/site-header-server";
import FooterServer from "@/components/footer-server";
import { getPageBySlug } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("terms-and-conditions");
  const title = page?.title?.rendered || "Terms and Conditions";
  
  return {
    title,
    description: title,
  };
}

export default async function TermsAndConditionsPage() {
  const page = await getPageBySlug("terms-and-conditions");

  if (!page) {
    return (
      <div className="flex min-h-screen flex-col font-sans bg-transparent">
        <SiteHeaderServer />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-2xl font-semibold mb-4">Page Not Found</h1>
            <p className="text-white/70">The terms and conditions page could not be found.</p>
          </div>
        </main>
        <FooterServer />
      </div>
    );
  }

  const title = page.title?.rendered || "Terms and Conditions";
  const content = page.content?.rendered || "";

  return (
    <div className="flex min-h-screen flex-col font-sans bg-transparent">
      <SiteHeaderServer />
      <main className="flex-1">
        <div className="px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Glassy container */}
            <div className="relative w-full rounded-[28px] md:rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] p-8 md:p-12">
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600/20 via-fuchsia-400/15 to-rose-500/15" />
              
              {/* Content */}
              <div className="relative z-10 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">{title}</h1>
                <div 
                  className="privacy-content text-white/80 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: content }}
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.75',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterServer />
    </div>
  );
}

