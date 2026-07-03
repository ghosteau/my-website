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

export const metadata: Metadata = {
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
    description:
      "Aspiring AI researcher. Machine learning, systems, math, history. EN / FR.",
    type: "website",
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
