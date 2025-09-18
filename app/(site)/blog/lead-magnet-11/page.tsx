// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Landing Pages that Convert for Ebook Magnets",
  description: "Structure, proof, and microcopy that push opt‑ins above 30% without tricks.",
  keywords: ["landing page", "conversion", "ebook", "opt-in", "copywriting"],
  openGraph: {
    title: "Landing Pages that Convert for Ebook Magnets",
    description: "Structure, proof, and microcopy that push opt‑ins above 30% without tricks.",
    type: "article",
    images: [
      { url: "/api/og?title=Landing%20Pages%20that%20Convert&subtitle=30%25%2B%20Opt%E2%80%91ins%20without%20Tricks&bg=slate", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Pages that Convert for Ebook Magnets",
    description: "Structure, proof, and microcopy that push opt‑ins above 30% without tricks.",
    images: [
      "/api/og?title=Landing%20Pages%20that%20Convert&subtitle=30%25%2B%20Opt%E2%80%91ins%20without%20Tricks&bg=slate",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-11" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Landing Pages that Convert for Ebook Magnets</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={9} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~10–12 min</span></div><p className="mt-2">One promise. One form. One next step. The page that earns real opt‑ins.</p></div>

        {/* Key Takeaways */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Key Takeaways</h2><ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1"><li>Audience + problem + promise above the fold.</li><li>Proof near claims; honest microcopy; single goal.</li><li>Optimize for replies, not vanity downloads.</li></ul></div>

        {/* Two‑Column Split (text only) */}
        <div className="grid md:grid-cols-2 gap-6"><div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Promise & proof</h2><p className="mt-2 text-sm text-foreground/80">Name the reader and change. Support with one clear proof point.</p></div><div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Form & microcopy</h2><p className="mt-2 text-sm text-foreground/80">Ask for email + first name. Clarify delivery and expectations.</p></div></div>

        <Callout title="Above the fold">
          Audience + problem + promise. One form. One outcome. Proof close to claims.
        </Callout>

        {/* Numbered Playbook */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Build the page</h2><ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-2"><li>Write the headline with audience + problem + promise.</li><li>Add one‑line dek; then the proof block.</li><li>Show a table of contents with 6–8 scannable items.</li><li>Place the form with honest microcopy under the TOC.</li><li>Close with a short FAQ that resolves common hesitations.</li></ol></div>

        {/* Checklist */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">QA before launch</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>✔ Headline reads fast on mobile.</li><li>✔ Proof is proximal to claims.</li><li>✔ Form fields are minimal; button is direct.</li><li>✔ FAQ answers are specific and short.</li></ul></div>

        <article className="prose prose-invert max-w-none">
          <h2>Above‑the‑fold checklist</h2>
          <ul>
            <li>Audience + problem + promise in one line.</li>
            <li>One number or case near the headline.</li>
            <li>Table of contents that previews value.</li>
          </ul>

          <h2>Microcopy that increases opt‑ins</h2>
          <p>Say exactly what happens after they submit. “You’ll get the PDF and two short emails to help you use it.” Honesty reduces anxiety and increases conversions. Avoid tricks like fake scarcity or hidden checkboxes. Trust is a compounding asset—don’t spend it for a few extra emails.</p>

          <h2>Mobile considerations</h2>
          <p>Read your headline on a 320‑pixel wide screen. If you can’t understand it in two seconds, it’s too clever. Reduce line length, tighten the first sentence, and place proof right below it.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Above the fold, the job is clarity</h2>
          <p>Your reader should nod in two seconds. Name them. Name the problem. Promise the change. Then prove it in one line. If a stranger can repeat the page in a sentence, you did it right.</p>

          <h2>Three micro‑tests</h2>
          <ol>
            <li>Cut the headline to ten words. Keep the meaning.</li>
            <li>Swap a vague proof for a number or a case.</li>
            <li>Move the form one scroll earlier. Keep honest microcopy.</li>
          </ol>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Write the headline last</h2>
          <p>Draft the table of contents and the first chapter summary first. Then write a headline that sums both in one line readers can repeat. If a colleague can’t remember it after a single read, it’s not ready.</p>

          <h2>Proof near claims</h2>
          <p>Place one short case or single number immediately under the headline. Avoid generic phrases like “industry leading.” Specifics travel inside organizations and survive forwarding.</p>

          <h2>Form microcopy that removes anxiety</h2>
          <p>Say what happens after submit: delivery, timing, and the exact number of emails. If you also add a short FAQ under the form with the top hesitation, opt‑ins rise without tricks.</p>
          
          <h2>Table of contents that sells honestly</h2>
          <p>Six to eight items, each a promise: belief, method, cases, objections, next steps. If a reader can understand the entire arc from the TOC, the landing page is doing its job before they even opt in.</p>
        </article>

        {/* CTA Band */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want a page that converts calmly?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We’ll ship the book and the page that earns replies.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>
      </div>
    </Section>
  );
}


