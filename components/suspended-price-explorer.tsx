import { Suspense } from "react";
import { PriceExplorer } from "@/components/price-explorer";
import type { OfferFilters } from "@/lib/filters";
import type { SearchParams } from "@/lib/page-props";
import type { PriceOffer } from "@/lib/schema";

async function PriceExplorerFromParams({
  searchParams,
  offers,
  pathname,
  caption,
  presetFilters,
  defaultCurrency,
}: {
  searchParams: SearchParams;
  offers: PriceOffer[];
  pathname: string;
  caption: string;
  presetFilters?: OfferFilters;
  defaultCurrency?: "USD" | "EUR";
}) {
  const params = await searchParams;
  return (
    <PriceExplorer
      offers={offers}
      searchParams={params}
      pathname={pathname}
      caption={caption}
      presetFilters={presetFilters}
      defaultCurrency={defaultCurrency}
    />
  );
}

export function SuspendedPriceExplorer(
  props: {
    searchParams: SearchParams;
    offers: PriceOffer[];
    pathname: string;
    caption: string;
    presetFilters?: OfferFilters;
    defaultCurrency?: "USD" | "EUR";
  },
) {
  return (
    <Suspense fallback={<p className="text-sm text-ink-500">Loading comparison table…</p>}>
      <PriceExplorerFromParams {...props} />
    </Suspense>
  );
}
