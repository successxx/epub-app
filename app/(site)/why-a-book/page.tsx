import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import Split from "../../../components/ui/Split";
import FeatureCard from "../../../components/ui/FeatureCard";
import Accordion from "../../../components/ui/Accordion";
import Stats from "../../../components/ui/Stats";
import StripeBuyButton from "../../../components/StripeBuyButton";
import { LineChart, BookOpen, Handshake } from "lucide-react";
import PurplePanel from "../../../components/ui/PurplePanel";

export const metadata: Metadata = {
  title: "Why a Book",
  description:
    "Unlock the power of a lead magnet book. Build authority, create tangible value, simplify nurturing, and automate scalable lead generation.",
  openGraph: {
    title: "Why a Book — ePubAI",
    description:
      "Books outperform typical lead magnets. They build trust, reduce funnel friction, and automate high‑quality lead gen.",
    images: [
      {
        url: "/api/og?title=Why%20a%20Book&subtitle=The%20ultimate%20lead%20magnet&bg=light",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function WhyABookPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Why a book</h1>
            <p className="text-foreground/80 max-w-3xl">
              A book earns trust, handles objections, and points to your offer—on autopilot.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard title="Authority" icon={<BookOpen size={22} />}>Look like the obvious choice in a noisy feed.</FeatureCard>
            <FeatureCard title="Conversion" icon={<Handshake size={22} />}>Lead with value, then invite the next step.</FeatureCard>
            <FeatureCard title="Compounding" icon={<LineChart size={22} />}>Reuse pages as posts, emails, and talks.</FeatureCard>
          </div>
        </div>
      </Section>

      <Section>
        <Stats
          items={[
            { value: "24/7", label: "Asset working for you" },
            { value: "100-250", label: "Pages of clear thinking" },
            { value: "5 min", label: "Your time to start" },
          ]}
        />
      </Section>

      <Section>
        <PurplePanel>
          <h2 className="text-2xl md:text-3xl tracking-tight">Why it beats thin magnets</h2>
          <p className="mt-2 text-white/80">Substance travels. Chapters handle objections and build consensus without pressure.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Authority</div><div className="text-white/80">Depth earns trust and replies.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Portability</div><div className="text-white/80">Belief travels inside buying groups.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Momentum</div><div className="text-white/80">Objections move off‑call, decisions move faster.</div></div>
          </div>
        </PurplePanel>
      </Section>

      <Section>
        <Split
          left={<article className="prose prose-invert"><h2>Build instant authority</h2><p>In crowded markets, authority wins attention. A book competes on clarity and completeness.</p></article>}
          right={<article className="prose prose-invert"><h2>Create tangible value</h2><p>Books feel substantial. Prospects exchange contact info for resources they believe will help.</p></article>}
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Simplify lead nurturing">A book sustains engagement beyond a click, teaching your language and method.</FeatureCard>
          <FeatureCard title="Reduce funnel friction">Lead with generosity so the next step feels natural, not forced.</FeatureCard>
          <FeatureCard title="Automate at scale">Once created, the book works 24/7 with light sequences and steady distribution.</FeatureCard>
        </div>
      </Section>

      {/* TL;DR / Lead intro */}
      <Section>
        <div className="callout-muted">
          <div className="text-sm font-medium">Why a book? The ultimate lead magnet</div>
          <p className="mt-2 text-sm text-foreground/80">A book is a value‑packed, trust‑building asset that does the heavy lifting in your funnel. Here’s why it wins.</p>
          <p className="mt-2 text-sm text-foreground/80">In today’s digital world, building a successful online business means capturing and nurturing high‑quality leads. Whether you’re an internet entrepreneur, a business owner, or someone using funnels to scale your online presence, you need a lead magnet that not only attracts but also engages. A book does both—at depth, on autopilot.</p>
        </div>
      </Section>

      {/* Three-up benefits (1‑3) */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Build instant authority and credibility">
            In crowded markets, authority wins attention. A book gives you immediate credibility and positions you as an expert. Prospects perceive depth, discipline, and proof—not hype.
          </FeatureCard>
          <FeatureCard title="Create tangible value people want">
            Books carry psychological weight. They feel substantial. People will trade their contact info—and their time—for a resource that helps them think and act.
          </FeatureCard>
          <FeatureCard title="Simplify lead generation and nurturing">
            Most magnets are a moment. A book is a journey. It teaches your language, shapes beliefs, and keeps readers engaged long after the click.
          </FeatureCard>
        </div>
      </Section>

      {/* Three-up benefits (4‑6) */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Seamless transition to your offer">
            Value first, invitation second. A book creates a natural bridge from insight to next step—diagnostic, demo, or direct purchase—without the hard pivot.
          </FeatureCard>
          <FeatureCard title="Automated, scalable lead generation">
            Once created, your book runs 24/7. Pair it with a clean landing page and light sequences. Traffic in, qualified conversations out.
          </FeatureCard>
          <FeatureCard title="Remove funnel friction">
            Lower the barrier. Lead with generosity. The result: more opt‑ins, better fit, stronger replies.
          </FeatureCard>
        </div>
      </Section>

      {/* Pain removers */}
      <Section>
        <Split
          left={<div className="callout-accent"><div className="text-sm font-medium">How a book removes common pains</div><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li><strong>Stop chasing cold leads.</strong> A book attracts warm, self‑selecting readers who want what you teach.</li><li><strong>Build trust from the start.</strong> The exchange is clear: you give real value; they lean in.</li><li><strong>Eliminate guesswork.</strong> Chapters form a built‑in nurturing path that leads to your offer.</li></ul></div>}
          right={<div className="rounded-2xl border border-foreground/10 p-5"><div className="text-sm font-medium">Transform your lead generation with a book</div><p className="mt-2 text-sm text-foreground/80">With a book, you build authority, create lasting engagement, and automate lead generation. It's a proven strategy that compounds over time—fueling posts, keynotes, and sequences.</p><p className="mt-2 text-sm text-foreground/80">Let ePub.AI help you create the ultimate lead‑magnet book—an asset that works around the clock, attracts qualified leads, and converts them into loyal customers.</p><div className="mt-3"><a href="/pricing" className="rounded-full px-5 py-3 text-sm border border-foreground/15 hover:border-foreground/30">View Pricing</a></div></div>}
        />
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Start with your website URL. We'll carry the rest.</div>
          <a href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">Start Your Book</a>
        </div>
      </Section>
    </>
  );
}


