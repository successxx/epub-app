export default function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-foreground/10 p-6 text-center">
          <div className="text-3xl font-medium tracking-tight">{it.value}</div>
          <div className="mt-1 text-sm text-foreground/60">{it.label}</div>
        </div>
      ))}
    </div>
  );
}


