import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import FeatureCard from "../../../components/ui/FeatureCard";
import MediaBlock from "../../../components/ui/MediaBlock";
import Reveal from "../../../components/Reveal";
import Split from "../../../components/ui/Split";
import Accordion from "../../../components/ui/Accordion";
import Stats from "../../../components/ui/Stats";
import { Ruler, Image as ImageIcon, Gauge } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Notes",
  description: "A quiet, generous grid. Typography that rewards long reading. Motion as seasoning, not spectacle.",
};

export default function DesignNotesPage() {
  return (
    <>
      <Section>
        <h1 className="text-4xl md:text-5xl tracking-tight">Design notes</h1>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <FeatureCard title="Grid" icon={<Ruler size={22} />}>Generous spacing and measured rhythm.</FeatureCard>
          <FeatureCard title="Imagery" icon={<ImageIcon size={22} />}>Sparse, purposeful diagrams. Monochrome headshots.</FeatureCard>
          <FeatureCard title="Performance" icon={<Gauge size={22} />}>Fast by default; no unnecessary libraries.</FeatureCard>
        </div>
      </Section>
      <Section>
        <Split
          left={
            <article className="prose prose-invert max-w-none">
              <h2>Principles</h2>
              <ul>
                <li>Reduce cognitive load; elevate comprehension.</li>
                <li>Let spacing carry hierarchy—no decorative lines.</li>
                <li>Motion is honest and restrained; it orients, not entertains.</li>
              </ul>
            </article>
          }
          right={
            <article className="prose prose-invert max-w-none">
              <h2>Grid and rhythm</h2>
              <ul>
                <li>Quiet grid with wide gutters for breathing room.</li>
                <li>Section spacing scales with viewport.</li>
                <li>Headings stay close to the ideas they introduce.</li>
              </ul>
            </article>
          }
        />
      </Section>

      <Section>
        <Split
          reverse
          left={
            <article className="prose prose-invert max-w-none">
              <h2>Typography</h2>
              <ul>
                <li>Contemporary grotesk for body; tight tracking on display.</li>
                <li>`.prose` sets line‑height, measure, and spacing for long reads.</li>
                <li>Emphasis by weight and position—not color.</li>
              </ul>
            </article>
          }
          right={
            <article className="prose prose-invert max-w-none">
              <h2>Color and contrast</h2>
              <ul>
                <li>Minimal palette: background, foreground, subtle tints.</li>
                <li>Contrast meets accessibility in light contexts.</li>
                <li>States signaled by border/background shifts, not hue jumps.</li>
              </ul>
            </article>
          }
        />
      </Section>

      <Section>
        <Stats
          items={[
            { value: "Readable", label: "Contrast + measure" },
            { value: "Fast", label: "Lean assets; cached routes" },
            { value: "Calm", label: "Restrained motion" },
          ]}
        />
      </Section>

      <Section>
        <Accordion
          items={[
            { title: "Imagery", content: "Monochrome headshots and sparse diagrams. Images sit inside text flow and never compete with it. Aspect ratios are consistent to maintain rhythm." },
            { title: "Motion", content: "Used to reveal content progressively and acknowledge interaction. Short transitions; no spectacle." },
            { title: "Open Graph", content: "Dynamic images with balanced type; backgrounds in light or subtle slate. Minimal marks keep focus on the message." },
            { title: "Performance", content: "Avoid unnecessary libraries, compress assets, and lean on routing and caching. Responsive images; immediate feel." },
          ]}
        />
      </Section>
      <Section>
        <Reveal>
          <MediaBlock
            eyebrow="Grid"
            title="Generous, not wasteful"
            body={<p>Breathing room that carries hierarchy. Fewer lines. More meaning.</p>}
            media={<div className="text-sm text-foreground/70">Gutters that scale with viewport; spacing that sets rhythm.</div>}
          />
        </Reveal>
      </Section>
      <Section>
        <MediaBlock
          reverse
          eyebrow="Motion"
          title="Honest transitions"
          body={<p>Gentle reveals and restrained hovers. Motion as guidance, never spectacle.</p>}
          media={<div className="text-sm text-foreground/70">Intersection‑based reveals with reduced‑motion respect.</div>}
        />
      </Section>
    </>
  );
}


