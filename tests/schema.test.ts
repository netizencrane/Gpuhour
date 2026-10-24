import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { TABLE_COLUMNS } from "../lib/columns";
import { filterOffers, sortOffers } from "../lib/filters";
import { usdEquivalent } from "../lib/prices";
import { priceDatasetSchema, type PriceOffer } from "../lib/schema";

const dataset = priceDatasetSchema.parse(
  JSON.parse(readFileSync(new URL("../data/prices.json", import.meta.url), "utf8")),
);

describe("price dataset", () => {
  it("has a source URL and checked time on every row", () => {
    for (const offer of dataset.offers) {
      assert.ok(offer.sourceUrl.startsWith("http"), offer.id);
      assert.ok(offer.checkedAtUtc.length > 0, offer.id);
    }
  });

  it("does not invent prices on TBD rows", () => {
    for (const offer of dataset.offers.filter((row) => row.verificationStatus === "tbd")) {
      assert.equal(offer.usdPerGpuHour, null, offer.id);
      assert.equal(offer.nativeEurPerGpuHour, null, offer.id);
    }
  });

  it("covers at least three verified providers for H100, H200, B200 and A100", () => {
    for (const gpu of ["H100", "H200", "B200", "A100"] as const) {
      const providers = new Set(
        dataset.offers
          .filter((offer) => offer.gpu === gpu && offer.verificationStatus === "verified")
          .map((offer) => offer.providerSlug),
      );
      assert.ok(providers.size >= 3, `${gpu} only has ${[...providers].join(", ")}`);
    }
  });
});

describe("comparison table spec", () => {
  it("defines 11 columns", () => {
    assert.equal(TABLE_COLUMNS.length, 11);
    assert.deepEqual(
      TABLE_COLUMNS.map((column) => column.id),
      [
        "gpu",
        "provider",
        "config",
        "pricingType",
        "region",
        "price",
        "billing",
        "stock",
        "source",
        "checked",
        "linkType",
      ],
    );
  });
});

describe("ranking", () => {
  it("never reads commission or affiliate approval when sorting", () => {
    const cheap: PriceOffer = {
      ...dataset.offers[0],
      id: "cheap-direct",
      usdPerGpuHour: 1,
      nativeEurPerGpuHour: null,
      verificationStatus: "verified",
      pricingType: "on-demand",
      stock: "not-reported",
      linkType: "direct",
    };
    const expensiveAffiliate: PriceOffer = {
      ...cheap,
      id: "expensive-affiliate",
      usdPerGpuHour: 9,
      linkType: "affiliate",
    };
    const sorted = sortOffers([expensiveAffiliate, cheap], {
      key: "price",
      dir: "asc",
    });
    assert.equal(sorted[0].id, "cheap-direct");
    assert.ok(!("commission" in cheap));
  });

  it("EU filter keeps only stated EU/EEA regions", () => {
    const eu = filterOffers(dataset.offers, { eu: true });
    assert.ok(eu.length > 0);
    for (const offer of eu) {
      assert.equal(offer.eu, true);
    }
  });

  it("default price sort puts TBD rows last", () => {
    const sorted = sortOffers(dataset.offers, { key: "price", dir: "asc" });
    const firstTbd = sorted.findIndex((offer) => usdEquivalent(offer) === null);
    const lastPriced = [...sorted]
      .reverse()
      .findIndex((offer) => usdEquivalent(offer) !== null);
    if (firstTbd !== -1) {
      assert.ok(sorted.length - 1 - lastPriced <= firstTbd || lastPriced === -1);
      assert.equal(usdEquivalent(sorted[sorted.length - 1]), null);
    }
  });
});
