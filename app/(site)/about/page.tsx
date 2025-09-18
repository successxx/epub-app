import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import Split from "../../../components/ui/Split";
import FeatureCard from "../../../components/ui/FeatureCard";
import Stats from "../../../components/ui/Stats";
import MediaBlock from "../../../components/ui/MediaBlock";
import Reveal from "../../../components/Reveal";
import { LayoutGrid, Type, MousePointerClick } from "lucide-react";

export const metadata: Metadata = {
  title: "ePubAI — AI‑Crafted Ghostwritten Books for Founders and Teams",
  description:
    "AI‑generated lead magnet books, in your voice. Premium automated process delivering a publish‑ready book in 5 minutes.",
  keywords: [
    "AI ghostwriting",
    "interview to book",
    "founder book",
    "authority marketing",
    "B2B content book",
    "ePubAI Stellato",
  ],
  openGraph: {
    title: "ePubAI — AI‑Crafted Ghostwritten Books",
    description:
      "AI‑generated lead magnet books, in your voice. Premium automated process delivering a publish‑ready book in 5 minutes.",
    images: [
      { url: "/api/og?title=ePubAI&subtitle=AI%E2%80%91Crafted%20Ghostwritten%20Books&bg=light", width: 1200, height: 630 },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl tracking-tight">About</h1>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard title="Structure" icon={<LayoutGrid size={22} />}>Clear architecture that reduces cognitive load.</FeatureCard>
            <FeatureCard title="Typography" icon={<Type size={22} />}>Legible systems that reward long reading.</FeatureCard>
            <FeatureCard title="Interaction" icon={<MousePointerClick size={22} />}>Motion as seasoning, not spectacle.</FeatureCard>
          </div>
        </div>
      </Section>
      <Section>
        <Stats items={[{ value: "Calm", label: "Design ethic" }, { value: "Clarity", label: "Editorial aim" }, { value: "Care", label: "Delivery standard" }]} />
      </Section>

      <Section>
        <article className="prose prose-invert max-w-none">
          <h2>Stories that sell, not just stories that sound good</h2>
          <p>Some entrepreneurs tell a story and the room leans in. Others tell a story and the room scrolls. The difference isn’t charisma. It’s structure, proof, and a clear next step.</p>
          <p>Imagine a book that does both—tells your story and sells your offer. Not loud. Not pushy. Just clear, specific, and useful.</p>
          <h3>Closer than it sounds</h3>
          <p>In a couple of weeks you’re holding your own book. Your ideas, your voice—captured, edited, and optimized for readers who become buyers. Built to attract, engage, and convert without feeling like a brochure.</p>
          <h3>The process</h3>
          <ol>
            <li><strong>We interview you.</strong> One focused hour that surfaces judgment, language, and examples.</li>
            <li><strong>We transcribe and outline.</strong> Moments become chapters; chapters become a clean arc.</li>
            <li><strong>We elevate with tooling.</strong> Advanced models help us polish, tighten, and package—voice intact.</li>
          </ol>
          <h3>What it’s worth</h3>
          <p>A book that works while you sleep is an asset. It teaches for you. It handles objections for you. It invites the next step for you. Clients quote it back. Peers wonder what changed.</p>
          <h3>Two years from now</h3>
          <p>You’re in your favorite chair. Work feels calmer. Revenue is steadier. Not from book sales alone—but from the deals your book keeps making easier to start and easier to close.</p>
          <h3>Objections, answered</h3>
          <p>Will it sound like you? Yes—because we keep your phrasing where it matters. Will it work? It works when it’s specific, honest, and placed well. That’s the standard we hold.</p>
          <h3>What this is</h3>
          <p>An amplifier, not a replacement. Your language—stronger. Your proof—closer to claims. Your next step—smaller and safer. A book that acts like a quiet, tireless teammate.</p>
          <h3>Your move</h3>
          <p>If you’re ready to turn your words into a working asset, we’ll make the first hour count—and carry the rest with care.</p>
        </article>
      </Section>
      <Section>
        <Reveal>
          <MediaBlock
            eyebrow="Editorial"
            title="Simple process. Strong words. Real buyers."
            body={<p>We ask smart questions. We keep your voice. We write a book people read and then buy from.</p>}
            media={<div className="text-sm text-foreground/70">Interview → Structure → Delivery</div>}
          />
        </Reveal>
      </Section>
      <Section>
        <MediaBlock
          reverse
          eyebrow="Why a book"
          title="Trust, at depth"
          body={<p>Short posts fade. A book teaches, frames, and travels inside buying groups. It becomes the source of truth teams adopt.</p>}
          media={<div className="text-sm text-foreground/70">Portable proof. Clear language. Fewer cycles.</div>}
        />
      </Section>
      {/* Why a Book, Why Now */}
      <Section>
        <div className="rounded-2xl border border-foreground/10 p-5">
          <div className="text-lg font-medium tracking-tight">Why a Book, Why Now</div>
          <div className="mt-2 text-sm text-foreground/80">Your market is saturated with posts and pitches. Substance wins—clarity, authority, and consistency. A book becomes your 24/7 client‑acquisition asset: tangible, portable proof that informs, persuades, and converts while you sleep.</div>
        </div>
      </Section>
      {/* What We Do */}
      <Section>
        <div className="rounded-2xl border border-foreground/10 p-5">
          <div className="text-lg font-medium tracking-tight">What We Do</div>
          <div className="mt-2 text-sm text-foreground/80">We turn interviews and webinars into a high‑impact book. Your voice stays; structure rises. You speak; we capture, transcribe, and refine with advanced AI—then deliver a book people finish and act on.</div>
        </div>
      </Section>
      {/* Three‑Step Method */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Interview</div><div className="mt-1 text-sm text-foreground/80">A focused hour surfaces your narrative, frameworks, and proof.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">AI refinement</div><div className="mt-1 text-sm text-foreground/80">Transcribe, organize, and polish with precision—tone intact.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Delivery</div><div className="mt-1 text-sm text-foreground/80">Cohesive book with summaries and front/back matter options.</div></div>
        </div>
      </Section>
      {/* Social Proof */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Chris Atkins — Group of Nations Publications">Praised the professionalism and opportunity of the AI‑book process.</FeatureCard>
          <FeatureCard title="Brittany Fowler — Browning Associates">Noted that the manuscript reflected her methodical approach and authentic voice.</FeatureCard>
          <FeatureCard title="Bridget Hom — Stuck On Ready">Reported securing 100 appointments in week one of outreach with the book.</FeatureCard>
        </div>
      </Section>
      {/* Plan */}
      <Section>
        <div className="rounded-2xl border border-foreground/10 p-5">
          <div className="text-lg font-medium tracking-tight">Premium Plan, Transparent Value</div>
          <div className="mt-1 text-sm text-foreground/80">Stellato — $40,000</div>
          <ul className="mt-2 text-sm text-foreground/80 list-disc pl-5 space-y-1">
            <li>One 60‑minute interview → ~200‑page manuscript</li>
            <li>Voice‑true writing and structure</li>
            <li>Research alignment, chapter flow, summaries</li>
            <li>Guidance for formatting and publishing workflows</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/pricing" className="rounded-full border border-foreground/15 px-4 py-2 text-sm hover:border-foreground/30">Start Your Book → Pricing</a>
            <a href="/how-it-works" className="rounded-full border border-foreground/15 px-4 py-2 text-sm hover:border-foreground/30">Explore the Process → How It Works</a>
          </div>
        </div>
      </Section>
      {/* Gains */}
      <Section>
        <article className="prose prose-invert max-w-none">
          <h2>What You’ll Gain</h2>
          <ul>
            <li><strong>Authority.</strong> A clear, credible narrative that frames how your market should think—and why you are the answer.</li>
            <li><strong>Leverage.</strong> Repurpose chapters into keynote outlines, email sequences, pillar posts, and training modules.</li>
            <li><strong>Pipeline.</strong> A book changes first impressions. It opens doors, earns meetings, and accelerates deals.</li>
          </ul>
          <h3>Quiet Confidence, Meticulous Craft</h3>
          <p>This is not a template dump or a rushed transcription edit. It is a measured, editorially rigorous transformation of your ideas into a book that reads effortlessly—calm, clear, and convincing. We remove friction without sanding off your personality.</p>
        </article>
      </Section>
      {/* FAQ Quick */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="How long does it take?">Weeks, not months, depending on review cycles.</FeatureCard>
          <FeatureCard title="Will it sound like me?">Yes—style fidelity is foundational to our process.</FeatureCard>
          <FeatureCard title="Who owns the IP?">You do. The book is your asset.</FeatureCard>
        </div>
      </Section>
      {/* Who It’s For */}
      <Section>
        <article className="prose prose-invert max-w-none">
          <h2>Who It’s For</h2>
          <p>Founders who need a single artifact that aligns investor expectations, informs enterprise buyers, and guides the team. Executives who must unify complex narratives across functions and regions. Coaches and consultants who want method over myth, taught with kindness and proof. Agencies that sell judgment, not just deliverables, and need a calm way to demonstrate it.</p>
          <p>Each group shares the same constraint: time. You can’t spend months drafting, iterating, and second‑guessing. The process respects this reality with a single high‑leverage interview and a short, decisive review cycle. The result reads like you—on your best day—without the burden of writing it alone.</p>
        </article>
      </Section>
      {/* Featured Outcomes */}
      <Section>
        <article className="prose prose-invert max-w-none">
          <h2>Featured Outcomes</h2>
          <ul>
            <li>Meeting acceptance increases when a book accompanies outreach. It reframes you from vendor to voice.</li>
            <li>Buying groups align faster when they can self‑educate between calls. Chapters become quiet consensus builders.</li>
            <li>Teams standardize language. The book becomes the source of truth new hires absorb in week one.</li>
            <li>Outcomes compound as chapters become posts, keynotes, and sequences. Clarity replaces content chaos.</li>
          </ul>
        </article>
      </Section>
      {/* Design / Accessibility */}
      <Section>
        <article className="prose prose-invert max-w-none">
          <h2>Design Notes</h2>
          <ul>
            <li>Layout: a quiet, generous grid. Typography that rewards long reading.</li>
            <li>Visuals: sparse diagrams for frameworks; monochrome headshots for testimonials.</li>
            <li>Motion: subtle only—progressive reveals, restrained hover states, honest transitions.</li>
          </ul>
          <h3>Accessibility Pledge</h3>
          <p>Readable contrast, focus states that never hide, and headings that form a logical outline. Every control is reachable by keyboard. Alt text says what images mean, not what they look like. We build for readers first.</p>
        </article>
      </Section>
      {/* Closing */}
      <Section>
        <article className="prose prose-invert max-w-none">
          <h2>Closing</h2>
          <p>If you’re ready to ship a book that works as hard as you do, start with a single hour. We’ll carry the rest with care.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/pricing" className="rounded-full border border-foreground/15 px-4 py-2 text-sm hover:border-foreground/30">Start Your Book</a>
            <a href="/contact" className="rounded-full border border-foreground/15 px-4 py-2 text-sm hover:border-foreground/30">Talk to Us</a>
          </div>
        </article>
      </Section>
      <Section>
        <MediaBlock
          eyebrow="How we work"
          title="Five minutes in, a book out"
          body={<p>Provide your website URL, we analyze and generate your book automatically. Complete delivery in minutes, not weeks.</p>}
          media={<div className="text-sm text-foreground/70">Summaries included. Publishing guidance provided.</div>}
        />
      </Section>
    </>
  );
}


