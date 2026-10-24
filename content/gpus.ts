import type { FaqItem } from "@/components/faq-list";
import type { GpuSlug } from "@/lib/site";

export type GpuPageCopy = {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  priceDriversTitle: string;
  priceDrivers: string[];
  faqs: FaqItem[];
};

export const GPU_COPY: Record<GpuSlug, GpuPageCopy> = {
  h100: {
    title: "NVIDIA H100 price and H100 rental price per GPU-hour",
    description:
      "NVIDIA H100 price as cloud rental: H100 pricing per GPU-hour for SXM, PCIe and NVL. Official list prices, dated sources, EUR conversion.",
    h1: "NVIDIA H100 price — H100 rental per GPU-hour",
    intro: [
      "A search for NVIDIA H100 price or H100 pricing usually mixes two things: what NVIDIA and its partners charge to buy a GPU, and what clouds charge to rent one. This page is only the rental side. The H100 rental price is the provider's published list price divided by GPUs on the instance, shown per GPU-hour. We do not list street purchase prices.",
      "H100 SXM, H100 PCIe and H100 NVL are kept on separate rows. Merging them is how comparison sites publish three different \"cheapest H100\" headlines on the same day. SXM is the HGX board NVIDIA specifies at 80 GB and 3.35 TB/s. NVL is the dual-slot card NVIDIA specifies at 94 GB and 3.9 TB/s. A cloud row labelled PCIe is whatever that provider printed — we do not relabel it as NVL.",
      "Local-language queries such as h100 preis and prix H100 belong with the same numbers. Converted EUR uses the ECB reference rate and is marked converted. Scaleway publishes native EUR. Hetzner does not publish an H100 list price on the dedicated-server pages we recorded, so there is no Hetzner H100 row.",
    ],
    priceDriversTitle: "What drives the H100 rental price",
    priceDrivers: [
      "Variant is the first split. An H100 SXM hour is not an H100 PCIe hour. NVIDIA's own interconnect and TDP figures differ, and providers price the boards separately when they bother to label them.",
      "Pricing type is the second split. On-demand, spot and reserved hours are not interchangeable. A reserved cluster hour can look expensive next to a community-cloud on-demand hour because you are buying a different commitment and a different isolation story.",
      "Region and tax treatment move the invoice even when the USD list is identical. European invoices may add VAT; B2B reverse charge can apply. We show list prices excluding VAT unless the provider said otherwise.",
      "Stock and marketplace variance explain why other sites disagree. This dataset records stock as not reported on every seed row. Marketplace hosts can undercut a list-price cloud without publishing a stable SKU. We do not invent a Vast.ai H100 number to fill that gap.",
    ],
    faqs: [
      {
        question: "What is the H100 rental price per hour?",
        answer:
          "It depends on variant, pricing type and provider. Use the table on this page: each verified row is a published list price per GPU-hour with a source URL and a checked time. There is no single H100 cloud price.",
      },
      {
        question: "Why do H100 SXM, PCIe and NVL prices differ?",
        answer:
          "They are different products. NVIDIA publishes separate SXM and NVL specifications. Clouds that still say PCIe may be selling an 80 GB card that is not the 94 GB NVL SKU. We never merge those rows.",
      },
      {
        question: "Why is the cheapest H100 different on other comparison sites?",
        answer:
          "Most headline disagreements come from mixing SXM with PCIe, mixing spot with on-demand, or treating a marketplace bid as a list price. We only show official list prices, keep variants apart, and leave unpublished cells as not published.",
      },
      {
        question: "Do you show the purchase price of an NVIDIA H100?",
        answer:
          "No. Buy-side NVIDIA H100 price quotes are not in this dataset. For hardware purchase, use NVIDIA or an authorised partner. This site compares rental list prices only.",
      },
      {
        question: "How do you convert H100 pricing to EUR?",
        answer:
          "USD list prices are converted at the stored ECB euro reference rate and labelled converted. Native EUR, such as Scaleway, is labelled native. Monthly cost uses 730 hours.",
      },
    ],
  },
  h200: {
    title: "H200 price and H200 rental price per GPU-hour",
    description:
      "H200 price and H200 pricing as cloud rental per GPU-hour. Official list prices, SXM kept separate from unlabelled rows, EUR and VAT notes.",
    h1: "H200 price — H200 rental per GPU-hour",
    intro: [
      "H200 price and H200 pricing searches are mostly about rental, with a minority looking for a purchase quote. This page answers the rental question: the H200 rental, or H200 price per hour, from providers that print a list price. Purchase quotes are not collected here.",
      "NVIDIA's H200 product page specifies 141 GB of HBM3e at 4.8 TB/s for both SXM and NVL, and marks the table preliminary. Cloud rows that omit the variant stay labelled not stated. We do not guess SXM versus NVL from the memory size alone.",
      "EUR amounts are converted from USD unless the provider published euros. Prices exclude VAT unless stated. No provider in this dataset currently reports H200 stock, so we never treat a row as in stock.",
    ],
    priceDriversTitle: "What drives the H200 rental price",
    priceDrivers: [
      "H200 list prices sit above most H100 SXM hours in this dataset because the published memory is larger (141 GB versus 80 GB on H100 SXM) and the boards are newer. That is a list-price observation, not a performance claim.",
      "Secure-cloud versus community-cloud, and reserved versus on-demand, still dominate the spread. RunPod publishes both Secure and Community H200 hours; Hyperstack publishes a reserved H200 starting-from figure.",
      "Unlabelled variants make cross-site averages misleading. If a provider only says H200, we keep variant as not stated instead of filling SXM.",
    ],
    faqs: [
      {
        question: "What is the H200 price per hour?",
        answer:
          "Use the verified on-demand rows in the table. The cheapest verified H200 list price and the median are summarised above the table. Unpublished providers stay not published.",
      },
      {
        question: "Is H200 rental cheaper than buying an H200?",
        answer:
          "We do not publish a purchase price, so we cannot compute a break-even. The page compares rental list prices only.",
      },
      {
        question: "Does NVIDIA publish H200 SXM and NVL separately?",
        answer:
          "Yes. The official H200 product page has a specification table for H200 SXM and H200 NVL. Both list 141 GB and 4.8 TB/s. Cloud offers are only tagged SXM or NVL when the provider printed that word.",
      },
    ],
  },
  b200: {
    title: "NVIDIA B200 price and B200 rental price per GPU-hour",
    description:
      "NVIDIA B200 price and B200 rental per GPU-hour from official cloud list prices. Specs cited to NVIDIA HGX/DGX documentation. No invented figures.",
    h1: "NVIDIA B200 price — B200 rental per GPU-hour",
    intro: [
      "NVIDIA B200 price and B200 price queries are easy to confuse with unrelated B200 products. This page is only the NVIDIA B200 Tensor Core GPU as a cloud rental. The B200 rental, including B200 price per hour, is the provider list price per GPU-hour.",
      "NVIDIA's HGX documentation prints 180 GB HBM3e and up to 8 TB/s per B200 SXM GPU. The DGX B200 product page prints 1,440 GB and 64 TB/s across eight GPUs, which matches those per-GPU figures. Some clouds print 192 GB on the price row; that stays their published VRAM, not a NVIDIA datasheet substitute.",
      "B200 reserved cluster hours can be higher than on-demand hours because the published SKU is a multi-week or multi-month cluster, not a single GPU. We show the reserved term when the provider printed one.",
    ],
    priceDriversTitle: "What drives the B200 rental price",
    priceDrivers: [
      "Supply is thinner than H100. Fewer verified publishers means a wider gap between the cheapest and dearest list price, and several providers still have B200 rows marked not published.",
      "Instance size matters. An 8x HGX B200 node price divided by eight is not the same product as a 1x listing, even when both are labelled on-demand.",
      "We do not convert NVIDIA's eight-GPU FP4/FP8 petaFLOPS into a single-GPU rental metric. Those system totals are not a like-for-like hourly unit.",
    ],
    faqs: [
      {
        question: "What is the NVIDIA B200 price per hour to rent?",
        answer:
          "See the verified rows below. If a provider has not printed a B200 list price, the cell is not published. We do not estimate a B200 rental from H100 pricing.",
      },
      {
        question: "Is B200 VRAM 180 GB or 192 GB?",
        answer:
          "NVIDIA's HGX B200 SXM documentation prints 180 GB HBM3e. A cloud that prints 192 GB is showing its own published figure. Both can appear in the price table; the spec table follows NVIDIA.",
      },
      {
        question: "Why is plain B200 a bad search term?",
        answer:
          "In the US, B200 also matches unrelated vehicles and aircraft. Title, H1 and body on this page use NVIDIA B200 so the rental meaning is explicit.",
      },
    ],
  },
  a100: {
    title: "NVIDIA A100 price and A100 GPU price per hour",
    description:
      "NVIDIA A100 price, A100 GPU price and A100 rental per GPU-hour. 40 GB and 80 GB, SXM and PCIe kept on separate rows. Official list prices only.",
    h1: "NVIDIA A100 price — A100 rental per GPU-hour",
    intro: [
      "NVIDIA A100 price, A100 price and A100 GPU price still attract buyers and renters. This page is the A100 rental: published cloud list prices per GPU-hour. 40 GB and 80 GB stay on separate rows, as do SXM and PCIe.",
      "NVIDIA's current A100 product page publishes an 80 GB SXM specification (80 GB HBM2e, 2.039 TB/s) and an 80 GB PCIe specification (80 GB HBM2e, 1.935 TB/s). Clouds still rent 40 GB cards. We record 40 GB when the provider printed it, and we do not invent 40 GB bandwidth from the 80 GB table.",
      "In this dataset the cheapest verified A100 hours are older 40 GB or community-cloud listings. That does not make them equivalent to an 80 GB SXM node.",
    ],
    priceDriversTitle: "What drives the A100 GPU price per hour",
    priceDrivers: [
      "Memory capacity is the main fork. A 40 GB hour is cheaper to list and cannot hold the same model shard as 80 GB. Treat them as different products.",
      "A100 is the previous datacenter generation. Providers with leftover 40 GB PCIe inventory publish lower on-demand rates than H100 SXM. That is a list-price fact, not a recommendation to train a 70B model on 40 GB.",
      "Some A100 rows still omit VRAM. Those rows are not merged into the 80 GB median.",
    ],
    faqs: [
      {
        question: "What is the NVIDIA A100 price per hour?",
        answer:
          "There is no single A100 GPU price. Filter the table by 40 GB versus 80 GB and by SXM versus PCIe. The summary above the table shows the cheapest verified on-demand hour per variant.",
      },
      {
        question: "Should I rent an A100 instead of an H100?",
        answer:
          "Only the rental list prices are in scope here. If a verified A100 hour is cheaper than a verified H100 hour of the same pricing type, that difference is shown on the H100 vs A100 page. Workload fit is yours to judge.",
      },
      {
        question: "Do you have A100 40 GB official specs?",
        answer:
          "NVIDIA's live A100 product-page table is the 80 GB SXM and 80 GB PCIe pair. We do not copy 40 GB bandwidth from secondary write-ups. The 40 GB figure in the price table is whatever the cloud printed.",
      },
    ],
  },
  "rtx-pro-6000": {
    title: "RTX PRO 6000 rental price per GPU-hour",
    description:
      "RTX PRO 6000 rental price from official cloud and dedicated-server list prices. 96 GB GDDR7 cited to NVIDIA. Workstation and server SKUs are not merged into H100 rows.",
    h1: "RTX PRO 6000 rental price",
    intro: [
      "RTX PRO 6000 rental is a smaller search than H100, but enough providers now print a list price to keep this page. NVIDIA's RTX PRO 6000 Blackwell family page lists 96 GB GDDR7 ECC on Server, Workstation and Max-Q editions. Cloud rows that omit the edition stay unlabelled.",
      "These are workstation-class GPUs, not H100 replacements. Memory is GDDR7, not HBM. We keep them out of H100 medians.",
      "Hetzner publishes dedicated root servers with RTX PRO 6000 Blackwell Max-Q in Helsinki and Falkenstein, with a published hourly rate and a one-time setup fee. That is a different product from a cloud pod billed by the second.",
    ],
    priceDriversTitle: "What drives the RTX PRO 6000 rental price",
    priceDrivers: [
      "Edition and cooling change the SKU. NVIDIA publishes different power ranges for Server (400–600 W), Workstation (600 W) and Max-Q (300 W). Providers rarely name the edition on the price row.",
      "Dedicated servers with setup fees can look cheap per hour and expensive to start. Hetzner prints both the hourly rate and the setup fee; we do not amortise the setup into the GPU-hour.",
      "Search volume for RTX PRO 6000 rental is low. The page exists because two or more providers published prices, which is the thin-page rule for this GPU.",
    ],
    faqs: [
      {
        question: "What is the RTX PRO 6000 rental price per hour?",
        answer:
          "Use the verified rows. Cloud list prices and Hetzner's dedicated hourly rates are both shown, because both are official published numbers. They are not the same product.",
      },
      {
        question: "Is this the same as an H100?",
        answer:
          "No. NVIDIA documents RTX PRO 6000 as a Blackwell professional GPU with 96 GB GDDR7. H100 is a Hopper datacenter GPU with HBM. Compare them only as different products.",
      },
    ],
  },
};
