import pricesJson from "@/data/prices.json";
import { fxRate, eurToUsd, usdToEur } from "@/lib/fx";
import {
  priceDatasetSchema,
  type PriceOffer,
  type GpuModel,
} from "@/lib/schema";
import { HOURS_PER_MONTH, STALE_AFTER_MS } from "@/lib/site";

export const priceDataset = priceDatasetSchema.parse(pricesJson);

export function getOffers(): PriceOffer[] {
  return priceDataset.offers;
}

export function getOfferById(id: string): PriceOffer | undefined {
  return priceDataset.offers.find((offer) => offer.id === id);
}

export function offersForGpu(gpu: GpuModel): PriceOffer[] {
  return priceDataset.offers.filter((offer) => offer.gpu === gpu);
}

export function offersForProvider(slug: string): PriceOffer[] {
  return priceDataset.offers.filter((offer) => offer.providerSlug === slug);
}

export function usdEquivalent(offer: PriceOffer): number | null {
  if (offer.usdPerGpuHour !== null) {
    return offer.usdPerGpuHour;
  }
  if (offer.nativeEurPerGpuHour !== null) {
    return eurToUsd(offer.nativeEurPerGpuHour);
  }
  return null;
}

export function eurDisplay(offer: PriceOffer): {
  amount: number;
  kind: "native" | "converted";
} | null {
  if (offer.nativeEurPerGpuHour !== null) {
    return { amount: offer.nativeEurPerGpuHour, kind: "native" };
  }
  if (offer.usdPerGpuHour !== null) {
    return { amount: usdToEur(offer.usdPerGpuHour), kind: "converted" };
  }
  return null;
}

export function monthlyUsd(offer: PriceOffer): number | null {
  const usd = usdEquivalent(offer);
  return usd === null ? null : usd * HOURS_PER_MONTH;
}

export function isStale(
  offer: PriceOffer,
  nowMs: number = Date.now(),
): boolean {
  const checked = Date.parse(offer.checkedAtUtc);
  if (Number.isNaN(checked)) {
    return true;
  }
  return nowMs - checked > STALE_AFTER_MS;
}

export function latestCheckedAt(): string {
  return priceDataset.offers.reduce((latest, offer) => {
    return offer.checkedAtUtc > latest ? offer.checkedAtUtc : latest;
  }, priceDataset.checkedAtUtc);
}

export function medianOnDemandUsd(gpu?: GpuModel): number | null {
  const values = priceDataset.offers
    .filter((offer) => (gpu ? offer.gpu === gpu : true))
    .filter((offer) => offer.pricingType === "on-demand")
    .filter((offer) => offer.verificationStatus === "verified")
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

export { fxRate };
