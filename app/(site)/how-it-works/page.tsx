import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import FeatureCard from "../../../components/ui/FeatureCard";
import Split from "../../../components/ui/Split";
import Accordion from "../../../components/ui/Accordion";
import Timeline from "../../../components/ui/Timeline";
import Reveal from "../../../components/Reveal";
import { Mic, Sparkles, BookOpen } from "lucide-react";
import StripeBuyButton from "../../../components/StripeBuyButton";
import PurplePanel from "../../../components/ui/PurplePanel";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Website Analysis → AI Generation → Instant Delivery. Five minutes. Your website URL. Voice fidelity preserved; structure automated.",
  openGraph: {
    title: "How It Works — ePub.AI",
    description:
      "Our three‑step method: Website Analysis, AI Generation, Instant Delivery. Five minutes; your website URL.",
    images: [
      {
        url: "/api/og?title=How%20It%20Works&subtitle=Five%20minutes.%20Your%20website.&bg=slate",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">The Three‑Step Method</h1>
            <p className="text-foreground/80 max-w-3xl">
              Website URL in. A finished book out. Clear steps. No guesswork.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard title="Analysis" icon={<Mic size={22} />}>AI scrapes your site—story, proof, next step.</FeatureCard>
            <FeatureCard title="Generation" icon={<Sparkles size={22} />}>Cut fluff. Tighten flow. Keep your voice.</FeatureCard>
            <FeatureCard title="Delivery" icon={<BookOpen size={22} />}>Chapters that move readers to act.</FeatureCard>
          </div>
        </div>
      </Section>
      {/* Steps row */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Step 1</div><div className="mt-1 text-sm text-foreground/80">Website analysis and data extraction.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Step 2</div><div className="mt-1 text-sm text-foreground/80">AI generation with voice preservation.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Step 3</div><div className="mt-1 text-sm text-foreground/80">Structure, format, cover, instant delivery.</div></div>
        </div>
      </Section>

      <Section>
        <Split
          left={
            <div>
              <h2 className="text-xl font-medium tracking-tight">From talk to book</h2>
              <div className="callout-muted mt-3"><div className="text-sm text-foreground/80">We compress time without cutting quality. You already have the ideas—in talks, calls, and notes. We extract them in one focused hour and shape them into a book built to sell.</div></div>
              <div className="callout-accent mt-3"><div className="text-sm text-foreground/80">We start with outcomes—leads, sales, or enablement. That goal guides the interview and the final structure.</div></div>
            </div>
          }
          right={
            <div>
              <h3 className="text-lg font-medium tracking-tight">Clean transcript, clear meaning</h3>
              <div className="callout-muted mt-3"><div className="text-sm text-foreground/80">We fix terms and ambiguity so later steps move fast.</div></div>
              <h3 className="text-lg font-medium tracking-tight mt-4">Structure that carries sales</h3>
              <div className="callout-accent mt-3"><div className="text-sm text-foreground/80">Each chapter opens with a promise, proves it, and ends with one action.</div></div>
            </div>
          }
        />
      </Section>

      <Section>
        <Split
          reverse
          left={
            <div>
              <h3 className="text-lg font-medium tracking-tight">Your voice, kept</h3>
              <div className="callout-muted mt-3"><div className="text-sm text-foreground/80">We edit for clarity while preserving tone and phrasing. Personality stays; friction goes. Style matches your audience.</div></div>
              <h3 className="text-lg font-medium tracking-tight mt-4">Research alignment</h3>
              <div className="callout-accent mt-3"><div className="text-sm text-foreground/80">Claims anchor credibility. We align references where appropriate without turning the book into a white paper.</div></div>
            </div>
          }
          right={
            <div>
              <h2 className="text-xl font-medium tracking-tight">Reviews and delivery</h2>
              <div className="callout-muted mt-3"><div className="text-sm text-foreground/80">You receive a cohesive book with chapter summaries and practical guidance for formatting and distribution. Delivery is measured in weeks, not months.</div></div>
              <h2 className="text-xl font-medium tracking-tight mt-4">Design, accessibility, and motion</h2>
              <div className="callout-accent mt-3"><div className="text-sm text-foreground/80">Generous grid, legible type, restrained motion, accessible contrast, visible focus states, and logical headings.</div></div>
            </div>
          }
        />
      </Section>

      <Section>
        <Reveal>
          <Timeline
            items={[
              { title: "Analysis", body: "AI scrapes your website to extract story, proof, and differentiators." },
              { title: "Generation", body: "AI creates, structures, and edits for momentum and voice." },
              { title: "Delivery", body: "100-250 pages with cover and formatting—ready to put to work." },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <PurplePanel>
          <h2 className="text-2xl md:text-3xl tracking-tight">A platform‑feel process</h2>
          <p className="mt-2 text-white/80">The same disciplined steps, every time—so outcomes are consistent and fast.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Outcomes</div><div className="text-white/80">Alignment sets direction and scope.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Structure</div><div className="text-white/80">Chapters map to decisions buyers must make.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Summaries</div><div className="text-white/80">Reusable paragraphs for LPs, emails, and decks.</div></div>
          </div>
        </PurplePanel>
      </Section>

      <Section>
        <Accordion
          items={[
            {
              title: "Why this method works",
              content:
                "Bandwidth is the true constraint. A single, well‑designed interview externalizes judgment at depth without months of drafting. The result is a 24/7 asset for buying groups and teams.",
            },
            {
              title: "What we deliver",
              content:
                "A ~200‑page, voice‑true manuscript with summaries and options for front/back matter, plus practical steps for formatting and publishing.",
            },
            {
              title: "Time required",
              content:
                "About one hour for the interview and a decisive review cycle. We carry the rest with care.",
            },
            {
              title: "Ready to start now?",
              content: (
                <div className="max-w-md">
                  <StripeBuyButton />
                </div>
              ),
            },
          ]}
        />
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">See the full method in action</div>
          <a href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">Get started</a>
        </div>
      </Section>
    </>
  );
}


