import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const NAV = [
  { href: "/", label: "Compare" },
  { href: "/cheapest", label: "Cheapest" },
  { href: "/eu", label: "EU" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper-50">
      <div className="page-wrap flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-mono text-lg font-semibold tracking-tight text-ink-900">
            {SITE_NAME}
          </Link>
          <p className="text-sm text-ink-500">Sourced GPU-hour list prices</p>
        </div>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
