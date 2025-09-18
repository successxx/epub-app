// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Designing the Obvious Next Step",
  description: "CTAs that feel natural, not pushy—and pull readers into the right conversation.",
  openGraph: {
    title: "Designing the Obvious Next Step",
    description: "CTAs that feel natural, not pushy—and pull readers into the right conversation.",
    type: "article",
    images: [
      {
        url: "/api/og?title=Obvious%20Next%20Step&subtitle=CTAs%20that%20Respect%20Attention&bg=dark",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Designing the Obvious Next Step",
    description: "CTAs that feel natural, not pushy—and pull readers into the right conversation.",
    images: [
      "/api/og?title=Obvious%20Next%20Step&subtitle=CTAs%20that%20Respect%20Attention&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <div className="space-y-8">
        <BlogHeader current="lead-magnet-15" />
        <h1 className="text-3xl md:text-4xl tracking-tight">Designing the Obvious Next Step</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={5} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~8–10 min</span></div><p className="mt-2">End each chapter with the next sentence a helpful guide would say.</p></div>

        {/* Pros / Cons (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Match CTAs to chapters</h2><div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/80"><div><div className="font-medium">Good</div><ul className="list-disc pl-5 mt-1 space-y-1"><li>Belief shift → “Run a quick diagnostic.”</li><li>Method → “Review the checklist.”</li><li>Objections → “Schedule a short call.”</li></ul></div><div><div className="font-medium">Bad</div><ul className="list-disc pl-5 mt-1 space-y-1"><li>Random offers not tied to content.</li><li>Vague labels like “Learn more.”</li><li>Pressure tactics that break trust.</li></ul></div></div></div>

        {/* Callout—Muted (unique) */}
        <aside className="rounded-xl border border-foreground/10 p-5 text-sm text-foreground/80">Place the CTA at the end of the chapter, not mid‑flow. Use verbs that describe value, not pressure.</aside>

        {/* Checklist (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Pre‑CTA reassurance</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>✔ Time: “10 minutes, structured.”</li><li>✔ Outcome: “You’ll leave with a simple plan.”</li><li>✔ Optionality: “If it’s not a fit, no worries.”</li></ul></div>

        <article className="prose prose-invert max-w-none">
          <h2>CTAs that earn yes by lowering risk</h2>
          <p>Readers don’t avoid action because they hate CTAs. They avoid action because the next step feels risky or unclear. Your job is to design the obvious next step—small, safe, and directly connected to the chapter they just read. If the chapter taught a belief shift, the CTA is a diagnostic. If it taught a method, the CTA is a checklist. If it handled objections, the CTA is a ten‑minute call with a tight agenda. Match the step to the moment.</p>

          <h2>The three ingredients of a natural CTA</h2>
          <ol>
            <li><strong>Reassurance.</strong> State time, agenda, and optionality.</li>
            <li><strong>Specificity.</strong> Name the outcome in one sentence.</li>
            <li><strong>Continuity.</strong> Use the same language as the chapter.</li>
          </ol>

          <h2>Microcopy templates you can adapt</h2>
          <ul>
            <li><strong>Diagnostic:</strong> “Ten minutes to map your current approach. You’ll leave with a one‑page plan.”</li>
            <li><strong>Checklist:</strong> “Download the 12‑point setup checklist. Takes 15 minutes to run; catches the common misses.”</li>
            <li><strong>Short call:</strong> “A 20‑minute alignment call. Agenda in the invite. If it’s not a fit, we’ll send you the notes anyway.”</li>
          </ul>

          <h2>Placement and design</h2>
          <p>Put the CTA after a short reassurance block. Use a button label that describes the value, not the mechanics. “Get the checklist” beats “Download.” “Map my incident model” beats “Book a call.” Keep surrounding whitespace generous. If you must repeat the CTA, do it once: at the end and in the sidebar, never every few paragraphs.</p>

          <h2>Case: from pressure to pull</h2>
          <p>A B2B team replaced “Book a demo” with “See a 10‑minute plan to cut alert noise by 30%.” Same step, different framing. Demos booked rose 22% and show‑up rates climbed, because readers understood the outcome and felt safe taking it.</p>
          
          <h2>CTA menu by chapter type</h2>
          <ul>
            <li><strong>Belief shift:</strong> “Run a 10‑minute diagnostic.”</li>
            <li><strong>Method:</strong> “Use the 12‑point checklist.”</li>
            <li><strong>Objections:</strong> “Schedule a 20‑minute alignment call (agenda inside).”</li>
          </ul>
          
          <h2>Microcopy bank</h2>
          <p>“You’ll leave with a one‑page plan.” “Agenda in the invite.” “If it’s not a fit, we’ll send notes anyway.”</p>
        </article>

        {/* CTA Band (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want CTAs that feel natural?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We’ll align chapter endings with the obvious next step.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>
      </div>
    </Section>
  );
}


