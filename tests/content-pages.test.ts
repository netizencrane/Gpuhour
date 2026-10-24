import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { COMPARE_COPY } from "../content/compares";
import { GPU_COPY } from "../content/gpus";
import { PROVIDER_COPY } from "../content/providers";
import { getGpuSpec } from "../lib/gpu-specs";
import { cheapestPerGpu, variantStats } from "../lib/offer-stats";
import { getOffers, offersForGpu, usdEquivalent } from "../lib/prices";
import { COMPARE_SLUGS, GPU_MODELS, GPU_SLUGS } from "../lib/site";

const specs = JSON.parse(
  readFileSync(new URL("../data/gpu-specs.json", import.meta.url), "utf8"),
);

describe("official GPU specs", () => {
  it("covers every GPU model with a product URL and no invented empties-as-zero", () => {
    for (const gpu of GPU_MODELS) {
      const spec = getGpuSpec(gpu);
      assert.ok(spec.productUrl.startsWith("https://www.nvidia.com"), gpu);
      assert.ok(spec.variants.length >= 1, gpu);
      for (const variant of spec.variants) {
        if (variant.memoryGb !== null) {
          assert.ok(variant.memoryGb > 0, variant.name);
        }
      }
    }
  });

  it("keeps B200 memory at NVIDIA's 180 GB, not a cloud 192 GB guess", () => {
    const b200 = specs.models.B200.variants[0];
    assert.equal(b200.memoryGb, 180);
  });
});

describe("cheapest and variant summaries", () => {
  it("never treats not-reported stock as in-stock", () => {
    for (const row of cheapestPerGpu(getOffers())) {
      if (row.cheapest) {
        assert.notEqual(row.cheapest.stock, "in-stock");
      }
      assert.equal(row.inStockCount, 0);
    }
  });

  it("marks H100 variants with fewer than three verified providers as insufficient data", () => {
    const stats = variantStats(offersForGpu("H100"));
    assert.ok(stats.length >= 2);
    for (const row of stats) {
      assert.equal(row.insufficientData, row.verifiedProviders.length < 3);
    }
  });

  it("does not invent Vast.ai prices", () => {
    const vast = getOffers().filter((offer) => offer.providerSlug === "vast-ai");
    assert.ok(vast.length > 0);
    for (const offer of vast) {
      assert.equal(offer.verificationStatus, "tbd");
      assert.equal(usdEquivalent(offer), null);
    }
  });
});

describe("editorial copy", () => {
  it("has GPU, featured provider and compare copy for every routed slug", () => {
    for (const slug of Object.keys(GPU_SLUGS)) {
      assert.ok(GPU_COPY[slug as keyof typeof GPU_COPY].h1.length > 10, slug);
    }
    for (const slug of ["runpod", "vast-ai", "lambda", "coreweave", "nebius", "digitalocean"]) {
      assert.ok(PROVIDER_COPY[slug].overview.length >= 2, slug);
    }
    for (const slug of COMPARE_SLUGS) {
      assert.ok(COMPARE_COPY[slug].intro.length >= 1, slug);
    }
  });
});

describe("Hetzner official dedicated rows", () => {
  it("only includes Hetzner where an official hourly rate was published", () => {
    const hetzner = getOffers().filter((offer) => offer.providerSlug === "hetzner");
    assert.equal(hetzner.length, 4);
    for (const offer of hetzner) {
      assert.equal(offer.gpu, "RTX PRO 6000");
      assert.equal(offer.eu, true);
      assert.equal(offer.publishedCurrency, "EUR");
      assert.ok((offer.nativeEurPerGpuHour ?? 0) > 0);
      assert.ok(offer.sourceUrl.startsWith("https://www.hetzner.com/"));
    }
    assert.equal(
      getOffers().filter((offer) => offer.providerSlug === "hetzner" && offer.gpu === "H100")
        .length,
      0,
    );
  });
});
