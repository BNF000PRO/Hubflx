import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "IQ CABAL",
  description: "The Digital City For Hustlers. Master AI. Scale Digital Growth. Level Up Your Mindset.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="md:p-20 md:pt-0">
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
