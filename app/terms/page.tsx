import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms",
  description: `Terms of use for ${SITE_NAME}. Information only; verify prices with the provider.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="prose-page space-y-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <PageHeader eyebrow="Legal" title="Terms of use">
        <p>Draft for operator review. Last updated 24 October 2026.</p>
      </PageHeader>

      <p>
        {SITE_NAME} publishes information about published GPU cloud list prices.
        It is not a reseller, broker, cloud provider or financial service. You
        must confirm current prices, stock, regions and contract terms with the
        provider before you buy.
      </p>
      <p>
        Prices change. A last-checked date can be hours or days behind the
        provider. We are not liable for provider changes, outages, or decisions
        you make from this table.
      </p>
      <p>
        NVIDIA, H100, H200, B200, A100, RTX and provider names are trademarks of
        their owners. We use them only to identify products.
      </p>
    </article>
  );
}
