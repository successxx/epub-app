// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Timeline from "../../../../components/ui/Timeline";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Enterprise Use: The Ebook as Consensus Builder",
  description: "How chapters travel inside buying groups and shrink the distance from interest to decision.",
  keywords: ["enterprise", "buying group", "consensus", "ebook", "enablement"],
  openGraph: {
    title: "Enterprise Use: The Ebook as Consensus Builder",
    description:
      "How chapters travel inside buying groups and shrink the distance from interest to decision.",
    type: "article",
    images: [
      { url: "/api/og?title=Consensus%20Builder&subtitle=Align%20Buying%20Groups%20Off%E2%80%91Call&bg=light", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Use: The Ebook as Consensus Builder",
    description:
      "How chapters travel inside buying groups and shrink the distance from interest to decision.",
    images: [
      "/api/og?title=Consensus%20Builder&subtitle=Align%20Buying%20Groups%20Off%E2%80%91Call&bg=light",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-10" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Enterprise Use: The Ebook as Consensus Builder</h1>

        {/* Blog Hero */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={10} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~10–12 min</span></div><p className="mt-2">Give buying groups a shared model. Consensus forms off‑call.</p></div>

        {/* Problem → Outcome (unique) */}
        <div className="grid md:grid-cols-2 gap-6"><div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Problem</h2><p className="mt-2 text-sm text-foreground/80">Stakeholders lack a shared model; emails reset context; cycles sprawl.</p></div><div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Outcome</h2><p className="mt-2 text-sm text-foreground/80">A book aligns roles on value, risk, and readiness—fewer meetings, faster decisions.</p></div></div>

        {/* Definition List (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Map chapters to roles</h2><dl className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-foreground/80"><div><dt className="font-medium">Finance</dt><dd>Cost, risk, payback; objections resolved with math.</dd></div><div><dt className="font-medium">Operations</dt><dd>Process changes, ownership, impact on teams.</dd></div><div><dt className="font-medium">IT/Sec</dt><dd>Integration surfaces and controls; data paths clear.</dd></div><div><dt className="font-medium">Executive</dt><dd>Vision, strategic fit, and measurable outcomes.</dd></div></dl></div>

        <Timeline
          items={[
            { title: "Send executive summary", body: <div>One page that names pain, proof, and promise.</div> },
            { title: "Forward role‑mapped chapters", body: <div>Finance, IT/Sec, Operations each get their chapter.</div> },
            { title: "Collect questions inline", body: <div>One comment thread per role; consolidate before the call.</div> },
            { title: "Hold one alignment call", body: <div>Resolve only the marked items; assign owners.</div> },
            { title: "Confirm pilot readiness", body: <div>Use the final checklist to lock scope and timeline.</div> },
          ]}
        />

        <article className="prose prose-invert max-w-none">
          <h2>The one‑pager that opens doors</h2>
          <p>I write your one‑pager like a memo. One line of promise. Three bullets of proof. One next step. The reader should be able to skim it in 15 seconds and repeat it in the meeting. That’s the bar.</p>
          <h2>Role questions you must answer</h2>
          <ul>
            <li><strong>Finance:</strong> Payback window, spend cadence, owner.</li>
            <li><strong>IT/Sec:</strong> Surfaces, controls, data paths.</li>
            <li><strong>Operations:</strong> Process changes, load, handoffs.</li>
            <li><strong>Executive:</strong> Strategic fit, outcomes, timeline.</li>
          </ul>
          <h2>Make it easy to say yes</h2>
          <p>Offer a two‑week pilot with a rollback plan. Prewrite the kickoff agenda. Assign owners by name. Your champion can forward this and look like the most prepared person in the room.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Role‑based summaries</h2>
          <p>Executives want outcomes and risk in one paragraph. Finance wants payback and ownership. IT/Sec wants surfaces and controls. Operations wants change management and impact. Write a 3–5 sentence summary for each role using language they already use. You’re handing them talking points for their internal meeting.</p>

          <h2>How to run the alignment call</h2>
          <ol>
            <li>Confirm the promised outcome in one sentence.</li>
            <li>Resolve only pre‑collected questions from the document.</li>
            <li>Assign owners and dates for a small pilot.</li>
          </ol>

          <h2>Artifacts to attach</h2>
          <ul>
            <li>One‑page executive summary</li>
            <li>Role‑mapped chapter excerpts</li>
            <li>Pilot readiness checklist</li>
          </ul>
          
          <h2>Templates you can adapt</h2>
          <p><strong>Email subject:</strong> “One‑pager for execs + chapters mapped to roles.”<br/><strong>Opening line:</strong> “To save time, here’s the summary and only the pages each role needs.”</p>
          
          <h2>Measuring consensus</h2>
          <p>Track how many stakeholders read their mapped chapter before the alignment call and which questions disappear. Your goal is fewer meetings and faster pilots, not just more downloads.</p>
        </article>
        {/* Checklist (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Implementation tips</h2><ul className="mt-2 text-sm text-foreground/80 space-y-1"><li>✔ Add a one‑page executive summary at the front.</li><li>✔ Use chapter openers as email blurbs for easy sharing.</li><li>✔ End with a pilot‑readiness checklist.</li></ul></div>

        <article className="prose prose-invert max-w-none">
          <h2>Why consensus forms off‑call</h2>
          <p>Executives rarely change their mind live. They read forwarded artifacts and make a decision later. Your book is the artifact that travels: a one‑page summary to set context, role‑mapped chapters to answer real questions, and a pilot checklist to make the next step safe. That’s how deals move without more meetings.</p>

          <h2>Draft once, use everywhere</h2>
          <p>Use chapter openers as email blurbs. Copy objection sections into the proposal appendix. Turn the pilot checklist into a pre‑kickoff form. The language stays the same so champions don’t have to translate for each audience.</p>
        </article>

        {/* CTA Band (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5"><div className="text-sm font-medium">Want faster consensus?</div><p className="mt-1 text-sm text-foreground/70">Buy now. We’ll deliver a book that moves enterprise deals off‑call.</p><div className="mt-3 max-w-xs"><StripeBuyButton /></div></div>

        <article className="prose prose-invert max-w-none">
          <h2>Make the forward easy</h2>
          <p>Executives don’t need your story. They need your sentence. Write the line they can repeat in their meeting. Then attach the exact page that backs it up. That’s how a champion becomes a closer.</p>

          <h2>Checklist for the champion</h2>
          <ul>
            <li>Subject line for each role.</li>
            <li>Three bullet points that summarize value.</li>
            <li>One page to read. One question to answer.</li>
          </ul>
        </article>
      </div>
    </Section>
  );
}
