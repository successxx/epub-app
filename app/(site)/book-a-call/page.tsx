import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import TypeformEmbed from "../../../components/TypeformEmbed";

export const metadata: Metadata = {
  title: "Book a Call",
  description: "Schedule your 60‑minute interview to start your book.",
  openGraph: {
    title: "Book a Call — ePubAI",
    images: [{ url: "/api/og?title=Book%20a%20Call&subtitle=Start%20your%20book", width: 1200, height: 630 }],
  },
};

export default function BookACallPage() {
  return (
    <Section>
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl tracking-tight">Book a call</h1>
        <p className="text-foreground/80 max-w-3xl">One hour to start. We’ll carry the rest with care.</p>
      </div>
      <TypeformEmbed id="01K2JQCF2XN2C09H10Z4PNR78T" />
    </Section>
  );
}


