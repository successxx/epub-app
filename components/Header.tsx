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
        <Link href="/" className="font-medium">
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


