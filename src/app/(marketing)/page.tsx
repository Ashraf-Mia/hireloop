import { CtaSection } from "@/components/landing/cta-section";
import { HeroSection } from "@/components/landing/hero-section";
// import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-black">
      <HeroSection />
      <CtaSection />
    </main>
  );
}
