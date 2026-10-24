/**
 * Pull the latest ECB USD reference rate into data/fx.json.
 * Source: official ECB daily XML feed (not a third-party mirror).
 *
 *   npm run update:fx
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FEED = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
const HTML =
  "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html";

async function main() {
  const response = await fetch(FEED, {
    headers: {
      "User-Agent": "gpuhour.io fx-update/0.1 (official ECB feed; manual ops script)",
    },
  });
  if (!response.ok) {
    throw new Error(`ECB feed HTTP ${response.status}`);
  }
  const xml = await response.text();
  const time = xml.match(/<Cube time='([0-9-]+)'>/)?.[1];
  const usd = xml.match(/<Cube currency='USD' rate='([0-9.]+)'\/>/)?.[1];
  if (!time || !usd) {
    throw new Error("Could not parse USD rate from ECB XML");
  }

  const payload = {
    base: "EUR",
    quote: "USD",
    usdPerEur: Number(usd),
    date: time,
    source: "European Central Bank euro foreign exchange reference rate (USD)",
    sourceUrl: FEED,
    retrievedAtUtc: new Date().toISOString(),
    reuseNote: `ECB reference rates are published for information. Attribution: European Central Bank. Official HTML table: ${HTML}`,
  };

  writeFileSync(
    resolve(process.cwd(), "data/fx.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
  );
  console.log(`Wrote ECB USD rate ${usd} for ${time}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
