import type { GpuModel } from "@/lib/schema";
import { COMPARE_SLUGS, GPU_SLUGS, type GpuSlug } from "@/lib/site";

export function gpuPath(gpu: GpuModel): string {
  const slug = (Object.keys(GPU_SLUGS) as GpuSlug[]).find(
    (key) => GPU_SLUGS[key] === gpu,
  );
  return slug ? `/gpu/${slug}` : "/";
}

export const GPU_COMPARE_LINKS: Record<GpuModel, { href: string; label: string }[]> = {
  H100: [
    { href: "/compare/h100-vs-h200", label: "H100 vs H200" },
    { href: "/compare/h100-vs-a100", label: "H100 vs A100" },
    { href: "/compare/b200-vs-h100", label: "B200 vs H100" },
  ],
  H200: [{ href: "/compare/h100-vs-h200", label: "H100 vs H200" }],
  B200: [{ href: "/compare/b200-vs-h100", label: "B200 vs H100" }],
  A100: [{ href: "/compare/h100-vs-a100", label: "H100 vs A100" }],
  "RTX PRO 6000": [],
};

export const PROVIDER_COMPARE_LINKS: Record<string, { href: string; label: string }[]> = {
  runpod: [
    { href: "/compare/runpod-vs-vast-ai", label: "RunPod vs Vast.ai" },
    { href: "/compare/runpod-vs-lambda", label: "RunPod vs Lambda" },
  ],
  "vast-ai": [{ href: "/compare/runpod-vs-vast-ai", label: "RunPod vs Vast.ai" }],
  lambda: [{ href: "/compare/runpod-vs-lambda", label: "RunPod vs Lambda" }],
};

export const FEATURED_PROVIDER_SLUGS = [
  "runpod",
  "vast-ai",
  "lambda",
  "coreweave",
  "nebius",
  "digitalocean",
] as const;

export function comparePath(slug: (typeof COMPARE_SLUGS)[number]): string {
  return `/compare/${slug}`;
}
