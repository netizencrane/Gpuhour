export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        {title}
      </h1>
      {children ? (
        <div className="max-w-3xl space-y-3 text-base leading-7 text-ink-700">
          {children}
        </div>
      ) : null}
    </header>
  );
}
