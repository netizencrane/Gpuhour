import { Suspense } from "react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { StubNotice } from "@/components/stub-notice";
import {
  breadcrumbJsonLd,
  datasetJsonLd,
  productOfferJsonLd,
} from "@/lib/json-ld";
import { offersForGpu } from "@/lib/prices";
import type { DynamicPageProps } from "@/lib/page-props";
import { pageMetadata } from "@/lib/seo";
import { GPU_SLUGS, type GpuSlug } from "@/lib/site";

const COPY: Record<GpuSlug, { title: string; description: string; h1: string }> = {
  h100: {
    title: "H100 rental price per GPU-hour",
    description:
      "NVIDIA H100 price and H100 rental price per GPU-hour, split by SXM, PCIe and NVL. Official list prices only.",
    h1: "H100 rental price per GPU-hour",
  },
  h200: {
    title: "H200 rental price per GPU-hour",
    description:
      "H200 price and H200 rental per GPU-hour from official cloud list prices.",
    h1: "H200 rental price per GPU-hour",
  },
  b200: {
    title: "B200 rental price per GPU-hour",
    description:
      "NVIDIA B200 price and B200 rental per GPU-hour from official cloud list prices.",
    h1: "B200 rental price per GPU-hour",
  },
  a100: {
    title: "A100 rental price per GPU-hour",
    description:
      "NVIDIA A100 price and A100 GPU price per hour, 40 GB / 80 GB, SXM / PCIe.",
    h1: "A100 rental price per GPU-hour",
  },
  "rtx-pro-6000": {
    title: "RTX PRO 6000 rental price",
    description: "RTX PRO 6000 rental price per GPU-hour from official list prices.",
    h1: "RTX PRO 6000 rental price",
  },
};

export function generateStaticParams() {
  return Object.keys(GPU_SLUGS).map((model) => ({ model }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps<"model">) {
  const { model } = await params;
  const copy = COPY[model as GpuSlug];
  if (!copy) {
    return {};
  }
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/gpu/${model}`,
  });
}

async function GpuPageBody({
  params,
  searchParams,
}: DynamicPageProps<"model">) {
  const { model } = await params;
  const gpu = GPU_SLUGS[model as GpuSlug];
  const copy = COPY[model as GpuSlug];
  if (!gpu || !copy) {
    notFound();
  }

  const offers = offersForGpu(gpu);
  const products = offers
    .map((offer) => productOfferJsonLd(offer))
    .filter(Boolean);

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: copy.h1, path: `/gpu/${model}` },
        ])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `${gpu} GPU-hour list prices`,
          description: copy.description,
          path: `/gpu/${model}`,
          offers,
        })}
      />
      {products.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <PageHeader eyebrow={gpu} title={copy.h1}>
        <p>{copy.description}</p>
      </PageHeader>
      <StubNotice page={`/gpu/${model}`} />
      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname={`/gpu/${model}`}
        caption={`${gpu} comparison.`}
      />
    </div>
  );
}

export default function GpuPage(props: DynamicPageProps<"model">) {
  return (
    <Suspense fallback={<p className="text-sm text-ink-500">Loading GPU page…</p>}>
      <GpuPageBody {...props} />
    </Suspense>
  );
}
