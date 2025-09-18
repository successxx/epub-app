// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "The Funnel Math of a Book‑Led Magnet",
  description: "Acquisition costs, opt‑in rates, and how chapters reduce first‑call objections across buying groups.",
  keywords: ["funnel math", "opt-in rate", "ebook magnet", "reply rate", "pipeline"],
  openGraph: {
    title: "The Funnel Math of a Book‑Led Magnet",
    description:
      "Acquisition costs, opt‑in rates, and how chapters reduce first‑call objections across buying groups.",
    type: "article",
    images: [
      { url: "/api/og?title=Funnel%20Math&subtitle=Why%20Books%20Lift%20Every%20Stage&bg=slate", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Funnel Math of a Book‑Led Magnet",
    description:
      "Acquisition costs, opt‑in rates, and how chapters reduce first‑call objections across buying groups.",
    images: [
      "/api/og?title=Funnel%20Math&subtitle=Why%20Books%20Lift%20Every%20Stage&bg=slate",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-4" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">The Funnel Math of a Book‑Led Magnet</h1>

        {/* Blog Hero (text-only) */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3">
            <DynamicPublishedDate positionFromLatest={16} prefix="Published" />
            <span aria-hidden>•</span>
            <span>Reading time: ~9–11 min</span>
          </div>
          <p className="mt-2">Model acquisition, qualification, and sales friction to see why ebooks lift the whole funnel.</p>
        </div>

        {/* Inline Metrics Row (unique) */}
        <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="rounded-xl border border-foreground/10 p-4"><div className="text-xl font-medium">25–35%</div><div className="text-foreground/70">Opt‑in rate (strong page)</div></div>
          <div className="rounded-xl border border-foreground/10 p-4"><div className="text-xl font-medium">2–3×</div><div className="text-foreground/70">Higher reply rate</div></div>
          <div className="rounded-xl border border-foreground/10 p-4"><div className="text-xl font-medium">↓</div><div className="text-foreground/70">Fewer first‑call objections</div></div>
        </div>

        {/* Comparison Table (Compact) (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5 overflow-x-auto">
          <h2 id="table" className="text-lg font-medium tracking-tight">Thin magnet vs. Book magnet</h2>
          <table className="mt-3 w-full text-sm border-separate [border-spacing:0]"><thead className="text-left">
            <tr className="border-b border-foreground/10"><th className="py-2 pr-4">Criteria</th><th className="py-2 pr-4">Thin</th><th className="py-2">Book</th></tr>
          </thead><tbody>
            <tr className="border-b border-foreground/10"><td className="py-2 pr-4">Opt‑in intent</td><td className="py-2 pr-4">Low</td><td className="py-2">Medium–High</td></tr>
            <tr className="border-b border-foreground/10"><td className="py-2 pr-4">Objection handling</td><td className="py-2 pr-4">Minimal</td><td className="py-2">Dedicated chapter</td></tr>
            <tr className="border-b border-foreground/10"><td className="py-2 pr-4">Internal shareability</td><td className="py-2 pr-4">Weak</td><td className="py-2">Strong</td></tr>
          </tbody></table>
        </div>

        <Callout title="Forecast in five steps">
          <ol className="mt-2 list-decimal pl-5 text-sm text-foreground/80 space-y-1">
            <li>Estimate traffic and CPC to get visitors and spend.</li>
            <li>Model two opt‑ins: 15% (thin) vs 30% (book).</li>
            <li>Apply completion rate to estimate engaged readers.</li>
            <li>Project reply uplift vs list average.</li>
            <li>Compare pipeline and time‑to‑close vs non‑readers.</li>
          </ol>
        </Callout>

        {/* Checklist (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="measure" className="text-lg font-medium tracking-tight">Measure</h2>
          <ul className="mt-2 text-sm text-foreground/80 space-y-1">
            <li>✔ Landing conversion (unique → confirmed email)</li>
            <li>✔ Chapter completion (first, objections, final)</li>
            <li>✔ Reply rate within 7 days</li>
            <li>✔ Pipeline created and time‑to‑close</li>
          </ul>
        </div>

        <article className="prose prose-invert max-w-none">
          <h2>Model the whole funnel, not a single step</h2>
          <p>Thin assets make the top of the funnel look efficient and the bottom look anemic. A book shows its value across stages: higher opt‑ins, more chapter completions, more replies, fewer objections, larger pipeline, faster close. If you only measure cost per lead, you’ll miss the compounding effects that matter.</p>

          <h2>A simple spreadsheet you can build today</h2>
          <ol>
            <li>Traffic and spend → visitors and CPC.</li>
            <li>Two opt‑in scenarios: 15% (thin) vs 30% (book).</li>
            <li>Completion rate for key chapters (first, objections, final).</li>
            <li>Reply rate by completion depth.</li>
            <li>Pipeline and win rate by reader vs non‑reader.</li>
          </ol>

          <h2>What changes when chapters handle objections</h2>
          <p>Sales calls stop starting at zero. Prospects use your language, raise better questions, and commit to next steps. The cost isn’t just fewer minutes per deal—it&apos;s fewer people required per deal. That’s why a book’s ROI is understated when you only look at acquisition.</p>
          
          <h2>Scenario planning with realistic headwinds</h2>
          <p>Model conservative, base, and upside scenarios. In conservative, assume modest traffic, 20% opt‑ins, and only first‑chapter completion lifts replies. In upside, model partner drops and paid angles that match the book’s promise, yielding 32–35% opt‑ins, higher objections‑chapter completion, and reply rate that doubles vs list average. Tie each scenario to a budget and a learning agenda so spend buys clarity even when performance is middling.</p>

          <h2>Cohort analysis that actually helps decisions</h2>
          <p>Group readers by first‑touch channel and the first chapter they finished. Compare pipeline created and time‑to‑close for each cohort over eight weeks. You’ll often see that “chapter‑primed” deals move faster and require fewer meetings. That’s the justification to shift budget from thin assets to the book and its distribution.</p>

          <h2>Team operating rhythm</h2>
          <ul>
            <li><strong>Monday:</strong> Review completions and replies; pick one edit to test.</li>
            <li><strong>Wednesday:</strong> Ship a distribution touch (organic, partner, or paid).</li>
            <li><strong>Friday:</strong> Read five replies and tag themes for product and sales.</li>
          </ul>

          <h2>Where the book pays for itself</h2>
          <p>The first measurable win is often fewer stalls after the first call. Then it’s fewer people per deal. Then it’s faster consensus among stakeholders who read the role‑mapped chapters. Each win compounds into a lower acquisition cost per meeting, even if CPCs rise. That’s why funnel math must include the places where writing saves time.</p>
          
          <h2>Board‑level view</h2>
          <p>Translate the model to the language of capital. Show how a book increases sales efficiency (revenue per rep), reduces CAC at the meeting level, and advances opportunities faster. This lets you defend spend when budgets tighten: you’re not buying clicks; you’re buying fewer meetings per deal.</p>
        </article>

        

        <article className="prose prose-invert max-w-none">
          <h2>I want to see the math</h2>
          <p>You and I look at three numbers: opt‑ins, completions, replies. Not clicks. Not time on page. Those three tell us if belief changed and if momentum started.</p>
          <h2>Example baselines</h2>
          <ul>
            <li>Opt‑ins: 15% (thin) vs 30% (book).</li>
            <li>Completions: 28% first chapter; 18% objections.</li>
            <li>Replies: 2.1% list average vs 5.3% chapter‑primed.</li>
          </ul>
          <h2>What you do with this</h2>
          <ol>
            <li>Move proof up if first‑chapter completion lags.</li>
            <li>Shorten the objections chapter and add a story if it dips.</li>
            <li>Change the question in Email 2 if replies stall.</li>
          </ol>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Your pipeline model on one page</h2>
          <p>You want clarity. You want levers. You want to see where writing moves revenue. I give you one page that shows it: traffic → opt‑ins → completions → replies → meetings → pipeline → wins. Each arrow gets a lever. Each lever gets an owner. Each week gets one change.</p>
          <h2>Three levers that move first</h2>
          <ol>
            <li><strong>Promise clarity.</strong> Rewrite the LP headline with audience + problem + promise.</li>
            <li><strong>Proof proximity.</strong> Place one number under the boldest claim.</li>
            <li><strong>Objection order.</strong> Put the risk objection first. Add a short case.</li>
          </ol>
          <h2>What this earns you</h2>
          <p>Higher opt‑ins without tricks. More completions because readers see themselves. More replies because the ask is small and human. Fewer first‑call stalls because objections were handled in writing. That’s the math you can defend.</p>
          <h2>Make finance your ally</h2>
          <p>Finance loves two things: predictability and payback. Show your funnel as a cash‑flow timeline. Map how a 5‑point lift in opt‑ins and a 2‑point lift in replies pulls revenue forward. Then point to the pages that caused it: the headline, the first chapter, the objections chapter. Your book becomes a budget line with a return, not a marketing project with hope.</p>
          <h2>Do this next</h2>
          <ul>
            <li>Write the one‑line promise you can keep in 30 days.</li>
            <li>Pick the three numbers you will report every Monday.</li>
            <li>Choose the first chapter edit you will ship by Friday.</li>
          </ul>
        </article>

        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Ready to improve the math?</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. One hour in; a publish‑ready book out—engineered to lift opt‑ins and replies.</p>
          <div className="mt-3 max-w-xs"><StripeBuyButton /></div>
        </div>
      </div>
    </Section>
  );
}
