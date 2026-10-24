import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { PriceExplorer } from "@/components/price-explorer";
import { StubNotice } from "@/components/stub-notice";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/json-ld";
import { offersForProvider } from "@/lib/prices";
import type { DynamicPageProps } from "@/lib/page-props";
import { pageMetadata } from "@/lib/seo";
import { PROVIDER_SLUGS } from "@/lib/site";

const COPY: Record<string, { title: string; description: string }> = {
  runpod: {
    title: "RunPod GPU pricing",
    description: "RunPod pricing and RunPod alternatives context via dated official list prices.",
  },
  "vast-ai": {
    title: "Vast.ai GPU pricing",
    description:
      "Vast.ai pricing is a live marketplace. Rows stay TBD until an official list or reviewed API read is recorded.",
  },
  lambda: {
    title: "Lambda GPU cloud pricing",
    description: "Lambda Labs / Lambda Cloud published instance and cluster list prices.",
  },
  coreweave: {
    title: "CoreWeave GPU pricing",
    description: "CoreWeave published node list prices, shown per GPU-hour.",
  },
  nebius: {
    title: "Nebius GPU pricing",
    description: "Nebius AI Cloud on-demand GPU-hour list prices.",
  },
  digitalocean: {
    title: "DigitalOcean GPU pricing",
    description: "DigitalOcean GPU Droplets and additional GPU (Paperspace) list prices.",
  },
  ovhcloud: {
    title: "OVHcloud GPU pricing",
    description: "OVHcloud Public Cloud GPU instance prices, France, excl. VAT.",
  },
  scaleway: {
    title: "Scaleway GPU pricing",
    description: "Scaleway GPU instances in EUR, EU regions.",
  },
  crusoe: {
    title: "Crusoe GPU pricing",
    description: "Crusoe Cloud GPU pricing page is recorded; numbers stay TBD until a clear list price is read.",
  },
  verda: {
    title: "Verda GPU pricing",
    description: "Verda (ex-DataCrunch) official price URL still needs confirmation.",
  },
  hyperstack: {
    title: "Hyperstack GPU pricing",
    description: "Hyperstack on-demand, reserved and spot list prices.",
  },
};

export function generateStaticParams() {
  return PROVIDER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  const copy = COPY[slug];
  if (!copy) {
    return {};
  }
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/provider/${slug}`,
  });
}

export default async function ProviderPage({
  params,
  searchParams,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  const query = await searchParams;
  if (!PROVIDER_SLUGS.includes(slug as (typeof PROVIDER_SLUGS)[number])) {
    notFound();
  }
  const copy = COPY[slug];
  const offers = offersForProvider(slug);
  const name = offers[0]?.provider ?? slug;

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: copy.title, path: `/provider/${slug}` },
        ])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `${name} GPU-hour list prices`,
          description: copy.description,
          path: `/provider/${slug}`,
          offers,
        })}
      />
      <PageHeader eyebrow="Provider" title={copy.title}>
        <p>{copy.description}</p>
      </PageHeader>
      <StubNotice page={`/provider/${slug}`} />
      <PriceExplorer
        offers={offers}
        searchParams={query}
        pathname={`/provider/${slug}`}
        caption={`${name} offers.`}
      />
    </div>
  );
}
