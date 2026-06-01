import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "UU-STREETS · Digital culture portal · Улан-Удэ",
  description:
    "Underground media platform про уличную культуру Улан-Удэ. Граффити-маршруты, гастро-карта, афиша и локальная underground-музыка — экосистема одного города.",
  keywords: [
    "Улан-Удэ", "стрит-арт", "граффити", "Бурятия", "БАТО",
    "underground", "уличная культура", "афиша", "гастро",
    "underground music", "урбан-медиа", "UU-STREETS",
  ],
  openGraph: {
    title: "UU-STREETS · Digital culture portal",
    description:
      "Underground digital-портал про уличную культуру Улан-Удэ: туризм, гастро, афиша, музыка.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="noise-fixed">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
