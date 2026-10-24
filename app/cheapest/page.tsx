import Link from "next/link";
import { CheapestGrid } from "@/components/cheapest-grid";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { RelatedLinks } from "@/components/related-links";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { breadcrumbJsonLd, datasetJsonLd, faqPageJsonLd } from "@/lib/json-ld";
import { cheapestPerGpu } from "@/lib/offer-stats";
import type { StaticPageProps } from "@/lib/page-props";
import { getOffers } from "@/lib/prices";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cheapest cloud GPU rental right now",
  description:
    "Cheapest cloud GPU, cheap cloud GPU and cheapest GPU rental list prices. One verified on-demand hour per GPU, with dates. Stock not reported is never treated as in stock.",
  path: "/cheapest",
});

const FAQS = [
  {
    question: "What is the cheapest cloud GPU right now?",
    answer:
      "The cheapest verified on-demand list price per GPU is in the summary table. Every seed row currently has stock not reported, so we do not claim any offer is in stock.",
  },
  {
    question: "Do you include marketplace bids in cheapest GPU rental?",
    answer:
      "Vast.ai is listed separately. It has no verified numeric hour in this dataset, so it cannot win the cheapest-cloud-GPU table.",
  },
];

export default function CheapestPage({ searchParams }: StaticPageProps) {
  const offers = getOffers();
  const marketplace = offers.filter((offer) => offer.providerType === "marketplace");
  const clouds = offers.filter((offer) => offer.providerType !== "marketplace");
  const rows = cheapestPerGpu(clouds);

  return (
    <div className="space-y-10">
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
          offers: clouds,
        })}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <PageHeader
        eyebrow="Cheapest cloud GPU"
        title="Cheapest cloud GPU rental right now"
      >
        <p>
          Cheap cloud GPU and cheapest GPU rental rows are official list prices,
          not scraped marketplace ticks. Cloud GPU rental and rent-GPU-for-AI
          queries belong here when you want a dated GPU rental price, not a
          purchase quote.
        </p>
        <p>
          Ranking is price only. Affiliate approval never changes the order.
          Stock labelled not reported is not treated as in stock — grabgpu-style
          &quot;in stock now&quot; claims need a provider to publish stock, and
          none of the seed rows do.
        </p>
      </PageHeader>

      <CheapestGrid rows={rows} />

      <section className="prose-page space-y-3">
        <h2>Marketplace listings stay separate</h2>
        <p>
          Vast.ai is a host marketplace. The {marketplace.length} Vast.ai rows in
          this file have no verified numeric price. They cannot beat a Lambda or
          RunPod hour on this page because there is no sourced number to sort.
          See <Link href="/provider/vast-ai">Vast.ai pricing</Link> and{" "}
          <Link href="/compare/runpod-vs-vast-ai">RunPod vs Vast.ai</Link>.
        </p>
      </section>

      <SuspendedPriceExplorer
        offers={clouds}
        searchParams={searchParams}
        pathname="/cheapest"
        caption="Fixed-price cloud GPU table. Marketplace rows omitted."
        presetFilters={{ pricingType: "on-demand" }}
      />

      <RelatedLinks
        title="GPU pages"
        links={[
          { href: "/gpu/h100", label: "H100 rental" },
          { href: "/gpu/h200", label: "H200 rental" },
          { href: "/gpu/b200", label: "B200 rental" },
          { href: "/gpu/a100", label: "A100 rental" },
          { href: "/gpu/rtx-pro-6000", label: "RTX PRO 6000 rental" },
          { href: "/eu", label: "EU / EUR" },
        ]}
      />
    </div>
  );
}
