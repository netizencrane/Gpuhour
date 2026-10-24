export function StubNotice({ page }: { page: string }) {
  return (
    <aside className="rounded-lg border border-dashed border-line bg-paper-100 px-4 py-3 text-sm text-ink-600">
      Editorial copy for {page} is a stub for the next PR. The comparison table
      below uses the shared data layer and layout.
    </aside>
  );
}
