import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const { path } = await ctx.params;

  const rawSearch = req.nextUrl.search;
  const url = `https://servicodados.ibge.gov.br/api/${path.join("/")}${rawSearch}`;

  console.log("Proxying request to IBGE API:", url);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "application/json",
    },
    cache: "no-store", 
  });

  const text = await res.text();

  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}