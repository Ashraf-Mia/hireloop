import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HireLoop - Find Your Dream Job Today",
  description: "HireLoop connects top talent with world-class companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${manrope.variable}`}>
      <body
        className="antialiased bg-black text-white"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
