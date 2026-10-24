export function ProsCons({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section>
        <h2 className="text-xl font-semibold tracking-tight">What the public record supports</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-700">
          {pros.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold tracking-tight">Limits we can state</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-700">
          {cons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
