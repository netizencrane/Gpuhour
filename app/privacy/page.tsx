import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, OPERATOR_COUNTRY, OPERATOR_NAME, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `Privacy notice for ${SITE_NAME}: what we process, why, and your rights.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="prose-page space-y-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <PageHeader eyebrow="Legal" title="Privacy notice">
        <p>
          Draft for operator review. Controller identity (legal name and Swedish
          company details) is not confirmed. Until then, treat {OPERATOR_NAME} in{" "}
          {OPERATOR_COUNTRY} as the intended controller and {CONTACT_EMAIL} as
          the intended contact.
        </p>
      </PageHeader>

      <h2>What we process</h2>
      <ul>
        <li>Server logs that the host (Vercel) keeps for security and debugging.</li>
        <li>
          Vercel Web Analytics and Speed Insights. These are designed to work
          without non-essential cookies. We do not send a separate advertising
          pixel.
        </li>
        <li>
          Clicks on <code>/out/&lt;provider&gt;</code>, counted in server logs so
          we can see which official pages people open. No third-party click
          tracker is loaded.
        </li>
      </ul>

      <h2>Legal basis</h2>
      <p>
        Legitimate interests in running a public website, keeping it secure, and
        understanding aggregate traffic (GDPR Art. 6(1)(f)), once a controller
        is confirmed. This notice does not claim a finished DPIA or a completed
        lawful-basis assessment.
      </p>

      <h2>Retention</h2>
      <p>
        Hosting logs follow Vercel&apos;s retention. We do not currently store a
        separate user database.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask for access, rectification, erasure, restriction or objection
        once a controller mailbox is live. You can complain to{" "}
        <a href="https://www.imy.se/">IMY</a>, the Swedish Authority for Privacy
        Protection, or to your local EEA authority.
      </p>

      <p>
        GDPR text:{" "}
        <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">
          Regulation (EU) 2016/679
        </a>
        .
      </p>
    </article>
  );
}
