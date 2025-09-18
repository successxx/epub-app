import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
// import FeatureCard from "../../../components/ui/FeatureCard";
import Accordion from "../../../components/ui/Accordion";
import Carousel from "../../../components/ui/Carousel";
import Reveal from "../../../components/Reveal";
// import { Quote } from "lucide-react";
import ClientVideo from "../../../components/ClientVideo";
const chris = "/videos/chris.mp4";
const brittany = "/videos/brittany.mp4";
const bridget = "/videos/bridget.mp4";
import StripeBuyButton from "../../../components/StripeBuyButton";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Calm, specific proof: Chris Atkins, Brittany Fowler, Bridget Hom. Monochrome headshots, measured quotes, clear outcomes.",
  openGraph: {
    title: "Testimonials — ePubAI",
    description:
      "See what clients say about voice‑true manuscripts and outcomes like 100 appointments in a week.",
    images: [
      {
        url: "/api/og?title=Testimonials&subtitle=Voice%E2%80%91true%20outcomes&bg=light",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl tracking-tight">Testimonials</h1>
            <p className="text-foreground/80 max-w-3xl">Real people. Real results. Books that sound like them—and sell for them.</p>
          </div>
          <Reveal>
            <Carousel>
              <div className="rounded-2xl border border-foreground/10 p-4">
                <ClientVideo src={chris} controls className="w-full rounded-lg" />
                <div className="mt-3 text-sm text-foreground/80">&quot;I&apos;m extremely picky in terms of who I trust with my marketing programs. And Kyle was an absolute pleasure to work with. To be interviewed by Kyle, to put together an AI Book opportunity was amazing. If anybody is sitting on the fence when it comes to working with Kyle Campbell and his organization, then I highly recommend you doing so.&quot;</div>
                <div className="mt-2 text-xs text-foreground/60">Chris Atkins — The Group Of Nations Publications</div>
              </div>
              <div className="rounded-2xl border border-foreground/10 p-4">
                <ClientVideo src={brittany} controls className="w-full rounded-lg" />
                <div className="mt-3 text-sm text-foreground/80">&quot;I am endorsing the AI book. I feel as though the AI book captured exactly what I do on the day-to-day. And not only was it methodical and well put together, but it was able to capture the unique way of what I do so that a reader can understand not only what I do, but who I am. I can trust that any reader that reads this book truly understands who I am as an individual in accordance of what I do with my work. So I highly endorse having an AI book created for yourself if you want to be unique and have something that sets you apart.&quot;</div>
                <div className="mt-2 text-xs text-foreground/60">Brittany Fowler — Browning Associates</div>
              </div>
              <div className="rounded-2xl border border-foreground/10 p-4">
                <ClientVideo src={bridget} controls className="w-full rounded-lg" />
                <div className="mt-3 text-sm text-foreground/80">&quot;Shout out to Kyle and his AI team because within the first week of working with Kyle I was able to secure 100 appointments on the books. So thank you so much, I am so grateful. Thank you so much Kyle.&quot;</div>
                <div className="mt-2 text-xs text-foreground/60">Bridget Hom — Stuck On Ready</div>
              </div>
            </Carousel>
          </Reveal>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Before</div><div className="mt-1 text-sm text-foreground/80">Cold outreach. Slow approvals. Inconsistent replies.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">After</div><div className="mt-1 text-sm text-foreground/80">Book in front. Faster yes. Better meetings.</div></div>
          <div className="rounded-2xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Proof</div><div className="mt-1 text-sm text-foreground/80">100 appointments in a week. Voice‑true manuscripts. Clear outcomes.</div></div>
        </div>
      </Section>
      <Section>
      <article className="prose prose-invert max-w-none">
        <h2>What clients value</h2>
        <p>
          Across industries, clients emphasize three themes: the calm, professional experience; a manuscript that truly sounds like them; and outcomes that show up in calendars and pipelines. The intent is not to chase virality but to establish durable credibility. When a founder or executive hands a book to a buyer, the conversation changes tiers. When a coach or consultant shares a chapter with a prospective client, the questions sharpen. When an agency circulates its book inside a buying group, the internal champion gains material that persuades without pressure.
        </p>
        <h2>Case narrative: Chris Atkins</h2>
        <p>
          Chris described himself as exacting in partner selection. The process—interview, refinement, and delivery—felt structured and respectful of time. What stood out was the balance between pace and care. The interview surfaced core ideas and examples, then the editorial pass arranged them into a cohesive arc that preserved Chris’s tone. The outcome was a manuscript he could circulate to decision‑makers who needed both a big‑picture thesis and concrete proof points. The quote above reflects that trust in process and result.
        </p>
        <h2>Case narrative: Brittany Fowler</h2>
        <p>
          Brittany’s work is methodical. A useful book would need to capture that method without flattening her voice. The delivered manuscript articulated the steps of her approach in language her clients would recognize. It avoided the traps of generic advice and instead anchored every claim in practice. Brittany’s endorsement points to two signals: readers could understand not just what she does, but who she is—and that combination supports both sales and delivery.
        </p>
        <h2>Case narrative: Bridget Hom</h2>
        <p>
          Bridget reported a surge of booked appointments within a week of leveraging the book. The most likely mechanism is attention qualified by depth. Prospects encountering the book are not casually curious; they are engaged enough to invest time. That investment translates into higher conversion when invited to meet. The volume Bridget experienced demonstrates how a long‑form asset can change the math of top‑of‑funnel activity without additional ad spend.
        </p>
        <h2>Voice fidelity</h2>
        <p>
          Many clients worry that AI‑assisted writing will sand off personality. Our editorial principle is the opposite: protect cadence, diction, and stance while improving clarity and structure. This is why testimonials so often mention “it sounded like me.” We keep the phrases that carry identity and rewrite only where reading friction would otherwise accumulate. The result is familiar to the speaker yet easier for an audience to absorb.
        </p>
        <h2>Calm proof over hype</h2>
        <p>
          The style of the site and the manuscript reflects a preference for calm proof. Monochrome headshots, measured quotes, and sparse diagrams signal confidence without spectacle. The aim is not to overwhelm but to invite attention. The testimonials fit this approach: specific, grounded, and respectful of readers’ time.
        </p>
      </article>
      </Section>
      <Section>
        <Accordion
          items={[
            {
              title: "How we curate testimonials",
              content:
                "We select quotes that speak to process, fidelity, and outcomes, paired with context and, when possible, an observable result.",
            },
            {
              title: "Applying testimonials in your funnel",
              content:
                "Use short pull‑quotes on landing pages and longer narratives in emails and decks. Link to relevant chapters to provide context.",
            },
            {
              title: "Ready to get your book in motion?",
              content: (
                <div className="max-w-md">
                  <StripeBuyButton />
                </div>
              ),
            },
          ]}
        />
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Want results like these?</div>
          <a href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">Start now</a>
        </div>
      </Section>
    </>
  );
}


