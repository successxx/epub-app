// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Metrics that Matter for Book Magnets",
  description: "Opt‑in quality, chapter completion, reply rate, and pipeline lift—not vanity downloads.",
  keywords: ["metrics", "analytics", "ebook", "reply rate", "pipeline"],
  openGraph: {
    title: "Metrics that Matter for Book Magnets",
    description:
      "Opt‑in quality, chapter completion, reply rate, and pipeline lift—not vanity downloads.",
    type: "article",
    images: [
      { url: "/api/og?title=Metrics%20that%20Matter&subtitle=Measure%20Replies%2C%20Not%20Vanity&bg=slate", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metrics that Matter for Book Magnets",
    description:
      "Opt‑in quality, chapter completion, reply rate, and pipeline lift—not vanity downloads.",
    images: [
      "/api/og?title=Metrics%20that%20Matter&subtitle=Measure%20Replies%2C%20Not%20Vanity&bg=slate",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-9" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Metrics that Matter for Book Magnets</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={11} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~8–10 min</span></div><p className="mt-2">Measure what moves pipeline: completion, replies, created deals.</p></div>

        {/* Inline Metrics Row (unique) */}
        <div className="grid sm:grid-cols-3 gap-4 text-center text-sm"><div className="rounded-xl border border-foreground/10 p-4"><div className="text-xl font-medium">#1</div><div className="text-foreground/70">First‑chapter completion</div></div><div className="rounded-xl border border-foreground/10 p-4"><div className="text-xl font-medium">#2</div><div className="text-foreground/70">Objections‑chapter completion</div></div><div className="rounded-xl border border-foreground/10 p-4"><div className="text-xl font-medium">#3</div><div className="text-foreground/70">Reply in 7 days</div></div></div>

        <Callout title="Your weekly dashboard">
          Ignore most numbers. Stare at three: first‑chapter completion, objections‑chapter completion, reply in 7 days.
        </Callout>

        {/* Definition List (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Definitions</h2><dl className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-foreground/80"><div><dt className="font-medium">Completion</dt><dd>Reader finishes a chapter (first/objections/final).</dd></div><div><dt className="font-medium">Reply</dt><dd>Direct response to a sequence within 7 days.</dd></div><div><dt className="font-medium">Created deal</dt><dd>Opportunity tied to a reader who completed chapters.</dd></div></dl></div>

        {/* Checklist (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Implement</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>✔ Track completion events per key chapter.</li><li>✔ Tag replies in CRM; link to reader status.</li><li>✔ Segment follow‑ups by completion depth.</li></ul></div>

        <article className="prose prose-invert max-w-none">
          <h2>Instrumentation basics</h2>
          <p>You don’t need a complex setup. Fire a completion event when a reader reaches the end of a chapter page or a PDF bookmark. Tag each event with the chapter key. In your ESP, add a hidden field for source (LP, paid, partner) and carry it into CRM. Now you can answer simple questions with confidence.</p>

          <h2>Questions your dashboard should answer</h2>
          <ul>
            <li>Which source creates the most replies per 100 opt‑ins?</li>
            <li>Do readers who finish the objections chapter reply at a higher rate?</li>
            <li>How much faster do “chapter‑primed” opportunities close?</li>
          </ul>

          <h2>What to change when numbers dip</h2>
          <p>If first‑chapter completion is low, rewrite your opener in the reader’s words. If objections‑chapter completion is low, shorten it and add a story. If replies sag, change the question in Email 2 so it’s easier to answer in one line.</p>
          
          <h2>North‑star metrics by stage</h2>
          <ul>
            <li><strong>Acquisition:</strong> LP conversion (unique → confirmed email).</li>
            <li><strong>Engagement:</strong> first‑chapter and objections‑chapter completion.</li>
            <li><strong>Intent:</strong> reply in 7 days; meetings per 100 replies.</li>
            <li><strong>Revenue:</strong> pipeline created; time‑to‑close vs baseline.</li>
          </ul>

          <h2>Weekly review ritual</h2>
          <ol>
            <li>Read five replies and tag themes. Update FAQs if themes repeat.</li>
            <li>Spot chapters with low completion and adjust openers and length.</li>
            <li>Share one sentence with sales: the line that earned most replies.</li>
          </ol>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Turn metrics into moves</h2>
          <p>You don’t stare at numbers. You use them. Completion tells you where belief falters. Replies tell you where trust forms. Pipeline tells you if writing moved revenue. Read the numbers like a coach. Make one change. Run another week. Repeat.</p>

          <h2>Three simple experiments</h2>
          <ol>
            <li><strong>Openers.</strong> Rewrite the first three lines of the first chapter in your reader’s words. Watch completion rise.</li>
            <li><strong>Proof.</strong> Move one number under the boldest claim. Watch replies lift.</li>
            <li><strong>Invite.</strong> Change Email 2’s question to something answerable in one line. Watch meetings increase.</li>
          </ol>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Build a dashboard that causes action</h2>
          <p>Dashboards should change what you do this week. If a number can’t cause an action, it doesn’t belong. Completion and replies change copy, sequencing, and sales behavior. Vanity downloads change nothing. Align your metrics to levers you control.</p>

          <h2>Weekly ritual</h2>
          <ol>
            <li>Sort by “reply in 7 days.” Read five replies and tag themes.</li>
            <li>Check objections‑chapter completion. If low, rewrite the opener.</li>
            <li>Review landing conversion on mobile only. Tighten headlines and proof placement.</li>
          </ol>

          <h2>Attribution without headaches</h2>
          <p>Tag readers by source at opt‑in and keep the tag through CRM. You don’t need perfect attribution to see clear patterns. When chapter‑primed readers convert faster, the signal is unmistakable.</p>
        </article>

        {/* CTA Band (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Ready to measure what matters?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We’ll deliver a book and the simple metrics that prove lift.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>
      </div>
    </Section>
  );
}
