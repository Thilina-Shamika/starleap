import { getFooterConfig, getAcfOptions } from '@/lib/wordpress';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

// Helper function to convert WordPress URLs to Next.js routes
function convertToNextRoute(url: string | undefined): string {
  if (!url || url === '#') return '#';
  
  // Keep anchor links as-is
  if (url.startsWith('#')) return url;
  
  // Keep external links as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Check if it's the same domain - if so, convert to relative path
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || wpUrl;
    
    if (siteUrl && url.startsWith(siteUrl)) {
      // Extract the path from the full URL
      try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        // Remove trailing slash and return
        return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
      } catch {
        return url;
      }
    }
    // External link, keep as-is
    return url;
  }
  
  // Already a relative path, clean it up
  return url.startsWith('/') ? url : `/${url}`;
}

export default async function FooterServer() {
  const [footer, options] = await Promise.all([getFooterConfig(), getAcfOptions()]);
  const siteName = options.siteName ?? 'Starleap Global';
  const acf: any = footer?.acf ?? {};
  const menu: any[] = Array.isArray(acf.menu_item) ? acf.menu_item : [];
  const socials: any[] = Array.isArray(acf.social_media_accounts) ? acf.social_media_accounts : [];

  const termsText: string | undefined = acf.terms_and_conditions;
  const termsHrefRaw: string | undefined = typeof acf.terms_and_condition_link === 'string' ? acf.terms_and_condition_link : acf.terms_and_condition_link?.url;
  const termsHref = convertToNextRoute(termsHrefRaw);
  
  const privacyText: string | undefined = acf.privacy_policy;
  const privacyHrefRaw: string | undefined = typeof acf.privacy_policy_link === 'string' ? acf.privacy_policy_link : acf.privacy_policy_link?.url;
  const privacyHref = convertToNextRoute(privacyHrefRaw);
  
  const returnText: string | undefined = acf.return_policy;
  const returnHrefRaw: string | undefined = typeof acf.return_policy_link === 'string' ? acf.return_policy_link : acf.return_policy_link?.url;
  const returnHref = convertToNextRoute(returnHrefRaw);

  return (
    <footer className="px-4 py-12">
      <div className="w-full">
        <div className="relative w-full rounded-[28px] md:rounded-[32px] bg-black/40 text-white border border-white/10 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
          <div className="grid md:grid-cols-4 gap-8 px-8 md:px-12 py-8">
            <div>
              <div className="text-2xl font-semibold">{siteName}</div>
              <div className="mt-4 space-y-2 text-white/80 text-sm">
                {acf.address && (
                  <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /><span>{acf.address}</span></div>
                )}
                {acf.phone && (
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>{acf.phone}</span></div>
                )}
                {acf.email && (
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>{acf.email}</span></div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest text-white/70">Menu</h4>
              <div className="mt-4 grid gap-2 text-sm">
                {menu.map((m, i) => {
                  const menuUrl = typeof m?.menu_item_link === 'string' ? m.menu_item_link : m?.menu_item_link?.url;
                  const menuHref = convertToNextRoute(menuUrl);
                  const menuTarget = typeof m?.menu_item_link === 'object' ? m.menu_item_link?.target : undefined;
                  return (
                    <Link 
                      key={i} 
                      href={menuHref || '#'} 
                      target={menuTarget === '_blank' ? '_blank' : undefined}
                      rel={menuTarget === '_blank' ? 'noopener noreferrer' : undefined}
                      className="text-white/85 hover:text-white"
                    >
                      {m?.menu_item_name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest text-white/70">Legal</h4>
              <div className="mt-4 grid gap-2 text-sm">
                {privacyText && (
                  <Link 
                    href={privacyHref || '#'} 
                    className="text-white/85 hover:text-white"
                  >
                    {privacyText}
                  </Link>
                )}
                {termsText && (
                  <Link 
                    href={termsHref || '#'} 
                    className="text-white/85 hover:text-white"
                  >
                    {termsText}
                  </Link>
                )}
                {returnText && (
                  <Link 
                    href={returnHref || '#'} 
                    className="text-white/85 hover:text-white"
                  >
                    {returnText}
                  </Link>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest text-white/70">Follow</h4>
              <div className="mt-4 flex items-center gap-3">
                {socials.map((s, i) => {
                  const href = typeof s?.social_media_link === 'string' ? s.social_media_link : s?.social_media_link?.url;
                  const name = (s?.social_media_name || '').toLowerCase();
                  const Icon = name.includes('instagram') ? Instagram : name.includes('twitter') ? Twitter : Facebook;
                  return (
                    <Link key={i} href={href || '#'} className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 p-2">
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-8 md:px-12 pb-8 pt-2 border-0">
            <p className="text-center text-xs text-white/60">© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}


