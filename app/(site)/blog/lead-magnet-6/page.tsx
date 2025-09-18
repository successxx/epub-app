// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "The Objections Chapter: Friction to Momentum",
  description: "Design a chapter that resolves risk, price, and timing so sales calls move faster.",
  keywords: ["objections", "risk", "pricing", "timing", "sales enablement"],
  openGraph: {
    title: "The Objections Chapter: Friction to Momentum",
    description:
      "Design a chapter that resolves risk, price, and timing so sales calls move faster.",
    type: "article",
    images: [
      { url: "/api/og?title=The%20Objections%20Chapter&subtitle=Friction%20%E2%86%92%20Momentum&bg=slate", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Objections Chapter: Friction to Momentum",
    description:
      "Design a chapter that resolves risk, price, and timing so sales calls move faster.",
    images: [
      "/api/og?title=The%20Objections%20Chapter&subtitle=Friction%20%E2%86%92%20Momentum&bg=slate",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-6" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">The Objections Chapter: Friction to Momentum</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={14} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~9–11 min</span></div>
          <p className="mt-2">Handle risk, price, and timing once—so every call moves faster.</p>
        </div>

        {/* Key Takeaways (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Key Takeaways</h2><ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1"><li>Write objections in the reader’s words.</li><li>Validate with a short story before reframing.</li><li>End with one specific action.</li></ul></div>

        {/* Numbered Playbook (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">The 6‑part objections pattern</h2><ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-2"><li>State the objection plainly.</li><li>Agree with what’s true in it.</li><li>Add a short case where it was resolved.</li><li>Offer the counter‑frame.</li><li>Show the small, safe first step.</li><li>Invite one next move.</li></ol></div>

        <Callout title="Make it believable">
          <div>Write the objection as your reader would. Agree with what’s true. Then add one case where the counter‑frame held.</div>
        </Callout>

        {/* FAQ Strip (unique) */}
        <div>
          <h2 className="text-lg font-medium tracking-tight">FAQ</h2>
          <details className="mt-3 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">Which objection first?</summary><p className="mt-2 text-sm text-foreground/80">Pick the one that blocks action most often—usually risk or timing.</p></details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">How long?</summary><p className="mt-2 text-sm text-foreground/80">Each objection fits on 1–2 pages with a story and an action.</p></details>
        </div>

        <article className="prose prose-invert max-w-none">
          <h2>Write objections in your reader’s words</h2>
          <p>Precision builds trust. If your chapter sounds like a rebuttal, readers dig in. If it sounds like them on a stressful day, they relax. Start each section with a line you’ve actually heard. Agree with what’s true in it. Then tell a short story where the counter‑frame solved the problem.</p>

          <h2>The three big risks, reframed</h2>
          <ul>
            <li><strong>Risk.</strong> Reframe from failure to learning: a small pilot with a clear rollback plan.</li>
            <li><strong>Price.</strong> Reframe from cost to payback: a simple timeline with one lever that matters.</li>
            <li><strong>Timing.</strong> Reframe from disruption to sequence: the first two weeks, written down.</li>
          </ul>

          <h2>Proof placement</h2>
          <p>Place a number, a quote, or a short case next to each reframing. Keep it tight. The goal is believability, not bravado.</p>

          <h2>Case: the pilot that unlocked budget</h2>
          <p>A team facing a skeptical CFO proposed a 30‑day pilot with a rollback on day 10. They showed a payback window and assigned owners. The chapter included a two‑paragraph case from a similar company. Approval came the same week, and the pilot became the production plan. The writing did the heavy lifting.</p>
          
          <h2>Build your objection library</h2>
          <p>Collect real lines from calls and emails. Group by risk, price, and timing. For each, write three parts: what they say, what’s true in it, and the counter‑frame with a case. Keep each to 150–200 words so sales can quote them as needed. Update the library monthly based on what’s actually coming up in deals.</p>

          <h2>RACI and readiness</h2>
          <p>Many objections are really ownership confusion. Add a RACI table to show who does what during a pilot and after. Pair it with a readiness checklist that states the first two weeks, step by step. When ownership and sequence are clear, timing objections fade.</p>
          
          <h2>Language to borrow</h2>
          <ul>
            <li>“You’re right to worry about [risk]. Here’s how we make it small.”</li>
            <li>“Price without payback is expensive. Here’s our simple window and the lever that matters.”</li>
            <li>“Timing feels risky when steps are fuzzy. Here’s the first two weeks in writing.”</li>
          </ul>
        </article>

        {/* CTA Band (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want fewer first‑call objections?</div><p className="mt-1 text-sm text-foreground/70">Buy now. Your book will resolve risk, price, and timing before the meeting.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>

        <article className="prose prose-invert max-w-none">
          <h2>Do this this week</h2>
          <ol>
            <li>Write the three objections in your buyer’s words.</li>
            <li>Add one case and one number next to each.</li>
            <li>End with a 30‑day pilot plan—owners, dates, rollback.</li>
          </ol>
          <h2>Then watch what happens</h2>
          <p>Calls shorten. Email threads shrink. Approvals move faster. Not because you pushed. Because you wrote what needed to be seen.</p>
        </article>
      </div>
    </Section>
  );
}
