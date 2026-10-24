import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { ComparisonFilters } from "@/components/comparison-filters";
import { ComparisonTable } from "@/components/comparison-table";
import { VatNote } from "@/components/vat-note";
import {
  currencyFromSearchParams,
  filterOffers,
  filtersFromSearchParams,
  sortFromSearchParams,
  sortOffers,
  type OfferFilters,
} from "@/lib/filters";
import { formatMoney } from "@/lib/format";
import { latestCheckedAt, medianOnDemandUsd } from "@/lib/prices";
import type { GpuModel, PriceOffer } from "@/lib/schema";
import { GPU_MODELS } from "@/lib/site";

export function PriceExplorer({
  offers,
  searchParams,
  pathname,
  caption,
  presetFilters,
  defaultCurrency = "USD",
}: {
  offers: PriceOffer[];
  searchParams: Record<string, string | string[] | undefined>;
  pathname: string;
  caption: string;
  presetFilters?: OfferFilters;
  defaultCurrency?: "USD" | "EUR";
}) {
  const filters = { ...filtersFromSearchParams(searchParams), ...presetFilters };
  const sort = sortFromSearchParams(searchParams);
  const currency =
    searchParams.currency === undefined
      ? defaultCurrency
      : currencyFromSearchParams(searchParams);
  const visible = sortOffers(filterOffers(offers, filters), sort);
  const updated = latestCheckedAt();

  return (
    <section className="space-y-5">
      <AffiliateDisclosure />
      <VatNote />
      <p className="text-sm text-ink-600">
        Last updated {updated} UTC. Median on-demand list price
        {GPU_MODELS.map((gpu) => {
          const median = medianOnDemandUsd(gpu as GpuModel);
          return median === null
            ? null
            : ` · ${gpu} ${formatMoney(median, "USD")}`;
        }).filter(Boolean)}
        .
      </p>
      <ComparisonFilters
        pathname={pathname}
        searchParams={searchParams}
        filters={filters}
        currency={currency}
      />
      <ComparisonTable
        offers={visible}
        caption={`${caption} ${visible.length} rows shown.`}
        pathname={pathname}
        searchParams={searchParams}
        sort={sort}
        currency={currency}
      />
    </section>
  );
}
