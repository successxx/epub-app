"use client";

import { useMemo } from "react";

export default function DynamicPublishedDate({ positionFromLatest, prefix = "Published" }: { positionFromLatest: number; prefix?: string }) {
  const label = useMemo(() => {
    const today = new Date();
    const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const offsetDays = 1 + Math.max(0, positionFromLatest) * 7; // newest = yesterday; then weekly back
    const d = new Date(base);
    d.setDate(base.getDate() - offsetDays);
    return `${prefix} ${d.toLocaleDateString()}`;
  }, [positionFromLatest, prefix]);
  return <span>{label}</span>;
}


