import { fxRate } from "@/lib/fx";

export function VatNote() {
  return (
    <p className="note">
      Prices exclude VAT unless stated. B2B reverse charge may apply; check with
      the provider. EUR amounts marked converted use the ECB reference rate of{" "}
      <strong>1 EUR = {fxRate.usdPerEur} USD</strong> on {fxRate.date} (
      <a href={fxRate.sourceUrl}>ECB daily XML</a>
      ). Native EUR prices are labelled separately.
    </p>
  );
}
