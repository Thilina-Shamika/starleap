import { getAcfOptions, getHeaderConfig } from '@/lib/wordpress';
import { SiteHeader } from './site-header';

export default async function SiteHeaderServer() {
  const [options, header] = await Promise.all([getAcfOptions(), getHeaderConfig()]);
  const siteName = options.siteName ?? 'Starleap.';

  const items = (header?.acf?.menu_item ?? [])
    .map((m: any) => ({
      name: m?.menu_item_name || '',
      url: (m?.menu_item_link && (m.menu_item_link.url || m.menu_item_link)) || '#',
      target: m?.menu_item_link?.target,
    }))
    .filter((m: any) => m.name);

  let ctaText: string | undefined = header?.acf?.get_started_button_text as any;
  const rawCta = header?.acf?.get_started_button_link as any;
  const ctaLink: string | undefined = typeof rawCta === 'string' ? rawCta : rawCta?.url;

  return <SiteHeader siteName={siteName} items={items} ctaText={ctaText} ctaLink={ctaLink} />;
}


