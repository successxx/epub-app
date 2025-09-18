import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-medium">ePubAI</div>
          <p className="text-sm text-foreground/70">
            AI‑generated lead magnet books, in your voice. A premium automated process delivering a publish‑ready book in 5 minutes.
          </p>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Platform</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/why-a-book">Why a Book</Link></li>
            <li><Link href="/who-its-for">Who It’s For</Link></li>
            <li><Link href="/case-studies">Case Studies</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Resources</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/outcomes">Outcomes</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">Other pages</div>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/design-notes">Design Notes</Link></li>
            <li><Link href="/accessibility">Accessibility</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 text-xs text-foreground/60">
        © {new Date().getFullYear()} ePubAI. All rights reserved.
      </div>
    </footer>
  );
}


