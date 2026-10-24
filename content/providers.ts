import type { FaqItem } from "@/components/faq-list";

export type ProviderPageCopy = {
  title: string;
  description: string;
  h1: string;
  overview: string[];
  regions: string[];
  billing: string[];
  pros: string[];
  cons: string[];
  cta: string;
  faqs: FaqItem[];
};

export const PROVIDER_COPY: Record<string, ProviderPageCopy> = {
  runpod: {
    title: "RunPod pricing — GPU cloud list prices",
    description:
      "RunPod pricing for H100, H200, B200, A100 and RTX PRO 6000. Secure Cloud and Community Cloud kept separate. Official list prices and RunPod alternatives.",
    h1: "RunPod pricing",
    overview: [
      "RunPod pricing on this page is the on-demand Secure Cloud and Community Cloud list taken from RunPod's official pricing page. Secure and Community stay on separate rows. We do not average them.",
      "The recorded RunPod rates come from the Product/Offer JSON-LD on runpod.io/pricing. That source did not print VRAM, vCPU or system RAM, so those cells are not published rather than guessed.",
      "People searching for a RunPod alternative usually want a cheaper sourced hour for the same GPU, or a provider that prints a reserved term. Those links sit under the table. Rank order is price, not commission.",
    ],
    regions: [
      "The official pricing page, as recorded, did not print a country or city on the JSON-LD offers. We stored Secure Cloud and Community Cloud in the zone field because that is the isolation class RunPod published, not a geography.",
      "EU residency is therefore not stated for RunPod in this dataset. Do not read an EU flag into these rows.",
    ],
    billing: [
      "Billing increment is not stated on the recorded pricing offers, so this page does not claim per-second billing. If RunPod documents a different increment on another official page, it is not in this seed.",
      "Every recorded RunPod row is on-demand. No reserved term was printed on those offers.",
    ],
    pros: [
      "Official page publishes separate Secure Cloud and Community Cloud on-demand rates for H100 SXM, PCIe and NVL, plus H200, B200, A100 and RTX PRO 6000.",
      "Community Cloud hours in this dataset are often the cheaper RunPod column for the same GPU and variant.",
      "All recorded RunPod prices are verified list prices with a source URL and a checked time.",
    ],
    cons: [
      "VRAM, vCPU and system RAM were not printed on the recorded offers, so config cells stay not published.",
      "Country and EU flag are not stated. This is not an EU-region row set.",
      "Stock is not reported. A cheap Community Cloud hour is not an in-stock guarantee.",
      "Affiliate approval is still pending. Visit links go to the official URL until that changes.",
    ],
    cta: "Open RunPod's official pricing page. The redirect is /out/runpod.",
    faqs: [
      {
        question: "What is RunPod pricing per GPU-hour?",
        answer:
          "It is the Secure Cloud or Community Cloud on-demand rate RunPod published for that GPU. Both appear in the table. We do not pick a winner based on the affiliate programme.",
      },
      {
        question: "Where should I look for a RunPod alternative?",
        answer:
          "The alternatives block lists cheaper verified on-demand hours for the same GPU and variant from other providers in this dataset. Lambda, Hyperstack, OVHcloud and others only appear if they actually undercut the RunPod row.",
      },
    ],
  },
  "vast-ai": {
    title: "Vast.ai pricing — marketplace, not a fixed list",
    description:
      "Vast.ai pricing is host-set. We do not invent a Vast.ai GPU-hour. Official pricing page recorded; verified aggregates stay not published until Vast publishes a stable list figure.",
    h1: "Vast.ai pricing",
    overview: [
      "Vast.ai is a marketplace. Hosts set prices. That is why a search for vast ai or vast ai pricing surfaces a different number every few minutes on third-party tables. This page does not invent a Vast.ai H100, H200, B200, A100 or RTX PRO 6000 hour.",
      "The official pricing URL is recorded. Each GPU has a placeholder row so the provider is visible in comparisons, with the numeric price left empty and verification set to not published.",
      "Vast.ai referral terms on file say brand-term ads are not allowed. We are not bidding on the phrase vast ai. The visit path is /out/vast-ai and stays a direct official URL until a dedicated referral account is approved.",
    ],
    regions: [
      "No country, city or EU flag was printed on the recorded Vast.ai pricing page snapshot we stored. Region cells stay not stated.",
    ],
    billing: [
      "The seed records a per-second billing increment because that is what the official pricing page stated as the marketplace unit. It is not a fixed SKU price.",
      "There is no reserved-term Vast.ai row in this dataset.",
    ],
    pros: [
      "Official pricing page and API docs exist, so a later verified aggregate can be added without changing the page shape.",
      "Marketplace rows stay visibly separate from fixed-price clouds on compare pages.",
    ],
    cons: [
      "No verified numeric GPU-hour is in this dataset. Treating a third-party scrape as Vast.ai pricing would break the no-scrape rule.",
      "Host-set prices are not comparable to a Lambda or CoreWeave list row without a timestamped official aggregate.",
      "Region and stock are not published here.",
    ],
    cta: "Open Vast.ai's official pricing page via /out/vast-ai. No invented number is attached to that click.",
    faqs: [
      {
        question: "Why is every Vast.ai price not published?",
        answer:
          "Because Vast.ai does not publish a single list price per GPU that we can date the way Lambda or RunPod do. Host listings move. Until an official aggregate is recorded with a timestamp, the cell stays empty.",
      },
      {
        question: "Is Vast.ai cheaper than RunPod?",
        answer:
          "We cannot say that from this dataset. The RunPod vs Vast.ai page compares what each official source actually printed: RunPod list rates versus Vast.ai's unpublished marketplace cells.",
      },
    ],
  },
  lambda: {
    title: "Lambda Labs pricing and Lambda Cloud pricing",
    description:
      "Lambda Labs pricing and Lambda Cloud pricing from lambda.ai/pricing. On-demand instances and reserved 1-Click Clusters, per GPU-hour.",
    h1: "Lambda Cloud pricing",
    overview: [
      "Lambda Labs pricing and Lambda Cloud pricing on this page come from the instances and 1-Click Clusters tables on lambda.ai/pricing. On-demand 1x and 8x rows are stored separately. Reserved cluster rows keep the published GPU count and term.",
      "Lambda printed PRICE/GPU/HR plus applicable sales tax, VAT or GST. We store the GPU-hour and leave tax as a note. There is no Lambda affiliate programme in affiliates.json, so visit links are direct.",
      "H200 and RTX PRO 6000 Lambda rows exist as placeholders because those SKUs were not printed as a clear list price in the recorded read. They stay not published.",
    ],
    regions: [
      "The recorded Lambda pricing tables did not print a country or zone on the instance rows we stored. Region and EU flag are not stated.",
    ],
    billing: [
      "Billing increment is not stated on the recorded instance table. We do not claim per-second or per-minute billing.",
      "Reserved 1-Click Cluster rows use the published term range of 2 weeks to 1 year. That is a reservation, not an on-demand hour.",
    ],
    pros: [
      "Official page prints per-GPU-hour on-demand prices for H100 SXM, H100 PCIe, B200 SXM and several A100 SKUs, including 1x and 8x sizes.",
      "Reserved cluster prices are published with a term, so they can sit next to on-demand without being mixed.",
      "No affiliate programme is configured, so ranking and visit links cannot be accused of a Lambda commission.",
    ],
    cons: [
      "Region is not stated on the recorded rows.",
      "H200 and RTX PRO 6000 list prices were not verified in this seed.",
      "Stock is not reported.",
    ],
    cta: "Open Lambda's official pricing page. The redirect is /out/lambda and is a direct link.",
    faqs: [
      {
        question: "Where does Lambda Cloud pricing come from?",
        answer:
          "From https://lambda.ai/pricing, read by hand on 24 Oct 2026. Instance rows and 1-Click Cluster rows are stored separately.",
      },
      {
        question: "How does Lambda compare with RunPod?",
        answer:
          "See RunPod vs Lambda. That page only compares official list rows. It does not declare a winner based on fees.",
      },
    ],
  },
  coreweave: {
    title: "CoreWeave pricing — published GPU node list prices",
    description:
      "CoreWeave pricing from coreweave.com/pricing. Node prices normalised per GPU-hour with instance size shown. Contact-sales SKUs stay not published.",
    h1: "CoreWeave pricing",
    overview: [
      "CoreWeave pricing in this table is the published on-demand (and one spot) node rate divided by GPUs on the node. The official page printed both the node hour and a per-GPU figure; we kept the per-GPU number that matches the division.",
      "Recorded SKUs are 8-GPU HGX H100, H200 and B200, an 8-GPU A100 80 GB node, an 8-GPU RTX PRO 6000 Blackwell Server Edition node, and an H100 spot node. Anything the page treats as contact sales is not given an invented number.",
    ],
    regions: [
      "The recorded CoreWeave pricing rows did not include a country or zone. EU is not stated.",
    ],
    billing: [
      "Billing increment is not stated on the recorded page snapshot. Reserved terms are not in this seed.",
      "Spot is only recorded where CoreWeave printed a spot node price (H100 HGX 8x).",
    ],
    pros: [
      "Official page publishes node and per-GPU figures that reconcile (for example H100 8x $49.24/hr → $6.16/GPU-hr).",
      "Coverage includes H100, H200, B200, A100 80 GB and RTX PRO 6000 Server Edition.",
      "Spot H100 is published, so it can be compared with on-demand without scraping.",
    ],
    cons: [
      "Region is not stated on the recorded rows.",
      "SKUs that are quote-only stay off the table instead of showing a guessed hour.",
      "All recorded nodes are 8-GPU. There is no 1x CoreWeave row in this seed.",
    ],
    cta: "Open CoreWeave's official pricing page via /out/coreweave. No CoreWeave affiliate programme is on file.",
    faqs: [
      {
        question: "How is CoreWeave pricing normalised?",
        answer:
          "Per-GPU-hour = published node price ÷ GPUs on the node, then checked against the per-GPU figure on the same page. The H100 spot row keeps the exact 2.46375 quotient instead of rounding.",
      },
    ],
  },
  nebius: {
    title: "Nebius pricing — AI Cloud GPU list prices",
    description:
      "Nebius pricing from nebius.com/prices. On-demand GPU-hours for HGX H100, H200, B200 and RTX PRO 6000. Regions stay not stated until Nebius prints them on the price row.",
    h1: "Nebius pricing",
    overview: [
      "Nebius pricing here is the on-demand GPU-hour printed on nebius.com/prices for NVIDIA HGX H100, HGX H200, HGX B200 and RTX PRO 6000. HGX rows are stored as SXM because that is the board family; VRAM was not printed on those price rows.",
      "A Nebius H100 spot row exists as a placeholder. No spot number was verified, so it stays not published.",
      "Nebius is often discussed as an EU-relevant cloud. That does not let us flag these rows as EU. The recorded price table did not print a region. Use the /eu page for offers that actually state an EU or EEA region.",
    ],
    regions: [
      "Region, country and EU flag are not stated on the recorded Nebius price rows. We do not infer Finland, Netherlands or any other location from brand marketing.",
    ],
    billing: [
      "Published currency on the recorded rows is USD. Converted EUR is marked converted.",
      "Billing increment is not stated. Commitment or reserved discounts are not in this seed except as the missing spot placeholder.",
    ],
    pros: [
      "Official price page prints on-demand GPU-hours for four current NVIDIA SKUs.",
      "RTX PRO 6000 has a verified Nebius hour, which most H100-only tables omit.",
    ],
    cons: [
      "Region is not published on the recorded rows, so Nebius does not appear in the EU-region filter.",
      "VRAM and system RAM were not printed on the HGX price rows.",
      "Spot remains not published.",
    ],
    cta: "Open Nebius official prices via /out/nebius. No Nebius affiliate programme is on file.",
    faqs: [
      {
        question: "Does Nebius pricing include EU regions?",
        answer:
          "Not in this dataset. The EU page only keeps offers whose provider stated an EU or EEA region. Nebius rows currently fail that test.",
      },
    ],
  },
  digitalocean: {
    title: "DigitalOcean GPU Droplets and Paperspace GPU pricing",
    description:
      "DigitalOcean GPU pricing: GPU Droplets (H100, H200) plus additional/dedicated GPU rows from the Paperspace-era table. Official URLs recorded. Affiliate pending Awin approval.",
    h1: "DigitalOcean GPU pricing",
    overview: [
      "DigitalOcean GPU pricing is split on purpose. GPU Droplets (H100 and H200, on-demand and 12-month reserved) come from digitalocean.com/pricing/gpu-droplets. The A100 row comes from the additional/dedicated GPU table at digitalocean.com/pricing/additional-gpus, which is the Paperspace-era list. Paperspace pricing searches should land on that second group, not on Droplets.",
      "B200 has a placeholder on the Droplets URL because no verified B200 Droplet list price was recorded.",
      "The DigitalOcean Awin programme is configured but not approved. Visit links stay on the official URL.",
    ],
    regions: [
      "Datacenters are mentioned on the product page, but the recorded price rows did not store a country or zone. EU is not stated on these rows.",
    ],
    billing: [
      "GPU Droplet rows record per-second billing, as printed on that pricing page. The additional/dedicated A100 row does not state an increment.",
      "12-month reserved Droplet prices are stored with reservedTerm set to 12 months.",
    ],
    pros: [
      "Official Droplet page prints on-demand and 12-month reserved H100 and H200 GPU-hours.",
      "Paperspace-era additional GPU prices are kept on a separate source URL instead of being mixed into Droplets.",
    ],
    cons: [
      "Region cells are empty in this seed even though the marketing page lists datacenters.",
      "B200 Droplet price is not published.",
      "A100 additional-GPU VRAM was not printed.",
      "Affiliate links wait on Awin approval.",
    ],
    cta: "Open DigitalOcean GPU Droplet pricing via /out/digitalocean. The redirect stays official until Awin is approved.",
    faqs: [
      {
        question: "Is Paperspace pricing the same as GPU Droplets?",
        answer:
          "No. Droplets are one official URL. The additional/dedicated GPU table is another. We do not merge those catalogues.",
      },
    ],
  },
};
