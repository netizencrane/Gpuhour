import { buildQuery, type OfferFilters } from "@/lib/filters";
import { GPU_MODELS } from "@/lib/site";

export function ComparisonFilters({
  pathname,
  searchParams,
  filters,
  currency,
}: {
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
  filters: OfferFilters;
  currency: "USD" | "EUR";
}) {
  const currencyHref = (next: "USD" | "EUR") =>
    `${pathname}${buildQuery(searchParams, { currency: next === "USD" ? undefined : "EUR" })}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-600">
          Filters work as URL parameters, so the default view stays usable without
          JavaScript.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-ink-500">Currency</span>
          <a
            className={currency === "USD" ? "font-semibold" : undefined}
            href={currencyHref("USD")}
            aria-current={currency === "USD" ? "page" : undefined}
          >
            USD
          </a>
          <span aria-hidden="true">/</span>
          <a
            className={currency === "EUR" ? "font-semibold" : undefined}
            href={currencyHref("EUR")}
            aria-current={currency === "EUR" ? "page" : undefined}
          >
            EUR
          </a>
        </div>
      </div>

      <form method="get" action={pathname} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {currency === "EUR" ? <input type="hidden" name="currency" value="EUR" /> : null}
        {filters.gpu ? <input type="hidden" name="gpu" value={filters.gpu} /> : null}

        <label className="text-sm">
          <span className="mb-1 block text-ink-500">GPU</span>
          <select name="gpu" defaultValue={filters.gpu ?? ""} className="field">
            <option value="">All models</option>
            {GPU_MODELS.map((gpu) => (
              <option key={gpu} value={gpu}>
                {gpu}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-ink-500">GPU class</span>
          <select name="gpuClass" defaultValue={filters.gpuClass ?? ""} className="field">
            <option value="">All classes</option>
            <option value="datacenter">Datacenter</option>
            <option value="workstation">Workstation</option>
            <option value="consumer">Consumer</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-ink-500">Pricing type</span>
          <select
            name="pricingType"
            defaultValue={filters.pricingType ?? ""}
            className="field"
          >
            <option value="">All types</option>
            <option value="on-demand">On-demand</option>
            <option value="spot">Spot</option>
            <option value="reserved">Reserved</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-ink-500">Provider type</span>
          <select
            name="providerType"
            defaultValue={filters.providerType ?? ""}
            className="field"
          >
            <option value="">All providers</option>
            <option value="hyperscaler">Hyperscaler</option>
            <option value="gpu-cloud">GPU cloud</option>
            <option value="marketplace">Marketplace</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-ink-500">Min VRAM (GB)</span>
          <input
            type="number"
            name="minVram"
            min={0}
            defaultValue={filters.minVram ?? ""}
            className="field"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-ink-500">Min GPUs</span>
          <input
            type="number"
            name="minGpus"
            min={1}
            defaultValue={filters.minGpus ?? ""}
            className="field"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-ink-500">Country</span>
          <select name="country" defaultValue={filters.country ?? ""} className="field">
            <option value="">All / not stated</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
            <option value="SE">Sweden</option>
            <option value="FI">Finland</option>
            <option value="PL">Poland</option>
          </select>
        </label>

        <fieldset className="flex flex-col justify-end gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="eu" value="1" defaultChecked={filters.eu} />
            EU / EEA regions only
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              value="1"
              defaultChecked={filters.inStock}
            />
            In stock only
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="nativeEur"
              value="1"
              defaultChecked={filters.nativeEur}
            />
            Native EUR price
          </label>
        </fieldset>

        <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-4">
          <button type="submit" className="button">
            Apply filters
          </button>
          <a href={pathname} className="text-sm">
            Reset
          </a>
        </div>
      </form>
    </div>
  );
}
