"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const linksLeft = [
  { href: "/", label: "Главная" },
  { href: "/tourism", label: "Туризм" },
  { href: "/gastro", label: "Гастротур" },
];

const linksRight = [
  { href: "/events", label: "Афиша" },
  { href: "/music", label: "Музыка" },
  { href: "/about", label: "О нас" },
];

const allLinks = [...linksLeft, ...linksRight];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-ink-950/85 backdrop-blur-md border-b border-smoke-700" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        {/* LOGO (left) */}
        <Link href="/" className="group shrink-0">
          <Logo size={44} />
        </Link>

        {/* DESKTOP NAV with СОЙОМБА в центре */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {linksLeft.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}

          {/* Сойомба по центру навигации */}
          <Link href="/" className="group relative mx-2 shrink-0" aria-label="Soyombo">
            <div className="relative h-10 w-10 lg:h-12 lg:w-12 transition-transform duration-700 group-hover:rotate-180">
              <Image
                src="/images/soyomba.png"
                alt="Сойомбо"
                fill
                sizes="48px"
                className="object-contain drop-shadow-[0_0_12px_rgba(255,180,40,0.35)]"
              />
            </div>
          </Link>

          {linksRight.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}
        </nav>

        {/* EDITION CHIP (right) — magazine vibe + держит симметрию навбара */}
        <div className="hidden md:inline-flex shrink-0 items-center gap-2 border border-smoke-600 bg-ink-950/40 px-3 py-1.5 font-medium text-[10px] uppercase tracking-[0.3em] text-ink-100/70">
          <span className="text-rust-400">DIGITAL-PORTAL</span>
        </div>

        {/* MOBILE BURGER */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          aria-label="Меню"
        >
          <span className={cn("h-0.5 w-6 bg-ink-50 transition", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-ink-50 transition", open && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-ink-50 transition", open && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-smoke-700 bg-ink-950">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {/* Сойомба и в мобильном меню */}
            <div className="flex justify-center pb-2">
              <div className="relative h-12 w-12">
                <Image src="/images/soyomba.png" alt="Сойомбо" fill sizes="48px" className="object-contain" />
              </div>
            </div>
            {allLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display uppercase tracking-wider text-lg text-ink-100 hover:text-rust-400"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative font-display uppercase tracking-wider text-sm text-ink-100 transition-colors hover:text-rust-400 whitespace-nowrap"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-rust-500 transition-all group-hover:w-full" />
    </Link>
  );
}
