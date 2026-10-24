import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { ProsCons } from "@/components/pros-cons";
import { ProviderCta } from "@/components/provider-cta";
import { RelatedLinks } from "@/components/related-links";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { PROVIDER_COPY } from "@/content/providers";
import { formatMaybeMoney } from "@/lib/format";
import { cheaperAlternatives, uniqueProviders } from "@/lib/offer-stats";
import {
  breadcrumbJsonLd,
  datasetJsonLd,
  faqPageJsonLd,
} from "@/lib/json-ld";
import { gpuPath, PROVIDER_COMPARE_LINKS } from "@/lib/page-links";
import type { DynamicPageProps } from "@/lib/page-props";
import { getOffers, offersForProvider, usdEquivalent } from "@/lib/prices";
import { pageMetadata } from "@/lib/seo";
import { PROVIDER_SLUGS } from "@/lib/site";

const FALLBACK: Record<string, { title: string; description: string }> = {
  ovhcloud: {
    title: "OVHcloud GPU pricing",
    description:
      "OVHcloud Public Cloud GPU instance prices recorded for Gravelines, France, excl. VAT.",
  },
  scaleway: {
    title: "Scaleway GPU pricing",
    description: "Scaleway GPU instances in EUR, EU regions, as published.",
  },
  crusoe: {
    title: "Crusoe GPU pricing",
    description:
      "Crusoe Cloud pricing URL is recorded. Numeric GPU-hours stay not published until a clear list price is read.",
  },
  verda: {
    title: "Verda GPU pricing",
    description: "Verda official GPU price URL still needs confirmation. Rows stay not published.",
  },
  hyperstack: {
    title: "Hyperstack GPU pricing",
    description: "Hyperstack on-demand, reserved and spot list prices from the official GPU pricing page.",
  },
};

export function generateStaticParams() {
  return PROVIDER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  const copy = PROVIDER_COPY[slug] ?? FALLBACK[slug];
  if (!copy) {
    return {};
  }
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/provider/${slug}`,
  });
}

async function ProviderPageBody({
  params,
  searchParams,
}: DynamicPageProps<"slug">) {
  const { slug } = await params;
  if (!PROVIDER_SLUGS.includes(slug as (typeof PROVIDER_SLUGS)[number])) {
    notFound();
  }
  const offers = offersForProvider(slug);
  const name = offers[0]?.provider ?? slug;
  const copy = PROVIDER_COPY[slug];
  const fallback = FALLBACK[slug];
  const title = copy?.title ?? fallback?.title ?? `${name} GPU pricing`;
  const description =
    copy?.description ?? fallback?.description ?? `${name} official GPU list prices.`;
  const gpuLinks = [...new Set(offers.map((offer) => offer.gpu))].map((gpu) => ({
    href: gpuPath(gpu),
    label: `${gpu} rental`,
  }));
  const alternatives =
    slug === "runpod"
      ? offers.flatMap((offer) => cheaperAlternatives(offer, getOffers())).filter(
          (offer, index, list) => list.findIndex((row) => row.id === offer.id) === index,
        )
      : [];

  return (
    <div className="space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path: `/provider/${slug}` },
        ])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `${name} GPU-hour list prices`,
          description,
          path: `/provider/${slug}`,
          offers,
        })}
      />
      {copy ? (
        <JsonLd
          data={faqPageJsonLd(
            copy.faqs.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          )}
        />
      ) : null}

      <PageHeader eyebrow="Provider" title={copy?.h1 ?? title}>
        {copy
          ? copy.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          : (
              <p>
                {description} Every row is from the official URL stored on the
                offer. Unpublished numbers stay not published.
              </p>
            )}
      </PageHeader>

      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname={`/provider/${slug}`}
        caption={`${name} offers.`}
      />

      {copy ? (
        <>
          <section className="prose-page space-y-3">
            <h2>Regions</h2>
            {copy.regions.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section className="prose-page space-y-3">
            <h2>Billing model</h2>
            {copy.billing.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <ProsCons pros={copy.pros} cons={copy.cons} />
          {alternatives.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">
                RunPod alternatives (cheaper sourced hours)
              </h2>
              <p className="max-w-3xl text-ink-700">
                These are verified on-demand hours in this dataset that undercut
                a RunPod row for the same GPU and variant. Commission is not
                used.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {alternatives.slice(0, 8).map((offer) => (
                  <li key={offer.id}>
                    <Link href={gpuPath(offer.gpu)}>{offer.gpu}</Link>
                    {` ${offer.variant} on `}
                    {uniqueProviders([offer])[0] === "hetzner" ? (
                      offer.provider
                    ) : (
                      <Link href={`/provider/${offer.providerSlug}`}>
                        {offer.provider}
                      </Link>
                    )}
                    {` — ${formatMaybeMoney(usdEquivalent(offer), "USD")}/GPU-hr`}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <ProviderCta providerSlug={slug} name={name}>
            {copy.cta}
          </ProviderCta>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
            <FaqList items={copy.faqs} />
          </section>
        </>
      ) : (
        <ProviderCta providerSlug={slug} name={name}>
          Official {name} pricing, via /out/{slug}.
        </ProviderCta>
      )}

      <RelatedLinks title="GPU pages" links={gpuLinks} />
      <RelatedLinks
        title="Compare"
        links={[
          ...(PROVIDER_COMPARE_LINKS[slug] ?? []),
          { href: "/cheapest", label: "Cheapest cloud GPU" },
          { href: "/eu", label: "EU / EUR" },
        ]}
      />
    </div>
  );
}

export default function ProviderPage(props: DynamicPageProps<"slug">) {
  return (
    <Suspense fallback={<p className="text-sm text-ink-500">Loading provider page…</p>}>
      <ProviderPageBody {...props} />
    </Suspense>
  );
}
