import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { RelatedLinks } from "@/components/related-links";
import { SpecTable } from "@/components/spec-table";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { VariantStats } from "@/components/variant-stats";
import { GPU_COPY } from "@/content/gpus";
import { getGpuSpec } from "@/lib/gpu-specs";
import {
  breadcrumbJsonLd,
  datasetJsonLd,
  faqPageJsonLd,
  productOfferJsonLd,
} from "@/lib/json-ld";
import { uniqueProviders, variantStats } from "@/lib/offer-stats";
import { GPU_COMPARE_LINKS } from "@/lib/page-links";
import type { DynamicPageProps } from "@/lib/page-props";
import { offersForGpu } from "@/lib/prices";
import { pageMetadata } from "@/lib/seo";
import { GPU_SLUGS, PROVIDER_SLUGS, type GpuSlug } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(GPU_SLUGS).map((model) => ({ model }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps<"model">) {
  const { model } = await params;
  const copy = GPU_COPY[model as GpuSlug];
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
  const copy = GPU_COPY[model as GpuSlug];
  if (!gpu || !copy) {
    notFound();
  }

  const offers = offersForGpu(gpu);
  const spec = getGpuSpec(gpu);
  const stats = variantStats(offers);
  const products = offers
    .map((offer) => productOfferJsonLd(offer))
    .filter(Boolean);
  const providerLinks = uniqueProviders(offers)
    .filter((slug) =>
      PROVIDER_SLUGS.includes(slug as (typeof PROVIDER_SLUGS)[number]),
    )
    .map((slug) => ({
      href: `/provider/${slug}`,
      label: offers.find((offer) => offer.providerSlug === slug)?.provider ?? slug,
    }));

  return (
    <div className="space-y-10">
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
      <JsonLd
        data={faqPageJsonLd(
          copy.faqs.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        )}
      />

      <PageHeader eyebrow={gpu} title={copy.h1}>
        {copy.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageHeader>

      <VariantStats stats={stats} />

      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname={`/gpu/${model}`}
        caption={`${gpu} comparison.`}
      />

      <SpecTable spec={spec} />

      <section className="prose-page space-y-3">
        <h2>{copy.priceDriversTitle}</h2>
        {copy.priceDrivers.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          Monthly cost uses 730 hours. Methodology:{" "}
          <Link href="/methodology">how prices are collected</Link>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
        <FaqList items={copy.faqs} />
      </section>

      <RelatedLinks title="Provider pages for these rows" links={providerLinks} />
      <RelatedLinks
        title="Compare"
        links={[
          ...GPU_COMPARE_LINKS[gpu],
          { href: "/cheapest", label: "Cheapest cloud GPU" },
          { href: "/eu", label: "EU / EUR GPU cloud" },
        ]}
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
