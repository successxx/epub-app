import Link from "next/link";
import Section from "../components/ui/Section";
import Split from "../components/ui/Split";
import FeatureCard from "../components/ui/FeatureCard";
import Accordion from "../components/ui/Accordion";
import { BookOpen, Timer, Sparkles, Quote, CheckCircle2 } from "lucide-react";
import Reveal from "../components/Reveal";
import type { Metadata } from "next";
import EmailCapture from "../components/EmailCapture";

export const metadata: Metadata = {
  title: "ePub.AI — AI‑Generated Lead Magnet Books for Business Owners",
  description:
    "Turn your website into a ~200‑page lead magnet book in 5 minutes. Automated AI generation, professional quality, instant delivery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ePub.AI — AI‑Generated Lead Magnet Books",
    description:
      "Transform your website into a lead magnet book in 5 minutes.",
    images: [
      {
        url: "/api/og?title=ePub.AI%20%E2%80%94%20AI%E2%80%91Generated%20Books&subtitle=Five%20minutes.%20Your%20website.&bg=slate",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <>
    {/* HERO — psychedelic purple with pipeline bar and embedded CTA panel */}
    <Section>
      <div className="bg-dots rounded-3xl p-6 md:p-8">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div className="space-y-6">
            <div className="badge">For owners who sell online</div>
            <h1 className="text-4xl md:text-6xl tracking-tight">More buyers. Less grind. A book that sells for you.</h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">Give us your website URL. We'll generate a book that pulls leads in, warms them fast, and points them to buy—automated, instant, repeatable.</p>
            {/* premium pipeline bar */}
            <div className="rounded-xl bg-background/40 p-4">
              <div className="pipeline">
                <div className="pipeline__bar" />
                <span className="pipeline__node" style={{ left: "12%" }} />
                <span className="pipeline__node" style={{ left: "38%" }} />
                <span className="pipeline__node" style={{ left: "64%" }} />
                <span className="pipeline__node" style={{ left: "86%" }} />
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/pricing" className="rounded-full px-5 py-3 text-sm border border-foreground/15 hover:border-foreground/30">
                View Pricing
              </Link>
              <Link href="/how-it-works" className="rounded-full px-5 py-3 text-sm border border-foreground/0 hover:border-foreground/20">
                See how it works
              </Link>
            </div>
          </div>
          {/* CTA side card */}
          <EmailCapture />
        </div>
      </div>
    </Section>

      {/* PLAYBOOK GRID */}
      <Section>
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl tracking-tight">Traffic in. Belief up. Sales out.</h2>
          <p className="text-sm text-foreground/70">Short posts fade. This book sticks. It teaches in your voice, handles objections, and ends with one clear next step.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Website → Generate → Deploy" icon={<div className="badge">Process</div>}>
            You provide your URL. AI crafts the book. You drop it into your funnel. Minutes, not weeks.
          </FeatureCard>
          <FeatureCard title="Belief → Proof → Action" icon={<div className="badge">Editorial</div>}>
            Bold premise. Specific proof. One action per chapter. Readers finish—and buy.
          </FeatureCard>
          <FeatureCard title="Use it everywhere" icon={<div className="badge">Leverage</div>}>
            Turn pages into emails, posts, and decks. One asset. Many channels. Compounding reach.
          </FeatureCard>
        </div>
      </Section>

      {/* PURPLE PLATFORM PANEL */}
      <Section>
        <div className="rounded-2xl bg-purple-surface purple-card p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl tracking-tight">Turn cold traffic warm in minutes</h2>
          <p className="mt-2 text-white/80">Capture attention. Change a belief. Invite one next step. The book does the heavy lift while you run the business.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Analysis</div><div className="text-white/80">AI scrapes your website and extracts your voice, value props, and proof points.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Generation</div><div className="text-white/80">Advanced AI crafts 100-250 pages without losing your personality or message.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Delivery</div><div className="text-white/80">Complete EPUB and PDF with cover, ready to deploy as your lead magnet.</div></div>
          </div>
        </div>
      </Section>

      {/* BLOG PREVIEW + DARK CTA BAND */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {["Why AI Books Convert Better","From Website to Lead Magnet","Scale Without Hiring Writers"].map((title) => (
            <div key={title} className="rounded-2xl border border-foreground/10 p-4">
              <div className="h-36 rounded-lg bg-dots" />
              <div className="mt-3 text-lg font-medium tracking-tight">{title}</div>
              <p className="mt-1 text-sm text-foreground/70">Brief insights on automation, conversion, and scaling your lead generation.</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Start with your website URL. We'll carry the rest.</div>
          <Link href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">Start Your Book</Link>
        </div>
      </Section>
    </>
  );
}
