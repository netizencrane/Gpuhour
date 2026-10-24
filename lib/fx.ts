import fxJson from "@/data/fx.json";
import { fxRateSchema, type FxRate } from "@/lib/schema";

export const fxRate: FxRate = fxRateSchema.parse(fxJson);

export function usdToEur(usd: number, rate: FxRate = fxRate): number {
  return usd / rate.usdPerEur;
}

export function eurToUsd(eur: number, rate: FxRate = fxRate): number {
  return eur * rate.usdPerEur;
}
