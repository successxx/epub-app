import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import Timeline from "../../../../components/ui/Timeline";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Paid Ads for Book Magnets: Angles and Audiences",
  description: "Creative angles and targeting that respect attention and lower cost per reply.",
  keywords: ["paid ads", "angles", "audiences", "ebook", "cost per reply"],
  openGraph: {
    title: "Paid Ads for Book Magnets: Angles and Audiences",
    description: "Creative angles and targeting that respect attention and lower cost per reply.",
    type: "article",
    images: [
      {
        url: "/api/og?title=Paid%20Ads%20for%20Book%20Magnets&subtitle=Angles%20%26%20Audiences%20that%20Lower%20Cost%20per%20Reply&bg=slate",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paid Ads for Book Magnets: Angles and Audiences",
    description: "Creative angles and targeting that respect attention and lower cost per reply.",
    images: [
      "/api/og?title=Paid%20Ads%20for%20Book%20Magnets&subtitle=Angles%20%26%20Audiences%20that%20Lower%20Cost%20per%20Reply&bg=slate",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-17" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Paid Ads for Book Magnets: Angles and Audiences</h1>

        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3">
            <DynamicPublishedDate positionFromLatest={3} prefix="Published" />
            <span aria-hidden>•</span>
            <span>Reading time: ~12–14 min</span>
          </div>
          <p className="mt-2">Buy attention without burning trust. Your ads should teach, not tease; invite, not pressure. Do that, and the book turns cold clicks into warm replies.</p>
        </div>

        <Callout title="Principle in three lines">
          <p><strong>Teach, don’t tease.</strong> Lead with one helpful idea from the book.</p>
          <p className="mt-2"><strong>Prove, don’t posture.</strong> Use one number or case that travels.</p>
          <p className="mt-2"><strong>Invite, don’t insist.</strong> Offer one small, safe next step.</p>
        </Callout>

        <Timeline
          items={[
            {
              title: "Clarify the promise",
              body: (
                <>
                  <p>Write a single‑sentence ad promise that mirrors the book’s first chapter. Name the reader, the problem, and the change. If a stranger can’t repeat it, it’s not clear yet.</p>
                </>
              ),
            },
            {
              title: "Choose one angle",
              body: (
                <>
                  <p>Pick a belief‑shift, an objection, or a method excerpt. One angle per ad set. Three variants maximum. Thin split tests are noise; strong angles are signal.</p>
                </>
              ),
            },
            {
              title: "Draft the ad in threes",
              body: (
                <>
                  <p>Three lines: problem, shift, next step. Example: “Ops teams burn weeks chasing events. Here’s a calmer incident model. Read the 3‑page chapter.”</p>
                </>
              ),
            },
            {
              title: "Set expectations on the LP",
              body: (
                <>
                  <p>Your landing page must keep the same promise, repeat the angle, and show proof within the first scroll. Don’t switch headlines; don’t add tricks. Trust compounds.</p>
                </>
              ),
            },
            {
              title: "Measure replies, not just CPL",
              body: (
                <>
                  <p>Tag readers by ad set. Track chapter completion and “reply in 7 days.” Cheap downloads that never reply are expensive. Pricier clicks that reply are a bargain.</p>
                </>
              ),
            },
          ]}
        />

        <article className="prose prose-invert max-w-none">
          <h2>Angles that teach</h2>
          <p>You win attention by giving attention. The right angle acknowledges the reader’s reality, names what’s costly, and offers a calmer replacement. Write three variants that differ in premise, not punctuation. Then kill the two that underperform within 72 hours.</p>
          <ul>
            <li>“Stop doing X; here’s a calmer model.” Link to the belief‑shift chapter; excerpt two paragraphs on the page.</li>
            <li>“The objections chapter that saves meetings.” Promise fewer stalls; preview one objection you resolve.</li>
            <li>“A one‑hour interview became a 200‑page book—how.” Teach the capture method; invite the download.</li>
          </ul>

          <h2>Audiences that reward clarity</h2>
          <p>Target people who already care about the underlying problem. Lookalikes on “finished a chapter,” not just “visited the site.” Warm retargeting to pricing and features viewers. Allow‑list trusted partners so your ads ride on their credibility, not just your budget.</p>

          <h2>Creative that does less—and converts more</h2>
          <p>Use a static image of the book, one clean headline, and plenty of whitespace. If the idea doesn’t stand alone in text, the picture won’t save it. Avoid carousels unless each frame is a complete thought that could run as a standalone ad.</p>

          <h2>What to watch each week</h2>
          <p>Open your dashboard and ignore most numbers. Stare at three: cost per reply, first‑chapter completion, objections‑chapter completion. Turn off ad sets that fill the list but starve the inbox. Scale only when replies stay steady as spend rises.</p>

          <h2>Field notes</h2>
          <p>In enterprise accounts, the objections angle consistently wins. Buyers want to see you handle risk calmly. In consumer and SMB, belief‑shift leads—teach a new model that makes sense on first read. Across segments, the ad that sounds like your book performs best. Voice consistency is conversion consistency.</p>

          <p>When in doubt, rewrite your ad in your reader’s words. Literally. Copy phrases from support tickets, pre‑sales emails, and recorded calls. Halbert taught “enter the conversation in their head.” Ogilvy would say “the consumer isn’t a moron; she is your wife.” Treat your reader with that level of respect and they will give you what you want most: time.</p>

          <p>Finally, decide the small next step before you write. If you want replies, ask one generous question on the landing page. If you want a short call, describe the agenda and the time. If you want a download, promise precisely what the book delivers and keep that promise within the first five pages. Clarity closes.</p>
          
          <h2>QA checklist before scaling spend</h2>
          <ul>
            <li>Ad headline = LP headline (identical words).</li>
            <li>Proof within first scroll; matches the promise.</li>
            <li>Chapter excerpt readable on mobile without pinching.</li>
            <li>CTA microcopy describes value, not mechanics.</li>
          </ul>
          
          <h2>Budget guardrails</h2>
          <p>Cap spend until you get stable replies per 100 downloads. If CPL drops but replies don’t budge, shut that ad set off. Cheap clicks that don’t reply are expensive.</p>
        </article>

        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Run ads that earn replies—not just clicks.</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. One hour in; a publish‑ready book out—designed to convert cold traffic calmly.</p>
          <div className="mt-3 max-w-xs">
            <StripeBuyButton />
          </div>
        </div>
      </div>
    </Section>
  );
}


