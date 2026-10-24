import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { priceDatasetSchema } from "../lib/schema";

const path = resolve(process.cwd(), "data/prices.json");
const raw = JSON.parse(readFileSync(path, "utf8"));
const parsed = priceDatasetSchema.safeParse(raw);

if (!parsed.success) {
  console.error(parsed.error.flatten());
  process.exit(1);
}

const missingSource = parsed.data.offers.filter((offer) => !offer.sourceUrl);
if (missingSource.length > 0) {
  console.error("Offers missing sourceUrl:", missingSource.map((o) => o.id));
  process.exit(1);
}

const missingChecked = parsed.data.offers.filter((offer) => !offer.checkedAtUtc);
if (missingChecked.length > 0) {
  console.error("Offers missing checkedAtUtc:", missingChecked.map((o) => o.id));
  process.exit(1);
}

console.log(
  `OK: ${parsed.data.offers.length} offers, all have sourceUrl and checkedAtUtc.`,
);
