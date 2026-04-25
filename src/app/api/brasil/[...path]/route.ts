import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const { path } = await ctx.params;
  const rawSearch = req.nextUrl.search;
  const upstream = new URL(`https://brasilapi.com.br/api/${path.join("/")}${rawSearch}`);

  const res = await fetch(upstream.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    },
    next: { revalidate: 60 * 60 * 6 },
  });

  const body = await res.text();
  const contentType = res.headers.get("content-type") ?? "application/json";

  return new Response(body, {
    status: res.status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=21600",
    },
  });
}
