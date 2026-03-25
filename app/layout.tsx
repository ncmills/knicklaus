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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white font-[family-name:var(--font-playfair)]">
        <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black/70 to-transparent">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-center">
            <span className="text-3xl font-black tracking-tight">
              Nicholaus C. Mills
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
