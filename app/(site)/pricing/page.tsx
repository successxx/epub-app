import type { Metadata } from "next";
import Link from "next/link";
import Section from "../../../components/ui/Section";
import TypeformEmbed from "../../../components/TypeformEmbed";
import StripeBuyButton from "../../../components/StripeBuyButton";
import Stats from "../../../components/ui/Stats";

export const metadata: Metadata = {
  title: "Pricing",
  description: "ePub.AI — $499.99 or $999.99. Website URL → 100-250 page lead magnet. AI-powered content generation, professional quality, instant delivery.",
  openGraph: {
    title: "Pricing — ePub.AI",
    description: "ePub.AI — $499.99 or $999.99 for AI-generated lead magnet books in 5 minutes.",
    images: [{ url: "/api/og?title=Pricing%20%E2%80%94%20ePub.AI&subtitle=%24499%20or%20%24999&bg=light", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Pricing</h1>
            <p className="text-foreground/80 max-w-2xl">Five minutes. Your website. A book that raises opt‑ins, replies, and revenue.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Starter Plan */}
          <div className="rounded-2xl border border-foreground/10 p-8 md:p-10">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-2xl font-medium">Starter</div>
                <div className="text-sm text-foreground/60">Perfect for small businesses and startups</div>
              </div>
              <div className="text-3xl md:text-4xl">$499.99</div>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-foreground/80">
              <li>Website URL → 100 pages in 5 minutes</li>
              <li>AI-powered content personalization</li>
              <li>Custom cover design with DALL-E 3</li>
              <li>EPUB & PDF format delivery</li>
              <li>Professional formatting and structure</li>
              <li>Based on your website data and voice</li>
            </ul>
            <div className="mt-8">
              <Link href="/checkout/basic" className="block w-full text-center rounded-full px-5 py-3 text-sm border border-foreground/15 hover:border-foreground/30">
                Get Started - $499.99
              </Link>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="rounded-2xl border-2 border-purple-600 p-8 md:p-10 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs">Most Popular</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-2xl font-medium">Professional</div>
                <div className="text-sm text-foreground/60">For serious businesses wanting comprehensive lead magnets</div>
              </div>
              <div className="text-3xl md:text-4xl">$999.99</div>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-foreground/80">
              <li>Website URL → 250 pages in 5 minutes</li>
              <li>Advanced AI-powered personalization</li>
              <li>Deep website analysis and competitor research</li>
              <li>Premium custom cover design</li>
              <li>Multiple format delivery (EPUB, PDF)</li>
              <li>Content optimization for conversions</li>
              <li>Industry-specific customization</li>
              <li>Bonus content chapters</li>
            </ul>
            <div className="mt-8">
              <Link href="/checkout/premium" className="block w-full text-center rounded-full px-5 py-3 text-sm bg-purple-600 text-white hover:bg-purple-700">
                Get Started - $999.99
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-foreground/10 p-5">
          <div className="text-lg font-medium tracking-tight">What you save</div>
          <div className="mt-2 text-sm text-foreground/80">Time, context switching, and costly false starts. Website URL in, a finished book out. Use it everywhere.</div>
          <div className="mt-4">
            <Stats items={[{ value: "5 min", label: "You invest" }, { value: "Instant", label: "Delivery" }, { value: "100-250", label: "Pages ready to use" }]} />
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-sm font-medium">What's included</div>
            <ul className="mt-2 text-sm text-foreground/80 list-disc pl-5 space-y-1">
              <li>Website analysis and data extraction</li>
              <li>AI-powered content generation in your voice</li>
              <li>Professional book architecture: chapters, summaries, front/back matter</li>
              <li>Custom cover design with DALL-E 3</li>
              <li>Multiple format delivery (EPUB, PDF)</li>
              <li>Professional formatting and structure</li>
              <li>Instant delivery after payment</li>
              <li>Content optimization for lead generation</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-5">
            <div className="text-sm font-medium">Timeline</div>
            <div className="mt-2 text-sm text-foreground/80">Instant delivery. Website analysis plus AI generation. You provide the URL; we carry the rest.</div>
            <div className="text-sm font-medium mt-4">Why this pricing</div>
            <div className="mt-2 text-sm text-foreground/80">The fee reflects advanced AI technology, instant delivery, and proven conversion impact. The outcome is a publish‑ready book that carries your voice and builds pipeline.</div>
            <div className="text-sm font-medium mt-4">Both plans include</div>
            <ul className="mt-2 text-sm text-foreground/80 list-disc pl-5 space-y-1">
              <li>Professional formatting and design</li>
              <li>Multiple file formats</li>
              <li>Custom cover artwork</li>
              <li>Instant download after payment</li>
            </ul>
            <div className="text-sm text-foreground/70 mt-3">Pricing optimized for automation while maintaining quality and business impact.</div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="text-center space-y-6">
          <h2 className="text-2xl md:text-3xl tracking-tight">Ready to create your lead magnet?</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">Join businesses using ePub.AI to generate high-converting lead magnets in minutes, not months.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/checkout/basic" className="rounded-full px-6 py-3 text-sm border border-foreground/15 hover:border-foreground/30">
              Start with Starter - $499.99
            </Link>
            <Link href="/checkout/premium" className="rounded-full px-6 py-3 text-sm bg-purple-600 text-white hover:bg-purple-700">
              Go Professional - $999.99
            </Link>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">What you save</div><div className="mt-1 text-sm text-foreground/80">Time, context switching, false starts.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">What you get</div><div className="mt-1 text-sm text-foreground/80">A voice‑true book, cover design, and multiple formats.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">How fast</div><div className="mt-1 text-sm text-foreground/80">Minutes, not months. Five minutes of your time.</div></div>
        </div>
      </Section>
    </>
  );
}


