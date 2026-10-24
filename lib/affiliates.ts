import affiliatesJson from "@/data/affiliates.json";
import { getOffers } from "@/lib/prices";
import {
  affiliateConfigSchema,
  type AffiliateProgram,
} from "@/lib/schema";

const config = affiliateConfigSchema.parse(affiliatesJson);

const bySlug = new Map(
  config.programs.map((program) => [program.providerSlug, program]),
);

export function getAffiliatePrograms(): AffiliateProgram[] {
  return config.programs;
}

export function getAffiliateProgram(
  providerSlug: string,
): AffiliateProgram | undefined {
  return bySlug.get(providerSlug);
}

export function resolveOutboundUrl(providerSlug: string): {
  href: string;
  linkType: "affiliate" | "direct";
  program?: AffiliateProgram;
} {
  const program = getAffiliateProgram(providerSlug);
  if (program?.approved && program.affiliateUrl) {
    return {
      href: program.affiliateUrl,
      linkType: "affiliate",
      program,
    };
  }
  if (program) {
    return { href: program.officialUrl, linkType: "direct", program };
  }
  const offer = getOffers().find((row) => row.providerSlug === providerSlug);
  if (offer) {
    return { href: offer.sourceUrl, linkType: "direct" };
  }
  return { href: "/", linkType: "direct" };
}
