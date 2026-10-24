import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate-link";
import { getAffiliateProgram } from "@/lib/affiliates";

export function ProviderCta({
  providerSlug,
  name,
  children,
}: {
  providerSlug: string;
  name: string;
  children?: React.ReactNode;
}) {
  const program = getAffiliateProgram(providerSlug);
  const pending = program && !program.approved;

  return (
    <aside className="note space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">
        Open {name} pricing
      </h2>
      {children ? <p>{children}</p> : null}
      <p>
        The visit button goes through{" "}
        <Link href={`/out/${providerSlug}`}>/out/{providerSlug}</Link>
        {pending
          ? ", which still points at the official pricing page until the affiliate programme is approved."
          : program?.approved
            ? " and is an affiliate link when that programme is approved."
            : ". There is no affiliate programme on file for this provider, so the redirect is a direct official URL."}
      </p>
      <AffiliateLink providerSlug={providerSlug}>
        Visit {name} official pricing
      </AffiliateLink>
    </aside>
  );
}
