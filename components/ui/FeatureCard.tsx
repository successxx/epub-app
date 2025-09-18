import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-6">
      {icon && <div className="mb-3 opacity-80">{icon}</div>}
      <div className="font-medium mb-2">{title}</div>
      <div className="text-foreground/80 text-sm leading-relaxed">{children}</div>
    </div>
  );
}


