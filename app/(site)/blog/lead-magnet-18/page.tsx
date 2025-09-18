import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Stats from "../../../../components/ui/Stats";
import Accordion from "../../../../components/ui/Accordion";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Use the Book Inside Sales",
  description: "Pre‑call, proposal, and post‑sale plays that shorten cycles and increase confidence.",
  keywords: ["sales", "enablement", "ebook", "objections", "pipeline"],
  openGraph: {
    title: "Use the Book Inside Sales",
    description: "Pre‑call, proposal, and post‑sale plays that shorten cycles and increase confidence.",
    type: "article",
    images: [
      { url: "/api/og?title=Use%20the%20Book%20Inside%20Sales&subtitle=Plays%20that%20Shorten%20Cycles&bg=dark", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use the Book Inside Sales",
    description: "Pre‑call, proposal, and post‑sale plays that shorten cycles and increase confidence.",
    images: [
      "/api/og?title=Use%20the%20Book%20Inside%20Sales&subtitle=Plays%20that%20Shorten%20Cycles&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-18" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Use the Book Inside Sales</h1>

        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={2} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~12–14 min</span></div>
          <p className="mt-2">Use the book before, during, and after calls to increase confidence and speed decisions.</p>
        </div>

        <Stats
          items={[
            { value: "2–3×", label: "Higher reply rate (chapter‑primed)" },
            { value: "−30%", label: "Fewer first‑call objections" },
            { value: "+18%", label: "Faster time‑to‑close" },
          ]}
        />

        <article className="prose prose-invert max-w-none">
          <h2>Pre‑call</h2>
          <ul>
            <li>Send the belief‑shift chapter with the calendar invite.</li>
            <li>Include one question: “Which part matches your situation?”</li>
          </ul>

          <h2>Proposal stage</h2>
          <ul>
            <li>Attach the objections chapter and a short FAQ.</li>
            <li>Quote two relevant case paragraphs.</li>
          </ul>

          <h2>Post‑sale</h2>
          <p>Use the method chapter as an onboarding primer for stakeholders who join later. It reduces misalignment and accelerates time to value.</p>

          <h2>Internal enablement</h2>
          <p>Adopt chapter terms as shared vocabulary. When teams talk the same way, buyers hear confidence instead of contradiction.</p>
        </article>

        <Accordion
          items={[
            { title: "What to send before a first call", content: <div>Belief‑shift chapter + a one‑line agenda. “We’ll spend 10 minutes on context and 10 on your constraints.”</div> },
            { title: "What to attach with a proposal", content: <div>Objections chapter + two case excerpts. Invite questions on only those pages.</div> },
            { title: "What to give new stakeholders", content: <div>Method chapter + glossary. Ask for one question each before the kickoff.</div> },
          ]}
        />

        <article className="prose prose-invert max-w-none">
          <h2>Plays by stage</h2>
          <h3>Pre‑call</h3>
          <p>Send a two‑paragraph belief shift with the calendar invite. Use the same headline as your landing page. Add a single question: “Which part matches your situation?” You’ll start the call with context instead of small talk.</p>
          <h3>During the call</h3>
          <p>Keep a bookmarked PDF with chapter anchors. When a question comes up, show the relevant page and read one sentence. You’re not pitching—you’re referencing shared language. The shift from opinions to evidence calms the room.</p>
          <h3>After the call</h3>
          <p>Send the objections chapter with a short note: “Pages 4–5 are most relevant to what you asked.” Invite one correction. When a buyer edits a shared artifact, they are co‑authoring the deal.</p>

          <h2>Enablement that compounds</h2>
          <p>Teach your sales team to quote the book. Give them a one‑page index of lines that travel. Swap tribal phrases for written ones so new reps can sound senior on day one. When everyone uses the same sentences, buyers hear confidence instead of contradiction.</p>

          <h2>Mini scripts you can steal</h2>
          <ul>
            <li><strong>Calendar note:</strong> “I’ll send a 3‑page excerpt that summarizes our approach. It will make the call faster.”</li>
            <li><strong>Proposal email:</strong> “Attaching a 6‑page objections chapter. If we’ve missed one you care about, reply with the sentence you’d say in a meeting.”</li>
            <li><strong>Kickoff:</strong> “Please skim the method chapter and send one question per person before Friday.”</li>
          </ul>

          <h2>What great looks like</h2>
          <p>Prospects quote your book back to you. First calls reference chapter titles. Security asks for the appendix instead of a new doc. Executives approve a small pilot because the next step is specific and safe. Your pipeline becomes less chaotic, not because you added pressure, but because you added clarity in writing.</p>
          
          <h2>Manager enablement</h2>
          <p>Give frontline managers a one‑page guide on when to send which chapter and the email copy to use. Managers multiply impact when the guidance is frictionless.</p>
        </article>

        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Ready to turn pages into plays?</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. We’ll deliver a book your sales team can use the same day.</p>
          <div className="mt-3 max-w-xs"><StripeBuyButton /></div>
        </div>
      </div>
    </Section>
  );
}


