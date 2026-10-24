import Link from "next/link";

export type RelatedLink = {
  href: string;
  label: string;
};

export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: RelatedLink[];
}) {
  if (links.length === 0) {
    return null;
  }
  return (
    <nav aria-label={title} className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
