import { NextResponse } from "next/server";
import { resolveOutboundUrl } from "@/lib/affiliates";
import { getOffers } from "@/lib/prices";

export async function GET(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  const known =
    getOffers().some((offer) => offer.providerSlug === provider) ||
    resolveOutboundUrl(provider).href !== "/";
  const target = resolveOutboundUrl(provider);

  if (!known || target.href === "/") {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  console.info(
    JSON.stringify({
      type: "affiliate_out",
      provider,
      linkType: target.linkType,
      at: new Date().toISOString(),
    }),
  );

  return NextResponse.redirect(target.href, 302);
}
