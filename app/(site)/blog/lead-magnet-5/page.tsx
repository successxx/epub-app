// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Stats from "../../../../components/ui/Stats";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "From Ebook to Revenue: The Repurpose Playbook",
  description: "Turn chapters into keynotes, emails, and enablement without rewriting—templates inside.",
  keywords: ["repurpose", "content ops", "ebook", "keynote", "email sequence"],
  openGraph: {
    title: "From Ebook to Revenue: The Repurpose Playbook",
    description:
      "Turn chapters into keynotes, emails, and enablement without rewriting—templates inside.",
    type: "article",
    images: [
      { url: "/api/og?title=Repurpose%20Playbook&subtitle=Turn%20Chapters%20into%20Revenue&bg=dark", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Ebook to Revenue: The Repurpose Playbook",
    description:
      "Turn chapters into keynotes, emails, and enablement without rewriting—templates inside.",
    images: [
      "/api/og?title=Repurpose%20Playbook&subtitle=Turn%20Chapters%20into%20Revenue&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <div className="space-y-8">
        <BlogHeader current="lead-magnet-5" />
        <h1 className="text-3xl md:text-4xl tracking-tight">From Ebook to Revenue: The Repurpose Playbook</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={15} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~10–12 min</span></div>
          <p className="mt-2">Your book is a library of assets. Repurpose without rewriting.</p>
        </div>

        {/* Badge Headers two‑column */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Keynote</div><p className="mt-2 text-sm text-foreground/80">One slide per chapter. Promise → story → proof → takeaway. Open with the belief shift; end with action.</p></div>
          <div className="rounded-xl border border-foreground/10 p-5"><div className="text-xs uppercase tracking-widest text-foreground/60">Enablement</div><p className="mt-2 text-sm text-foreground/80">Summaries become onboarding docs: sales → objections, product → method, success → outcomes.</p></div>
        </div>

        <Stats items={[{ value: "60 min", label: "From chapter to keynote" }, { value: "6 slides", label: "Deck per chapter" }, { value: "3 emails", label: "Sequence template" }]} />

        {/* Numbered Playbook */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Repurpose in 60 minutes</h2><ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-2"><li>Pick one chapter aligned to your next campaign.</li><li>Write a five‑sentence summary (promise, belief, method, case, action).</li><li>Create a six‑slide deck from those lines.</li><li>Draft an email with the same five lines and a link.</li><li>Record a 3‑minute voiceover for social.</li></ol></div>

        {/* Resource Links */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Where to deploy</h2><ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1"><li>Landing page: swap hero bullets for chapter takeaways.</li><li>Email: link summaries with one question.</li><li>Sales deck: method slide + objections slide.</li></ul></div>

        {/* Do this next */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Do this next</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>✔ Choose the chapter that matches your offer.</li><li>✔ Draft the five‑sentence summary.</li><li>✔ Build the 6‑slide deck and schedule the email.</li></ul></div>

        <article className="prose prose-invert max-w-none">
          <h2>Why your book is a content operating system</h2>
          <p>A well‑structured book is a library of reusable ideas. Each chapter contains a premise, a method, a case, and a next step. That structure maps cleanly to slides, emails, articles, and internal docs. Repurposing isn’t copying—it’s re‑packaging judgment into the format the moment demands.</p>

          <h2>Turn one chapter into four assets</h2>
          <ul>
            <li><strong>Keynote deck.</strong> Six slides: promise, belief shift, method, case, objection, next step.</li>
            <li><strong>Three‑email sequence.</strong> Deliver, belief shift, objections—one question per email.</li>
            <li><strong>Sales enablement page.</strong> Objections handled with quotes and numbers.</li>
            <li><strong>Partner drop.</strong> A co‑branded PDF excerpt with a short foreword.</li>
          </ul>

          <h2>Editing for each channel</h2>
          <p>Slides want fewer words and bigger ideas. Emails want one paragraph and one question. Enablement wants specifics and links. Keep the same promise and proof throughout so the story composes across formats.</p>

          <h2>Case: a 6‑week launch plan</h2>
          <p>Week 1: publish the landing page and first chapter excerpt. Week 2: keynote at a partner webinar using the same lines. Week 3: share two case excerpts on LinkedIn. Week 4: co‑drop the objections chapter with a trusted newsletter. Week 5: send the three‑email sequence. Week 6: publish the checklist as an internal enablement page. Consistency compounds; you’ll see replies rise as the argument saturates your market.</p>
          
          <h2>Governance that keeps quality high</h2>
          <p>Make one person the voice steward. Their job: protect clarity and consistency, not block shipping. Create a single glossary for pains, promises, and proofs so headlines match across channels. Build a simple review checklist: audience + problem + promise in the first line; proof next to claims; one next step. When everyone uses the same criteria, repurposed assets feel like chapters from the same book—because they are.</p>

          <h2>Cadence without burnout</h2>
          <p>Set a weekly rhythm where you repurpose one chapter idea into one asset. Alternate formats: week one slide deck, week two email, week three partner drop, week four internal enablement. Keep the lines identical; only the container changes. This cadence builds a recognizable voice in the market and reduces the temptation to chase novelty.</p>

          <h2>Measuring repurpose ROI</h2>
          <ul>
            <li>Deck → replies in seven days from the audience you presented to.</li>
            <li>Email → direct replies and meetings scheduled.</li>
            <li>Partner drop → unique link replies and meetings.</li>
            <li>Enablement → fewer first‑call objections and faster proposals.</li>
          </ul>
          
          <h2>Templates</h2>
          <p><strong>Deck headline:</strong> “A calmer incident model your on‑call team can adopt in a week.”<br/><strong>Email subject:</strong> “Three sentences that cut alert noise 30%.”<br/><strong>Partner intro:</strong> “We asked [Partner] to share this 6‑page chapter because it helps you [outcome] without hype.”</p>
        </article>

        {/* CTA Band */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Ready to repurpose with zero guesswork?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We deliver a book that turns into talks, emails, and enablement on day one.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>

        <article className="prose prose-invert max-w-none">
          <h2>My promise to you</h2>
          <p>I turn one chapter into three assets every week. One deck. One email. One enablement page. Your voice stays. Your message compounds. Your calendar breathes.</p>
          <h2>Why this works</h2>
          <ul>
            <li>Same promise across channels—no context switching.</li>
            <li>Proof beside claims—no scrolling for trust.</li>
            <li>One next step—no confusion at the end.</li>
          </ul>
          <h2>Start with the chapter closest to revenue</h2>
          <p>Pick the objections chapter if deals stall. Pick the method chapter if onboarding drifts. Pick the belief shift if cold traffic is cold. Then repurpose in threes and watch replies rise.</p>
        </article>
      </div>
    </Section>
  );
}
