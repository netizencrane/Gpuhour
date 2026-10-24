import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import {
  breadcrumbJsonLd,
  datasetJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/json-ld";
import { getOffers } from "@/lib/prices";
import type { StaticPageProps } from "@/lib/page-props";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GPU rental prices — cloud GPU pricing comparison",
  description:
    "Compare cloud GPU rental and GPU-as-a-service prices per GPU-hour. Dated list prices from official pages, with EUR conversion, VAT notes and EU-region filters.",
  path: "/",
});

export default function HomePage({
  searchParams,
}: StaticPageProps) {
  const offers = getOffers();

  return (
    <div className="space-y-8">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: "gpuhour.io GPU-hour list prices",
          description:
            "Hand-entered list prices from providers' official pricing pages.",
          path: "/",
          offers,
        })}
      />

      <PageHeader
        eyebrow="Cloud GPU pricing"
        title="GPU rental prices compared"
      >
        <p>
          Find a cloud GPU rental price per GPU-hour from providers&apos;
          published list prices. Every number has a source URL and a last-checked
          date. We do not scrape, and we do not invent missing cells.
        </p>
        <p>
          The table below is the GPU cloud pricing comparison: H100, H200, B200,
          A100 and RTX PRO 6000, with USD/EUR, VAT notes and an EU-region filter.
        </p>
      </PageHeader>

      <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link href="/gpu/h100">H100</Link>
        <Link href="/gpu/h200">H200</Link>
        <Link href="/gpu/b200">B200</Link>
        <Link href="/gpu/a100">A100</Link>
        <Link href="/gpu/rtx-pro-6000">RTX PRO 6000</Link>
        <Link href="/cheapest">Cheapest</Link>
        <Link href="/eu">EU / EUR</Link>
        <Link href="/provider/runpod">RunPod</Link>
        <Link href="/provider/vast-ai">Vast.ai</Link>
        <Link href="/provider/lambda">Lambda</Link>
        <Link href="/provider/coreweave">CoreWeave</Link>
        <Link href="/provider/nebius">Nebius</Link>
        <Link href="/provider/digitalocean">DigitalOcean</Link>
        <Link href="/compare/runpod-vs-vast-ai">RunPod vs Vast.ai</Link>
        <Link href="/compare/runpod-vs-lambda">RunPod vs Lambda</Link>
        <Link href="/compare/h100-vs-h200">H100 vs H200</Link>
        <Link href="/compare/h100-vs-a100">H100 vs A100</Link>
        <Link href="/compare/b200-vs-h100">B200 vs H100</Link>
        <Link href="/methodology">Methodology</Link>
      </nav>

      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname="/"
        caption="GPU cloud price comparison."
      />
    </div>
  );
}
