// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Timeline from "../../../../components/ui/Timeline";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Sequence the Funnel: From Opt‑in to Call",
  description: "A three‑email path that builds belief, resolves risk, and invites the next step.",
  keywords: ["email sequence", "funnel", "opt-in", "belief shift", "objections"],
  openGraph: {
    title: "Sequence the Funnel: From Opt‑in to Call",
    description:
      "A three‑email path that builds belief, resolves risk, and invites the next step.",
    type: "article",
    images: [
      { url: "/api/og?title=Sequence%20the%20Funnel&subtitle=From%20Opt%E2%80%91in%20to%20Call&bg=dark", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sequence the Funnel: From Opt‑in to Call",
    description:
      "A three‑email path that builds belief, resolves risk, and invites the next step.",
    images: [
      "/api/og?title=Sequence%20the%20Funnel&subtitle=From%20Opt%E2%80%91in%20to%20Call&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-12" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Sequence the Funnel: From Opt‑in to Call</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={8} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~9–12 min</span></div><p className="mt-2">Three honest emails that move from address to reply to meeting.</p></div>

        {/* Key Takeaways */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Key Takeaways</h2><ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1"><li>Email 1: deliver + promise; no pitch.</li><li>Email 2: belief shift + one question.</li><li>Email 3: objections + invitation.</li></ul></div>

        <Timeline
          items={[
            { title: "Deliver + promise", body: <div>Link, expectations, and what’s next—no pitch.</div> },
            { title: "Belief shift", body: <div>Short excerpt, one commentary line, one question.</div> },
            { title: "Objections + invite", body: <div>Resolve calmly and invite a short call or diagnostic.</div> },
          ]}
        />

        {/* FAQ Strip */}
        <div><h2 className="text-lg font-medium tracking-tight">Timing</h2><details className="mt-3 rounded-xl border border-foreground/10 p-4"><summary className="cursor-pointer font-medium">Cadence</summary><p className="mt-2 text-sm text-foreground/80">Send Email 1 immediately; Email 2 two days later; Email 3 two days after.</p></details></div>

        {/* Checklist */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Copy blocks you can reuse</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>✔ “Here’s the download link. You’ll also get two short emails to help you use it.”</li><li>✔ “What’s the one obstacle slowing you right now?”</li><li>✔ “If you’d like, we can walk through a quick diagnostic.”</li></ul></div>

        {/* Callout—Muted */}
        <aside className="rounded-xl border border-foreground/10 p-5 text-sm text-foreground/80">Measure replies, not just opens/clicks. Tag replies by question to inform product and chapters.</aside>

        <article className="prose prose-invert max-w-none">
          <h2>Write emails people finish</h2>
          <p>Every line should be easy to read and impossible to ignore. Start with a promise, add a short excerpt from the book, ask one question. No banners, no heavy design—just words that help. Replies rise when readers feel you wrote specifically for them.</p>

          <h2>Subject lines that don’t trick</h2>
          <ul>
            <li>“A calmer model for incident response (3 pages)”</li>
            <li>“The objections chapter that saves meetings”</li>
            <li>“A one‑hour path to a 200‑page book”</li>
          </ul>

          <h2>Cadence and consent</h2>
          <p>Two days between emails is enough time to read but not enough to forget. Offer a one‑click pause or opt‑out. Respect earns more attention the next time you send.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>You write to one person</h2>
          <p>Pick a single reader. Use their words. Answer their objection before they write it. Then ask one small question that’s easy to answer on a phone. Your reply rate rises because you made it easy to be human.</p>

          <h2>What I remove</h2>
          <ul>
            <li>Heavy banners that scream “marketing.”</li>
            <li>Smart words that hide simple ideas.</li>
            <li>Multiple CTAs that split attention.</li>
          </ul>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Templates you can adapt today</h2>
          <h3>Email 1: delivery + promise</h3>
          <p>Subject: “Your book + what happens next”<br/>Body: “Here’s the PDF. You’ll get two short emails this week—one helpful idea, one question. No tricks.”</p>
          <h3>Email 2: belief shift + one question</h3>
          <p>Subject: “A calmer way to [problem] (3 paragraphs)”<br/>Body: “Here’s the idea. Does this match your situation, or are we missing something obvious?”</p>
          <h3>Email 3: objections + invite</h3>
          <p>Subject: “Answers to the three questions that slow deals”<br/>Body: “We wrote them down so you can forward to the right people. If it helps, we can run a 10‑minute diagnostic this week.”</p>
          
          <h2>Reply‑earning asks</h2>
          <ul>
            <li>“What’s the one obstacle slowing you right now?”</li>
            <li>“Which chapter would help your team the most?”</li>
            <li>“Do you want a 10‑minute diagnostic outline to try this week?”</li>
          </ul>
        </article>

        {/* CTA Band */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want a sequence that earns replies?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We’ll give you the three emails—clean, clear, and respectful.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>
      </div>
    </Section>
  );
}


