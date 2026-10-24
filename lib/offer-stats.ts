import { eurDisplay, usdEquivalent } from "@/lib/prices";
import type { GpuModel, PriceOffer } from "@/lib/schema";
import { GPU_MODELS } from "@/lib/site";

export function isVerifiedPriced(offer: PriceOffer): boolean {
  return offer.verificationStatus === "verified" && usdEquivalent(offer) !== null;
}

export function pricedOnDemand(offers: PriceOffer[]): PriceOffer[] {
  return offers
    .filter(isVerifiedPriced)
    .filter((offer) => offer.pricingType === "on-demand")
    .sort((a, b) => (usdEquivalent(a) ?? Infinity) - (usdEquivalent(b) ?? Infinity));
}

export function pricedOfType(
  offers: PriceOffer[],
  pricingType: PriceOffer["pricingType"],
): PriceOffer[] {
  return offers
    .filter(isVerifiedPriced)
    .filter((offer) => offer.pricingType === pricingType)
    .sort((a, b) => (usdEquivalent(a) ?? Infinity) - (usdEquivalent(b) ?? Infinity));
}

export function uniqueProviders(offers: PriceOffer[]): string[] {
  return [...new Set(offers.map((offer) => offer.providerSlug))];
}

export function medianUsd(offers: PriceOffer[]): number | null {
  const values = offers
    .map((offer) => usdEquivalent(offer))
    .filter((value): value is number => value !== null)
    .sort((a, b) => a - b);
  if (values.length === 0) {
    return null;
  }
  const mid = Math.floor(values.length / 2);
  if (values.length % 2 === 0) {
    return (values[mid - 1] + values[mid]) / 2;
  }
  return values[mid];
}

export type VariantStat = {
  variant: PriceOffer["variant"];
  offers: PriceOffer[];
  verifiedProviders: string[];
  insufficientData: boolean;
  cheapestOnDemand: PriceOffer | null;
  runnerUpOnDemand: PriceOffer | null;
  medianOnDemandUsd: number | null;
  cheapestSpot: PriceOffer | null;
  cheapestReserved: PriceOffer | null;
};

export function variantStats(offers: PriceOffer[]): VariantStat[] {
  const variants = [...new Set(offers.map((offer) => offer.variant))];
  return variants
    .map((variant) => {
      const rows = offers.filter((offer) => offer.variant === variant);
      const onDemand = pricedOnDemand(rows);
      const verifiedProviders = uniqueProviders(rows.filter(isVerifiedPriced));
      return {
        variant,
        offers: rows,
        verifiedProviders,
        insufficientData: verifiedProviders.length < 3,
        cheapestOnDemand: onDemand[0] ?? null,
        runnerUpOnDemand: onDemand[1] ?? null,
        medianOnDemandUsd: medianUsd(onDemand),
        cheapestSpot: pricedOfType(rows, "spot")[0] ?? null,
        cheapestReserved: pricedOfType(rows, "reserved")[0] ?? null,
      };
    })
    .sort((a, b) => a.variant.localeCompare(b.variant));
}

export type CheapestGpuRow = {
  gpu: GpuModel;
  cheapest: PriceOffer | null;
  runnerUp: PriceOffer | null;
  inStockCount: number;
  verifiedOnDemandCount: number;
};

export function cheapestPerGpu(offers: PriceOffer[]): CheapestGpuRow[] {
  return GPU_MODELS.map((gpu) => {
    const rows = offers.filter((offer) => offer.gpu === gpu);
    const onDemand = pricedOnDemand(rows);
    const inStock = onDemand.filter((offer) => offer.stock === "in-stock");
    return {
      gpu,
      cheapest: onDemand[0] ?? null,
      runnerUp: onDemand[1] ?? null,
      inStockCount: inStock.length,
      verifiedOnDemandCount: onDemand.length,
    };
  });
}

export function cheaperAlternatives(
  offer: PriceOffer,
  pool: PriceOffer[],
): PriceOffer[] {
  const usd = usdEquivalent(offer);
  if (usd === null) {
    return [];
  }
  return pricedOnDemand(pool)
    .filter((row) => row.gpu === offer.gpu)
    .filter((row) => row.variant === offer.variant)
    .filter((row) => row.providerSlug !== offer.providerSlug)
    .filter((row) => (usdEquivalent(row) ?? Infinity) < usd)
    .slice(0, 5);
}

export function formatOfferLabel(offer: PriceOffer): string {
  const usd = usdEquivalent(offer);
  const eur = eurDisplay(offer);
  const price =
    usd !== null
      ? `$${usd.toFixed(2)}/GPU-hr`
      : eur
        ? `€${eur.amount.toFixed(2)}/GPU-hr ${eur.kind}`
        : "not published";
  return `${offer.provider} ${offer.gpu} ${offer.variant} · ${price}`;
}
