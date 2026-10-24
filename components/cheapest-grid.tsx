import Link from "next/link";
import { formatMaybeMoney, formatUtc, pricingTypeLabel } from "@/lib/format";
import type { CheapestGpuRow } from "@/lib/offer-stats";
import { gpuPath } from "@/lib/page-links";
import { usdEquivalent } from "@/lib/prices";

function OfferBits({ offer }: { offer: CheapestGpuRow["cheapest"] }) {
  if (!offer) {
    return <span>not published</span>;
  }
  const usd = usdEquivalent(offer);
  return (
    <div>
      <div className="font-medium">
        {offer.provider} · {formatMaybeMoney(usd, "USD")}/GPU-hr
      </div>
      <div className="text-xs text-ink-500">
        {offer.variant} · {pricingTypeLabel(offer.pricingType, offer.reservedTerm)} · stock{" "}
        {offer.stock.replace("-", " ")}
      </div>
      <div className="text-xs text-ink-500">
        checked {formatUtc(offer.checkedAtUtc)} UTC
      </div>
    </div>
  );
}

export function CheapestGrid({ rows }: { rows: CheapestGpuRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="content-table">
        <caption className="mb-3 text-left text-sm text-ink-600">
          One cheapest verified on-demand hour per GPU, plus the runner-up.
          Stock is shown as published. &quot;not reported&quot; is never treated
          as in stock. Ranking is price only.
        </caption>
        <thead>
          <tr>
            <th scope="col">GPU</th>
            <th scope="col">Cheapest verified on-demand</th>
            <th scope="col">Runner-up</th>
            <th scope="col">In-stock rows</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.gpu}>
              <th scope="row">
                <Link href={gpuPath(row.gpu)}>{row.gpu}</Link>
              </th>
              <td>
                <OfferBits offer={row.cheapest} />
              </td>
              <td>
                <OfferBits offer={row.runnerUp} />
              </td>
              <td>
                {row.inStockCount === 0
                  ? "none reported — not treated as in stock"
                  : `${row.inStockCount} in-stock`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
