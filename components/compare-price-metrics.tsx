import { formatMaybeMoney, formatUtc } from "@/lib/format";
import { getGpuSpec } from "@/lib/gpu-specs";
import { pricedOnDemand, medianUsd } from "@/lib/offer-stats";
import { usdEquivalent } from "@/lib/prices";
import type { GpuModel, PriceOffer } from "@/lib/schema";

function sxmMemoryGb(gpu: GpuModel): number | null {
  const spec = getGpuSpec(gpu);
  const sxm = spec.variants.find((variant) =>
    variant.name.toLowerCase().includes("sxm"),
  );
  return (sxm ?? spec.variants[0])?.memoryGb ?? null;
}

function perGb(usd: number | null, gb: number | null): number | null {
  if (usd === null || gb === null || gb <= 0) {
    return null;
  }
  return usd / gb;
}

export function ComparePriceMetrics({
  leftGpu,
  rightGpu,
  leftOffers,
  rightOffers,
  formula,
}: {
  leftGpu: GpuModel;
  rightGpu: GpuModel;
  leftOffers: PriceOffer[];
  rightOffers: PriceOffer[];
  formula: string;
}) {
  const rows = [leftGpu, rightGpu].map((gpu, index) => {
    const offers = index === 0 ? leftOffers : rightOffers;
    const onDemand = pricedOnDemand(offers);
    const cheapest = onDemand[0] ?? null;
    const memoryGb = sxmMemoryGb(gpu);
    const cheapestUsd = cheapest ? usdEquivalent(cheapest) : null;
    const median = medianUsd(onDemand);
    return {
      gpu,
      memoryGb,
      cheapest,
      cheapestUsd,
      median,
      cheapestPerGb: perGb(cheapestUsd, memoryGb),
      medianPerGb: perGb(median, memoryGb),
    };
  });

  return (
    <div className="overflow-x-auto">
      <table className="content-table">
        <caption className="mb-3 text-left text-sm text-ink-600">
          {formula} Memory is the NVIDIA-published SXM (or first official)
          capacity, not a cloud marketing figure.
        </caption>
        <thead>
          <tr>
            <th scope="col">GPU</th>
            <th scope="col">NVIDIA memory</th>
            <th scope="col">Cheapest verified on-demand</th>
            <th scope="col">Median on-demand</th>
            <th scope="col">Cheapest / GB·hr</th>
            <th scope="col">Median / GB·hr</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.gpu}>
              <th scope="row">{row.gpu}</th>
              <td>
                {row.memoryGb === null ? "not published" : `${row.memoryGb} GB`}
              </td>
              <td>
                {row.cheapest
                  ? `${row.cheapest.provider} ${formatMaybeMoney(row.cheapestUsd, "USD")}`
                  : "not published"}
                {row.cheapest ? (
                  <div className="text-xs text-ink-500">
                    {row.cheapest.variant} · {formatUtc(row.cheapest.checkedAtUtc)}{" "}
                    UTC
                  </div>
                ) : null}
              </td>
              <td>{formatMaybeMoney(row.median, "USD")}</td>
              <td>
                {row.cheapestPerGb === null
                  ? "not published"
                  : `$${row.cheapestPerGb.toFixed(4)}`}
              </td>
              <td>
                {row.medianPerGb === null
                  ? "not published"
                  : `$${row.medianPerGb.toFixed(4)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
