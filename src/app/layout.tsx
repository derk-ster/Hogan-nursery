import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Hogan Nursery & Landscape Supply | Plants and Landscape Supplies in Plano, TX",
  description:
    "Find plants, trees, shrubs, flowers, hard to find varieties, and landscape supplies at Hogan Nursery & Landscape Supply in Plano, Texas.",
  openGraph: {
    title: "Hogan Nursery & Landscape Supply",
    description:
      "Plants, trees, shrubs, and landscape supplies in Plano, Texas.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body className="font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
