"use client";
import { ReactNode, useState } from "react";

export default function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="divide-y divide-foreground/10 rounded-2xl border border-foreground/10">
      {items.map((item, idx) => (
        <div key={idx} className="p-5">
          <button
            className="w-full text-left flex items-center justify-between gap-4"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="font-medium">{item.title}</span>
            <span className="text-foreground/60">{openIndex === idx ? "−" : "+"}</span>
          </button>
          {openIndex === idx && <div className="mt-3 text-foreground/80 text-sm leading-relaxed">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}


