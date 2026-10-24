import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const LINKS = [
  { href: "/gpu/h100", label: "H100 rental" },
  { href: "/gpu/h200", label: "H200 rental" },
  { href: "/cheapest", label: "Cheapest cloud GPU" },
  { href: "/eu", label: "EU GPU cloud" },
  { href: "/provider/runpod", label: "RunPod pricing" },
  { href: "/compare/h100-vs-h200", label: "H100 vs H200" },
  { href: "/methodology", label: "Methodology" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
  { href: "/disclosure", label: "Affiliate disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-paper-100">
      <div className="page-wrap grid gap-8 py-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-3 text-sm text-ink-600">
          <p className="font-mono font-semibold text-ink-900">{SITE_NAME}</p>
          <p>
            Product names such as H100, H200, B200, A100 and RTX PRO 6000 are
            used only to identify hardware. NVIDIA, provider names and related
            marks are trademarks of their respective owners. {SITE_NAME} is not
            affiliated with, endorsed by, or sponsored by NVIDIA or any listed
            provider.
          </p>
          <p>
            {SITE_NAME} is not the same site as gpuhour.com. A trademark review
            of the GPU Hour name is a separate open item.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
