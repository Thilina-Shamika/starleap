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

export type WordPressService = {
  id: number;
  slug: string;
  title?: { rendered?: string };
  acf?: {
    service_name?: string;
    service_description?: string;
    service_header?: string;
    gallery?: WordPressMedia[];
    project_link?: { title?: string; url?: string; target?: string };
    service_page_link_text?: string;
    services_page_link?: string;
  };
};

export type WordPressPackage = {
  id: number;
  slug: string;
  title?: { rendered?: string };
  acf?: {
    package_name?: string;
    monthly_charge?: string;
    for_whom?: string;
    package_info?: Array<{
      item_heading?: string;
      item_list?: Array<{ items?: string }> | false;
    }>;
  };
};

export type HeaderMenuItem = {
  menu_item_name?: string;
  menu_item_link?: { title?: string; url?: string; target?: string };
};

export type WordPressHeader = {
  acf?: {
    menu_item?: HeaderMenuItem[];
    get_started_button_text?: string;
    get_started_button_link?: string | { url?: string; target?: string };
  };
};

export type WordPressFooter = {
  acf?: {
    menu_item?: HeaderMenuItem[];
    get_started_button_text?: string;
    get_started_button_link?: string | { url?: string; target?: string };
    terms_and_conditions?: string;
    terms_and_condition_link?: string | { url?: string; target?: string };
    privacy_policy?: string;
    privacy_policy_link?: string | { url?: string; target?: string };
    return_policy?: string;
    return_policy_link?: string | { url?: string; target?: string };
    address?: string;
    phone?: string;
    email?: string;
    social_media_accounts?: Array<{
      social_media_name?: string;
      social_media_link?: string | { url?: string; target?: string };
    }>;
  };
};

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

if (!WORDPRESS_URL) {
  // Intentionally do not throw to allow the app to boot without envs in dev
  // Consumers should check for empty results
}

async function wpFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!WORDPRESS_URL) {
    return Promise.resolve(null);
  }

  const url = `${WORDPRESS_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    // Ensure fresh data for services
    next: { revalidate: 0 },
    cache: 'no-store'
  } as any);

  if (!res.ok) {
    // Return null for 404s instead of throwing - allows graceful degradation
    if (res.status === 404) {
      console.warn(`WordPress endpoint not found: ${path} (404)`);
      return null;
    }
    // Still throw for other errors (500, 403, etc.)
    throw new Error(`WordPress request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Attempts to read ACF options. Requires ACF REST API enabled.
// Endpoint shape: /wp-json/acf/v3/options/options => { acf: { site_name: string, favicon: { url: string } | string } }
export async function getAcfOptions(): Promise<WordPressOptions> {
  try {
    const data = await wpFetch<any>("/wp-json/acf/v3/options/options");
    if (!data) {
      // Fall through to WP general settings
    } else {
      const acf = data?.acf ?? {};

      const rawFavicon = acf?.favicon ?? acf?.site_icon ?? acf?.site_favicon;
      const faviconUrl: string | undefined = typeof rawFavicon === "string" ? rawFavicon : rawFavicon?.url;

      const siteName: string | undefined = acf?.site_name ?? acf?.sitename ?? acf?.site_title;

      return { siteName, faviconUrl };
    }
  } catch {
    // Fall through to WP general settings
  }
  
  // Fall back to WP general settings via REST if available
  try {
    // /wp-json is the index, often exposes name and site_icon_url via /wp-json
    const index = await wpFetch<any>("/wp-json");
    if (index) {
      return {
        siteName: index?.name,
        faviconUrl: index?.site_icon_url,
      };
    }
  } catch {
    // Ignore errors
  }
  
  return {};
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    // Ensure we get ACF fields on pages
    const results = await wpFetch<WordPressPage[]>(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_acf_format=standard&_fields=id,slug,title,content,acf`);
    return results && Array.isArray(results) && results.length > 0 ? results[0] : null;
  } catch {
    return null;
  }
}

export async function getServices(): Promise<WordPressService[]> {
  try {
    const results = await wpFetch<WordPressService[]>(`/wp-json/wp/v2/service?_acf_format=standard&_fields=id,slug,title,acf&per_page=100`);
    if (!results) {
      console.warn('Services endpoint returned null (endpoint may not exist)');
      return [];
    }
    console.log('Fetched services:', results);
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getPackages(): Promise<WordPressPackage[]> {
  try {
    const results = await wpFetch<WordPressPackage[]>(
      `/wp-json/wp/v2/package?_acf_format=standard&_fields=id,slug,title,acf&per_page=100`
    );
    if (!results) {
      console.warn('Packages endpoint returned null (endpoint may not exist)');
      return [];
    }
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export async function getHeaderConfig(): Promise<WordPressHeader | null> {
  try {
    const results = await wpFetch<WordPressHeader[]>(
      `/wp-json/wp/v2/header?_acf_format=standard&_fields=acf&per_page=1`
    );
    if (!results) {
      console.warn('Header endpoint returned null (endpoint may not exist)');
      return null;
    }
    return Array.isArray(results) && results.length ? results[0] : null;
  } catch (error) {
    console.error('Error fetching header config:', error);
    return null;
  }
}

export async function getFooterConfig(): Promise<WordPressFooter | null> {
  try {
    const results = await wpFetch<WordPressFooter[]>(
      `/wp-json/wp/v2/footer?_acf_format=standard&_fields=acf&per_page=1`
    );
    if (!results) {
      console.warn('Footer endpoint returned null (endpoint may not exist)');
      return null;
    }
    return Array.isArray(results) && results.length ? results[0] : null;
  } catch (error) {
    console.error('Error fetching footer config:', error);
    return null;
  }
}


