"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const denom = Math.max(scrollHeight - clientHeight, 1);
      const pct = Math.min(Math.max((scrollTop / denom) * 100, 0), 100);
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="reading-progress pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px]">
      <div
        className="reading-progress__bar h-full"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
    </div>
  );
}



