import type { Metadata } from "next";
import Link from "next/link";
import Section from "../../../components/ui/Section";
import FeatureCard from "../../../components/ui/FeatureCard";
import { CalendarClock, Inbox } from "lucide-react";
import TypeformEmbed from "../../../components/TypeformEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start your book or request a walkthrough.",
};

export default function ContactPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Talk to us</h1>
            <p className="text-foreground/80">Provide your website URL. Get a book that sells for you in 5 minutes.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing" className="inline-block rounded-full px-5 py-3 text-sm border border-foreground/15 hover:border-foreground/30">
            Start Your Book
          </Link>
          <a href="mailto:team@epub.ai" className="inline-block rounded-full px-5 py-3 text-sm border border-foreground/15 hover:border-foreground/30">
            Email Us
          </a>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <FeatureCard title="Website Analysis" icon={<CalendarClock size={22} />}>Provide your URL and we'll automatically extract your company information.</FeatureCard>
          <FeatureCard title="Questions?" icon={<Inbox size={22} />}>Email us at team@epub.ai for support or custom requests.</FeatureCard>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-sm font-medium">How to prepare</div><div className="mt-1 text-sm text-foreground/80">Just have your website URL ready. We'll handle the analysis, content generation, and delivery.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-sm font-medium">What happens next</div><div className="mt-1 text-sm text-foreground/80">Choose your plan, provide your URL, and receive your complete book in minutes.</div></div>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-lg font-medium tracking-tight">How to prepare</div><div className="mt-2 text-sm text-foreground/80">No preparation needed. Our AI analyzes your website to understand your voice, value propositions, and audience. Just ensure your website has good content about your business and offerings.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-lg font-medium tracking-tight">What happens after you click</div><div className="mt-2 text-sm text-foreground/80">Choose your plan, complete payment, provide your website URL, and our AI will generate your complete book automatically. Download your EPUB and PDF files immediately upon completion.</div></div>
        </div>
      </Section>
      <Section>
        <TypeformEmbed id="01K2JQE85ZP6H0KEH84T943949" />
      </Section>
    </>
  );
}


