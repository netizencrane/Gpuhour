import { usdEquivalent } from "@/lib/prices";
import type { PriceOffer } from "@/lib/schema";
import type { SortKey } from "@/lib/columns";

export type CurrencyCode = "USD" | "EUR";

export type OfferFilters = {
  gpu?: string;
  gpuClass?: string;
  providerType?: string;
  pricingType?: string;
  eu?: boolean;
  nativeEur?: boolean;
  inStock?: boolean;
  minVram?: number;
  minGpus?: number;
  country?: string;
  q?: string;
};

export type SortState = {
  key: SortKey;
  dir: "asc" | "desc";
};

export const DEFAULT_SORT: SortState = { key: "price", dir: "asc" };

function param(
  searchParams: Record<string, string | string[] | undefined>,
  name: string,
): string | undefined {
  const value = searchParams[name];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value || undefined;
}

export function filtersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): OfferFilters {
  const minVram = param(searchParams, "minVram");
  const minGpus = param(searchParams, "minGpus");
  return {
    gpu: param(searchParams, "gpu"),
    gpuClass: param(searchParams, "gpuClass"),
    providerType: param(searchParams, "providerType"),
    pricingType: param(searchParams, "pricingType"),
    eu: param(searchParams, "eu") === "1",
    nativeEur: param(searchParams, "nativeEur") === "1",
    inStock: param(searchParams, "inStock") === "1",
    minVram: minVram ? Number(minVram) : undefined,
    minGpus: minGpus ? Number(minGpus) : undefined,
    country: param(searchParams, "country"),
    q: param(searchParams, "q"),
  };
}

export function sortFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): SortState {
  const key = param(searchParams, "sort") as SortKey | undefined;
  const dir = param(searchParams, "dir") === "desc" ? "desc" : "asc";
  const allowed: SortKey[] = [
    "gpu",
    "provider",
    "gpus",
    "pricingType",
    "region",
    "price",
    "billing",
    "stock",
    "source",
    "checked",
    "linkType",
  ];
  if (!key || !allowed.includes(key)) {
    return DEFAULT_SORT;
  }
  return { key, dir };
}

export function currencyFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): CurrencyCode {
  return param(searchParams, "currency") === "EUR" ? "EUR" : "USD";
}

export function filterOffers(
  offers: PriceOffer[],
  filters: OfferFilters,
): PriceOffer[] {
  return offers.filter((offer) => {
    if (filters.gpu && offer.gpu !== filters.gpu) {
      return false;
    }
    if (filters.gpuClass && offer.gpuClass !== filters.gpuClass) {
      return false;
    }
    if (filters.providerType && offer.providerType !== filters.providerType) {
      return false;
    }
    if (filters.pricingType && offer.pricingType !== filters.pricingType) {
      return false;
    }
    if (filters.eu && offer.eu !== true) {
      return false;
    }
    if (filters.nativeEur && offer.nativeEurPerGpuHour === null) {
      return false;
    }
    if (filters.inStock && offer.stock !== "in-stock") {
      return false;
    }
    if (filters.minVram && (offer.vramGb === null || offer.vramGb < filters.minVram)) {
      return false;
    }
    if (
      filters.minGpus &&
      (offer.gpusPerInstance === null || offer.gpusPerInstance < filters.minGpus)
    ) {
      return false;
    }
    if (filters.country && offer.regionCountryCode !== filters.country) {
      return false;
    }
    if (filters.q) {
      const haystack = `${offer.provider} ${offer.gpu} ${offer.variant}`.toLowerCase();
      if (!haystack.includes(filters.q.toLowerCase())) {
        return false;
      }
    }
    return true;
  });
}

function defaultRank(offer: PriceOffer): number {
  const priced = usdEquivalent(offer) !== null;
  const onDemand = offer.pricingType === "on-demand";
  const inStock = offer.stock === "in-stock";
  const unknownStock = offer.stock === "not-reported";
  if (priced && onDemand && inStock) {
    return 0;
  }
  if (priced && onDemand && unknownStock) {
    return 1;
  }
  if (priced) {
    return 2;
  }
  return 3;
}

function compareNullableNumber(
  a: number | null,
  b: number | null,
  dir: "asc" | "desc",
): number {
  if (a === null && b === null) {
    return 0;
  }
  if (a === null) {
    return 1;
  }
  if (b === null) {
    return -1;
  }
  return dir === "asc" ? a - b : b - a;
}

function compareString(a: string, b: string, dir: "asc" | "desc"): number {
  const result = a.localeCompare(b);
  return dir === "asc" ? result : -result;
}

export function sortOffers(
  offers: PriceOffer[],
  sort: SortState,
): PriceOffer[] {
  const copy = [...offers];
  copy.sort((a, b) => {
    if (sort.key === "price" && sort.dir === "asc") {
      const rank = defaultRank(a) - defaultRank(b);
      if (rank !== 0) {
        return rank;
      }
    }

    switch (sort.key) {
      case "gpu":
        return compareString(`${a.gpu} ${a.variant}`, `${b.gpu} ${b.variant}`, sort.dir);
      case "provider":
        return compareString(a.provider, b.provider, sort.dir);
      case "gpus":
        return compareNullableNumber(a.gpusPerInstance, b.gpusPerInstance, sort.dir);
      case "pricingType":
        return compareString(
          `${a.pricingType} ${a.reservedTerm ?? ""}`,
          `${b.pricingType} ${b.reservedTerm ?? ""}`,
          sort.dir,
        );
      case "region":
        return compareString(
          a.regionCountry ?? "not stated",
          b.regionCountry ?? "not stated",
          sort.dir,
        );
      case "price":
        return compareNullableNumber(usdEquivalent(a), usdEquivalent(b), sort.dir);
      case "billing":
        return compareString(a.billingIncrement, b.billingIncrement, sort.dir);
      case "stock":
        return compareString(a.stock, b.stock, sort.dir);
      case "source":
        return compareString(a.method, b.method, sort.dir);
      case "checked":
        return compareString(a.checkedAtUtc, b.checkedAtUtc, sort.dir);
      case "linkType":
        return compareString(a.linkType, b.linkType, sort.dir);
      default:
        return 0;
    }
  });
  return copy;
}

export function buildQuery(
  current: Record<string, string | string[] | undefined>,
  patch: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(current)) {
    const resolved = Array.isArray(value) ? value[0] : value;
    if (resolved) {
      params.set(key, resolved);
    }
  }
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}
