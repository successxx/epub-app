"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-foreground/10 p-5">
        <div className="text-sm font-medium">Thanks — we’ll follow up shortly.</div>
        <div className="mt-1 text-sm text-foreground/70">Keep exploring while we prepare next steps.</div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-background rounded-2xl border border-foreground/10 p-5 shadow-sm">
      <label className="text-sm text-foreground/70" htmlFor="lead-email">What’s your email?</label>
      <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
        <input
          id="lead-email"
          type="email"
          required
          className="rounded-md border border-foreground/15 px-3 py-2 text-sm"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md px-3 py-2 text-sm border border-foreground/15 hover:border-foreground/30"
        >
          {status === "loading" ? "Sending…" : "Get started"}
        </button>
      </div>
      {status === "error" && (
        <div className="mt-2 text-xs text-red-600">Please enter a valid email.</div>
      )}
    </form>
  );
}


