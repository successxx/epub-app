// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Authority First: Why Ebooks Convert Colder Traffic",
  description: "The belief shift model, objection‑mapping, and social proof that moves strangers to subscribers.",
  keywords: ["authority marketing", "ebooks", "cold traffic", "belief shift", "conversion"],
  openGraph: {
    title: "Authority First: Why Ebooks Convert Colder Traffic",
    description:
      "The belief shift model, objection‑mapping, and social proof that moves strangers to subscribers.",
    type: "article",
    images: [
      {
        url: "/api/og?title=Authority%20First&subtitle=Convert%20Colder%20Traffic%20Calmly&bg=dark",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Authority First: Why Ebooks Convert Colder Traffic",
    description:
      "The belief shift model, objection‑mapping, and social proof that moves strangers to subscribers.",
    images: [
      "/api/og?title=Authority%20First&subtitle=Convert%20Colder%20Traffic%20Calmly&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-3" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Authority First: Why Ebooks Convert Colder Traffic</h1>

        {/* Blog Hero (text-only) */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3">
            <DynamicPublishedDate positionFromLatest={17} prefix="Published" />
            <span aria-hidden>•</span>
            <span>Reading time: ~10–12 min</span>
          </div>
          <p className="mt-2">Cold traffic needs belief before it needs price. Ebooks create the space to earn it.</p>
        </div>

        {/* Key Takeaways (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="tldr" className="text-lg font-medium tracking-tight">Key Takeaways</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1">
            <li>Win belief with clarity and proof before pushing offers.</li>
            <li>Use chapters to resolve risk, price, and timing calmly.</li>
            <li>End every chapter with one specific next step.</li>
          </ul>
        </div>

        {/* Problem → Outcome (unique) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Problem</h2><p className="mt-2 text-sm text-foreground/80">Colder audiences don’t yet share your worldview. Ad clicks stall at “maybe.”</p></div>
          <div className="rounded-xl border border-foreground/10 p-5"><h2 className="text-lg font-medium tracking-tight">Outcome</h2><p className="mt-2 text-sm text-foreground/80">A book reframes beliefs, adds proof, and sets a natural path to “yes.”</p></div>
        </div>

        {/* Numbered Playbook (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="playbook" className="text-lg font-medium tracking-tight">Belief‑first conversion playbook</h2>
          <ol className="mt-3 list-decimal pl-5 text-sm text-foreground/80 space-y-2">
            <li>Name the current belief your market holds.</li>
            <li>Show where it fails with one concrete case.</li>
            <li>Offer the replacement belief—clear, testable, practical.</li>
            <li>Teach the method in steps; include a checklist.</li>
            <li>Resolve the big three objections with specifics.</li>
            <li>Close with one action—diagnostic, chapter share, or short call.</li>
          </ol>
        </div>

        {/* Pros / Cons (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="pros-cons" className="text-lg font-medium tracking-tight">Pros & Cons: long‑form vs thin magnets</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/80">
            <div>
              <div className="font-medium">Pros (Book)</div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Signals authority; earns trust.</li>
                <li>Builds shared language with buyers.</li>
                <li>Travels inside buying groups.</li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Cons (Thin assets)</div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Light value; low commitment.</li>
                <li>Hard to map to objections.</li>
                <li>Rarely moves deals by itself.</li>
              </ul>
            </div>
          </div>
        </div>

        <Callout title="Write in threes">
          <div><strong>Name the belief.</strong> Say what they think now—in their words.</div>
          <div className="mt-2"><strong>Show the failure.</strong> One concrete case where it breaks.</div>
          <div className="mt-2"><strong>Offer the replacement.</strong> Clear, testable, practical.</div>
        </Callout>

        {/* FAQ Strip (unique) */}
        <div>
          <h2 id="faq" className="text-lg font-medium tracking-tight">FAQ</h2>
          <details className="mt-3 rounded-xl border border-foreground/10 p-4">
            <summary className="cursor-pointer font-medium">How long should the book be?</summary>
            <p className="mt-2 text-sm text-foreground/80">~200 pages is enough to teach thoroughly without bloat.</p>
          </details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4">
            <summary className="cursor-pointer font-medium">Where does this sit in the funnel?</summary>
            <p className="mt-2 text-sm text-foreground/80">Top and mid—landing page + follow‑ups; pre‑call primer for colder traffic.</p>
          </details>
        </div>

        {/* CTA Band (unique) */}
        <article className="prose prose-invert max-w-none">
          <h2>Why authority beats urgency for cold audiences</h2>
          <p>When someone barely knows you, urgency tactics backfire. They need a reason to trust your judgment, not a countdown timer. A book buys the time required to change a mind. It gives you space to lay out a model, prove it with a case, and invite a next step that makes sense. The reader gets value even if they never reply—which paradoxically makes them more likely to reply.</p>

          <h2>Designing a belief shift</h2>
          <p>Write one paragraph that names the old belief, the consequence of keeping it, and the new belief that solves the problem. Keep it testable. If a reader can try the belief on a small scale this week and see a difference, you’ve done it right.</p>

          <h2>Social proof that travels</h2>
          <ul>
            <li><strong>Specific numbers.</strong> “31% opt‑ins” beats “industry leading.”</li>
            <li><strong>Short cases.</strong> Situation → action → result in four sentences.</li>
            <li><strong>Quoted phrases.</strong> Words your customers actually said.</li>
          </ul>

          <h2>Objections resolved in writing</h2>
          <p>Cold readers don’t book calls to debate hypotheticals. Resolve the big three—risk, price, timing—with a story and a reframing. Invite a small step that respects their calendar and their skepticism.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Bridge from ad to book</h2>
          <p>Use the exact ad headline as the first line of your landing page. Repeat the angle and place one number or short case under it. Consistency lowers cognitive load and keeps attention. If the ad promised a calmer model, the page should show it in one paragraph, not switch to a new idea.</p>

          <h2>Write like you would explain to a colleague</h2>
          <p>Skip theatrics. Outline the world as it is, show the cost, and offer the replacement model. When you sound like a thoughtful peer, readers follow you into specifics. Authority grows line by line.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Seven‑day test plan for cold audiences</h2>
          <ol>
            <li><strong>Day 1:</strong> Pick one angle (belief shift, objections, or method). Write three variants that change premise, not punctuation.</li>
            <li><strong>Day 2:</strong> Draft matching LP headlines and first paragraphs that echo the angle word‑for‑word.</li>
            <li><strong>Day 3:</strong> Launch two ad sets per angle on small budgets. Use static images with plenty of whitespace and the headline in text.</li>
            <li><strong>Day 4:</strong> Read early clicks’ heatmaps and scroll. If readers stall before the first proof, move proof up.</li>
            <li><strong>Day 5:</strong> Turn off the worst variant. Keep spend steady—don’t starve the test.</li>
            <li><strong>Day 6:</strong> Send Email 2 (belief shift) to new readers. Track replies and the question they answered.</li>
            <li><strong>Day 7:</strong> Pick one winner based on replies and objections‑chapter completion, not CTR alone.</li>
          </ol>

          <h2>Targeting that respects attention</h2>
          <p>Start with interest groups that match the problem, not your brand. Layer in job titles that actually do the work (not just executives). Use allow‑lists from partner newsletters where trust already exists. Exclude people who clicked but didn’t finish the first chapter; they’re telling you the angle didn’t land.</p>

          <h2>What to expect when it works</h2>
          <p>Your best angle won’t necessarily have the cheapest clicks. It will generate the most replies per 100 downloads and the most meetings per 100 replies. Cold traffic warms quickly when the book names their world, proves a better one exists, and invites a step that feels safe. That’s the compound interest of authority.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Copy blocks you can steal</h2>
          <h3>Ad + LP combo (belief shift)</h3>
          <p><strong>Ad:</strong> “Ops teams burn weeks chasing events. Here’s a calmer incident model. Read the 3‑page chapter.”<br/> <strong>LP headline:</strong> “A calmer incident model your on‑call team can adopt in a week.”<br/> <strong>Dek:</strong> “Three steps, one case, one checklist—no drama, no buzzwords.”</p>
          <h3>Ad + LP combo (objections)</h3>
          <p><strong>Ad:</strong> “The objections chapter that saves meetings.”<br/> <strong>LP headline:</strong> “Answers to the three questions that stall deals: risk, price, timing.”<br/> <strong>Dek:</strong> “Short stories, specific numbers, next steps you can take today.”</p>
          <h3>Ad + LP combo (method)</h3>
          <p><strong>Ad:</strong> “A one‑hour interview became a 200‑page book—how.”<br/> <strong>LP headline:</strong> “Turn a focused hour into a voice‑true book that sells calmly.”<br/> <strong>Dek:</strong> “Prompts, structure, and a clean edit pass—plus the three emails that earn replies.”</p>

          <h2>Common mistakes to avoid</h2>
          <ul>
            <li><strong>Switching promises.</strong> If the ad says one thing and the page says another, trust resets to zero.</li>
            <li><strong>Proof far from claims.</strong> Place the number or case under the exact sentence it supports.</li>
            <li><strong>Over‑segmenting early.</strong> Start with one angle and one audience. Win there first.</li>
          </ul>
        </article>

        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Ready to convert colder traffic with calm authority?</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. One hour in; a publish‑ready book out—built to teach, persuade, and convert.</p>
          <div className="mt-3 max-w-xs"><StripeBuyButton /></div>
        </div>

        <article className="prose prose-invert max-w-none">
          <h2>Your belief map</h2>
          <p>You hold three beliefs right now. I name them. I replace them. Then we test the new belief this week so you feel it in your numbers.</p>
          <ul>
            <li><strong>Old:</strong> “Cold traffic won’t convert for me.” <strong>New:</strong> “Cold traffic converts when I teach first.”</li>
            <li><strong>Old:</strong> “I need a louder hook.” <strong>New:</strong> “I need a clearer model.”</li>
            <li><strong>Old:</strong> “Proof lives on a separate page.” <strong>New:</strong> “Proof sits beside each claim.”</li>
          </ul>

          <h2>Do this now</h2>
          <ol>
            <li>Rewrite your LP headline to mirror the ad—word for word.</li>
            <li>Place one number or case under that line—no scrolling.</li>
            <li>End the page with one action—diagnostic, chapter share, or short call.</li>
          </ol>
        </article>
      </div>
    </Section>
  );
}
