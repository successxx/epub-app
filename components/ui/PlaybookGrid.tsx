import { ReactNode } from "react";

export default function PlaybookGrid({ children }: { children: ReactNode }) {
  return <div className="grid md:grid-cols-3 gap-6">{children}</div>;
}


