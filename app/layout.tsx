import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAcfOptions } from "@/lib/wordpress";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LenisProvider } from "@/components/lenis-provider";
import Aurora from "@/components/Aurora";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export async function generateMetadata(): Promise<Metadata> {
  const options = await getAcfOptions();
  const title = options.siteName ?? "Starleap Global";
  const icons = options.faviconUrl ? [{ url: options.faviconUrl }] : undefined;
  return {
    title,
    description: `${title} — powered by Next.js`,
    icons,
    metadataBase: typeof process.env.NEXT_PUBLIC_SITE_URL === "string" ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
    openGraph: {
      title,
      siteName: title,
    },
    twitter: {
      title,
      card: "summary_large_image",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Aurora
          colorStops={["#6a0dad", "#3b0066", "#0b001a"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <LenisProvider>
          <div className="min-h-dvh p-[10px] bg-transparent relative z-10" style={{ backgroundColor: 'transparent' }}>
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
