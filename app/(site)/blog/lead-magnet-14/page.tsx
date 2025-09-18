// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Pain, Proof, Promise: Positioning Your Book",
  description: "Anchor the book to a business outcome so readers move from interest to intent.",
  openGraph: {
    title: "Pain, Proof, Promise: Positioning Your Book",
    description: "Anchor the book to a business outcome so readers move from interest to intent.",
    type: "article",
    images: [
      {
        url: "/api/og?title=Pain%2C%20Proof%2C%20Promise&subtitle=Position%20Your%20Book%20to%20Sell&bg=slate",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pain, Proof, Promise: Positioning Your Book",
    description: "Anchor the book to a business outcome so readers move from interest to intent.",
    images: [
      "/api/og?title=Pain%2C%20Proof%2C%20Promise&subtitle=Position%20Your%20Book%20to%20Sell&bg=slate",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-14" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Pain, Proof, Promise: Positioning Your Book</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={6} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~9–11 min</span></div><p className="mt-2">Anchor to outcomes buyers care about; lead readers to action.</p></div>

        {/* Callout—Accent (unique) */}
        <aside className="rounded-xl border border-foreground/20 p-5 text-sm text-foreground/80">Pain, Proof, Promise is a discipline: define the pain, place proof near claims, and promise one meaningful change.</aside>

        {/* Definition List (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">The frame</h2><dl className="mt-3 grid sm:grid-cols-3 gap-4 text-sm text-foreground/80"><div><dt className="font-medium">Pain</dt><dd>Specific situations that readers recognize.</dd></div><div><dt className="font-medium">Proof</dt><dd>Short cases, nearby quotes, clarifying numbers.</dd></div><div><dt className="font-medium">Promise</dt><dd>One change you can keep—and measure.</dd></div></dl></div>

        {/* Numbered Playbook (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Applying the frame</h2><ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-2"><li>Rewrite your headline with the frame.</li><li>Weave three case points into chapter openers.</li><li>End each chapter with a promise‑aligned next step.</li></ol></div>

        {/* Pros / Cons (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Positioning: strong vs vague</h2><div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/80"><div><div className="font-medium">Strong</div><ul className="list-disc pl-5 mt-1 space-y-1"><li>Clear pain statements.</li><li>Proof proximal to claims.</li><li>Measurable promise.</li></ul></div><div><div className="font-medium">Vague</div><ul className="list-disc pl-5 mt-1 space-y-1"><li>Generic benefits.</li><li>Proof siloed in a separate section.</li><li>Promises that don’t constrain scope.</li></ul></div></div></div>

        <article className="prose prose-invert max-w-none">
          <h2>Positioning that travels inside buying groups</h2>
          <p>Positioning is not a slogan; it’s a shared understanding. When your book states pain, places proof, and promises one change, a champion can forward a chapter and win agreement without you on the call. The words you pick must survive Slack quotes and skim reads. That means short, specific, and testable. The promise is not “better operations,” it’s “a calmer incident model your team can adopt in a week.”</p>

          <h2>Find the pain by listening, not guessing</h2>
          <ol>
            <li>Pull the last ten discovery notes and highlight phrases that repeat.</li>
            <li>Ask your customer success team for the three most common “stuck points.”</li>
            <li>Write three one‑sentence pain statements. Keep the one a stranger would nod at.</li>
          </ol>

          <h2>Place proof next to claims</h2>
          <p>Proof in a separate section is easy to ignore. Put numbers and cases beside the line they support. If you claim that chapters reduce first‑call objections, show the before/after count under that sentence. Use one case with situation → action → result. The more proximal the proof, the more believable the claim.</p>

          <h2>Promise one change you can keep</h2>
          <p>Promises constrain scope. Constrained scope builds trust. Choose a promise that can be experienced within days: a diagnostic, a small pilot, a measurable improvement. Then structure chapters so the reader can get that outcome without friction. When a promise is kept quickly, intent compounds. Deals move.</p>

          <h2>Case: reframing to earn executive attention</h2>
          <p>An ops platform led with “observability at scale.” It sounded grand but didn’t map to budget owners. The reframed positioning—“mean time to resolution down 27% in 60 days”—put pain, proof, and promise into one line. Executives replied because the promise was measurable and near‑term. The book’s first chapter carried the argument inside the org without another meeting.</p>

          <h2>A checklist you can use on any chapter</h2>
          <ul>
            <li><strong>Pain:</strong> Does the first paragraph name a situation readers recognize?</li>
            <li><strong>Proof:</strong> Are numbers or cases placed next to the claim they support?</li>
            <li><strong>Promise:</strong> Is there one action the reader can take today that moves them forward?</li>
          </ul>
          
          <h2>Examples that make the frame obvious</h2>
          <p><strong>Pain:</strong> “On‑call teams burn out chasing noisy alerts.”<br/><strong>Proof:</strong> “A 30% reduction in false pages in 30 days at AcmeCo.”<br/><strong>Promise:</strong> “Adopt a calmer incident model in a week.”</p>
          
          <h2>Where the frame breaks</h2>
          <p>If pain is vague, proof is distant, or the promise is untestable in days, the positioning will wobble. Tighten each until a stranger can repeat it after one read.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Make the promise measurable</h2>
          <p>“Better operations” doesn’t move a CFO. “MTTR down 27% in 60 days” does. Pick a promise you can keep and measure. Then build the chapter so the reader can feel that promise early.</p>
          <h2>Keep the words that work</h2>
          <p>When a prospect repeats a line back to you, that line becomes canon. Use it in the headline, the chapter, the email, and the deck. Positioning is a chorus, not a solo.</p>
        </article>

        {/* CTA Band */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Ready to position your book to sell?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We’ll anchor pain, place proof, and promise one meaningful change.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>
      </div>
    </Section>
  );
}


