import type { GpuSpecModel, GpuSpecVariant } from "@/lib/gpu-specs";

function cell(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") {
    return "not published";
  }
  return String(value);
}

function VariantColumns({ variants }: { variants: GpuSpecVariant[] }) {
  const rows: { label: string; values: string[] }[] = [
    { label: "Form factor", values: variants.map((item) => cell(item.formFactor)) },
    {
      label: "Memory",
      values: variants.map((item) =>
        item.memoryGb === null
          ? "not published"
          : `${item.memoryGb} GB${item.memoryType ? ` ${item.memoryType}` : ""}`,
      ),
    },
    {
      label: "Memory bandwidth",
      values: variants.map((item) =>
        item.memoryBandwidthTBs === null
          ? "not published"
          : `${item.memoryBandwidthTBs} TB/s`,
      ),
    },
    {
      label: "NVLink",
      values: variants.map((item) =>
        item.nvlinkGBs === null ? "not published" : `${item.nvlinkGBs} GB/s`,
      ),
    },
    { label: "TDP", values: variants.map((item) => cell(item.tdpW)) },
    {
      label: "FP64",
      values: variants.map((item) =>
        item.fp64Tflops === null ? "not published" : `${item.fp64Tflops} TFLOPS`,
      ),
    },
    {
      label: "FP64 Tensor Core",
      values: variants.map((item) =>
        item.fp64TensorTflops === null
          ? "not published"
          : `${item.fp64TensorTflops} TFLOPS`,
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="content-table">
        <caption className="mb-3 text-left text-sm text-ink-600">
          Official NVIDIA figures only. Empty cells mean the cited page does not
          print that number.
        </caption>
        <thead>
          <tr>
            <th scope="col">Spec</th>
            {variants.map((variant) => (
              <th key={variant.id} scope="col">
                {variant.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${index}`}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SpecTable({ spec }: { spec: GpuSpecModel }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Official {spec.displayName} specs
      </h2>
      <p className="max-w-3xl text-ink-700">
        Architecture: {spec.architecture}. These numbers come from NVIDIA&apos;s
        own pages, not from cloud marketing copy.
      </p>
      <VariantColumns variants={spec.variants} />
      <ul className="space-y-1 text-sm text-ink-600">
        {spec.sources.map((source) => (
          <li key={source.url}>
            Source:{" "}
            <a href={source.url} rel="noopener noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
      {spec.variants.some((variant) => variant.notes.length > 0) ? (
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-sm text-ink-600">
          {spec.variants.flatMap((variant) =>
            variant.notes.map((note) => (
              <li key={`${variant.id}-${note}`}>{note}</li>
            )),
          )}
        </ul>
      ) : null}
    </section>
  );
}
