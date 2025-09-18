import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import FeatureCard from "../../../components/ui/FeatureCard";
import Stats from "../../../components/ui/Stats";
import Accordion from "../../../components/ui/Accordion";
import { Building, Briefcase, Users2, Presentation } from "lucide-react";

export const metadata: Metadata = {
  title: "Who It’s For",
  description:
    "Founders, executives, coaches, consultants, agencies, and teams who need a calm, credible way to demonstrate judgment at depth.",
  openGraph: {
    title: "Who It’s For — ePubAI",
    description: "Founders, executives, coaches, consultants, agencies, and teams.",
    images: [
      {
        url: "/api/og?title=Who%20It%E2%80%99s%20For&subtitle=Founders%2C%20Executives%2C%20Agencies",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function WhoItsForPage() {
  return (
    <>
      <Section>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl tracking-tight">Who it’s for</h1>
          <p className="text-foreground/80 max-w-3xl">
            You sell online. You want more buyers with less grind. You need a book that does the heavy lift while you run the business.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          <FeatureCard title="Founders" icon={<Building size={22} />}>A narrative backbone for investors, buyers, and hires.</FeatureCard>
          <FeatureCard title="Executives" icon={<Briefcase size={22} />}>Shared language for cross‑functional programs.</FeatureCard>
          <FeatureCard title="Agencies" icon={<Presentation size={22} />}>Proof at depth that travels inside buying groups.</FeatureCard>
          <FeatureCard title="Teams" icon={<Users2 size={22} />}>Standardized language for onboarding and enablement.</FeatureCard>
        </div>
      </Section>
      {/* Persona chips */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-full border border-foreground/10 px-5 py-3 text-sm">Founder • Investor + buyer alignment</div>
          <div className="rounded-full border border-foreground/10 px-5 py-3 text-sm">Exec • Cross‑functional clarity</div>
          <div className="rounded-full border border-foreground/10 px-5 py-3 text-sm">Team • Source of truth onboarding</div>
        </div>
      </Section>
      <Section>
        <Stats
          items={[
            { value: "Founders", label: "Investor + buyer alignment" },
            { value: "Execs", label: "Cross‑functional clarity" },
            { value: "Teams", label: "Onboard with source of truth" },
          ]}
        />
      </Section>
      <Section>
        <Accordion
          items={[
            {
              title: "Shared constraints, unified solution",
              content:
                "Limited time, crowded markets, complex buying groups, and the need to demonstrate judgment quickly. A book packages your best thinking into a format that can be read, shared, and referenced without you in the room—calm instead of loud, specific instead of vague.",
            },
            {
              title: "Founders",
              content:
                "A narrative backbone that harmonizes investor memos, product strategy, and sales enablement. Buyers receive a thoughtful argument for change that does not require a meeting to begin persuading.",
            },
            {
              title: "Executives",
              content:
                "Complex transformations require shared language. Chapters map to program pillars—vision, operating model, enablement, measurement—so leaders can self‑educate between checkpoints.",
            },
            {
              title: "Coaches & Consultants",
              content:
                "Teach your method with kindness and proof. The book acts as a pre‑engagement diagnostic and later as a reference that reduces onboarding time and increases client confidence.",
            },
            {
              title: "Agencies",
              content:
                "Proof at depth that portfolios cannot capture. Chapters articulate frameworks and case narratives, making expertise portable across meetings and time zones.",
            },
            {
              title: "Teams",
              content:
                "Standardize how your company talks about the problem it solves and the promises it keeps. The book becomes the source of truth that keeps product, sales, and marketing aligned.",
            },
          ]}
        />
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">If this is you, the book is your edge</div>
          <a href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">See pricing</a>
        </div>
      </Section>
    </>
  );
}


