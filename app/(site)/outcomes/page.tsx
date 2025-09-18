import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import Split from "../../../components/ui/Split";
import FeatureCard from "../../../components/ui/FeatureCard";
import Stats from "../../../components/ui/Stats";
import { DoorOpen, UsersRound, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Outcomes",
  description:
    "What changes when a book accompanies outreach: higher meeting acceptance, faster internal alignment, standardized language, and compounding reuse.",
  openGraph: {
    title: "Outcomes — ePubAI",
    description:
      "From vendor to voice; quiet consensus; source of truth; compounding leverage.",
    images: [
      { url: "/api/og?title=Featured%20Outcomes%20%E2%80%94%20ePubAI", width: 1200, height: 630 },
    ],
  },
};

export default function OutcomesPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Featured outcomes</h1>
            <p className="text-foreground/80 max-w-3xl">More meetings. Faster yes. One language across the team. Pages you can reuse everywhere.</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/60">
              <span>Updated {new Date().toLocaleDateString()}</span>
              <span aria-hidden>•</span>
              <span>Reading time: ~8–10 min</span>
            </div>
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          <FeatureCard title="Vendor → Voice" icon={<DoorOpen size={22} />}>Open doors with credibility.</FeatureCard>
          <FeatureCard title="Quiet consensus" icon={<UsersRound size={22} />}>Align stakeholders off‑call.</FeatureCard>
          <FeatureCard title="Source of truth" icon={<MessageSquare size={22} />}>Standardize language.</FeatureCard>
          <FeatureCard title="Compounding reuse">Feed content and revenue moments.</FeatureCard>
        </div>
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Ready for more meetings and faster yes?</div>
          <a href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">See pricing</a>
        </div>
      </Section>
      {/* TL;DR / Key Takeaways */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 className="text-lg font-medium tracking-tight">Key takeaways</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1">
            <li>Books change the first impression from vendor to voice.</li>
            <li>Objections move off‑call when they’re handled in writing.</li>
            <li>Shared language shortens cycles and reduces burnout.</li>
          </ul>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Deploy</div><div className="mt-1 text-sm text-foreground/80">LP hero, Email 2, before proposals. Keep copy consistent.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Measure</div><div className="mt-1 text-sm text-foreground/80">LP conversion, chapter completion, reply in 7 days.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Improve</div><div className="mt-1 text-sm text-foreground/80">Move proof near claims. Shorten openers. Ask one small question.</div></div>
        </div>
      </Section>

      {/* Problem → Outcome Intro */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Problem</h2><p className="mt-2 text-sm text-foreground/80">Cold outreach stalls. Calls reset context. Teams repeat themselves. Objections appear live instead of being answered calmly and completely in writing.</p></div>
          <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Outcome</h2><p className="mt-2 text-sm text-foreground/80">A book travels inside buying groups, sets shared language, and invites one small next step—fewer meetings to agreement and better meetings to scope.</p></div>
        </div>
      </Section>

      {/* Numbered Playbook */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 className="text-lg font-medium tracking-tight">Deploy the book in your funnel</h2>
          <ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-2">
            <li>Rewrite the LP headline with audience + problem + promise.</li>
            <li>Place one case or number under the headline.</li>
            <li>Send Email 1 (deliver + promise), 2 (belief shift), 3 (objections + invite).</li>
            <li>Attach the objections chapter with proposals.</li>
            <li>Offer a two‑week pilot with rollback and named owners.</li>
          </ol>
        </div>
      </Section>

      {/* Checklist (Do this next) */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 className="text-lg font-medium tracking-tight">Do this next</h2>
          <ul className="mt-2 text-sm text-foreground/80 space-y-1">
            <li>✔ Draft your audience + problem + promise line.</li>
            <li>✔ Choose the three objections to handle in writing.</li>
            <li>✔ Publish one excerpt; measure replies within 7 days.</li>
          </ul>
        </div>
      </Section>

      {/* Pull Quote */}
      <Section>
        <blockquote className="rounded-xl border-l-4 border-foreground/20 bg-foreground/5 p-5 text-foreground/90 max-w-3xl">
          “Written clarity buys momentum—meetings become decisions.”
          <footer className="mt-2 text-xs text-foreground/60">— Editorial principle</footer>
        </blockquote>
      </Section>

      {/* Callouts */}
      <Section>
        <div className="callout-muted">
          <div className="text-sm uppercase tracking-widest text-foreground/60 mb-1">Note</div>
          Repurpose chapters as slides and emails by copying the <em>ideas</em>, not paragraphs.
        </div>
        <div className="mt-4 callout-accent">
          <div className="text-sm uppercase tracking-widest text-foreground/60 mb-1">Tip</div>
          Move proof beside claims. Numbers and cases work best when they are proximal.
        </div>
      </Section>

      {/* Comparison Table */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5 overflow-x-auto">
          <h2 className="text-lg font-medium tracking-tight">Thin magnet vs Book magnet</h2>
          <table className="table-compact mt-3">
            <thead><tr><th>Criteria</th><th>Thin</th><th>Book</th></tr></thead>
            <tbody>
              <tr><td>Opt‑in intent</td><td>Low</td><td>Medium–High</td></tr>
              <tr><td>Objection handling</td><td>Minimal</td><td>Dedicated chapter</td></tr>
              <tr><td>Internal shareability</td><td>Weak</td><td>Strong</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Definition List */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 className="text-lg font-medium tracking-tight">Definitions</h2>
          <dl className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-foreground/80">
            <div><dt className="font-medium">Belief shift</dt><dd>Replacing an unhelpful assumption with a clearer model.</dd></div>
            <div><dt className="font-medium">Completion</dt><dd>Reader finishes a key chapter (first/objections/final).</dd></div>
            <div><dt className="font-medium">Reply</dt><dd>Direct response within 7 days of sequence.</dd></div>
            <div><dt className="font-medium">Pilot</dt><dd>Small, time‑boxed test with rollback and owners.</dd></div>
          </dl>
        </div>
      </Section>

      {/* FAQ Strip */}
      <Section>
        <div>
          <h2 className="text-lg font-medium tracking-tight">FAQ</h2>
          <details className="mt-3 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">How does this reduce meetings?</summary><p className="mt-2 text-sm text-foreground/80">Stakeholders read off‑call. Questions arrive organized. Calls move to scope and owners.</p></details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">Where should I place the book?</summary><p className="mt-2 text-sm text-foreground/80">LP hero, Email 2, and before proposals. For paid, keep ad → LP headline identical.</p></details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">How do I measure lift?</summary><p className="mt-2 text-sm text-foreground/80">LP conversion, first/objections chapter completion, reply in 7 days, meetings per 100 replies.</p></details>
        </div>
      </Section>

      {/* Pros / Cons */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/80">
          <div>
            <div className="font-medium">Pros</div>
            <ul className="list-disc pl-5 mt-1 space-y-1"><li>Signals authority; earns trust.</li><li>Travels inside buying groups.</li><li>Standardizes language.</li></ul>
          </div>
          <div>
            <div className="font-medium">Cons</div>
            <ul className="list-disc pl-5 mt-1 space-y-1"><li>Requires one owner for voice consistency.</li><li>Needs periodic edit passes.</li></ul>
          </div>
        </div>
      </Section>

      {/* Resource Links */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 className="text-lg font-medium tracking-tight">Resources</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1">
            <li><a className="underline" href="/features">Features</a> — what’s included end‑to‑end.</li>
            <li><a className="underline" href="/how-it-works">How it works</a> — the three‑step method.</li>
            <li><a className="underline" href="/pricing">Pricing</a> — one‑time $5,000; rights retained; up to three minor revisions.</li>
          </ul>
        </div>
      </Section>

      {/* Mini Tabs (CSS‑only) */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5 text-sm" role="tablist" aria-label="Deployment variants">
          <style>{`.vtabs input{display:none}.vtabs label{cursor:pointer;padding:.25rem .5rem;border:1px solid color-mix(in oklab,var(--color-foreground) 15%,transparent);border-radius:.5rem;margin-right:.5rem}.vtabs .panel{display:none;margin-top:.75rem}.vtabs input:checked+label{background:color-mix(in oklab,var(--color-foreground) 5%,transparent)}#v1:checked~#p1,#v2:checked~#p2,#v3:checked~#p3{display:block}`}</style>
          <div className="vtabs">
            <input id="v1" name="vt" type="radio" defaultChecked aria-controls="p1" />
            <label htmlFor="v1">Outbound</label>
            <input id="v2" name="vt" type="radio" aria-controls="p2" />
            <label htmlFor="v2">Partner drop</label>
            <input id="v3" name="vt" type="radio" aria-controls="p3" />
            <label htmlFor="v3">Paid</label>
            <div id="p1" className="panel">Belief‑shift excerpt in Email 2; ask one question; link a chapter.</div>
            <div id="p2" className="panel">Co‑branded excerpt; a three‑sentence intro from the partner; unique link.</div>
            <div id="p3" className="panel">Ad → LP headline identical; proof within first scroll; small invite.</div>
          </div>
        </div>
      </Section>

      <Section>
        <Stats
          items={[
            { value: "+MTGs", label: "More meetings accepted" },
            { value: "Fewer", label: "Objections on first calls" },
            { value: "+Uses", label: "Chapters reused across channels" },
          ]}
        />
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-lg font-medium tracking-tight">Signal that travels</div>
            <div className="mt-2 text-sm text-foreground/80">When a book accompanies outreach, your message travels without you. Champions share chapters internally to establish problem context and evaluation criteria.</div>
            <div className="mt-2 text-sm text-foreground/80">This reduces the burden on live calls and shortens the distance between interest and consensus.</div>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-lg font-medium tracking-tight">Aligned buying groups</div>
            <div className="mt-2 text-sm text-foreground/80">Modern purchases involve multiple stakeholders. A book addresses concerns chapter by chapter—finance, operations, IT—so alignment happens faster.</div>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-lg font-medium tracking-tight">Fewer first‑call objections</div>
            <div className="mt-2 text-sm text-foreground/80">Readers arrive oriented. Early conversations focus on fit and timing instead of definitions and context.</div>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-lg font-medium tracking-tight">Standardized language</div>
            <div className="mt-2 text-sm text-foreground/80">The book becomes the canonical reference for enablement, product, and success—one language across touchpoints.</div>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5 md:col-span-2">
            <div className="text-lg font-medium tracking-tight">Repurposing at speed</div>
            <div className="mt-2 text-sm text-foreground/80">Chapters convert to keynotes, pillar posts, and sequences. You reuse ideas, not paragraphs—selection and sequencing over invention.</div>
          </div>
        </div>
      </Section>
    </>
  );
}


