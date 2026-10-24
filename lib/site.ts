export const SITE_NAME = "gpuhour.io";
export const SITE_URL = "https://gpuhour.io";
export const SITE_TAGLINE = "GPU-hour rental prices, sourced and dated";

export const CONTACT_EMAIL = "hello@gpuhour.io";
export const OPERATOR_NAME = "Stefan";
export const OPERATOR_COUNTRY = "Sweden";

export const HOURS_PER_MONTH = 730;
export const STALE_AFTER_MS = 48 * 60 * 60 * 1000;

export const GPU_MODELS = [
  "H100",
  "H200",
  "B200",
  "A100",
  "RTX PRO 6000",
] as const;

export const GPU_SLUGS = {
  h100: "H100",
  h200: "H200",
  b200: "B200",
  a100: "A100",
  "rtx-pro-6000": "RTX PRO 6000",
} as const;

export type GpuSlug = keyof typeof GPU_SLUGS;

export const PROVIDER_SLUGS = [
  "lambda",
  "nebius",
  "hyperstack",
  "runpod",
  "coreweave",
  "digitalocean",
  "ovhcloud",
  "scaleway",
  "vast-ai",
  "crusoe",
  "verda",
] as const;

export const COMPARE_SLUGS = [
  "runpod-vs-vast-ai",
  "runpod-vs-lambda",
  "h100-vs-h200",
  "h100-vs-a100",
  "b200-vs-h100",
] as const;

export const EU_COUNTRY_CODES = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
] as const;
