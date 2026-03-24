import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Nicholaus C. Mills",
  description: "Home of all my projects",
};

const links = [
  { name: "Tour de Fore", href: "https://tourdefore.com" },
  { name: "DoppelWriter", href: "https://doppelwriter.com" },
  { name: "What Peptides Do", href: "https://whatpeptidesdo.com" },
  { name: "Kings Clothiers", href: "https://kingsclothiers.com" },
  { name: "ImFrustrated", href: "https://imfrustrated.org" },
  { name: "I Don't Have a Will", href: "https://idonthaveawill.com" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white font-[family-name:var(--font-playfair)]">
        <nav className="w-full fixed top-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-black tracking-tight">
              Nicholaus C. Mills
            </a>
            <div className="flex gap-6 text-sm font-medium">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
