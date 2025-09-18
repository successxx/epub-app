import { ReactNode } from "react";

export default function PurplePanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-purple-surface purple-card p-6 md:p-8 text-white ${className}`}>
      {children}
    </div>
  );
}


