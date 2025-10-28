export type WordPressOptions = {
  siteName?: string;
  faviconUrl?: string;
};

export type WordPressMedia = {
  url?: string;
  sizes?: Record<string, string>;
  width?: number;
  height?: number;
};

export type WordPressPage = {
  id: number;
  slug: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: Record<string, any> & {
    hero_sub_heading?: string;
    hero_heading?: string;
    hero_description?: string;
    hero_background_image?: WordPressMedia | false;
    hero_background_video?: any;
  };
};

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

if (!WORDPRESS_URL) {
  // Intentionally do not throw to allow the app to boot without envs in dev
  // Consumers should check for empty results
}

async function wpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!WORDPRESS_URL) {
    return Promise.resolve({} as T);
  }

  const url = `${WORDPRESS_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    // Ensure fresh data for metadata while still allowing ISR elsewhere
    next: { revalidate: 300 },
  } as any);

  if (!res.ok) {
    throw new Error(`WordPress request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Attempts to read ACF options. Requires ACF REST API enabled.
// Endpoint shape: /wp-json/acf/v3/options/options => { acf: { site_name: string, favicon: { url: string } | string } }
export async function getAcfOptions(): Promise<WordPressOptions> {
  try {
    const data = await wpFetch<any>("/wp-json/acf/v3/options/options");
    const acf = data?.acf ?? {};

    const rawFavicon = acf?.favicon ?? acf?.site_icon ?? acf?.site_favicon;
    const faviconUrl: string | undefined = typeof rawFavicon === "string" ? rawFavicon : rawFavicon?.url;

    const siteName: string | undefined = acf?.site_name ?? acf?.sitename ?? acf?.site_title;

    return { siteName, faviconUrl };
  } catch {
    // Fall back to WP general settings via REST if available
    try {
      // /wp-json is the index, often exposes name and site_icon_url via /wp-json
      const index = await wpFetch<any>("/wp-json");
      return {
        siteName: index?.name,
        faviconUrl: index?.site_icon_url,
      };
    } catch {
      return {};
    }
  }
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    // Ensure we get ACF fields on pages
    const results = await wpFetch<WordPressPage[]>(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_acf_format=standard&_fields=id,slug,title,content,acf`);
    return Array.isArray(results) && results.length > 0 ? results[0] : null;
  } catch {
    return null;
  }
}


