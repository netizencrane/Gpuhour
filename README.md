# gpuhour.io

GPU-hour rental price comparison. List prices are typed, dated, and sourced from providers' official pricing pages. The site is affiliate-monetised once programmes are approved. Ranking never uses commission.

This repository is the Next.js App Router app for [gpuhour.io](https://gpuhour.io). It is meant to deploy later on Vercel (Pro). This foundation PR does not deploy, change DNS, or create other repos.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- Static / ISR-style pages with URL-parameter filters
- Vercel Analytics and Speed Insights hooks (cookieless)
- Zod-validated `data/prices.json`

## Commands

```bash
npm install
npm run lint
npm run typecheck
npm run validate:prices
npm test
npm run build
npm run dev
```

## How prices are updated

**Hard rule: never scrape. Never invent a number.**

1. Open the provider's official pricing page or official public pricing API. Record the URL.
2. Read the provider's website terms before automating anything. Until that is done, `tosStatus` stays `ToS check pending`.
3. Edit `data/prices.json` (or `scripts/write-seed-prices.mjs` and regenerate with `node scripts/write-seed-prices.mjs`).
4. Every row needs `sourceUrl` and `checkedAtUtc`. The build / `npm run validate:prices` fails without them.
5. If a number cannot be verified, leave `usdPerGpuHour` and `nativeEurPerGpuHour` empty and set `verificationStatus` to `tbd` with `verificationNote: "TBD – needs verification"`.
6. Add a line to `data/changelog.json`.
7. Open a pull request with the diff. Do not merge on an agent's word.

Refresh the ECB USD reference rate (official daily XML, not a mirror):

```bash
npm run update:fx
```

The stored rate is attributed to the European Central Bank. Converted EUR amounts are labelled converted. Native EUR (for example Scaleway) is labelled native.

## Affiliate links

`data/affiliates.json` holds official URLs and placeholder affiliate URLs. Keep `approved: false` until Stefan confirms the programme. `/out/<provider>` redirects to the official URL until then, then to the affiliate URL with `rel="sponsored nofollow noopener"` and an "Annonslänk / affiliate link" label.

## Legal copy

`/privacy`, `/terms`, `/disclosure` and `/about` are drafts. Operator contact and Swedish business details need Stefan's review (`human:review` on OPS-624).
