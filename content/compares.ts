import type { FaqItem } from "@/components/faq-list";
import type { GpuModel } from "@/lib/schema";
import { COMPARE_SLUGS } from "@/lib/site";

export type CompareCopy = {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  differencesTitle: string;
  differences: string[];
  faqs: FaqItem[];
  providers?: string[];
  gpus?: GpuModel[];
};

export const COMPARE_COPY: Record<(typeof COMPARE_SLUGS)[number], CompareCopy> = {
  "runpod-vs-vast-ai": {
    title: "RunPod vs Vast.ai — GPU rental list prices",
    description:
      "RunPod vs Vast.ai: official RunPod list prices next to Vast.ai marketplace rows that stay not published until Vast prints a stable figure.",
    h1: "RunPod vs Vast.ai",
    providers: ["runpod", "vast-ai"],
    intro: [
      "RunPod vs Vast.ai is a fixed-price cloud against a host marketplace. RunPod publishes Secure Cloud and Community Cloud on-demand rates. Vast.ai hosts set their own prices, so this dataset has no verified Vast.ai GPU-hour.",
      "The table is still useful: it shows every recorded row from both official pricing URLs, with checked times. A blank Vast.ai cell is a fact, not a missing scrape.",
    ],
    differencesTitle: "Billing, isolation and what we can source",
    differences: [
      "RunPod: official list rates on https://www.runpod.io/pricing, split Secure versus Community. Billing increment was not printed on the recorded offers.",
      "Vast.ai: official page https://vast.ai/pricing describes host-set marketplace pricing. Numeric GPU-hours in this dataset stay not published.",
      "Storage and egress: we do not invent disk or egress prices. Compare those on each provider's official docs — RunPod at runpod.io/pricing and Vast.ai at vast.ai/pricing — rather than on a third-party table.",
      "This page does not declare a winner. Commission is not an input.",
    ],
    faqs: [
      {
        question: "Is Vast.ai cheaper than RunPod?",
        answer:
          "Not something this dataset can answer. RunPod has verified list prices. Vast.ai does not, in this file. A live marketplace bid you see elsewhere is outside our sourced table.",
      },
    ],
  },
  "runpod-vs-lambda": {
    title: "RunPod vs Lambda — GPU cloud list prices",
    description:
      "RunPod vs Lambda and Lambda vs RunPod: official on-demand and reserved list prices per GPU variant, with checked times.",
    h1: "RunPod vs Lambda",
    providers: ["runpod", "lambda"],
    intro: [
      "RunPod vs Lambda, or Lambda vs RunPod, is two published catalogues. RunPod prints Secure and Community on-demand hours. Lambda prints on-demand instance hours and reserved 1-Click Cluster hours. Both sources are official pricing pages.",
      "Compare the same GPU variant only. An H100 Community Cloud hour is not an H100 SXM 8x Lambda instance, and a Lambda reserved cluster hour is not an on-demand pod.",
    ],
    differencesTitle: "What the official pages actually say",
    differences: [
      "RunPod source: https://www.runpod.io/pricing — Secure and Community on-demand. No reserved term in this seed. VRAM not printed on the recorded offers.",
      "Lambda source: https://lambda.ai/pricing — per-GPU-hour instance table plus 1-Click Clusters with a 2-week to 1-year term. Prices noted as plus applicable sales tax/VAT/GST.",
      "Regions: neither recorded table stored a country. Neither set is flagged EU.",
      "Affiliate: RunPod programme pending; Lambda has no programme on file. Ranking ignores both.",
    ],
    faqs: [
      {
        question: "Which is cheaper, RunPod or Lambda?",
        answer:
          "It depends on the GPU and variant. Sort the table by price. Community Cloud H100 PCIe and Lambda H100 PCIe are the closest like-for-like on-demand pair in this seed; SXM 8x and reserved clusters are different products.",
      },
    ],
  },
  "h100-vs-h200": {
    title: "H100 vs H200 — rental price and official specs",
    description:
      "H100 vs H200 rental prices plus NVIDIA-cited memory and bandwidth. Median and cheapest verified hours, and price per GB of HBM per hour.",
    h1: "H100 vs H200",
    gpus: ["H100", "H200"],
    intro: [
      "H100 vs H200 is a memory upgrade on the same Hopper generation, not a new architecture. NVIDIA's H200 page says 141 GB HBM3e at 4.8 TB/s, against H100 SXM at 80 GB and 3.35 TB/s. Those are official product-page figures.",
      "Rental list prices do not move one-for-one with that memory delta. The table below keeps H100 and H200 rows together so you can see the cheapest verified on-demand hour and the median for each.",
    ],
    differencesTitle: "Price per GB of HBM per hour",
    differences: [
      "Formula: USD per GPU-hour ÷ NVIDIA-published HBM capacity in GB. H100 SXM uses 80 GB. H200 uses 141 GB. We do not use a cloud's unlabelled VRAM when NVIDIA has already printed the SKU memory.",
      "A cheaper H100 hour can still be more expensive per published GB, and a dearer H200 hour can be cheaper per GB. The derived column is arithmetic, not a quality score.",
      "NVIDIA marks the H200 specification table preliminary. If that table changes, the derived column changes with it.",
    ],
    faqs: [
      {
        question: "Is H200 always worth the extra rental?",
        answer:
          "Not from list price alone. Compare cheapest and median hours, then the per-GB figure. Workload fit — whether you need 141 GB — is outside this page.",
      },
    ],
  },
  "h100-vs-a100": {
    title: "H100 vs A100 — rental price and official specs",
    description:
      "H100 vs A100 rental prices, SXM compared with SXM where both exist, and when the A100 is still the cheaper verified list price.",
    h1: "H100 vs A100",
    gpus: ["H100", "A100"],
    intro: [
      "H100 vs A100 is Hopper versus Ampere. NVIDIA's H100 SXM specification is 80 GB at 3.35 TB/s. NVIDIA's A100 80 GB SXM specification is 80 GB HBM2e at 2.039 TB/s. Those pages are linked in the spec table.",
      "Rental list prices often invert the generation story: verified A100 hours in this dataset are frequently cheaper than verified H100 hours. That is why the \"when the A100 is still the better buy\" block is driven only by list price, not by a performance slogan.",
    ],
    differencesTitle: "When the A100 is still the better buy",
    differences: [
      "Better buy, on this page, means a lower verified on-demand USD per GPU-hour for a comparable variant class (SXM vs SXM, or PCIe vs PCIe). It is not a throughput claim.",
      "A 40 GB A100 hour that undercuts an 80 GB H100 hour is not a like-for-like win. The block only treats 80 GB A100 rows as comparable to 80 GB H100 rows.",
      "If the cheapest verified 80 GB A100 on-demand hour is below the cheapest verified 80 GB H100 on-demand hour, the A100 wins that list-price test on the checked date.",
    ],
    faqs: [
      {
        question: "Should I still rent an A100 in 2026?",
        answer:
          "If the job fits 40 GB or 80 GB HBM2e and the verified A100 list price is lower than the H100 you would have booked, the rental table says the A100 is cheaper. That is the only claim we make.",
      },
    ],
  },
  "b200-vs-h100": {
    title: "B200 vs H100 — rental price and official specs",
    description:
      "B200 vs H100 rental prices with NVIDIA-cited memory figures. No invented performance-normalised price unless NVIDIA publishes a comparable per-GPU metric.",
    h1: "B200 vs H100",
    gpus: ["B200", "H100"],
    intro: [
      "B200 vs H100 is Blackwell versus Hopper. NVIDIA's HGX documentation prints 180 GB HBM3e and up to 8 TB/s for B200 SXM, against 80 GB HBM3 and 3.35 TB/s for H100 SXM. DGX B200 system totals (1,440 GB, 64 TB/s across eight GPUs) match the per-GPU memory and bandwidth.",
      "Verified B200 list prices in this dataset sit above most H100 hours. That is expected for a newer SKU with more published memory. It is not a token-cost comparison.",
    ],
    differencesTitle: "Why there is no performance-normalised rental",
    differences: [
      "NVIDIA publishes eight-GPU FP4 and FP8 petaFLOPS for DGX/HGX B200 boards and a different precision mix for H100. Those are not a single per-GPU, same-precision figure we can divide into a rental hour without inventing a method.",
      "SemiAnalysis token-cost figures appear on NVIDIA marketing pages; they are not a NVIDIA datasheet metric and they are not list prices, so they are not used here.",
      "What we do show: cheapest and median verified rental hours, plus USD per published GB of HBM (80 GB for H100 SXM, 180 GB for B200 SXM).",
    ],
    faqs: [
      {
        question: "Is B200 twice the H100 rental?",
        answer:
          "Not as a rule. Look at the cheapest and median verified hours on the date shown. Several B200 rows are still not published, so the B200 median is thinner than the H100 median.",
      },
    ],
  },
};
