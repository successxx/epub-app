import { ReactNode } from "react";

export default function Timeline({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="relative border-l border-foreground/10 pl-6">
      {items.map((it, i) => (
        <li key={i} className="mb-8">
          <span className="absolute -left-[7px] mt-1 w-3 h-3 rounded-full bg-foreground/40" />
          <div className="text-sm uppercase tracking-widest text-foreground/60">Step {i + 1}</div>
          <div className="text-lg font-medium">{it.title}</div>
          <div className="mt-2 text-foreground/80 text-sm leading-relaxed">{it.body}</div>
        </li>
      ))}
    </ol>
  );
}


