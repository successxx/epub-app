"use client";
import { useEffect, useRef } from "react";

const TYPEFORM_SRC = "https://embed.typeform.com/next/embed.js";

export default function TypeformEmbed({ id }: { id: string }) {
  const mountedRef = useRef(false);

  useEffect(() => {
    // Force a fresh scan of data-tf-* nodes on client navigation by
    // re‑adding the script. This avoids cases where the library was loaded
    // before and didn’t initialize newly rendered nodes after a route change.
    const reloadScript = () => {
      document.querySelectorAll(`script[src="${TYPEFORM_SRC}"]`).forEach((s) => s.remove());
      const script = document.createElement("script");
      script.src = TYPEFORM_SRC;
      script.async = true;
      document.body.appendChild(script);
    };

    // On first mount or when ID changes, reload to ensure initialization.
    reloadScript();
    mountedRef.current = true;

    return () => {
      // Keep the script for other pages; no cleanup to preserve caching.
    };
  }, [id]);

  return <div data-tf-live={id} />;
}


