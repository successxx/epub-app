// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import { Lock, Database, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy",
  openGraph: {
    title: "Privacy — ePubAI",
    images: [{ url: "/api/og?title=Privacy%20Policy", width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Section>
        <h1 className="text-4xl md:text-5xl tracking-tight">Privacy Policy</h1>
        {/* Highlight Row (unique) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border border-foreground/10 p-4">
            <div className="flex items-center gap-2 font-medium"><Lock size={18} /> Security</div>
            <div className="mt-1 text-foreground/70">Least‑privilege access; encryption where supported.</div>
          </div>
          <div className="rounded-xl border border-foreground/10 p-4">
            <div className="flex items-center gap-2 font-medium"><Database size={18} /> Data</div>
            <div className="mt-1 text-foreground/70">Collect only what is necessary to deliver service.</div>
          </div>
          <div className="rounded-xl border border-foreground/10 p-4">
            <div className="flex items-center gap-2 font-medium"><Trash2 size={18} /> Deletion</div>
            <div className="mt-1 text-foreground/70">We honor deletion requests.</div>
          </div>
        </div>
      </Section>
      <Section>
        {/* Lead Intro (unique) */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6">
          <p className="text-foreground/80">
            We collect the minimum information necessary to deliver the ePubAI service and keep your data safe. This policy explains what we collect, why we collect it, and how we handle, retain, and delete it.
          </p>
        </div>
      </Section>
      <Section>
        {/* Feature Grid (Cards) (unique) */}
        <h2 id="data-we-collect" className="text-xl font-medium tracking-tight">Data we collect</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Contact information: name, email, company","Scheduling information for interviews","Interview recordings and transcripts","Project files you choose to share (e.g., decks, memos)","Website analytics (aggregated, privacy‑friendly)"].map((item, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 p-4 text-sm text-foreground/80">{item}</div>
          ))}
        </div>
      </Section>
      <Section>
        {/* Callout—Accent (unique) */}
        <aside className="rounded-xl border border-foreground/20 p-5">
          <h2 id="how-we-use-data" className="text-lg font-medium tracking-tight">How we use data</h2>
          <p className="mt-2 text-sm text-foreground/80">We use your information to schedule the interview, deliver the manuscript, and provide support. Transcripts are used solely to produce your book. We do not sell your data.</p>
        </aside>
      </Section>
      <Section>
        {/* Accordion (Native) (unique) */}
        <h2 id="processors" className="text-xl font-medium tracking-tight">Processors</h2>
        <details className="mt-3 rounded-xl border border-foreground/10 p-4">
          <summary className="cursor-pointer font-medium">Which services are used?</summary>
          <p className="mt-2 text-sm text-foreground/80">We may use third‑party processors for storage and communications. They are vetted for security and used only as required to deliver the service.</p>
        </details>
      </Section>
      <Section>
        {/* Timeline (Vertical) (unique) */}
        <h2 id="retention" className="text-xl font-medium tracking-tight">Retention and deletion</h2>
        <ol className="mt-3 border-l border-foreground/15 pl-4 text-sm text-foreground/80 space-y-3">
          <li><span className="font-medium">During project:</span> recordings and transcripts retained for delivery.</li>
          <li><span className="font-medium">Backup window:</span> short-term backups for resilience.</li>
          <li><span className="font-medium">On request:</span> we delete your data.</li>
        </ol>
      </Section>
      <Section>
        {/* Checklist (unique) */}
        <h2 id="security" className="text-xl font-medium tracking-tight">Security</h2>
        <ul className="mt-3 text-sm text-foreground/80 space-y-2">
          <li>✔ Least‑privilege access</li>
          <li>✔ Encryption in transit; at rest where supported</li>
        </ul>
      </Section>
      <Section>
        {/* Inline Q&A List (unique) */}
        <h2 id="rights" className="text-xl font-medium tracking-tight">Your rights</h2>
        <ul className="mt-3 text-sm text-foreground/80 space-y-2">
          <li><span className="font-medium">Can I get my data?</span> Yes—request a copy any time.</li>
          <li><span className="font-medium">Can you correct or delete it?</span> Yes—email team@epub.ai.</li>
        </ul>
      </Section>
    </>
  );
}


