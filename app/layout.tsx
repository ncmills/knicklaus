import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Knicklaus",
  description: "Home of all my projects",
};

const links = [
  { name: "Tour de Fore", href: "https://tourdefore.com" },
  { name: "DoppelWriter", href: "https://doppelwriter.com" },
  { name: "What Peptides Do", href: "https://whatpeptidesdo.com" },
  { name: "Kings Clothiers", href: "https://kingsclothiers.com" },
  { name: "ImFrustrated", href: "https://imfrustrated.org" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white font-[family-name:var(--font-geist)]">
        <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight">
              Knicklaus
            </a>
            <div className="flex gap-5 text-sm">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </nav>
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
