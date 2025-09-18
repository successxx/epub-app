import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import FeatureCard from "../../../components/ui/FeatureCard";
import Carousel from "../../../components/ui/Carousel";
import Stats from "../../../components/ui/Stats";
import MediaBlock from "../../../components/ui/MediaBlock";
const chris = "/videos/chris.mp4";
const bridget = "/videos/bridget.mp4";
import StripeBuyButton from "../../../components/StripeBuyButton";
import { Building2, LineChart, Target } from "lucide-react";
import PurplePanel from "../../../components/ui/PurplePanel";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Anonymized narratives that show how a voice‑true book changed pipeline, alignment, and enablement.",
  openGraph: {
    title: "Case Studies — ePubAI",
    description: "Calm proof at depth across industries.",
    images: [{ url: "/api/og?title=Case%20Studies&subtitle=Calm%20proof%20at%20depth", width: 1200, height: 630 }],
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Blog Hero */}
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Case studies</h1>
            <p className="text-foreground/80 max-w-3xl">Short reads on how a book placed before the offer raised opt‑ins, replies, and revenue.</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/60"><span>Updated {new Date().toLocaleDateString()}</span><span aria-hidden>•</span><span>Reading time: ~10–12 min</span></div>
          </div>
        </div>
        <Carousel>
          <FeatureCard title="Enterprise SaaS" icon={<Building2 size={22} />}>Elevated first impressions; faster security and vendor reviews.</FeatureCard>
          <FeatureCard title="Advisory firm" icon={<Target size={22} />}>Prospects self‑qualify and arrive with focused questions.</FeatureCard>
          <FeatureCard title="Growth team" icon={<LineChart size={22} />}>Chapters repurposed into sequences and product education.</FeatureCard>
          <FeatureCard title="Healthcare" icon={<Building2 size={22} />}>Buying groups aligned off‑call; fewer cycles to yes.</FeatureCard>
          <FeatureCard title="Coaching" icon={<Target size={22} />}>Method taught with kindness and proof; more qualified sessions.</FeatureCard>
          <FeatureCard title="Agency" icon={<Building2 size={22} />}>Proof at depth that travels inside buying groups; wins without pressure.</FeatureCard>
          <FeatureCard title="Executive comms" icon={<LineChart size={22} />}>Cross‑functional alignment; fewer revisions, faster sign‑off.</FeatureCard>
        </Carousel>
      </Section>

      {/* Inline Metrics Row */}
      <Section>
        <Stats items={[{ value: "+31%", label: "LP opt‑ins" }, { value: "2.4×", label: "Replies vs list avg" }, { value: "−30%", label: "First‑call objections" }]} />
      </Section>
      {/* Quote strip */}
      <Section>
        <blockquote className="rounded-xl border-l-4 border-foreground/20 bg-foreground/5 p-5 text-foreground/90 max-w-3xl">
          “We stopped debating hypotheticals. The writing made approval easy.”
          <footer className="mt-2 text-xs text-foreground/60">— Director of Security</footer>
        </blockquote>
      </Section>
      <Section>
        <PurplePanel>
          <h2 className="text-2xl md:text-3xl tracking-tight">Calm proof at depth</h2>
          <p className="mt-2 text-white/80">Use chapters as portable evidence—before calls, in proposals, and post‑sale.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">LP + Emails</div><div className="text-white/80">Consistent promise and proof lift opt‑ins and replies.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Pre‑call</div><div className="text-white/80">Readers arrive aligned; calls move to scope.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Proposals</div><div className="text-white/80">Objections handled in writing reduce cycles.</div></div>
          </div>
        </PurplePanel>
      </Section>

      {/* Problem → Outcome Intro */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Problem</h2><p className="mt-2 text-sm text-foreground/80">Cold funnels stall. Costs climb. Calls reset context. Buyers don’t share your language.</p></div>
          <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Outcome</h2><p className="mt-2 text-sm text-foreground/80">The book builds belief before the call, aligns the group, and asks for one clear step.</p></div>
        </div>
      </Section>

      {/* Case 1 */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-xs uppercase tracking-widest text-foreground/60">Case 1</div>
            <div className="mt-2 text-lg font-medium tracking-tight">Enterprise SaaS, security‑first buyers</div>
            <div className="mt-2 text-sm text-foreground/80">We placed a 6‑page objections chapter before proposals. Security and finance read off‑call. The first alignment call moved directly to scope. Time‑to‑pilot dropped three weeks. The same chapter became a FAQ inside the procurement portal.</div>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-sm font-medium">Playbook</div>
            <ol className="mt-2 list-decimal pl-5 text-sm text-foreground/80 space-y-1">
              <li>Map objections by role (IT/Sec, Finance, Ops).</li>
              <li>Write the objection in their words; agree with what’s true.</li>
              <li>Add one case and one number beside each reframing.</li>
              <li>Offer a two‑week pilot with rollback and owners.</li>
            </ol>
            <blockquote className="mt-3">“We stopped debating hypotheticals. The writing made approval easy.” — Director of Security</blockquote>
          </div>
        </div>
      </Section>

      {/* Case 2 */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-xs uppercase tracking-widest text-foreground/60">Case 2</div>
            <div className="mt-2 text-lg font-medium tracking-tight">Advisory firm, outbound + partner drops</div>
            <div className="mt-2 text-sm text-foreground/80">One belief‑shift chapter powered outbound and a co‑branded partner drop. Opt‑ins rose from ~14% to ~29% on a calmer page. Replies doubled because the ask was a single question from Email 2.</div>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-sm font-medium">Do this next</div>
            <ul className="mt-2 text-sm text-foreground/80 space-y-1 list-disc pl-5">
              <li>Rewrite the LP headline with audience + problem + promise.</li>
              <li>Place a short case under the headline. No scrolling for proof.</li>
              <li>Send one co‑branded excerpt to a trusted newsletter.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Case 3 */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-xs uppercase tracking-widest text-foreground/60">Case 3</div>
            <div className="mt-2 text-lg font-medium tracking-tight">Growth team, product education</div>
            <div className="mt-2 text-sm text-foreground/80">Method and glossary chapters became training for new hires and product education for users. Support tickets dropped. Sales and product used the same phrases. Demos felt familiar because readers arrived primed.</div>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-sm font-medium">Pros / Cons</div>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/80 mt-2">
              <div><div className="font-medium">Pros</div><ul className="list-disc pl-5 mt-1 space-y-1"><li>Shared language across teams.</li><li>Lower support load.</li><li>Faster approvals.</li></ul></div>
              <div><div className="font-medium">Cons</div><ul className="list-disc pl-5 mt-1 space-y-1"><li>Requires one owner for voice consistency.</li><li>Needs periodic edit passes.</li></ul></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials + Videos */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Chris Atkins — Group of Nations Publications">Professionalism and opportunity in the AI‑book process.</FeatureCard>
          <FeatureCard title="Brittany Fowler — Browning Associates">“It reads like me—organized, methodical, clear.”</FeatureCard>
          <FeatureCard title="Bridget Hom — Stuck On Ready">100 appointments in week one using the book in outreach.</FeatureCard>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <MediaBlock title="Founder story" body={<p>Anonymized clip: belief shift and method in two minutes.</p>} media={<video className="w-full" src={bridget} controls />} />
          <MediaBlock title="Client perspective" body={<p>Why a calm, voice‑true book changed first impressions.</p>} media={<video className="w-full" src={chris} controls />} />
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

      {/* FAQ Strip with payment terms */}
      <Section>
        <div>
          <h2 className="text-lg font-medium tracking-tight">FAQ</h2>
          <details className="mt-3 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">How do we start?</summary><p className="mt-2 text-sm text-foreground/80">A single 60‑minute interview. We carry the rest.</p></details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">Payment terms?</summary><p className="mt-2 text-sm text-foreground/80">One‑time payment of $5,000. You retain full rights and ownership. Up to three minor revisions included.</p></details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">Timeline?</summary><p className="mt-2 text-sm text-foreground/80">Weeks, not months—most time is review and packaging.</p></details>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Ready to put a book in front of your offer?</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. One hour in; a publish‑ready book out—built to teach, persuade, and convert.</p>
          <div className="mt-3 max-w-xs"><StripeBuyButton /></div>
        </div>
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Start with one hour. We’ll carry the rest.</div>
          <a href="https://buy.stripe.com/4gM5kEbLy4E28hZdo25c40x" target="_blank" rel="noopener noreferrer" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">Start Your Book</a>
        </div>
      </Section>
    </>
  );
}


