import { WhatYouGetClient } from './what-you-get-client';
import { getPackages } from '@/lib/wordpress';
import { PackagesClient } from './packages-client';

export default async function Packages() {
  // Expect getPackages to fetch /wp-json/wp/v2/package?per_page=100
  const pkgs = await getPackages?.();

  const mapped = Array.isArray(pkgs)
    ? pkgs.map((p: any) => ({
        id: p.id,
        name: p?.acf?.package_name || p?.title?.rendered,
        price: p?.acf?.monthly_charge,
        subtitle: p?.acf?.for_whom,
        info: Array.isArray(p?.acf?.package_info)
          ? p.acf.package_info.map((row: any) => ({
              heading: row?.item_heading as string | undefined,
              items: Array.isArray(row?.item_list)
                ? row.item_list
                    .map((it: any) => (typeof it?.items === 'string' ? it.items : undefined))
                    .filter(Boolean)
                : [],
            }))
          : [],
      }))
      // Sort: GROW first, then FLOW, then ASCENT (fallback alphabetical)
      .sort((a: any, b: any) => {
        const order = ['GROW', 'FLOW', 'ASCENT'];
        const pa = (a.name || '').toUpperCase();
        const pb = (b.name || '').toUpperCase();
        const ia = order.findIndex(k => pa.includes(k));
        const ib = order.findIndex(k => pb.includes(k));
        const sa = ia === -1 ? Number.MAX_SAFE_INTEGER : ia;
        const sb = ib === -1 ? Number.MAX_SAFE_INTEGER : ib;
        if (sa !== sb) return sa - sb;
        return pa.localeCompare(pb);
      })
    : [];

  return <PackagesClient packages={mapped} />;
}


