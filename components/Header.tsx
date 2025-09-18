"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useRef, useState } from "react";

const productLinks = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-a-book", label: "Why a Book" },
  { href: "/who-its-for", label: "Who It’s For" },
  { href: "/case-studies", label: "Case Studies" },
];

const companyLinks = [
  { href: "/testimonials", label: "Testimonials" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/design-notes", label: "Design Notes" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "product" | "company">(null);
  const closeTimer = useRef<number | null>(null);

  const openNow = (key: "product" | "company") => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 250);
  };
  return (
    <header className="sticky top-0 z-40 bg-background md:backdrop-blur md:supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-medium flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
            {/* Book pages */}
            <rect x="8" y="6" width="20" height="28" rx="2" fill="currentColor" opacity="0.1"/>
            <rect x="10" y="8" width="18" height="26" rx="1" fill="currentColor" opacity="0.15"/>
            {/* Main book cover */}
            <rect x="12" y="6" width="20" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            {/* Book spine */}
            <line x1="12" y1="6" x2="12" y2="34" stroke="currentColor" strokeWidth="2"/>
            {/* AI circuit pattern on cover */}
            <g opacity="0.6">
              {/* Neural network nodes */}
              <circle cx="20" cy="15" r="1.5" fill="currentColor"/>
              <circle cx="26" cy="18" r="1.5" fill="currentColor"/>
              <circle cx="20" cy="21" r="1.5" fill="currentColor"/>
              <circle cx="26" cy="24" r="1.5" fill="currentColor"/>
              {/* Connections */}
              <line x1="20" y1="15" x2="26" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <line x1="20" y1="21" x2="26" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <line x1="20" y1="21" x2="26" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            </g>
            {/* Bookmark ribbon */}
            <path d="M28 6v12l-2-2-2 2V6" fill="currentColor" opacity="0.3"/>
          </svg>
          <div className="leading-[1.1]">
            <div className="text-xl tracking-tight">ePubAI</div>
            <div className="text-[11px] text-foreground/60">Five minutes in. A book out.</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-5">
          <div
            className="relative"
            onMouseEnter={() => openNow("product")}
            onMouseLeave={scheduleClose}
          >
            <button className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground">
              Product <ChevronDown size={16} className="opacity-70" />
            </button>
            <div className={`absolute left-0 top-full ${openMenu === "product" ? "block" : "hidden"}`} onMouseEnter={() => openNow("product")} onMouseLeave={scheduleClose}>
              <div className="mt-2 rounded-2xl border border-foreground/10 bg-background shadow-lg p-3 min-w-[240px]">
                <ul className="grid gap-1">
                  {productLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={
                            "block rounded-md px-3 py-2 text-sm transition-colors " +
                            (active
                              ? "text-foreground bg-foreground/5"
                              : "text-foreground/80 hover:text-foreground hover:bg-foreground/5")
                          }
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => openNow("company")}
            onMouseLeave={scheduleClose}
          >
            <button className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground">
              Company <ChevronDown size={16} className="opacity-70" />
            </button>
            <div className={`absolute left-0 top-full ${openMenu === "company" ? "block" : "hidden"}`} onMouseEnter={() => openNow("company")} onMouseLeave={scheduleClose}>
              <div className="mt-2 rounded-2xl border border-foreground/10 bg-background shadow-lg p-3 min-w-[260px]">
                <ul className="grid gap-1">
                  {companyLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={
                            "block rounded-md px-3 py-2 text-sm transition-colors " +
                            (active
                              ? "text-foreground bg-foreground/5"
                              : "text-foreground/80 hover:text-foreground hover:bg-foreground/5")
                          }
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/pricing"
            className={
              "text-sm transition-colors " +
              (pathname === "/pricing"
                ? "text-foreground"
                : "text-foreground/70 hover:text-foreground")
            }
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="rounded-full px-4 py-2 text-sm border border-foreground/15 hover:border-foreground/30 transition-colors"
          >
            Start Your Book
          </Link>
          <button
            aria-label="Open menu"
            className="md:hidden rounded-full p-2 border border-foreground/15"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
      {/* Mobile panel */}
      <div
        className={
          (open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0") +
          " fixed inset-0 z-50 transition-opacity"
        }
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-foreground/40" />
        <aside
          className={
            (open ? "translate-x-0" : "translate-x-full") +
            " ml-auto h-full w-[84%] max-w-[420px] bg-background border-l border-foreground/10 p-6 transition-transform"
          }
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Mobile menu"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg">Menu</div>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-full p-2 border border-foreground/15">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground/60 mb-2">Product</div>
              <ul className="space-y-1">
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={
                        "block rounded-md px-3 py-2 text-sm " +
                        (pathname === item.href ? "bg-foreground/5 text-foreground" : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground")
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground/60 mb-2">Company</div>
              <ul className="space-y-1">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={
                        "block rounded-md px-3 py-2 text-sm " +
                        (pathname === item.href ? "bg-foreground/5 text-foreground" : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground")
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="block rounded-full px-4 py-2 text-sm border border-foreground/15 hover:border-foreground/30"
              >
                Pricing
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}


