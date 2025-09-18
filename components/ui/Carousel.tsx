"use client";
import { ReactNode, useRef } from "react";

export default function Carousel({ children }: { children: ReactNode[] | ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollBy({ left: dir * (width * 0.9), behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-foreground/60">Swipe or use arrows</div>
        <div className="flex gap-2">
          <button
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="rounded-full border border-foreground/15 hover:border-foreground/30 w-8 h-8 flex items-center justify-center"
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={() => scroll(1)}
            className="rounded-full border border-foreground/15 hover:border-foreground/30 w-8 h-8 flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-4 min-w-full">
          {Array.isArray(children) ? (
            children.map((child, i) => (
              <div key={i} className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%]">
                {child}
              </div>
            ))
          ) : (
            <div className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%]">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}


