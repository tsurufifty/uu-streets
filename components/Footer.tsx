import Link from "next/link";
import { Logo } from "@/components/Logo";

const SECTIONS = [
  {
    title: "Платформа",
    links: [
      { href: "/tourism", label: "Туризм" },
      { href: "/gastro", label: "Гастротур" },
      { href: "/events", label: "Афиша" },
      { href: "/music", label: "Музыка" },
    ],
  },
  {
    title: "Проект",
    links: [
      { href: "/about", label: "О нас" },
      { href: "/gallery", label: "Фотогалерея" },
      { href: "/#about", label: "Манифест" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-smoke-700 bg-ink-950 py-16 noise-overlay">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size={56} />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-100/70">
              UU STREETS — digital culture portal про уличную культуру Улан-Удэ.
              Граффити, underground-музыка, локальная еда и события — экосистема
              одного города.
            </p>
          </div>

          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h4 className="font-display text-sm uppercase tracking-[0.2em] text-rust-400">
                {s.title}
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-100/80 hover:text-rust-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-smoke-700 pt-8 md:flex-row md:items-center">
          <p className="font-medium text-xs uppercase tracking-widest text-ink-100/50">
            © 2026 БГСХА им В.Р. Филиппова · Улан-Удэ
          </p>
          <p className="font-medium text-xs uppercase tracking-widest text-ink-100/40">
            51.8333° N, 107.5833° E
          </p>
        </div>
      </div>
    </footer>
  );
}
