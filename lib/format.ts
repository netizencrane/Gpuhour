import { HOURS_PER_MONTH } from "@/lib/site";

export function formatMoney(
  amount: number,
  currency: "USD" | "EUR",
  digits = 2,
): string {
  const symbol = currency === "USD" ? "$" : "€";
  return `${symbol}${amount.toFixed(digits)}`;
}

export function formatMaybeMoney(
  amount: number | null,
  currency: "USD" | "EUR",
): string {
  if (amount === null) {
    return "TBD – needs verification";
  }
  return formatMoney(amount, currency);
}

export function formatMonthly(perHour: number | null, currency: "USD" | "EUR"): string {
  if (perHour === null) {
    return "not stated";
  }
  return `${formatMoney(perHour * HOURS_PER_MONTH, currency)} / ${HOURS_PER_MONTH}h`;
}

export function notStated(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") {
    return "not stated";
  }
  return String(value);
}

export function formatStockholm(isoUtc: string): string {
  const date = new Date(isoUtc);
  if (Number.isNaN(date.getTime())) {
    return "not stated";
  }
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Stockholm",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatUtc(isoUtc: string): string {
  const date = new Date(isoUtc);
  if (Number.isNaN(date.getTime())) {
    return "not stated";
  }
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function providerTypeLabel(type: string): string {
  switch (type) {
    case "hyperscaler":
      return "hyperscaler";
    case "gpu-cloud":
      return "GPU cloud";
    case "marketplace":
      return "marketplace";
    default:
      return type;
  }
}

export function pricingTypeLabel(type: string, term: string | null): string {
  if (type === "reserved") {
    return term ? `reserved (${term})` : "reserved";
  }
  return type;
}
