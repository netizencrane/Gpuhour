export const TABLE_COLUMNS = [
  {
    id: "gpu",
    label: "GPU",
    sortKey: "gpu",
    description: "Model + variant + VRAM. Variants are never merged.",
  },
  {
    id: "provider",
    label: "Provider",
    sortKey: "provider",
    description: "Name and type (hyperscaler / GPU cloud / marketplace).",
  },
  {
    id: "config",
    label: "Config",
    sortKey: "gpus",
    description: "GPUs per instance, vCPU, RAM.",
  },
  {
    id: "pricingType",
    label: "Pricing type",
    sortKey: "pricingType",
    description: "On-demand, spot, or reserved with term.",
  },
  {
    id: "region",
    label: "Region",
    sortKey: "region",
    description: "Country + zone, EU flag, or not stated.",
  },
  {
    id: "price",
    label: "$/GPU-hr and €/GPU-hr",
    sortKey: "price",
    description: "USD list price; EUR native or ECB-converted.",
  },
  {
    id: "billing",
    label: "Billing",
    sortKey: "billing",
    description: "Increment and minimum commitment.",
  },
  {
    id: "stock",
    label: "Stock",
    sortKey: "stock",
    description: "In stock, sold out, or not reported.",
  },
  {
    id: "source",
    label: "Source",
    sortKey: "source",
    description: "Official pricing page or API; method.",
  },
  {
    id: "checked",
    label: "Last checked",
    sortKey: "checked",
    description: "UTC and Europe/Stockholm; stale after 48 h.",
  },
  {
    id: "linkType",
    label: "Link type",
    sortKey: "linkType",
    description: "Affiliate or direct. Ranking ignores commission.",
  },
] as const;

export type TableColumnId = (typeof TABLE_COLUMNS)[number]["id"];
export type SortKey = (typeof TABLE_COLUMNS)[number]["sortKey"];
