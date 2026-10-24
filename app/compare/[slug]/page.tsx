import { Suspense } from "react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { StubNotice } from "@/components/stub-notice";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/json-ld";
import { getOffers } from "@/lib/prices";
import type { DynamicPageProps } from "@/lib/page-props";
import { pageMetadata } from "@/lib/seo";
import { COMPARE_SLUGS } from "@/lib/site";
import type { GpuModel } from "@/lib/schema";

const COPY: Record<
  (typeof COMPARE_SLUGS)[number],
  {
    title: string;
    description: string;
    providers?: string[];
    gpus?: GpuModel[];
  }
> = {
  "runpod-vs-vast-ai": {
    title: "RunPod vs Vast.ai",
    description: "RunPod vs Vast.ai GPU rental list prices on one table.",
    providers: ["runpod", "vast-ai"],
  },
  "runpod-vs-lambda": {
    title: "RunPod vs Lambda",
    description: "RunPod vs Lambda cloud GPU list prices.",
    providers: ["runpod", "lambda"],
  },
  "h100-vs-h200": {
    title: "H100 vs H200 rental price",
    description: "H100 vs H200 rental prices and the sourced list-price rows behind them.",
    gpus: ["H100", "H200"],
  },
  "h100-vs-a100": {
    title: "H100 vs A100 rental price",
    description: "H100 vs A100 rental prices from official list pages.",
    gpus: ["H100", "A100"],
  },
  "b200-vs-h100": {
    title: "B200 vs H100 rental price",
    description: "B200 vs H100 rental prices from official list pages.",
    gpus: ["B200", "H100"],
  },
};

export function generateStaticParams() {
  return COMPARE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  const copy = COPY[slug as (typeof COMPARE_SLUGS)[number]];
  if (!copy) {
    return {};
  }
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/compare/${slug}`,
  });
}

async function ComparePageBody({
  params,
  searchParams,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  const copy = COPY[slug as (typeof COMPARE_SLUGS)[number]];
  if (!copy) {
    notFound();
  }

  const offers = getOffers().filter((offer) => {
    if (copy.providers) {
      return copy.providers.includes(offer.providerSlug);
    }
    if (copy.gpus) {
      return copy.gpus.includes(offer.gpu);
    }
    return false;
  });

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: copy.title, path: `/compare/${slug}` },
        ])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: copy.title,
          description: copy.description,
          path: `/compare/${slug}`,
          offers,
        })}
      />
      <PageHeader eyebrow="Compare" title={copy.title}>
        <p>{copy.description}</p>
      </PageHeader>
      <StubNotice page={`/compare/${slug}`} />
      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname={`/compare/${slug}`}
        caption={`${copy.title} rows.`}
      />
    </div>
  );
}

export default function ComparePage(props: DynamicPageProps<"slug">) {
  return (
    <Suspense fallback={<p className="text-sm text-ink-500">Loading comparison…</p>}>
      <ComparePageBody {...props} />
    </Suspense>
  );
}
