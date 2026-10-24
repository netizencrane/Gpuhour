import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import {
  CONTACT_EMAIL,
  OPERATOR_COUNTRY,
  OPERATOR_NAME,
  SITE_NAME,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `Who runs ${SITE_NAME}, how the site earns money, and how to get in touch.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="prose-page space-y-4">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader eyebrow="About" title={`Who runs ${SITE_NAME}`}>
        <p>
          {SITE_NAME} is a GPU-hour rental price comparison site. It is operated
          by {OPERATOR_NAME} in {OPERATOR_COUNTRY}. Legal entity details and a
          confirmed public contact mailbox are still for the operator to approve
          before launch.
        </p>
      </PageHeader>

      <h2>Independence</h2>
      <p>
        {SITE_NAME} is not affiliated with, endorsed by, or sponsored by NVIDIA
        or any cloud provider. Product names are used nominatively so you can
        tell H100 SXM from H100 PCIe.
      </p>
      <p>
        This site is not gpuhour.com. That is a separate comparison product. A
        trademark check of the GPU Hour name is tracked separately and is not
        finished in this foundation PR.
      </p>

      <h2>How the site earns money</h2>
      <p>
        When affiliate programmes are approved, some &quot;Visit&quot; links will
        be labelled affiliate links (Annonslänk). Until then they go to the
        provider&apos;s official URL. Ranking never uses commission. See the{" "}
        <Link href="/disclosure">affiliate disclosure</Link> and{" "}
        <Link href="/methodology">methodology</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Intended contact address: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
        (pending operator confirmation). Use it for corrections and source
        challenges.
      </p>
    </article>
  );
}
