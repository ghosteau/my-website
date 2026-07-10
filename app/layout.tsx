import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://mannymcgrail.com";
const OG_DESCRIPTION =
  "Aspiring AI researcher. Machine learning, systems, math, history. EN / FR.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Manny McGrail — AI · Math · Systems",
  description:
    "Emmanuel (Manny) McGrail — Data Science & CS @ Pitt. Aspiring AI researcher working at the intersection of machine learning, systems, math, and history. EN / FR.",
  keywords: [
    "Manny McGrail",
    "Emmanuel McGrail",
    "AI research",
    "machine learning",
    "data science",
    "University of Pittsburgh",
    "ENSEA",
  ],
  authors: [{ name: "Emmanuel McGrail" }],
  openGraph: {
    title: "Manny McGrail — AI · Math · Systems",
    description: OG_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Manny McGrail",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Emmanuel McGrail — Data Science & CS @ Pitt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manny McGrail — AI · Math · Systems",
    description: OG_DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
