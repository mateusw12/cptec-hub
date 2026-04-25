import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const { path } = await ctx.params;
  const { searchParams } = new URL(req.url);

  const upstream = new URL(
    `https://servicodados.ibge.gov.br/api/${path.join("/")}`,
  );
  searchParams.forEach((value, key) => upstream.searchParams.set(key, value));

  const res = await fetch(upstream.toString(), {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 86400 }, // cache 24h no servidor
  });

  if (!res.ok) {
    return new Response(null, { status: res.status });
  }

  const body = await res.text();
  const contentType = res.headers.get("content-type") ?? "application/json";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
