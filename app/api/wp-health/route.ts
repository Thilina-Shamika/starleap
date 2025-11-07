export const runtime = "edge";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!base) {
    return new Response(
      JSON.stringify({ ok: false, error: "NEXT_PUBLIC_WORDPRESS_URL is not set" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }
  try {
    const baseUrl = base.replace(/\/$/, "");
    
    // Test WordPress REST API
    const wpRes = await fetch(`${baseUrl}/wp-json`, { next: { revalidate: 0 } } as any);
    const wpJson = await wpRes.json().catch(() => ({}));
    
    // Test ACF REST API
    let acfAvailable = false;
    try {
      const acfRes = await fetch(`${baseUrl}/wp-json/acf/v3/options/options`, { next: { revalidate: 0 } } as any);
      acfAvailable = acfRes.ok;
    } catch {
      acfAvailable = false;
    }
    
    // Test ACF format parameter (for ACF 5.11+)
    let acfFormatAvailable = false;
    try {
      const testPageRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages?per_page=1&_acf_format=standard`, { next: { revalidate: 0 } } as any);
      if (testPageRes.ok) {
        const testPage = await testPageRes.json().catch(() => ([]));
        acfFormatAvailable = Array.isArray(testPage) && testPage.length > 0 && testPage[0]?.acf !== undefined;
      }
    } catch {
      acfFormatAvailable = false;
    }
    
    return new Response(
      JSON.stringify({ 
        ok: wpRes.ok, 
        status: wpRes.status, 
        name: wpJson?.name, 
        url: wpJson?.url,
        acfRestApi: acfAvailable,
        acfFormat: acfFormatAvailable,
        message: !acfAvailable && !acfFormatAvailable 
          ? "ACF REST API is not available. Please enable it in WordPress ACF settings or install 'ACF to REST API' plugin."
          : "WordPress connection successful"
      }),
      { status: wpRes.ok ? 200 : 502, headers: { "content-type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message ?? "Fetch failed" }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}


