import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import FeatureCard from "../../../components/ui/FeatureCard";
import { Contrast, Keyboard, ScanText } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Readable contrast, logical heading structure, focus states that never hide, and full keyboard reachability.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Section>
        <h1 className="text-4xl md:text-5xl tracking-tight">Accessibility pledge</h1>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <FeatureCard title="Contrast" icon={<Contrast size={22} />}>Readable in light and dark modes.</FeatureCard>
          <FeatureCard title="Keyboard" icon={<Keyboard size={22} />}>Every control reachable by keyboard.</FeatureCard>
          <FeatureCard title="Semantics" icon={<ScanText size={22} />}>Logical headings and meaningful alt text.</FeatureCard>
        </div>
      </Section>
      <Section>
      <article className="prose prose-invert max-w-none">
        <h2>Readers first</h2>
        <p>
          Accessibility is a baseline, not an add‑on. We commit to readable contrast, logical structure, and interaction patterns that do not require perfect vision, fine motor control, or a mouse. The site is navigable by keyboard, focus states are visible, and semantics map to meaning.
        </p>
        <h2>Standards</h2>
        <p>
          Our target is WCAG 2.2 AA. We audit color contrast in both light and dark contexts, ensure sufficient tap targets on mobile, and maintain heading hierarchies for screen readers. Links are distinguished by affordances beyond color.
        </p>
        <h2>Motion and preference</h2>
        <p>
          We respect `prefers-reduced-motion` and avoid parallax or large shifts that could cause discomfort. Subtle transitions are kept short and can be reduced by the user’s system preference.
        </p>
        <h2>Media and text alternatives</h2>
        <p>
          Images and icons include alt text that communicates purpose. Where media adds context, captions or transcripts are offered. We avoid text embedded in images that would otherwise be inaccessible to assistive technologies.
        </p>
        <h2>Forms and errors</h2>
        <p>
          Input fields have clear labels and descriptions. Errors are announced accessibly and are specific enough to guide resolution. We avoid reliance on placeholder text as a label.
        </p>
      </article>
      </Section>
    </>
  );
}


