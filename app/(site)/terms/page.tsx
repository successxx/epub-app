// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import { Scale, FileSignature, Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms",
  openGraph: {
    title: "Terms — ePubAI",
    images: [{ url: "/api/og?title=Terms%20of%20Service", width: 1200, height: 630 }],
  },
};

export default function TermsPage() {
  return (
    <>
      <Section>
        <h1 className="text-4xl md:text-5xl tracking-tight">Terms of Service</h1>
        {/* Stat Row (unique) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-foreground/10 p-4">
            <div className="text-sm font-medium flex items-center justify-center gap-2"><FileSignature size={18} /> Ownership</div>
            <div className="mt-1 text-xs text-foreground/70">You own the manuscript and IP.</div>
          </div>
          <div className="rounded-xl border border-foreground/10 p-4">
            <div className="text-sm font-medium flex items-center justify-center gap-2"><Scale size={18} /> Scope</div>
            <div className="mt-1 text-xs text-foreground/70">Website analysis → instant AI-generated book.</div>
          </div>
          <div className="rounded-xl border border-foreground/10 p-4">
            <div className="text-sm font-medium flex items-center justify-center gap-2"><Timer size={18} /> Timelines</div>
            <div className="mt-1 text-xs text-foreground/70">Instant delivery in minutes.</div>
          </div>
        </div>
      </Section>
      <Section>
        {/* Legal Clause List (unique) */}
        <h2 className="text-xl font-medium tracking-tight">Clauses</h2>
        <ol className="mt-4 space-y-3 text-sm text-foreground/80">
          <li><span className="font-medium">1. Scope.</span> ePubAI provides an automated AI service that transforms website content into a publish‑ready book. The deliverable is a complete book with EPUB and PDF formats.</li>
          <li><span className="font-medium">2. Ownership.</span> You own the manuscript and any IP you provide. We retain no rights to your content.</li>
          <li><span className="font-medium">3. Fees and payment.</span> One‑time payment of $499.99 (Starter) or $999.99 (Professional). You retain complete rights and ownership of the generated book. Instant delivery upon completion.</li>
          <li><span className="font-medium">4. Confidentiality.</span> We treat your materials as confidential and will sign NDA on request.</li>
          <li><span className="font-medium">5. Timelines.</span> Books are generated automatically and delivered instantly upon payment completion. Processing typically takes 5-10 minutes.</li>
          <li><span className="font-medium">6. Warranties and disclaimers.</span> The service is provided “as is.” We disclaim implied warranties to the extent permitted by law.</li>
          <li><span className="font-medium">7. Limitation of liability.</span> To the maximum extent permitted, our liability is limited to the fees paid for the service.</li>
          <li><span className="font-medium">8. Governing law.</span> These terms are governed by applicable local law unless otherwise agreed in writing.</li>
        </ol>
      </Section>
    </>
  );
}


