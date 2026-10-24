import { resolveOutboundUrl } from "@/lib/affiliates";

export function AffiliateLink({
  providerSlug,
  children,
}: {
  providerSlug: string;
  children: React.ReactNode;
}) {
  const target = resolveOutboundUrl(providerSlug);
  const isAffiliate = target.linkType === "affiliate";

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <a
        href={`/out/${providerSlug}`}
        rel={
          isAffiliate
            ? "sponsored nofollow noopener"
            : "noopener noreferrer"
        }
        target="_blank"
      >
        {children}
      </a>
      {isAffiliate ? (
        <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-ink-500">
          Annonslänk / affiliate link
        </span>
      ) : null}
    </span>
  );
}
