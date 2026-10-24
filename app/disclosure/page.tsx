import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { getAffiliatePrograms } from "@/lib/affiliates";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Affiliate disclosure",
  description: `How ${SITE_NAME} labels affiliate links and which programmes are configured.`,
  path: "/disclosure",
});

export default function DisclosurePage() {
  const programs = getAffiliatePrograms();

  return (
    <article className="prose-page space-y-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Affiliate disclosure", path: "/disclosure" },
        ])}
      />
      <PageHeader eyebrow="Legal" title="Affiliate disclosure">
        <p>
          Some links on {SITE_NAME} may be affiliate links. If you rent through
          one of those links, we may earn a commission. This does not change the
          price you pay, and it never changes sort order. Swedish marketing law
          requires advertising to be recognisable (
          <a href="https://www.konsumentverket.se/marknadsratt-foretag/dold-marknadsforing-i-sociala-medier-regler-for-foretag/">
            Konsumentverket
          </a>
          ). Approved affiliate links are marked &quot;Annonslänk / affiliate
          link&quot; and use <code>rel=&quot;sponsored nofollow noopener&quot;</code>.
        </p>
      </PageHeader>

      <h2>Programmes</h2>
      <ul>
        {programs.map((program) => (
          <li key={program.providerSlug}>
            <strong>{program.name}</strong> — {program.approved ? "approved" : "pending approval"}.{" "}
            Official page: <a href={program.officialUrl}>{program.officialUrl}</a>
            {program.termsUrl ? (
              <>
                {" "}
                · <a href={program.termsUrl}>published terms</a>
              </>
            ) : null}
            {program.note ? ` · ${program.note}` : null}
          </li>
        ))}
      </ul>

      <p>
        Direct links are used until a programme is approved. Placeholder affiliate
        URLs live in <code>data/affiliates.json</code> so they can be swapped
        without touching the table.
      </p>
    </article>
  );
}
