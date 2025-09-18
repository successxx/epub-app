import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import FeatureCard from "../../../components/ui/FeatureCard";
import Split from "../../../components/ui/Split";
import Accordion from "../../../components/ui/Accordion";
import { Mic, Sparkles, BookOpen, BookmarkCheck, FileText, Share2, ClipboardCheck, MessageSquare, Layers3 } from "lucide-react";
import MediaBlock from "../../../components/ui/MediaBlock";
import Stats from "../../../components/ui/Stats";
import PurplePanel from "../../../components/ui/PurplePanel";

export const metadata: Metadata = {
  title: "Features",
  description: "Voice‑true book creation from one interview: structure, research alignment, summaries, publishing guidance, and repurposing support.",
  openGraph: {
    title: "Features — ePubAI",
    description: "Interview to book: structure, fidelity, research, summaries, publishing guidance, and reuse.",
    images: [{ url: "/api/og?title=Features&subtitle=Interview%20%E2%86%92%20Book", width: 1200, height: 630 }],
  },
};

export default function FeaturesPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Features</h1>
            <p className="text-foreground/80 max-w-3xl">Turn one hour into a book that wins buyers. Simple. Fast. Repeatable.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard title="Interview" icon={<Mic size={22} />}>We ask. You talk. The good stuff comes out.</FeatureCard>
            <FeatureCard title="Refinement" icon={<Sparkles size={22} />}>Cut fluff. Sharpen logic. Keep your voice.</FeatureCard>
            <FeatureCard title="Structure that sells" icon={<BookOpen size={22} />}>Chapters build belief, prove it, then ask for one next step.</FeatureCard>
            <FeatureCard title="Proof beside claims" icon={<BookmarkCheck size={22} />}>Numbers and cases sit where they persuade.</FeatureCard>
            <FeatureCard title="Publish, not ponder" icon={<FileText size={22} />}>Clear steps to ship—print or digital.</FeatureCard>
            <FeatureCard title="Reuse everywhere" icon={<Share2 size={22} />}>Turn pages into emails, posts, and decks.</FeatureCard>
          </div>
        </div>
      </Section>
      {/* TL;DR */}
      <Section>
        <div className="callout-muted">
          <div className="text-sm font-medium">TL;DR</div>
          <ul className="mt-2 text-sm text-foreground/80 space-y-1">
            <li>Capture in an hour. Craft in weeks. Deploy everywhere.</li>
            <li>Chapters that build belief, prove it, and invite one next step.</li>
            <li>Ship fast: clear publishing guidance and reuse across channels.</li>
          </ul>
        </div>
      </Section>
      <Section>
        <Split
          left={<article className="prose prose-invert"><h2>Voice kept, clarity raised</h2><div className="callout-accent mt-3"><div className="text-sm text-foreground/80">We preserve phrasing and tone while removing friction. Short sentences. Clean structure. Your style remains.</div></div></article>}
          right={<article className="prose prose-invert"><h2>Delivery in weeks</h2><div className="callout-muted mt-3"><div className="text-sm text-foreground/80">One interview. A decisive review. Then a finished book with summaries and a one‑page outline for your funnel.</div></div></article>}
        />
      </Section>

      <Section>
        <MediaBlock
          title="Story that sells"
          body={<p>Framework before flourish. We turn experience into a narrative that teaches first and persuades by clarity. Chapters map to the decisions buyers must make—belief, method, proof, and objections—so reading moves deals forward.</p>}
          media={<div className="rounded-xl border border-foreground/10 p-4 text-sm">Outline: Promise → Belief shift → Method → Cases → Objections → Next steps</div>}
        />
      </Section>

      <Section>
        <PurplePanel>
          <h2 className="text-2xl md:text-3xl tracking-tight">Editorial, accelerated by AI</h2>
          <p className="mt-2 text-white/80">Preserve voice; raise clarity and structure. A calm, rigorous process from interview to manuscript.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Interview</div><div className="text-white/80">One focused hour surfaces judgment, language, and proof.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Refinement</div><div className="text-white/80">Advanced tooling helps polish without sanding off personality.</div></div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-4"><div className="font-medium mb-1">Delivery</div><div className="text-white/80">Cohesive manuscript with summaries and guidance.</div></div>
          </div>
        </PurplePanel>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Outcome brief" icon={<ClipboardCheck size={22} />}>Agree on audience, use‑cases, and funnel placement.</FeatureCard>
          <FeatureCard title="Enablement" icon={<Layers3 size={22} />}>Companion outline for sales, success, and product.</FeatureCard>
          <FeatureCard title="Sequencing" icon={<MessageSquare size={22} />}>Three‑email launch set with chapter links and prompts.</FeatureCard>
        </div>
      </Section>

      <Section>
        <Stats items={[{ value: "1 hr", label: "Interview" }, { value: "2 wks", label: "Delivery" }, { value: "~200", label: "Pages" }]} />
      </Section>
      <Section>
        <Accordion
          items={[
            { title: "What’s included", content: "Interview, reviewed transcription, chapter architecture, editing, summaries, research checks, publishing guidance, and a one‑page outline." },
            { title: "What’s optional", content: "Design/typesetting, distribution advisory, multi‑interview expansion, ghost‑edit for additional formats (deck, email, talk)." },
            { title: "How it plugs into funnels", content: "Landing page copy, three‑email sequence, and guidance on where to place chapters for maximum effect: pre‑call, proposal, and post‑sale education." },
          ]}
        />
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Ready to turn one hour into a book that sells?</div>
          <a href="https://buy.stripe.com/4gM5kEbLy4E28hZdo25c40x" target="_blank" rel="noopener noreferrer" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">Buy now</a>
        </div>
      </Section>
    </>
  );
}


