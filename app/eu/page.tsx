import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { RelatedLinks } from "@/components/related-links";
import { SuspendedPriceExplorer } from "@/components/suspended-price-explorer";
import { breadcrumbJsonLd, datasetJsonLd, faqPageJsonLd } from "@/lib/json-ld";
import type { StaticPageProps } from "@/lib/page-props";
import { getOffers } from "@/lib/prices";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GPU server mieten, serveur GPU, prix H100 — EU GPU cloud in EUR",
  description:
    "GPU server mieten, gpu mieten, serveur GPU, prix H100, OVH GPU, Scaleway GPU and Hetzner GPU server list prices in EUR. EU/EEA regions only. VAT notes. No invented Hetzner H100.",
  path: "/eu",
});

const FAQS = [
  {
    question: "Warum listet ihr keinen Hetzner H100?",
    answer:
      "Hetzner veröffentlicht auf den von uns gelesenen Produktseiten keine H100-, H200-, B200- oder A100-Listenpreise. Gelistet sind die offiziellen GEX-Dedizierten mit RTX PRO 6000. Wir erfinden keinen H100-Preis.",
  },
  {
    question: "Les prix sont-ils TTC ?",
    answer:
      "Non. Les prix sont hors TVA sauf mention contraire du fournisseur. L'autoliquidation B2B peut s'appliquer. Vérifiez la facture chez OVHcloud, Scaleway ou Hetzner.",
  },
];

export default function EuPage({ searchParams }: StaticPageProps) {
  const offers = getOffers();
  const euOffers = offers.filter((offer) => offer.eu === true);

  return (
    <div className="space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "EU GPU cloud", path: "/eu" },
        ])}
      />
      <JsonLd
        data={datasetJsonLd({
          name: "EU GPU cloud list prices",
          description: "Offers with a stated EU/EEA region.",
          path: "/eu",
          offers: euOffers,
        })}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <PageHeader
        eyebrow="EU GPU cloud"
        title="GPU server mieten, serveur GPU, prix H100 — EUR prices in the EU"
      >
        <p>
          This page is for people who search gpu server mieten, gpu mieten,
          serveur GPU, prix H100, location GPU, OVH GPU, Scaleway GPU or
          Hetzner GPU server. It is not built around &quot;EU GPU cloud&quot; or
          &quot;GDPR GPU cloud&quot; — those phrases have no useful search
          demand in the research we used. The filter keeps only offers whose
          provider stated an EU or EEA region.
        </p>
        <p>
          Native EUR (Scaleway, Hetzner) is labelled native. USD lists from
          OVHcloud are converted at the ECB reference rate and labelled
          converted. Prices exclude VAT unless the provider said otherwise. We
          do not claim data residency or GDPR processing beyond what a provider
          prints on the linked page.
        </p>
      </PageHeader>

      <SuspendedPriceExplorer
        offers={offers}
        searchParams={searchParams}
        pathname="/eu"
        caption="EU / EEA GPU cloud table."
        presetFilters={{ eu: true }}
        defaultCurrency="EUR"
      />

      <section className="prose-page space-y-3" lang="de">
        <h2>GPU server mieten in Deutschland</h2>
        <p>
          Wer einen GPU-Server mieten will, findet hier nur Zeilen mit einer
          vom Anbieter genannten EU- oder EWR-Region. Der H100-Preis (h100
          preis) in Euro kommt in diesem Datensatz von OVHcloud (Gravelines,
          Listenpreis in USD, umgerechnet) und von Scaleway (PAR-2, native
          Euro). Wir rechnen nicht in offizielle Hetzner-H100-Preise um, weil
          Hetzner keine veröffentlicht hat.
        </p>
        <p>
          Hetzner GPU Server: Hetzner veröffentlicht dedizierte Root-Server
          GEX63, GEX131 und GEX430 mit NVIDIA RTX PRO 6000 Blackwell Max-Q,
          Stundenpreis und Setup-Gebühr, Standorte HEL 1 (Helsinki) und FSN 1
          (Falkenstein). Das ist ein anderer Vertrag als ein Cloud-Pod. Die
          Zeilen stehen in der Tabelle, weil die Preise auf{" "}
          <a href="https://www.hetzner.com/dedicated-rootserver/gex63/">
            hetzner.com
          </a>{" "}
          stehen — nicht weil wir eine H100-Lücke füllen wollten.
        </p>
      </section>

      <section className="prose-page space-y-3" lang="fr">
        <h2>Prix H100 et serveur GPU en France</h2>
        <p>
          Pour un serveur GPU ou une location GPU, les lignes françaises
          vérifiées sont OVHcloud (Gravelines, instances Public Cloud, hors
          TVA, source{" "}
          <a href="https://www.ovhcloud.com/en/public-cloud/prices/">
            ovhcloud.com
          </a>
          ) et Scaleway (PAR-2, prix natifs en euros, source{" "}
          <a href="https://www.scaleway.com/en/choose-the-right-gpu/">
            scaleway.com
          </a>
          ). Le prix H100 / h100 prix affiché ici est ce tarif de liste, pas un
          prix d&apos;achat NVIDIA.
        </p>
        <p>
          OVH GPU et Scaleway GPU restent séparés : OVHcloud publie encore
          surtout en USD sur la grille anglaise que nous avons lue ; Scaleway
          publie en EUR. Hetzner n&apos;a pas de grille H100 dans ce fichier.
        </p>
      </section>

      <section className="prose-page space-y-3">
        <h2>Netherlands and Sweden</h2>
        <p>
          Dutch demand for gpu huren is small; Swedish hyra GPU returned no
          volume in the research set. Those users already search in English
          (gpu rental, NVIDIA H100 price). This page stays English for that
          pair, with EUR on the table.
        </p>
        <p>
          <Link href="/methodology">Methodology</Link> explains the ECB rate
          and the 730-hour month. Provider pages:{" "}
          <Link href="/provider/nebius">Nebius</Link> is often described as
          EU-relevant, but its recorded price rows do not state a region, so
          they do not pass this filter.
        </p>
      </section>

      <RelatedLinks
        title="Related"
        links={[
          { href: "/gpu/h100", label: "H100 rental / prix H100" },
          { href: "/gpu/rtx-pro-6000", label: "RTX PRO 6000 (incl. Hetzner)" },
          { href: "/cheapest", label: "Cheapest cloud GPU" },
          { href: "/provider/digitalocean", label: "DigitalOcean GPU" },
        ]}
      />
    </div>
  );
}
