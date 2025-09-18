"use client";

export default function StripeBuyButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://buy.stripe.com/4gM5kEbLy4E28hZdo25c40x"
      target="_blank"
      rel="noopener noreferrer"
      className={
        "inline-flex items-center justify-center rounded-full border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-foreground/30 " +
        className
      }
    >
      Buy Now
    </a>
  );
}


