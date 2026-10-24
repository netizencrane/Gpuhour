import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { getAffiliatePrograms } from "@/lib/affiliates";
import { fxRate } from "@/lib/fx";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getOffers } from "@/lib/prices";
import { pageMetadata } from "@/lib/seo";
import { HOURS_PER_MONTH, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Methodology",
  description:
    "How gpuhour.io collects, normalises and ranks GPU-hour list prices from official provider pages and APIs.",
  path: "/methodology",
});

export default function MethodologyPage() {
  const providers = [...new Map(getOffers().map((offer) => [offer.providerSlug, offer])).values()];
  const programs = getAffiliatePrograms();

  return (
    <article className="prose-page space-y-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Methodology", path: "/methodology" },
        ])}
      />
      <PageHeader eyebrow="Trust" title="How we collect GPU-hour prices">
        <p>Last updated 24 October 2026. This page describes the rules implemented in the data layer and table. If the code and this page ever disagree, treat the code as the behaviour and file a correction.</p>
      </PageHeader>

      <h2>Sources</h2>
      <p>
        Prices come only from a provider&apos;s published pricing page or an official
        public pricing API. We do not scrape competitor tables, do not use
        headless browsers, and do not copy Ornn, Silicon Data or other index
        products. A cloud agent or editor re-reads the official page and opens a
        pull request.
      </p>
      <ul>
        {providers.map((offer) => (
          <li key={offer.providerSlug}>
            <a href={offer.sourceUrl}>{offer.provider}</a>
            {" — "}
            {offer.method}, ToS status: {offer.tosStatus}
          </li>
        ))}
      </ul>

      <h2>Normalisation</h2>
      <ul>
        <li>One row is one offer. SXM, PCIe, NVL and NVLink are never merged.</li>
        <li>
          Per-GPU-hour = published instance price ÷ GPUs per instance when the
          page prints a node price.
        </li>
        <li>
          A month is {HOURS_PER_MONTH} hours, matching the CME GPU contract unit.
        </li>
        <li>Unknown values stay empty and render as &quot;not stated&quot;.</li>
        <li>
          If we cannot verify a number, the cell is empty and labelled
          &quot;TBD – needs verification&quot;.
        </li>
      </ul>

      <h2>Currency</h2>
      <p>
        USD is the default. EUR is either a native published price (Scaleway in
        this seed) or a conversion at the ECB euro reference rate. Current stored
        rate: 1 EUR = {fxRate.usdPerEur} USD on {fxRate.date}, from{" "}
        <a href={fxRate.sourceUrl}>the ECB daily XML feed</a>. Converted amounts
        are labelled converted. Refresh the file with <code>npm run update:fx</code>.
      </p>

      <h2>Freshness</h2>
      <p>
        We intend a daily re-check that opens a pull request. A row is flagged
        stale after 48 hours. See the <Link href="/changelog">changelog</Link> for
        every dataset change.
      </p>

      <h2>Ranking</h2>
      <p>
        Default sort is cheapest on-demand price first, then other priced offers,
        then TBD rows. In-stock rows rank above unknown stock when both are
        on-demand. Affiliate approval, cookies and commission rates are not
        inputs to <code>sortOffers</code>.
      </p>

      <h2>Affiliate programmes</h2>
      <p>
        Until Stefan marks a programme <code>approved</code> in{" "}
        <code>data/affiliates.json</code>, visit links are direct official URLs.
        Programmes on file: {programs.map((item) => item.name).join(", ")}.
      </p>

      <h2>Corrections</h2>
      <p>
        Email {SITE_NAME} via the address on the <Link href="/about">about</Link>{" "}
        page. We will log material corrections on the changelog.
      </p>
    </article>
  );
}
