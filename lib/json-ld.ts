import { SITE_NAME, SITE_URL, CONTACT_EMAIL, OPERATOR_NAME } from "@/lib/site";
import { latestCheckedAt, usdEquivalent } from "@/lib/prices";
import type { PriceOffer } from "@/lib/schema";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    founder: {
      "@type": "Person",
      name: OPERATOR_NAME,
    },
    description:
      "GPU-hour rental price comparison using providers' published list prices.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function datasetJsonLd({
  name,
  description,
  path,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  offers: PriceOffer[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url: `${SITE_URL}${path}`,
    dateModified: latestCheckedAt(),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    license: `${SITE_URL}/methodology`,
    variableMeasured: "USD per GPU-hour list price",
    numberOfItems: offers.length,
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function productOfferJsonLd(offer: PriceOffer) {
  const usd = usdEquivalent(offer);
  if (usd === null || offer.verificationStatus !== "verified") {
    return null;
  }
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${offer.gpu} ${offer.variant} GPU-hour on ${offer.provider}`,
    category: "GPU cloud rental",
    brand: offer.gpu,
    offers: {
      "@type": "Offer",
      price: usd.toFixed(4),
      priceCurrency: "USD",
      url: offer.sourceUrl,
      priceValidAt: offer.checkedAtUtc,
      availability:
        offer.stock === "sold-out"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
    },
  };
}
