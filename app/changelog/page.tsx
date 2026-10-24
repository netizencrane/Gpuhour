import changelog from "@/data/changelog.json";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Changelog",
  description: "Every gpuhour.io price-dataset change, dated.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <article className="prose-page space-y-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Changelog", path: "/changelog" },
        ])}
      />
      <PageHeader eyebrow="Data" title="Changelog">
        <p>
          Material price edits should land as a pull request and a line here.
        </p>
      </PageHeader>
      {changelog.entries.map((entry) => (
        <section key={entry.date}>
          <h2>
            {entry.date} — {entry.title}
          </h2>
          <p>{entry.body}</p>
        </section>
      ))}
    </article>
  );
}
