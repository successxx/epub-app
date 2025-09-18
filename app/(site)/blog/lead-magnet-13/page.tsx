// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";
import Split from "../../../../components/ui/Split";

export const metadata: Metadata = {
  title: "Clarity over Clever: Copywriting for Lead Magnets",
  description: "Write headlines and body that speak plainly and convert consistently.",
  openGraph: {
    title: "Clarity over Clever: Copywriting for Lead Magnets",
    description: "Write headlines and body that speak plainly and convert consistently.",
    type: "article",
    images: [
      {
        url: "/api/og?title=Clarity%20over%20Clever&subtitle=Plain%20Words%20Convert&bg=dark",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarity over Clever: Copywriting for Lead Magnets",
    description: "Write headlines and body that speak plainly and convert consistently.",
    images: [
      "/api/og?title=Clarity%20over%20Clever&subtitle=Plain%20Words%20Convert&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-13" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Clarity over Clever: Copywriting for Lead Magnets</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={7} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~9–12 min</span></div><p className="mt-2">Plain words. Strong verbs. Clear next steps. Conversion follows clarity.</p></div>

        {/* Key Takeaways */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Key Takeaways</h2><ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1"><li>Audience + problem + promise.</li><li>Verbs over adjectives; short sentences.</li><li>Proof next to claims; CTA that matches the moment.</li></ul></div>

        {/* Bordered List (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Headlines: audience, problem, promise</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>Name the reader explicitly.</li><li>State the problem in their words.</li><li>Promise one useful change.</li></ul></div>

        {/* Callout—Muted (unique) */}
        <aside className="rounded-xl border border-foreground/10 p-5 text-sm text-foreground/80">Verbs move the reader. Replace weak constructions with strong actions. Cut adjectives that don’t add meaning.</aside>

        {/* Definition List (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Proof: specific beats grand</h2><dl className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-foreground/80"><div><dt className="font-medium">Number</dt><dd>Use when it clarifies scale.</dd></div><div><dt className="font-medium">Case</dt><dd>Situation → action → result.</dd></div><div><dt className="font-medium">Placement</dt><dd>Keep proof near the claim.</dd></div></dl></div>

        {/* Checklist (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Checklist for plain copy</h2><ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-2"><li>Strong verbs, short sentences.</li><li>One idea per paragraph.</li><li>Scannable subheads and lists.</li><li>Proof near claims; matching CTAs.</li></ol></div>

        <article className="prose prose-invert max-w-none">
          <h2>Why clarity wins, especially for lead magnets</h2>
          <p>Readers arrive skeptical and busy. Clever lines create a puzzle; clear lines create progress. If your copy forces interpretation, you spend attention that should be earning trust. The fastest path to conversion is simple: say what the book changes, prove it with one concrete example, and invite one small step. That’s the Ogilvy way—respect the reader’s intelligence by making the choice obvious. It’s also Halbert’s rule—enter the conversation already happening in their head.</p>

          <h2>The three-line rule you can use everywhere</h2>
          <ol>
            <li><strong>Name the pain.</strong> Use the reader’s words. Quote a support ticket or a sales note.</li>
            <li><strong>Show the shift.</strong> Offer a calmer model they can picture in one read.</li>
            <li><strong>Invite the next step.</strong> Diagnostic, checklist, or short call—one only.</li>
          </ol>

          <h2>Examples: vague vs. clear</h2>
          <ul>
            <li><strong>Vague:</strong> “Scale your marketing with AI.” <strong>Clear:</strong> “Turn a one‑hour interview into a 200‑page ebook—ready to deploy next week.”</li>
            <li><strong>Vague:</strong> “Tackle objections with confidence.” <strong>Clear:</strong> “Send a 6‑page objections chapter before the proposal so the CFO’s questions are answered in writing.”</li>
            <li><strong>Vague:</strong> “Increase conversions.” <strong>Clear:</strong> “Swap thin freebies for a 6‑chapter book; watch opt‑ins move from ~15% to ~30%.”</li>
          </ul>
        </article>

        <Split
          left={
            <div className="rounded-xl border border-foreground/10 p-5">
              <div className="text-sm uppercase tracking-widest text-foreground/60">Clever</div>
              <div className="mt-2 text-sm text-foreground/80">“Unlock growth at scale with next‑gen content.” Readers squint. They leave.</div>
            </div>
          }
          right={
            <div className="rounded-xl border border-foreground/10 p-5">
              <div className="text-sm uppercase tracking-widest text-foreground/60">Clear</div>
              <div className="mt-2 text-sm text-foreground/80">“Turn a 60‑minute interview into a 200‑page ebook—voice‑true, publish‑ready.” Readers nod. They act.</div>
            </div>
          }
        />

        <article className="prose prose-invert max-w-none">

          <h2>How to harvest the reader’s language</h2>
          <p>Open transcripts and support threads. Copy phrases that repeat. Those are the words that will click on a landing page. Make a small glossary with three categories: pains, promises, and proofs. Pains are the exact situations they describe, promises are the outcomes they want, proofs are the numbers and cases that make promises believable. Use one of each above the fold and you will feel the page get heavier—in a good way.</p>

          <h2>Formatting that increases comprehension</h2>
          <p>Use subheads every 150–200 words. Turn sequences into numbered lists. Turn comparisons into two columns. Keep paragraphs to 2–4 sentences. On mobile, readers skim; your job is to make skimming deliver value. If a skimmer can learn the argument from subheads and lists alone, your serious readers will love you even more.</p>

          <h2>Case study: the headline that doubled replies</h2>
          <p>A security startup swapped “AI‑powered incident response” for “A calmer incident model your on‑call team can adopt in a week.” The first line was impressive; the second line was useful. Email replies doubled in seven days, and the first calls started with, “We tried your model on one queue.” Clarity led to action, action led to proof, proof led to deals.</p>

          <h2>Editing pass: from clever to clear in minutes</h2>
          <ol>
            <li>Underline adjectives and adverbs. Replace them with stronger verbs or delete them.</li>
            <li>Rewrite the first sentence of every section to include audience + problem + promise.</li>
            <li>Move every proof element beside the claim it supports. Don’t bury the facts.</li>
          </ol>

          <h2>Write to one reader</h2>
          <p>Pick a single person—a founder you know, a director who replied once, a champion in a tough account. Write to them in their constraints. Reference their calendar, their team, their deadlines. People don’t convert because they’re dazzled; they convert because they feel understood. When your copy sounds like a helpful colleague, friction drops and the next step becomes the obvious step.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Three moves that fix most copy</h2>
          <ol>
            <li>Replace the headline with “Audience + problem + promise.”</li>
            <li>Place one number under your boldest claim.</li>
            <li>End with one small step the reader can take today.</li>
          </ol>
          <h2>Say it like you would say it</h2>
          <p>If a sentence doesn’t sound like you speaking to a friend, cut it. Add a strong verb. Move the proof. Keep the invitation small. That’s how words work at speed.</p>
        </article>

        {/* CTA Band */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want copy that converts calmly?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We write plainly—and win more yeses.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>
      </div>
    </Section>
  );
}


