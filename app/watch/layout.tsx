import type { Metadata } from "next";

// The page itself is a client component (it follows the EN/FR toggle), so
// its title and description are declared here.
export const metadata: Metadata = {
  title: "Watch — Manny McGrail",
  description: "Video essays and technical tutorials from Manny McGrail. Coming soon.",
};

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
