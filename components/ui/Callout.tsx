import { ReactNode } from "react";

export default function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-6 bg-foreground/5">
      <div className="text-sm uppercase tracking-widest text-foreground/60 mb-2">{title}</div>
      <div className="text-foreground/90">{children}</div>
    </div>
  );
}


