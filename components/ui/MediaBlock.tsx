import { ReactNode } from "react";

export default function MediaBlock({
  eyebrow,
  title,
  body,
  media,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  body: ReactNode;
  media: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`grid gap-8 md:grid-cols-2 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <div>
        {eyebrow && (
          <div className="text-xs uppercase tracking-widest text-foreground/60 mb-2">{eyebrow}</div>
        )}
        <h3 className="text-xl font-medium tracking-tight">{title}</h3>
        <div className="mt-3 text-foreground/80 text-sm leading-relaxed">{body}</div>
      </div>
      <div className="rounded-2xl border border-foreground/10 p-6 bg-foreground/5">{media}</div>
    </div>
  );
}


