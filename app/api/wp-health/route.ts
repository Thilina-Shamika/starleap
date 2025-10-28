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
    const res = await fetch(`${base.replace(/\/$/, "")}/wp-json`, { next: { revalidate: 0 } } as any);
    const json = await res.json().catch(() => ({}));
    return new Response(
      JSON.stringify({ ok: res.ok, status: res.status, name: json?.name, url: json?.url }),
      { status: res.ok ? 200 : 502, headers: { "content-type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message ?? "Fetch failed" }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}


