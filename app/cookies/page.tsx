import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookie notice",
  description: `${SITE_NAME} does not set non-essential cookies in this foundation build.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <article className="prose-page space-y-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cookies", path: "/cookies" },
        ])}
      />
      <PageHeader eyebrow="Legal" title="Cookie notice">
        <p>
          This foundation build does not set non-essential cookies. Currency and
          filters are stored in the URL, not in a cookie. Vercel Analytics and
          Speed Insights are included as first-party hooks and are documented as
          cookieless by Vercel. If a later change sets a non-essential cookie, this
          page must be updated before that change ships.
        </p>
      </PageHeader>
      <p>
        The host may set strictly necessary cookies required to deliver the site
        or protect it. We do not use a separate advertising cookie banner because
        we are not dropping optional tracking cookies today.
      </p>
    </article>
  );
}
