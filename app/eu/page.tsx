import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { PriceExplorer } from "@/components/price-explorer";
import { StubNotice } from "@/components/stub-notice";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/json-ld";
import { getOffers } from "@/lib/prices";
import type { StaticPageProps } from "@/lib/page-props";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "EU GPU cloud: EUR prices, EU regions, VAT",
  description:
    "EU GPU cloud comparison with EUR prices, EU-region filters and VAT notes. Targets Hetzner-style and OVH / Scaleway / prix H100 queries.",
  path: "/eu",
});

export default async function EuPage({ searchParams }: StaticPageProps) {
  const params = await searchParams;
  const offers = getOffers();

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "EU GPU cloud", path: "/eu" },
        ])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: "EU GPU cloud list prices",
          description: "Offers with a stated EU/EEA region.",
          path: "/eu",
          offers: offers.filter((offer) => offer.eu === true),
        })}
      />
      <PageHeader eyebrow="EU GPU cloud" title="EUR prices, EU regions, VAT notes">
        <p>
          GPU server mieten, serveur GPU, prix H100, OVH GPU, Scaleway GPU and
          related European queries belong here. The filter keeps only offers
          whose provider stated an EU or EEA region. Converted EUR uses the ECB
          reference rate; Scaleway rows can be native EUR.
        </p>
      </PageHeader>
      <StubNotice page="/eu" />
      <PriceExplorer
        offers={offers}
        searchParams={{ ...params, currency: params.currency ?? "EUR" }}
        pathname="/eu"
        caption="EU / EEA GPU cloud table."
        presetFilters={{ eu: true }}
      />
    </div>
  );
}
