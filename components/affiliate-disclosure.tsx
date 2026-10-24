import Link from "next/link";

export function AffiliateDisclosure() {
  return (
    <p className="disclosure" role="note">
      Some links are affiliate links; we may earn a commission. Prices and
      ranking are not affected.{" "}
      <Link href="/disclosure">Full affiliate disclosure</Link>.
    </p>
  );
}
