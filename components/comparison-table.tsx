import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate-link";
import { GPU_SLUGS, PROVIDER_SLUGS } from "@/lib/site";
import { TABLE_COLUMNS, type SortKey } from "@/lib/columns";
import {
  buildQuery,
  type CurrencyCode,
  type SortState,
} from "@/lib/filters";
import {
  formatMaybeMoney,
  formatMonthly,
  formatStockholm,
  formatUtc,
  notStated,
  pricingTypeLabel,
  providerTypeLabel,
} from "@/lib/format";
import { eurDisplay, isStale, usdEquivalent } from "@/lib/prices";
import type { PriceOffer } from "@/lib/schema";

function sortHref(
  pathname: string,
  searchParams: Record<string, string | string[] | undefined>,
  key: SortKey,
  current: SortState,
): string {
  const dir = current.key === key && current.dir === "asc" ? "desc" : "asc";
  return `${pathname}${buildQuery(searchParams, { sort: key, dir })}`;
}

function GpuCell({ offer }: { offer: PriceOffer }) {
  const slug = Object.entries(GPU_SLUGS).find(([, name]) => name === offer.gpu)?.[0];
  return (
    <div>
      <div className="font-medium text-ink-900">
        {slug ? <Link href={`/gpu/${slug}`}>{offer.gpu}</Link> : offer.gpu}{" "}
        <span className="text-ink-500">{offer.variant}</span>
      </div>
      <div className="text-xs text-ink-500">
        {offer.vramGb === null ? "VRAM not stated" : `${offer.vramGb} GB VRAM`} ·{" "}
        {offer.gpuClass}
      </div>
    </div>
  );
}

function PriceCell({
  offer,
  currency,
}: {
  offer: PriceOffer;
  currency: CurrencyCode;
}) {
  const usd = usdEquivalent(offer);
  const eur = eurDisplay(offer);
  const primary =
    currency === "USD"
      ? formatMaybeMoney(usd, "USD")
      : formatMaybeMoney(eur?.amount ?? null, "EUR");
  const secondary =
    currency === "USD"
      ? eur
        ? `${formatMaybeMoney(eur.amount, "EUR")} ${eur.kind === "native" ? "native EUR" : "converted"}`
        : "EUR not stated"
      : usd !== null
        ? `${formatMaybeMoney(usd, "USD")} USD list`
        : "USD not stated";

  return (
    <div>
      <div className="font-mono text-base font-semibold text-price">
        {primary}
        {offer.verificationStatus === "tbd" ? null : (
          <span className="ml-1 text-xs font-normal text-ink-500">/GPU-hr</span>
        )}
      </div>
      <div className="text-xs text-ink-500">
        {secondary}
        {usd !== null ? ` · ${formatMonthly(usd, "USD")}` : null}
      </div>
    </div>
  );
}

function OfferCard({
  offer,
  currency,
}: {
  offer: PriceOffer;
  currency: CurrencyCode;
}) {
  const stale = isStale(offer);
  return (
    <article className="rounded-xl border border-line bg-paper-50 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <GpuCell offer={offer} />
        <PriceCell offer={offer} currency={currency} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-ink-500">Provider</dt>
          <dd>
            {PROVIDER_SLUGS.includes(
              offer.providerSlug as (typeof PROVIDER_SLUGS)[number],
            ) ? (
              <Link href={`/provider/${offer.providerSlug}`}>{offer.provider}</Link>
            ) : (
              offer.provider
            )}{" "}
            ({providerTypeLabel(offer.providerType)})
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Config</dt>
          <dd>
            {notStated(offer.gpusPerInstance)} GPU · {notStated(offer.vcpu)} vCPU ·{" "}
            {notStated(offer.ramGb)} GB RAM
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Pricing</dt>
          <dd>{pricingTypeLabel(offer.pricingType, offer.reservedTerm)}</dd>
        </div>
        <div>
          <dt className="text-ink-500">Region</dt>
          <dd>
            {offer.regionCountry ?? "not stated"}
            {offer.regionZone ? ` · ${offer.regionZone}` : ""}
            {offer.eu === true ? " · EU" : offer.eu === false ? "" : " · EU not stated"}
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Billing</dt>
          <dd>
            per {offer.billingIncrement}
            {offer.minCommitment ? ` · ${offer.minCommitment}` : ""}
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Stock</dt>
          <dd>{offer.stock.replace("-", " ")}</dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <a href={offer.sourceUrl} rel="noopener noreferrer">
          Source ({offer.method})
        </a>
        <AffiliateLink providerSlug={offer.providerSlug}>Visit</AffiliateLink>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        Last checked {formatUtc(offer.checkedAtUtc)} UTC /{" "}
        {formatStockholm(offer.checkedAtUtc)} Stockholm
        {stale ? " · stale" : ""} · {offer.linkType}
      </p>
    </article>
  );
}

export function ComparisonTable({
  offers,
  caption,
  pathname,
  searchParams,
  sort,
  currency,
}: {
  offers: PriceOffer[];
  caption: string;
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
  sort: SortState;
  currency: CurrencyCode;
}) {
  return (
    <div className="space-y-4">
      <div className="md:hidden space-y-3">
        {offers.length === 0 ? (
          <p>No offers match these filters.</p>
        ) : (
          offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} currency={currency} />
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="price-table">
          <caption className="mb-3 text-left text-sm text-ink-600">
            {caption} Default sort is cheapest on-demand first; commission never
            changes the order.{" "}
            <Link href="/methodology">How we collect prices</Link>.
          </caption>
          <thead>
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th key={column.id} scope="col">
                  <a
                    href={sortHref(pathname, searchParams, column.sortKey, sort)}
                    className="inline-flex items-center gap-1"
                  >
                    {column.label}
                    {sort.key === column.sortKey ? (
                      <span aria-hidden="true">
                        {sort.dir === "asc" ? "↑" : "↓"}
                      </span>
                    ) : null}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => {
              const stale = isStale(offer);
              const usd = usdEquivalent(offer);
              const eur = eurDisplay(offer);
              return (
                <tr key={offer.id} className={stale ? "stale" : undefined}>
                  <th scope="row">
                    <GpuCell offer={offer} />
                  </th>
                  <td>
                    <div className="font-medium">
                      {PROVIDER_SLUGS.includes(
                        offer.providerSlug as (typeof PROVIDER_SLUGS)[number],
                      ) ? (
                        <Link href={`/provider/${offer.providerSlug}`}>
                          {offer.provider}
                        </Link>
                      ) : (
                        offer.provider
                      )}
                    </div>
                    <div className="text-xs text-ink-500">
                      {providerTypeLabel(offer.providerType)}
                    </div>
                  </td>
                  <td>
                    {notStated(offer.gpusPerInstance)}× · {notStated(offer.vcpu)}{" "}
                    vCPU · {notStated(offer.ramGb)} GB
                  </td>
                  <td>{pricingTypeLabel(offer.pricingType, offer.reservedTerm)}</td>
                  <td>
                    {offer.regionCountry ?? "not stated"}
                    {offer.regionZone ? ` · ${offer.regionZone}` : ""}
                    <div className="text-xs text-ink-500">
                      {offer.eu === true
                        ? "EU / EEA"
                        : offer.eu === false
                          ? "Outside EU"
                          : "EU not stated"}
                    </div>
                  </td>
                  <td>
                    <div className="font-mono font-semibold text-price">
                      {currency === "USD"
                        ? formatMaybeMoney(usd, "USD")
                        : formatMaybeMoney(eur?.amount ?? null, "EUR")}
                    </div>
                    <div className="text-xs text-ink-500">
                      {currency === "USD"
                        ? eur
                          ? `${formatMaybeMoney(eur.amount, "EUR")} ${eur.kind}`
                          : "EUR not stated"
                        : usd !== null
                          ? `${formatMaybeMoney(usd, "USD")} USD`
                          : "USD not stated"}
                      {usd !== null ? ` · ${formatMonthly(usd, "USD")}` : null}
                    </div>
                  </td>
                  <td>
                    per {offer.billingIncrement}
                    <div className="text-xs text-ink-500">
                      min {notStated(offer.minCommitment)}
                    </div>
                  </td>
                  <td>
                    {offer.stock.replace("-", " ")}
                    <div className="text-xs text-ink-500">
                      checked {formatUtc(offer.checkedAtUtc)} UTC
                    </div>
                  </td>
                  <td>
                    <a href={offer.sourceUrl} rel="noopener noreferrer">
                      Official page
                    </a>
                    <div className="text-xs text-ink-500">{offer.method}</div>
                  </td>
                  <td>
                    <div>{formatUtc(offer.checkedAtUtc)} UTC</div>
                    <div className="text-xs text-ink-500">
                      {formatStockholm(offer.checkedAtUtc)} Stockholm
                      {stale ? " · stale" : ""}
                    </div>
                  </td>
                  <td>
                    <div className="mb-1 text-xs uppercase tracking-wide text-ink-500">
                      {offer.linkType}
                    </div>
                    <AffiliateLink providerSlug={offer.providerSlug}>
                      Visit
                    </AffiliateLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {offers.length === 0 ? (
          <p className="py-6 text-sm">No offers match these filters.</p>
        ) : null}
      </div>
    </div>
  );
}
