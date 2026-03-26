import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "KNICKOLAUS - Nicholaus C. Mills",
  description: "Explore my projects in a Pokemon-style RPG adventure. Walk through town, visit gyms, and discover what I've built.",
  metadataBase: new URL("https://knickolaus.com"),
  openGraph: {
    title: "KNICKOLAUS",
    description: "Explore my projects in a Pokemon-style RPG adventure.",
    siteName: "Nicholaus C. Mills",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KNICKOLAUS - Nicholaus C. Mills",
    description: "Explore my projects in a Pokemon-style RPG adventure.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KNICKOLAUS",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart.variable} h-full`}>
      <body className="min-h-full bg-black text-white overflow-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
