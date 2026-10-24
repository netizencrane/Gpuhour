import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparePriceMetrics } from "@/components/compare-price-metrics";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { RelatedLinks } from "@/components/related-links";
import { SpecTable } from "@/components/spec-table";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { COMPARE_COPY } from "@/content/compares";
import { getGpuSpec } from "@/lib/gpu-specs";
import { breadcrumbJsonLd, datasetJsonLd, faqPageJsonLd } from "@/lib/json-ld";
import { pricedOnDemand } from "@/lib/offer-stats";
import { gpuPath } from "@/lib/page-links";
import type { DynamicPageProps } from "@/lib/page-props";
import { getOffers, usdEquivalent } from "@/lib/prices";
import { pageMetadata } from "@/lib/seo";
import { COMPARE_SLUGS } from "@/lib/site";

export function generateStaticParams() {
  return COMPARE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  const copy = COMPARE_COPY[slug as (typeof COMPARE_SLUGS)[number]];
  if (!copy) {
    return {};
  }
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/compare/${slug}`,
  });
}

function a100StillCheaper(h100: ReturnType<typeof getOffers>, a100: ReturnType<typeof getOffers>) {
  const h100Sxm = pricedOnDemand(h100.filter((offer) => offer.variant === "SXM" && offer.vramGb === 80));
  const a100Sxm80 = pricedOnDemand(
    a100.filter((offer) => offer.variant === "SXM" && offer.vramGb === 80),
  );
  const h = h100Sxm[0];
  const a = a100Sxm80[0];
  if (!h || !a) {
    return null;
  }
  const hUsd = usdEquivalent(h);
  const aUsd = usdEquivalent(a);
  if (hUsd === null || aUsd === null) {
    return null;
  }
  return { h, a, hUsd, aUsd, cheaper: aUsd < hUsd };
}

async function ComparePageBody({
  params,
  searchParams,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  const copy = COMPARE_COPY[slug as (typeof COMPARE_SLUGS)[number]];
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

  const gpuPair = copy.gpus && copy.gpus.length === 2 ? copy.gpus : null;
  const a100Note =
    slug === "h100-vs-a100" && gpuPair
      ? a100StillCheaper(
          offers.filter((offer) => offer.gpu === "H100"),
          offers.filter((offer) => offer.gpu === "A100"),
        )
      : null;

  return (
    <div className="space-y-10">
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
      <JsonLd
        data={faqPageJsonLd(
          copy.faqs.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        )}
      />

      <PageHeader eyebrow="Compare" title={copy.h1}>
        {copy.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageHeader>

      {gpuPair ? (
        <>
          <ComparePriceMetrics
            leftGpu={gpuPair[0]}
            rightGpu={gpuPair[1]}
            leftOffers={offers.filter((offer) => offer.gpu === gpuPair[0])}
            rightOffers={offers.filter((offer) => offer.gpu === gpuPair[1])}
            formula="USD per GPU-hour ÷ NVIDIA-published HBM (or GDDR) GB. Cheapest and median use verified on-demand rows only."
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <SpecTable spec={getGpuSpec(gpuPair[0])} />
            <SpecTable spec={getGpuSpec(gpuPair[1])} />
          </div>
        </>
      ) : null}

      {a100Note ? (
        <aside className="note space-y-2">
          <h2 className="text-lg font-semibold tracking-tight">
            When the A100 is still the better buy
          </h2>
          <p>
            Like-for-like test: cheapest verified on-demand H100 SXM 80 GB (
            {a100Note.h.provider}, ${a100Note.hUsd.toFixed(2)}/GPU-hr) versus
            cheapest verified on-demand A100 SXM 80 GB ({a100Note.a.provider}, $
            {a100Note.aUsd.toFixed(2)}/GPU-hr).{" "}
            {a100Note.cheaper
              ? "On that test the A100 list price is lower."
              : "On that test the H100 list price is lower or equal."}{" "}
            40 GB A100 rows are excluded from this sentence. Checked{" "}
            {a100Note.a.checkedAtUtc} / {a100Note.h.checkedAtUtc} UTC.
          </p>
        </aside>
      ) : slug === "h100-vs-a100" ? (
        <aside className="note">
          The SXM 80 GB like-for-like test needs a verified on-demand price on
          both sides. At least one side is not published, so we do not invent a
          winner.
        </aside>
      ) : null}

      <section className="prose-page space-y-3">
        <h2>{copy.differencesTitle}</h2>
        {copy.differences.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          Affiliate disclosure sits above the table. Sort order is price, not
          commission. <Link href="/methodology">Methodology</Link>.
        </p>
      </section>

      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname={`/compare/${slug}`}
        caption={`${copy.title} rows.`}
      />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
        <FaqList items={copy.faqs} />
      </section>

      <RelatedLinks
        title="Related pages"
        links={[
          ...(copy.gpus ?? []).map((gpu) => ({
            href: gpuPath(gpu),
            label: `${gpu} rental`,
          })),
          ...(copy.providers ?? []).map((provider) => ({
            href: `/provider/${provider}`,
            label: provider,
          })),
          { href: "/cheapest", label: "Cheapest cloud GPU" },
          { href: "/", label: "Full comparison table" },
        ]}
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
