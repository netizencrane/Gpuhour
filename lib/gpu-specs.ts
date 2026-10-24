import specsJson from "@/data/gpu-specs.json";
import type { GpuModel } from "@/lib/schema";

export type SpecSource = {
  label: string;
  url: string;
};

export type GpuSpecVariant = {
  id: string;
  name: string;
  formFactor: string;
  memoryGb: number | null;
  memoryType: string | null;
  memoryBandwidthTBs: number | null;
  nvlinkGBs: number | null;
  tdpW: string | null;
  fp64Tflops: number | null;
  fp64TensorTflops: number | null;
  notes: string[];
};

export type GpuSpecModel = {
  displayName: string;
  architecture: string;
  productUrl: string;
  sources: SpecSource[];
  variants: GpuSpecVariant[];
};

type GpuSpecsFile = {
  updatedAtUtc: string;
  note: string;
  models: Record<string, GpuSpecModel>;
};

const file = specsJson as GpuSpecsFile;

export function getGpuSpec(gpu: GpuModel): GpuSpecModel {
  const spec = file.models[gpu];
  if (!spec) {
    throw new Error(`No official spec record for ${gpu}`);
  }
  return spec;
}

export function specMemoryGb(gpu: GpuModel, prefer?: string): number | null {
  const spec = getGpuSpec(gpu);
  if (prefer) {
    const match = spec.variants.find((variant) =>
      variant.name.toLowerCase().includes(prefer.toLowerCase()),
    );
    if (match?.memoryGb != null) {
      return match.memoryGb;
    }
  }
  return spec.variants[0]?.memoryGb ?? null;
}
