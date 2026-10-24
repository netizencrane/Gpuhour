import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <PageHeader title="Page not found">
        <p>That URL is not in this foundation build.</p>
      </PageHeader>
      <p>
        <Link href="/">Back to the comparison table</Link>
      </p>
    </div>
  );
}
