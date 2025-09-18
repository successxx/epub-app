import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import Accordion from "../../../components/ui/Accordion";
import FeatureCard from "../../../components/ui/FeatureCard";
import { Clock, ShieldCheck, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Quick answers about timeline, voice fidelity, IP ownership, data handling, and publishing.",
  openGraph: {
    title: "FAQ — ePubAI",
    description: "Timeline, fidelity, IP, data, formatting, publishing.",
    images: [{ url: "/api/og?title=FAQ&subtitle=Timeline%2C%20Fidelity%2C%20IP", width: 1200, height: 630 }],
  },
};

export default function FaqPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Questions, answered fast</h1>
            <p className="text-foreground/80 max-w-2xl">Short, clear answers so you can move now.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard title="Timeline" icon={<Clock size={22} />}>Minutes, not weeks. Instant AI generation.</FeatureCard>
            <FeatureCard title="Voice Fidelity" icon={<FileText size={22} />}>Sounds like you—just clearer.</FeatureCard>
            <FeatureCard title="Privacy & IP" icon={<ShieldCheck size={22} />}>Your manuscript and rights are yours.</FeatureCard>
          </div>
        </div>
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Still deciding? Read this, then start.</div>
          <a href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">See pricing</a>
        </div>
      </Section>
      <Section>
        <Accordion
          items={[
            {
              title: "Timeline",
              content:
                "Instant delivery. Our AI analyzes your website and generates a complete book within minutes. Download immediately upon completion with EPUB and PDF formats.",
            },
            {
              title: "Will it sound like me?",
              content:
                "Yes. Our AI analyzes your website content to understand your voice, tone, and messaging style, then generates content that matches your authentic communication style.",
            },
            {
              title: "Who owns the IP?",
              content:
                "You do. The manuscript and any assets you provide remain yours. We claim no rights over your input or deliverables.",
            },
            {
              title: "Data and privacy",
              content:
                "We collect only what is required: your website URL, contact details for delivery, and company information you provide. No interviews or recordings. Secure processing and storage.",
            },
            {
              title: "Research and citations",
              content:
                "Our AI generates content based on your website information and industry knowledge. All content is original and focused on your specific value propositions and expertise.",
            },
            {
              title: "Formats",
              content:
                "We deliver professional EPUB and PDF files ready for distribution as lead magnets. Perfect for email marketing, website downloads, and digital distribution.",
            },
            {
              title: "Design & print",
              content:
                "Professional cover design included. Premium plan includes enhanced formatting and additional customization options for your brand.",
            },
            {
              title: "Languages",
              content:
                "English is primary. For multilingual teams, we can discuss translation workflows and trade‑offs.",
            },
            {
              title: "What should I prepare?",
              content:
                "Just your website URL. Our AI analyzes your existing content to understand your business, voice, and value propositions. No preparation or interviews needed.",
            },
            {
              title: "How long is the book?",
              content:
                "Starter plan: ~100 pages. Professional plan: ~250 pages. Optimized for lead generation with clear value delivery and conversion focus.",
            },
            {
              title: "Revisions",
              content:
                "Books are generated ready-to-use. If you need customizations or have specific requirements, contact our support team for assistance.",
            },
            {
              title: "What’s the price?",
              content:
                "Starter plan: $499.99 for 100-page book with professional features. Professional plan: $999.99 for 250-page book with advanced customization. See Pricing for full details.",
            },
            {
              title: "Payment terms",
              content:
                "One-time payment of $499.99 (Starter) or $999.99 (Professional). You retain complete rights and ownership. Instant delivery upon payment completion.",
            },
            {
              title: "Confidentiality",
              content:
                "We treat your materials as confidential and can sign an NDA. We never publish or share your manuscript without written permission.",
            },
            {
              title: "Publishing rights and attribution",
              content:
                "You publish under your name. We may request permission to reference the project after it’s public—your choice.",
            },
          ]}
        />
      </Section>
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">What to prepare</div><div className="mt-1 text-sm text-foreground/80">Just your website URL. AI handles the rest.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">IP & Rights</div><div className="mt-1 text-sm text-foreground/80">You own the manuscript. Full rights retained.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Payment</div><div className="mt-1 text-sm text-foreground/80">$499.99 or $999.99 one-time. Instant delivery.</div></div>
        </div>
      </Section>
      <Section>
        <Accordion
          items={[
            { title: "Payment terms", content: "One-time payment of $499.99 (Starter) or $999.99 (Professional). You retain complete rights and ownership. Instant delivery upon completion." },
            { title: "Formats", content: "We deliver a clean manuscript; design/typesetting available as add‑ons." },
            { title: "Confidentiality", content: "We treat your materials as confidential and can sign an NDA." },
          ]}
        />
      </Section>
    </>
  );
}


