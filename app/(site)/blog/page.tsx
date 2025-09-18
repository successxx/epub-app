import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import Link from "next/link";
import { Tag, Clock } from "lucide-react";
import DynamicPublishedDate from "../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on authority marketing, voice fidelity, and book‑led growth.",
  openGraph: {
    title: "Blog — ePubAI",
    description: "Insights on authority marketing, voice fidelity, and book‑led growth.",
    images: [{ url: "/api/og?title=Blog%20%E2%80%94%20Insights", width: 1200, height: 630 }],
  },
};

const posts = [
  {
    slug: "lead-magnet-1",
    title: "The Only Lead Magnet That Scales: The Book",
    excerpt:
      "Why long‑form beats thin freebies, how authority compounds, and where a book fits in your funnel.",
    date: "2025-08-01",
    read: "7 min",
    tags: ["Funnels", "Ebooks", "Authority"],
  },
  {
    slug: "lead-magnet-2",
    title: "Turn a 60‑Minute Interview into a 200‑Page Ebook",
    excerpt:
      "A step‑by‑step capture process: prompts, structure, and review to produce a voice‑true book fast.",
    date: "2025-08-02",
    read: "8 min",
    tags: ["Process", "Interview", "Writing"],
  },
  {
    slug: "lead-magnet-3",
    title: "Authority First: Why Ebooks Convert Colder Traffic",
    excerpt:
      "The belief shift model, objection‑mapping, and social proof that moves strangers to subscribers.",
    date: "2025-08-03",
    read: "6 min",
    tags: ["Conversion", "Psychology", "Ebooks"],
  },
  {
    slug: "lead-magnet-4",
    title: "The Funnel Math of a Book‑Led Magnet",
    excerpt:
      "Acquisition costs, opt‑in rates, and how chapters reduce first‑call objections across buying groups.",
    date: "2025-08-04",
    read: "7 min",
    tags: ["Funnel", "Metrics"],
  },
  {
    slug: "lead-magnet-5",
    title: "From Ebook to Revenue: The Repurpose Playbook",
    excerpt:
      "Turn chapters into keynotes, emails, and enablement without rewriting—templates inside.",
    date: "2025-08-05",
    read: "8 min",
    tags: ["Repurposing", "Content Ops"],
  },
  {
    slug: "lead-magnet-6",
    title: "The Objections Chapter: Friction to Momentum",
    excerpt:
      "Design a chapter that resolves risk, price, and timing so sales calls move faster.",
    date: "2025-08-06",
    read: "6 min",
    tags: ["Sales", "Objections"],
  },
  {
    slug: "lead-magnet-7",
    title: "Write in Your Voice at Speed",
    excerpt:
      "Interview prompts, tone snapshots, and edit passes that keep style while raising clarity.",
    date: "2025-08-07",
    read: "7 min",
    tags: ["Voice", "Editing"],
  },
  {
    slug: "lead-magnet-8",
    title: "Distribution for Ebooks: Organic, Email, Paid",
    excerpt:
      "Landing pages, sequencing, partner drops, and paid angles that respect attention.",
    date: "2025-08-08",
    read: "9 min",
    tags: ["Distribution", "Email", "Paid"],
  },
  {
    slug: "lead-magnet-9",
    title: "Metrics that Matter for Book Magnets",
    excerpt:
      "Opt‑in quality, chapter completion, reply rate, and pipeline lift—not vanity downloads.",
    date: "2025-08-09",
    read: "7 min",
    tags: ["Analytics", "Attribution"],
  },
  {
    slug: "lead-magnet-10",
    title: "Enterprise Use: The Ebook as Consensus Builder",
    excerpt:
      "How chapters travel inside buying groups and shrink the distance from interest to decision.",
    date: "2025-08-10",
    read: "8 min",
    tags: ["Enterprise", "Enablement"],
  },
  {
    slug: "lead-magnet-11",
    title: "Landing Pages that Convert for Ebook Magnets",
    excerpt:
      "Structure, proof, and microcopy that push opt‑ins above 30% without tricks.",
    date: "2025-08-11",
    read: "8 min",
    tags: ["Landing Pages", "Copy", "Funnels"],
  },
  {
    slug: "lead-magnet-12",
    title: "Sequence the Funnel: From Opt‑in to Call",
    excerpt:
      "A three‑email path that builds belief, resolves risk, and invites the next step.",
    date: "2025-08-12",
    read: "9 min",
    tags: ["Email", "Sequencing", "Funnels"],
  },
  {
    slug: "lead-magnet-13",
    title: "Clarity over Clever: Copywriting for Lead Magnets",
    excerpt:
      "Write headlines and body that speak plainly and convert consistently.",
    date: "2025-08-13",
    read: "8 min",
    tags: ["Copywriting", "Conversion"],
  },
  {
    slug: "lead-magnet-14",
    title: "Pain, Proof, Promise: Positioning Your Book",
    excerpt:
      "Anchor the book to a business outcome so readers move from interest to intent.",
    date: "2025-08-14",
    read: "8 min",
    tags: ["Positioning", "Strategy"],
  },
  {
    slug: "lead-magnet-15",
    title: "Designing the Obvious Next Step",
    excerpt:
      "CTAs that feel natural, not pushy—and pull readers into the right conversation.",
    date: "2025-08-15",
    read: "7 min",
    tags: ["CTA", "UX"],
  },
  {
    slug: "lead-magnet-16",
    title: "Partner and Co‑Marketing for Distribution",
    excerpt:
      "Borrow trust and expand reach with thoughtful partner drops and co‑branded chapters.",
    date: "2025-08-16",
    read: "7 min",
    tags: ["Distribution", "Partnerships"],
  },
  {
    slug: "lead-magnet-17",
    title: "Paid Ads for Book Magnets: Angles and Audiences",
    excerpt:
      "Creative angles and targeting that respect attention and lower cost per reply.",
    date: "2025-08-17",
    read: "9 min",
    tags: ["Paid", "Acquisition"],
  },
  {
    slug: "lead-magnet-18",
    title: "Use the Book Inside Sales",
    excerpt:
      "Pre‑call, proposal, and post‑sale plays that shorten cycles and increase confidence.",
    date: "2025-08-18",
    read: "8 min",
    tags: ["Sales", "Enablement"],
  },
  {
    slug: "lead-magnet-19",
    title: "From Webinar to Book in Days",
    excerpt:
      "Repurpose talks into a coherent ebook without sounding like a transcript.",
    date: "2025-08-19",
    read: "8 min",
    tags: ["Repurposing", "Process"],
  },
  {
    slug: "lead-magnet-20",
    title: "Enterprise‑Ready: Compliance, Privacy, Trust",
    excerpt:
      "How to make your ebook magnet easy to approve and safe to share across the org.",
    date: "2025-08-20",
    read: "9 min",
    tags: ["Enterprise", "Trust"],
  },
];

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <>
      <Section>
        <div className="bg-dots rounded-3xl p-6 md:p-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl tracking-tight">The Lead Magnet Journal</h1>
            <p className="text-foreground/80 max-w-2xl">Short, useful plays for traffic, belief, and sales.</p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Want the book working in your funnel?</div>
          <a href="/why-a-book" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">Why a book</a>
        </div>
      </Section>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-foreground/10 p-5 hover:bg-foreground/5 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-foreground/60 mb-2">
                <span className="inline-flex items-center gap-1"><Clock size={14} /> {post.read}</span>
                <span>•</span>
                <DynamicPublishedDate positionFromLatest={index} />
              </div>
              <div className="text-lg font-medium tracking-tight group-hover:underline">
                {post.title}
              </div>
              <div className="mt-2 text-sm text-foreground/70">{post.excerpt}</div>
              <div className="mt-4">
                <div className="inline-flex items-center gap-1 rounded-full border border-foreground/10 px-2 py-1 text-xs text-foreground/70">Read</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border border-foreground/10 px-2 py-1 text-xs text-foreground/70">
                    <Tag size={12} /> {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <Section>
        <div className="rounded-2xl bg-foreground text-background p-8 grid md:grid-cols-[1fr_auto] items-center">
          <div className="text-2xl md:text-3xl tracking-tight">Start with one hour. We’ll carry the rest.</div>
          <a href="/pricing" className="justify-self-start md:justify-self-end rounded-full px-5 py-3 text-sm border border-background/30 hover:border-background/60">See Pricing</a>
        </div>
      </Section>
    </>
  );
}


