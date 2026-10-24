import { z } from "zod";

export const gpuModelSchema = z.enum([
  "H100",
  "H200",
  "B200",
  "A100",
  "RTX PRO 6000",
]);

export const gpuVariantSchema = z.enum([
  "SXM",
  "PCIe",
  "NVL",
  "NVLink",
  "not stated",
]);

export const gpuClassSchema = z.enum(["datacenter", "workstation", "consumer"]);

export const providerTypeSchema = z.enum([
  "hyperscaler",
  "gpu-cloud",
  "marketplace",
]);

export const pricingTypeSchema = z.enum(["on-demand", "spot", "reserved"]);

export const stockSchema = z.enum(["in-stock", "sold-out", "not-reported"]);

export const billingIncrementSchema = z.enum([
  "second",
  "minute",
  "hour",
  "not stated",
]);

export const methodSchema = z.enum(["manual", "official-api"]);

export const linkTypeSchema = z.enum(["affiliate", "direct"]);

export const verificationStatusSchema = z.enum(["verified", "tbd"]);

export const publishedCurrencySchema = z.enum(["USD", "EUR"]);

export const priceOfferSchema = z
  .object({
    id: z.string().min(1),
    provider: z.string().min(1),
    providerSlug: z.string().min(1),
    providerType: providerTypeSchema,
    gpu: gpuModelSchema,
    gpuClass: gpuClassSchema,
    variant: gpuVariantSchema,
    vramGb: z.number().positive().nullable(),
    gpusPerInstance: z.number().int().positive().nullable(),
    vcpu: z.number().positive().nullable(),
    ramGb: z.number().positive().nullable(),
    pricingType: pricingTypeSchema,
    reservedTerm: z.string().nullable(),
    regionCountry: z.string().nullable(),
    regionCountryCode: z.string().nullable(),
    regionZone: z.string().nullable(),
    eu: z.boolean().nullable(),
    publishedCurrency: publishedCurrencySchema,
    usdPerGpuHour: z.number().nonnegative().nullable(),
    nativeEurPerGpuHour: z.number().nonnegative().nullable(),
    billingIncrement: billingIncrementSchema,
    minCommitment: z.string().nullable(),
    stock: stockSchema,
    sourceUrl: z.string().url(),
    method: methodSchema,
    checkedAtUtc: z.string().min(1),
    linkType: linkTypeSchema,
    verificationStatus: verificationStatusSchema,
    verificationNote: z.string().nullable(),
    tosStatus: z.string().min(1),
    note: z.string().nullable(),
  })
  .superRefine((offer, ctx) => {
    if (offer.verificationStatus === "verified") {
      const hasUsd = offer.usdPerGpuHour !== null;
      const hasEur = offer.nativeEurPerGpuHour !== null;
      if (!hasUsd && !hasEur) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Verified offers must include usdPerGpuHour or nativeEurPerGpuHour",
          path: ["usdPerGpuHour"],
        });
      }
    }
    if (offer.verificationStatus === "tbd") {
      if (offer.usdPerGpuHour !== null || offer.nativeEurPerGpuHour !== null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "TBD offers must not carry an unverified numeric price",
          path: ["verificationStatus"],
        });
      }
    }
  });

export const priceDatasetSchema = z.object({
  version: z.string(),
  generatedAtUtc: z.string(),
  checkedAtUtc: z.string(),
  notes: z.string(),
  offers: z.array(priceOfferSchema).min(1),
});

export type GpuModel = z.infer<typeof gpuModelSchema>;
export type GpuVariant = z.infer<typeof gpuVariantSchema>;
export type GpuClass = z.infer<typeof gpuClassSchema>;
export type ProviderType = z.infer<typeof providerTypeSchema>;
export type PricingType = z.infer<typeof pricingTypeSchema>;
export type StockStatus = z.infer<typeof stockSchema>;
export type PriceOffer = z.infer<typeof priceOfferSchema>;
export type PriceDataset = z.infer<typeof priceDatasetSchema>;

export const fxRateSchema = z.object({
  base: z.literal("EUR"),
  quote: z.literal("USD"),
  usdPerEur: z.number().positive(),
  date: z.string(),
  source: z.string(),
  sourceUrl: z.string().url(),
  retrievedAtUtc: z.string(),
  reuseNote: z.string(),
});

export type FxRate = z.infer<typeof fxRateSchema>;

export const affiliateProgramSchema = z.object({
  providerSlug: z.string(),
  name: z.string(),
  approved: z.boolean(),
  officialUrl: z.string().url(),
  affiliateUrl: z.string().url().nullable(),
  network: z.string().nullable(),
  termsUrl: z.string().url().nullable(),
  note: z.string().nullable(),
});

export const affiliateConfigSchema = z.object({
  programs: z.array(affiliateProgramSchema),
});

export type AffiliateProgram = z.infer<typeof affiliateProgramSchema>;
