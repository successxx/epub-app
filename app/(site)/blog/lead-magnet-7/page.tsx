// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Write in Your Voice at Speed",
  description: "Interview prompts, tone snapshots, and edit passes that keep style while raising clarity.",
  keywords: ["voice", "editing", "tone", "content", "ebook"],
  openGraph: {
    title: "Write in Your Voice at Speed",
    description: "Interview prompts, tone snapshots, and edit passes that keep style while raising clarity.",
    type: "article",
    images: [
      { url: "/api/og?title=Write%20in%20Your%20Voice%20at%20Speed&subtitle=Capture%20%E2%80%A2%20Snap%20%E2%80%A2%20Edit&bg=dark", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write in Your Voice at Speed",
    description: "Interview prompts, tone snapshots, and edit passes that keep style while raising clarity.",
    images: [
      "/api/og?title=Write%20in%20Your%20Voice%20at%20Speed&subtitle=Capture%20%E2%80%A2%20Snap%20%E2%80%A2%20Edit&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-7" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Write in Your Voice at Speed</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={13} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~9–12 min</span></div>
          <p className="mt-2">Capture genuine voice in an hour. Edit lightly. Sound like you—clearer, sharper, faster.</p>
        </div>

        {/* Mini Tabs (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5 text-sm" role="tablist" aria-label="Voice techniques">
          <style>{`.vtabs input{display:none}.vtabs label{cursor:pointer;padding:.25rem .5rem;border:1px solid color-mix(in oklab,var(--color-foreground) 15%,transparent);border-radius:.5rem;margin-right:.5rem}.vtabs .panel{display:none;margin-top:.75rem}.vtabs input:checked+label{background:color-mix(in oklab,var(--color-foreground) 5%,transparent)}#tab1:checked~#panel1,#tab2:checked~#panel2,#tab3:checked~#panel3{display:block}`}</style>
          <div className="vtabs">
            <input id="tab1" name="vt" type="radio" defaultChecked aria-controls="panel1" />
            <label htmlFor="tab1">Capture</label>
            <input id="tab2" name="vt" type="radio" aria-controls="panel2" />
            <label htmlFor="tab2">Tone snapshots</label>
            <input id="tab3" name="vt" type="radio" aria-controls="panel3" />
            <label htmlFor="tab3">Edit passes</label>
            <div id="panel1" className="panel">Open with a warm‑up story, then prompts on belief, method, proof, objections. Short sentences; one reader in mind.</div>
            <div id="panel2" className="panel">Collect 5–7 signature phrases. Keep them through editing to preserve cadence.</div>
            <div id="panel3" className="panel">Structure → Clarity → Voice. Headings and order; verbs over adjectives; replace generic phrases with yours.</div>
          </div>
        </div>

        {/* Numbered Playbook (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Voice‑true in 8 steps</h2><ol className="mt-3 list-decimal pl-5 text-foreground/80 space-y-2"><li>List audience, purpose, promise.</li><li>Write three tone adjectives; ban the rest.</li><li>Record a 10‑minute warm‑up story.</li><li>Interview for belief, method, proof, objections.</li><li>Transcribe; mark phrases that sound like you.</li><li>Outline with those phrases as section anchors.</li><li>Edit aloud; keep cadence; cut filler.</li><li>Add one CTA per chapter.</li></ol></div>

        <Callout title="Voice fidelity">
          Readers believe what sounds like you on your best day.
        </Callout>

        {/* Do this next (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Do this next</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>✔ Draft your three tone adjectives.</li><li>✔ Capture a 10‑minute story.</li><li>✔ Mark five signature lines to keep at all costs.</li></ul></div>

        <article className="prose prose-invert max-w-none">
          <h2>Capture judgment, not just words</h2>
          <p>Voice is more than phrasing. It’s which details you notice, which trade‑offs you make, which risks you tolerate. Good interviewing pulls out judgment. Ask for the moment you changed your mind. Ask for the decision you regret and why. Those answers create sentences no ghostwriter could invent—and readers believe them.</p>

          <h2>Editing without sanding off personality</h2>
          <p>Do three passes: structure, clarity, voice. In structure, order sections and add subheads. In clarity, shorten sentences and swap weak verbs. In voice, add back the signature phrases you marked earlier. Read aloud. If you smile because it sounds like you, keep it. If you wince, rewrite.</p>

          <h2>Voice tests</h2>
          <ul>
            <li>Could a colleague identify you as the author from a random paragraph?</li>
            <li>Do readers quote lines back to you verbatim?</li>
            <li>Does a stranger understand the first read without squinting?</li>
          </ul>
          
          <h2>Create a tone palette</h2>
          <p>Write three adjectives you will use (e.g., calm, direct, concrete) and three you will not (e.g., hypey, cute, vague). Add three signature phrases you want to keep verbatim across chapters. A tone palette speeds editing and helps collaborators write lines that still sound like you.</p>

          <h2>Rewrite example</h2>
          <p><strong>Before:</strong> “Our AI‑powered platform leverages cutting‑edge technology to revolutionize your workflows.”<br/><strong>After:</strong> “A calmer incident model your team can adopt in a week.” The second line is shorter, more concrete, and easier to repeat in a meeting.</p>

          <h2>How to know you went too far</h2>
          <p>If the edit removes every distinctive turn of phrase, you’ve sanded off personality. Put two signature lines back. Voice fidelity is a conversion asset; keep it while raising clarity.</p>
          
          <h2>A five‑line warm‑up that works</h2>
          <ol>
            <li>Tell me about a time the old way failed—and what it cost.</li>
            <li>When did you realize a calmer model existed?</li>
            <li>Explain your method in three steps a stranger could follow.</li>
            <li>Give me one case: situation, action, result.</li>
            <li>What’s the smallest step a reader can take today?</li>
          </ol>
          
          <h2>Editing checklist</h2>
          <ul>
            <li>Headings every ~150 words; lists for sequences.</li>
            <li>Verbs over adjectives; cut filler; keep cadence.</li>
            <li>Proof placed next to claims; one CTA per section.</li>
          </ul>
        </article>

        {/* CTA Band (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want a book that sounds unmistakably like you?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We keep your voice and raise clarity.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>
      </div>
    </Section>
  );
}
