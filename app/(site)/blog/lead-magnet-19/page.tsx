import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Carousel from "../../../../components/ui/Carousel";
import Callout from "../../../../components/ui/Callout";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "From Webinar to Book in Days",
  description: "Repurpose talks into a coherent ebook without sounding like a transcript.",
  keywords: ["webinar", "repurpose", "ebook", "transcript", "voice"],
  openGraph: {
    title: "From Webinar to Book in Days",
    description: "Repurpose talks into a coherent ebook without sounding like a transcript.",
    type: "article",
    images: [
      { url: "/api/og?title=From%20Webinar%20to%20Book%20in%20Days&subtitle=Repurpose%20Talks%20without%20the%20Transcript%20Feel&bg=slate", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Webinar to Book in Days",
    description: "Repurpose talks into a coherent ebook without sounding like a transcript.",
    images: [
      "/api/og?title=From%20Webinar%20to%20Book%20in%20Days&subtitle=Repurpose%20Talks%20without%20the%20Transcript%20Feel&bg=slate",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-19" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">From Webinar to Book in Days</h1>

        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={1} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~12–14 min</span></div>
          <p className="mt-2">Turn a talk into a coherent book without sounding like a transcript.</p>
        </div>

        <Carousel>
          <div className="rounded-xl border border-foreground/10 p-5 text-sm"><div className="font-medium mb-1">Capture clean audio</div><div>Record locally when possible. Remove filler before transcription. Fix domain terms first.</div></div>
          <div className="rounded-xl border border-foreground/10 p-5 text-sm"><div className="font-medium mb-1">Outline from moments</div><div>Mark belief shifts, method explanations, and objection answers. Those are chapter seeds.</div></div>
          <div className="rounded-xl border border-foreground/10 p-5 text-sm"><div className="font-medium mb-1">Rewrite for reading</div><div>Shorten sentences, keep signature lines, add subheads and summaries.</div></div>
          <div className="rounded-xl border border-foreground/10 p-5 text-sm"><div className="font-medium mb-1">Publish fast</div><div>Export PDF + web. Launch with a simple landing page and a three‑email sequence.</div></div>
        </Carousel>

        <article className="prose prose-invert max-w-none">
          <h2>Capture clean audio</h2>
          <p>Download the highest‑quality track available. Remove filler words and stray chatter before transcription. Correct domain terms immediately.</p>

          <h2>Outline from moments</h2>
          <p>Scan the transcript for moments where the audience leans in: a belief shift, a method explained, an objection answered. Turn those into chapter candidates. Arrange them into the standard arc: promise, belief, method, cases, objections, next steps.</p>

          <h2>Rewrite for reading</h2>
          <ul>
            <li>Shorten sentences. Replace conversational crutches with clear transitions.</li>
            <li>Keep signature phrases that carry voice.</li>
            <li>Add summaries and subheads so scanning readers aren’t lost.</li>
          </ul>

          <Callout title="Make it voice‑true">
            Keep the lines your audience quoted back to you. Those are the spine of the chapter. Cut the rest.
          </Callout>

          <h2>Publish fast</h2>
          <p>Export a clean PDF and a responsive web version. Create a landing page using the structure from our “Landing Pages that Convert” post. Then link the book in your webinar follow‑up emails.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Turn moments into chapters</h2>
          <p>Talks are full of throwaway lines that land hard with the audience. Those are chapter seeds. Scrub the transcript for three kinds of moments: a belief shift that reframes the problem, a method explanation that shows how, and an objection answer that lowers risk. Lift those paragraphs, rewrite for reading, and you have the spine of your book.</p>

          <h2>Rewrite for readers, not attendees</h2>
          <p>Spoken language leans on tone and timing. Readers need signposts. Use subheads every 150–200 words, turn sequences into numbered lists, and place proof beside the claim it supports. Keep your signature phrases—those lines people quoted back during Q&A. Voice fidelity increases trust, and trust increases replies.</p>

          <h2>From chapter to landing page</h2>
          <ol>
            <li>Write a headline with audience + problem + promise lifted from your talk.</li>
            <li>Add a one‑sentence dek that previews the belief shift.</li>
            <li>Show a table of contents with six scannable items.</li>
            <li>Place one case or number next to the headline.</li>
            <li>End with a short FAQ that resolves the most common hesitation.</li>
          </ol>

          <h2>Email sequence that respects attention</h2>
          <ul>
            <li><strong>Email 1:</strong> delivery + expectations. No pitch.</li>
            <li><strong>Email 2:</strong> belief‑shift excerpt + one question.</li>
            <li><strong>Email 3:</strong> objections summary + a small, safe invite.</li>
          </ul>

          <h2>Case: from webinar replay to pipeline</h2>
          <p>A dev‑tool company clipped three moments from a 40‑minute webinar and built a six‑chapter ebook in ten days. The landing page reused the talk’s best headline and proof point. Opt‑ins came in at 29%, but replies doubled because readers finished the objections chapter and felt safe taking the next step: a ten‑minute diagnostic. The webinar didn’t disappear—it became a calm, portable argument inside buying groups.</p>

          <h2>Common pitfalls</h2>
          <ul>
            <li><strong>Transcription dump.</strong> Don’t publish a transcript and call it a book. Rewrite for reading.</li>
            <li><strong>New idea syndrome.</strong> Keep the same promise and proof from the talk. Consistency compounds.</li>
            <li><strong>CTA mismatch.</strong> If the chapter taught a method, invite the checklist—not a demo.</li>
          </ul>
          
          <h2>Clip to share</h2>
          <p>Export a 60‑second clip of the belief‑shift moment with captions and a link to the chapter. It’s a simple piece that drives qualified opt‑ins because the idea carries the weight.</p>
        </article>

        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Ready to turn your talk into a book?</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. One hour in; a publish‑ready book out—faithful to your voice, built to convert.</p>
          <div className="mt-3 max-w-xs"><StripeBuyButton /></div>
        </div>
      </div>
    </Section>
  );
}


