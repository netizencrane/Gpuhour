import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { StubNotice } from "@/components/stub-notice";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/json-ld";
import { getOffers } from "@/lib/prices";
import type { StaticPageProps } from "@/lib/page-props";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cheapest cloud GPU rental right now",
  description:
    "Cheapest cloud GPU and cheap GPU rental list prices, in-stock aware when providers report stock. Sourced per GPU-hour.",
  path: "/cheapest",
});

export default function CheapestPage({
  searchParams,
}: StaticPageProps) {
  const offers = getOffers();

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cheapest", path: "/cheapest" },
        ])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: "Cheapest cloud GPU list prices",
          description: "On-demand GPU-hour list prices sorted cheapest first.",
          path: "/cheapest",
          offers,
        })}
      />
      <PageHeader
        eyebrow="Cheapest cloud GPU"
        title="Cheapest cloud GPU rental right now"
      >
        <p>
          Cheap cloud GPU and GPU rental price rows from official list prices.
          Default sort is cheapest on-demand first. Stock is shown when the
          provider reports it; most seed rows are &quot;not reported&quot;.
        </p>
      </PageHeader>
      <StubNotice page="/cheapest" />
      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname="/cheapest"
        caption="Cheapest cloud GPU table."
        presetFilters={{ pricingType: "on-demand" }}
      />
    </div>
  );
}
