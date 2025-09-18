// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Stats from "../../../../components/ui/Stats";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Distribution for Ebooks: Organic, Email, Paid",
  description: "Landing pages, sequencing, partner drops, and paid angles that respect attention.",
  keywords: ["distribution", "email", "paid", "organic", "ebook"],
  openGraph: {
    title: "Distribution for Ebooks: Organic, Email, Paid",
    description: "Landing pages, sequencing, partner drops, and paid angles that respect attention.",
    type: "article",
    images: [
      { url: "/api/og?title=Distribution%20for%20Ebooks&subtitle=Organic%20%E2%80%A2%20Email%20%E2%80%A2%20Paid&bg=dark", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Distribution for Ebooks: Organic, Email, Paid",
    description: "Landing pages, sequencing, partner drops, and paid angles that respect attention.",
    images: [
      "/api/og?title=Distribution%20for%20Ebooks&subtitle=Organic%20%E2%80%A2%20Email%20%E2%80%A2%20Paid&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-8" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Distribution for Ebooks: Organic, Email, Paid</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={12} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~10–12 min</span></div><p className="mt-2">Prioritize channels. Measure replies. Keep trust high.</p></div>

        {/* Section TOC (unique) */}
        <nav aria-label="On this page" className="rounded-xl border border-foreground/10 p-4 text-sm"><div className="text-xs uppercase tracking-widest text-foreground/60">Sections</div><ul className="mt-2 list-disc pl-5 space-y-1"><li><a href="#organic" className="underline">Organic</a></li><li><a href="#email" className="underline">Email</a></li><li><a href="#paid" className="underline">Paid</a></li><li><a href="#partners" className="underline">Partners</a></li></ul></nav>

        <Stats items={[{ value: "1–2/wk", label: "Organic posts" }, { value: "3", label: "Sequence emails" }, { value: "1 partner", label: "Monthly co‑drop" }]} />

        {/* Bordered List (unique) */}
        <div id="organic" className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Organic</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>Post weekly: one idea from one chapter with a native pull‑quote.</li><li>Podcast cameo: teach the belief shift; link the landing page.</li></ul></div>

        {/* Callout—Muted (unique) */}
        <aside id="email" className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Email</h2><p className="mt-2 text-sm text-foreground/80">Run a three‑email sequence: promise, chapter one, objections. Ask one question per email to earn replies.</p></aside>

        {/* Callout—Accent (unique) */}
        <aside id="paid" className="rounded-xl border border-foreground/20 p-5"><h2 className="text-lg font-medium tracking-tight">Paid</h2><p className="mt-2 text-sm text-foreground/80">Two angles: “Stop doing X; here’s a calmer model.” and “The objections chapter that saves meetings.”</p></aside>

        {/* Quote with Aside (unique) */}
        <div id="partners" className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start"><blockquote className="rounded-xl border-l-4 border-foreground/20 bg-foreground/5 p-5">“Distribution is discipline. Teach first. Invite second.”</blockquote><div className="rounded-xl border border-foreground/10 p-4 text-sm text-foreground/80">Offer a co‑branded chapter to a trusted newsletter or community. It borrows trust and adds context.</div></div>

        <article className="prose prose-invert max-w-none">
          <h2>Choose fewer channels, do them well</h2>
          <p>Most teams spread thin across too many channels and measure the wrong things. Pick one organic lane, one partner program, and one paid angle. Optimize for replies and meetings, not likes and click‑throughs. The book gives you the substance; distribution is the discipline of placing it where attention is already earned.</p>

          <h2>Sequencing across channels</h2>
          <ol>
            <li>Publish the landing page with the book’s promise and a short excerpt.</li>
            <li>Run the three‑email sequence for new readers.</li>
            <li>Offer a co‑branded chapter to one trusted partner.</li>
            <li>Test one paid angle with two creative variants for a week.</li>
          </ol>

          <h2>Reuse the same words</h2>
          <p>Use the exact headline from the landing page in your ads and partner blurbs. Voice consistency is conversion consistency. If your paid ad sounds like your book, the hand‑off is smooth and trust compounds.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Organic that compounds</h2>
          <ul>
            <li>Weekly post: one idea from a chapter, one proof, one question.</li>
            <li>Short video: read a paragraph and add one new sentence of context.</li>
            <li>Podcast cameo: teach the belief shift; invite the chapter, not the sale.</li>
          </ul>

          <h2>Paid without pressure</h2>
          <p>Run one angle for one week. Measure chapter completion and replies rather than CTR. Kill variants that create clicks but no replies. Keep copy restrained: if the idea doesn’t work in text, the image won’t save it.</p>

          <h2>Partner drops that feel generous</h2>
          <p>Offer a co‑branded chapter and write a three‑sentence intro your partner can send. Make it obviously useful in isolation. Include a subtle link back to your landing page for readers who want more.</p>
          
          <h2>Calendar plan</h2>
          <ul>
            <li><strong>Week 1:</strong> LP + organic post + Email 1.</li>
            <li><strong>Week 2:</strong> Partner drop + Email 2.</li>
            <li><strong>Week 3:</strong> Paid angle test + Email 3.</li>
            <li><strong>Week 4:</strong> Case excerpt + objections excerpt.</li>
          </ul>
        </article>

        {/* CTA Band (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want distribution that respects attention?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We’ll deliver a book and a clean path to share it well.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>

        <article className="prose prose-invert max-w-none">
          <h2>You want reach without the waste</h2>
          <p>You don’t need more posts. You need the right post in the right lane with the right promise. I help you do three things: keep the promise the same, keep the proof close, keep the next step obvious. That’s how distribution earns replies, not just clicks.</p>

          <h2>Your weekly rhythm</h2>
          <ol>
            <li>Publish one idea from one chapter. Use the same headline everywhere.</li>
            <li>Place one short case beside that idea. Numbers win. Stories stick.</li>
            <li>Invite one small step at the end. Diagnostic. Excerpt. Short call.</li>
          </ol>

          <h2>Proof drives the flywheel</h2>
          <p>As replies come in, copy the exact sentence that caused the reply. Add it to the chapter. Add it to the landing page. Add it to the next post. Your language tightens. Your response rate climbs. The wheel turns because you keep the words that work.</p>
        </article>
      </div>
    </Section>
  );
}
