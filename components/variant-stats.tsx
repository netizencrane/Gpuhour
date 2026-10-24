import Link from "next/link";
import { formatMaybeMoney, formatUtc } from "@/lib/format";
import { usdEquivalent } from "@/lib/prices";
import type { VariantStat } from "@/lib/offer-stats";
import { gpuPath } from "@/lib/page-links";

function offerCell(offer: VariantStat["cheapestOnDemand"]): string {
  if (!offer) {
    return "not published";
  }
  const usd = usdEquivalent(offer);
  return `${offer.provider} ${formatMaybeMoney(usd, "USD")}/GPU-hr`;
}

export function VariantStats({
  stats,
  gpuHref,
}: {
  stats: VariantStat[];
  gpuHref?: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Like-for-like rental by variant
      </h2>
      <p className="max-w-3xl text-ink-700">
        Variants stay separate. A median needs at least one verified on-demand
        price. A variant with fewer than three verified providers is marked
        insufficient data. Stock in this dataset is not reported unless a
        provider printed it.
      </p>
      <div className="overflow-x-auto">
        <table className="content-table">
          <thead>
            <tr>
              <th scope="col">Variant</th>
              <th scope="col">Verified providers</th>
              <th scope="col">Cheapest on-demand</th>
              <th scope="col">Median on-demand</th>
              <th scope="col">Cheapest spot</th>
              <th scope="col">Cheapest reserved</th>
              <th scope="col">Checked</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((row) => {
              const checked = row.cheapestOnDemand?.checkedAtUtc;
              return (
                <tr key={row.variant}>
                  <th scope="row">
                    {row.variant}
                    {gpuHref ? (
                      <div className="text-xs font-normal">
                        <Link href={gpuHref}>GPU page</Link>
                      </div>
                    ) : null}
                  </th>
                  <td>
                    {row.verifiedProviders.length}
                    {row.insufficientData ? (
                      <div className="text-xs text-warn">insufficient data</div>
                    ) : null}
                  </td>
                  <td>{offerCell(row.cheapestOnDemand)}</td>
                  <td>
                    {formatMaybeMoney(row.medianOnDemandUsd, "USD")}
                    {row.medianOnDemandUsd !== null ? "/GPU-hr" : ""}
                  </td>
                  <td>{offerCell(row.cheapestSpot)}</td>
                  <td>{offerCell(row.cheapestReserved)}</td>
                  <td>{checked ? `${formatUtc(checked)} UTC` : "not published"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function GpuHubLinks() {
  return (
    <p className="text-sm text-ink-600">
      See also <Link href={gpuPath("H100")}>H100</Link>,{" "}
      <Link href={gpuPath("H200")}>H200</Link>,{" "}
      <Link href={gpuPath("B200")}>B200</Link>,{" "}
      <Link href={gpuPath("A100")}>A100</Link> and{" "}
      <Link href={gpuPath("RTX PRO 6000")}>RTX PRO 6000</Link>.
    </p>
  );
}
