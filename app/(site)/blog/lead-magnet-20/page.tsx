import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Callout from "../../../../components/ui/Callout";
import Timeline from "../../../../components/ui/Timeline";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Enterprise‑Ready: Compliance, Privacy, Trust",
  description: "How to make your ebook magnet easy to approve and safe to share across the org.",
  keywords: ["compliance", "privacy", "trust", "enterprise", "ebook"],
  openGraph: {
    title: "Enterprise‑Ready: Compliance, Privacy, Trust",
    description: "How to make your ebook magnet easy to approve and safe to share across the org.",
    type: "article",
    images: [
      { url: "/api/og?title=Enterprise%E2%80%91Ready&subtitle=Compliance%2C%20Privacy%2C%20Trust&bg=light", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise‑Ready: Compliance, Privacy, Trust",
    description: "How to make your ebook magnet easy to approve and safe to share across the org.",
    images: [
      "/api/og?title=Enterprise%E2%80%91Ready&subtitle=Compliance%2C%20Privacy%2C%20Trust&bg=light",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-20" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Enterprise‑Ready: Compliance, Privacy, Trust</h1>

        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80"><div className="flex flex-wrap items-center gap-3"><DynamicPublishedDate positionFromLatest={0} prefix="Published" /><span aria-hidden>•</span><span>Reading time: ~12–14 min</span></div><p className="mt-2">Make your ebook safe to circulate. Legal and security say yes faster when you anticipate their questions and answer in writing.</p></div>

        <Callout title="Scope in three lines">
          <p><strong>Ownership:</strong> Who owns the words and the data.</p>
          <p className="mt-2"><strong>Controls:</strong> How files are stored, shared, and deleted.</p>
          <p className="mt-2"><strong>Access:</strong> Who can view, download, and redistribute.</p>
        </Callout>

        <Timeline
          items={[
            { title: "Ownership and attribution", body: <div><p>State that the client owns their content and IP. Use generic cases when NDAs prevent specifics. Offer to provide citations on request.</p></div> },
            { title: "Privacy", body: <div><p>Collect the minimum data required for delivery. Link to a clear privacy policy and deletion path. Avoid embedding third‑party trackers in the PDF.</p></div> },
            { title: "Security and hosting", body: <div><p>Host downloads on HTTPS with expiring links. Consider watermarking for sensitive versions.</p></div> },
            { title: "Accessibility", body: <div><p>Readable contrast and logical headings. Alt text for images; no text baked into images.</p></div> },
          ]}
        />

        <article className="prose prose-invert max-w-none">
          <h2>Internal FAQs you can answer upfront</h2>
          <p><strong>Where is the file hosted?</strong> On a hardened, HTTPS endpoint with expiring links. <strong>Who has access?</strong> Recipients with the link; revocation available. <strong>What data is collected?</strong> Only the minimum necessary to deliver the book, usually email and name.</p>
          <p><strong>How are requests handled?</strong> Document the deletion path and the contact for privacy requests. Provide a short DPIA if needed. Keep a change log for revisions.</p>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Draft a one‑page compliance appendix</h2>
          <ol>
            <li><strong>Ownership and licensing.</strong> The client owns their content and IP. No third‑party claims.</li>
            <li><strong>Data processing.</strong> What data you collect, why, and for how long. Include deletion SLAs.</li>
            <li><strong>Security posture.</strong> Hosting, access controls, encryption in transit/at rest.</li>
            <li><strong>Auditability.</strong> Change log for revisions, who approved, when.</li>
            <li><strong>Accessibility.</strong> Headings, alt text, color contrast, and a contact for issues.</li>
          </ol>

          <h2>Privacy by design</h2>
          <p>Collect the minimum data required to deliver the book, and be explicit about it on the form. Provide a one‑click deletion link or a simple request path. Don’t embed third‑party trackers in the PDF; host on a clean, expiring link. These choices build trust with both security teams and readers.</p>

          <h2>Distribution inside the enterprise</h2>
          <p>Make sharing safe and easy. Provide watermarked versions for sensitive cases, with a footer that lists the owner, date, and link. Add a short email blurb for champions to introduce the chapter to peers. When forwarding is safe and simple, adoption climbs.</p>
          
          <h2>Security FAQ template</h2>
          <ul>
            <li>Where is the file hosted? (region, controls)</li>
            <li>How long are links valid? (expiry, revocation)</li>
            <li>What data do you collect on open/download?</li>
            <li>How do we request deletion or changes?</li>
          </ul>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Pre‑approve yourself</h2>
          <p>Write the answers legal and security will ask before they ask them. Include ownership, privacy, and hosting details in a short appendix. Provide a contact for requests and a change log for revisions. When you make approval easy, buyers share more freely.</p>

          <h2>Accessibility is part of trust</h2>
          <p>Readable contrast, logical headings, and descriptive links help everyone. Avoid baking text into images; add alt text where images remain. Trust is not only policy; it is the experience of reading without strain.</p>
        </article>

        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Want a book legal can approve on first pass?</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. We’ll deliver an enterprise‑ready package—clear ownership, safe delivery, and accessible by design.</p>
          <div className="mt-3 max-w-xs"><StripeBuyButton /></div>
        </div>
      </div>
    </Section>
  );
}


