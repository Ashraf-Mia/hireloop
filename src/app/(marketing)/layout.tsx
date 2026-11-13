import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import React from "react";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MarketingLayout;
