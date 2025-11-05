import { getPageBySlug } from '@/lib/wordpress';
import { WhatYouGetClient } from './what-you-get-client';

export default async function WhatYouGet() {
  const page = await getPageBySlug('home');
  const acf = (page?.acf ?? {}) as any;
  const items = Array.isArray(acf.what_you_get_points) ? acf.what_you_get_points : [];

  const mapped = items.map((item: any) => ({
    heading: item?.what_you_get_heading as string | undefined,
    bullets: Array.isArray(item?.what_you_get_bullets)
      ? item.what_you_get_bullets
          .map((b: any) => (typeof b?.what_you_get_bullet_points === 'string' ? b.what_you_get_bullet_points : undefined))
          .filter(Boolean)
      : [],
  }));

  return <WhatYouGetClient columns={mapped} />;
}


